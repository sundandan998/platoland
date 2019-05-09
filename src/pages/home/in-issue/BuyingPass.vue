<template>
	<div class="buy-pass">
		<div class="buy-pass-header">
			<mt-header fixed title="买入通证">
			    <mt-button icon="back"slot="left"v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
		<div class="buy-pass-name">
			<img src="../../../assets/images/ld.png" alt="" class="fl" />
			<div class="buy-pass-name-text">
				<span>{{this.detail.id}}</span>
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
            <mt-field placeholder="600,000起购" type="number"></mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			  <van-tab title="按价格购买">
			  	<mt-field placeholder="100,000起购" type="number"></mt-field>
			  	<p>可用：1,000  USDT</p>
			  </van-tab>
			</van-tabs>
			<div class="buy-pass-time">
				<p>剩余可买数量 <span>700000</span></p>
				<!-- <p>距发行结束剩 <span>90天</span></p> -->
				<p>发行截止日期 <span>2021-01-01</span></p>
			</div>
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
		<div class="buy-pass-btn">
			<mt-button size="large" type="primary" @click="passwordShow">确定</mt-button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
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
  computed:{
	...mapGetters([
      'detail'
    ])
  },
  watch:{
	value(){
		if(this.value.length==6){
			this.$router.push({
				path:'/detail'
			})
		}
	}
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'

</style>
