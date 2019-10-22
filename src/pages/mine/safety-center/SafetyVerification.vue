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
				<span v-show="showTimer" @click="sms_code">发送</span>
				<span v-show="!showTimer" class="count">{{count}} s</span>
			</mt-field>
		</div>
		<div class="safety-verification-list" v-if="show.email">
			<span>{{infoData.email}}</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.email_code" type="number">
				<span v-show="showTimer" @click="email_code">发送</span>
				<span v-show="!showTimer" class="count">{{count}} s</span>
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
				// 60s倒计时
				showTimer: true,
				count: '',
				timer: null,
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
		},
		methods: {
			// 用户信息
			info() {
				api.getUserInfo().then(res => {
					this.infoData = res.data
					this.nextParam.mobile = this.infoData.mobile
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
			// 点击下一步
			next() {
				// 判断跳到哪里 如果是从登录密码跳转过来，跳转到reset里，
				// 如果是从支付密码跳过来，需要跳转到设置支付密码页
				// 如果是从短信或邮箱验证跳转过来，需要进行验证
				if (this.$route.params.id == 'loginPwd') {
					api.safety(this.nextParam).then(res => {
						if (res.code == 0) {
							this.$router.push({
								name: 'Rest'
							})
							toast(res)
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
						}
					})
					// 如果是从支付密码跳过来，需要跳转到设置支付密码页
				} else if (this.$route.params.id == 'pwd') {
					api.safety(this.nextParam).then(res => {
						if (res.code == 0) {
							if (this.infoData.pay_pwd_active == true) {
								this.$router.push({
									name: 'Modify'
								})
							} else {
								this.$router.push({
									name: 'PayPassWorde'
								})
							}
							toast(res)
						}
					}).catch(err => {
						if (err.code != 0) {
							toast(err)
						}
					})
				} else {
					// 判断是解绑还是绑定/如果this.$route.params.active == true,
					// 	// switch是开,即解绑
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
				}
			},
			// 发送信息
			sms_code() {
				api.sms(this.sms).then(res => {
					toast(res)
					// getCode()
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.showTimer = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.showTimer = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
				}).catch(err => {
					toast(err)
				})
			},
			// 发送邮件
			email_code() {
				api.email(this.sms).then(res => {
					toast(res)
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.showTimer = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.showTimer = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
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