<template>
  <div class="turn-out">
    <div class="turn-out-header header">
      <mt-header fixed :title="$t('m.transferOut')">
        <!-- v-on:click="$router.go(-1)" -->
        <!-- @click="back" -->
        <mt-button icon="back" slot="left" @click="back">{{$t('m.back')}}</mt-button>
        <!-- <mt-button icon="" slot="right">
          <router-link to="/scan">
            <img src="../../../assets/images/scan.svg" alt="" />
          </router-link>
        </mt-button> -->
      </mt-header>
    </div>
    <div class="turn-out-exhibition">
      <div class="turn-out-exhibition-img">
        <img :src="this.detail.token.icon" alt="" class="fl">
        <span>{{this.detail.token.code}}({{this.detail.token.nickname}})</span>
        <p>{{this.detail.token.subject}}</p>
        <!-- <span>{{this.$route.params.token.code}}({{this.$route.params.token.nickname}})</span>
        <span>{{this.$route.params.token.subject}}</span> -->
      </div>
    </div>
    <div class="payment-input">
      <p>{{$t('m.payTo')}}</p>
      <mt-field type="text" v-model="this.$route.params.name"  readonly="readonly">
        <router-link :to="{name:'Book',params:{name:this.detail.token.name,icon:this.detail.token.icon,token_code:this.detail.token.code,id:'out',nickname:this.detail.token.nickname,subject:this.detail.token.subject,}}">
          <img src="../../../assets/images/book.png" alt="" />
          <router-link to="/scan">
            <img src="../../../assets/images/scan.svg" alt="" />
          </router-link>
        </router-link>
      </mt-field>
      <mt-field type="text"  :placeholder="$t('m.selectAddress')" v-model="this.$route.params.address"
        class="address"></mt-field>
    </div>
    <div class="turn-out-input">
      <p>{{$t('m.transferOutNum')}}</p>
      <mt-field :placeholder="$t('m.lowOutNum') + parseInt(this.detail.token.min_out)" v-model="turnOut.amount" type="number">
      </mt-field>
      <p>{{$t('m.available')}}：{{this.detail.available_amount|number}} {{this.detail.code}}</p>
      <!-- {{turnOut.amount*0.002}} -->
      <p>{{$t('m.handlingFee')}}：{{this.detail.token.fee|number}}({{this.detail.token.code}})</p>
    </div>
    <div class="turn-out-exhibition-text">
      <p>{{$t('m.note')}}</p>
      <p>{{$t('m.becarefulone')}}</p>
      <p>{{$t('m.becarefultwo')}}</p>
      <p>{{$t('m.becarefulthree')}}</p>
      <p>{{$t('m.becarefulfour')}}</p>
    </div>
    <div class="turn-out-exhibition-btn">
      <p class="expenditure"><span class="fl">{{$t('m.actualExpenditure')}}</span><span
          class="fr cost">{{Number(turnOut.amount)+Number(this.detail.token.fee)}}
          ({{this.detail.token.code}})</span></p>
      <router-link :to="{name:'OutConfirm',params:{detail: this.detail,item:this.$route.params.item,amount:turnOut.amount,name:this.$route.params.name}}">
        <mt-button type="primary" size="large" :disabled="disabled">{{$t('m.sure')}}</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import api from "@/api/user/User.js"
  import { Toast } from 'mint-ui'
  import { toast } from '@/assets/js/pub.js'
  import { MessageBox } from 'mint-ui'
  export default {
    data() {
      return {
        value: '',
        show: '',
        disabled: true,
        showKeyboard: false,
        popupVisible: false,
        // 转出参数
        turnOut: {
          token: '',
          address: '',
          amount: '',
          pay_pwd: ''
        },
      }
    },
    created() {
      this.addAddress = this.$route.params
      // console.log()
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    },
    methods: {
      back() {
        this.$router.push({
          name: 'AssetsDetailed',
          params: { code: this.detail.token.code, id: this.detail.id }
        })
      },
    },
    watch: {
      turnOut: {
        immediate: true,
        deep: true,
        handler(val) {
          let outAddress = document.getElementById('outAddress')
          if (val.amount != '' && val.amount != 0) {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }
      },

    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global';

  .turn-out {
    .mint-field-clear {
      display: none;
    }

    .turn-out-exhibition {
      margin: 0 24px 10px 24px;
      border-radius: 10px;
      height: 120px;
      background-color: #fff;

      img {
        margin: 40px 10px 0 10px;
      }

      span {
        margin-top: 20px;
        display: inline-block;
      }
    }

    .payment-input {
      margin: 10px 24px 20px 24px;
      background-color: #fff;
      /* height: 160px; */
      border-radius: 10px;

      p {
        margin: 10px 0 0 24px;
        display: inline-block;
        font-size: 28px;
      }

      .mint-cell:last-child {
        border-radius: 10px;
      }

      .address {
        .mint-cell-wrapper {
          position: relative;
          top: -15px;
        }
      }
    }

    .turn-out-input {
      background-color: #fff;
      margin: 20px 24px 0 24px;
      padding-bottom: 40px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      p {
        margin: 10px 0 0 24px;
        font-size: 28px;
        padding-top: 10px;
      }
    }

    .turn-out-exhibition-btn {
      width: 100%;
      position: fixed;
      bottom: 10px;

      .expenditure {
        display: flow-root;
        background-color: #fff;
        height: 50px;

        .cost {
          margin-right: 20px;
        }

      }
    }

    .turn-out-exhibition-text {
      margin: 0 24px;
      color: #666;
      background-color: #fff;
      padding: 10px 20px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
</style>