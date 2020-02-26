<template>
	<div class="transaction-details">
		<div class="transaction-details-header header">
			<mt-header fixed :title="$t('m.details')">
				<router-link to="/detailedlist" slot="left">
					<mt-button icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="transaction-details-information">
			<div class="transaction-details-balance">
				<p><span>{{$t('m.availableQuota')}}</span><b>{{details.available_change}}</b></p>
				<p><span>{{$t('m.freezeQuota')}}</span><b>{{details.freeze_change}}</b></p>
			</div>
			<div class="transaction-details-token">
				<p><span>{{$t('m.transactionToken')}}</span><span><img :src="detailsCode.icon" alt="">{{detailsCode.code}}</span></p>
				<p><span>{{$t('m.transactionStatus')}}</span><span>{{details.flow_type}}</span></p>
				<p v-if="details.unfreeze_date!=null"><span>{{$t('m.unlockTime')}}</span><span>{{details.unfreeze_date}}</span></p>
			</div>
			<div class="transaction-details-status">
				<p v-if="details.status!=null"><span>{{$t('m.unlockTime')}}</span><span>{{details.status}}</span></p>
				<p><span>{{$t('m.orderNumber')}}</span><span>{{details.order_id}}</span></p>
				<p><span>{{$t('m.orderTime')}}</span><span>{{details.create_time}}</span></p>
				<p><span>{{$t('m.counterparty')}}</span><span>{{details.other}}</span></p>
				<!-- <p><span>交易地址</span><span>{{details.other_address}}</span></p> -->
				<p v-if="details.other_address!=null"><span>{{$t('transactionAddress')}}</span><span>{{details.other_address}}</span></p>
			</div>
			<div class="transaction-details-amount">
				<p><span>{{$t('m.availableBalance')}}</span><span>{{details.available_amt}}</span></p>
				<p><span>{{$t('m.freezeBalance')}}</span><span>{{details.freeze_amt}}</span></p>
			</div>
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
				detailsCode: {},
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
						if (this.details.other == null) {
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
	@import '../../../assets/scss/global';

	.transaction-details {

		.transaction-details-information {
			height: auto;
			margin: 20px 24px;

			p {
				height: 50px;
				margin: 10px 20px;

				span:last-child {
					float: right;
					display: flex;
					font-size: 26px;
				}
			}

			.transaction-details-balance {
				padding: 10px 0;
				background-color: #fff;
				border-radius: 10px;
				font-size: 28px;

				p {
					b {
						font-weight: 400;
						margin-left: 40px;
					}
				}
			}

			.transaction-details-token {
				background-color: #fff;
				border-radius: 10px;
				margin: 10px 0;
				padding: 10px 0;

				img {
					width: 50px;
					height: 50px;
					margin-right:20px;
				}
			}

			.transaction-details-status {
				background-color: #fff;
				border-radius: 10px;
				padding: 10px 0;
			}

			.transaction-details-amount {
				background-color: #fff;
				margin: 10px 0;
				border-radius: 10px;
				padding: 10px 0;
			}
		}
	}
</style>