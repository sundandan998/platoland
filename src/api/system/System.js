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
      url: "/system/username/" + params.email + "/check/",
      method: "get",
      params: params
    })
  }
}
