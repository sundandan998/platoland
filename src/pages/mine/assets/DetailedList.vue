<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed title="明细">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>

		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<div class="assets-detailed-list">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
					:error.sync="error" error-text="请求失败，点击重新加载">
					<div v-for="item in listData">
						<router-link :to="{name:'TransactionDetails',params:{id:item.id,order_type:item.order_type}}">
							<mt-cell :title="item.transaction_type == 1 ? '转出':'转入'" is-link :label="item.create_time">
								<span
									:style="{'color':item.transaction_type ==1?'red':'blue'}">{{item.transaction_type ==1?'-'+item.amount :'+'+item.amount}}</span>
							</mt-cell>
							<p>{{item.token.code}}</p>
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
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
	.assets-detailed-header {
    margin-bottom: 20px;
}
</style>