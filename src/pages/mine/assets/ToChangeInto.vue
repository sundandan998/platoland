<template>
  <div class="to-change-into">
    <div class="to-change-into-header">
      <mt-header fixed :title="$t('m.passdetails')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="to-change-into-exhibition">
      <div class="to-change-into-exhibition-img">
        <img class="fl" slot="icon" :src="this.detail.token.icon">
        <ul>
          <li>{{this.detail.token.code}}({{this.detail.token.nickname}})</li>
          <li>{{this.detail.token.subject}}</li>
        </ul>
        <div class="to-change-into-exhibition-adress">
          <span class="overflow-text fl">{{this.detail.address}}</span>
          <img src="../../../assets/images/u4780.png" alt="" class="fr tag-read" @click="copy" :data-clipboard-text="this.detail.address"
          />
        </div>
      </div>
    </div>
    <!-- 二维码部分 -->
    <div class="to-change-into-qrcode">
      <div>
        <div id='code'></div>
        <canvas id="canvas"></canvas>
      </div>
      <p>{{$t('m.intotext')}}</p>
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
    methods: {
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
        qrcode.toCanvas(canvas, this.detail.address, function (error) {
          if (error) console.error(error)
          // console.log('success!')
          // qrcode.makeCode("http://www.google.com")
        })

      }
    },
    mounted() {
      this.useqrcode()
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>