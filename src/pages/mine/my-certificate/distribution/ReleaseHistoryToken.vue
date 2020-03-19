<template>
  <div class="release-history">
    <div class="release-header">
      <mt-header fixed :title="detail.token.code+$t('m.distributionPlan')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button slot="right" @click.native="release"> <img src="../../../../assets/images/release.svg" alt="">
          {{$t('m.release')}}
        </mt-button>
      </mt-header>
    </div>
    <div class="home-pub-token">
      <img :src="detail.token.icon" alt="" class="fl icon">
      <span><b>{{detail.token.code}}</b>({{detail.token.nickname}})
        <p>{{detail.token.subject}}</p>
      </span>
    </div>
    <div class="release-detail-num" v-for="item in listData">
      <router-link :to="/releasedetail/+item.id">
        <p>{{item.air|number}}%</p>
        <div class="release-detail-text">
          <div class="release-detail-text-left fl">
            <span class="fl"><img src="../../../../assets/images/geton.svg" alt=""
                class="img-status">{{item.status}}</span><span class="fr"><img src="../../../../assets/images/lock.svg"
                alt="">{{item.freeze_days}}{{$t('m.day')}}</span>
          </div>
          <div class="release-detail-text-right fr">
            <!-- item.create_time.substr(0,11) -->
            <span><img src="../../../../assets/images/clock.svg" alt="">{{(item.create_time).substr(0,11)}}</span>
          </div>
        </div>
        <div class="release-detail-num-progress progress ">
          <mt-progress :value="item.air|number" :bar-height="7"></mt-progress>
          <div slot="start" class="fl">{{$t('m.sold')}}{{item.sold_amount}}</div>
          <div slot="end" class="fr">{{$t('m.total')}}{{item.total_amount}}</div>
        </div>
      </router-link>
    </div>
    <div class="release-history-list">
      <p>{{$t('m.releaseHistory')}} <span>({{$t('m.over')}})</span></p>
      <div>
        <!-- v-if="item.status=='已结束'" -->
        <div class="release-history-title">
          <span>{{$t('m.releaseTime')}}</span>
          <span>{{$t('m.theTerm')}}</span>
          <span>{{$t('m.interestRate')}}</span>
          <span>{{$t('m.quantity')}}</span>
        </div>
        <!-- v-if="item.status=='已结束'" -->
        <div class="release-history-title" v-for="item in listData">
          <div  v-if="item.status=='已结束'">
            <span>{{item.create_time}}</span>
            <span>{{item.freeze_days}} {{$t('m.day')}}</span>
            <span>{{item.air|number}} %</span>
            <span>{{item.total_amount}}</span>
          </div>
        </div>
        <p class="no-data">暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        listData: '',
        balanceToken: '',
        listParams: {
          admin: true,
          page: 1,
          page_size: 50,
          code: '',
        }
      }
    },
    created() {
      this.list()
    },
    methods: {
      // 发布
      release() {
        this.$router.push({
          name: 'Release',
          params: {
            code: this.detail.token.code,
          }
        })
      },
      // 发布列表
      list() {
        this.listParams.code = this.detail.token.code
        api.flList(this.listParams).then(res => {
          if (res.code == 0) {
            this.listData = res.data
          }
        }).catch(err => {

        })
      }
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .release-history {
    .home-pub-token {
      margin: 90px 24px 0 24px;
      background-color: #fff;
      border-radius: 10px;
    }

    .release-detail-num {
      margin: 20px 24px 0px 24px;
      background-color: #fff;
      border-radius: 10px;
      height: 220px;

      /* margin-bottom:40px; */
      .release-detail-text {
        height: 50px;
        margin: 10px 20px 0 55px;
        color: #036EB8;
        font-size: 26px;

        .release-detail-text-left {
          width: 55%;
        }

        img {
          height: 30px;
          margin-right: 10px;
        }

        .img-status {
          position: relative;
          top: 10px;
          height: 40px;
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

    .release-history-list {
      background-color: #fff;
      margin: 20px 24px 24px 24px;
      border-radius: 10px;

      p {
        font-size: 30px;
        margin-left: 55px;

        span {
          font-size: 24px;
        }
      }

      .no-data {
        text-align: center;
      }

      .release-history-title {
        padding-left: 55px;
        border-bottom: 1px solid #EFEFF4;

        span {
          width: 24%;
          display: inline-block;
          font-size: 26px;
          margin: 20px 0;
        }
      }
    }
  }
</style>