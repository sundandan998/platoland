<template>
  <div class="add-address">
    <div class="add-address-header">
      <mt-header fixed :title="$t('m.addaddress')">
          <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="addaddress-icon">
        <img src="../../../assets/images/ld.png" alt="">
        <span>LD(捞豆)</span>
        <p>北京河底捞餐饮股份有限公司</p>
    </div>
    <div class="add-adress-list formData">
      <span>{{$t('m.remarks')}}:</span>
      <mt-field></mt-field>
      <span>{{$t('m.describe')}}:</span>
      <mt-field></mt-field>
      <span>{{$t('m.address')}}:</span>
      <mt-field></mt-field>
       <img class="fr" src="../../../assets/images/scan.png" alt="">
    </div>
    <div class="add-adress-btn">
      <!-- <router-link to="/book"> -->
        <mt-button type="primary" size="large" @click="addadress">{{$t('m.add')}}</mt-button>
      <!-- </router-link> -->
    </div>
    <div class="edit-adress-text">
      <p>{{$t('m.becareful')}}</p>
      <p>{{$t('m.addone')}}：</p>
      <p>{{$t('m.addtwo')}}</p>
      <p>{{$t('m.addthree')}}</p>
    </div>
  </div>
</template>

<script>
import store from './../../../store/modules/app.js'
import {mapGetters} from 'vuex'
//接口
import api from "@/api/user/User.js"
export default {
  data() {
    return {
      // 添加地址
      addAddress:{
        name:'张三',
        token_code:'LD',
        address:'13SncaFeFFGQDYHSmWafwkTXCBWqaeix7c'
      }
    }
  },
  created() {
  },
  methods: {
    // 添加地址
    addadress(){
    	api.addAdress(this.addAddress).then(res=>{
        // console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  computed:{
		...mapGetters([
	      'detail'
	    ])
	},

}
</script>

<style lang="scss">
  @import "../../../assets/scss/global"
</style>
