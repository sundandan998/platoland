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
                <p>{{$t('m.quota')}}:{{item.low_number}} -{{item.high_number}}</p>
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
              <p>{{$t('m.quota')}}:{{item.low_number}} -{{item.high_number}}</p>
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
        // 市场列表参数
        dealData: {
          publish_type: 0
        },
      }
    },
    created() {
      this.dealList()
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
      //市场列表
      dealList() {
        api.dealList(this.dealData).then(res => {
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