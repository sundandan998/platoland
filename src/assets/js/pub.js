import { Toast } from '../../../node_modules/mint-ui'
import { message } from '@/assets/lang/message.js'

// function toast(res) {
// 	
// 	var index = res.msg
// 	var msg = message[index]
// 	Toast({
// 		message: msg,
// 		position: 'top',
// 		className: 'zZindex'
// 	})
// 	
// }
// export {
// 	toast
// }

// 消息弹框
export function toast(res) {
	var index = res.msg
	var msg = message[index]
	Toast({
		message: msg,
		position: 'top',
		className: 'zZindex'
	})
}
// 60s倒计时
export function getCode() {
	console.log('13')
	// let TIME_COUNT = 60;
	// if (!this.timer) {
	// 	this.count = TIME_COUNT;
	// 	this.show = false;
		timer = setInterval(() => {
			if (count > 0 && count <= TIME_COUNT) {
				count--;
			} else {
				// this.show = true;
				clearInterval(this.timer)
				// this.timer = null
			}
		}, 1000)
	// }
}
export default {
	toast,
	getCode
}
