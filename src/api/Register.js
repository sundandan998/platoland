import request from "../utils/request"
export default {
    register(params = {}) {
        return request({
            url: "/user/register/",
            method: "post",
            data: params
        })
    }
  }
