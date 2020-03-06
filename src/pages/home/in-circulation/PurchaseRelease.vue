<template>
	<div class="release">
		<div class="purchase-pass-header header">
			<mt-header fixed :title="$t('m.release')">
				<!-- v-on:click="$router.go(-1)" -->
				<mt-button icon="back" slot="left" @click="back">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="purchase-pass-buy-assets">
			<span>{{$t('m.tradingAssets')}}</span>
			<div class="purchase-pass-buy-information fr">
				<img :src="this.detail.token.icon" alt="" />
				<span>{{this.detail.token.code}}({{this.detail.token.nickname}})</span>
				<p>{{this.detail.token.issuer}}</p>
			</div>
		</div>
		<div class="purchase-pass-valuation-assets" v-if="this.$route.params.denominated_assets!=''">
			<span>{{$t('m.valuationAssets')}}</span>
			<div class="purchase-pass-valuation-assets-img fr">
				<img :src="this.detailData.d_icon" alt="" />
				<span>{{this.$route.params.denominated_assets}}</span>
			</div>
		</div>
		<div class="purchase-pass-input">
			<van-tabs @click="index">
				<van-tab :title="$t('m.buy')">
					<span class="purchase-pass-input-title">{{$t('m.quantity')}}</span>
					<mt-field type="number" v-model="releaseData.amount"></mt-field>
					<span class="purchase-pass-input-title">{{$t('m.price')}}</span>
					<mt-field type="number" v-model="releaseData.price"></mt-field>
					<p>{{$t('m.available')}}：{{balData.available_amount|number}} {{this.$route.params.code}}</p>
					<div class="purchase-pass-quota">
						<p>{{$t('m.limit')}}</p>
						<mt-field :placeholder="$t('m.sellLowNum')" v-model="releaseData.low_number" type="number"
							class="purchase-pass-quota-input">
						</mt-field>
						<mt-field :placeholder="$t('m.sellHeighNum')" v-model="releaseData.high_number" type="number"
							class="purchase-pass-quota-input"></mt-field>
					</div>
				</van-tab>
				<van-tab :title="$t('m.sell')">
					<span class="purchase-pass-input-title">{{$t('m.quantity')}}</span>
					<mt-field type="number" v-model="releaseData.amount"></mt-field>
					<span class="purchase-pass-input-title">{{$t('m.price')}}</span>
					<mt-field type="number" v-model="releaseData.price"></mt-field>
					<p>{{$t('m.available')}}：{{balData.available_amount|number}} {{this.detail.token.code}}</p>
					<!-- <p>手续费 : {{releaseData.amount*0.002}} PLD</p> -->
					<p>{{$t('m.handlingFee')}} :{{$t('m.suspend')}}</p>
					<div class="purchase-pass-quota">
						<p>{{$t('m.limit')}}</p>
						<mt-field :placeholder="$t('m.buyLowNum')" v-model="releaseData.low_number" type="number"
							class="purchase-pass-quota-input">
						</mt-field>
						<mt-field :placeholder="$t('m.buyHeighNum')" v-model="releaseData.high_number" type="number"
							class="purchase-pass-quota-input"></mt-field>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<!-- <div class="purchase-pass-quota">
			<p>{{$t('m.quota')}}</p>
			<mt-field placeholder="卖方最低出售数量" v-model="releaseData.low_number" type="number" class="purchase-pass-quota-input">
			</mt-field>
			<mt-field placeholder="卖方转入出售数量" v-model="releaseData.high_number" type="number"
				class="purchase-pass-quota-input"></mt-field>
		</div> -->
		<!-- 添加备注 -->
		<!-- v-model="message" -->
		<div class="leave-message">
			<van-field rows="2" autosize type="textarea" maxlength="50" :placeholder="$t('m.addNotes')" show-word-limit
				v-model="releaseData.remark" />
		</div>
		<div class="purchase-pass-btn">
			<mt-button size="large" :disabled="disabled" type="primary" @click="release">{{$t('m.release')}}</mt-button>
		</div>
		<!-- 数字键盘 -->
		<div>
			<van-popup class="popupbox" position="bottom" v-model="popupVisible">
				<!-- 数字键盘表头 -->
				<span v-if="payTitle"
					class="paymentamount">{{releaseData.amount * releaseData.price }}&nbsp;({{this.$route.params.denominated_assets}})
				</span>
				<!-- 数字键盘表头 -->
				<span v-else class="paymentamount">{{releaseData.amount}} &nbsp;({{this.detail.token.code}})</span>
				<van-password-input :value="value" @focus="showKeyboard = true" />
				<!-- 数字键盘 -->
				<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
					@blur="showKeyboard = false" />
			</van-popup>
		</div>
	</div>
</template>

<script>
	import api from '@/api/market/Market.js'
	import { Toast } from 'mint-ui'
	import { toast } from '@/assets/js/pub.js'
	import { mapGetters } from 'vuex'
	import { MessageBox } from 'mint-ui'

	export default {
		data() {
			return {
				value: '',
				// 展示数字键盘表头
				payTitle: true,
				// 是否显示手续费
				fee: false,
				disabled: true,
				showKeyboard: false,
				popupVisible: false,
				balData: '',
				detailData: '',
				// // 获取资产余额参数
				balanceData: {
					token_code: ''
				},
				// 发布参数/购买
				releaseData: {
					token_code: '',
					publish_type: 0,
					amount: '',
					price: '',
					low_number: '',
					high_number: '',
					remark: '',
				},
				// 确认支付参数
				confirm: {
					order_type: 4,
					payment_id: '',
					pay_pwd: ''
				}
			}
		},
		created() {
			this.balance()
			console.log(this.$route.params.code)
		},
		methods: {
			back() {
				this.$router.push({
					name: 'Deal',
					params: { code: this.$route.params.code }
				})
			},
			onInput(key) {
				this.value = (this.value + key).slice(0, 6);
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1);
			},
			// 获取资产余额
			balance() {
				api.balance({ token_code: this.$route.params.code }).then(res => {
					this.balData = res.data
				}).catch(err => {
					if (err.code == 4003) {
						this.balData = { 'available_amount': '0', 'freeze_amount': '0', 'id': null }
					} else {
						// toast(err)
					}
				})
			},
			release() {
				// 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
				// 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
				// 点击确定按钮发请求
				let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
				if (pay_pwd == 'true') {
					// 发布接口
					this.releaseData.token_code = this.detail.token.code
					api.release(this.releaseData).then(res => {
						// 清空密码输入框
						this.value = ''
						if (res.code == 0) {
							this.popupVisible = true
							this.confirm.order_type = res.order_type
							this.confirm.payment_id = res.transaction_id
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
							this.popupVisible = false
						}
					})
				} else {
					this.$messagebox({
						title: '提示',
						message: `请先设置支付密码再进行操作`,
						cancelButtonText: '取消',
						confirmButtonText: '确定',
						showCancelButton: true
					}).then(action => {
						if (action == 'confirm') {
							this.$router.push({
								name: 'Safety'
								// params: { id: 'reservation' }
							})
						}
					})
				}
			},
			//获取详情
			getDetail() {
				api.tokenDetail({ code: this.$route.params.code }).then(res => {
					this.detailData = res.data.release
					this.balanceData.token_code = this.detailData.denominated_assets
					this.balance()
					this.index()
				})
					.catch(err => {
						console.log(err)
					})
			},
			// tab切换
			index(index, title) {
				console.log(index)
				if (index == 0) {
					this.releaseData.publish_type = 0
					// 是否显示手续费
					this.hide = false
					// 数字键盘表头
					this.payTitle = true
					// 当发布是购买的时候，可用部分是计价资产
					this.balanceData.token_code = this.detailData.denominated_assets
					// this.balanceData.token_code = this.$route.params.denominated_assets
					this.balance()
				} else {
					if (index == 1) {
						this.releaseData.publish_type = 1
						// 是否显示手续费
						this.hide = true
						// 数字键盘表头
						this.payTitle = false
						// 当发布是出售的时候，可用部分是pld和ld
						this.balanceData.token_code = this.detail.token.code
						this.balance()
					}
				}
			},

		},
		watch: {
			value() {
				if (this.value.length == 6) {
					this.confirm.pay_pwd = this.value
					// 确认支付接口
					api.confirmPay(this.confirm).then(res => {
						if (res.code == 0) {
							toast(res)
							this.$router.push({
								name: 'Deal',
								params: { code: this.$route.params.code }
							})
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
						}
					})
				}
			},
			releaseData: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.amount != '' && val.price != '' && val.low_number != '' && val.high_number != '' && val.amount != 0 && val.price != 0 && val.low_number != 0 && val.high_number != 0) {
						this.disabled = false
					} else {
						this.disabled = true
					}
				}
			},
		},
		computed: {
			...mapGetters([
				'detail'
			])
		},
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';

	.release {

		/* 购买出售tab栏 */
		.purchase-pass-input-title {
			/* font-size: 0.78rem; */
			margin-left: 25px;
			color: #999;
			margin-top: 20px;
			display: block;
		}

		.purchase-pass-valuation-assets {
			height: 80px;
		}

		.purchase-pass-buy-assets {
			height: 90px;
			background-color: #fff;
			margin-top: 10px;
		}

		.purchase-pass-btn {
			margin-top: 20px;
		}

		.leave-message {
			height: 200px;
		}

		.mint-cell:last-child {
			background-image: none !important;
		}
	}
</style>