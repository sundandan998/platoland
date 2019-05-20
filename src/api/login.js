import request from "../utils/request"

export default {
  // 登录请求
    loginByCode(params = {}) {
        return request({
            url: "/user/authorization/",
            method: "post",
            data: params
        });
    }
    // getCode(params = {}) {
    //     return request({
    //         url: BASEAPI + "common/code",
    //         method: "post",
    //         data: params
    //     });
    // },
    // getUserInfo(params = {}) {
    //     return request({
    //         url: BASEAPI + "erpuser/me",
    //         method: "get",
    //         params: params
    //     });
    // }
};
