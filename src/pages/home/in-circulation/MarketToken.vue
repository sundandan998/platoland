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
        // debugger
        api.tokenList().then(res => {
          this.assetsData = res.data
          // 循环得到code和is_collectio,
          for (let i = 0; i < this.assetsData.length; i++) {
            this.selectRadio = this.assetsData[i].code
            this.is_collection = this.assetsData[i].is_collection
            // 判断如果从deal页面传来的code==本页面的code就改变本页的is_collection==true,
            // 其他is_collection为false
            if (this.$route.params.code == this.selectRadio) {
              this.assetsData[i].is_collection=true
            } else {
              this.assetsData[i].is_collection=false
            }
          }
        }).catch(err => {
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