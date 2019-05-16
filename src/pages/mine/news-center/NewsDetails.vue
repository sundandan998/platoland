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
      <div class="news-details-list-title text-beyond" >
        <span>{{$t('m.notictitle')}}
          <p>2019-6-5  13:15 &nbsp;&nbsp;<span>{{$t('m.noticsmalltitle')}}</span></p>
        </span>
      </div>
      <div class="news-details-list-content">
        <span>{{$t('m.noticcontentone')}}</span>
      </div>
    </div>
    <div class="news-details-list">
      <div class="news-details-list-title text-beyond" >
        <span>{{$t('m.notictitle')}}
          <p>2019-6-5  13:15 &nbsp;&nbsp;<span>{{$t('m.noticsmalltitle')}}</span></p>
        </span>
      </div>
      <div class="news-details-list-content">
        <span>{{$t('m.noticcontentone')}}</span>
      </div>
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
	@import '../../../assets/scss/global'
</style>
