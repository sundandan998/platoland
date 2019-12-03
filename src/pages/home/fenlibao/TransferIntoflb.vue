<template>
  <div class="transfer">
    <div class="transfer-header">
      <mt-header fixed title="转入分利宝">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="transfer-token">
      <img src="../../../assets/images/ld.png" alt="" class="fl">
      <div class="transfer-token-text">
        <span>LIFE+ (来福家)</span>
        <p>斯帕尔克细胞</p>
      </div>
      <img src="../../../assets/images/right.png" alt="" class="fr arrow">
    </div>
    <div class="transfer-token-days">
      <div class="transfer-token-days-top">
        <div class="transfer-token-days-top-left fl">
          <span class="fl"> 10 <p>年化利率(%)</p></span><span class="fr">30 <p>锁仓期限(天)</p></span>
        </div>
        <div class="transfer-token-days-top-right fr">
          <span class="fr">250 <p>万利总量(万)</p></span>
        </div>
      </div>
      <div class="token-progress">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
      </div>
      <b>可转入数量2000</b>
    </div>
    <!-- 转入数量 -->
    <div class="transfer-num">
      <p>转入数量</p>
      <div class="progress">
        <van-stepper step="2" />
      </div>
      <div class="progress">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">0%</div>
        <div slot="end" class="fr">100%</div>
      </div>
      <div class=" transfer-num-date">
        <span>到期分利</span>
        <span>到期日期</span>
      </div>
    </div>
     <div class="release-button">
      <van-button type="warning" size="large">确定转入</van-button>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .transfer {
    .mt-progress-runway {
      border-radius: 7px;
    }

    .mt-progress-progress {
      border-radius: 7px;
    }

    .transfer-header {
      margin-bottom: 81px;
    }

    .transfer-token {
      margin: 20px 24px 0 24px;
      background-color: #fff;
      padding: 10px 0;
      border-radius: 10px;

      img {
        margin: 10px 20px 0 20px;
      }

      span {
        color: #999;
        margin-bottom: 10px;
        display: inline-block;
      }

      .transfer-token-text {
        display: inline-block;
      }

      .arrow {
        margin-top: 20px;
      }
    }

    .transfer-token-days {
      background-color: #fff;
      margin: 20px 24px;
      border-radius: 10px;

      .transfer-token-days-top {
        overflow: hidden;
      }

      b {
        font-weight: 400;
        text-align: right;
        display: block;
        margin-right: 20px;
        padding-bottom: 10px;
      }

      .transfer-token-days-top-left {
        width: 60%;

        span {
          margin: 20px 0 20px 30px;
          font-size: 44px;

          p {
            font-size: 24px;
          }
        }
      }

      .transfer-token-days-top-right {
        span {
          margin: 20px 20px 20px 0px;
          font-size: 44px;

          p {
            font-size: 24px;
          }
        }
      }

      .token-progress {
        margin: 0 20px;


      }
    }

    .transfer-num {
      margin: 0 24px;
      height: 300px;
      background-color: #fff;
      border-radius: 10px;

      p {
        padding: 10px 20px;
        font-size: 26px;
      }

      .transfer-num-date {
        height: 50px;
        text-align: right;
        margin: 40px 20px 0 0;
        span {
          display:block;
        }
      }
    }
  }
</style>