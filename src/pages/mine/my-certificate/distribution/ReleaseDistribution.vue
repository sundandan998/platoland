<template>
  <div class="release">
    <div class="release-header header">
      <mt-header fixed title="创建分利计划">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="release-token">
      <div class="home-pub-token">
        <img :src="this.$route.params.icon" alt="" class="fl icon">
        <span><b>{{this.$route.params.code}}</b>( {{this.$route.params.nickname}} ) <p>{{this.$route.params.subject}}
          </p></span>
      </div>
    </div>
    <div class="release-item">
      <p>分利总额</p>
      <mt-field placeholder="请输入整数" v-model="releaseParams.total_amount"></mt-field>
      <p>锁仓期限</p>
      <mt-field placeholder="请选择锁仓期限 >" @click.native="actionSheet" v-model="releaseParams.freeze_days">
        <mt-actionsheet :actions="data" v-model="sheetVisible">{{}}</mt-actionsheet>
      </mt-field>
      <p>年化利率</p>
      <mt-field placeholder="0~100 %" v-model="releaseParams.air"></mt-field>
      <p>转入限额</p>
      <mt-field placeholder="最少转入量" class="input-box" v-model="releaseParams.min_amount"></mt-field>
      <mt-field placeholder="最多转入量" class="input-box" v-model="releaseParams.high_amount"></mt-field>
      <div class="release-interest">
        <span>支付利息</span>
        <span>可用数量</span>
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large"@click.native="release">确定发布</van-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        data: [{
          name: '7天',
        }, {
          name: '15天',
        }, {
          name: '30天',
        }, {
          name: '60天',
        }, {
          name: '90天',
        }, {
          name: '180天',
        }, {
          name: '360天',
        }],
        sheetVisible: false,
        releaseParams: {
          code: this.$route.params.code,
          total_amount: '',
          min_amount: '',
          high_amount: '',
          freeze_days: '',
          air: '',
          pay_pwd: ''
        },
        value: '',
        popupVisible: false,
        showKeyboard: false,
      }
    },
    created() {
    },
    methods: {
      actionSheet() {
        this.sheetVisible = true
      },
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      release() {
        this.popupVisible = true
        // api.releaseFl(this.releaseParams).then(res => {
        // }).catch()
      }
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.releaseParams.pay_pwd = this.value
          api.releaseFl(this.releaseParams).then(res => {
            if (res.code === 0) {
              toast(res)
              this.$router.push({
                name: 'Certificate',
              })
            }
          }).catch(err => {
            if (err.code !== 0) {
              toast(err)
            }
          })
          this.value = ''
          this.popupVisible = false
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .release {
    .release-token {
      border-radius: 10px;
      background-color: #fff;
      margin: 90px 24px 10px 24px;
    }

    .release-item {
      margin: 0px 24px;
      padding-top: 20px;
      background-color: #fff;
      border-radius: 10px;

      p {
        margin: 0 50px;
        font-size: 26px;
      }

      .mint-field-core {
        text-align: right;
        border-bottom: 1px solid #ccc;
        width: 85%;
        flex: unset;
        margin: 0 auto;
      }

      .input-box {
        width: 40%;
        display: inline-block;
        margin-left: 55px;

        .mint-field-core {
          text-align: left;
        }
      }

      .release-interest {
        text-align: right;
        padding-bottom: 10px;

        span {
          display: block;
          color: #036EB8;
          margin-right: 30px;
        }
      }
    }

  }
</style>