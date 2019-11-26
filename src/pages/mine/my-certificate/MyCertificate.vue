<template>
  <div class="token">
    <div class="token-header header">
      <mt-header fixed title="我的通证">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="token-detail">
      <div class="home-pub-token">
        <img src="../../../assets/images/life-icon.png" alt="" class="fl icon">
        <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
      </div>
      <mt-cell title="可用量" to="" is-link>
        <img slot="icon" src="../../../assets/images/available.svg" width="24" height="24">
      </mt-cell>
      <mt-cell title="冻结量" to="" is-link class="freeze-token">
        <img slot="icon" src="../../../assets/images/freeze.svg" width="24" height="24">
      </mt-cell>
    </div>
    <!-- 最近发行 -->
    <div class="token-recently-released">
      <mt-cell title="最近发行" to="" is-link>全部 </mt-cell>
      <!-- <div class="no-records">
        <p>暂无发行记录</p>
        <van-button  type="primary" class="button">去 发 行</van-button>
      </div> -->
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
    </div>
    <!-- 分利计划 -->
    <div class=" token-recently-released plan">
      <mt-cell title="分利计划" to="" is-link>全部 </mt-cell>
      <router-link to="release">
        <div class="no-records">
          <p>暂无分利计划</p>
          <van-button type="primary" class="button">去 发 布</van-button>
        </div>
      </router-link>
      <!-- <div class="home-pub-token">
        <img src="../../../assets/images/life-icon.png" alt="" class="fl icon">
        <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
        <div class="home-pub-token-days">
          <div class="home-pub-token-days-top">
            <p>锁仓期限 30 天</span>
              <p class="fr percentage">2%</p>
          </div>
          <div>
            <p>最高转入100份</p>
            <p class="fr">年化利率</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script></script>
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

  .token-recently-released.plan {
    height: auto;
  }
</style>