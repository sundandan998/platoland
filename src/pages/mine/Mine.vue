<template>
  <div class="exchange">
    <div class="page-wrap">     
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="mine"  class="home-index">
        	<div class="mine-head">
        		<div class="mine-head-portrait">
							<img src="../../assets/images/u2496.png" alt="" />
        			<p>dmk@qq.com</p>
        		</div>   
        	</div>
        	<div class="mine-cell mine">
        		<mt-cell title="资产" to="assets" is-link class="mine-cell-list">
        			 <img slot="icon" src="../../assets/images/zc.png">
        		</mt-cell>
	        		<div class="mine-safety">
		        		<mt-cell title="地址簿" to="book"is-link class="mine-cell-list">
		        				<img slot="icon" src="../../assets/images/dzb.png">
		        		</mt-cell>
		        		<mt-cell title="安全" to="safety"is-link class="mine-cell-list">
		        			<img slot="icon" src="../../assets/images/aq.png" alt="" />
		        		</mt-cell>
	        		</div>
	        		<div class="mine-our" >
	        		<mt-cell title="版本" to="/version"   is-link class="mine-cell-list">
	        			<img slot="icon" src="../../assets/images/bb.png" alt="" />
	        		</mt-cell>
	        		<mt-cell title="关于我们" to="about"is-link class="mine-cell-list">
	        			<img slot="icon" src="../../assets/images/gy.png" alt="" />
	        		</mt-cell> 
	        		</div>
        	</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
      	<img slot="icon" src="../../assets/images/home-b.png" v-if="this.selected == 'home'"> 
      	<img slot="icon" src="../../assets/images/home.png" v-else> 
      	首页
      </mt-tab-item>         
	      <mt-tab-item id="explore">
	      	<img slot="icon" src="../../assets/images/explore-b.png"v-if="this.selected == 'merchant'">
	      	<img slot="icon" src="../../assets/images/explore.png"v-else>
	      	探索
	      </mt-tab-item>
      <mt-tab-item id="mine" >
      	<img slot="icon" src="../../assets/images/mine-b.png" v-if="this.selected == 'mine'">     	
    	<img slot="icon" src="../../assets/images/mine.png"v-else>   
      	我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
  name: 'page-tabbar',
  data () {
    return {
      selected: 'mine',
			message:this.selected
    }
  },
	creadte() {
		 	_this.$indicator.open({
	      text: '充值中....',
	      spinnerType: 'fading-circle'
			  })
			 //关闭加载
			_this.$indicator.close()
	},
  created(){
    setInterval(this.scroll,3000)
	},
  methods:{
	},
	watch: {
	    message: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定去向
        switch(val){
            case 'home':
                this.$router.push('/')
            break;
            case 'explore':
                this.$router.push('/explore')
            break;
            case 'mine':
                this.$router.push('/mine')
            break;
	        }
	    }
    }
 }
//	computed:{
//			...mapGetters([
//		      'app.isShow'
//		    ])
//		}
//}
</script>
<style lang="scss">
	  @import '../../assets/scss/global'
</style>
