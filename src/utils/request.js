import axios from "axios"
import qs from "qs"
// import { message } from "ant-design-vue";
import store from "@/store/index"
import baseURL from "./baseURL"
import router from "@/router/index.js"
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
const service = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  //`transformRequest`选项允许我们在请求发送到服务器之前对请求的数据做出一些改动
  //该选项只适用于以下请求方式：`put/post/patch`
  //数组里面的最后一个函数必须返回一个字符串、-一个`ArrayBuffer`或者`Stream`
  transformRequest: [function (data) {
    return qs.stringify(data);
  }
  ],
  //`paramsSerializer`是一个可选的函数，起作用是让参数（params）序列化
  paramsSerializer: function (params) {
    return qs.stringify(params);
  },
  //`transformResponse`选项允许我们在数据传送到`then/catch`方法之前对数据进行改动
  // 在此处可以判断data里的status
  transformResponse: [function (data) {
    return data;
  }
  ],
  // 是否跨域
  withCredentials: false,
  // withCredentials: true,
  // loading加载
  loading: true
});
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8"
    // 国际化语言
    // config.headers["Accept-Language"] ="ko"
    // zh-hans
    config.headers["Accept-Language"] ="zh-hans"
    if (store.getters.token) {
      config.headers["Authorization"] = "JWT " + store.getters.token
    }
    if (config.loading) {
      store.dispatch("setLoading", true);
    }
    return config;
  },
)
service.interceptors.response.use(
  response => {
    // if (response.headers['content-type'] != 'application/json') {
    //   return response.data
    // }
    // let data = JSON.parse(response.data)
    if (response.status == 401 || response.status == 403) {
      window.localStorage.removeItem('token')
      router.push({
        path: '/login'
      })
    }
    let data = JSON.parse(response.data)
    if (response.config.loading) {
      store.dispatch("setLoading", false);
    }
    if (data.code === 0) {
      return data;
    } else {
      return Promise.reject(data)
    }
  },
  errorReponse => {
    // 服务器请求错误
    // 为了保持统一的错误处理，修改了浏览器报错的格式，与接口返回的失败格式一致
    let response = errorReponse.response;
    if (response.config.loading) {
      store.dispatch("setLoading", false)
    }
    let errorJSON = {
      ret_code: response.status,
      ret_msg: errorReponse.message,
      status: "Request Error",
      result: errorReponse.response
    }
    if (errorJSON.ret_code === 403 || errorJSON.ret_code === 401) {
      window.localStorage.removeItem('token')
      router.push({
        path: 'login'
      })
      window.localStorage.removeItem('token')
    }
    message.error(errorJSON.ret_msg)
    return Promise.reject(errorJSON)
  }
);
export default service