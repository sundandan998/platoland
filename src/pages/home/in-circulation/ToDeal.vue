<template>
	<div class="to-deal">
		<div class="to-deal-header">
			<div class="to-details-header">
				<mt-header fixed title="交易市场">
				   <mt-button slot="left"icon="back" v-on:click="$router.go(-1)">返回</mt-button>
				  <mt-button icon="" slot="right">
				  	<router-link to="/purchaserelease">
				  		<img src="../../../assets/images/fb.png" alt="" /> 发布
				  </router-link>
				  </mt-button>
				</mt-header>
			</div>
		</div>
		<div class="to-deal-navbar">
			<van-tabs>
			  <van-tab title="购买">
			  	<router-link to="/purchase">
				  	<div class="to-deal-purchase">
				  		<div class="to-deal-purchase-top">
				  			<!--<img src="../../../assets/images/u345.png" alt="" />-->
				  			<span>han**@qq.com</span>
				  		</div>
				  		<div class="to-deal-purchase-bot">
				  			<span>数量:60.000</span>
				  			<span><img src="../../../assets/images/ld.png"/> 6.00</span>
				  			<p>限额2.000 -10.000</p>
				  		</div>
				  	</div>
				  	<div class="to-deal-purchase">
				  		<div class="to-deal-purchase-top">
				  			<!--<img src="../../../assets/images/u345.png" alt="" />-->
				  			<span>han**@qq.com</span>
				  		</div>
				  		<div class="to-deal-purchase-bot">
				  			<span>数量:60.000</span>
				  			<span><img src="../../../assets/images/ld.png"/> 6.00</span>
				  			<p>限额2.000 -10.000</p>
				  		</div>
				  	</div>
			  	</router-link>
			  </van-tab>
			  <van-tab title="出售">
			  	<router-link to="/sell">
				  	<div class="to-deal-purchase">
				  		<div class="to-deal-purchase-top">
				  			<!--<img src="../../../assets/images/u345.png" alt="" />-->
				  			<span>liu**@qq.com</span>
				  		</div>
				  		<div class="to-deal-purchase-bot">
				  			<span>数量:60.000</span>
				  			<span><img src="../../../assets/images/ld.png"/> 6.00</span>
				  			<p>限额2.000 —— 10.000</p>
				  		</div>
				  	</div>
			  	</router-link>
			  </van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
