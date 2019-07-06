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
			<van-tabs @click="getActionType">
				<van-tab :title="$t('m.number')">
					<mt-field :placeholder="$t('m.purchase')" type="number" v-model="requsetPay.amount" placeholder="600,000起购">
					</mt-field>
					<p>
						<span>{{$t('m.available')}}</span>:{{balData.available_amount}} {{this.detail.release.denominated_assets}}
					</p>
				</van-tab>
				<van-tab :title="$t('m.price')">
					<mt-field :placeholder="$t('m.purchase')" type="number" v-model="requsetPay.amount" placeholder="100,000起购">
					</mt-field>
					<p>
						<span>{{$t('m.available')}}</span>:{{balData.available_amount}} {{this.detail.release.denominated_assets}}
					</p>
				</van-tab>
			</van-tabs>
			<div class="buy-pass-time">
				<p>{{$t('m.surplus')}}
					<span>{{this.detail.release.first_number-this.detail.release.sold_number}}</span>
				</p>
				<p>{{$t('m.date')}}
					<span> {{this.detail.release.end_time}}</span>
				</p>
			</div>
			<!-- <div class="buy-pass-time">
				<p>{{$t('m.surplus')}}
					<span>{{this.detail.release.first_number-this.detail.release.sold_number}}</span>
				</p>
				<p>距发行结束剩
					<span>{{this.detail.release.end_time}}</span>
				</p>
			</div> -->
		</div>
		<div>
			<van-popup class="popupbox" position="bottom" v-model="popupVisible">
				<!-- 展示键盘弹起的title -->
				<span class="paymentamount"
					v-if="numTitle">{{this.detail.release.issue_price*requsetPay.amount}}{{this.detail.release.denominated_assets}}</span>
				<span class="paymentamount" v-else>{{requsetPay.amount}} {{this.detail.release.denominated_assets}}</span>
				<van-password-input :value="value" @focus="showKeyboard = true" />
				<!-- 数字键盘 -->
				<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
					@blur="showKeyboard = false" />
			</van-popup>
		</div>
		<div class="buy-pass-btn">
			<mt-button size="large" type="primary" :disabled="disabled" @click="passwordShow">{{$t('m.sure')}}</mt-button>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { toast } from '@/assets/js/pub.js'
	import { mapGetters } from 'vuex'
	// 接口请求
	import api from "@/api/market/Market.js"

	export default {
		data() {
			return {
				value: '',
				// 键盘上标题显隐
				numTitle: true,
				disabled: true,
				showKeyboard: false,
				popupVisible: false,
				// 请求参数
				requsetPay: {
					order_type: 0,
					transaction_id: '',
					amount: '',
					action_type: 0
				},
				// 确认支付参数
				confirm: {
					order_type: 0,
					payment_id: '',
					pay_pwd: ''
				},
				balData: '',
				// 获取资产余额参数
				balanceData: {
					token_code: ''
				},
			}
		},
		created() {
			this.balance()
		},
		methods: {
			onInput(key) {
				this.value = (this.value + key).slice(0, 6)
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1)
			},
			getActionType(index, title) {
				if (index == 0) {
					this.requsetPay.action_type = 0
					// 键盘上标题显隐
					this.numTitle = true
					this.balance()
				} else {
					if (index == 1) {
						this.requsetPay.action_type = 1
						// 键盘上标题显隐
						this.numTitle = false
						this.balance()
					}
				}
			},
			// 点击确定按钮
			passwordShow() {
				this.popupVisible = true
				this.requsetPay.transaction_id = this.detail.id
				api.reqPay(this.requsetPay).then(res => {
					if (res.code == 0) {
						this.confirm.order_type = res.order_type
						this.confirm.payment_id = res.transaction_id
					}
				}).catch(err => {
					if (err.code != 0) {
						toast(err)
					}
				})
			},
			// 获取资产余额
			balance() {
				this.balanceData.token_code = this.detail.release.denominated_assets
				api.balance(this.balanceData).then(res => {
					this.balData = res.data
				}).catch(err => {
					toast(err)
				})
			},
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
					this.confirm.pay_pwd = this.value
					// 清空密码输入框
					this.value = ''
					// 确认支付接口
					api.confirmPay(this.confirm).then(res => {
						if (res.code == 0) {
							toast(res)
							this.$router.push({
								name: 'Detail',
								params: {
									code: this.detail.code
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