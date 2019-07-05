<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed :title="$t('m.passdetails')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>

		<div class="assets-detailed-list" v-for="item in listData">
			<router-link :to="{name:'TransactionDetails',params:{order_id:item.order_id,order_type:item.order_type}}">
				<mt-cell :title="item.transaction_type == 1 ? '转出':'转入'" is-link :label="item.create_time">
					<span :style="{'color':item.transaction_type ==1?'red':'blue'}">{{item.transaction_type ==1?'-'+item.amount :'+'+item.amount}}</span>
				</mt-cell>
				<p>{{item.token.code}}</p>
			</router-link>
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
				listData: {
				},
			}
		},
		created() {
			this.list()
		},
		methods: {
			// 明细接口
			list() {
				api.transactionList().then(res => {
					this.listData = res.data
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>