<template>
	<div class="open-pay-password">
		<div class="open-pay-password-header">
			<mt-header fixed :title="$t('m.setPayPass')">
				<router-link to="/safety" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="open-pay-password-keyboard">
			<div class="open-pay-password-keyboard-title">
				<span>{{$t('m.sixPayPass')}}</span>
			</div>
			<!-- 密码输入框 -->
			<!-- info="支付密码不能是重复、连续的数字" -->
			<van-password-input :value="pass.pwd" :mask="true"  @focus="passIndex" />
			<div class="open-pay-password-keyboard-title">
				<span>{{$t('m.aginPayPass')}}</span>
			</div>
			<van-password-input :value="pass.pwd2" :mask="true" @focus="passIndex1" />
			<!-- 数字键盘 -->
			<van-number-keyboard delete-button-text="Delete" :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
		</div>
		<div class="rest-pass-word-btn">
			<mt-button type="primary" size="large" @click="payPwd" :disabled=disabled>{{$t('m.sure')}}</mt-button>
		</div>
		<div class="open-pay-password-keyboard-text">
			<p>{{$t('m.note')}}：</p>
			<p>{{$t('m.payPassNote')}}</p>
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
					if(res.code==0){
						toast(res)
						this.$router.push({
							name:'Mine'
						})
					}
					
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
	@import '../../../assets/scss/global';
	.open-pay-password{
	.open-pay-password-keyboard{
		margin-top: 60px;
	}

	}
</style>