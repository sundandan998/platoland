<template>
	<div class="release">
		<div class="purchase-pass-header">
			<mt-header fixed :title="$t('m.release')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="purchase-pass-buy-assets">
			<span>{{$t('m.buyassets')}}</span>
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
			<van-tabs>
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
			<span>{{$t('m.available')}}：10,000 USDT</span>
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
				<span class="paymentamount">1.00 USDT</span>
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
				disabled: true,
				showKeyboard: false,
				popupVisible: false,
				// 发布参数/购买
				releaseData: {
					token_code: '',
					publish_type: 0,
					amount: '',
					price: '',
					low_number: '',
					high_number: ''
				},
				// 发布参数/出售
				sellData: {
					token_code: '',
					publish_type: 1,
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
		methods: {
			onInput(key) {
				this.value = (this.value + key).slice(0, 6);
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1);
			},
			// 发布接口
			release() {
				this.popupVisible = true
				this.releaseData.token_code = this.detail.code
				api.release(this.releaseData).then(res => {
					if (res.code == 0) {
						toast(res)
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
					this.confirm.payment_id = this.detail.id
					api.confirmPay(this.confirm).then(res => {
						if (res.code == 0) {
							toast(res)
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