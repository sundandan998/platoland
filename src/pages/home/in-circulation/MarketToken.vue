<template>
  <div class="certificate-list">
    <div class="certificate-list-header">
      <mt-header fixed :title="$t('m.tokenDaQuan')">
        <!-- v-on:click="$router.go(-1) -->
        <!-- @click="back" -->
        <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- 通证列表 -->
    <div class="token-list" v-for="(item,index) in assetsData" :key="index" v-if="item.subject!=null">
      <router-link :to="{name:'Deal',params:{code:item.code}}">
        <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
          <img class="assets-icon" slot="icon" :src="item.icon">
        </mt-cell>
        <!-- class="radio" -->
        <van-radio-group v-model="radio" class="radio" :key="index">
          <!-- :name="" -->
          <van-radio :name="item.is_collection" />
        </van-radio-group>
      </router-link>
    </div>
  </div>
  <!-- <mt-radio align="right" v-model="value" :options="item.code">
    </mt-radio> -->
  </div>
</template>
<script>
  import store from './../../../store/modules/app.js'
  // 列表接口
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        assetsData: '',
        radio: true,
        index: "0",
      }
    },
    created() {
      this.list()
    },
    methods: {
      // 列表信息
      list() {
        // this.$route.params
        api.tokenList({ category: 'all' }).then(res => {
          this.assetsData = res.data
          if (this.$route.params.code == 'LIFE+') {
            this.assetsData[2].is_collection = false
          }else if(this.$route.params.code == 'PLD'){
            this.assetsData[0].is_collection = false
          }
          // this.assetsData[2].is_collection = false
          // console.log(this.assetsData.subject)
          // for(let i=0;i<this.assetsData.length;i++){
          //   this.selectRadio=this.assetsData[i].code
          //   console.log(this.selectRadio)
          // }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }

</script>
<style lang="scss">
  @import "../../../assets/scss/global";

  .certificate-list {
    .certificate-list-header {
      margin-top: 90px;
    }

    .radio {
      position: relative;
      top: -70px;
      right: 20px;
      text-align: right;
    }

    .token-list {
      height: 110px;
    }
  }
</style>