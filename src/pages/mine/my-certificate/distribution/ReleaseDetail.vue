<template>
  <div class="release-detail">
    <div class="release-header">
      <mt-header fixed title="分利宝详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="home-pub-token">
      <img src="../../../../assets/images/life-icon.png" alt="" class="fl icon">
      <span><b>{{detailToken.code}}</b>( {{detailToken.nickname}} ) <p>{{detailToken.subject}}</p></span>
    </div>
    <div class="release-detail-num">
      <p>{{detailData.air}}%</p>
      <div class="release-detail-text">
        <div class="release-detail-text-left fl">
          <span class="fl">{{detailData.status}}</span><span class="fr">{{detailData.freeze_days}}天</span>
        </div>
        <div class="release-detail-text-right fr">
          <span>{{detailData.create_time}}</span>
        </div>
      </div>
      <div class="release-detail-num-progress progress ">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">已转入{{detailData.sold_amount}}</div>
        <div slot="end" class="fr">总量{{detailData.total_amount}}</div>
      </div>
    </div>
    <div class="release-detail-number">
      <mt-cell title="分利计划单号" :value="detailData.serial_number"></mt-cell>
      <mt-cell title="支出利润" value="说明文字"></mt-cell>
      <mt-cell title="已发放利润" value="说明文字"></mt-cell>
      <mt-cell title="最小转入量" :value="detailData.min_amount"></mt-cell>
      <mt-cell title="最大转入量" :value="detailData.high_amount"></mt-cell>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  export default {
    data () {
      return {
        detailData:'',
        detailToken:''
      }
    },
    created(){
      this.detail()
    },
    methods: {
      detail(){
        api.flDetail({ id: this.$route.params.id}).then(res=>{
          if(res.code==0){
            this.detailData = res.data
            this.detailToken = res.data.token

          }
        }).catch(err=>{

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .release-detail {
    .home-pub-token {
      margin: 90px 24px 20px 24px;
      border-radius: 10px;
      background-color: #fff;
    }

    .release-detail-num {
      margin: 0 24px;
      background-color: #fff;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      height: 220px;

      .release-detail-text {
        height: 50px;
        margin: 10px 20px 0 55px;
        color: #036EB8;
        font-size: 26px;

        .release-detail-text-left {
          width: 55%;
        }
      }

      .release-detail-num-progress {
        margin-left: 55px;
      }

      p {
        padding: 10px 20px 0 55px;
        font-size: 32px;
      }
    }

    .release-detail-number {
      margin: 0 24px;

      .mint-cell:last-child {
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .mint-cell-value{
        span{
          font-size:12px;
        }
      }
      .mint-cell-title{
        span{
          font-size:14px;
        }
      }
    }
  }
</style>