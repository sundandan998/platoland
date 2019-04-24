<template>
	<div class="news-center">
		<!--顶部标题-->
		<div class="news-center-header">
			<mt-header fixed title="公告中心">
			  <router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="news-center-list">
			<mt-cell title="PLATOLAND生态获区块链协会创新应用大奖！" 
				label="2019-03-26  15:02 " to="/newsdetails">
				<img slot="icon" src="../../../assets/images/u357.png">
			</mt-cell>
			<mt-cell title="PLATOLAND生态获区块链协会创新应用大奖！" 
				label="2019-03-26  15:02 "  to="/newsdetails">
				<img slot="icon" src="../../../assets/images/u357.png">
			</mt-cell>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			selected: 'notice'
		}
	}
	
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>