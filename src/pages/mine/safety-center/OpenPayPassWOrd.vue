<template>
	<div class="open-pay-password">
		<div class="open-pay-password-header">
			<mt-header fixed title="设置支付密码">
			  <router-link to="/safety" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="open-pay-password-keyboard">
			<div class="open-pay-password-keyboard-title">
				<span>设置6位数字支付密码</span>
			</div>
			<!-- 密码输入框 -->
			<van-password-input
			  :value="value"
			  :mask="true"
			  info="支付密码不能是重复、连续的数字"
			  @focus="showKeyboard = true"
			/>
			<div class="open-pay-password-keyboard-title">
				<span>再次输入支付密码</span>
			</div>
			<van-password-input
			  :value="value"
			  :mask="true"
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
		<div class="rest-pass-word-btn">
			<mt-button type="primary" size="large">确认</mt-button>
		</div>
		<div class="open-pay-password-keyboard-text">
			<p>注意：</p>
			<p>支付密码将用于资产转出时的验证，请妥善保管</p>
		</div>
	</div>
</template>

<script>

export default {
  data() {
    return {
      value: '',
      showKeyboard: true
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
	@import '../../../assets/scss/global'
</style>
