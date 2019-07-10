<template>
	<div class="safety-verification">
		<div class="safety-verification-header">
			<mt-header fixed :title="$t('m.securityverification')">
				<router-link to="/safety" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="safety-verification-list" v-if="show.mobile">
			<span>{{infoData.mobile}}</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.sms_code" type="number">
				<span @click="sms_code">{{$t('m.send')}}</span>
			</mt-field>
		</div>
		<div class="safety-verification-list" v-if="show.email">
			<span>{{infoData.email}}</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.email_code" type="number">
				<span @click="email_code">{{$t('m.send')}}</span>
			</mt-field>
		</div>
		<div class="safety-verification-btn">
			<mt-button type="primary" size="large" @click.native="next" :disabled="disabled">{{$t('m.next')}}</mt-button>
		</div>
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
				infoData: {},
				show: {
					'mobile': true,
					'email': true
				},
				// 下一步接口参数
				nextParam: {
					mobile: '',
					email: '',
					sms_code: '',
					email_code: '',
					action: ''
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
			this.info()
			// 获取用户名信息
			// console.log(this.$route.params.active)
			// var nextData = window.sessionStorage.getItem('userInfo')
			// nextData = JSON.parse(nextData)
			// this.nextParam.mobile = nextData.data.mobile
			// this.nextParam.email = nextData.data.email
			// this.sms.mobile = nextData.data.mobile
			// this.sms.email = nextData.data.email
		},
		methods: {
			// 用户信息
			info() {
				api.getUserInfo().then(res => {
					this.infoData = res.data
					this.nextParam.mobile =  this.infoData.mobile
					this.nextParam.email = this.infoData.email
					this.sms.mobile = this.infoData.mobile
					this.sms.email = this.infoData.email
					// 判断展示的是邮箱还是手机号
					if (this.infoData.mobile_active == true) {
						this.show.mobile = true
					} else {
						this.show.mobile = false
					}
					if (this.infoData.email_active == true) {
						this.show.email = true
					} else {
						this.show.email = false
					}
				}).catch(err => {
					// toast(err)
				})
			},
			// 解绑微信或信息
			next() {
				// 判断是解绑还是绑定/如果this.$route.params.active == true,
				// switch是开,即解绑
				console.log(this.nextParam.mobile)
				if (this.$route.params.active == true) {
					this.nextParam.action = this.$route.params.action
					api.safety(this.nextParam).then(res => {
						if (res.code == 0) {
							this.$router.push({
								name: 'Safety'
							})
							toast(res)
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
						}
					})
					//switch是关,即绑定
				} else {
					api.safety(this.nextParam).then(res => {
						if (res.code == 0) {
							// 发送成功后,开始绑定,判断跳转到开启信息页面还是跳转到开启邮箱页面
							if (this.$route.params.action == 'email') {
								this.$router.push({
									name: 'Email'
								})
							} else {
								this.$router.push({
									name: 'Open'
								})
							}
							toast(res)
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