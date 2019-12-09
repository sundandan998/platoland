<template>
  <div class="bao">
    <div class="release-header">
      <mt-header fixed title="分利宝">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- <router-link to="/transferflb"> -->
    <div class="home-pub-token" v-for="item in listData">
      <router-link :to="{name:'Transferflb',params:{item:item}}">
        <img :src="item.token.icon" alt="" class="fl icon">
        <span><b>{{item.token.code}}</b>{{item.token.nickname}} <p>{{item.token.subject}}</p></span>
        <div class="home-pub-token-days">
          <div class="home-pub-token-days-top">
            <p>锁仓期限 {{item.freeze_days}}天</span>
              <p class="fr percentage">{{item.air}}%</p>
          </div>
          <div>
            <p>最高转入{{item.high_amount}}份</p>
            <p class="fr">分利率</p>
          </div>
        </div>
      </router-link>

    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  export default {
    data() {
      return {
        listData: ''
      }
    },
    created() {
      this.list()
    },
    methods: {
      list() {
        api.flList().then(res => {
          if (res.code == 0) {
            this.listData = res.data
          }
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';
  .bao {
    margin-top: 90px;
    .home-pub-token {
      margin: 20px 24px 0px 24px;
      height: 220px;
      border-radius: 10px;
      background-color: #fff;

      .home-pub-token-days {
        margin: 20px 24px 0 50px;

        .home-pub-token-days-top {
          margin-bottom: 20px;
        }

        p {
          display: inline-block;
          color: #999999;
        }

        .percentage {
          color: #036EB8;
          font-size: 40px;
        }
      }

      .icon {
        margin-top: 25px;
      }
      span {
        margin-top: 25px;
      }
    }
  }
</style>