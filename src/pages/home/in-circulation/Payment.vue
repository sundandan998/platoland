<template>
	<div class="payment">
		<div class="payment-header">
			<p>1.00(LD)</p>
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
</template>

<script>
export default {
  data() {
    return {
      value: '123',
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
	@import '../../../assets/scss/global';
</style>