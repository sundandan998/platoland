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
			<span>138....1214</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.sms_code" type="number">{{$t('m.send')}}</mt-field>
		</div>
		<div class="safety-verification-list">
			<span>han****@163.com</span>
			<mt-field :placeholder="$t('m.verificationcode')" v-model="nextParam.email_code" type="number">{{$t('m.send')}}</mt-field>
		</div>
		<!-- <router-link to="/open"> -->
		<div class="safety-verification-btn">
			<mt-button type="primary" size="large" @click="next" :disabled="disabled">{{$t('m.next')}}</mt-button>
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
	export default {
		data() {
			return {
				disabled: false,
				// 下一步接口参数
				nextParam: {
					mobile: '18713351004',
					email: '12345@qq.com',
					sms_code: '123456',
					email_code: '234566',
					password: 'sanbap6537'
				}
			}
		},
		methods: {
			next() {
			if (this.nextParam.mobile != '' || this.nextParam.email != '' && this.nextParam.sms_code != '' || this.nextParam.email_code != '' && this.nextParam.password != '')
				// this.disabled = false
				var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
				var url = window.location.href.split('?')
				api.safety(this.nextParam).then(res => {
					// debugger
					if (url[2]== "rest") {
						this.$router.push({
							name: 'Rest'
						})
					} else {
						if (url[2] == "pwd") {
							this.$router.push({
								name: 'Safety'
							})
						}
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>