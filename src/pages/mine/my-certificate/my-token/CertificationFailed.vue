<template>
  <div class="failed">
    <div class="token-header header">
      <mt-header fixed :title="$t('m.myToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="failed-body">
      <img src="../../../../assets/images/failed.svg" alt="">
      <p>认证未通过</p>
      <!-- <p class="tel">有疑问？联系我们:kefu@paltoland.com</p> -->
      <span class="tel tag-read" @click="copy" data-clipboard-text="kefu@paltoland.com">有疑问？联系我们:kefu@paltoland.com
        <img src="../../../../assets/images/copy.svg" alt="" class="fr">
      </span>
    </div>
    <p class="reason">原因</p>
    <div class="failed-reason">
      <p>转出地址与线下签约填写地址不一致</p>
      <p>该转出地址已被认证</p>
      <p> 未查询到该转出地址</p>
    </div>
    <div class="failed-button">
      <router-link to="/tokenlist">
        <mt-button size="large" type="primary">重新认证</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard'
  export default {
    data() {
      return {

      }
    },
    created() {
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
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .failed {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;

    p {
      font-size: 28px;
    }

    .failed-body {
      margin-top: 160px;

      img {
        height: 100px;
        margin: 40px auto;
        display: block;
      }

      p {
        text-align: center;
        margin-bottom: 40px;
      }

      .tel {
        color: #036EB8;
        font-size: 28px;
        display: block;
        text-align: center;

        img {
          width: 0.4rem;
          position: relative;
          top: -66px;
          right: 84px;
          z-index: 1;
        }
      }
    }

    .reason {
      margin-left: 24px;
    }

    .failed-reason {
      margin-left: 50px;
      color: #999;
      margin-top: 10px;
    }

    .failed-button {
      position: fixed;
      width: 100%;
      bottom: 10px;
    }
  }
</style>