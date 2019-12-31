<template>
  <div class="add-address">
    <div class="add-address-header header">
      <mt-header fixed :title="$t('m.addaddress')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="addaddress-icon">
      <img class="assets-icon" slot="icon" :src="this.$route.params.icon">
      <span>{{this.$route.params.code}}({{this.$route.params.name}})</span>
      <p class="add-subject">{{this.$route.params.subject}}</p>
    </div>
    <div class="add-adress-list formData">
      <span>姓名:</span>
      <mt-field v-model="addAddress.name"></mt-field>
      <span>备注:</span>
      <mt-field v-model="addAddress.remark"></mt-field>
      <span>地址:</span>
      <mt-field v-model="addAddress.address"></mt-field>
      <router-link to="scan">
        <img class="fr" src="../../../assets/images/scan.png" alt="">
      </router-link>
    </div>
    <div class="add-adress-btn">
      <!-- <router-link  :to="/book/+this.$route.params.code"> -->

      <mt-button type="primary" size="large" :disabled="disabled" @click="addadress">
        {{$t('m.add')}}</mt-button>
      <!-- </router-link> -->
    </div>
    <div class="edit-adress-text">
      <p>{{$t('m.becareful')}}</p>
      <p>{{$t('m.addone')}}：</p>
      <p>{{$t('m.addtwo')}}</p>
      <p>{{$t('m.addthree')}}</p>
    </div>
  </div>
</template>

<script>
  import store from './../../../store/modules/app.js'
  import { toast } from '@/assets/js/pub.js'
  //接口
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        disabled: true,
        addressData:[],
        // 添加地址
        addAddress: {
          name: '',
          token_code: '',
          address: '',
          remark: ''
        }
      }
    },
    created() {
      this.addAddress = this.$route.params
    },
    methods: {
      // 添加地址
      addadress() {
        this.addAddress.id = this.$route.params.id
        this.addAddress.token_code = this.$route.params.code
        api.addAdress(this.addAddress).then(res => {
          if (res.code == 0) {
            this.addressData = res.data
            toast(res)
            this.$router.push({
              name: 'Book',
              // params:{id:'out'}
            })
          }

        }).catch(err => {
          // toast(err)
        })
      }
    },
    watch: {
      addAddress: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.name != '' && val.address != '') {
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
  @import "../../../assets/scss/global";

  .add-address {
    .add-subject {
      margin-top: 16px;
    }
  }
</style>