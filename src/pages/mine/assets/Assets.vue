<template>
  <div class="assest">
    <div class="assest-header">
      <mt-header fixed :title="$t('m.assets')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
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
        <mt-cell :title="item.token.code + '('+item.token.name+')'" :value="item.balance|keepTwoNum"
          :label="item.token.subject">
          <img class="assets-icon" slot="icon" :src="item.token.icon">
        </mt-cell>
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
      margin: 90px 0 10px 0;
      height: 60px;
      text-align: center;
      background-color: #fff;
    }
   
  }
</style>