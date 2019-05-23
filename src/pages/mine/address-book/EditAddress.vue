<template>
	<div class="edit-adress">
		<div class="edit-adress-header">
			<mt-header fixed :title="$t('m.addressdetail')">
			   <mt-button icon="back" slot="left"v-on:click="$router.go(-1)" @click="saveBox">{{$t('m.back')}}</mt-button>
			   <mt-button icon="" slot="right" @click="del">
			   	<img src="../../../assets/images/delete.png"  alt=""/><span>{{$t('m.delete')}}</span>
			   </mt-button>
			</mt-header>
		</div>
		<div class="add-adress-list">
			<span>{{$t('m.remarks')}}</span>
			<mt-field>
				<span class="add-adress-name">{{this.$route.params.name}}</span>
			</mt-field>
			<span>{{$t('m.describe')}}</span>
			<mt-field >
        <span>{{this.$route.params.remark}}</span>
      </mt-field>
			<span>{{$t('m.usdtaddress')}}</span>
			<mt-field >
				<p class="to-change-into-exhibition-adress">
				{{this.$route.params.address}}
				</p>
			</mt-field>
		</div>
		<div class="edit-adress-btn" >
			<mt-button type="primary" size="large" @click="edit">{{$t('m.preservation')}}</mt-button>
		</div>
		<div class="edit-adress-text">
			<!--<p>注意：所有地址和账户均保存本地，删除APP前请备份</p>-->
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
//接口
import api from "@/api/user/User.js"
export default{
	data(){
		return{
      editId:{}
		}
	},
	created(){
    // this.edit()
    this.editId = this.$route.params
	},
	methods:{
    // 编辑修改地址
    edit(){
      api.editAdress(this.$route.params).then(res=>{
        // console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    // 删除地址
    del(){
      api.delAdress(this.$route.params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      // 删除地址弹框
      this.$messagebox({
        title: 'Tips',
        message:'Are you sure to delete the address?',
        cancelButtonText:'No',
        confirmButtonText:'Yes',
        showCancelButton: true
        }).then(action => {
        this.$router.push({
          path:'/book'
        })
      })
    },
	//点击返回弹出的消息框
	saveBox(){
		this.$messagebox({
      title: 'Tips',
      message:'Are you sure to save the information?',
      cancelButtonText:'No',
      confirmButtonText:'Yes',
      showCancelButton: true
    })
		.then(action => {
			this.$router.push({
				path:'/book'
			})
		})
	}
 },
	computed:{
		...mapGetters([
	      'detail'
		])
	}
//
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
