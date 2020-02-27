<template>
  <div class="to-change-into">
    <div class="to-change-into-header header">
      <mt-header fixed title="转入">
        <!-- <router-link to="path"> -->
          <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <!-- </router-link> -->
      </mt-header>
    </div>
    <div class="to-change-into-exhibition">
      <img slot="icon" class="fl" :src="this.detail.token.icon">
      <div class="to-change-into-token">
        <span>{{this.detail.token.code}}({{this.detail.token.nickname}})</span>
        <p>{{this.detail.token.subject}}</p>
      </div>
    </div>
    <!-- 二维码部分 -->
    <div class="to-change-into-qrcode">
      <div id='code'></div>
      <canvas id="canvas"></canvas>
    </div>
    <div class="to-change-into-exhibition-adress">
      <span class="overflow-text">{{this.detail.address}}</span>
      <img src="../../../assets/images/u4780.png" alt="" class=" tag-read" @click="copy"
        :data-clipboard-text="this.detail.address" />
    </div>
    <div class="description">
      <p>仅支持{{this.detail.token.code}}({{this.detail.token.nickname}}) 收款，请勿用于其他通证收款</p>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard'
  import qrcode from 'qrcode'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        codes: ''
      }
    },
    components: {
      qrcode: qrcode
    },
    mounted() {
      this.useqrcode()
    },
    methods: {
      //复制
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$toast({
            // message: '复制成功',
            message: '복사성공',
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
        qrcode.toCanvas(canvas, this.detail.address, function (error) {
          if (error) console.error(error)
          // console.log('success!')
          // qrcode.makeCode("http://www.google.com")
        })

      },
    },

    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global';

  .to-change-into {
   #canvas{
    width: 300px !important;
    height: 300px !important;
    }
    .to-change-into-exhibition {
      margin: 10px auto;
      background-color: #fff;
      height: 110px;

      img {
        margin: 20px 20px 0 20px;
      }

      .to-change-into-token {
        padding-top: 20px;
      }
    }

    .to-change-into-qrcode {
      background-color: #fff;
      text-align: center;
    }

    .to-change-into-exhibition-adress {
      height: 80px;
      margin-top: 1px;
      background-color: #fff;
      text-align: center;
      line-height: 80px;

      img {
        margin: 20px 0 0 10px;
      }
    }

    .description {
      margin-top: 50px;
      text-align: center;
    }
  }
</style>