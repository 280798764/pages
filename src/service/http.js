import axios from 'axios';
import { API } from './constants';
import qs from 'qs';

axios.defaults.baseURL = API;

axios.interceptors.request.use((req) => {
  if (req.method === 'post') {
    req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    req.data = qs.stringify(req.data)
  }

  return req
}, (error) => Promise.reject(error));

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error.response);
});
