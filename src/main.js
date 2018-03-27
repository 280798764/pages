
import Vue from 'vue'
import router from './router'
import app from './app.vue'
import './common/stylus/fonts.css'
import  ElementUI from 'element-ui'
Vue.use(ElementUI)


import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
global.bus = new Vue();
import 'mint-ui/lib/style.css'
import 'viewerjs/dist/viewer.min.css';

import './service/http';

new Vue({
  el:'#app',
  render:h=>h(app),
  router
})

