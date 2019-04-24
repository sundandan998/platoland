<template>
	<div class="transaction-details">
		<div class="transaction-details-header">
			<div class="assets-detailed-header">
				<mt-header fixed title="交易详情">
				  <router-link to="/detailedlist" slot="left">
				    <mt-button icon="back" v-on:click="back"></mt-button>
				  </router-link>
				</mt-header>
			</div>
		</div>
		<div class="transaction-details-number">			
			<span>-5.00</span>
			<p>交易成功</p>		
		</div>
		<div class="transaction-details-adress">
			<ul class="fl">
				<li>交易方</li>
				<li>地址</li>
			</ul>
			<ul class="fr">
				<li>xxx</li>
				<li>xxx...xxx</li>
			</ul>
		</div>
		<div class="transaction-details-information">
			<ul class="fl">
				<li>订单编号</li>
				<li>资产</li>
				<li>时间</li>
				<li>交易说明</li>
			</ul>
			<ul class="fr">
				<li>xxx</li>
				<li> <img src="../../../assets/images/ld.png" alt="" />xxx...xxx</li>
				<li>xxx...xxx</li>
			</ul>
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
		back(){
        	this.$router.go(-1);//返回上一层
    	},
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>