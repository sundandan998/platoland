<template>
	<div class="scandetail">
		<div class="scandetail-header">
			<mt-header fixed title="扫一扫">
			  <router-link to="/assetsdetailed" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="scandetail-information">
			<mt-cell title="付款给" value="50.000">
				 <img slot="icon" src="../../../assets/images/u4662.png">
			</mt-cell>
			<mt-cell title="地址" value="50.00">
				<img slot="icon" src="../../../assets/images/u4666.png">
			</mt-cell>
			<mt-cell title="资产" value="50.00">
				<img slot="icon" src="../../../assets/images/u4666.png">
			</mt-cell>
		</div>
		<div class="scandetail-num">
			<span>数量</span>
			<input type="text" />
			<p>可用 1.00</p>
			<p>手续费0.002PLD</p>
		</div>
		<div class="scandetail-btn">
			<mt-button type="primary" size="large"@click="passwordShow">确认</mt-button>
		</div>
		<div class="scandetail-text">
			<p>注意:</p>
			<p>1.请仔细核对转入账户是否可用、有效，转出成功将无法退回</p>
			<p>2.请勿向陌生账户转出付款</p>
		</div>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  	<div class="" v-if="hide">
			<!-- 密码输入框 -->
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
		</div>
		</mt-popup>
	</div>
</template>

<script>
	export default {
  data() {
    return {
      value: '',
      hide:'',
      showKeyboard: true,
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
    passwordShow(hide){
    	this.hide = !(hide === 'show')
    	this.popupVisible = !(false === 'true')
    }
  },
  watch:{
	value(){
		if(this.value.length==6){
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
