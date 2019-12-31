<template>
	<div class="purchase-pass">
		<div class="Purchase-pass-header header">
			<mt-header fixed :title="$t('m.sell')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="Purchase-pass-content">
			<div class="Purchase-pass-content-top">
				<img :src="buyDataToken.icon" alt="" class="fl" />
				<span>{{buyDataToken.code}}({{buyDataToken.nickname}})</span>
				<span>{{buyDataToken.subject}}</span>
				<p>{{buyData.publish_name}}</p>
				<!-- <P>{{infoData}}</P> -->
			</div>
			<div class="Purchase-pass-content-bot">
				<img src="../../../assets/images/t.png" alt="" />
				<span>{{buyData.price}}</span>
			</div>
		</div>
		<div class="Purchase-pass-tabbar">
			<van-tabs @click="buyIndex">
				<van-tab :title="$t('m.numsale')">
					<mt-field :placeholder="'最低出售数量'+ buyData.low_number" type="number" v-model="reqPay.amount"></mt-field>
					<p>{{$t('m.available')}}：{{balData.available_amount|number}} {{buyDataToken.code}}</p>
					<!-- <p>{{$t('m.available')}}：{{balData.available_amount}} {{buyDataToken.code}}</p> -->
					<!-- <p>{{$t('m.servicecharge')}}：{{reqPay.amount*0.002}}PLD</p> -->
					<p>{{$t('m.servicecharge')}}:推广期暂免</p>
				</van-tab>
				<van-tab :title="$t('m.pricesale')">
					<mt-field :placeholder="'最低出售金额'+ buyData.low_number*buyData.price" type="number" v-model="reqPay.amount"></mt-field>
					<p>{{$t('m.available')}}：{{balData.available_amount|number}}{{buyDataToken.code}}</p>
					<!-- <p>{{$t('m.servicecharge')}}：{{reqPay.amount*0.002}}PLD</p> -->
					<p>{{$t('m.servicecharge')}}:推广期暂免</p>
				</van-tab>
			</van-tabs>
		</div>
		<div class="Purchase-pass-btn">
			<mt-button size="large" type="primary" @click.native="sell" :disabled="disabled">{{$t('m.sure')}}</mt-button>
		</div>
		<div class="payment">
			<div class="payment-header">
			</div>
			<div>
				<van-popup class="popupbox" position="bottom" v-model="popupVisible">
					<span v-if="buyTitle" class="paymentamount">{{reqPay.amount}}&nbsp;({{buyDataToken.code}})</span>
					<span v-else class="paymentamount">{{reqPay.amount}}&nbsp;({{buyData.denominated_assets}})</span>
					<van-password-input :value="value" @focus="showKeyboard = true" />
					<!-- 数字键盘 -->
					<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
						@blur="showKeyboard = false" />
				</van-popup>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { Toast } from 'mint-ui'
	import api from '@/api/market/Market.js'
	import { toast } from '@/assets/js/pub.js'
	import { MessageBox } from 'mint-ui'
	export default {
		data() {
			return {
				value: '',
				showKeyboard: false,
				popupVisible: false,
				buyData: {},
				buyDataToken: {},
				disabled: true,
				// 支付键盘中标题
				buyTitle: true,
				// 请求支付参数
				reqPay: {
					order_type: 1,
					transaction_id: '',
					amount: '',
					action_type: 0
				},
				// 确认支付参数
				confirmPay: {
					order_type: '',
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
			this.buyDetail()
			this.buyIndex(0, '111')
		},
		methods: {
			onInput(key) {
				this.value = (this.value + key).slice(0, 6)
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1)
			},
			// 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
			// 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
			// 点击确定按钮发请求
			sell() {
				let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
				if (pay_pwd == 'true') {
					// 请求支付
					this.reqPay.transaction_id = this.$route.params.id
					api.reqPay(this.reqPay).then(res => {
						// 清空密码输入框
						this.value = ''
						if (res.code == 0) {
							this.popupVisible = true
							this.confirmPay.order_type = res.order_type
							this.confirmPay.payment_id = res.transaction_id
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
							this.value = ''
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
			buyIndex(index, title) {
				if (index == 0) {
					this.buyTitle = true
					this.reqPay.action_type = 0
					this.balance()
				} else {
					this.buyTitle = false
					this.reqPay.action_type = 1
					this.balance()
				}
			},
			// 交易详情
			buyDetail() {
				api.buyDetail({id:this.$route.params.id}).then(res => {
					this.buyData = res.data
					this.buyDataToken = res.data.token
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取资产余额
			balance() {
				this.balanceData.token_code = this.$route.params.code
				api.balance(this.balanceData).then(res => {
					this.balData = res.data
					if (res.code == 0) {
						// toast(res)
					}
				}).catch(err => {
					if (err.code == 4003) {
						this.balData = { 'available_amount': '0', 'freeze_amount': '0', 'id': null }
					}
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
					this.confirmPay.pay_pwd = this.value
					// 确认支付
					api.confirmPay(this.confirmPay).then(res => {
						if (res.code == 0) {
							toast(res)
							this.$router.push({
								path: '/deal'
							})
						}
					}).catch(err => {
						toast(err)
					})
				}
			},
			reqPay: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.amount != '' && val.amount != 0) {
						this.disabled = false
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	@import '../../../assets/scss/global'
</style>