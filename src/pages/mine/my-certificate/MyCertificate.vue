<template>
  <div class="token">
    <div class="token-header header">
  <mt-header fixed  :title="$t('m.myToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="token-detail">
      <div class="home-pub-token">
        <img :src="this.balancetoken.icon" alt="" class="fl icon">
        <span><b>{{this.balancetoken.code}}</b>({{balancetoken.nickname}}) <p>{{this.balancetoken.subject}}</p></span>
      </div>
      <!-- availabletransfer -->
      <!-- <router-link to="/availabletransfer/this.balancetoken.icon"> -->
      <router-link :to="{name:'AvailableTransfer',params:{code:this.balancetoken.code}}">
        <mt-cell :title="$t('m.availableAmount')" :value="this.balanceData.available_amount" is-link>
          <img slot="icon" src="../../../assets/images/available.svg" width="24" height="24">
        </mt-cell>
      </router-link>
      <!-- freeze -->
      <router-link :to="{name:'FreezeDetail',params:{code:this.balancetoken.code}}">
        <mt-cell :title="$t('m.freezeAmount')" :value="this.balanceData.freeze_amount" is-link class="freeze-token">
          <img slot="icon" src="../../../assets/images/freeze.svg" width="24" height="24">
        </mt-cell>
      </router-link>
    </div>
    <!-- 最近发行 -->
    <!-- <div class="token-recently-released">
      <mt-cell title="最近发行" to="" is-link>全部 </mt-cell>
      <div class="no-records">
        <p>暂无发行记录</p>
        <van-button  type="primary" class="button">去 发 行</van-button>
      </div>
      <div class="home-pub-token">
        <img src="../../../assets/images/life-icon.png" alt="" class="fl icon">
        <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
        <span class="token-days fr">已发行20天</span>
        <div class="token-home-pub-days">
          <div class="fl">
            <p>第2期</p>
            <p class="fr"><img src="../../../assets/images/lock.svg" alt=""> 80天</p>
          </div>
          <p class="fr"> <img src="../../../assets/images/lock.svg" alt=""> 0.1</p>
        </div>
        <div class="token-progress">
          <mt-progress :value="20" :bar-height="7"></mt-progress>
        </div>
        <div class="token-total">
          <p>已售1份</p>
          <p class="fr">共2份</p>
        </div>
      </div>
    </div> -->
    <!-- 分利计划 -->
    <div class=" token-recently-released plan">
      <!-- <router-link :to="{name:'ReleaseHistory',params:{token:this.balancetoken}}"> -->
      <router-link :to="{name:'ReleaseHistory'}">
        <mt-cell  :title="$t('m.distributionPlan')" is-link>{{$t('m.all')}} </mt-cell>
      </router-link>
      <router-link to="release" v-if="this.listData.length==0">
        <div class="no-records">
          <p>{{$t('m.noPlan')}}</p>
          <!-- <router-link to="/release"> -->
          <router-link :to="{name:'Release',params:{code:this.balancetoken.code,icon:this.balancetoken.icon,nickname:balancetoken.nickname,
          subject:balancetoken.subject}}">
            <van-button type="primary" class="button">{{$t('m.goRelease')}}</van-button>
          </router-link>
        </div>
      </router-link>
      <div v-if="this.listData.length!=0">
        <div class="home-pub-token" v-for="item in listData">
          <!-- :to="{name:'ReleaseDetail',params:{id: item.id}}" -->
          <router-link :to="/releasedetail/+item.id">
            <img :src="item.token.icon" alt="" class="fl icon">
            <span><b>{{item.token.code}}</b>( {{item.token.nickname}} )<p>{{item.token.subject}}</p></span>
            <div class="home-pub-token-days">
              <div class="home-pub-token-days-top">
                <p>{{$t('m.theTerm')}} {{item.freeze_days}} {{$t('m.day')}}</span>
                  <p class="fr percentage">{{item.air|number}}%</p>
              </div>
              <div>
                <p>{{$t('m.highestTransfer')}}{{item.high_amount}}{{$t('m.share')}}</p>
                <p class="fr">{{$t('m.interestRate')}}</p>
              </div>
            </div>
          </router-link>
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
        balanceData: '',
        balancetoken: '',
        listData: '',
        infoData: '',
        listParams: {
          admin: 'true',
          page: 1,
          page_size: 1,
          status: 0
        }
      }
    },
    created() {
      this.balance()
      this.list()
    },
    methods: {
      // 余额
      balance() {
        // this.$route.params.code
        api.balance({ token_code: this.$route.params.code }).then(res => {
          if (res.code == 0) {
            this.balanceData = res.data
            this.balancetoken = res.data.token
            this.$store.commit('detail', res.data)
          }
        }).catch(err => {
        })
      },
      // 分利列表
      list() {
        api.flList(this.listParams).then(res => {
          if (res.code == 0) {
            this.listData = res.data
          }
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .token {
    .home-pub-token {
      height: auto;
    }

    .token-detail {
      margin: 90px 24px 20px 24px;
      background-color: #fff;
      border-radius: 10px;

    }

    .freeze-token {
      border-radius: 10px;
    }

    .token-recently-released {
      background-color: #fff;
      margin: 20px 24px;
      border-radius: 10px;
      height: auto;

      .mint-cell {
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }

      .no-records {
        text-align: center;
        color: #CDCDCD;

        .button {
          margin: 20px 0 30px 0;
        }
      }

      .home-pub-token {
        margin-top: -50px;

        .token-days {
          margin-right: 40px;
          font-size: 24px;
          color: #036EB8;
        }

        .token-home-pub-days {
          margin: 20px 40px 0 55px;
          height: 50px;

          .fl {
            width: 60%;
          }

          p {
            display: inline;
            color: #036EB8;
          }
        }

        .token-progress {
          .mt-progress>* {
            margin: 0 40px;
          }

          .mt-progress-runway {
            border-radius: 7px;
          }

          .mt-progress-progress {
            border-radius: 7px;
          }
        }

        .token-total {
          margin: 0 40px 0px 50px;

          p {
            display: inline-block;
            color: #999;
            padding-bottom: 20px;
          }
        }

        .home-pub-token-days {
          margin: 20px 40px 0 55px;

          p {
            display: inline-block;
            color: #999;
            margin-bottom: 10px;
          }

          .percentage {
            color: #5186F4;
            font-size: 40px;
          }

          .home-pub-token-days-top {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>