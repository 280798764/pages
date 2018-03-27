import Vue from 'vue'
import VueRouter from 'vue-router'
import personalCenter from '../components/personalCenter/personalCenter.vue'

import myInvoice from '../components/myInvoice/myInvoice.vue'
import invoiceCollection from '../components/invoiceCollection/invoiceCollection.vue'
import invoiceCheck from '../components/invoiceCheck/invoiceCheck.vue'
import editInvoice from '../components/editInvoice/editInvoice.vue'
import invoiceLabel from '../components/invoiceLabel/invoiceLabel.vue'
import invoiceCheckIndex from '../components/invoiceCheckIndex/invoiceCheckIndex.vue'
import imageDetail from '../components/imageDetail/imageDetail.vue'
import takePhoto from '../components/takePhoto/takePhoto.vue'

/* 五矿 */
import wkLogin from '../wk_components/login/login.vue'
import mobileLogin from '../wk_components/mobile_login/mobile_login.vue'
import showInvoices from '../wk_components/showInvoices/showInvoices.vue'
import print from '../wk_components/print/print.vue'
import mobileBind from '../wk_components/mobile_bind/mobile_bind.vue'
import ceshi1 from '../wk_components/ceshi/ceshi.vue'
import mobileLoginPC from '../wk_components/mobile_loginPC/mobile_loginPc.vue'
import printInvoices from '../wk_components/printInvoices/printInvoices.vue'

/* 临时使用 */
import fapiaoyanzhen from '../components/fapiaoyanzhen/fapiaoyanzhen.vue'
import messages from '../components/messages/messages.vue'
import ceshi from '../components/invoiceLabel/ceshi.vue'

Vue.use(VueRouter)

export default new VueRouter({
//  linkActiveClass:'active',
  routes: [
    {
      path: '/invoiceCollection',
      component: invoiceCollection
    },
    {
      path: '/',
      redirect: 'invoiceCollection'
    },
    {
      path: '/myInvoice',
      component: myInvoice // 我的发票
    },

    {
      path: '/personalCenter', // 个人中心
      component: personalCenter
    },

    {
      path: '/invoiceCheck/:id',
      component: invoiceCheck // 发票检查
    },
    {
      path: '/editInvoice/:id',
      component: editInvoice // 编辑发票
    },
    {
      path: '/invoiceLabel/:id',
      component: invoiceLabel // 发票标签
    },
    {
      path: '/fapiaoyanzhen',
      component: fapiaoyanzhen // 发票验证
    },

    {
      path: '/messages/:id',
      component: messages // 发票验证出错
    },

    {
      path: '/invoiceCheckIndex/:id',
      component: invoiceCheckIndex // 发票验真首页
    },

    {
      path: '/ceshi',
      component: ceshi // 发票验真首页
    },
    {
      path: '/imageDetail/:id',
      component: imageDetail // 图片详情页
    },
    {
      path: '/takePhoto',
      component: takePhoto // 拍照技巧
    },
    {
      path: '/wk_login',
      component: wkLogin // 五矿-登录
    },
    {
      path: '/mobileLogin',
      component: mobileLogin // 五矿-手机登录
    },

    // {
    //   path: '/showInvoices',
    //   component: showInvoices // 五矿-显示发票
    // },
    { // 发票列表 - new
      path: '/showInvoices',
      component: resolve => { require(['@/wk_components/invoices'], resolve) }
    },
    {
      path: '/print',
      component: print // 五矿-打印
    },
    {
      path: '/printInvoices',
      component: printInvoices // 五矿-打印报销完成的发票
    },
    {
      path: '/mobileBind',
      component: mobileBind // 五矿-手机绑定
    },

    {
      path: '/ceshi1',
      component: ceshi1 // 五矿-手机绑定
    },
    {
      path: '/mobileBindWx',
      component: mobileLoginPC // 五矿-手机绑定网页版
    }
  ]
})
