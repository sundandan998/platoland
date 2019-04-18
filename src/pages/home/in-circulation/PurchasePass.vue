<template>
	<div class="Purchase-pass">
		<div class="Purchase-pass-header">
			<mt-header title="购买通证">
			  <router-link to="/buy" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
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
			  	<mt-field placeholder="600,000起购">USDT</mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			  <van-tab title="按价格购买">
			  	<mt-field placeholder="100,000起购">LD（捞豆）</mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			</van-tabs>
		</div>
		<div class="Purchase-pass-btn">
			<!--<router-link to="/payment">-->
				<mt-button size="large" type="primary">确定</mt-button>
			<!--</router-link>-->		
		</div>
			<div class="payment">
		<div class="payment-header">
			<!--<p>1.00(LD)</p>-->
		</div>
		<!-- 密码输入框 -->
		<van-password-input
		  :value="value"
		  info="密码为 6 位数字"
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
	</div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      showKeyboard: false
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
}
</script>
<style lang="scss">
	@import '../../../assets/scss/global';
</style>