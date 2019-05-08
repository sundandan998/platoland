<template>
	<div class="safety-verification">
		<div class="safety-verification-header">
			<mt-header fixed title="安全验证">
			  <router-link to="/safety" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			</mt-header>
		</div>
    <div class="safety-verification-list">
      <span>138....1214</span>
      <div>
        <input type="text" placeholder="输入验证码"> <b>发送</b>
      </div>
    </div>
    <div class="safety-verification-list">
      <span>han****@163.com</span>
      <div>
        <input type="text" placeholder="输入验证码"> <b>发送</b>
      </div>
    </div>
    <div class="safety-verification-list">
      <span>登录密码</span>
      <div>
        <input type="text" placeholder="输入登录密码"> <b></b>
      </div>
    </div>
		<router-link to="/open">
			<div class="safety-verification-btn">
				<mt-button type="primary" size="large">下一步</mt-button>
			</div>
		</router-link>

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
