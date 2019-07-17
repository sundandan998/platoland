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
		<div class="purchase-pass-input">
			<van-tabs @click="index">
				<van-tab title="购买">
					<span class="purchase-pass-input-title">数量</span>
					<mt-field type="number" v-model="releaseData.amount"></mt-field>
					<span class="purchase-pass-input-title">单价</span>
					<mt-field type="number" v-model="releaseData.price"></mt-field>
					<p>{{$t('m.available')}}：{{balData.available_amount}} {{this.detail.release.denominated_assets}}</p>
				</van-tab>
				<van-tab title="出售">
					<span class="purchase-pass-input-title">数量</span>
					<mt-field type="number" v-model="releaseData.amount"></mt-field>
					<span class="purchase-pass-input-title">单价</span>
					<mt-field type="number" v-model="releaseData.price"></mt-field>
					<p>{{$t('m.available')}}：{{balData.available_amount}} {{this.detail.code}}</p>
					<p>手续费 : {{releaseData.price*0.002}} PLD</p>
				</van-tab>
			</van-tabs>
		</div>
		<div class="purchase-pass-quota">
			<p>{{$t('m.quota')}}</p>
			<mt-field placeholder="卖方最低出售数量" v-model="releaseData.low_number" type="number" class="purchase-pass-quota-input">
			</mt-field>
			<mt-field placeholder="卖方最高出售数量" v-model="releaseData.high_number" type="number"
				class="purchase-pass-quota-input"></mt-field>
		</div>
		<div class="purchase-pass-btn">
			<mt-button size="large" :disabled="disabled" type="primary" @click="release">{{$t('m.release')}}</mt-button>
		</div>
		<!-- 数字键盘 -->
		<div>
			<van-popup class="popupbox" position="bottom" v-model="popupVisible">
				<!-- 数字键盘表头 -->
				<span v-if="payTitle"
					class="paymentamount">{{releaseData.amount * releaseData.price }}{{this.detail.release.denominated_assets}}
				</span>
				<!-- 数字键盘表头 -->
				<span v-else class="paymentamount">{{releaseData.amount}} {{this.detail.code}}</span>
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
					order_type: 4,
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
			release() {
				// 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
				// 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
				// 点击确定按钮发请求
				let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
				if (pay_pwd == 'true') {
					// 发布接口
					this.releaseData.token_code = this.detail.code
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
					this.popupVisible = false
					Toast({
						message: '请先设置支付密码',
						position: 'top',
					})
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
/* 购买出售tab栏 */
	.purchase-pass-input-title {
		font-size: 0.78rem;
		margin-left: 25px;
		color: #999;
		margin-top: 20px;
		display: block;
	}
</style>
