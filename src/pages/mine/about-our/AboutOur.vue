<template>
	<div class="about-our">
		<div class="about-our-header">
			<mt-header fixed :title="$t('m.our')">
			  <router-link to="/mine" slot="left">
			    <mt-button icon="back">{{$t('m.back')}}</mt-button>
			  </router-link>
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
				<p> <b></b> 联系我们 </p>
        <mt-cell :title="$t('m.website')" to="http://www.platoland.com" is-link value="http://www.platoland.com"></mt-cell>
				<mt-cell :title="$t('m.Twitter')" to="" ></mt-cell>
        <mt-cell title="reddit" to="" ></mt-cell>
        <mt-cell title="Facebook" to="" is-link></mt-cell>
        <mt-cell title="Telegram" to="" is-link></mt-cell>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
