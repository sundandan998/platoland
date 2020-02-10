<template>
  <div class="release-detail">
    <div class="release-header">
      <mt-header fixed title="分利宝详情">
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
                class="lock">{{detailData.freeze_days}}天</span>
          </div>
          <div class="release-detail-text-right fr">
            <span><img src="../../../../assets/images/clock.svg" alt="" class="lock">{{date}}</span>
          </div>
        </div>
        <div class="release-detail-num-progress progress">
          <mt-progress :value="detailData.total_amount/(detailData.total_amount-detailData.sold_amount)"
            :bar-height="7"></mt-progress>
          <div slot="start" class="fl">已转入{{detailData.sold_amount}}</div>
          <div slot="end" class="fr">总量{{detailData.total_amount}}</div>
        </div>
      </div>
      <div class="release-detail-number">
        <mt-cell title="分利计划单号" :value="detailData.serial_number"></mt-cell>
        <mt-cell title="发布总数量" :value="detailData.total_amount"></mt-cell>
        <mt-cell title="支出利润" class="servings">{{detailData.interest}}{{detailToken.code}}</mt-cell>
        <mt-cell title="起购份数" class="servings">{{detailData.min_amount}}{{detailToken.code}}份</mt-cell>
        <mt-cell title="最多可购份数" :value="detailData.high_amount + detailToken.code"></mt-cell>
        <mt-cell title="活动截止时间" :value="detailData.deadline_date"></mt-cell>
      </div>
    </div>
    <!-- 已结束 -->
    <div v-if="detailData.status!='进行中'">
      <div class="release-detail-number">
        <div class="end-order">
          <mt-cell title="分利计划单号" :value="detailData.serial_number"></mt-cell>
          <mt-cell title="当前状态" :value="detailData.status"></mt-cell>
          <mt-cell title="发布时间" :value="date"></mt-cell>
          <mt-cell title="活动截止时间" :value="detailData.deadline_date"></mt-cell>
        </div>
        <div class="end-order">
          <mt-cell title="发布总数量" :value="detailData.total_amount"></mt-cell>
          <mt-cell title="发布份数" class="servings">{{detailData.total_amount/detailData.step_amount}}份</mt-cell>
          <mt-cell title="每份数量" :value="detailData.step_amount"></mt-cell>
          <mt-cell title="冻结时长" :value="detailData.freeze_days"></mt-cell>
          <mt-cell title="支出利润" class="servings">{{detailData.interest}}{{detailToken.code}}</mt-cell>
        </div>
        <div class="end-order">
          <mt-cell title="起购份数" :value="detailData.min_amount + detailToken.code"></mt-cell>
          <mt-cell title="最多可购份数" :value="detailData.high_amount + detailToken.code"></mt-cell>
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
      .servings{
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