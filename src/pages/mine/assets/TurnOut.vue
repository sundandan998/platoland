<template>
	<div class="turn-out">
		<div class="turn-out-header">
			<mt-header fixed title="转出">
			  <router-link to="/assetsdetailed" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			  <mt-button icon="" slot="right">
			  	<img src="../../../assets/images/scan.png" alt="" />
			  </mt-button>
			</mt-header>
		</div>
		<div class="turn-out-exhibition">			
			<div class="turn-out-exhibition-img">				
				<img src="../../../assets/images/ld.png" alt="" class="fl" />
				<span>LD（捞豆）</span>
				<span>北京河底捞餐饮有限公司</span>		
			</div>			
		</div>
		<mt-cell title="付款给" label="请选择付款给">
		  <span><img src="../../../assets/images/book.png" alt="" /></span>
		  <!--<img slot="icon" src="../assets/100x100.png" width="24" height="24">-->
		</mt-cell>
		<div class="purchase-pass-input">
			<p>转出数量</p>
			<input type="text" placeholder="买入数量" />
			<span>可用：10,000  USDT</span>
			<span>手续费：0.00  PLD</span>
		</div>
		<div class="turn-out-exhibition-qrcode">
			<router-link to="/">
				<span>扫一扫</span>
			</router-link>
		</div>
		<div class="turn-out-exhibition-btn">
			<mt-button type="primary" size="large">确认</mt-button>
		</div>
		<div class="turn-out-exhibition-text">
			<p>注意：</p>
			<p>1.请仔细核对转入账户是否可用、有效，转出成功将无法退回</p>
			<p>2.请勿向陌生账户转出</p>
			<p>3.为保障资金安全，我们会按照安全策略进行人工审核，请耐心等待</p>
			<p>4.请务必确认设备安全，防止信息被篡改或泄露</p>
		</div>
		
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>