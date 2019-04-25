<template>
	<div class="open-information">
		<div class="open-information-header">
			<mt-header fixed title="开启短信验证">
			  <router-link to="/safety" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>		
		</div>
		<div class="open-information-from">
			<el-form class="demo-ruleForm">
				<el-form-item label="手机号">
		    		<el-input type="text" autocomplete="off" placeholder="11位手机号"></el-input>
		  		</el-form-item>
		  		<el-form-item label="短信验证">
		  			<span class="fr">发送</span>
		    		<el-input type="text" autocomplete="off" placeholder="输入验证码"></el-input>		 			</el-form-item>
			</el-form>
		</div>
		<div class="rest-pass-word-btn">
			<router-link to="/safety">
				<mt-button type="primary" size="large">确认</mt-button>	
			</router-link>
		</div>
		<div class="rest-pass-word-text">
			<p>注意：</p>
			<p>为保证资产安全，请勿将短信验证码泄露给他人</p>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>