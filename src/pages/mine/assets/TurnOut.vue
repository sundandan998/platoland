<template>
	<div class="turn-out">
		<div class="turn-out-header">
			<mt-header fixed :title="$t('m.changeout')">
        <mt-button icon="back"slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button icon="" slot="right">
         <router-link to="/scan">
          <img src="../../../assets/images/scan.png" alt="" />
        </router-link>
      </mt-button>
    </mt-header>
  </div>
  <div class="turn-out-exhibition">
   <div class="turn-out-exhibition-img">
    <img :src="'http://'+this.detail.token.icon" alt=""  class="fl">
    <span>{{this.detail.token.code}}{{this.detail.token.name}}</span>
    <span>{{this.detail.token.subject}}</span>
  </div>
</div>
<div class="purchase-pass-input">
 <p>{{$t('m.payment')}}</p>
 <mt-field type="text" readonly="readonly" :placeholder="this.detail.address">
  <router-link to="book">
    <img src="../../../assets/images/book.png" alt="" />
  </router-link>
</mt-field>
</div>
<div class="purchase-pass-input">
 <p>{{$t('m.turnnum')}}</p>
 <mt-field :placeholder="$t('m.buynum')" type="number"></mt-field>
 <span>{{$t('m.available')}}：{{this.detail.available_amount}} {{this.detail.code}}</span>
 <span>{{$t('m.servicecharge')}}：{{this.detail.available_amount}} PLD</span>
</div>
<div class="turn-out-exhibition-qrcode">
 <router-link to="/scan">
  <span>{{$t('m.scan')}}</span>
</router-link>
</div>
<div class="turn-out-exhibition-btn">
  <mt-button type="primary" size="large" @click="passwordShow">{{$t('m.outbutton')}}</mt-button>
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
    delete-button-text="Delete"
    @blur="showKeyboard = false"
    />
  </van-popup>
</div>
<div class="turn-out-exhibition-text">
 <p>{{$t('m.becareful')}}</p>
 <p>{{$t('m.becarefulone')}}</p>
 <p>{{$t('m.becarefultwo')}}</p>
 <p>{{$t('m.becarefulthree')}}</p>
 <p>{{$t('m.becarefulfour')}}</p>
</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from "@/api/market/Market.js"
export default {
  data() {
    return {
      value: '',
      show:'',
      showKeyboard: false,
      popupVisible: false,
      // 请求支付参数
      reqPay:{
        order_type:3,
        transaction_id:111,
        amount:'100.002',
        action_type:0
      },
       // 确认支付参数
      confirmPay:{
        order_type:3,
        payment_id:123,
        pay_pwd:'123456'
      },
    }
  },
  computed:{
    ...mapGetters([
      'detail'
      ])
  },
  beforeRouteEnter(to, from, next) {
   next(vm=>{
    if(from.path =='/book'){
        window.history.go(-2)
      }
    })
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
    // 请求支付
    api.reqPay(this.reqPay).then(res=>{
      // console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
},
watch:{
  value(){
    if(this.value.length==6){
      // 确认支付
      api.confirmPay(this.confirmPay).then(res=>{
        // console.log(res)
      }).catch(err=>{
        console.log(err)
      })
       this.$toast({
        message: 'Done Successfully'
      })
      this.popupVisible =false
    }
   }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/global'
</style>
