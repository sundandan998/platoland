<template>
	<div class="safety-verification">
		<div class="safety-verification-header">
			<mt-header fixed :title="$t('m.securityverification')">
				<router-link to="/safety" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="safety-verification-list">
			<span>{{nextParam.mobile}}</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.sms_code" type="number">
				<span @click="sms_code">{{$t('m.send')}}</span>
			</mt-field>
		</div>
		<div class="safety-verification-list">
			<span>{{nextParam.email}}</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.email_code" type="number">
				<span @click="email_code">{{$t('m.send')}}</span>
			</mt-field>
		</div>
		<!-- <router-link to="/open"> -->
		<div class="safety-verification-btn">
			<mt-button type="primary" size="large" @click.native="next" :disabled="disabled">{{$t('m.next')}}</mt-button>
		</div>
		<!-- </router-link> -->
		<div class="safety-verification-text">
			<p>{{$t('m.becareful')}}</p>
			<p>{{$t('m.securityverificationone')}}</p>
		</div>
	</div>
</template>
<script>
	// 接口请求
	import api from "@/api/system/System.js"
	import { toast } from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				disabled: true,
				nextData: {},
				// 下一步接口参数
				nextParam: {
					mobile: '',
					email: '',
					sms_code: '',
					email_code: '',
					action: 'email'
				},
				payPwd: {
					mobile: '',
					email: '',
					sms_code: '',
					email_code: '',
				},
				// 短信参数
				sms: {
					mobile: [],
					action: 2
				},
				// 邮箱参数
				email: {
					action: 2,
					email: []
				},
			}
		},
		created() {
			// this.payPwd()
			// 获取用户名信息
			var nextData = window.sessionStorage.getItem('userInfo')
			nextData = JSON.parse(nextData)
			this.nextParam.mobile = nextData.data.mobile
			this.nextParam.email = nextData.data.email
			this.payPwd.mobile = nextData.data.mobile
			this.payPwd.email = nextData.data.email
			this.sms.mobile = nextData.data.mobile
			this.sms.email = nextData.data.email
		},
		methods: {
			// / 下一步按钮
			next() {
				debugger
				this.payPwd.sms_code = this.nextParam.sms_code
				this.payPwd.email_code = this.nextParam.email_code
				var pwdUrl = window.location.href.split("?")
				// 根据id判断跳转设置支付密码页或解绑
				if (pwdUrl[1] == 'id=1') {
					api.safety(this.payPwd).then(res => {
						toast(res)
						this.$router.push({
							name: 'PayPassWorde'
						})
					}).catch(err => {
						toast(err)
					})
				} else {
					var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
					var url = window.location.href.split('?')
					api.safety(this.nextParam).then(res => {
						toast(res)
						if (url[2] == "rest") {
							this.$router.push({
								name: 'Rest'
							})
						} else {
							this.$router.push({
								name: 'Safety'
							})
						}
					}).catch(err => {
						toast(err)
					})
				}
			},
			// 发送信息
			sms_code() {
				api.sms(this.sms).then(res => {
					toast(res)
				}).catch(err => {
					toast(err)
				})
			},
			// 发送邮件
			email_code() {
				api.email(this.sms).then(res => {
					toast(res)
				}).catch(err => {
					toast(err)
				})
			}
		},
		watch: {
			nextParam: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.sms_code != '' || val.email_code != '') {
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