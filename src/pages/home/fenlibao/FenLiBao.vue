<template>
  <div class="bao">
    <div class="release-header">
      <mt-header fixed :title="$t('m.fenlibao')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- <router-link to="/transferflb"> -->
    <div class="home-pub-token" v-for="item in listData">
      <router-link :to="{name:'Transferflb',params:{item:item,id:item.id}}">
        <img :src="item.token.icon" alt="" class="fl icon">
        <span><b>{{item.token.code}}</b>{{item.token.nickname}} <p>{{item.token.subject}}</p></span>
        <div class="home-pub-token-days">
          <div class="home-pub-token-days-top">
            <p>{{$t('m.theTerm')}} {{item.freeze_days}}{{$t('m.day')}}</span>
              <p class="fr percentage">{{item.air|number}}%</p>
          </div>
          <div>
            <p>{{$t('m.highestTransfer')}} {{item.high_amount}}{{$t('m.share')}}</p>
            <p class="fr">{{$t('m.interestRate')}}</p>
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