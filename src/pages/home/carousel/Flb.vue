<template>
  <div class="life">
    <div class="life-header header">
      <mt-header fixed title="什么是分利宝?">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="life-text">
      <div>
        <p class="title"> <img src="../../../assets/images/point.svg" alt=""> 什么是分利宝?</p>
        <span>分利宝由PLATOLAND开发，是企业进行通证推广的一款营销工具。企业拿出一部分利润，对愿意锁定一定时间的通证持有人进行奖励</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">分利宝的收益怎么计算</p>
        <span>分利宝实时显示用户的收益，收益等于购买数量*持有时长*约定收益利率。约定期限到后，用户可获取这些收益到自己账户。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">我可以购买多份分利宝吗？</p>
        <span>分利宝是企业的营销行为，对于购买者通常会设置一些规则。企业通常对购买最大量有约束，比如购买到多少了，就不允许购买。
          用户可以持有不同企业的分利宝产品，这个没有限制。
        </span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">购买分利宝对我的通证有什么影响</p>
        <span>购买分利宝后，会冻结相应的通证数量。比如你账户里A通证的可用数量是10万，购买A通证的分利宝5万1年，分利率8%。首先你A通证的可用数量会减少为5万，冻结数量会增加5万，1年以后你收取收益后，可用数量会变为1004000。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">分利宝还没到期限，想用通证怎么办</p>
        <span>冻结的通证是无法使用的，只有到期后，通证才能正常使用。</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/scss/global';

  .life {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;
    .life-text {
      padding: 0 24px;
      padding-bottom: 20px;
      border-top: 7px solid #f2f2f2;
      p {
        font-size: 26px;
        font-weight: 700;
        margin: 10px 0 20px 0;
      }

      .title {
        margin-top: 50px;
        display: inline-block;
      }

      .footer {
        margin-bottom: 50px;
      }

      span {
        font-size: 22px;
        width: 80%;
        margin: 0 auto;
        display: block;
        line-height: 40px;
      }

      img {
        width: 50px;
        position: relative;
        top: 12px;
      }
    }
  }
</style>