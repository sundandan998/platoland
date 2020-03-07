<template>
  <div class="issued-token">
    <div class="issued-token-header">
      <mt-header fixed title="发行通证">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="issued-token-code">
      <img :src="this.detail.token.icon" alt="" class="fl">
      <span>{{this.detail.token.code}} ({{this.detail.token.nickname}})
        <p>{{this.detail.token.subject}}</p>
      </span>
    </div>
    <div class="issued-token-text">
      <div class="issued-token-price">
        <!--  -->
        <router-link :to="{name:'PayToken',params:{assets:this.$route.params.assets}}">
          <!-- <img :src="this.$route.params.icon" alt=""> -->
          <!-- <mt-field placeholder="支付通证">{{this.$route.params.assets}} <span>></span>
          </mt-field> -->
          <mt-cell title="支付通证" is-link>
            <span v-model="issuedParams.exchange_code">{{this.$route.params.assets}}</span>
          </mt-cell>
        </router-link>
        <!--  -->
        <mt-field v-if="this.issuedDate.last_issue_price!=null" label="单价" @blur.native.capture="price" :placeholder="'请输入的单价大于'+this.issuedDate.last_issue_price"
          v-model="issuedParams.price"><span>{{this.$route.params.assets}}</span>
        </mt-field>
        <mt-field v-if="this.issuedDate.last_issue_price==null" label="单价" @blur.native.capture="price" placeholder="请输入的单价大于0"
          v-model="issuedParams.price"><span>{{this.$route.params.assets}}</span>
        </mt-field>
      </div>
      <div class="issued-token-num distance">
        <!--  -->
        <mt-field @blur.native.capture="integer" label="发行份数" placeholder="请输入大于100的整数"
          v-model="issuedParams.total_part"><span>份</span></mt-field>
        <!-- -->
        <mt-field @blur.native.capture="num" label="发行份数" placeholder="请输入整数" v-model="issuedParams.step_number">
        </mt-field>
        <div class="fr">
          <p>发行总量{{issuedParams.total_part*issuedParams.step_number}}</p>
          <p>可用余额 {{this.detail.available_amount|number}}</p>
        </div>
      </div>
      <div class="issued-token-time distance">
        <!-- v-model="releaseParams.freeze_days" -->
        <!--  -->
        <mt-field label="冻结时长" placeholder="请选择锁仓期限" readonly @click.native="showPicker = true"
          v-model="issuedParams.freeze_days">
          <span>天</span>
        </mt-field>
        <van-popup v-model="showPicker" position="bottom">
          <!-- @confirm="onConfirm"  -->
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
      </div>
      <div class="issued-token-date">
        <!--  -->
        <!--  -->
        <mt-field v-if="this.issuedDate.last_end_date==null" class="date" label="选择发行开始日期"  type="date"
          v-model="issuedParams.start_date">
        </mt-field>
        <mt-field v-if="this.issuedDate.last_end_date!=null"class="date" :label="'选择发行开始日期在'+this.issuedDate.last_end_date+'之后'" type="date"
        v-model="issuedParams.start_date">
      </mt-field>
        <mt-field class="date" v-if="issuedParams.start_date!=''" :label="'选择发行结束日期在'+issuedParams.start_date+'之后'"
          type="date" v-model="issuedParams.end_date"></mt-field>
        <mt-field class="date" v-if="issuedParams.start_date==''" :label="'选择发行结束日期在开始日期之后'" type="date"
          v-model="issuedParams.end_date"></mt-field>
        <!--  -->
        <mt-field label="锁定股权" placeholder="大于0" v-model="issuedParams.equity"><span>%</span></mt-field>
        <!--  -->
        <mt-field @blur.native.capture="num" label="起购份数" placeholder="请输入整数" v-model="issuedParams.min_buy_part">
          <span>份</span></mt-field>
        <!--  -->
        <mt-field @blur.native.capture="available" label="最多可购份数" placeholder="请输入整数"
          v-model="issuedParams.max_buy_part"><span>份</span></mt-field>
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large" :disabled="disabled" @click.native="release">确定发布</van-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span
          class="paymentamount">{{issuedParams.total_part*issuedParams.step_number}}({{this.detail.token.code}})</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { mapActions, mapGetters } from 'vuex'
  import { toast } from '@/assets/js/pub.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        showPicker: false,
        disabled: false,
        balanceToken: '',
        balanceData: '',
        popupVisible: false,
        showKeyboard: false,
        value: '',
        issuedDate: '',
        columns: ['7', '15', '30', '60', '90', '120', '180', '365'],
        happeDetail: '',
        issuedParams: {
          code: '',
          exchange_code: '',
          price: '',
          total_part: '',
          step_number: '',
          freeze_days: '',
          start_date: '',
          end_date: '',
          equity: '',
          min_buy_part: '',
          max_buy_part: '',
          pay_pwd: ''
        },

      }
    },
    created() {
      this.balance()
      this.date()
    },
    methods: {
      onConfirm(value) {
        this.issuedParams.freeze_days = value
        this.showPicker = false
      },
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      release() {
        if (this.balanceData.balance > 0) {
          this.popupVisible = true
        } else {
          this.$messagebox({
            title: '提示',
            message: '可用额不足？',
            cancelButtonText: '我知道了',
            confirmButtonText: '去转入',
            showCancelButton: true
          }).then(action => {
            if (action === 'confirm') {
              this.$router.push({
                name: 'Into'
              })
            }
          })
        }
      },
      // 获取上一期发行时间
      date() {
        api.tokenSimple({ code: this.detail.token.code }).then(res => {
          this.issuedDate = res.data
        }).catch(err => {

        })
      },
      // 余额
      balance() {
        api.balance({ token_code: this.$route.params.code }).then(res => {
          if (res.code == 0) {
            this.balanceData = res.data
            this.balanceToken = res.data.token
          }
        }).catch(err => {
        })
      },
      // 校验
      // 单价校验
      price() {
        if (this.issuedParams.price < this.issuedDate.last_issue_price) {
          Toast({
            message: '请输入的单价大于' + this.issuedDate.last_issue_price,
            className: 'zZindex'
          })
        }
      },
      // 整数校验
      integer() {
        if ((this.issuedParams.total_part < 100) || !(/(^[1-9]\d*$)/.test(this.issuedParams.total_part))) {
          Toast({
            message: '请输入大于100的整数',
            className: 'zZindex'
          })
          return false
        }
      },
      num() {
        if (!(/(^[1-9]\d*$)/.test(this.issuedParams.step_number))) {
          Toast({
            message: '请输入整数',
            className: 'zZindex'
          })
          return false
        }
      },
      available() {
        if ((this.issuedParams.max_buy_part > this.issuedParams.step_number) || !(/(^[1-9]\d*$)/.test(this.issuedParams.total_part))) {
          Toast({
            message: '请输入整数并且大' + this.issuedParams.step_number,
            className: 'zZindex'
          })
          return false
        }
      }
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.issuedParams.pay_pwd = this.value
          this.issuedParams.code = this.detail.token.code
          this.issuedParams.exchange_code = this.$route.params.assets
          api.releaseToken(this.issuedParams).then(res => {
            if (res.code == 0) {
              toast(res)
              this.$router.push({
                name: 'Issuance',
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
      },
      issuedParams: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.price && val.total_part && val.step_number && val.freeze_days && val.start_date && val.end_date && val.equity && val.min_buy_part && val.max_buy_part != '') {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .issued-token {
    .mint-cell-title {
      margin-left: 0;
      color: #999;
    }

    .issued-token-code {
      background-color: #fff;
      margin: 100px 24px 20px 24px;
      height: 120px;

      img {
        margin: 30px 20px;
      }

      span {
        margin-top: 30px;
        display: inline-block;
      }
    }

    .issued-token-num {
      p {
        font-size: 26px;
        color: #036EB8;
        margin: 10px 20px;
      }

    }

    .issued-token-text {
      margin: 0 24px;

      .distance {
        margin: 20px 0;
      }

      .issued-token-time {
        margin-top: 110px;
      }

      span {
        font-size: 28px;
      }
    }

    .issued-token-date {
      margin-bottom: 150px;

      .date {
        .mint-cell-title {
          width: 70%;
        }
      }
    }
  }
</style>