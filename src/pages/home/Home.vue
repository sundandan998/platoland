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
    <!-- 公告消息 -->
    <div class="box">
      <router-link to="news">
        <img src="../../assets/images/news.svg" alt="" class="fl">
        <ul class="con1" ref="con1" :class="{anim:animate==true}">
          <li v-for='item in items'>{{item.name}}</li>
        </ul>
      </router-link>
    </div>
    <!-- 交易部分 -->
    <div class="home-transaction">
      <router-link to="zone">
        <!-- 发行专区 -->
        <span><img src="../../assets/images/currency.svg" alt="">{{$t('m.distributionArea')}}</span>
      </router-link>
      <router-link to="bao">
        <!-- 分利宝 -->
        <span><img src="../../assets/images/distribution.svg" alt="">{{$t('m.fenlibao')}}</span>
      </router-link>
      <router-link to="/deal">
        <!-- 交易市场 -->
        <span><img src="../../assets/images/OTC.svg" alt="">{{$t('m.marketPlace')}}</span>
      </router-link>
      <router-link to="list">
        <!-- 通证大全 -->
        <span class="token"><img src="../../assets/images/pass.svg" alt="">{{$t('m.tokenDaQuan')}}</span>
      </router-link>
    </div>
    <!-- 最新发行 -->
    <div class="home-latest-release">
      <router-link to="zone">
        <p class="home-pub-title">{{$t('m.distributionArea')}}<span class="fr">{{$t('m.all')}}></span></p>
      </router-link>
      <div class="home-latest-release-token" v-for="item in release" @click="jump(item)">
        <!-- <router-link :to="{name:'Issued',params:{id:item.id}}"> -->
        <div class="home-pub-token">
          <img :src="item.token.icon" alt="" class="fl icon">
          <span class="fl"><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
          <span class="fr publicity" v-if="item.status==0"><img src="../../assets/images/gs.svg" alt="">公示中</span>
          <span class="fr issue" v-if="item.status==1"><img src="../../assets/images/clock.svg" alt="">进行中</span>
        </div>
        <div class="home-latest-release-token-bot">
          <div class="home-latest-release-token-bot-text fl">
            <span>{{$t('m.first')}} {{item.periods}} {{$t('m.qi')}}</span>
            <span class="fr"> <img src="../../assets/images/lock.svg" alt=""> {{item.freeze_days}}
              {{$t('m.day')}}</span>
          </div>
          <span class="fr "> <img :src="item.d_icon" alt=""> {{item.issue_price|number}}</span>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
    <!-- 分利宝 -->
    <!-- v-if="this.flData==[]"  -->
    <div class="home-divided-treasure" v-if="this.flData.length>0">
      <router-link :to="{name:'Bao'}">
        <p class="home-pub-title ">{{$t('m.fenlibao')}}<span class="fr">{{$t('m.all')}}></span></p>
      </router-link>
      <div class="home-divided-treasure-token" v-for="item in flData">
        <router-link :to="{name:'Transferflb',params:{id:item.id}}">
          <div class="home-pub-token">
            <img :src="item.token.icon" alt="" class="fl icon">
            <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
          </div>
          <div class="home-divided-treasure-token-bot">
            <p>{{$t('m.theTerm')}} {{item.freeze_days}} {{$t('m.day')}} <span
                class="fr home-percentage">{{item.air|number}}%</span></p>
            <p>{{$t('m.possibleThrow')}} {{item.high_amount}}<span class="fr">{{$t('m.interestRate')}}</span></p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 市场交易 -->
    <div class="home-market-transaction" v-if="this.market.length>0">
      <router-link :to="{name:'Deal'}">
        <p class="home-pub-title">{{$t('m.marketPlace')}}<span class="fr">{{$t('m.all')}}></span></p>
      </router-link>
      <div class="home-market-transaction-token" v-for="item in market" v-if="item.info.length>0">
        <div class="home-pub-token">
          <img :src="item.token.icon" alt="" class="fl icon">
          <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
        </div>
        <div v-for="marketInfo in item.info">
          <div class="home-market-transaction-con" v-if="marketInfo.publish_type==1">
            <div class="fl home-market-transaction-num">
              <span class="fl">{{$t('m.purchasePrice')}}<p> <img :src="marketInfo.d_icon"
                    alt="">{{marketInfo.high_number|number}} </p>
              </span>
              <span class="fr">{{$t('m.quantity')}}<p>{{marketInfo.amount|number}}</p></span>
            </div>
            <router-link :to="{name:'Sell',params:{id:marketInfo.id,code:marketInfo.token.code}}">
              <van-button class="fr" type="default">{{$t('m.sellNow')}}</van-button>
            </router-link>
          </div>
          <div class="home-market-transaction-bot" v-if="marketInfo.publish_type==0">
            <div class="fl home-market-transaction-bot-num">
              <span class="fl">{{$t('m.AskingPrice')}}<p> <img :src="marketInfo.d_icon"
                    alt="">{{marketInfo.low_number|number}}</p></span>
              <span class="fr">{{$t('m.quantity')}}<p>{{marketInfo.amount|number}} </p></span>
            </div>
            <router-link :to="{name:'PurchasePass',params:{id:marketInfo.id,code:marketInfo.token.code}}">
              <!-- <router-link :to="/purchase/+marketInfo.id"> -->
              <van-button class="fr" type="danger">{{$t('m.buyNow')}}</van-button>
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
        // 公告消息
        animate: false,
        items: [
          { name: "PLATOLAND生态获区块链协会创新应用大奖!" },
          { name: "PLATOLAND生态获区块链协会创新应用大奖!" },
          { name: "PLATOLAND生态获区块链协会创新应用大奖!" }
        ]
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      this.home()
      this.info()
      // this.version()
      setInterval(this.scroll, 3000)
      this.loginswitch()
    },
    methods: {
      // switch状态判断
      loginswitch() {
        let switchStatus = JSON.parse(localStorage.getItem('switch'))
        if (switchStatus == false || switchStatus == null) {
          this.$router.push({
            name: 'Login'
          })
          sessionStorage.setItem("switch", JSON.stringify(false))
          let switchName = JSON.parse(sessionStorage.getItem('switch'))
          if (switchName == false) {
            this.$router.push("/home")
          } else {
            this.$router.push({
              name: 'Login'
            })
          }
        }
      },
      // 公告消息
      scroll() {
        this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
          this.items.shift();               //删除数组的第一个元素
          this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
      jump(item) {
        if (item.status == 1) {
          this.$router.push({
            name: 'Issued',
            params: { id: item.id }
          })
        } else {
          this.$router.push({
            name: 'Detail',
            params: { code: item.token.code }
          })
        }
      },
      home() {
        // debugger
        api.home().then(res => {
          if (res.code == 0) {
            // 分利宝列表
            this.flData = res.data.fl_list
            // 发行专区列表
            this.release = res.data.release_list
            // 交易市场
            this.market = res.data.market_list
            // console.log(this.market)
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
            if (this.versionData.is_update == false) return
            if (this.versionData.is_force_update == true) {
              this.$messagebox({
                title: '版本升级',
                // title: '버전 업그레이드',
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
                // title: '버전 업그레이드',
                message: this.versionData.version_info,
                cancelButtonText: '否',
                confirmButtonText: '是',
                // cancelButtonText: '아니요',
                // confirmButtonText: '네',
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

    /* 消息公告 */
    .box {
      overflow: hidden;
      height: 40px;
      margin: 20px 24px;
      background-color: #FFFBE8;
      color: #ED6A0C;
      padding: 10px 20px;
      border-radius: 10px;
    }

    .anim {
      transition: all 0.5s;
      margin-top: -30px;
    }

    .con1 li {
      list-style: none;
      line-height: 45px;
      height: 55px;
      margin-left: 60px;
      color: #ED6A0C;
    }

    .home-transaction {
      height: 200px;
      background-color: #fff;
      margin: 0px 24px;
      border-radius: 10px;

      .token {
        border-right: none;
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

        .publicity {
          font-size: 26px;
          color: #06B56A;
          margin-right: 40px;

          img {
            margin-right: 7px;
            width: 26px;
          }
        }

        .issue {
          font-size: 26px;
          color: #37A7E1;
          margin-right: 40px;

          img {
            margin-right: 7px;
            width: 26px;
          }
        }

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