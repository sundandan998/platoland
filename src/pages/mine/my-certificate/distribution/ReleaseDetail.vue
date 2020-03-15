<template>
  <div class="release-detail">
    <div class="release-header">
      <mt-header fixed :title="$t('m.flbDetail')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="home-pub-token">
      <img :src="detailToken.icon" alt="" class="fl icon">
      <span><b>{{detailToken.code}}</b>( {{detailToken.nickname}} ) <p>{{detailToken.subject}}</p></span>
    </div>
    <!-- 进行中 -->
    <div v-if="detailData.status=='进行中'">
      <div class="release-detail-num">
        <p>{{detailData.air|number}}%</p>
        <div class="release-detail-text">
          <div class="release-detail-text-left fl">
            <span class="fl"><img src="../../../../assets/images/geton.svg" alt=""
                class="processing">{{detailData.status}}</span>
            <span class="fr"><img src="../../../../assets/images/lock.svg" alt=""
                class="lock">{{detailData.freeze_days}}{{$t('m.day')}}</span>
          </div>
          <div class="release-detail-text-right fr">
            <span><img src="../../../../assets/images/clock.svg" alt="" class="lock">{{date}}</span>
          </div>
        </div>
        <div class="release-detail-num-progress progress">
          <mt-progress :value="detailData.total_amount/(detailData.total_amount-detailData.sold_amount)"
            :bar-height="7"></mt-progress>
          <div slot="start" class="fl">{{$t('m.transferred')}}{{detailData.sold_amount}}</div>
          <div slot="end" class="fr">{{$t('m.total')}}{{detailData.total_amount}}</div>
        </div>
      </div>
      <div class="release-detail-number">
        <mt-cell :title="$t('m.distributionPlanNumber')" :value="detailData.serial_number"></mt-cell>
        <mt-cell :title="$t('m.releaseTotal')" :value="detailData.total_amount"></mt-cell>
        <mt-cell :title="$t('m.expenditureProfit')" class="servings">{{detailData.interest}}{{detailToken.code}}</mt-cell>
        <mt-cell :title="$t('m.purchaseQuantity')" class="servings">{{detailData.min_amount/detailData.step_amount}}{{detailToken.code}}{{$t('m.share')}}</mt-cell>
        <mt-cell :title="$t('m.maxServing')">{{detailData.high_amount/detailData.step_amount}}{{detailToken.code}}</mt-cell>
        <mt-cell :title="$t('m.deadline')" :value="detailData.deadline_date"></mt-cell>
      </div>
    </div>
    <!-- 已结束 -->
    <div v-if="detailData.status!='进行中'">
      <div class="release-detail-number">
        <div class="end-order">
          <mt-cell :title="$t('m.distributionPlanNumber')" :value="detailData.serial_number"></mt-cell>
          <mt-cell :title="$t('m.currentStatus')" :value="detailData.status"></mt-cell>
          <mt-cell :title="$t('m.releaseTime')" :value="date"></mt-cell>
          <mt-cell :title="$t('m.deadline')" :value="detailData.deadline_date"></mt-cell>
        </div>
        <div class="end-order">
          <mt-cell :title="$t('m.releaseTotal')" :value="detailData.total_amount"></mt-cell>
          <mt-cell :title="$t('m.numberOfReleases')" class="servings">{{detailData.total_amount/detailData.step_amount}}{{$t('m.share')}}
          </mt-cell>
          <mt-cell :title="$t('m.perServing')" :value="detailData.step_amount"></mt-cell>
          <mt-cell :title="$t('m.freezeDuration')" :value="detailData.freeze_days"></mt-cell>
          <mt-cell :title="$t('m.expenditureProfit')" class="servings">{{detailData.interest}}{{detailToken.code}}</mt-cell>
        </div>
        <div class="end-order">
          <mt-cell :title="$t('m.purchaseQuantity')" :value="detailData.min_amount + detailToken.code"></mt-cell>
          <mt-cell :title="$t('m.maxServing')" :value="detailData.high_amount + detailToken.code"></mt-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  export default {
    data() {
      return {
        detailData: '',
        detailToken: '',
        date: '',
      }
    },
    created() {
      this.detail()
    },
    methods: {
      detail() {
        api.flDetail({ id: this.$route.params.id }).then(res => {
          if (res.code == 0) {
            this.detailData = res.data
            // 截取开始日期
            this.date = (res.data.create_time).substr(0, 11)
            this.detailToken = res.data.token

          }
        }).catch(err => {

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

      .processing {
        height: 40px;
      }

      .lock {
        height: 30px;
        position: relative;
        right: 5px;
      }

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

      .servings {
        font-size: 14px;
        font-weight: 400;
      }

      .mint-cell-value {
        span {
          font-size: 12px;
        }
      }

      .mint-cell-title {
        span {
          font-size: 14px;
        }
      }
    }

    .end-order {
      margin: 10px 0px;

      .mint-cell:first-child {
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
  }
</style>