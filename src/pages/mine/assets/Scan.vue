<template>
	<div class="scan">
		<div class="scan-header">
			<mt-header fixed :title="$t('m.scan')">
			    <mt-button icon="back"slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			  <mt-button icon slot="right">
	          	<router-link to="/">
	            	<span>{{$t('m.album')}}</span>
	          	</router-link>
        	  </mt-button>
			</mt-header>
		</div>
		<div class="scan-button">
			<router-link to="/scandetail">
				<!--<mt-button type="primary" size="large">转出</mt-button>-->
			</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
