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
  // 升级
  version(params = {}) {
    return request({
      url: "/system/version/",
      method: "get",
      params: params
    })
  }
}
