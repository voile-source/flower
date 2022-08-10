import qs from 'qs';
import { Message } from 'element-ui';
// import { Loading } from 'element-ui';
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入

let baseURL = 'http://120.24.168.75:8999/'

// if (process.env.NODE_ENV === "development") {
//   console.log("开发环境");
// }else {
//   baseURL = 'http://120.24.168.75:8999/';
// }

let config = {
  baseURL: baseURL,
  timeout: 30000    //设置最大请求时间
}
const _axios = axios.create(config);

let loadinginstance;
let count = 0;
let loadcounter = {

  show: () => {
    if (count <= 0) {
      count++;
      loadinginstance = Loading.service({ fullscreen: true, customClass: 'loading' });
    }
  },
  hide: () => {
    if (count > 0) {
      count--;
      loadinginstance.close();
    }
  }
}

/** 请求拦截器 */
_axios.interceptors.request.use(
  config => {
    // if(config.data) {
    //   if(config.data.loading!=undefined && !config.data.loading) {
    //   } else  loadcounter.show();
    // }else if(config.params) {
    //   if(config.params.loading !=undefined && !config.params.loading) {
    //   } else loadcounter.show();
    // }else  {
    //   loadcounter.show();
    // }
    NProgress.start() // 设置加载进度条(开始..)
    return config;
  },
  err => Promise.reject(err)
);

/** 请求后的操作 */
_axios.interceptors.response.use(
  res => {
    // loadcounter.hide();
    NProgress.done() // 设置加载进度条(结束..)
    if (res.data.code != 200) {
      Message({
        type: 'error',
        message: res.data.message,
        customClass: 'zZindex'
      })
    }
    else return res;
  },
  err => {
    if (err) {
      console.log(err)
      //  
    }
    return Promise.reject(err);
  }
);

// 封装post,get,post,delete方法
const http = {
  get(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': localStorage.getItem("token") },
        method: 'GET'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(err => {
        reject(err)
      })
    })
  },
  post(url = '', params = {}) {

    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: qs.parse(params),
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': localStorage.getItem("token") },
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  },
  postParams(url = '', params = {}) {

    return new Promise((resolve, reject) => {
      _axios({
        url,
        params: qs.parse(params),
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': localStorage.getItem("token") },
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  },
  put(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        params: qs.parse(params),
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': localStorage.getItem("token") },
        method: 'PUT'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': localStorage.getItem("token") },
        method: 'DELETE'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default http