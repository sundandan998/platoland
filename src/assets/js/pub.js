 import {Toast} from '../../../node_modules/mint-ui'
var pub = {
	//邮箱校验
sendEmail(email){
	    var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	    if(!regEmail.test(email)){
	       Toast({
				message: '请输入正确邮箱'
			})
	    }
	},
	//  密码校验
passWord(pass){
		var regpass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
		if(!regpass.test(pass)){
			Toast({
				message: '请输入8-16位数字+组合密码'
			})
		}
	}
}
export default pub

