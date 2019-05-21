import request from "../../utils/request"
export default {
  // 通证详情
  tokenDetail(params = {}) {
      return request({
        // /query?id='+id
          url: "/token/:id/detail",
          method: "get",
          params: params
      })
  },
  // 列表
  tokenList(params = {}) {
    return request({
        url: "/token/list/",
        method: "get",
        params: params
    })
  }
}
