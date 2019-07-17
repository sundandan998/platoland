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
				<span>{{this.detail.release.issue_price}}</span>
				<span>{{this.detail.release.denominated_assets}}</span>
			</div>
		</div>
		<div class="Purchase-pass-tabbar">
			<van-tabs @click="getActionType">
				<van-tab :title="$t('m.number')">
					<mt-field :placeholder="'最低购买数量'+this.detail.release.purchase_number" type="number" v-model="requsetPay.amount">
					</mt-field>
					<p>
						<span>{{$t('m.available')}}</span>:{{balData.available_amount}} {{this.detail.release.denominated_assets}}
					</p>
				</van-tab>
				<van-tab :title="$t('m.price')">
					<mt-field :placeholder="'最低购买金额'+this.detail.release.purchase_number*this.detail.release.issue_price" type="number" v-model="requsetPay.amount">
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
	import Clipboard from 'clipboard'
	import $ from 'jquery'
	import { Toast } from 'mint-ui'
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
			// tab栏展示
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
				// 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
				// 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
				// 点击确定按钮发请求
				let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
				if (pay_pwd == 'true') {
					this.requsetPay.transaction_id = this.detail.id
					api.reqPay(this.requsetPay).then(res => {
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
					// debugger
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
					if (val.amount != '' && val.amount != 0) {
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