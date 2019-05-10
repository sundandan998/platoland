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
		<div class="about-our-Contact">
				<p> <b></b> {{$t('m.contact')}} </p>
				<p>{{$t('m.website')}}  <a href="#" class="fr">http://www.platoland.com</a></p>
				<p>{{$t('m.Twitter')}}</p>
				<p>{{$t('m.wechat')}}</p>
				<p>Telegram</p>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
