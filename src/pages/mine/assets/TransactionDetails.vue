<template>
	<div class="transaction-details">
		<div class="transaction-details-header">
			<div class="assets-detailed-header">
				<mt-header fixed title="明细详情">
					<router-link to="/detailedlist" slot="left">
						<mt-button icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
					</router-link>
				</mt-header>
			</div>
		</div>
		<div class="transaction-details-number">
			<span>{{details.transaction_type ==1?'-'+details.amount :'+'+details.amount}}</span>
			<p>{{details.status}}</p>
		</div>
		<div class="transaction-details-adress">
			<ul class="fl">
				<li>交易方</li>
				<li>{{$t('m.transactionadreess')}}</li>
			</ul>
			<ul class="fr transaction-details-information-right">
				<li>{{details.other}}</li>
				<li>{{details.other_address}}</li>
			</ul>
		</div>
		<div class="transaction-details-information">
			<ul class="fl">
				<li>{{$t('m.ordernumber')}}</li>
				<!-- <li>{{$t('m.unitprice')}}</li> -->
				<li>{{$t('m.transactionnum')}}</li>
				<li>{{$t('m.transactiontime')}}</li>
				<li>可用余额</li>
				<li>冻结余额</li>
			</ul>
			<ul class="fr transaction-details-information-right">
				<li>{{details.order_id}}</li>
				<li>{{details.amount}} {{detailsCode.code}}</li>
				<li>{{details.create_time}}</li>
				<li>{{details.available_amt}}</li>
				<li>{{details.freeze_amt}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from "@/api/user/User.js"
	import { toast } from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				details: {},
				detailsCode:{},
				// 详情接口
				detailData: {
					id: '',
					order_type: ''
				}
			}
		},
		created() {
			this.listDetail()
		},
		methods: {
			// 明细详情接口
			listDetail() {
				// debugger
				this.detailData.order_type = this.$route.params.order_type
				this.detailData.id = this.$route.params.id
				api.listDetail(this.detailData).then(res => {
					if (res.code == 0) {
						this.details = res.data
						this.detailsCode = res.data.token
						if(this.details.other == null){
							this.details.other = "--"
						}
					}
				}).catch(err => {
					if (err.code != 0) {
						toast(err)
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>