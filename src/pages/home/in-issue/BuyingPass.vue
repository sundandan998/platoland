<template>
	<div class="buy-pass">
		<div class="buy-pass-header">
			<mt-header fixed :title="$t('m.buyingpass')">
			    <mt-button icon="back"slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="buy-pass-name">
			<img src="../../../assets/images/ld.png" alt="" class="fl" />
			<div class="buy-pass-name-text">
				<span>{{this.detail.id}} ({{this.detail.nickname}})</span>
        <p>{{this.detail.body}}</p>
			</div>
		</div>
		<div class="buy-pass-name-price">
			<p>{{$t('m.unitprice')}}</p>
			<div class="buy-pass-name-price-text fr">
				<span>0.02</span><span>USDT</span>
			</div>
		</div>
		<div class="Purchase-pass-tabbar">
			<van-tabs>
			  <van-tab :title="$t('m.number')">
            <mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
			  	<p><span>{{$t('m.available')}}</span>：1,000  USDT</p>
			  </van-tab>
			  <van-tab :title="$t('m.price')">
			  	<mt-field :placeholder="$t('m.purchase')" type="number"></mt-field>
			  	<p><span>{{$t('m.available')}}</span>：1,000  USDT</p>
			  </van-tab>
			</van-tabs>
			<div class="buy-pass-time">
				<p>{{$t('m.surplus')}} <span>700000</span></p>
				<!-- <p>距发行结束剩 <span>90天</span></p> -->
				<p>{{$t('m.date')}}<span> 2021-01-01</span></p>
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
        delete-button-text="Delete"
        @blur="showKeyboard = false"
      />
    </van-popup>
    </div>
		<div class="buy-pass-btn">
			<mt-button size="large" type="primary" @click="passwordShow">{{$t('m.sure')}}</mt-button>
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
       this.$toast({
          message: 'Done Successfully'
        }),
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
