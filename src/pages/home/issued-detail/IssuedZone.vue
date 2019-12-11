<template>
  <div class="issued-zone">
    <div class="issued-zone-header header">
      <mt-header fixed title="发行专区">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="zone-list" v-for="item in list">
        <router-link :to="{name:'Issued',params:{id:item.id}}">
        <div class="zone-list-top">
          <img :src="item.token.icon" alt="" class="fl icon">
          <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
          <img src="../../../assets/images/publicity.png" alt="" class="fr publicity" v-if="item.status==0">
          <img src="../../../assets/images/issued.png" alt="" class="fr publicity" v-if="item.status==1">
        </div>
        <div class="zone-list-bot">
          <div class="zone-list-bot-text fl">
            <span>第 {{item.periods}} 期</span>
            <span class="fr"> <img src="../../../assets/images/lock.svg" alt=""> {{item.freeze_days}} 天</span>
          </div>
          <span class="fr"> <img :src="item.d_icon" alt=""> {{item.issue_price|number}}</span>
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
        list: '',
      }
    },
    created() {
      this.zoneList()
    },
    methods: {
      zoneList() {
        api.issuedList().then(res => {
          if (res.code == 0) {
            this.list = res.data
          }
        }).catch()
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .issued-zone {
    .issued-zone-header {
      margin-bottom: 100px;
    }

    .zone-list {
      background-color: #fff;
      margin: 0 24px 20px 24px;
      border-radius: 10px;
      height: 180px;

      .zone-list-top {
        height: 120px;
        b{
          color:#333;
        }
        .icon {
          margin: 0 20px;
          padding: 25px 0;
        }

        span {
          margin-top: 25px;
          display: inline-block;
        }

        .publicity {
          height: 100px;
          border-top-right-radius: 10px;
        }
      }

      .zone-list-bot {
        margin: 0 24px;
        span{
          color:#036EB8;
        }
        img {
          height: 30px;
        }

        .zone-list-bot-text {
          width: 60%;

        }
      }
    }
  }
</style>