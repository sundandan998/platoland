<template>
  <div class="add-address">
    <div class="add-address-header">
      <mt-header fixed :title="$t('m.addaddress')">
          <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="add-adress-list formData">
      <span>{{$t('m.remarks')}}:</span>
      <mt-field></mt-field>
      <span>{{$t('m.describe')}}:</span>
      <mt-field></mt-field>
      	<div @click="addadress">
      		<span class="add-address-content">
	          <img src="../../../assets/images/u2693.png" alt>
	          <span>{{this.detail.id}}</span>
	          <p>{{this.detail.body}}</p>
	          <p>{{$t('m.addaddress')}}</p>
        </span>
      	</div>
      <div class="certificate-list-card assets-list-add">
      </div>
    </div>
    <div class="add-adress-btn">
      <router-link to="/book">
        <mt-button type="primary" size="large">{{$t('m.add')}}</mt-button>
      </router-link>
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
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    addadress(){
    	const p = this.$route.path
    	this.$store.commit('refpath', p)
    	this.$router.push({
				name:'List',
			})
    }
  },
  computed:{
		...mapGetters([
	      'detail'
	    ])
	},

}
</script>

<style lang="scss">
  @import "../../../assets/scss/global"
</style>
