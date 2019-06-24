import request from "../../utils/request"
export default {
  // 通证详情
  tokenDetail(params = {}) {
      return request({
          url: "/token/"+params.code+"/detail/",
          method: "get",
          params: params
      })
  },
  // 通证主体
  tokenSubject(params = {}) {
    return request({
        url: "/token/subject/"+params.code+"/detail/",
        method: "get",
        params: params
    })
  },
  //
  // 列表
  tokenList(params = {}) {
    return request({
        url: "/token/list/",
        method: "get",
        params: "params"
    })
  }
}
