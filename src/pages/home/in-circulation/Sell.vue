<template>
	<div class="purchase-pass">
		<div class="Purchase-pass-header">
			<mt-header fixed :title="$t('m.sell')">
			   <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
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
			  <van-tab :title="$t('m.numsale')">
			  	<mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
			  	<p>{{$t('m.available')}}：1,000  USDT</p>
			  	<p>{{$t('m.servicecharge')}}：10  PLD</p>
			  </van-tab>
			  <van-tab :title="$t('m.pricesale')">
          <mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
			  	<p>{{$t('m.available')}}：1,000  USDT</p>
			  </van-tab>
			</van-tabs>
		</div>
		<div class="Purchase-pass-btn">
			<!--<router-link to="/payment">-->
				<mt-button size="large" type="primary"@click="passwordShow">{{$t('m.sure')}}</mt-button>
			<!--</router-link>-->
		</div>
		<div class="payment">
			<div class="payment-header">
			<!--<p>1.00(LD)</p>-->
		</div>
		 <div>
    <van-popup class="popupbox" position="bottom"  v-model="popupVisible">
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
	</div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      showKeyboard: false,
      popupVisible: false,
      // showPopupPwd:false
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
