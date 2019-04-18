<template>
	<div class="certificate-list">
		<div class="certificate-list-header">
			<mt-header title="资产列表">
			  <router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>	
		<div class="certificate-list-card">
			<ul>
				<li v-for="(item, index) in getData":key="index"
					v-if="item.hidden!=0"
					@click.parent="removeData(item.name)">
					<img src="../../../assets/images/u345.png" alt="" class="fl" />
					<span>{{item.name}}</span>
					<span>{{item.company}}</span>
					<router-link to="/pass">
						<mt-button size="small" type="primary" class="fr">详情</mt-button>
					</router-link>									
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			popupVisible: true,
			getData: [
		        {
		          name: "PLD",
		          company: "PLATOLAND集团"
		        },
		        {
		          name: "河底捞",
		          company: "河底捞集团"
		        },
		        {
		          name: "捞豆",
		          company: "捞豆集团"
		        },
		        {
		          name: "汽车DSO",
		          company: "汽车DSO集团"
		        },
		        {
		          name: "西新科技",
		          company: "西新科技集团"
		        },
		        {
		          name: "麦德劳",
		          company: "麦德劳集团"
		        }]
			}
	},
	created() {},
	methods: {
    removeData(a) {
      let newGetData = this.getData;
      let temporary = newGetData.map((item, index) => {
        if (item.name == a) {
          item.hidden = 0;
          this.$router.push({name:'Assets',params:item})
        }
        return item
      })
      this.getData = temporary
    }
  }
}
</script>


<style lang="scss">
	@import '../../../assets/scss/global'
</style>