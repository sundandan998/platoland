<template>
	<div class="turn-out">
		<div class="turn-out-header">
			<mt-header fixed title="转出">
			    <mt-button icon="back"slot="left" v-on:click="$router.go(-1)">返回</mt-button>
			    	<mt-button icon="" slot="right">
			    		<router-link to="/scan">
			  			<img src="../../../assets/images/scan.png" alt="" />
			  			  </router-link>
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
		<div class="purchase-pass-input">
			<p>付款给</p>
			<input type="text" placeholder="请选择收款地址" />

			<router-link to="book">
				<span>
			  		<img src="../../../assets/images/book.png" alt="" />
			  	</span>
			</router-link>
		</div>
		<div class="purchase-pass-input">
			<p>转出数量</p>
      <mt-field placeholder="买入数量" type="number"></mt-field>
			<span>可用：10,000  USDT</span>
			<span>手续费：0.00  PLD</span>
		</div>
		<div class="turn-out-exhibition-qrcode">
			<router-link to="/scan">
				<span>扫一扫</span>
			</router-link>
		</div>
		<div class="turn-out-exhibition-btn">
				<mt-button type="primary" size="large" @click="passwordShow">确认</mt-button>
		</div>
    <div>
    <van-popup class="popupbox" position="bottom"  v-model="popupVisible">
      <span class="paymentamount">1.00 LD</span>
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
    </van-popup>
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
export default {
  data() {
    return {
      value: '',
      showKeyboard: false,
      popupVisible: false
    }
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    passwordShow(){
      this.popupVisible = true
    }
  },
  watch:{
  value(){
    if(this.value.length==6){
      this.$router.push({
        path:'/assetsdetailed'
      })
    }
  }
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
