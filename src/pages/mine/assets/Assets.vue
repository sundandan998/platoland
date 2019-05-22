<template>
  <div class="assest">
    <div class="assest-header">
      <mt-header fixed :title="$t('m.assets')">
        <router-link to="/mine" slot="left">
          <mt-button icon="back">{{$t('m.back')}}</mt-button>
        </router-link>
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
      <router-link :to="/assetsdetailed/+item.id">
        <mt-cell :title="item.token.code + (item.token.name)" :value="item.balance" :label="item.token.subject">
          <img class="assets-icon" slot="icon" :src="'http://'+item.token.icon">
        </mt-cell>
      </router-link>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
// 资产列表
import api from "@/api/user/User.js"
export default {
  created(){
    this.assetList()
  },
  data() {
   return {
   		assetsdata:[]
   }
  },
  mounted(){
  	// this.assetList()
//	this.$store.dispatch('detail')
  },
  watch:{
  },
  methods: {
    // 资产列表
    assetList(){
      api.assetList().then(res=>{
        this.assetsdata = res.data
        // console.log(this.assetsdata)
        // this.$store.commit('detail', res.data[0])
      }).catch(err=>{
        console.log(err)
      })
    },
    // 资产详情

  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/global"
</style>
