import request from "../../utils/request"
export default {
  // 登录接口
    loginByCode(params = {}) {
        return request({
            url: "/user/authorization/",
            method: "post",
            data: params
        })
    },
    // getCode(params = {}) {
    //     return request({
    //         url: BASEAPI + "common/code",
    //         method: "post",
    //         data: params
    //     });
    // },
    getUserInfo(params = {}) {
        return request({
            url: "/user/info/",
            method: "get",
            params: params
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
  // 地址薄
    addressList(params = {}) {
      return request({
          url: "/user/address/list/",
          method: "get",
          params: params
      })
  }
}
