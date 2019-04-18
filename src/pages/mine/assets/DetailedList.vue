<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header title="明细">
			  <router-link to="/assets" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="assets-detailed-list">
			<router-link to="/transaction">
				<mt-cell title="转出" to="/transaction" is-link label="2018-03-06  12:03">					
			  		<span>-30000</span>
				</mt-cell>	
				<p>USDT</p>
			</router-link>			
			<router-link to="/transaction">
				<mt-cell title="转入" to="/transaction" is-link label="2018-03-06  12:03">					
				   <span>+20000</span>
				</mt-cell>
				<p>USDT</p>
			</router-link>
			<router-link to="/transaction">
				<mt-cell title="转出" to="/transaction" is-link label="2018-03-06  12:03">					
				   <span>-30000</span>
				</mt-cell>
				<p>USDT</p>
			</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>