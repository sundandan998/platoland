export default class AppConfig {
	install (Vue, options) {
	let basePath ='http://www.dandan.com/api'
  	Vue.appConstant = () => {
	      return {
	        'appPath': ''
	      }
	   },
	Vue.prototype.$backStage = (url) => {
      return basePath + url
    	}
  	}
}