<template>
  <div class="order">
    <div class="order-header">
      <mt-header fixed title="订单">
        <mt-button icon="back" slot="left" @click.native="back">{{$t('m.back')}}</mt-button>
        <!-- <mt-button icon slot="right">
          <router-link to="/detailedlist">
            <span>筛选</span><img src="../../../assets/images/filter.svg" alt>
          </router-link>
        </mt-button> -->
      </mt-header>
    </div>
    <!-- 下拉刷新 -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="order-list" v-for="item in orderList">
        <router-link :to="{name:'OrderDetail',params:{order_id: item.order_id}}">
          <div class="order-list-data">
            <p class="order-list-date"><span>{{item.transaction_time}}</span><span class="fr">{{item.status}}</span></p>
            <p class="order-list-type">{{item.order_type}} <span
                v-if="item.order_type !='转出'&&item.order_type !='转入'&&item.order_type !='受让'&&item.order_type !='转让'">-{{item.token}}/{{item.exchange_token}}</span>
            </p>
            <p class="order-list-num"><span>数量：{{item.amount}}</span><span class="fr" v-if="item.order_type!='转出'&&item.order_type!='转入'&&item.order_type!='受让'&&item.order_type!='转让'">总额：{{item.total_amount}}</span>
            </p>
          </div>
          <img class="fr" src="../../../assets/images/right.svg" alt="">
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
          api.order({ 'page': this.pageNum }).then(res => {
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
      back(){
        this.$router.push({
          name:'Mine'
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
    background-color: #fff;
    height: auto;
    border-bottom: 10px solid #f6f6f6;

    img {
      position: relative;
      top: -64px;
      right: 0px;
    }

    .order-list-data {
      margin: 0 15px;

      .order-list-date {
        padding: 5px 0;
        border-bottom: 1px solid #ccc;

        span:last-child {
          color: #000;
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