import request from "../../utils/request"
export default {
  // 交易市场列表
  dealList(params = {}) {
    return request({
        url: "/market/otc/list/",
        method: "get",
        params: params
    })
  },
  // 交易市场/购买/列表详情
  buyDetail(params = {}) {
    return request({
        url: "/market/otc/"+params.id+"/detail/",
        method: "get",
        params: params
    })
  },
  // 交易市场/购买/支付请求
  reqPay(params = {}) {
    return request({
        url: "/market/transaction/apply/",
        method: "post",
        data: params
    })
  },
  // 交易市场/购买/确认支付
  confirmPay(params = {}) {
    return request({
        url: "/market/transcation/confirm/",
        method: "post",
        data: params
    })
  },
  // 发布
  release(params = {}) {
    return request({
        url: "/market/otc/publish/",
        method: "post",
        data: params
    })
  }
}
