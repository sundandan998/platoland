<template>
  <div class="under-review">
    <div class="token-header header">
      <mt-header fixed :title="$t('m.myToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="under-review-body">
      <img src="../../../../assets/images/review.svg" alt="">
      <p>{{}}</p>
      <p class="time">平台将在1-2个工作日内完成认证审核</p>
      <p class="tel">有疑问？联系我们:kefu@paltoland.com</p>
    </div>
    <mt-cell title="申请时间" >2019-2523</mt-cell>
    <mt-cell title="认证通证" >2019-2523</mt-cell>

  </div>
</template>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .under-review {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;

    .mint-header.is-fixed {
      border-bottom: 1px solid #f2f2f2;
    }

    .under-review-body {
      margin-top: 160px;

      img {
        height: 100px;
        margin: 40px auto;
        display: block;
      }

      p {
        text-align: center;
        margin: 40px 0;
      }

      .time {
        color: #ccc;
        font-size: 28px;
      }

      .tel {
        color: #036EB8;
        font-size: 28px;
      }
    }
  }
</style>