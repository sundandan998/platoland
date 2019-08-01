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
		<div class="transaction-details-information">
			<div class="transaction-details-balance">
				<p><span>可用额</span><b>{{details.available_change}}</b></p>
				<p><span>冻结额</span><b>{{details.freeze_change}}</b></p>
			</div>
			<div class="transaction-details-token">
				<p><span>交易通证</span><span><img :src="detailsCode.icon" alt="">{{detailsCode.code}}</span></p>
				<p><span>交易类型</span><span>{{details.flow_type}}</span></p>
				<p><span>解锁时间</span><span>{{details.unfreeze_date}}</span></p>
			</div>
			<div class="transaction-details-status">
				<p><span>订单状态</span><span>{{details.status}}</span></p>
				<p><span>订单编号</span><span>{{details.order_id}}</span></p>
				<p><span>交易时间</span><span>{{details.create_time}}</span></p>
				<p><span>交易方</span><span>{{details.other}}</span></p>
				<p><span>交易地址</span><span>{{details.other_address}}</span></p>
			</div>
			<div class="transaction-details-amount">
				<p><span>可用余额</span><span>{{details.available_amt}}</span></p>
				<p><span>冻结余额</span><span>{{details.freeze_amt}}</span></p>
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

	.transaction-details-information {
		margin-top: 20px;
		background-color: #fff;
		height: auto;

		p {
			height: 25px;
			margin: 10px 20px;
			font-size: 0.78rem;

			span {
				font-size: 0.78rem;
			}

			span:last-child {
				float: right;
			}
		}

		.transaction-details-balance {
			padding: 10px 0;
			border-bottom: 10px solid #f2f2f2;

			p {
				b {
					font-size: 1.4rem;
					font-weight: 400;
					margin-left: 40px;
				}
			}
		}


		.transaction-details-token {
			padding-bottom: 8px;
			border-bottom: 10px solid #f2f2f2;
		}

		.transaction-details-status {
			padding-bottom: 8px;
			border-bottom: 10px solid #f2f2f2;

		}
	}
</style>