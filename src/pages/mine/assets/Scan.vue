<template>
  <div class="scan">
    <div class="scan-header">
      <mt-header fixed :title="$t('m.scan')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <!-- <mt-button icon slot="right">
          <router-link to="/">
            <span>相册</span>
          </router-link>
        </mt-button> -->
      </mt-header>
    </div>
    <div class="scan">
      <div id="bcid">
        <div>
          <img src="../../../assets/images/close.svg" alt="">
        </div>
        <!-- <p class="tip">...载入中...</p> -->
      </div>
      <footer>
        <p @click="startRecognize"></p>
        <p @click="startScan"></p>
        <p @click="cancelScan"></p>
        <p @click="closeScan"></p>
      </footer>
    </div>
    <div class="scan-button">
      <router-link to="/scandetail">
        <!--<mt-button type="primary" size="large">转出</mt-button>-->
      </router-link>
    </div>
  </div>
</template>
<script>
  let scan = null
  export default {
    data() {
      return {
        codeUrl: '',
      }
    },
    // 进入页面就开始扫描
    mounted() {
      this.startRecognize()
      this.startScan()
      // this.isShow = true
    },
    methods: {
      //创建扫描控件
      startRecognize() {
        let that = this
        if (!window.plus) return
        scan = new plus.barcode.Barcode('bcid')
        scan.onmarked = (type, result, file) => {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR'
              break
            case plus.barcode.EAN13:
              type = 'EAN13'
              break
            case plus.barcode.EAN8:
              type = 'EAN8'
              break
            default:
              type = '其它' + type
              break
          }
          console.log('1')
          result = result.replace(/\n/g, '')
          //that.codeUrl = result
          // alert(result)
          this.$router.push({
            name: 'Out',
            params: { address: result }
          })
          that.closeScan()
          // location.href = result
        }
      },
      //开始扫描
      startScan() {
        console.log('开始扫描')
        if (!window.plus) return
        scan.start()
        // console.log('扫描结束')
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return
        scan.cancel()
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return
        scan.close()
      }
    },
    // beforeDestroy(){}
  }
</script>
<style lang="scss">
  /* @import '../../../assets/scss/global' */
  .scan {
    height: 100%;
  }

  .scan #bcid {
    width: 100%;
    height: 100% !important;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 3rem;
    text-align: center;
    color: #333;
  }
</style>