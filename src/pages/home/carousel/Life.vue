<template>
  <div class="life">
    <div class="life-header header">
      <mt-header fixed :title="$t('m.lifeTile')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="life-text">
      <div>
        <p class="title"> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.lifeTile')}}</p>
        <span>{{$t('m.lifeOne')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.lifeTwo')}}</p>
        <span>{{$t('m.lifeThree')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.lifeFour')}}</p>
        <span>{{$t('m.lifeFive')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.lifeSix')}}</p>
        <span>  {{$t('m.lifeSeven')}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/scss/global';

  .life {
    background-color: #fff;
    width: 100%;
    height: 100%;
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