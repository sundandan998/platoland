<template>
	<div class="news-details">
		<div class="news-details-header">
			<mt-header fixed :title="$t('m.noticdetails')">
			  <router-link to="/news" slot="left">
			    <mt-button icon="back">{{$t('m.back')}}</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="news-details-list">
				<p>{{$t('m.notictitle')}}
					<p>2019-6-5  13:15<span>{{$t('m.noticsmalltitle')}}</span></p>
				</p>
				<p>
	       {{$t('m.noticcontentone')}}
				</p>
				<p>
					{{$t('m.noticcontenttwo')}}
				</p>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{}
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>
