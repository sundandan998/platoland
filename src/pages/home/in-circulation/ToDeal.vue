<template>
  <div class="to-deal">
    <div class="to-deal-header">
      <div class="to-details-header">
        <mt-header fixed :title="$t('m.market')">
          <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
          <mt-button icon="" slot="right">
              <router-link to="/purchaserelease">
                <img src="../../../assets/images/fb.png" alt="" />
                <span>{{$t('m.release')}}</span>
              </router-link>
          </mt-button>
        </mt-header>
      </div>
    </div>
    <div class="to-deal-navbar">
      <van-tabs>
        <van-tab :title="$t('m.purchasebuy')">
          <div class="to-deal-purchase" v-for="(item,index) in dealListData">
            <router-link :to="/purchase/+item.id">
              <div class="to-deal-purchase-top">
                <span>{{item.publish_name}}</span>
              </div>
              <div class="to-deal-purchase-bot">
                <span>{{$t('m.transactionnum')}}:{{item.amount}}</span>
                <span>
                  <img :src="'http://'+item.d_icon">{{item.price}}</span>
                <p>{{$t('m.quota')}}:{{item.low_number}} -{{item.high_number}}</p>
              </div>
            </router-link>
          </div>
        </van-tab>
        <van-tab :title="$t('m.sell')">
          <router-link to="/sell">
            <div class="to-deal-purchase" v-for="(item,index) in dealListData">
              <div class="to-deal-purchase-top">
                <span>{{item.publish_name}}</span>
              </div>
              <div class="to-deal-purchase-bot">
                <span>{{$t('m.transactionnum')}}:{{item.amount}}</span>
                <span>
                  <img :src="'http://'+item.d_icon">{{item.price}}</span>
                <p>{{$t('m.quota')}}:{{item.low_number}} -{{item.high_number}}</p>
              </div>
            </div>
          </router-link>
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
        dealListData: {}
      }
    },
    created() {
      this.dealList()
    },
    methods: {
      //市场列表
      dealList() {
        api.dealList(this.releaseData).then(res => {
          this.dealListData = res.data
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>