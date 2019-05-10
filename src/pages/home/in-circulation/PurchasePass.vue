<template>
	<div class="Purchase-pass">
		<div class="Purchase-pass-header">
			<mt-header fixed title="购买通证">
			    <mt-button icon="back"slot="left"v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
		<div class="Purchase-pass-content">
			<div class="Purchase-pass-content-top">
				<img src="../../../assets/images/ld.png" alt="" class="fl" />
				<span>LD（捞豆）</span>
				<span>北京河底捞餐饮有限公司</span>
				<p>han***@qq.com</p>
			</div>
			<div class="Purchase-pass-content-bot">
				<img src="../../../assets/images/t.png" alt=""/>
				<span>6.00</span>
			</div>
		</div>
		<div class="Purchase-pass-tabbar">
			<van-tabs>
			  <van-tab title="按数量购买">
			  	<mt-field placeholder="最小可买 1,000" type="number"></mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			  <van-tab title="按价格购买">
			  	<mt-field placeholder="100,000起购" type="number"></mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			</van-tabs>
		</div>
		<div class="Purchase-pass-btn">
			<!--<router-link to="/payment">-->
				<mt-button size="large" type="primary"@click="passwordShow">确定</mt-button>
			<!--</router-link>-->
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
          path:'/deal'
        })
      }
    }
  }
}
</script>
<style lang="scss">
  @import '../../../assets/scss/global'
</style>
