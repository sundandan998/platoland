<template>
	<div class="release">
		<div class="purchase-pass-header">
			<mt-header title="发布">
			  <router-link to="/deal" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="purchase-pass-type">
			<span>交易类型</span>
			<div class="purchase-pass-type-checkbox fr">
				<router-link to="/purchaserelease">
						<input type="checkbox" checked="checked"/> 买入
				</router-link>					
				<router-link to="/sellrelease">
					<input type="checkbox"/> 卖出
				</router-link>				
			</div>			
		</div>
		<router-link to="/list">
			<div class="purchase-pass-buy-assets">
				<span>买入资产</span>				
				<div class="purchase-pass-buy-information fr">				
					<img src="../../../assets/images/ld.png" alt="" /><span>LD（捞豆）</span>
					<img src="../../../assets/images/r.png"/>
					<p>北京河底捞餐饮有限公司</p>				
				</div>
			</div>
		</router-link>
		<div class="purchase-pass-valuation-assets">
			<span>计价资产</span>
			<div class="purchase-pass-valuation-assets-img fr">
				<img src="../../../assets/images/ld.png" alt="" />	<span>USDT</span>	
			</div>					
		</div>
		<div class="purchase-pass-input">
			<p>数量</p>
			<input type="text" placeholder="买入数量" />
			<p>单价</p>
			<input type="text" placeholder="单价"  />
			<span>可用：10,000  USDT</span>
		</div>
		<div class="purchase-pass-quota">
			<p>限额</p>
			<input type="text" placeholder="卖方最低出售数量"/>  ~ <input type="text"placeholder="卖方最高出售数量" />
		</div>
			<div class="Purchase-pass-btn">
				<mt-button size="large" type="primary">确定</mt-button>	
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>