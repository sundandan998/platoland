<template>
  <div class="exchange">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="explore">
        	<div class="explore">
	        	<div class="explore-header">
							<mt-header fixed title="探索"></mt-header>
	        	</div>
	        	<div class="explore-navbar">
	        		<van-tabs>
							  <van-tab title="全部">
                  <mt-cell title="PLD (PLD)" label="PLATOLAND集团">
                    <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                    <router-link to="/issue">
                      <mt-button size="small" type="primary" class="fr">详情</mt-button>
                    </router-link>
                  </mt-cell>
                   <mt-cell title="PLD (PLD)" label="PLATOLAND集团">
                    <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                    <router-link to="/issue">
                      <mt-button size="small" type="primary" class="fr">详情</mt-button>
                    </router-link>
                  </mt-cell>
							  </van-tab>
							  <van-tab title="流通中">
									<mt-cell title="PLD (PLD)" label="PLATOLAND集团">
                    <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                    <router-link to="/issue">
                      <mt-button size="small" type="primary" class="fr">详情</mt-button>
                    </router-link>
                  </mt-cell>
							  </van-tab>
							  <van-tab title="发行中">
							   <mt-cell title="PLD (PLD)" label="PLATOLAND集团">
                    <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                    <router-link to="/issue">
                      <mt-button size="small" type="primary" class="fr">详情</mt-button>
                    </router-link>
                  </mt-cell>
							  </van-tab>
							  <van-tab title="待发行">
						  	 <mt-cell title="PLD (PLD)" label="PLATOLAND集团">
                  <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                  <router-link to="/issue">
                    <mt-button size="small" type="primary" class="fr">详情</mt-button>
                  </router-link>
                </mt-cell>
						  </van-tab>
						</van-tabs>
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
	      	<img slot="icon" src="../../assets/images/explore-b.png"v-if="this.selected == 'explore'">
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
      selected: 'explore',
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
	mounted: function () {

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
