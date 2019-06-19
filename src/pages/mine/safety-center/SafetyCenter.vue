<template>
	<div class="safety-center">
		<div class="safety-center-header">
			<mt-header fixed :title="$t('m.safetycenter')">
				<router-link to="/mine" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="safety-center-list">
			<router-link to="/safetyVerification?rest">
				<mt-cell :title="$t('m.loginpwd')" is-link>
					<!-- <span>{{$t('m.modify')}}</span> -->
					<img slot="icon" src="../../../assets/images/u4107.png">
				</mt-cell>
			</router-link>
			<mt-cell :title="$t('m.paymentpwd')" value="-3000">
				<router-link to="/safetyverification">
					<mt-switch v-model="value"></mt-switch>
				</router-link>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
			<mt-cell :title="$t('m.authentication')" value="-3000">
				<mt-switch :value="infoData.mobile_active" @click.native="sms"></mt-switch>
				<img slot="icon" src="../../../assets/images/u4109.png">
			</mt-cell>
			<mt-cell title="邮箱验证" value="-3000">
				<mt-switch :value="infoData.email_active" @click.native="email"></mt-switch>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
		</div>
	</div>
</template>

<script>
import api from "@/api/user/User.js"
import {toast} from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				infoData:{},
				value: '',
				next:{
					action:''
				}
			}
		},
		created(){
			this.info()
		},
		methods: {
			// 用户信息
			info() {
				api.getUserInfo().then(res => {
					this.infoData = res.data
					// toast(res)
				}).catch(err => {
					// toast(err)
				})
			},
			// 信息跳转
			sms() {
				if (this.infoData.mobile_active == true) {
					this.$router.push({
						name: 'SafetyVerification',
						// params:''
					})
				} else {
					this.$router.push({
						name: 'Open'
					})
				}
			},
			// 邮箱跳转
			email() {
				if (this.infoData.email_active == true) {
					this.$router.push({
						name: 'SafetyVerification'
					})
				} else {
					this.$router.push({
						name: 'Email'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>