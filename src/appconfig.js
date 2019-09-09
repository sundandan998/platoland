export default class AppConfig {
	install (Vue, options) {
	let version ='0.17'
	//  版本号
    Vue.prototype.$version = () => {
      return version
    }
  }
}
