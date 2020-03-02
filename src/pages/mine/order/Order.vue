<template>
  <div class="order">
    <div class="order-header">
      <mt-header fixed :title="$t('m.order')">
        <mt-button icon="back" slot="left" @click.native="back">{{$t('m.back')}}</mt-button>
        <!-- <mt-button icon slot="right">
          <router-link to="/detailedlist">
            <span>筛选</span><img src="../../../assets/images/filter.svg" alt>
          </router-link>
        </mt-button> -->
      </mt-header>
    </div>
     <!-- (0, _('发行买入')),
    (1, _('OTC买入')),
    (2, _('OTC售出')),
    (3, _('OTC发布买入')),
    (4, _('OTC发布出售')),
    (5, _('转入')),
    (6, _('转出')),
    (7, _('受让')),
    (8, _('转让')),
    (9, _('存入分利宝')) -->
    <!-- 发行买入 -->
    <!-- 下拉刷新 -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <van-list v-model="loading" :finished="finished" :finished-text="$t('m.noMore')" @load="onLoad" :offset="100"
      :error.sync="error" :error-text="$t('m.load')">
      <div class="order-list" v-for="item in orderList">
        <router-link :to="{name:'OrderDetail',params:{order_id: item.order_id}}">
          <img class="fr" src="../../../assets/images/right.svg" alt="">
          <div class="order-list-data">
            <p class="order-list-date"><span>{{item.transaction_time}}</span><span class="fr">{{item.status}}</span></p>
            <p class="order-list-type">{{item.order_type}} <span
                v-if="item.order_type !='转出'&&item.order_type !='转入'&&item.order_type !='受让'&&item.order_type !='转让'">-{{item.token}}/{{item.exchange_token}}</span>
            </p>
            <p class="order-list-num"><span>{{$t('m.quantity')}}：{{item.amount}}</span><span class="fr"
                v-if="item.order_type!='转出'&&item.order_type!='转入'&&item.order_type!='受让'&&item.order_type!='转让'">{{$t('m.lumpSum')}}：{{item.total_amount}}</span>
            </p>
          </div>
        </router-link>
      </div>
    </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        orderList: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
      }
    },
    created() {
      // this.order()
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.order({ 'page': this.pageNum}).then(res => {
            if (res.code == 0) {
              this.orderList.push.apply(this.orderList, res.data)
              this.loading = false
              if (res.has_next == true) {
                this.pageNum++
              }
              if (res.has_next == false) {
                this.finished = true
                this.loading = false
              }
            }
          }).catch(err => {
            this.error = true
          })
        }, 100)
      },
      back() {
        this.$router.push({
          name: 'Mine'
        })
      }
    }
  } 
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .order-header {
    margin-bottom: 90px;
  }

  .order-list {
    margin: 10px 24px;
    border-radius: 10px;
    background-color: #fff;
    height: auto;
    padding: 20px 0;

    img {
      position: absolute;
      right: 30px;
      height: 40px;
    }

    .order-list-data {
      margin: 0 15px;

      .order-list-date {
        padding: 5px 0;
        border-bottom: 1px solid #ccc;

        span:last-child {
          color: #000;
          margin-right: 40px;
        }

        span {
          /* font-size: 0.78rem; */
          color: #999;
        }
      }

      .order-list-type {
        margin-top: 10px;
      }

      .order-list-num {
        padding: 5px 0;

        span {
          /* font-size: 0.78rem; */
          color: #999;
        }
      }
    }
  }
</style>