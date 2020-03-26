<template>
  <div class="economy">
    <div class="economy-header header">
      <mt-header fixed  :title="$t('m.tokenEconomy')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="economy-text">
      <div>
        <p class="title"> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.tokenEconomyTitle')}}？</p>
        <span>{{$t('m.tokenEconomyOne')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.tokenEconomyTitleOne')}}</p>
        <span>{{$t('m.tokenEconomyTwo')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.tokenEconomyTitleTwo')}}</p>
        <span>{{$t('m.tokenEconomyThree')}}<br>
          &nbsp;&nbsp;{{$t('m.tokenEconomyThree1')}}<br>
          &nbsp;&nbsp;{{$t('m.tokenEconomyThree2')}}<br>
          &nbsp;&nbsp;{{$t('m.tokenEconomyThree3')}}
        </span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.tokenEconomyTitleThree')}}</p>
        <span>{{$t('m.tokenEconomyFour')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.tokenEconomyTitleFour')}}</p>
        <span>{{$t('m.tokenEconomyFive')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.tokenEconomyTitleFive')}}</p>
        <span>{{$t('m.tokenEconomySix')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.tokenEconomyTitleSix')}}</p>
        <span>{{$t('m.tokenEconomySeven')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.tokenEconomyTitleEight')}}</p>
        <span>{{$t('m.tokenEconomyNine')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.tokenEconomyTitleTen')}}</p>
        <span class="footer">{{$t('m.tokenEconomyEnd')}}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/scss/global';

  .economy {
    background-color: #fff;

    .economy-text {
      margin: 0 24px;
      padding-bottom: 20px;

      p {
        font-size: 26px;
        font-weight: 700;
        margin: 20px 0;
      }
      .title{
        margin-top: 50px;
        display: inline-block;
      }
      .footer{
        margin-bottom: 55px;
      }
      span {
        font-size: 22px;
        display: block;
        width: 80%;
        margin:0 auto;
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