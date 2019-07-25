<template>
  <div class="freeze">
    <div class="freeze-header">
      <mt-header fixed title="冻结详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="freeze-information">
      <div class="freeze-down-menu">
        <span class="el-dropdown-link">
          交易类型<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <span class="el-dropdown-link fr">
          冻结时间<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </div>
      <div class="freeze-content" v-for="item in freezeData">
          <router-link :to="{name:'OrderDetail',params:{order_id:item.order_id}}">
            <p>{{item.flow_type}}</p>
            <p class="freeze-amount"><span>{{item.amount}}</span>
              <!-- 发行买入 -->
              <span class="fr" v-if="item.flow_type!='转出'&& item.flow_type=='发行买入'">还剩{{}}天解冻</span>
              <!-- 转出 -->
              <span class="fr" v-if="item.flow_type=='转出'"><img src="../../../assets/images/go.svg" alt="">
                <span>{{item.status}}</span>
              </span>
              <!-- 售出 -->
              <span class="fr" v-if="item.flow_type!='转出'&& item.flow_type!='发行买入'">
                <mt-button size="small" type="primary">撤销</mt-button>
              </span>
            </p>
            <p>
              <mt-progress :value="20" :bar-height="5" v-if="item.flow_type!='转出'&& item.flow_type=='发行买入'">
              </mt-progress>
              <!-- 转出 -->
              <el-steps :space="300" :active="item.status" finish-status="finish" align-center
                v-if="item.flow_type!='发行买入'">
                <el-step title="发起申请"></el-step>
                <el-step title="审核中"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="审核结果"></el-step>
              </el-steps>
            </p>
            <!-- 发行买入 -->
            <p v-if="item.flow_type!='转出'&& item.flow_type=='发行买入'">还剩{{}}天</p>
            <p v-if="item.flow_type!='转出'">{{item.flow_type}}{{item.trade_amount}}</p>
          </router-link>
      </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        freezeData: {},
        // 冻结参数
        freezeParams: {
          page: 1,
          page_size: 10,
          code: '',
          ordering: ''
        }
      }
    },
    created() {
      this.freeze()
    },
    // mounted () {
    //   this.freeze()      
    // },
    methods: {
      freeze() {
        this.freezeParams.code = this.$route.params.code
        api.freeze(this.freezeParams).then(res => {
          if (res.code == 0) {
            this.freezeData = res.data
          }
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .freeze-header {
    margin-bottom: 20px;
  }

  .freeze-down-menu {
    padding: 10px 15px;
  }

  .freeze-information {

    height: auto;
    background-color: #fff;

    p {
      margin: 5px 15px;
    }

    .freeze-content {
      border-bottom: 10px solid #f6f6f6;
      border-top: 1px solid #f6f6f6;

      .freeze-amount {
        margin-bottom: 15px;

        .mint-button--small {
          height: 25px;
        }
      }
    }
  }

  .el-step__title {
    font-size: 0.78rem;
    line-height: 38px;
  }
</style>