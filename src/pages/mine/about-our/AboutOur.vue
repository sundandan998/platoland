<template>
	<div class="about-our">
		<div class="about-our-header">
			<mt-header fixed :title="$t('m.our')">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="about-our-logo">
			<img src="../../../assets/images/logo.png" alt="" />
		</div>
		<div class="about-our-text">
      <div class="about-our-text-content">
        <div>
          <span><b></b> {{$t('m.ourtitleone')}}</span>
          <p>{{$t('m.ourtextone')}}</p>
          <p>{{$t('m.ourtexttwo')}}</p>
        </div>
  			<div>
  				<span> <b></b> {{$t('m.ourtitletwo')}}</span>
  				<p>{{$t('m.ourtextthree')}}</p>
  				<p>{{$t('m.ourtextfour')}}</p>
  			</div>
  			<div>
  				<span> <b></b> {{$t('m.ourtitlethree')}}</span>
  				<p>{{$t('m.ourtextfive')}}</p>
  			</div>
  			<div>
  				<span> <b></b> {{$t('m.ourtitlefour')}}</span>
  				<p>{{$t('m.ourtextsix')}}</p>
  			</div>
      </div>
		</div>
		<div class="about-our-contact">
				<p> <b></b>{{$t('m.contact')}} </p>
				<!-- to="http://www.platoland.com" is-link -->
        <mt-cell :title="$t('m.website')"  value="http://www.platoland.com"></mt-cell>
				<mt-cell :title="$t('m.Twitter')" ></mt-cell>
        <mt-cell title="reddit" ></mt-cell>
        <mt-cell title="Facebook"></mt-cell>
        <mt-cell title="Telegram"></mt-cell>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
