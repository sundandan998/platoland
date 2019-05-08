<template>
	<div class="safety-center">
		<div class="safety-center-header">
			<mt-header fixed title="安全中心">
			  <router-link to="/mine" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="safety-center-list">
			<mt-cell title="登录密码"to="/safetyverification" is-link>
				 <span>修改</span>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
			<mt-cell title="短信认证"to="/safetyverification" is-link value="-3000">
				<mt-switch v-model="value1"></mt-switch>
				<img slot="icon" src="../../../assets/images/u4109.png">
			</mt-cell>
				<mt-cell title="支付密码"to="/safetyverification" is-link value="-3000">
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
