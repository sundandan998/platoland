<template>
	<div class="transaction-details">
		<div class="transaction-details-header">
			<div class="assets-detailed-header">
				<mt-header fixed :title="$t('m.transactiondetail')">
				  <router-link to="/detailedlist" slot="left">
				    <mt-button icon="back" v-on:click="back">{{$t('m.back')}}</mt-button>
				  </router-link>
				</mt-header>
			</div>
		</div>
		<div class="transaction-details-number">
			<span>-50,000</span>
			<p>{{$t('m.transactionsuccess')}}</p>
		</div>
		<div class="transaction-details-adress">
			<ul class="fl">
				<li>{{$t('m.transactionparty')}}</li>
				<li>{{$t('m.transactionadreess')}}</li>
			</ul>
			<ul class="fr transaction-details-information-right">
				<li>dandan@qq.com</li>
				<li>13Sn....ix7c</li>
			</ul>
		</div>
		<div class="transaction-details-information">
			<ul class="fl">
				<li>{{$t('m.ordernumber')}}</li>
				<li>{{$t('m.unitprice')}}</li>
				<li>{{$t('m.transactionnum')}}</li>
				<li>{{$t('m.transactiontime')}}</li>
			</ul>
			<ul class="fr transaction-details-information-right ">
				<li>2019030200002</li>
				<!--<li> <img src="../../../assets/images/ld.png" alt="" />10000</li>-->
				<li>0.02  USDT</li>
				<li>20,000  LD</li>
				<li>2019-4-28</li>
			</ul>
		</div>
<!-- <div class="transaction-details-information-text">
			<span>{{$t('m.transactionexplain')}}</span>
			<div class="transaction-details-information-border"></div>
		</div> -->
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
