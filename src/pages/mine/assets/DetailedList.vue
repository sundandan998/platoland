<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header header">
			<mt-header fixed title="明细">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="details-search">
			<!-- @search="onSearch" -->
			<van-search placeholder="请输入资产代码" show-action shape="round">
				<div slot="action" >搜索</div>
				<!-- @click="onSearch" -->
			</van-search>
		</div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<div class="assets-detailed-list">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
					:error.sync="error" error-text="请求失败，点击重新加载">
					<div v-for="item in listData" class="details-list">
						<router-link :to="{name:'TransactionDetails',params:{id:item.id,order_type:item.order_type}}">
							<!-- <mt-cell  is-link> -->
							<div class="list-title">
								<span>{{item.flow_type}}</span><span class="fr list-num">{{item.available_change}}</span>
							</div>
							<div class="list-deta">
								<span>{{item.create_time}}</span>
								<span class="list-code">{{item.token.code}}</span>
								<span class="fr list-num">{{item.freeze_change}}</span>
							</div>
							<img class="fr" src="../../../assets/images/right.svg" alt="">
						</router-link>
					</div>
				</van-list>
			</div>
		</van-pull-refresh>
	</div>
</template>

<script>
	// 接口
	import api from "@/api/user/User.js"
	import { toast } from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				listData: [],
				// 上拉加载
				loading: false,
				finished: false,
				error: false,
				pageNum: 1,
				// 下拉刷新
				isLoading: false
			}
		},
		created() {
			// this.list()
		},
		methods: {
			// 上拉加载
			onLoad() {
				setTimeout(() => {
					api.transactionList({ 'page': this.pageNum }).then(res => {
						if (res.code == 0) {
							this.listData.push.apply(this.listData, res.data)
							this.loading = false
							if (res.has_next == true) {
								this.pageNum++
							}
							if (res.has_next == false) {
								this.finished = true
								this.loading = false
							}
						}
					}).catch(err => {
						this.error = true
					})
				}, 100)
			},
			// 下拉刷新
			onRefresh() {
				setTimeout(() => {
					this.$toast('刷新成功')
					this.isLoading = false
				}, 500)
			},
			// // 搜索
			// onSearch(){

			// }
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
	.details-list {
		/* font-size: 0.78rem; */
		border-bottom: 1px solid #f2f2f2;
		padding: 10px 15px;
		.list-num{
			margin-right: 20px;
		}
		img {
			position: relative;
			right: 0px;
			top: -26px;
			width: 20px;
		}
		.list-code{
			margin-left: 30px;
		}
	}
	.assets-detailed-list {
		background-color: #fff;
	}
</style>