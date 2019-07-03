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
    }
}
