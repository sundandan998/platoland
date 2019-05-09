<template>
	<div class="open-information">
		<div class="open-information-header">
			<mt-header fixed :title="$t('m.opensmsverification')">
			  <router-link to="/safety" slot="left">
			    <mt-button icon="back">{{$t('m.back')}}</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="open-information-from">
			<el-form class="demo-ruleForm">
				<el-form-item :label="$t('m.phonenumber')">
		    		<el-input type="text" autocomplete="off" :placeholder="$t('m.mobilenumber')"></el-input>
		  		</el-form-item>
		  		<el-form-item :label="$t('m.smsverification')">
		  			<span class="fr">{{$t('m.send')}}</span>
		    		<el-input type="text" autocomplete="off" :placeholder="$t('m.smsverification')"></el-input>	</el-form-item>
			</el-form>
		</div>
		<div class="rest-pass-word-btn">
			<router-link to="/safety">
				<mt-button type="primary" size="large">{{$t('m.sure')}}</mt-button>
			</router-link>
		</div>
		<div class="rest-pass-word-text">
			<p>{{$t('m.becareful')}}</p>
			<p>{{$t('m.securityverificationone')}}</p>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
