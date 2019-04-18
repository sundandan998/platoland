<template>
	<div class="buy-pass">
		<div class="buy-pass-header">
			<mt-header title="买入通证121">
			  <router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="buy-pass-name">
			<span>PLD</span>
		</div>
		<div class="buy-pass-content">
			<div class="buy-pass-content-price">
				<span>买入价格</span>
				<input type="text" placeholder="官方价格"readonly="readonly"/>
			</div>
			<div class="buy-pass-content-num">
				<span>买入数量</span>
				<mt-field placeholder="最低600"></mt-field>
			</div>
			<div class="buy-pass-content-switch">
				<ul>
					<li class="fl">全额</li>
					<li class="fl">可用: 4000</li>
					<li class="fr"><mt-switch v-model="value"></mt-switch></li>
				</ul>
			</div>
		</div>
		<div class="buy-pass-explain">
			<span><p>说明：</p>
				卖出数量为通证数量，以USDT计价。
				例如，卖出1通证，自定义价格为1，则需要支付1USDT。官方价格为x，则需支付x USDT。
			</span>
		</div>
		<div class="pass-quotation">
			<mt-popup 
				v-model="popupVisible" 
				position="bottom" 
				class="popup" 
				popup-transition="popup-fade">
			<div class="popup-header">
				<mt-cell title="确认支付">
				  <img slot="icon" src="../../../assets/images/close.png" 
				  	width="24" height="24" @click="popupVisible = !popupVisible">
				</mt-cell>
				<h3>12.00</h3>
			</div>
			<div class="popup-content">
				<mt-cell title="订单信息" value="买入捞豆"></mt-cell>
				<mt-cell title="付款方式" to="//github.com" is-link value="USDT">
				</mt-cell>
				<router-link to="/">
					<mt-button type="primary" size="large" class="popup-btn">立即支付</mt-button>
				</router-link>				
			  </div>
			</mt-popup>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			popupVisible: true,
		}
	}
}
</script>


<style lang="scss">
	@import '../../../assets/scss/global'

</style>