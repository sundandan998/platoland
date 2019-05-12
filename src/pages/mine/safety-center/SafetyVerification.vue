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
        <mt-field :placeholder="$t('m.verificationcode')" type="number">{{$t('m.send')}}</mt-field>
    </div>
    <div class="safety-verification-list">
      <span>han****@163.com</span>
       <mt-field :placeholder="$t('m.verificationcode')" type="number">{{$t('m.send')}}</mt-field>
    </div>
    <div class="safety-verification-list">
      <span>{{$t('m.loginpwd')}}</span>
        <mt-field :placeholder="$t('m.inputpwd')" type="number"></mt-field>
    </div>
		<router-link to="/open">
			<div class="safety-verification-btn">
				<mt-button type="primary" size="large">{{$t('m.next')}}</mt-button>
			</div>
		</router-link>

		<div class="safety-verification-text">
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
