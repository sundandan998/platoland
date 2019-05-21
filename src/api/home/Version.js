import request from "../../utils/request"
export default {
    version(params = {}) {
        return request({
            url: "/system/version/",
            method: "get",
            params: params
        })
    }
  }

