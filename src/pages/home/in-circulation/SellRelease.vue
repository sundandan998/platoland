<template>
	<div class="release">
		<div class="purchase-pass-header">
			<mt-header fixed title="发布">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)"></mt-button>
			</mt-header>
		</div>
		<div class="purchase-pass-type">
			<span>交易类型</span>
			<div class="purchase-pass-type-checkbox fr">
				<router-link to="/purchaserelease">
					<input type="checkbox"/> 买入
				</router-link>					
				<input type="checkbox" checked="checked"/> 卖出
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
			<span>手续费：0.00  PLD</span>
		</div>
		<div class="purchase-pass-quota">
			<p>限额</p>
			<input type="text" placeholder="卖方最低出售数量"/>  ~ <input type="text"placeholder="卖方最高出售数量" />
		</div>
		<div class="Purchase-pass-btn">
			<mt-button size="large" type="primary"@click="passwordShow">确定</mt-button>	
		</div>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  	<div class="" v-if="hide">
			<!-- 密码输入框 -->
			<van-password-input
			  :value="value"
			  @focus="showKeyboard = true"
			/>
			<!-- 数字键盘 -->
			<van-number-keyboard
			  :show="showKeyboard"
			  @input="onInput"
			  @delete="onDelete"
			  @blur="showKeyboard = false"
			/>
		</div>
		</mt-popup>
	</div>
</template>

<script>
export default{
	data(){
		return{
	 		value: '',
	      	hide:'',
  			showKeyboard: true,
  			popupVisible: false
		}
	},
	methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
     passwordShow(hide){
    	this.hide = !(hide === 'show')
    	this.popupVisible = !(false === 'true')
    }
   },
   watch:{
   	value(){
   		if(this.value.length==6){
   			this.$router.push({
   				path:'/deal'
   			})
   		}
   	}
   }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>