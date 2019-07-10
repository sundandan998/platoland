import request from "../../utils/request"
export default {
  // 校验验证码
  checkCode(params = {}) {
    return request({
      url: "/system/code/verification/",
      method: "post",
      data: params
    })
  },
  // 发送邮件
  email(params = {}) {
    return request({
      url: "/system/email/",
      method: "post",
      data: params,
    })
  },
  // 发送短信
  sms(params = {}) {
    return request({
      url: "/system/sms_code/",
      method: "post",
      data: params
    })
  },
  // 检测用户名是否唯一
  is_use(params = {}) {
    return request({
      url: "/system/username/" + params.username + "/check/",
      method: "get",
      params: params
    })
  },
  // 登录接口
  loginByCode(params = {}) {
    return request({
      url: "/user/authorization/",
      method: "post",
      data: params
    })
  },
  // 用户信息
  getUserInfo(params = {}) {
    return request({
      url: "/user/info/",
      method: "get",
      params: params
    })
  },
  // 忘记密码
  forgetPassword(params = {}) {
    return request({
      url: "/user/pwd/reset/",
      method: "post",
      data: params
    })
  },
  // 修改登录密码
  editPwd(params = {}) {
    return request({
      url: "/user/pwd/",
      method: "post",
      data: params
    })
  },
  // 注册接口
  register(params = {}) {
    return request({
      url: "/user/register/",
      method: "post",
      data: params
    })
  },
  // 资产列表
  assetList(params = {}) {
    return request({
      url: "/user/asset/list/",
      method: "get",
      params: params
    })
  },
  // 添加资产
  addasset(params = {}) {
    return request({
      url: "/user/asset/add/",
      method: "post",
      data: params
    })
  },
  // 删除资产
  delAsset(params = {}) {
    return request({
      url: "/user/asset/delete/",
      method: "post",
      data: params
    })
  },
  // 转出资产
  outAsset(params = {}) {
    return request({
      url: "/user/withdraw/",
      method: "post",
      data: params
    })
  },
  // 资产详情
  assetDetail(params = {}) {
    return request({
      url: "/user/asset/" + params.id + "/detail/",
      method: "get",
      params: params
    })
  },
  // 地址薄
  addressList(params = {}) {
    return request({
      url: "/user/address/list/",
      method: "get",
      params: params
    })
  },
  // 添加地址信息
  addAdress(params = {}) {
    return request({
      url: "/user/address/add/",
      method: "post",
      data: params
    })
  },
  // 修改地址信息
  editAdress(params = {}) {
    return request({
      url: "/user/address/" + params.id + "/modify/",
      method: "post",
      data: params
    })
  },
  // 删除地址
  delAdress(params = {}) {
    return request({
      url: "/user/address/" + params.id + "/delete/",
      method: "post",
      data: params
    })
  },
  // 明细列表接口
  transactionList(params = {}) {
    return request({
      url: "/user/transaction/list/",
      method: "get",
      params: params
    })
  },
  // 明细详情接口
  listDetail(params = {}) {
    return request({
      url: "/user/transaction/detail/",
      method: "post",
      data: params
    })
  },
  // 设置支付密码
  payPwd(params = {}) {
    return request({
      url: "/user/pay_pwd/",
      method: "post",
      data: params
    })
  }
}
