<template>
  <div class="assets-detailed">
    <div class="assets-detailed-header header">
      <mt-header fixed :title="$t('m.assetdetails')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button icon="" slot="right">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img slot="icon" src="../../../assets/images/gd.png">
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/scan">
                <el-dropdown-item>{{$t('m.scan')}}</el-dropdown-item>
              </router-link>
              <router-link :to="{name:'Out',params:{min_limit:this.assetsToken.min_limit}}">
                <el-dropdown-item>
                  <span>{{$t('m.changeout')}}</span>
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item>
                <span>明细</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="remove">{{$t('m.remove')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </mt-button>
      </mt-header>
    </div>
    <div class="assets-detailed-exhibition">
      <div class="assets-detailed-exhibition-img">
        <p class="fr balance ">{{this.assetsData.balance|number}}</p>
        <img :src="this.assetsToken.icon" alt="" class="fl" />
        <div class="assets-detailed-token">
          <span>{{this.assetsToken.code}}</span> <span>({{this.assetsToken.nickname}})</span>
          <p>{{this.assetsToken.subject}}</p>
        </div>
      </div>
    </div>
    <!-- 可用 -->
    <div class="assets-detailed-available">
      <router-link :to="{name:'AvailableTransfer',params:{code:this.assetsToken.code,id:this.assetsData.id}}">
        <mt-cell :title="$t('m.availablenum')" :value="this.assetsData.available_amount" is-link>
          <img slot="icon" src="../../../assets/images/u4662.png">
        </mt-cell>
      </router-link>
    </div>
    <!-- 冻结 -->
    <div class="assets-detailed-freeze">
      <router-link :to="{name:'FreezeDetail',params:{code:this.assetsToken.code,id:this.assetsData.id}}">
      <mt-cell :title="$t('m.frozen')" :value="this.assetsData.freeze_amount">
        <img slot="icon" src="../../../assets/images/u4666.png">
      </mt-cell>
      </router-link>
    </div>
    <div class="transfer-btn">
      <router-link to="/into">
        <mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        data: {},
        assetsData: {},
        assetsToken: {},
        // 删除资产参数
        delasset: {
          code: '',
        },
      }
    },
    created() {
      this.assetDetail()
    },
    methods: {
      // 资产详情
      assetDetail() {
        // debugger
        api.assetDetail(this.$route.params).then(res => {
          this.assetsData = res.data
          // console.log( )
          this.assetsToken = res.data.token
          this.$store.commit('detail', res.data)
          // this.details.code = this.assetsToken.code
        }).catch(err => {
          console.log(err)
        })
      },
      //点击移除弹出的消息框
      remove() {
        this.$messagebox({
          title: '提示',
          message: '你确定要移除资产吗？',
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          showCancelButton: true
        }).then(action => {
          if (action === 'confirm') {
            // 删除资产接口
            this.delasset.code = this.$route.params.code
            api.delAsset(this.delasset).then(res => {
              if (res.code == 0) {
                toast(res)
              }
            }).catch(err => {
              if (err.code != 0) {
                toast(err)
              }
            })
          }
        })
      },
      // tab栏切换
      // indexTab(index, title) {
      //   if (index == 0) {
      //     this.details.transaction_type = 0
      //     this.list()
      //   } else {
      //     this.details.transaction_type = 1
      //     this.list()
      //   }
      // },
    },
    // computed: {
    //   ...mapGetters([
    //     'detail'
    //   ])
    // }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .assets-detailed {
    .mint-cell {
      border-radius: 10px;
      background-image: none;
    }

    .assets-detailed-exhibition {
      overflow: hidden;
      margin: 90px 24px 20px 24px;
      border-radius: 10px;
      height: 120px;
      background-color: #fff;

      img {
        margin: 0px 10px;
      }

      .balance {
        margin: 20px 20px 0 0;
      }

      .assets-detailed-token {
        margin-top: 30px;
      }
    }

    .assets-detailed-available {
      margin: 0 24px 20px 24px;


    }

    .assets-detailed-freeze {
      margin: 0 24px 20px 24px;
    }

    .transfer-btn {
      position: fixed;
      width: 100%;
      bottom: 10px;
    }
  }
</style>