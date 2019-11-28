<template>
  <div class="release-detail">
    <div class="release-header">
      <mt-header fixed title="分利宝详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="home-pub-token">
      <img src="../../../../assets/images/life-icon.png" alt="" class="fl icon">
      <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
    </div>
    <div class="release-detail-num">
      <p>14%</p>
      <div class="release-detail-text">
        <div class="release-detail-text-left fl">
          <span class="fl">进行中</span><span class="fr">180天</span>
        </div>
        <div class="release-detail-text-right fr">
          <span>2019-2-10</span>
        </div>
      </div>
      <div class="release-detail-num-progress progress ">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">0%</div>
        <div slot="end" class="fr">100%</div>
      </div>
    </div>
    <div class="release-detail-number">
      <mt-cell title="分利计划单号" value="说明文字"></mt-cell>
      <mt-cell title="支出利润" value="说明文字"></mt-cell>
      <mt-cell title="已支出利润" value="说明文字"></mt-cell>
      <mt-cell title="最小转入量" value="说明文字"></mt-cell>
      <mt-cell title="最大转入量" value="说明文字"></mt-cell>
    </div>
  </div>
</template>
<script></script>
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
      .release-detail-num-progress{
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
    }
  }
</style>