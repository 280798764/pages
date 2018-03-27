<template>
  <div class="mobile_login_wraper">
    <header class="mobileLogin_close">
    </header>
    <div class="mobileLogin_content">
      <div class="mobileLogin_content_top">
        <p class="invoice"><img src="./piao.png" alt=""></p>
        <p class="text">票税助手</p>
      </div>
      <div class="mobileLogin_content_bottom">
        <p class="MC_top">即将登录票税助手网页版，请确认是本人操作</p>
        <ul>
          <li>获得你的个人信息（手机、微信号等）</li>
          <li>获得你的发票信息（抬头名称、税号等）</li>
        </ul>
      </div>
    </div>
    <footer class="mobileLogin_footer">
      <p class="affirm" @click="getLoginState">确认登录</p>
      <p class="cancel" @click="closeWindow()">取消</p>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import http from '../wk_common/js/http'
  import global_ from '../../components/tool/Global'
  import {MessageBox} from 'mint-ui';
  export default{
    data(){
      return {
        randomStr: '',
        getPcToken: '',
        userId:''


      }
    },
    mounted(){
      const params = this.getRequest()
      let code = params.code
      let state = params.state
      if (state != undefined && state.indexOf('_') > -1) {
        var arr = state.split('_');
        if (arr.length > 1) {
          state = arr[0];
          this.randomStr = arr[1];
        }
      }
      //const Url = 'http://www.e-fp.cn' + '/issp/ApiService?method=xforceplus.sys.gtoken&c=' + code + '&s=' + state
      const Url = global_.httpLink + '/issp/ApiService?method=xforceplus.sys.gtoken&c=' + code + '&s=' + state
      const dataMAP = {}
      http.post(Url, dataMAP)
        .then((response) => {
          console.log(response.data)
          if (response.data.status == 1) {
            this.token = response.data.token
            this.userId = response.data.userId
            sessionStorage.setItem('pcToken',(this.token));
            sessionStorage.setItem('userId', (this.userId));

            console.log(sessionStorage.pcToken)
            this.getPcToken =  (sessionStorage.getItem('pcToken'))
          } else {
            MessageBox.alert(response.data.msg, "提示")
          }
        }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      closeWindow(){
        global_.closeWXWindow()
      },
      getRequest(){
        let url = location.search;
        console.log("url=" + url)
        url = url.replace('#/mobileLogin', '')
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
          let str = url.split("?")[1]
          var strs = str.split("&");
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
          }
        }
        return theRequest;
      },
      getLoginState(){
        sessionStorage.setItem('confirmId', JSON.stringify(this.randomStr))
        /*获取登录状态*/
        const dataMap = {
          dataMap: JSON.stringify({
            "confirmId": this.randomStr,
            "token": this.getPcToken
          }),
        }
        const apikey = this.getPcToken
        const url = global_.httpUrl + apikey + '&method=xforceplus.toc.setConfirmStatus'
        http.post(url, dataMap)
          .then((response => {
            console.log(response, "获取登录状态")
            if (response.data.status == 1) {
              global_.closeWXWindow();
            } else {
              MessageBox.alert(response.data.message, "提示").then(action => {
                global_.closeWXWindow();
              });
            }
          }))
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .mobile_login_wraper
    width 100%
    height 100%
    .mobileLogin_close
      width 100%
      height 50px
      line-height 50px
      font-size 18px
      padding-left 5%
      color #030303
    .mobileLogin_content
      .mobileLogin_content_top
        width 100%
        height 330px
        box-sizing border-box
        padding-top 100px
        .invoice
          width 80px
          height 80px
          margin 0 auto
          text-align center
          img
            width: 100%;
        .text
          text-align center
          margin-top 10px
          font-size 18px
          color #5d5d5d
          font-weight bold
      .mobileLogin_content_bottom
        width 80%
        margin 0 auto
        .MC_top
          height: 35px
          line-height 35px
          font-size 16px
          color #5d5d5d
          text-align center
        ul
          width 90%
          margin 0 12%
          li
            list-style disc
            height 30px
            line-height 30px
            color #9b9b9b
            font-size 14px
    .mobileLogin_footer
      width 100%
      margin-top 50px
      background-color #fff
      p
        height 50px
        width 90%
        margin 0 auto
        line-height: 50px;
        font-size 20px
        color #fff
      .affirm, .cancel
        background-color: #41b4ec
        text-align center
        border-radius 5px
      .cancel
        background-color: #fff
        color #dfdfdf
        border 1px solid #dfdfdf
        margin-top 20px

</style>
