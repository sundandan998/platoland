<template>
    <div class="scan">
      <div class="scan-header">
        <mt-header fixed :title="$t('m.scan')">
            <mt-button icon="back"slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
          <mt-button icon slot="right">
                <router-link to="/">
                  <span>相册</span>
                </router-link>
              </mt-button>
        </mt-header>
      </div>
      <div class="erwm">

          <div class="scan">
          
          <div id="bcid">
          
          <div style="height:40%"></div>
          
          <p class="tip">...载入中...</p>
          
          </div>
          <footer>
          <p @click="startRecognize"></p>
          <p @click="startScan">开始扫描</p>
          <p @click="cancelScan"></p>
          <p @click="closeScan"></p>
          </footer>
          
          </div>
          </div>
      <div class="scan-button">
        <router-link to="/scandetail">
          <!--<mt-button type="primary" size="large">转出</mt-button>-->
        </router-link>
      </div>
    </div>
  </template>
  <script>
    var scan = null;

var styles = {frameColor: "#2e5dea",scanbarColor: "#2e5dea",};//边框属性，中间线属性，背景色

var filter;//扫码格式 空为全类型

export default {

name: 'erwm',

components: {

 

},

data() {

return {

codeUrl: '',

isShow:true

}

},

created () {

//进入页面就调取扫一扫

this.startRecognize();

this.startScan();

console.log('扫一扫开始')

},

mounted(){

this.startRecognize();

this.startScan();

this.isShow = true;

},

updated(){

this.startRecognize();

this.startScan();

this.isShow = true;

alert('更新');

},

destroyed(){

console.log('aaa');

},

// ,

methods: {

//创建扫描控件

startRecognize() {

alert(123);

let that = this;

if (!window.plus) return;

scan = new plus.barcode.Barcode('bcid',filter,styles);

 

console.log(scan)

scan.onmarked = onmarked;

 

function onmarked(type, result, file) {

switch (type) {

case plus.barcode.QR:

type = 'QR';

break;

case plus.barcode.EAN13:

type = 'EAN13';

break;

case plus.barcode.EAN8:

type = 'EAN8';

break;

default:

type = '其它' + type;

break;

}

result = result.replace(/\n/g, '');

that.codeUrl = result;

alert(result);

}

that.startScan();

},

//开始扫描

startScan() {

if (!window.plus) return;

scan.start();
console.log('开始扫描')

},

//关闭扫描

cancelScan() {

if (!window.plus) return;

scan.cancel();

},

//关闭条码识别控件

closeScan() {

if (!window.plus) return;

scan.close();

},

goback() { // 返回

this.closeScan()

this.$router.push({ path: '/Transferoptions' });

this.isShow = false;

}

}

}
  </script>
  
  
  <style lang="scss">
    /* @import '../../../assets/scss/global' */
    .scan {
      height: 100%;
    }
    .scan #bcid {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom:3rem;
        text-align: center;
        color: #fff;
        background: #ccc;
      }
      .scan footer {
        position: absolute;
        left: 0;
        bottom: 1rem;
        height: 2rem;
        line-height: 2rem;
        z-index: 2;
      }
  </style>
  