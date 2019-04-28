export default class AppConfig {
	install (Vue, options) {
	let basePath ='http://www.dandan.com/api'
	let version ='0.1'
  	Vue.appConstant = () => {
	      return {
	        'appPath': ''
	      }
	   },
	Vue.prototype.$backStage = (url) => {
      return basePath + url
    },
	//  版本号
    Vue.prototype.$version = () => {
      return version
    }
  }
}