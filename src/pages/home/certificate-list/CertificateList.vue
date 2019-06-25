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
          <!-- v-model="item.isactive=='0'" -->
          <mt-switch class="asset-list-switch" :value="value"></mt-switch>
        </router-link>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import store from './../../../store/modules/app.js'
  // 列表接口
  import api from "@/api/token/Token.js"
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
      this.listassets()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        var refpath = window.sessionStorage.setItem('refpath', JSON.stringify(from.path))
      })
    },
    methods: {
      //列表信息
      listassets() {
        var url = JSON.parse(window.sessionStorage.getItem('refpath'))
        if (url == "/assets") {
          this.value = true
          // 添加资产
          api.tokenList(this.$route.params).then(res => {
              this.assetsData = res.data
            }).catch(err => {
              console.log(err)
            })
          // api.addAdress(this.addCode).then(res => {
          //   console.log(res)
          // }).catch(err => {
          //   console.log(err)
          // })
        } else {
          if (url == "/book") {
            this.value = false
            api.tokenList(this.$route.params).then(res => {
              this.assetsData = res.data
            }).catch(err => {
              console.log(err)
            })
          }
        }

      },
    },
  }
</script>


<style lang="scss">
  @import "../../../assets/scss/global"
</style>