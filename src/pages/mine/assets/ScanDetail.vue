<template>
	<div class="scandetail">
		<div class="scandetail-header">
			<mt-header fixed :title="$t('m.scan')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
		<div class="scandetail-information">
			<mt-cell title="付款给" value="- -">
				<img slot="icon" src="../../../assets/images/u4662.png">
			</mt-cell>
			<mt-cell title="地址" :value="this.detail.address">
				<img slot="icon" src="../../../assets/images/u4666.png">
			</mt-cell>
			<mt-cell title="资产">
				<span>
					<img :src="this.detail.token.icon" alt="">{{this.detail.token.code}}({{this.detail.token.nickname}})
					<p>{{this.detail.token.subject}}</p>
				</span>
				<img slot="icon" src="../../../assets/images/u4666.png">
			</mt-cell>
		</div>
		<div class="scandetail-num">
			<span>数量</span>
			<input type="number" v-model="turnOut.amount" />
			<p>可用 1.00</p>
			<p>手续费0.002PLD</p>
		</div>
		<div class="scandetail-btn">
			<mt-button type="primary" size="large" @click="passwordShow" :disabled="disabled">确认</mt-button>
		</div>
		<div class="scandetail-text">
			<p>注意:</p>
			<p>1.请仔细核对转入账户是否可用、有效，转出成功将无法退回</p>
			<p>2.请勿向陌生账户转出付款</p>
		</div>
		<div>
			<van-popup class="popupbox" position="bottom" v-model="popupVisible">
				<span class="paymentamount">2.00 LD</span>
				<van-password-input :value="value" @focus="showKeyboard = true" />
				<!-- 数字键盘 -->
				<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete" @blur="showKeyboard = false"
				/>
			</van-popup>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { toast } from '@/assets/js/pub.js'
	import api from "@/api/user/User.js"
	export default {
		data() {
			return {
				value: '',
				hide: '',
				disabled: true,
				// 转出参数
				turnOut: {
					token: '',
					address: '',
					amount: '',
					pay_pwd: ''
				},
				showKeyboard: false,
				popupVisible: false,
			}
		},
		methods: {
			onInput(key) {
				this.value = (this.value + key).slice(0, 6);
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1);
			},
			passwordShow(hide) {
				this.hide = !(hide === 'show')
				this.popupVisible = !(false === 'true')
			}
		},
		computed: {
			...mapGetters([
				'detail'
			])
		},
		watch: {
			value() {
				this.turnOut.token = this.detail.token.code
				this.turnOut.address = this.detail.address
				if (this.value.length == 6) {
					api.outAsset(this.turnOut).then(res => {
						if (res.code == 0) {
							toast(res)
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
						}
					})
					this.popupVisible = false
					// this.$router.push({
					// 	path: '/assetsdetailed'
					// })
				}
			},
			turnOut: {
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