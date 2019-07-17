<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed title="明细">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<!-- <div class="assets-detailed-list" v-for="item in listData">
			<router-link :to="{name:'TransactionDetails',params:{id:item.id,order_type:item.order_type}}">
				<mt-cell :title="item.transaction_type == 1 ? '转出':'转入'" is-link :label="item.create_time">
					<span :style="{'color':item.transaction_type ==1?'red':'blue'}">{{item.transaction_type ==1?'-'+item.amount :'+'+item.amount}}</span>
				</mt-cell>
				<p>{{item.token.code}}</p>
			</router-link>
		</div	>-->
		<div class="assets-detailed-list">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100" :error.sync="error"
			error-text="请求失败，点击重新加载">
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
				loading: false,
				finished: false,
				error: false,
				pageNum: 1,
			}
		},
		created() {
			// this.list()
		},
		methods: {
			// 明细接口
			// list() {
			// 	api.transactionList().then(res => {
			// 		if (res.code == 0) {
			// 			this.listData = res.data
			// 			if (res.has_next == true){
			// 				this.pageNum++
			// 			}else{
			// 				this.finished = true
			// 			}
			// 		}
			// 	}).catch(err => {
			// 		console.log(err)
			// 	})
			// },
			// 上拉加载
			onLoad() {
				setTimeout(() => {
					api.transactionList({'page': this.pageNum}).then(res => {
						if (res.code == 0) {
							this.listData.push.apply(this.listData, res.data)
							this.loading = false
							if(res.has_next == true){
								this.pageNum++
							}
							if (res.has_next == false) {
								this.finished = true;
								this.loading = false
							}
						}
					}).catch(err => {
						this.error = true;
					})
				}, 100)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
	/* .mint-cell {
    margin: 30px 0 1px 0;
} */
</style>