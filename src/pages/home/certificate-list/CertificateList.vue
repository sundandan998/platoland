<template>
  <div class="certificate-list">
    <div class="certificate-list-header">
      <mt-header fixed :title="$t('m.assetslist')">
        <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card" v-for="(item, index) in assetsData">
      <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
        <img class="assets-icon" slot="icon" :src="item.icon">
        <router-link :to="{name:'Add',params:{name:item.name,subject:item.subject,icon:item.icon,code:item.code}}">
          <div v-if="refpath=='/book'">
            <mt-switch class="asset-list-switch" :value="value"></mt-switch>
          </div>
        </router-link>
        <div v-if="refpath=='/assets'" @click.prevent="addAsset(item.code,item.is_collection,index)">
          <mt-switch class="asset-list-switch" v-model="item.is_collection"></mt-switch>
        </div>
      </mt-cell>
    </div>
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
        popupVisible: true,
        data: [],
        value: false,
        assetsData: [],
        // 添加资产参数
        addCode: {
          code: ''
        }
      }
    },
    created() {
      this.list()
    },
    computed: {
      refpath() {
        return window.sessionStorage.getItem('refpath')
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        window.sessionStorage.setItem('refpath', from.path)
      })
    },
    methods: {
      // 列表信息
      list() {
        // this.$route.params
        api.tokenList({ category: 'all' }).then(res => {
          this.assetsData = res.data
          this.$store.commit('detail', res.data.is_collection)
        }).catch(err => {
          console.log(err)
        })
      },
      // 添加/删除资产
      addAsset(code, is_collection, index) {
        if (is_collection == true) {
          this.addCode.code = code
          api.delAsset(this.addCode).then(res => {
            if (res.code == 0) {
              toast(res)
              // 改变switch实时状态
              this.assetsData[index].is_collection = false
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
        } else {
          if (is_collection == false) {
            this.addCode.code = code
            api.addAsset(this.addCode).then(res => {
              if (res.code == 0) {
                toast(res)
                // 改变switch实时状态
                this.assetsData[index].is_collection = true
              }
            }).catch(err => {
              if (err.code != 0) {
                toast(err)
              }
            })
          }
        }
      }
    },
  }
</script>
<style lang="scss">
  @import "../../../assets/scss/global"
</style>