<template>
	<div class="reset-mail">
		<div class="logo">
			<img src="../../../assets/images/u166.png"/>
		</div>
		<div class="reset-mail-information">
			<img src="../../../assets/images/finshed.png" alt="" />
			<p>已向xiaolingzi@163.com发送重置邮件</p>
			<span>重置链接有效期为24小时。请及时登录邮箱，点击邮件中的链接重置密码。</span>		
		</div>
		<div class="login-btn">
			<router-link to="/login">
				<mt-button type="primary" size="large">确定</mt-button>
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
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>