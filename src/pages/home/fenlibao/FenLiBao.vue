<template>
  <div class="bao">
    <div class="release-header">
      <mt-header fixed title="分利宝">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <router-link to="/transferflb">
    <div class="home-pub-token">
      <img src="../../../assets/images/life-icon.png" alt="" class="fl icon">
      <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
      <div class="home-pub-token-days">
        <div class="home-pub-token-days-top">
          <p>锁仓期限 30 天</span>
            <p class="fr percentage">2%</p>
        </div>
        <div>
          <p>最高转入100份</p>
          <p class="fr">年化收益</p>
        </div>
      </div>
    </div>
  </router-link>
  </div>
</template>
<script></script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .bao {
    margin-top: 90px;
    .home-pub-token {
      margin:20px 24px 0px 24px;
      height: 220px;
      border-radius:10px;
      background-color: #fff;
      .home-pub-token-days{
        margin:20px 24px 0 50px;
        .home-pub-token-days-top{
          margin-bottom: 20px;
        }
        p{
          display: inline-block;
          color:#999999;
        }
        .percentage{
            color:#036EB8;
            font-size:40px;
          }
      }
      .icon{
        margin-top: 25px;
      }
      span{
        margin-top: 25px;
      }
    }
  }
</style>