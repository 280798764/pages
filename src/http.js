/**
 * Created by admin on 2017/11/23.
 */
/*import axios from 'axios'
const  http=axios.create({
  baseURL:'http://www.e-fp.cn/issp/ApiService',
  timeout:5000,
  headers:{'contentType':'application/json;charset=utf-8'}
});
http.interceptors.response.use(function (response) {
  if(response.status==200){
    return response.data
  }
},function (error) {
  return Promise.reject(error)
})
export  default  http;*/

import axios from 'axios'
import qs from 'qs'
import global_ from './components/tool/Global.vue'
const http = axios.create({
  baseURL: global_.httpLink,
  timeout: 300000,
  data: {},
})

http.interceptors.request.use((req) => {
  if (req.method === 'post') {
    req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    req.data = qs.stringify(req.data)
  }

  return req
}, (error) => Promise.reject(error))
export  default  http;
