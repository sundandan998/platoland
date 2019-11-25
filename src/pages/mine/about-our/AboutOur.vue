<template>
	<div class="about-our">
		<div class="about-our-header header">
			<mt-header fixed :title="$t('m.our')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="about-our-logo">
			<img src="../../../assets/images/logo.png" alt="" />
		</div>
		<div class="about-our-text">
			<div class="about-our-text-content">
				<div class="about-our-text">
					<span><b></b> {{$t('m.ourtitleone')}}</span>
					<p>{{$t('m.ourtextone')}}</p>
					<p>{{$t('m.ourtexttwo')}}</p>
				</div>
				<div>
					<span> <b></b> {{$t('m.ourtitletwo')}}</span>
					<p>{{$t('m.ourtextthree')}}</p>
					<p>{{$t('m.ourtextfour')}}</p>
				</div>
			</div>
		</div>
		<div class="about-our-contact">
			<mt-cell title="《用户协议》" to="agreement" is-link>
			</mt-cell>
		</div>
	</div>
</template>

<script>
  export default {
		data () {
			return {}
		},
		created() {},
		beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff"
      next()
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = ""
      next()
    }
	}

</script>

<style lang="scss">
	@import '../../../assets/scss/global';
	.about-our-text {
		margin: 30px 0 40px 0;
	}
</style>