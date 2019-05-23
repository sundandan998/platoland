<template>
	<div class="Purchase-pass">
		<div class="Purchase-pass-header">
			<mt-header fixed :title="$t('m.purchasepass')">
			    <mt-button icon="back"slot="left"v-on:click="$router.go(-1)"><span>{{$t('m.back')}}</span></mt-button>
			</mt-header>
		</div>
		<div class="Purchase-pass-content">
			<div class="Purchase-pass-content-top">
        <!-- <img :src="'http://'+buyData.icon" class="fl"> -->
				<span>{{buyData.code}}{{buyData.name}}</span>
				<span>{{buyData.subject}}</span>
				<p>{{buyName.publish_name}}</p>
			</div>
			<div class="Purchase-pass-content-bot">
				<!-- <img :src="'http://'+buyName.d_icon"> -->
				<span>{{buyName.price}}</span>
			</div>
		</div>
		<div class="Purchase-pass-tabbar">
			<van-tabs>
			  <van-tab :title="$t('m.number')">
			  	<mt-field :placeholder = "buyName.low_number" type="number"></mt-field>
			  	<p>{{$t('m.available')}}:{{buyName.amount}} {{buyName.denominated_assets}}</p>
			  </van-tab>
			  <van-tab :title="$t('m.price')">
			  	<mt-field :placeholder="buyName.high_number" type="number"></mt-field>
			  	<p>{{$t('m.available')}}:{{buyName.amount}} {{buyName.denominated_assets}}</p>
			  </van-tab>
			</van-tabs>
		</div>
		<div class="Purchase-pass-btn">
			<!--<router-link to="/payment">-->
				<mt-button size="large" type="primary"@click="passwordShow">{{$t('m.sure')}}</mt-button>
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
          delete-button-text="Delete"
          @blur="showKeyboard = false"
        />
      </van-popup>
    </div>
	</div>
</template>

<script>
import api from '@/api/market/Market.js'
export default {
    data() {
    return {
      value: '',
      showKeyboard: false,
      popupVisible: false,
      buyData:{},
      buyName:{},
      // 请求支付参数
      reqPay:{
        order_type:0,
        transaction_id:111,
        amount:'100.002',
        action_type:0
      },
      // 确认支付参数
      confirmPay:{
        order_type:1,
        payment_id:123,
        pay_pwd:'123456'
      }
    }
  },
  created(){
    this.buyDetail()
    this.buyDetailCode = this.$route.params
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
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    // 交易详情
    buyDetail(){
      api.buyDetail(this.$route.params).then(res=>{
        // console.log(res)
        this.buyName = res.data
        this.buyName.high_number = String(res.data.high_number)
        this.buyName.low_number = String(res.data.low_number)
        this.buyData = res.data.token
        // console.log(this.buyName)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  watch:{
  	value(){
  		if(this.value.length==6){
        api.confirmPay(this.confirmPay).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        this.$toast({
        message: 'Done Successfully'
        }),
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
