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
        		<mt-cell :title="$t('m.assets')" to="/assets" is-link class="mine-cell-list">
        			 <img slot="icon" src="../../assets/images/zc.png">
        		</mt-cell>
	        		<div class="mine-safety">
		        		<mt-cell :title="$t('m.addressbook')" to="/book"is-link class="mine-cell-list">
		        				<img slot="icon" src="../../assets/images/dzb.png">
		        		</mt-cell>
		        		<mt-cell :title="$t('m.security')" to="/safety"is-link class="mine-cell-list">
		        			<img slot="icon" src="../../assets/images/aq.png" alt="" />
		        		</mt-cell>
	        		</div>
	        		<div class="mine-our" >
	        		<mt-cell :title="$t('m.version')" to="/version"   is-link class="mine-cell-list">
	        			<img slot="icon" src="../../assets/images/bb.png" alt="" />
	        		</mt-cell>
	        		<mt-cell :title="$t('m.our')" to="/about"is-link class="mine-cell-list">
	        			<img slot="icon" src="../../assets/images/gy.png" alt="" />
	        		</mt-cell>
	        		</div>
        	</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
     <!-- <app-tabber/> -->
    <mt-tabbar v-model="message"  fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="../../assets/images/home-b.svg" v-if="this.selected == 'home'">
        <img slot="icon" src="../../assets/images/home.svg" v-else>
        {{$t('m.homepage')}}
      </mt-tab-item>
      <mt-tab-item id="explore">
        <img slot="icon" src="../../assets/images/explore-b.svg" v-if="this.selected == 'explore'">
        <img slot="icon" src="../../assets/images/explore.svg"v-else>
        {{$t('m.explore')}}
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" src="../../assets/images/mine-b.svg" v-if="this.selected == 'mine'">
        <img slot="icon" src="../../assets/images/mine.svg"v-else>
        {{$t('m.mine')}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Tabber from './../../assets/pub/Tabber.vue'
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
  data () {
    return {
      selected: 'mine',
      message:'mine',
    }
  },
  components: {
    'app-tabber': Tabber
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
            break
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
