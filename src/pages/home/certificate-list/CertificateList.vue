<template>
  <div class="certificate-list">
    <div class="certificate-list-header">
      <mt-header fixed title="通证大全">
        <!-- v-on:click="$router.go(-1) -->
        <!-- @click="back" -->
        <mt-button slot="left" icon="back"@click="back">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card" v-for="(item, index) in assetsData">
      <!-- <router-link :to="{name:'Detail', params: {code:item.code}}"> -->
      <router-link :to="/detail/+item.code">
        <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
          <img class="assets-icon" slot="icon" :src="item.icon">
          <img src="../../../assets/images/r.png" alt="" v-if="refpath=='/'">
          <router-link :to="{name:'Add',params:{name:item.name,nickname:item.nickname,subject:item.subject,icon:item.icon,code:item.code}}">
            <div v-if="refpath=='/book'">
              <mt-switch class="asset-list-switch" :value="value"></mt-switch>
            </div>
          </router-link>
          <div v-if="refpath=='/assets'" @click.prevent="addAsset(item.code,item.is_collection,index)">
            <mt-switch class="asset-list-switch" v-model="item.is_collection"></mt-switch>
          </div>
          <router-link :to="{name:'Deal',params:{code:item.code}}">
            <div v-if="refpath=='/deal'">
              <mt-switch class="asset-list-switch" v-model="item.is_collection"></mt-switch>
            </div>
            <!-- <van-radio-group v-model="radio">
                <van-radio :name="this.selectRadio"></van-radio>
              </van-radio-group> -->
          </router-link>
        </mt-cell>
      </router-link>
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
        radio: '',
        selectRadio:'',
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
          // for(let i=0;i<this.assetsData.length;i++){
          //   this.selectRadio=this.assetsData[i].code
          //   console.log(this.selectRadio)
          // }
        }).catch(err => {
          console.log(err)
        })
      },
      back() {
        this.$router.push({
          name: 'Home',
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
  @import "../../../assets/scss/global";

  .certificate-list {
    .certificate-list-header {
      margin-bottom: 90px;
    }
  }
</style>