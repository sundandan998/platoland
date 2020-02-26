<template>
  <div class="invite-people">
    <!-- 头部 -->
    <div class="invite-header">
      <mt-header fixed :title="$t('m.invite')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- 邀请码 -->
    <div class="logo">
      <!-- <img src="../../../assets/images/u125.png" alt=""> -->
    </div>
    <div class="invite-code">
      <span>{{$t('m.inviteCode')}}</span>
      <p>{{infoData.invite_code}}</p>
    </div>
    <div class="invite-code-copy tag-read" @click="copy" :data-clipboard-text="infoData.invite_code">
      <span>{{$t('m.copy')}}</span>
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  import Clipboard from 'clipboard'
  export default {
    data() {
      return {
        infoData: ''
      }
    },
    created() {
      this.info()
    },
    methods: {
      // 用户信息
      info() {
        api.getUserInfo().then(res => {
          this.infoData = res.data
        }).catch(err => {
          console.log(err)
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
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';
  .invite-people {
    .invite-header {
      margin-bottom: 40px;
    }

    .logo {
      margin: 150px auto 50px auto;
      text-align: center;

      img {
        background-color: #f2f2f2;
      }
    }

    .invite-code {
      text-align: center;
      font-size: 30px;
      color: #666;

      p {
        margin: 30px auto 50px auto;
        font-size: 100px;
        color: #036EB8;
      }
    }

    .invite-code-copy {
      width: 40%;
      background-color: #036EB8;
      color: #fff;
      margin: 0 auto;
      text-align: center;
      border-radius: 7px;
      height: 60px;
      line-height: 60px;
      font-size: 28px;
    }

  }
</style>