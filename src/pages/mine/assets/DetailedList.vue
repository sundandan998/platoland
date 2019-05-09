<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed :title="$t('m.passdetails')">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="assets-detailed-list">
			<router-link to="/transaction">
				<mt-cell :title="$t('m.changeout')" to="/transaction" is-link label="2018-03-06  12:03">
			  		<span>-30000</span>
				</mt-cell>
				<p>USDT</p>
			</router-link>
			<router-link to="/transaction">
				<mt-cell :title="$t('m.changeinto')" to="/transaction" is-link label="2018-03-06  12:03">
				   <span>+20000</span>
				</mt-cell>
				<p>USDT</p>
			</router-link>
			<router-link to="/transaction">
				<mt-cell :title="$t('m.changeout')" to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<p>USDT</p>
			</router-link>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{

		}
	},
	methods:{
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
