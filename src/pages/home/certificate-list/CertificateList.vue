<template>
  <div class="certificate-list">
    <div class="certificate-list-header">
      <mt-header fixed :title="$t('m.assetslist')">
        <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card" v-for="(item, index) in assetsData">
      <!-- @click="issue(item.id)" -->
      <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
        <img class="assets-icon" slot="icon" :src="item.icon">
        <router-link :to="{name:'Add',params:{name:item.name,subject:item.subject,icon:item.icon,code:item.code}}">
          <div v-if="show">
            <mt-switch class="asset-list-switch" :value="value"></mt-switch>
          </div>
        </router-link>
        <div v-if="hide" @click.prevent="addAsset(item.code,item.is_collection)">
          <mt-switch  class="asset-list-switch" v-model="item.is_collection"></mt-switch>
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
        show: false,
        hide: true,
        popupVisible: true,
        data: [],
        is_collection:true,
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
      this.listassets()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        var refpath = window.sessionStorage.setItem('refpath', JSON.stringify(from.path))
      })
    },
    methods: {
      // 列表信息
      list() {
        // debugger
        api.tokenList(this.$route.params).then(res => {
          this.assetsData = res.data
          this.$store.commit('detail', res.data.is_collection)
        }).catch(err => {
          console.log(err)
        })
      },
      listassets() {
        var url = JSON.parse(window.sessionStorage.getItem('refpath'))
        if (url == "/assets") {
          this.show = false
          this.hide = true
        } else {
          if (url == "/book") {
            this.value = false
            this.show = true
            this.hide = false
          }
        }
      },
      // 添加/删除资产
      addAsset(code,is_collection) {
        // debugger
        if (is_collection == true) {
          this.addCode.code = code
          api.delAsset(this.addCode).then(res => {
            if (res.code == 0) {
              toast(res)
              this.is_collection = false
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
                this.is_collection = true
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