<template>
	<div class="to-change-into">
		<div class="to-change-into-header">
			<mt-header fixed :title="$t('m.passdetails')">
			    <mt-button icon="back"slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="to-change-into-exhibition">
			<div class="to-change-into-exhibition-img">
				<img src="../../../assets/images/ld.png" alt="" class="fl" />
				<ul>
					<li>LD({{$t('m.intoname')}})</li>
					<li>{{$t('m.intobody')}}</li>
				</ul>
				<div class="to-change-into-exhibition-adress">
					<img src="../../../assets/images/u4780.png" alt="" class="fr tag-read"
          @click="copy" data-clipboard-text="13SncaFeFFGQDYHSmWafwkTXCBWqaeix7c"
          />
          13SncaFeFFGQDYHSmWafwkTXCBWqaeix7c
				</div>
			</div>
		</div>
		<div class="to-change-into-qrcode">
			<img src="../../../assets/images/qrcode.png" alt="" />
			<!-- <p>{{$t('m.transfersuccess')}}</p> -->
      <p>{{$t('m.intotext')}}</p>
		</div>
	</div>
</template>

<script>
import Clipboard from 'clipboard'
export default{
    data(){
    return {
      }
  },
  methods:{
    //复制
    copy() {
          var clipboard = new Clipboard('.tag-read')
          clipboard.on('success', e => {
            this.$toast({
            message: 'Done Successfully',
            duration:1800
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
      }
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
