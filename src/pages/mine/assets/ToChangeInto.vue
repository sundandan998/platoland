<template>
	<div class="to-change-into">
		<div class="to-change-into-header">
			<mt-header title="转入">
			  <router-link to="/assetsdetailed" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="to-change-into-exhibition">			
			<div class="to-change-into-exhibition-img">				
				<img src="../../../assets/images/ld.png" alt="" class="fl" />
				<ul class="fr">
					<li>LD（捞豆）</li>
					<li>北京河底捞餐饮有限公司</li>
				</ul>
				<div class="to-change-into-exhibition-adress">
					<span>13SncaFeFFGQDYHSmWafwkTXCBWqaeix7c</span>
					<img src="../../../assets/images/u4780.png" alt="" class="fr" />
				</div>				
			</div>			
		</div>
		<div class="to-change-into-qrcode">
			<img src="../../../assets/images/qrcode.png" alt="" />
			<p>对方支付成功后，预计5min左右 到账</p>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>