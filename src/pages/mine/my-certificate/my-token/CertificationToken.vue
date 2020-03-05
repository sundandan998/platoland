<template>
  <div class="certification-token">
    <div class="token-header header">
      <mt-header fixed title="认证通证">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certification-token-body">
      <p>通过 {{this.$route.params.token.code}}合约管理地址向下方地址转入一笔</p>
    </div>
    <!-- code名称 -->
    <div class="certification-token-code">
      <img :src="this.$route.params.token.icon" alt="" class="fl">
      <span class="fr">
        <span>{{this.$route.params.token.code}} ({{this.$route.params.token.nickname}})</span>
        <p>{{this.$route.params.token.subject}}</p>
      </span>
    </div>
    <!-- 生成二维码 -->
    <div class="to-change-into-qrcode">
      <div id='code'></div>
      <canvas id="canvas"></canvas>
    </div>
    <!-- 地址 -->
    <div class="certification-token-address">
      <!-- <p>{{this.$route.params.address}}</p> -->
      <span class="overflow-text">{{this.$route.params.address}}</span>
      <img src="../../../../assets/images/u4780.png" alt="" class="tag-read" @click="copy"
        :data-clipboard-text="this.$route.params.ddress" />
    </div>
    <div class="certification-token-btn">
      <mt-button size="large" type="primary" @click.native="turn">已转入</mt-button>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  import qrcode from 'qrcode'
  import Clipboard from 'clipboard'
  // import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    created() {
      // console.log(this.$route.params)
     },
    mounted() {
      this.useqrcode()
    },
    methods: {
      // 已转入按钮
      turn() {
        api.confirmApply({ order_id: this.$route.params.order_id }).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'UnderReview',
              params: { token: res.data.token, time: res.data.create_time }
            })
          }
        }).catch(err => {
          toast(err)
        })
      },
      //复制
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$toast({
            message: '复制成功',
            duration: 1800
          })
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      // 生成二维码
      useqrcode() {
        var canvas = document.getElementById('canvas')
        qrcode.toCanvas(canvas, this.$route.params.address, function (error) {
          if (error) console.error(error)
          // console.log('success!')
          // qrcode.makeCode("http://www.google.com")
        })

      },
    },
    // computed: {
    //   ...mapGetters([
    //     'detail'
    //   ])
    // }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .certification-token {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;

    .certification-token-body {
      p {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 20px 0;
        text-align: center;
        font-size: 28px;
        color: #036EB8;
      }
    }

    .certification-token-code {
      margin: 40px auto;
      width: 50%;
      color: #999;
      height: auto;

      img {
        display: inline-block;
        width: 72px;
        height: 72px;
      }

    }

    .to-change-into-qrcode {
      text-align: center;
    }

    #canvas {
      width: 500px !important;
      height: 500px !important;
    }

    .certification-token-address {
      text-align: center;
      color: #456DF1;
    }

    .certification-token-btn {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }
  }
</style>