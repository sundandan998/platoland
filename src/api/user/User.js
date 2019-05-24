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
  getUserInfo(params = {}) {
    return request({
      url: "/user/info/",
      method: "get",
      params: params
    })
  },
  // 忘记密码
  forgetPassword(params ={}){
    return request({
      url: "/user/pwd/reset/",
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
  addasset(params = {}){
    return request({
      url: "/user/asset/add/",
      method: "post",
      data: params
    })
  },
  // 删除资产
  delAsset(params={}){
    return request({
      url: "/user/asset/delete/",
      method: "post",
      data: params
    })
  },
   // 转出资产
   outAsset(params={}){
    return request({
      url: "/user/withdraw/",
      method: "post",
      data: params
    })
  },
  // 资产详情
  assetDetail(params = {}){
    return request({
      url: "/user/asset/"+params.id+"/detail/",
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
      url: "/user/address/"+params.id+"/modify/",
      method: "post",
      data: params
    })
  },
  // 删除地址
  delAdress(params = {}) {
    return request({
      url: "/user/address/"+params.id+"/delete/",
      method: "post",
      data: params
    })
  }
}
