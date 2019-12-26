<template>
  <div class="to-deal">
    <div class="to-deal-header">
      <div class="to-details-header">
        <mt-header fixed :title="$t('m.market')">
          <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
          <mt-button icon="" slot="right">
            <router-link to="/purchaserelease">
              <img src="../../../assets/images/fb.png" alt="" />
              <span class="release">{{$t('m.release')}}</span>
            </router-link>
          </mt-button>
        </mt-header>
      </div>
    </div>
    <router-link to="/list">
    <div class="to-deal-token">
      <div class="to-deal-token-left fl">
        <span><img :src="dealListToken.icon" alt="" class="fl"></span>
        <span class="to-deal-token-text">
          <span>{{dealListToken.code}}({{dealListToken.nickname}})</span>
          <p>{{dealListToken.subject}} </p>
        </span>
      </div>
      <div class="to-deal-token-right fr">
        <img src="../../../assets/images/r.png" alt="" >
      </div>
    </div>
  </router-link>
    <div>
      <van-tabs @click="index">
        <van-tab :title="$t('m.purchasebuy')">
          <div class="to-deal-purchase" v-for="(item,index) in dealListData">
            <router-link :to="/purchase/+item.id">
              <div class="to-deal-purchase-top">
                <span>{{item.publish_name}}</span>
              </div>
              <div class="to-deal-purchase-bot">
                <span>{{$t('m.transactionnum')}}:{{item.amount}}</span>
                <span>
                  <img :src="item.d_icon">{{item.price}}</span>
                <p>{{$t('m.quota')}}:{{item.low_number|keepTwoNum}} -{{item.high_number|keepTwoNum}}</p>
              </div>
            </router-link>
          </div>
        </van-tab>
        <van-tab :title="$t('m.sell')">
          <div class="to-deal-purchase" v-for="(item,index) in dealListData">
            <router-link :to="/sell/+item.id">
              <div class="to-deal-purchase-top">
                <span>{{item.publish_name}}</span>
              </div>
              <div class="to-deal-purchase-bot">
                <span>{{$t('m.transactionnum')}}:{{item.amount}}</span>
                <span>
                  <img :src="item.d_icon">{{item.price}}</span>
                <p>{{$t('m.quota')}}:{{item.low_number|keepTwoNum}} -{{item.high_number|keepTwoNum}}</p>
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
        dealListData: {},
        dealListToken:{},
        // 市场列表参数
        dealData: {
          publish_type: 0,
          code: 'LIFE+',
        },
      }
    },
    created() {
      this.path()
      // console.log()
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
      path(){
        if(this.refpath=='/deal'){
          this.dealData.code = this.$route.params.code
          this.dealList()
        }else{
          this.dealData.code = this.dealData.code
          this.dealList()
        }
      },
      //市场列表
      dealList() {
        api.dealList(this.dealData).then(res => {
          this.dealListData = res.data.info
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
    .to-deal-token{
      height: 120px;
      background-color: #fff;
      .to-deal-token-left{
        width: 80%;
        img{
          margin: 20px;
        }
        .to-deal-token-text{
          display: inline-block;
          margin-top: 20px;
        }
      }
      .to-deal-token-right{
        img{
          margin: 40px 20px 0 0 ;
        }
      }

    }
  }
</style>