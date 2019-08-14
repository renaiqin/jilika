import axios from 'axios';
//import { truncateSync } from 'fs';
let qs = require('qs')
// axios.defaults.timeout = 10000;
// axios.defaults.baseURL ='http://192.168.0.238:8088';

axios.interceptors.request.use(
  config => {
    // config.baseURL = 'http://192.168.3.16:6004'
    // config.baseURL = 'http://192.168.0.41:8765'

    config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 2500;

    let istoken = window.localStorage.getItem('istoken');

    //let token = window.localStorage.getItem('token');
    if (istoken == 'true') {
      let token = window.localStorage.getItem('token');
      if (token) {
        // console.log(config.headers['Content-Type'])
        if (config.headers['Content-Type']) {
          config.headers = {
            "Authorization": token,
          }
        } else {
          config.headers = {
            "Authorization": token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      }

      if (config.url === 'refresh') {
        config.headers = {
          'refresh-token': sessionStorage.getItem('refresh_token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)




axios.interceptors.response.use(
  response => {
    //定时刷新access-token
   // if (!response.data.value && response.data.status === '401') {//token 无效
      // 刷新token
      // 此处处理token无效





      // store.dispatch('refresh').then(response => {
      //   sessionStorage.setItem('access_token', response.data)
      // }).catch(error => {
      //   throw new Error('token刷新' + error)
      // })
    //}

    // console.log(response)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)







/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data,conf) {
  // console.log(conf)
  return new Promise((resolve,reject) => {
    axios.post(url, data, conf?{headers:{'Content-Type':conf.headers}}:{}
    )
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}