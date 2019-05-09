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
			<mt-cell :title="$t('m.loginpwd')"to="/safetyverification" is-link>
				 <span>{{$t('m.modify')}}</span>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
			<mt-cell :title="$t('m.authentication')"to="/safetyverification" is-link value="-3000">
				<mt-switch v-model="value1"></mt-switch>
				<img slot="icon" src="../../../assets/images/u4109.png">
			</mt-cell>
				<mt-cell :title="$t('m.paymentpwd')"to="/safetyverification" is-link value="-3000">
				<mt-switch v-model="value"></mt-switch>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
		</div>
	</div>
</template>

<script>
export default {
	data () {
	    return {
	      value: true,
          value1: false
	    }
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/global';
</style>
