<template>
	<div class="version">
		<div class="version-header header">
			<mt-header fixed :title="$t('m.versionupdate')">
				<router-link to="/mine" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="version-logo">
			<img src="../../../assets/images/logo.png" alt="" />
			<p>{{this.$version()}}</p>
		</div>
		<div class="version-update">
			<mt-cell :title="$t('m.versionupdate')" :value="$t('m.versiontips')"></mt-cell>
		</div>

	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		created() {
		},
		mounted() {
		},
		methods: {
		},
		computed: {
		},
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';

	.version {
		.version-logo {
			text-align: center;
			img{
				margin:50px auto;
			}
		}
	}
</style>