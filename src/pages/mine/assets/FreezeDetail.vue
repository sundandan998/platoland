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
        <!-- <router-link :to="{name:'OrderDetail',params:{order_id:item.order_id}}"> -->
        <router-link :to="/orderdetail/+item.order_id">
          <!-- 发行买入 -->
          <div class="buy" v-if="item.flow_type=='发行买入'">
            <p>{{item.flow_type}}</p>
            <p><span>{{item.amount}}</span><span class="fr">还剩{{}}天解冻</span> </p>
            <p>
              <mt-progress :value="20" :bar-height="5"></mt-progress>
            </p>
            <p>还剩{{}}天解冻</p>
          </div>
          <!-- OTC发布出售 -->
          <div class="buy" v-if="item.flow_type=='OTC发布出售'">
            <p>{{item.flow_type}}</p>
            <p><span>{{item.amount}}</span><span class="fr">
                <mt-button size="small" type="primary" @click.native="cancel">撤销</mt-button>
              </span> </p>
            <p>
              <mt-progress :value="20" :bar-height="5"></mt-progress>
            </p>
            <p>{{item.flow_type}}{{item.trade_amount}}</p>
          </div>
          <!-- OTC发布买入 -->
          <!-- <div class="buy" v-if="item.flow_type=='OTC发布买入'">
            <p>{{item.flow_type}}</p>
            <p><span>{{item.amount}}</span><span class="fr">
                <mt-button size="small" type="primary" @click.native="cancel">撤销</mt-button>
              </span> </p>
            <p>
              <mt-progress :value="20" :bar-height="5"></mt-progress>
            </p>
            <p>{{item.flow_type}}{{item.trade_amount}}</p>
          </div> -->
          <!-- 转出 -->
          <div class="buy" v-if="item.flow_type=='转出'">
            <p>{{item.flow_type}}</p>
            <p><span>{{item.amount}}</span><span class="fr"><img style="position: relative;top: 2px;"
                  src="../../../assets/images/go.svg" alt="">
                <span>{{item.status == 5 ?'审核中':item.status == 0?'进行中':'发起申请'}}</span>
              </span>
            </p>
            <p>
              <el-steps :space="300" :active="item.status == 5 ?1:item.status == 0?2:0" finish-status="finish"
                align-center>
                <el-step title="发起申请"></el-step>
                <el-step title="审核中"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="审核结果"></el-step>
              </el-steps>
            </p>
          </div>
          <!-- 待支付 -->
          <div class="buy" v-if="item.flow_type!='转出'">
            <p>{{item.flow_type}}</p>
            <p><span>{{item.amount}}</span>
              <span class="fr"><img style="position: relative;top: 2px;" src="../../../assets/images/go.svg" alt="">
                {{item.status==3?'待支付':item.status==0?'进行中':''}}</span></p>
            <p>待支付订单在30分钟后自动取消</p>
          </div>
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
    methods: {
      // 冻结详情
      freeze() {
        this.freezeParams.code = this.$route.params.code
        api.freeze(this.freezeParams).then(res => {
          if (res.code == 0) {
            this.freezeData = res.data
          }
        }).catch(err => {

        })
      },
      // 撤销
      cancel() {
        this.$messagebox({
          title: '温馨提示',
          message: `确定撤销这笔已发布的广告？`,
          confirmButtonText: '撤销发布',
          cancelButtonText: '我再想想',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            api.cancel({ order_id: this.orderData.order_id }).then(res => {
              if (res.code == 0) {
                this.$router.push({
                  name: 'FreezeDetail'
                })
              }
            }).catch(err => {
            })
          }
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