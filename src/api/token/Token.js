import request from "../../utils/request"
export default {
    // 添加资产
    addAsset(params = {}) {
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
    // 通证详情
    tokenDetail(params = {}) {
        return request({
            url: "/token/" + params.code + "/detail/",
            method: "get",
            params: params
        })
    },
    // 通证主体
    tokenSubject(params = {}) {
        return request({
            url: "/token/subject/" + params.id + "/detail/",
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
            params: params
        })
    },
    // 转让
    transfer(params = {}) {
        return request({
            url: "/token/transfer/",
            method: "post",
            data: params
        })
    },
    // 订单详情
    detail(params = {}) {
        return request({
            url: "/user/order/" + params.order_id + "/detail/",
            method: "get",
            params: params
        })
    },
    // 我的通证--余额
    balance(params = {}) {
        return request({
            url: "/user/asset/balance/",
            method: "get",
            params: params
        })
    },
    //获取分利计划列表
    flList(params = {}) {
        return request({
            url: "/token/fl/list/",
            method: "get",
            params: params
        })
    },
    //获取分利计划列表详情
    flDetail(params = {}) {
        return request({
            url: "/token/fl/" + params.id + "/detail/",
            method: "get",
            params: params
        })
    },
    // 创建分利计划
    releaseFl(params = {}) {
        return request({
            url: "/token/fl/add/",
            method: "post",
            data: params
        })
    },
    // 转入分利宝
    transferFlb(params = {}) {
        return request({
            url: "/token/fl/order/add/",
            method: "post",
            data: params
        })
    },
    // 发行详情
    issuedDetail(params = {}) {
        return request({
            url: "/token/release/" + params.id + "/detail/",
            method: "get",
            params: params
        })
    },
    // 获取通证的发行信息列表
    issuedList(params = {}) {
        return request({
            url: "/token/release/list/",
            method: "get",
            params: params
        })
    },
    // 发行通证
    releaseToken(params = {}) {
        return request({
            url: "/token/release/",
            method: "post",
            data: params
        })
    },
    // 提交通证认证申请
    Apply(params = {}) {
        return request({
            url: "/token/" + params.code + "/authentication/apply/",
            method: "post",
            data: params
        })
    },
    // 确认通证认证申请
    confirmApply(params = {}) {
        return request({
            url: "/token/" + params.order_id + "/authentication/confirm/",
            method: "post",
            data: params
        })
    },
    // 获取通证的简单信息
    tokenSimple(params = {}) {
        return request({
            url: "/token/" + params.code + "/simple/",
            method: "get",
            param: params
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
}
