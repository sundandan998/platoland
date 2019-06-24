<template>
	<div class="buy-pass">
		<div class="buy-pass-header">
			<mt-header fixed :title="$t('m.buyingpass')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="buy-pass-name">
			<img :src="this.detail.icon" alt="" class="fl" />
			<div class="buy-pass-name-text">
				<span>{{this.detail.code}} ({{this.detail.name}})</span>
				<p>{{this.detail.subject.name}}</p>
			</div>
		</div>
		<div class="buy-pass-name-price">
			<p>{{$t('m.unitprice')}}</p>
			<div class="buy-pass-name-price-text fr">
				<span>{{parseInt(this.detail.release.issue_price)}}</span>
				<span>{{this.detail.release.denominated_assets}}</span>
			</div>
		</div>
		<div class="Purchase-pass-tabbar">
			<van-tabs>
				<van-tab :title="$t('m.number')">
					<mt-field :placeholder="$t('m.purchase')" type="number" v-model="requsetPay.amount"></mt-field>
					<p>
						<span>{{$t('m.available')}}</span>：1,000 USDT</p>
				</van-tab>
				<van-tab :title="$t('m.price')">
					<mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
					<p>
						<span>{{$t('m.available')}}</span>：1,000 USDT</p>
				</van-tab>
			</van-tabs>
			<div class="buy-pass-time">
				<p>{{$t('m.surplus')}}
					<span>700000</span>
				</p>
				<!-- <p>距发行结束剩 <span>90天</span></p> -->
				<p>{{$t('m.date')}}
					<span> 2021-01-01</span>
				</p>
			</div>
		</div>
		<div>
			<van-popup class="popupbox" position="bottom" v-model="popupVisible">
				<span class="paymentamount">1.00 USDT</span>
				<van-password-input :value="value" @focus="showKeyboard = true" />
				<!-- 数字键盘 -->
				<van-number-keyboard v-model="confirm.pay_pwd" :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
				 @blur="showKeyboard = false" />
			</van-popup>
		</div>
		<div class="buy-pass-btn">
			<mt-button size="large" type="primary" :disabled="disabled" @click="passwordShow">{{$t('m.sure')}}</mt-button>
		</div>
	</div>
</template>

<script>
	import { toast } from '@/assets/js/pub.js'
	import { mapGetters } from 'vuex'
	// 接口请求
	import api from "@/api/market/Market.js"
	export default {
		data() {
			return {
				value: '',
				disabled: true,
				showKeyboard: false,
				popupVisible: false,
				// 请求参数
				requsetPay: {
					order_type: 1,
					transaction_id: '',
					amount: '',
					action_type: 1
				},
				// 确认支付参数
				confirm: {
					order_type: 1,
					payment_id: '',
					// pay_pwd:''
				}
			}
		},
		methods: {
			onInput(key) {
				this.value = (this.value + key).slice(0, 6)
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1)
			},
			passwordShow() {
				this.popupVisible = true
				this.requsetPay.transaction_id = this.detail.id
				api.reqPay(this.requsetPay).then(res => {
				}).catch(err => {
					if (err.code != 0) {
						toast(err)
					}
				})
			}
		},
		computed: {
			...mapGetters([
				'detail'
			])
		},
		watch: {
			value() {
				if (this.value.length == 6) {
					this.popupVisible = false
					this.confirm.payment_id = this.detail.id
					api.confirmPay(this.confirm).then(res => {
						if (res.code == 0) {
							toast(res)
							this.$router.push({
								name: 'Detail',
								params:{
									code:this.detail.code
								}
							})
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
						}
					})

				}

			},
			requsetPay: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.amount != '') {
						this.disabled = false
					} else {
						this.disabled = true
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>