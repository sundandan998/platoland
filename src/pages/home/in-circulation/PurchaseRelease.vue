<template>
	<div class="release">
		<div class="purchase-pass-header">
			<mt-header fixed :title="$t('m.release')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="purchase-pass-buy-assets">
			<span>交易资产</span>
			<div class="purchase-pass-buy-information fr">
				<img :src="this.detail.icon" alt="" />
				<span>{{this.detail.code}}({{this.detail.nickname}})</span>
				<p>{{this.detail.subject.issuer}}</p>
			</div>
		</div>
		<div class="purchase-pass-valuation-assets">
			<span>{{$t('m.valuationassets')}}</span>
			<div class="purchase-pass-valuation-assets-img fr">
				<img :src="this.detail.release.d_icon" alt="" />
				<span>{{this.detail.release.denominated_assets}}</span>
			</div>
		</div>
		<div class="to-deal-navbar">
			<van-tabs @click="index">
				<van-tab :title="$t('m.purchasebuy')">
				</van-tab>
				<van-tab :title="$t('m.sell')">
				</van-tab>
			</van-tabs>
		</div>
		<div class="purchase-pass-input">
			<p>{{$t('m.transactionnum')}}</p>
			<mt-field type="number" v-model="releaseData.amount"></mt-field>
			<p>{{$t('m.unitprice')}}</p>
			<mt-field type="number" v-model="releaseData.price"></mt-field>
			<div v-if="fee">
				<span>{{$t('m.available')}}：{{balData.available_amount}} {{this.detail.code}}</span>
				<span>手续费 : {{releaseData.amount*0.002}} PLD</span>
			</div>
			<div v-else>
				<span>{{$t('m.available')}}：{{balData.available_amount}} {{this.detail.release.denominated_assets}}</span>
			</div>
		</div>
		<div class="purchase-pass-quota">
			<p>{{$t('m.quota')}}</p>
			<mt-field placeholder="卖方最低出售数量" v-model="releaseData.low_number" type="number" class="purchase-pass-quota-input"></mt-field>
			<mt-field placeholder="卖方最高出售数量" v-model="releaseData.high_number" type="number" class="purchase-pass-quota-input"></mt-field>
		</div>
		<div class="purchase-pass-btn">
			<mt-button size="large" :disabled="disabled" type="primary" @click="release">{{$t('m.release')}}</mt-button>
		</div>
		<!-- 数字键盘 -->
		<div>
			<van-popup class="popupbox" position="bottom" v-model="popupVisible">
				<!-- 数字键盘表头 -->
				<span v-if="payTitle" class="paymentamount">{{releaseData.amount * releaseData.price }}{{this.detail.release.denominated_assets}}
				</span>
				<!-- 数字键盘表头 -->
				<span v-else class="paymentamount">{{releaseData.amount}} {{this.detail.code}}</span>
				<van-password-input :value="value" @focus="showKeyboard = true" />
				<!-- 数字键盘 -->
				<van-number-keyboard v-model="confirm.pay_pwd" :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
				 @blur="showKeyboard = false" />
			</van-popup>
		</div>
	</div>
</template>

<script>
	import api from '@/api/market/Market.js'
	import { toast } from '@/assets/js/pub.js'
	import { mapGetters } from 'vuex'
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
				// 获取资产余额参数
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
					high_number: ''
				},
				// 确认支付参数
				confirm: {
					order_type: 1,
					payment_id: '',
					pay_pwd: ''
				}
			}
		},
		created() {
			this.index(0, '111')
		},
		methods: {
			onInput(key) {
				this.value = (this.value + key).slice(0, 6);
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1);
			},
			// tab切换
			index(index, title) {
				if (index == 0) {
					this.releaseData.publish_type = 0
					// 是否显示手续费
					this.hide = false
					// 数字键盘表头
					this.payTitle = true
					// 当发布是购买的时候，可用部分是计价资产
					this.balanceData.token_code = this.detail.release.denominated_assets
					this.balance()
				} else {
					if (index == 1) {
						this.releaseData.publish_type = 1
						// 是否显示手续费
						this.hide = true
						// 数字键盘表头
						this.payTitle = false
						// 当发布是出售的时候，可用部分是pld和ld
						this.balanceData.token_code = this.detail.code
						this.balance()
					}
				}
			},
			// 获取资产余额
			balance() {
				// this.balanceData.token_code = this.detail.release.denominated_assets
				api.balance(this.balanceData).then(res => {
					this.balData = res.data
				}).catch(err => {
					if (err.code == 4003) {
						this.balData = { 'available_amount': '0', 'freeze_amount': '0', 'id': null }
					} else {
						toast(err)
					}
				})
			},
			// 发布接口
			release() {
				this.releaseData.token_code = this.detail.code
				api.release(this.releaseData).then(res => {
					if (res.code == 0) {
						this.popupVisible = true
						this.confirm.order_type = res.order_type
						this.confirm.payment_id = res.transaction_id
					}
				}).catch(err => {
					if (err.code != 0) {
						toast(err)
					}
				})
			}
		},
		watch: {
			value() {
				if (this.value.length == 6) {
					// 清空密码输入框
					this.value = ''
					var passWord = JSON.parse(window.sessionStorage.getItem('payPwd'))
					this.confirm.pay_pwd = passWord.pwd
					// 确认支付接口
					api.confirmPay(this.confirm).then(res => {
						if (res.code == 0) {
							toast(res)
							this.$router.push({
								name: 'Deal'
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
					if (val.amount != '' && val.price != '' && val.low_number != '' && val.high_number != '') {
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
	@import '../../../assets/scss/global'
</style>