<template>
  <div class="assest">
    <div class="assest-header">
      <mt-header fixed :title="$t('m.assets')">
        <!-- v-on:click="$router.go(-1)" -->
        <mt-button icon="back" slot="left" @click="back">{{$t('m.back')}}</mt-button>
        <mt-button icon slot="right">
          <router-link to="/detailedlist">
            <img src="../../../assets/images/u2666.png" alt><span>{{$t('m.assetsdetail')}}</span>
          </router-link>
        </mt-button>
      </mt-header>
    </div>
    <div class="assets-list">
      <router-link to="/list">
        <img src="../../../assets/images/u3511.png" alt><span>{{$t('m.addseets')}}</span>
      </router-link>
    </div>
    <div class="certificate-list-card" v-for="(item,index) in assetsdata">
      <router-link :to="{name:'AssetsDetailed',params:{id:item.id,code:item.token.code}}">
        <!-- <mt-cell :title="item.token.code + '('+item.token.nickname+')'" :value="item.balance|keepTwoNum"
          :label="item.token.subject" class="certificate-list-card-cell">
          <img class="assets-icon" slot="icon" :src="item.token.icon">
        </mt-cell> -->
        <img class="fl" :src="item.token.icon">
        <span>{{item.token.code}} {{item.token.nickname}}
          <p>{{item.token.subject}}</p> </span>
        <span class="fr balance">{{item.balance|keepTwoNum}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  // 接口
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        assetsdata: [],
      }
    },
    created() {
      this.assetList()
    },
    methods: {
      back() {
        this.$router.push({
          name: 'Mine'
        })
      },
      // 资产列表
      assetList() {
        api.assetList().then(res => {
          this.assetsdata = res.data
        }).catch(err => {
          console.log(err)
        })
      },
    },
    // 保留两位小数
    filters: {
      keepTwoNum(value) {
        value = Number(value)
        return value.toFixed(2)
      }
    },
  }
</script>

<style lang="scss">
  @import "../../../assets/scss/global";

  .assest {
    .assets-list {
      margin: 90px 24px 10px 24px;
      height: 60px;
      border-radius: 10px;
      text-align: center;
      background-color: #fff;

      span {
        height: 60px;
        display: inline-block;
        line-height: 60px;
      }

      img {
        vertical-align: middle;
      }
    }

    .certificate-list-card {
      margin: 10px 24px;
      background-color: #fff;
      border-radius: 10px;
      height: auto;
      padding:20px 24px;
      font-size: 24px;
      img{
        margin-right: 10px;
      }
      .balance{
        position: relative;
        top:-40px;
        font-size: 28px;
        color:#333;
      }
    }

  }
</style>