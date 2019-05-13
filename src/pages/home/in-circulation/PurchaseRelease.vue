<template>
	<div class="release">
		<div class="purchase-pass-header">
			<mt-header fixed :title="$t('m.release')">
			    <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="purchase-pass-buy-assets">
			<span>{{$t('m.buyassets')}}</span>
			<div class="purchase-pass-buy-information fr">
				<img src="../../../assets/images/ld.png" alt="" /><span>LD（捞豆）</span>
				<p>北京河底捞餐饮有限公司</p>
			</div>
		</div>
		<div class="purchase-pass-valuation-assets">
			<span>{{$t('m.valuationassets')}}</span>
			<div class="purchase-pass-valuation-assets-img fr">
				<img src="../../../assets/images/u1429.png" alt="" />	<span>USDT</span>
			</div>
		</div>
				<div class="to-deal-navbar">
			<van-tabs>
			  <van-tab :title="$t('m.purchasebuy')">
			  </van-tab>
			  <van-tab :title="$t('m.sell')">
			  </van-tab>
			</van-tabs>
		</div>
    <!-- 数字键盘 -->
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
			<p>{{$t('m.transactionnum')}}</p>
        <mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
			<p>{{$t('m.unitprice')}}</p>
        <mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
			<span>{{$t('m.available')}}：10,000  USDT</span>
		</div>

		<div class="purchase-pass-quota">
			<p>{{$t('m.quota')}}</p>
      <mt-field :placeholder="$t('m.botsellnum')" type="number" class="purchase-pass-quota-input"></mt-field>
      <mt-field :placeholder="$t('m.topsellnum')" type="number" class="purchase-pass-quota-input"></mt-field>
		</div>
		<div class="purchase-pass-btn">
			<mt-button size="large" type="primary"@click="passwordShow">{{$t('m.release')}}</mt-button>
		</div>

	</div>
</template>

<script>
export default{
	data(){
		return {
  	    value: '',
        showKeyboard: false,
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
