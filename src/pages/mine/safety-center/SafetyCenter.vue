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
			<router-link to="/safetyVerification?rest">
			<mt-cell :title="$t('m.loginpwd')" is-link>
				<!-- <span>{{$t('m.modify')}}</span> -->
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
		</router-link>
			<mt-cell :title="$t('m.paymentpwd')" value="-3000">
				<router-link to="/safetyverification?pwd">
				<mt-switch v-model="value" @click="payPwd"></mt-switch>
				</router-link>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
			<mt-cell :title="$t('m.authentication')" to="/safetyverification" value="-3000">
				<router-link to="/safetyverification?info">
				<mt-switch v-model="value1"></mt-switch>
			</router-link>
				<img slot="icon" src="../../../assets/images/u4109.png">
			</mt-cell>
			<mt-cell title="邮箱验证" to="/safetyverification" value="-3000">
				<router-link to="/safetyverification">
				<mt-switch v-model="value"></mt-switch>
				</router-link>
				<img slot="icon" src="../../../assets/images/u4107.png">
			</mt-cell>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: true,
				value1: false
			}
		},
		methods: {
			payPwd() {
				this.$router.push({
					name: 'SafetyVerification'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>