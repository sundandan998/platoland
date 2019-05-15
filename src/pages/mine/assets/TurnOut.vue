<template>
	<div class="turn-out">
		<div class="turn-out-header">
			<mt-header fixed :title="$t('m.changeout')">
        <!-- v-on:click="$router.go(-1)"@click="tz" -->
			    <mt-button icon="back"slot="left"  v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
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
				<span>{{$t('m.intoname')}}</span>
				<span>{{$t('m.intobody')}}</span>
			</div>
		</div>
		<div class="purchase-pass-input">
			<p>{{$t('m.payment')}}</p>
      <mt-field type="text" readonly="readonly" placeholder="Please choose the address">
        <router-link to="book">
          <img src="../../../assets/images/book.png" alt="" />
        </router-link>
      </mt-field>
		</div>
		<div class="purchase-pass-input">
			<p>{{$t('m.turnnum')}}</p>
      <mt-field :placeholder="$t('m.buynum')" type="number"></mt-field>
			<span>{{$t('m.available')}}：10,000  LD</span>
			<span>{{$t('m.servicecharge')}}：0.00  PLD</span>
		</div>
		<div class="turn-out-exhibition-qrcode">
			<router-link to="/scan">
				<span>{{$t('m.scan')}}</span>
			</router-link>
		</div>
		<div class="turn-out-exhibition-btn">
				<mt-button type="primary" size="large" @click="passwordShow">{{$t('m.sure')}}</mt-button>
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
export default {
  data() {
    return {
      value: '',
      show:'',
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
    },
    tz(){
      this.$router.push({
        path:'/assetsdetailed'
      })
    }
  },
  watch:{
    value(){
      if(this.value.length==6){
         this.$toast({
          message: 'Done Successfully'
        }),
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
