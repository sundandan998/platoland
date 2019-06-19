import request from "../../utils/request"
export default {
  // 首页
  home(params = {}) {
    return request({
      url: "/system/home/",
      method: "get",
      params: params
    })
  },
  // 公告
  notice(params = {}) {
    return request({
      url: "/system/notice/list/",
      method: "get",
      params: params
    })
  },
  // 公告详情
  noticeDetail(params = {}) {
    return request({
      url: "/system/notice/" + params.id + "/detail/",
      method: "get",
      params: params
    })
  },
  // 升级
  version(params = {}) {
    return request({
      url: "/system/version/",
      method: "get",
      params: params
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
  // 校验验证码
  checkCode(params = {}) {
    return request({
      url: "/system/code/verification/",
      method: "post",
      data: params
    })
  },
  // 安全页面联合校验
  safety(params = {}) {
    return request({
      url: "/system/security/verification/",
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
  // 绑定手机或邮箱
  bind(params = {}){
    return request({
      url: "/user/bind/",
      method: "post",
      data: params
    })
  }
}
