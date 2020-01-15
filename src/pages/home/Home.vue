<template>
  <div class="home">
    <!-- 头部标题 -->
    <div class="home-header">
      <mt-header fixed title="P L A T O L A N D"></mt-header>
    </div>
    <!-- 轮播部分 -->
    <div class="home-banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item> <img src="../../assets/images/banner2.jpg" alt="" @click="life"></van-swipe-item>
        <van-swipe-item> <img src="../../assets/images/banner3.jpg" alt="" @click="token"></van-swipe-item>
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
      <router-link to="/deal">
        <span><img src="../../assets/images/OTC.svg" alt="">交易市场</span>
      </router-link>
      <router-link to="list">
        <span class="token"><img src="../../assets/images/pass.svg" alt="">通证大全</span>
      </router-link>
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
    <!-- v-if="this.flData==[]"  -->
    <div class="home-divided-treasure" v-if="this.flData.length>0">
      <router-link :to="{name:'Bao'}">
        <p class="home-pub-title ">分利宝<span class="fr">全部></span></p>
      </router-link>
      <div class="home-divided-treasure-token" v-for="item in flData">
        <router-link :to="{name:'Transferflb',params:{id:item.id}}">
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
      <router-link :to="{name:'Deal'}">
        <p class="home-pub-title">交易市场<span class="fr">全部></span></p>
      </router-link>
      <div class="home-market-transaction-token" v-for="item in market">
        <div class="home-pub-token">
          <img :src="item.token.icon" alt="" class="fl icon">
          <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
        </div>
        <div v-for="marketInfo in item.info">
          <div class="home-market-transaction-con" v-if="marketInfo.publish_type==1">
            <div class="fl home-market-transaction-num">
              <span class="fl">最高买价<p> <img :src="marketInfo.d_icon" alt="">{{marketInfo.high_number|number}} </p>
              </span>
              <span class="fr">数量<p>{{marketInfo.amount|number}}</p></span>
            </div>
            <router-link :to="{name:'Sell',params:{id:marketInfo.id,code:marketInfo.token.code}}">
              <van-button class="fr" type="default">立 即 出 售</van-button>
            </router-link>
          </div>
          <div class="home-market-transaction-bot" v-if="marketInfo.publish_type==0">
            <div class="fl home-market-transaction-bot-num">
              <span class="fl">最低卖价<p> <img :src="marketInfo.d_icon" alt="">{{marketInfo.low_number|number}}</p></span>
              <span class="fr">数量<p>{{marketInfo.amount|number}} </p></span>
            </div>
            <router-link :to="{name:'PurchasePass',params:{id:marketInfo.id,code:marketInfo.token.code}}">
              <!-- <router-link :to="/purchase/+marketInfo.id"> -->
              <van-button class="fr" type="danger">立 即 购 买</van-button>
            </router-link>
          </div>
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
        release: '',
        market: '',
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      this.home()
      this.info()
      this.version()
    },
    methods: {
      home() {
        api.home().then(res => {
          if (res.code == 0) {
            // 分利宝列表
            this.flData = res.data.fl_list
            // 发行专区列表
            this.release = res.data.release_list
            // 交易市场
            this.market = res.data.market_list
            // this.$store.commit('detail', res.data.market_list)
          }
        }).catch(err => {
        })
      },
      // 用户信息
      info() {
        api.getUserInfo().then(res => {
          this.infoData = res.data
          window.sessionStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
        }).catch(err => {
          // console.log(err)
        })
      },
      // 轮播图
      token() {
        this.$router.push({
          name: 'Economy'
        })
      },
      life() {
        this.$router.push({
          name: 'Life'
        })
      },
           //版本升级
           version() {
        let vcode = this.$version()
        api.version({ 'version_code': vcode }).then(res => {
          if (res.code == 0) {
            this.versionData = res
            if(this.versionData.is_update == false) return
            if (this.versionData.is_force_update == true) {
              this.$messagebox({
                title: '版本升级',
                message: this.versionData.version_info,
                closeOnClickModal: false,
                // cancelButtonText: '否',
                confirmButtonText: '去更新',
                // showCancelButton: true
              }).then(action => {
                // console.log(this.versionData.update_url)
                if (window.plus) {
                  plus.runtime.openURL(this.versionData.update_url)
                  plus.runtime.quit()
                  // console.log(this.versionData.update_url)
                }
              })
            } else {
              
                // isForce = true
                // this.versionData = res
                this.$messagebox({
                  title: '版本升级',
                  message: this.versionData.version_info,
                  cancelButtonText: '否',
                  confirmButtonText: '是',
                  showCancelButton: true
                }).then(action => {
                  if (action === 'confirm') {
                    if (window.plus) {
                      // console.log(this.versionData.update_url)
                      plus.runtime.openURL(this.versionData.update_url)
                      plus.runtime.quit()
                    }
                  }
                })
            }
          }
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
      color: #333;

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
      margin-bottom: 40px;
    }

    .home-banner {
      margin: 20px 24px 0 24px;

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
      .token{
        border-right:none;
      }
      span {
        width: 24%;
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
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;

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