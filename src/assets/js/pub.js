import { Toast } from '../../../node_modules/mint-ui'
import { message } from '@/assets/lang/message.js'
function toast(res) {
	// 消息弹框
	var index = res.msg
	var msg = message[index]
	Toast({
		message: msg,
		position: 'top',
		className: 'zZindex'
	})
}
export {
	toast
} 

