<template>
	<div class="transaction-details">
		<div class="transaction-details-header">
			<div class="assets-detailed-header">
				<mt-header fixed title="交易详情 ">
				  <router-link to="/detailedlist" slot="left">
				    <mt-button icon="back" v-on:click="back">返回</mt-button>
				  </router-link>
				</mt-header>
			</div>
		</div>
		<div class="transaction-details-number">
			<span>-50,000</span>
			<p>交易成功</p>
		</div>
		<div class="transaction-details-adress">
			<ul class="fl">
				<li>交易方</li>
				<li>地址</li>
			</ul>
			<ul class="fr transaction-details-information-right">
				<li>dandan@qq.com</li>
				<li>13Sn....ix7c</li>
			</ul>
		</div>
		<div class="transaction-details-information">
			<ul class="fl">
				<li>订单编号</li>
				<!--<li>资产</li>-->
				<li>单价</li>
				<li>数量</li>
				<li>时间</li>
			</ul>
			<ul class="fr transaction-details-information-right ">
				<li>2019030200002</li>
				<!--<li> <img src="../../../assets/images/ld.png" alt="" />10000</li>-->
				<li>0.02  USDT</li>
				<li>20,000  LD</li>
				<li>2019-4-28</li>
			</ul>
		</div>

		<div class="transaction-details-information-text">
			<span>交易说明</span>
			<div class="transaction-details-information-border"></div>
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
