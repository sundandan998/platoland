<template>
  <div class="editnickname">
    <div class="editnickname-header header">
      <mt-header fixed :title="$t('m.editNickname')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="editnickname-body">
      <!-- @blur.native.capture="check" -->
      <mt-field :placeholder="$t('m.EnterNickname')" v-model="params.nickname"></mt-field>
      <p>{{$t('m.checkNickname')}}</p>
    </div>
    <div class="editnickname-button" @click="save">
      <mt-button type="primary" size="large" :disabled="disabled">{{$t('m.save')}}</mt-button>
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        name: '',
        disabled: true,
        params: {
          nickname: ''
        }
      }
    },
    created() { },
    methods: {
      // 昵称
      save() {
        api.nickname(this.params).then(res => {
          this.name = res.data
          this.$router.push({
            name: 'Information',
            params: { nickname: this.name.nickname }
          })
        }).catch(err => {
          
        })
      },
    },
    watch: {
      params: {
        immediate: true,
        deep: true,
        handler(val) {
          let reg = /(^$)|(^[\u4E00-\u9FA5a-zA-Z0-9,]{2,7}$)/
          if (!reg.test(val.nickname) && val.nickname != '') {
            this.disabled = true
            Toast({
              message: '请填写正确昵称',
              className: 'zZindex'
            })
          } else {
            this.disabled = false
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .editnickname {
    .editnickname-body {
      p {
        background-color: #fff;
        height: 60px;
        padding: 0 24px;
        line-height: 60px;
        color: #999;
      }
    }

    .editnickname-button {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }
  }
</style>