<template>
  <div class="home">
    <!-- 头部标题 -->
    <div class="home-header">
      <mt-header fixed title="P L A T O L A N D"></mt-header>
    </div>
    <!-- 轮播部分 -->
    <div class="home-banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item> <img src="../../assets/images/banner2.jpg" alt=""></van-swipe-item>
        <van-swipe-item> <img src="../../assets/images/banner3.jpg" alt=""></van-swipe-item>
        <!-- <van-swipe-item> <img src="../../assets/images/banner.png" alt=""></van-swipe-item>
        <van-swipe-item> <img src="../../assets/images/banner.png" alt=""></van-swipe-item> -->
      </van-swipe>
    </div>
    <!-- 交易部分 -->
    <div class="home-transaction">
      <router-link to="zone">
        <span><img src="../../assets/images/currency.svg" alt="">发行专区</span>
      </router-link>
      <router-link to="bao">
        <span><img src="../../assets/images/distribution.svg" alt="">分利宝</span>
      </router-link>
      <span><img src="../../assets/images/OTC.svg" alt="">交易市场</span>
      <span><img src="../../assets/images/pass.svg" alt="">通证大全</span>
    </div>
    <!-- 最新发行 -->
    <div class="home-latest-release">
      <router-link to="zone">
        <p class="home-pub-title">发行专区<span class="fr">全部></span></p>
      </router-link>
      <div class="home-latest-release-token" v-for="item in release">
        <router-link :to="{name:'Issued',params:{id:item.id}}">
          <div class="home-pub-token">
            <img :src="item.token.icon" alt="" class="fl icon">
            <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
            <img src="../../assets/images/publicity.png" alt="" class="fr publicity" v-if="item.status==0">
            <img src="../../assets/images/issued.png" alt="" class="fr publicity" v-if="item.status==1">
          </div>
          <div class="home-latest-release-token-bot">
            <div class="home-latest-release-token-bot-text fl">
              <span>第 {{item.periods}} 期</span>
              <span class="fr"> <img src="../../assets/images/lock.svg" alt=""> {{item.freeze_days}} 天</span>
            </div>
            <span class="fr "> <img :src="item.d_icon" alt=""> {{item.issue_price|number}}</span>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 分利宝 -->
    <div class="home-divided-treasure">
      <router-link :to="{name:'Bao'}">
        <p class="home-pub-title ">分利宝<span class="fr">全部></span></p>
      </router-link>
      <div class="home-divided-treasure-token" v-for="item in flData">
        <router-link :to="{name:'Transferflb',params:{item:item}}">
          <div class="home-pub-token">
            <img :src="item.token.icon" alt="" class="fl icon">
            <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
          </div>
          <div class="home-divided-treasure-token-bot">
            <p>锁仓期限 {{item.freeze_days}} 天 <span class="fr home-percentage">{{item.air|number}}%</span></p>
            <p>最高可投 {{item.high_amount}}<span class="fr">分利率</span></p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 市场交易 -->
    <div class="home-market-transaction">
      <p class="home-pub-title">市场交易<span class="fr">全部></span></p>
      <div class="home-market-transaction-token">
        <div class="home-pub-token">
          <img src="../../assets/images/life-icon.png" alt="" class="fl icon">
          <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
        </div>
        <div class="home-market-transaction-con">
          <div class="fl home-market-transaction-num">
            <span class="fl">最高买价<p> <img src="../../assets/images/u318.png" alt=""> 0.12</p></span>
            <span class="fr">数量<p>0.12</p></span>
          </div>
          <van-button class="fr" type="default">立 即 出 售</van-button>
        </div>
        <div class="home-market-transaction-bot">
          <div class="fl home-market-transaction-bot-num">
            <span class="fl">最高买价<p> <img src="../../assets/images/u318.png" alt="">0.12</p></span>
            <span class="fr">数量<p> 0.12</p></span>
          </div>
          <van-button class="fr" type="danger">立 即 购 买</van-button>
        </div>
      </div>
    </div>
    <div class="home-market-transaction">
      <div class="home-market-transaction-token">
        <div class="home-pub-token">
          <img src="../../assets/images/life-icon.png" alt="" class="fl icon">
          <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
        </div>
        <div class="home-market-transaction-con">
          <div class="fl home-market-transaction-num">
            <span class="fl">买盘最高价<p> <img src="../../assets/images/u318.png" alt="">0.12</p></span>
            <span class="fr">数量<p>0.12</p></span>
          </div>
          <van-button class="fr" type="default">立 即 出 售</van-button>
        </div>
        <div class="home-market-transaction-bot">
          <div class="fl home-market-transaction-bot-num">
            <span class="fl">买盘最高价<p> <img src="../../assets/images/u318.png" alt="">0.12</p></span>
            <span class="fr"> 数量<p>0.12</p></span>
          </div>
          <van-button class="fr" type="danger">立 即 购 买</van-button>
        </div>
      </div>
    </div>
    <!-- Tabber部分 -->
    <app-tabber :message=selected></app-tabber>
  </div>
</template>
<script>
  // Tabber栏
  import Tabber from './../../assets/pub/Tabber.vue'
  import store from './../../store/modules/app.js'
  import { toast } from '@/assets/js/pub.js'
  // 接口
  import api from "@/api/system/System.js"
  export default {
    data() {
      return {
        selected: 'home',
        message: 'home',
        flData: '',
        release: ''
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      this.home()
    },
    methods: {
      home() {
        api.home().then(res => {
          if (res.code == 0) {
            // 分利宝列表
            this.flData = res.data.fl_list
            // 发行专区列表
            this.release = res.data.release_list
          }
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/global';

  .home {
    height: auto;
    margin-bottom: 100px;

    /* 公共标题部分 /发行专区/分利宝/市场交易 */
    .home-pub-title {
      height: 90px;
      line-height: 90px;
      font-size: 30px;
      color:#333;
      span {
        font-size: 24px;
        color: #959595;
      }
    }

    /* 公共button */
    button {
      height: 60px;
      width: 180px;
      line-height: 60px;
      border-radius: 10px;
      font-size: 24px;
    }

    .home-header {
      height: 44px;
      background-color: #fff;
    }

    .home-banner {
      margin: 20px 24px;

      /* background: url("../../assets/images/bg.png");
      background-size: 100% 100%;
      background-position: center center; */
      img {
        width: 100%;
        border-radius: 10px;
      }
    }

    .home-transaction {
      height: 200px;
      background-color: #fff;
      margin: 0px 24px;
      border-radius: 10px;

      span {
        width: 24.15%;
        display: inline-block;
        border-right: 1px solid #f2f2f2;
        height: 100%;
        text-align: center;
        font-size: 24px;
        color: #959595;

        img {
          height: 80px;
          margin: 30px auto 15px auto;
          display: block;
        }
      }
    }

    /* 最新发行 */
    .home-latest-release {
      margin: 0px 24px;
     
      .home-latest-release-token {
        overflow: hidden;
        height: 260px;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 20px;

        .home-latest-release-token-bot {
          margin: 0 45px;

          span {
            font-size: 28px;
            color: #1d92ec;
            display: inline-block;
          }

          img {
            width: 30px;
          }

          .home-latest-release-token-bot-text {
            width: 60%;
          }
        }
      }
    }

    /* 分利宝 */
    .home-divided-treasure {
      margin: 0px 24px;
      .home-divided-treasure-token {
        height: 310px;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;

        .home-divided-treasure-token-bot {
          p {
            margin: 20px 30px 0 45px;
            font-size: 24px;
            color: #959595;

            .home-percentage {
              color: #eb4545;
              font-size: 68px;
              margin-top: -40px;
            }
          }
        }
      }
    }

    /* 市场交易 */
    .home-market-transaction {
      margin: 0 24px 20px 24px;

      .home-market-transaction-token {
        height: 450px;
        background-color: #fff;
        border-radius: 10px;

        .home-market-transaction-con {
          margin: 0 30px 0 45px;
          height: 130px;

          .home-market-transaction-num {
            width: 50%;

            span {
              color: #1abc9c;
              font-size: 24px;

              p {
                color: #333;
                margin-top: 5px;
              }

              img {
                height: 30px;
                margin: 5px 10px 0 0;
              }
            }
          }

          button {
            background-color: #1abc9c;
            color: #fff;
          }
        }

        .home-market-transaction-bot {
          margin: 0 30px 0 45px;
          height: 120px;

          .home-market-transaction-bot-num {
            width: 50%;

            span {
              color: #eb4545;
              font-size: 24px;

              p {
                color: #333;
                margin-top: 5px;
              }

              img {
                height: 30px;
                margin: 5px 10px 0 0;
              }
            }
          }
        }
      }
    }
  }
</style>