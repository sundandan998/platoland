<template>
	<div class="open-pay-password">
		<div class="open-pay-password-header">
			<mt-header fixed title="设置支付密码">
				<router-link to="/safety" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="open-pay-password-keyboard">
			<div class="open-pay-password-keyboard-title">
				<span>设置6位数字支付密码</span>
			</div>
			<!-- 密码输入框 -->
			<van-password-input :value="pass.pwd" :mask="true" info="支付密码不能是重复、连续的数字" @focus="passIndex" />
			<div class="open-pay-password-keyboard-title">
				<span>再次输入支付密码</span>
			</div>
			<van-password-input :value="pass.pwd2" :mask="true" @focus="passIndex1" />
			<!-- 数字键盘 -->
			<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
		</div>
		<div class="rest-pass-word-btn">
			<mt-button type="primary" size="large" @click="payPwd" :disabled=disabled>确认</mt-button>
		</div>
		<div class="open-pay-password-keyboard-text">
			<p>注意：</p>
			<p>支付密码将用于资产转出时的验证，请妥善保管</p>
		</div>
	</div>
</template>
<script>
	// 接口请求
	import api from "@/api/user/User.js"
	import { toast } from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				index: 0,
				disabled: true,
				showKeyboard: false,
				pass: {
					pwd: '',
					pwd2: ''
				}
			};
		},
		methods: {
			passIndex() {
				this.showKeyboard = true
				this.index = 0
			},
			passIndex1() {
				this.showKeyboard = true
				this.index = 1
			},
			onInput(key) {
				if (this.index === 0) {
					this.pass.pwd = (this.pass.pwd + key).slice(0, 6)
				} else {
					this.pass.pwd2 = (this.pass.pwd2 + key).slice(0, 6)
				}
			},
			onDelete() {
				if (this.index === 0) {
					this.pass.pwd = this.pass.pwd.slice(0, this.pass.pwd.length - 1)
				} else {
					this.pass.pwd2 = this.pass.pwd2.slice(0, this.pass.pwd2.length - 1)
				}

			},
			// 设置支付密码
			payPwd() {
				api.payPwd(this.pass).then(res => {
					toast(res)
					console.log(this.pass)
				}).catch(err => {
					toast(err)
				})
			}
		},
		watch: {
			pass: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.pwd != '' && val.pwd2 != '') {
						this.disabled = false
					} else {
						this.disabled = true
					}
				}
			}
		},
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>