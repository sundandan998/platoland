<template>
	<div class="register">
		<div class="logo">
			<img src="../../assets/images/u166.png"/>
		</div>
		<div class="login-title">
			<h1>注册</h1>
		</div>
		<div class="login-content">
			<mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" @blur.native.capture ="sendEmail">
				<img src="../../assets/images/email.png" alt="" />
			</mt-field>
		</div>
		<div class="login-btn">
			<router-link to="/send">
				<mt-button type="primary" size="large">注册</mt-button>
			</router-link>			
		</div>
		<div class="register-footer">
			<ul>
				<li>帮助</li>
				<li>隐私</li>
				<li>条款</li>
			</ul>
			<p>copyright2017 PLATOLAND</p>
		</div>
	</div>
</template>

<script>
import pub from '@/assets/js/pub.js'
export default {
	data(){
		return{
			email: ''
		}
	},
	methods:{
		sendEmail(){
			pub.sendEmail()
		}
	}
}
</script>

<style lang="scss">
	@import '../../assets/scss/global';
</style>