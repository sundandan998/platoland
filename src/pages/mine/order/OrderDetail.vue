<template>
  <div class="order-detail">
    <div class="order-detail-header">
      <mt-header fixed title="订单详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- 发行买入 -->
    <div class="buy" v-if="hide">
      <div class="buy-title">
        <span>发行买入</span><span class="fr"> <img src="../../../assets/images/fineshed.svg" alt="">已完成</span>
      </div>
      <div class="buy-content">
        <p>10,000.09080706</p>
        <p><span>支付总额</span><span class="fr">50.00035385 USDT</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{}}</span></p>
        <p><span>单价</span><span class="fr">{{}}</span></p>
        <p><span>数量</span><span class="fr">{{}}</span></p>
        <p><span>交易方</span><span class="fr">{{}}</span></p>
        <p><span>地址</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>锁仓期限</span><span class="fr">{{}}</span></p>
        <p><span>到期时间</span><span class="fr">{{}}</span></p>
        <p><span>交易时间</span><span class="fr">{{}}</span></p>
      </div>
    </div>
    <!-- otc发布--出售 -->
    <div class="buy" v-if="hide">
      <div class="buy-title">
        <span>{{}}</span><span class="fr"> <img src="../../../assets/images/go.svg" alt="">进行中</span>
      </div>
      <div class="buy-content">
        <p>10,000.09080706</p>
        <p><span>支付总额</span><span class="fr">50.00035385 USDT</span></p>
        <p><span>手续费</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{}}</span></p>
        <p><span>单价</span><span class="fr">{{}}</span></p>
        <p><span>数量</span><span class="fr">{{}}</span></p>
        <p><span>限额</span><span class="fr">{{}}</span></p>
        <p><span>发布时间</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>待出售</span><span class="fr">{{}}</span></p>
        <p><span>已出售</span><span class="fr">{{}}</span></p>
      </div>
    </div>
    <mt-button v-if="hide" class="sell-btn" size="large" type="primary">撤销</mt-button>
    <!-- otc买入 -->
    <div class="buy" v-if="hide">
      <div class="buy-title">
        <span>OTC买入</span><span class="fr"> <img src="../../../assets/images/fineshed.svg" alt="">已完成</span>
      </div>
      <div class="buy-content">
        <p>10,000.09080706</p>
        <p><span>支付总额</span><span class="fr">50.00035385 USDT</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{}}</span></p>
        <p><span>单价</span><span class="fr">{{}}</span></p>
        <p><span>数量</span><span class="fr">{{}}</span></p>
        <p><span>交易时间</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{}}</span></p>
        <p><span>地址</span><span class="fr">{{}}</span></p>
      </div>
    </div>
    <!-- 转出 -->
    <div class="buy" v-if="hide">
      <div class="buy-title">
        <span>{{}}</span><span class="fr"> <img src="../../../assets/images/go.svg" alt="">审核中</span>
      </div>
      <div class="buy-content">
        <p>10,000.09080706</p>
        <p><span>手续费</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{}}</span></p>
        <p><span>交易时间</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{}}</span></p>
        <p><span>地址</span><span class="fr">{{}}</span></p>
      </div>
    </div>
    <!-- 转入 -->
    <div class="buy"  v-if="hide">
      <div class="buy-title">
        <span>{{}}</span><span class="fr"> <img src="../../../assets/images/fineshed.svg" alt="">已完成</span>
      </div>
      <div class="buy-content">
        <p>10,000.09080706</p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{}}</span></p>
        <p><span>交易时间</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>交易方</span><span class="fr">{{}}</span></p>
        <p><span>地址</span><span class="fr">{{}}</span></p>
      </div>
    </div>
    <!-- otc发布--买入 -->
    <div class="buy" v-if="hide">
      <div class="buy-title">
        <span>{{}}</span><span class="fr"> <img src="../../../assets/images/go.svg" alt="">进行中</span>
      </div>
      <div class="buy-content">
        <p>10,000.09080706</p>
        <p><span>支付总额</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-numbering">
        <p><span>订单编号</span><span class="fr">{{}}</span></p>
        <p><span>单价</span><span class="fr">{{}}</span></p>
        <p><span>数量</span><span class="fr">{{}}</span></p>
        <p><span>限额</span><span class="fr">{{}}</span></p>
        <p><span>发布时间</span><span class="fr">{{}}</span></p>
      </div>
      <div class="buy-date">
        <p><span>待买入</span><span class="fr">{{}}</span></p>
        <p><span>已买入</span><span class="fr">{{}}</span></p>
      </div>
    </div>
    <mt-button v-if="hide" class="sell-btn" size="large" type="primary">撤销</mt-button>
    <!-- otc出售 -->
    <div class="buy">
        <div class="buy-title">
          <span>{{}}</span><span class="fr"> <img src="../../../assets/images/fineshed.svg" alt="">已完成</span>
        </div>
        <div class="buy-content">
          <p>10,000.09080706</p>
          <p><span>支付总额</span><span class="fr">{{}}</span></p>
          <p><span>手续费</span><span class="fr">{{}}</span></p>
        </div>
        <div class="buy-numbering">
          <p><span>订单编号</span><span class="fr">{{}}</span></p>
          <p><span>单价</span><span class="fr">{{}}</span></p>
          <p><span>数量</span><span class="fr">{{}}</span></p>
          <p><span>交易时间</span><span class="fr">{{}}</span></p>
        </div>
        <div class="buy-date">
          <p><span>交易方</span><span class="fr">{{}}</span></p>
          <p><span>地址</span><span class="fr">{{}}</span></p>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hide: false
      }
    },
    created(){
      console.log(this.$route.params.order_id)
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
  }

  /* ----------发布出售------------- */
  .sell-btn {
    width: 95%;
    margin: 20px auto 0 auto;

  }
</style>