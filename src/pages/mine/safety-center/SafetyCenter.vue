<template>
	<div class="safety-center">
		<div class="safety-center-header">
			<mt-header title="安全中心">
			  <router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="safety-center-list">
			<mt-cell title="登录密码"to="/rest" is-link>
				 <span><img src="../../../assets/images/u4061.png"/></span>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
			<mt-cell title="短信认证"to="/open" is-link value="-3000">
				<mt-switch v-model="value1"></mt-switch>
				<img slot="icon" src="../../../assets/images/u4109.png">
			</mt-cell>
				<mt-cell title="支付密码"to="/paypassword" is-link value="-3000">
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