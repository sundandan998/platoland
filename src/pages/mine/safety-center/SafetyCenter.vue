<template>
	<div class="safety-center">
		<div class="safety-center-header header">
			<mt-header fixed :title="$t('m.safetyCenter')">
				<router-link to="/mine" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="safety-center-list">
			<router-link :to="{name:'SafetyVerification',params: {id: 'loginPwd'}}">
				<mt-cell :title="$t('m.loginPass')" is-link>
					<!-- <span>{{$t('m.modify')}}</span> -->
					<img slot="icon" src="../../../assets/images/u4107.png">
				</mt-cell>
			</router-link>
			<mt-cell :title="$t('m.payPass')">
				<router-link :to="{name:'SafetyVerification',params: {id: 'pwd'}}">
					<mt-switch :value="infoData.pay_pwd_active"></mt-switch>
				</router-link>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
			<mt-cell :title="$t('m.smsVerification')">
				<router-link :to="{name:'SafetyVerification',params: {action: 'mobile',active:infoData.mobile_active}}">
					<mt-switch :value="infoData.mobile_active"></mt-switch>
				</router-link>
				<img slot="icon" src="../../../assets/images/u4109.png">
			</mt-cell>
			<mt-cell :title="$t('m.emailVerification')">
				<router-link :to="{name:'SafetyVerification',params: {action: 'email',active:infoData.email_active}}">
					<mt-switch :value="infoData.email_active"></mt-switch>
				</router-link>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
		</div>
	</div>
</template>
<script>
	import api from "@/api/user/User.js"
	import { toast } from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				infoData: {
					email_active: '',
					mobile_active: ''
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
					window.sessionStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
				}).catch(err => {
					// toast(err)
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
	.safety-center{
		.mint-cell-text{
			color:#333;
		}
	}
</style>