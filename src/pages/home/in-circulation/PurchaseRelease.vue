<template>
	<div class="release">
		<div class="purchase-pass-header">
			<mt-header fixed title="发 布">
			    <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
		<div class="purchase-pass-buy-assets">
			<span>买入资产</span>
			<div class="purchase-pass-buy-information fr">
				<img src="../../../assets/images/ld.png" alt="" /><span>LD（捞豆）</span>
				<p>北京河底捞餐饮有限公司</p>
			</div>
		</div>
		<div class="purchase-pass-valuation-assets">
			<span>计价资产</span>
			<div class="purchase-pass-valuation-assets-img fr">
				<img src="../../../assets/images/u1429.png" alt="" />	<span>USDT</span>
			</div>
		</div>
				<div class="to-deal-navbar">
			<van-tabs>
			  <van-tab title="购买">
			  </van-tab>
			  <van-tab title="出售">
			  </van-tab>
			</van-tabs>
		</div>
	   <div>
      <van-popup class="popupbox" position="bottom"  v-model="popupVisible">
        <span class="paymentamount">1.00 USDT</span>
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
		<div class="purchase-pass-input">
			<p>数量</p>
        <mt-field placeholder="100,000起购" type="number"></mt-field>
			<p>单价</p>
        <mt-field placeholder="100,000起购" type="number"></mt-field>
			<span>可用：10,000  USDT</span>
		</div>

		<div class="purchase-pass-quota">
			<p>限额</p>
      <mt-field placeholder="卖方最低出售数量" type="number" class="purchase-pass-quota-input"></mt-field>
      <mt-field placeholder="卖方最高出售数量" type="number" class="purchase-pass-quota-input"></mt-field>
		</div>
		<div class="purchase-pass-btn">
			<mt-button size="large" type="primary"@click="passwordShow">发 布</mt-button>
		</div>

	</div>
</template>

<script>
export default{
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
