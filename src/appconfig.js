export default class AppConfig {
	install (Vue, options) {
	let basePath ='http://www.dandan.com/api'
	// let basePath ='http://api.plato.land'
	let version ='3.0'
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
