<template>
	<div class="buy-pass">
		<div class="buy-pass-header">
			<mt-header fixed title="买入通证">
			    <mt-button icon="back"slot="left"v-on:click="$router.go(-1)"></mt-button>
			</mt-header>
		</div>
		<div class="buy-pass-name">
			<img src="../../../assets/images/ld.png" alt="" class="fl" />
			<div class="buy-pass-name-text">
				<span>PLD</span>
				<span>PLATOLAND集团</span>
			</div>			
		</div>
		<div class="buy-pass-name-price">
			<p>单价</p>
			<div class="buy-pass-name-price-text fr">
				<span>0.02</span><span>USDT</span>	
			</div>					
		</div>		
		<div class="Purchase-pass-tabbar">
			<van-tabs>
			  <van-tab title="按数量购买">
			  	<mt-field placeholder="600,000起购">LD（捞豆）</mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			  <van-tab title="按价格购买">
			  	<mt-field placeholder="100,000起购">USDT</mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			</van-tabs>
			<div class="buy-pass-time">
				<p>剩余可买数量 <span>700000</span></p>
				<p>距发行结束剩 <span>90天</span></p>
				<p>发行截止日期 <span>2021-01-01</span></p>
			</div>			
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
		<div class="buy-pass-btn">
			<mt-button size="large" type="primary" @click="passwordShow">确定</mt-button>	
		</div>	
	</div>
</template>

<script>
export default {
  data() {
    return {
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
				path:'/details'
			})
		}
	}
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>