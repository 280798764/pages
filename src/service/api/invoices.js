import axios from 'axios';
import { API_KEY } from '../constants.js';
export default {
  /*
   * 单点登录获取数据
   */
  switchUserToken(params) {
    return axios.post(`ApiService?APIKey=${API_KEY}&method=xforceplus.toc.SwitchUserToken`, params);
  },
  /*
   * 请求发票数据
   */
  getPersonalPurchaseInvoiceList(token, params) {
    return axios.post(`ApiService?APIKey=${token}&method=xforceplus.toc.getPersonalPurchaseInvoiceList`, params);
  },
  /*
   * 提交报销发票
   */
  updatePersonalPurchaseInvoice(token, params) {
    return axios.post(`ApiService?APIKey=${token}&method=xforceplus.toc.updatePersonalPurchaseInvoice`, params);
  }
};
