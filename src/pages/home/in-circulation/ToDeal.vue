<template>
    <div class="to-deal">
      <div class="to-deal-header">
        <div class="to-details-header">
          <mt-header fixed :title="$t('m.marketPlace')">
            <!--  v-on:click="$router.go(-1)" -->
            <mt-button slot="left" icon="back" @click="back">{{$t('m.back')}}</mt-button>
            <mt-button icon="" slot="right">
              <!-- <router-link to="/purchaserelease"> -->
              <router-link :to="{name:'Purchase',params:{code:this.detailCode,icon:this.icon}}">
                <img src="../../../assets/images/fb.png" alt="" />
                <span class="release">{{$t('m.release')}}</span>
              </router-link>
            </mt-button>
          </mt-header>
        </div>
      </div>
      <!-- <router-link to="/list"> -->
      <!-- <router-link :to="{name:'List',params:{code:dealListToken.code}}"> -->
      <router-link :to="{name:'MarketToken',params:{code:dealListToken.code}}">
        <div class="to-deal-token">
          <div class="to-deal-token-left fl">
            <span><img :src="dealListToken.icon" alt="" class="fl"></span>
            <span class="to-deal-token-text">
              <span>{{dealListToken.code}}({{dealListToken.nickname}})</span>
              <p>{{dealListToken.subject}} </p>
            </span>
          </div>
          <div class="to-deal-token-right fr">
            <img src="../../../assets/images/r.png" alt="">
          </div>
        </div>
      </router-link>
      <div class="deal-list">
        <van-tabs @click="index">
          <van-tab :title="$t('m.buy')">
            <p class="no-data" v-if="this.dealListData.length==0">{{$t('m.noData')}}</p>
            <div class="to-deal-purchase" v-for="(item,index) in dealListData">
              <!-- <router-link :to="/purchase/+item.id"> -->
              <router-link :to="{name:'PurchasePass',params:{id:item.id,code:denominated_assets}}">
                <div class="to-deal-purchase-top">
                  <span>{{item.publish_name}}</span>
                </div>
                <div class="to-deal-purchase-bot">
                  <span class="to-deal-purchase-bot-num">{{$t('m.quantity')}}:{{item.amount|number}}</span>
                  <span>
                    <img :src="item.d_icon">{{item.price|number}}</span>
                  <p>{{$t('m.limit')}}:{{item.low_number|keepTwoNum}} -{{item.high_number|keepTwoNum}}</p>
                </div>
              </router-link>
            </div>
          </van-tab>
          <van-tab :title="$t('m.sell')">
            <p class="no-data" v-if="this.dealListData.length==0">{{$t('m.noData')}}</p>
            <div class="to-deal-purchase" v-for="(item,index) in dealListData">
              <!-- <router-link :to="/sell/+item.id"> -->
              <router-link :to="{name:'Sell',params:{id:item.id,code:dealListToken.code}}">
                <div class="to-deal-purchase-top">
                  <span>{{item.publish_name}}</span>
                </div>
                <div class="to-deal-purchase-bot">
                  <span class="to-deal-purchase-bot-num">{{$t('m.quantity')}}:{{item.amount|number}}</span>
                  <span>
                    <img :src="item.d_icon">{{item.price|number}}</span>
                  <p>{{$t('m.limit')}}:{{item.low_number|keepTwoNum}} -{{item.high_number|keepTwoNum}}</p>
                </div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </template>
  <script>
    import api from '@/api/market/Market.js'
    import { toast } from '@/assets/js/pub.js'
    export default {
      data() {
        return {
          dealListData: '',
          dealListToken: {},
          denominated_assets: '',
          detailCode: '',
          icon: '',
          // 市场列表参数
          dealData: {
            publish_type: 0,
            code: '',
          },
        }
      },
      created() {
        this.dealList()
      },
      computed: {
        refpath() {
          return window.sessionStorage.getItem('refpath')
        }
      },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          window.sessionStorage.setItem('refpath', from.path)
        })
      },
      methods: {
        back() {
          this.$router.push({
            name: 'Home'
          })
        },
        //  tab栏展示
        index(index, title) {
          if (index == 0) {
            this.dealData.publish_type = 0
            this.dealList()
          } else {
            if (index == 1) {
              this.dealData.publish_type = 1
              this.dealList()
            }
          }
        },
        // path() {
        //   if (this.refpath == '/markettoken') {
        //     this.dealData.code = this.$route.params.code || "LIFE+"
        //     this.dealList()
        //   } else {
        //     this.dealData.code = "LIFE+"
        //     this.dealList()
        //   }
        //   // if(this.$route.params.code == undefined){
        //   //   console.log('45')
        //   // }
        // },
        // //市场列表
        dealList() {
          // this.dealData.code = this.dealData.code
          this.dealData.code = this.$route.params.code || "LIFE+"
          api.dealList(this.dealData).then(res => {
            this.dealListData = res.data.info
            this.detailCode = res.data.token.code
            // console.log(this.detailCode)
            for (let i = 0; i < this.dealListData.length; i++) {
              this.denominated_assets = this.dealListData[i].denominated_assets
              this.icon = this.dealListData[i].d_icon
            }
            this.dealListToken = res.data.token
            this.$store.commit('detail', res.data)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 保留两位小数
      filters: {
        keepTwoNum(value) {
          value = Number(value)
          return value.toFixed(2)
        }
      }
    }
  </script>
  <style lang="scss">
    @import '../../../assets/scss/global';
  
    .to-deal {
      .to-deal-header {
        margin-bottom: 90px;
      }
  
      .no-data {
        text-align: center;
        margin: 50px auto;
      }
  
      .to-deal-token {
        height: 120px;
        background-color: #fff;
  
        .to-deal-token-left {
          width: 80%;
  
          img {
            margin: 20px;
          }
  
          .to-deal-token-text {
            display: inline-block;
            margin-top: 20px;
          }
        }
  
        .to-deal-token-right {
          img {
            margin: 40px 20px 0 0;
          }
        }
  
      }
  
      .deal-list {
        .to-deal-purchase {
          background-color: #fff;
          margin: 10px auto;
          padding: 10px 24px;
        }
        img{
          width: 30px;
          margin-right: 10px;
        }
        .to-deal-purchase-bot-num{
          width: 60%;
          display: inline-block;
        }
      }
    }
  </style>