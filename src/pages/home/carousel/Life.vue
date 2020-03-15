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
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">{{$t('m.lifeEight')}} </p>
        <span> {{$t('m.lifeNine')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.lifeTen')}}</p>
        <span>{{$t('m.lifetitleOne')}}</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> {{$t('m.lifetitleTwo')}}</p>
        <span class="footer">
            {{$t('m.lifeFooterOne')}}<br>
            {{$t('m.lifeFooterTwo')}}<br>
            {{$t('m.lifeFooterThree')}}<br>
           {{$t('m.lifeFooterFour')}} <br>
          &nbsp;&nbsp;1）{{$t('m.lifeFooterFive')}} <br>
          &nbsp;&nbsp;2）{{$t('m.lifeFooterSix')}}<br>
          &nbsp;&nbsp;3）{{$t('m.lifeFooterSeven')}} 
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/scss/global';

  .life {
    background-color: #fff;

    .life-text {
      margin: 0 24px;
      padding-bottom: 20px;

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