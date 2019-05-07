<template>
  <div class="add-address">
    <div class="add-address-header">
      <mt-header fixed title="添加地址">
        <router-link to="/book" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="add-adress-list formData">
      <span>备注名称:</span>
      <mt-field></mt-field>
      <span>描述:</span>
      <mt-field></mt-field>    
      	<div @click="addadress">     		
      		<span class="add-address-content">
	          <img src="../../../assets/images/u2693.png" alt>
	          <span>{{this.detail.id}}</span>
	          <p>{{this.detail.body}}</p>  
	          <p>添加地址</p>
        </span>
        <!--<span v-else>
          <img src="../../../assets/images/u2693.png" alt>
          替换地址
        </span>-->
      	</div>
        
      <!--</router-link>-->
      <div class="certificate-list-card assets-list-add">
        <!--<ul>
          <li>
            <router-link to="/assetsdetailed">
            
              <span>{{this.detail.id}}</span>
              <span>{{this.detail.body}}</span>
              <div class="assets-list-right fr"></div>
            </router-link>
          </li>
        </ul>-->
      </div>
    </div>
    <div class="add-adress-btn">
      <router-link to="/book">
        <mt-button type="primary" size="large">添加</mt-button>
      </router-link>
    </div>
    <div class="edit-adress-text">
      <p>注意：资金转出到其他账户后无法退回，请务必核实：</p>
      <p>1.对方信息是否正确</p>
      <p>2.账号是否是其本人使用</p>
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
//	showadd(){
//		this.showadd= !this.showadd
//	},
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
/*.formData {
  margin-top: 50px !important;
}
.add-address .certificate-list-card {
  padding-bottom: 10px;
}
.add-address .certificate-list-card li {
  height: 70px;
  width: 90%;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid #ccc;
}*/
</style>