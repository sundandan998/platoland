<template>
	<div class="safety-verification">
		<div class="safety-verification-header">
			<mt-header title="安全验证">
			  <router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="safety-verification-list">
			<ul>
				<li><span>136****7661</span></li>
				<li><input type="text" placeholder="请输入验证码"/><span class=" safety-send fr">发送</span></li>
			</ul>	
			<ul>
				<li><span>136****7661</span></li>
				<li><input type="text" placeholder="请输入验证码"/><span class=" safety-send fr">发送</span></li>
			</ul>
		</div>
		<div class="safety-verification-btn">
			<mt-button type="primary" size="large">下一步</mt-button>
		</div>
		<div class="safety-verification-text">
			<p>注意：</p>
			<p>为保证资产安全，请勿将邮箱、短信验证码泄露给他人。</p>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>