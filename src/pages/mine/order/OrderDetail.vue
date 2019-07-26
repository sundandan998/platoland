<template>
  <div class="order-detail">
    <div class="order-detail-header">
      <mt-header fixed title="订单详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- 发行买入 -->
    <div class="buy" v-if="orderData.flow_type=='发行买入'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/fineshed.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}} {{orderData.token}}</p>
        <p><span>支付总额</span><span class="fr">{{orderData.total_amount}} {{orderData.exchange_token}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>单价</span><span class="fr">{{orderData.price}} {{orderData.exchange_token}}</span></p>
        <p><span>数量</span><span class="fr">{{orderData.amount}} {{orderData.token}}</span></p>
        <p><span>交易方</span><span class="fr">{{orderData.order}}</span></p>
        <p><span>地址</span><span class="fr">{{orderData.other_address}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>锁仓期限</span><span class="fr">{{orderData.freeze_days}}</span></p>
        <p><span>到期时间</span><span class="fr">{{orderData.unfreeze_date}}</span></p>
        <p><span>交易时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
    </div>
    <!-- otc发布--出售 -->
    <div class="buy" v-if="orderData.flow_type=='OTC发布出售'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/go.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}} {{orderData.token}}</p>
        <p><span>支付总额</span><span class="fr">{{orderData.total_amount}} {{orderData.exchange_token}}</span></p>
        <p><span>手续费</span><span class="fr">{{orderData.fee}}{{orderData.exchange_token}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>单价</span><span class="fr">{{orderData.price}}{{orderData.exchange_token}}</span></p>
        <p><span>数量</span><span class="fr">{{orderData.amount}}{{orderData.token}}</span></p>
        <p><span>限额</span><span class="fr">{{orderData.low_number}}-{{orderData.high_number}}{{orderData.token}}</span>
        </p>
        <p><span>发布时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>待出售</span><span class="fr">{{orderData.remaining_amount}}</span></p>
        <p><span>已出售</span><span class="fr">{{orderData.trade_amount}}</span></p>
        <p v-for="item in orderList" class="order-recording">
          <router-link :to="{name:'OrderDetailList',params:{order_id:item.order_id}}">
            <span>{{item.transaction_time}}</span><span class="fr">{{item.amount}}</span>
          </router-link>
        </p>
      </div>
    </div>
    <mt-button @click="cancel" v-if="orderData.flow_type=='OTC发布出售'" class="sell-btn" size="large" type="primary">撤销
    </mt-button>
    <!-- otc买入 -->
    <div class="buy" v-if="orderData.flow_type=='OTC买入'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/fineshed.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}}{{orderData.token}}</p>
        <p><span>支付总额</span><span class="fr">{{orderData.total_amount}} {{orderData.exchange_token}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>单价</span><span class="fr">{{orderData.price}}{{orderData.exchange_token}}</span></p>
        <p><span>数量</span><span class="fr">{{orderData.amount}}{{orderData.token}}</span></p>
        <p><span>交易时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{orderData.other}}</span></p>
        <p><span>地址</span><span class="fr">{{orderData.other_address}}</span></p>
      </div>
    </div>
    <!-- 转出 -->
    <div class="buy" v-if="orderData.flow_type=='转出'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/go.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}}{{orderData.token}}</p>
        <p><span>手续费</span><span class="fr">{{orderData.fee}}{{orderData.exchange_token}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>交易时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{orderData.other}}</span></p>
        <p><span>地址</span><span class="fr">{{orderData.other_address}}</span></p>
      </div>
    </div>
    <!-- 转入 -->
    <div class="buy" v-if="orderData.flow_type=='转入'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/fineshed.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}} {{orderData.token}}</p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>交易时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{orderData.other}}</span></p>
        <p><span>地址</span><span class="fr">{{orderData.other_address}}</span></p>
      </div>
    </div>
    <!-- otc发布--买入 -->
    <div class="buy" v-if="orderData.flow_type=='OTC发布买入'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/go.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}} {{orderData.token}}</p>
        <p><span>支付总额</span><span class="fr">{{orderData.total_amount}} {{orderData.exchange_token}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>单价</span><span class="fr">{{orderData.price}} {{orderData.exchange_token}}</span></p>
        <p><span>数量</span><span class="fr">{{orderData.amount}} {{orderData.token}}</span></p>
        <p><span>限额</span><span class="fr">{{orderData.low_number}}-{{orderData.high_number}} {{orderData.token}}</span>
        </p>
        <p><span>发布时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>待买入</span><span class="fr">{{orderData.remaining_amount}}</span></p>
        <p>
          <span>已买入</span><span class="fr">{{orderData.trade_amount}}</span>
        </p>
        <p v-for="item in orderList" class="order-recording">
          <router-link :to="{name:'OrderDetailList',params:{order_id:item.order_id}}">
            <span>{{item.transaction_time}}</span><span class="fr">{{item.amount}}</span>
          </router-link>
        </p>
      </div>
    </div>
    <mt-button v-if="orderData.flow_type=='OTC发布买入'" class="sell-btn" size="large" type="primary" @click="cancel">撤销
    </mt-button>
    <!-- OTC售出 -->
    <div class="buy" v-if="orderData.flow_type=='OTC售出'">
      <div class="buy-title">
        <span>{{orderData.flow_type}}</span><span class="fr"> <img src="../../../assets/images/fineshed.svg"
            alt="">{{orderData.status}}</span>
      </div>
      <div class="buy-content">
        <p>{{orderData.amount}} {{orderData.token}}</p>
        <p><span>支付总额</span><span class="fr">{{orderData.total_amount}}</span></p>
        <p><span>手续费</span><span class="fr">{{orderData.fee}} {{orderData.exchange_token}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{orderData.order_id}}</span></p>
        <p><span>单价</span><span class="fr">{{orderData.price}} {{orderData.exchange_token}}</span></p>
        <p><span>数量</span><span class="fr">{{orderData.amount}} {{orderData.token}}</span></p>
        <p><span>交易时间</span><span class="fr">{{orderData.transaction_time}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{orderData.other}}</span></p>
        <p><span>地址</span><span class="fr">{{orderData.other_address}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  import api from "@/api/user/User.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        orderData: {}
      }
    },
    created() {
      this.orderDetail()
    },
    methods: {
      orderDetail() {
        api.orderDetail({ order_id: this.$route.params.order_id }).then(res => {
          if (res.code == 0) {
            this.orderData = res.data
            this.orderList = res.data.otc_order
            console.log(orderList)
          }
        }).catch(err => {
        })
      },
      // 撤销
      cancel() {
        this.$messagebox({
          title: '温馨提示',
          message: `确定撤销这笔已发布的广告？`,
          confirmButtonText: '撤销发布',
          cancelButtonText: '我再想想',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            api.cancel({ order_id: this.orderData.order_id }).then(res => {
              if(res.code==0){
                this.$router.push({
                  name:'FreezeDetail'
                })
              }
            }).catch(err => {
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';
  .order-detail-header {
    margin-bottom: 18px;
  }

  /* --------------发行买入--------- */
  .buy {
    background-color: #fff;

    p {
      font-size: 0.78rem;
    }

  }

  .buy-title {
    margin: 15px 15px;
  }

  .buy-content {
    border-top: 1px solid #f6f6f6;
    border-bottom: 10px solid #f6f6f6;

    p:first-child {
      font-size: 1.2rem;
    }

    p {
      margin: 10px 15px;

      span:first-child {
        color: #979EAC;
      }
    }
  }

  .buy-numbering {
    p {
      margin: 10px 15px;

      span:first-child {
        color: #979EAC;
      }
    }
  }

  .buy-date {
    border-top: 10px solid #f6f6f6;
    padding-bottom: 5px;

    p {
      margin: 10px 15px;

      span:first-child {
        color: #979EAC;
      }
    }

    .order-recording {
      margin: 15px 25px;
    }
  }

  /* ----------发布出售------------- */
  .sell-btn {
    width: 95%;
    margin: 20px auto 0 auto;

  }
</style>