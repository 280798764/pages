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
        <p class="MC_top">即将绑定票税助手网页版，请确认是本人操作</p>
        <ul>
          <li>获得你的个人信息（手机、微信号等）</li>
          <li>获得你的发票信息（抬头名称、税号等）</li>
        </ul>
      </div>
    </div>
    <footer class="mobileLogin_footer">
      <p class="affirm" @click="loginPC()">确认绑定</p>
      <p class="cancel" @click="closeWindow()">取消</p>
    </footer>
    <div class="box" v-show="isShowQR">
      <div class="qrcode"><img :src="qrcodeSrc" alt=""></div>
    </div>
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
        isShowQR:false,
        qrcodeSrc:require('./qrcode_dev.jpg')
      }
    },
    mounted(){
      global_.env == 'dev'?this.qrcodeSrc=require('./qrcode_dev.jpg'):this.qrcodeSrc=require('./qrcode_prod.jpg')
    },
    methods: {
      closeWindow(){
        global_.closeWXWindow()
      },
      getRequest(){
        let url = location.search;
        console.log("url=" + url)
        url = url.replace('#/mobileBindWx', '')
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
      loginPC(){
        const params = this.getRequest()
        let code = params.code
        let state = params.state
        let phone = ''
        let rid = ''
        if (state != undefined && state.indexOf('_') > -1) {
          var arr = state.split('_');
          if (arr.length > 2) {
            state = arr[0];
            phone = arr[1];
            rid = arr[2];
          }
        }
        const Url = global_.httpLink + '/issp/ApiService?method=xforceplus.sys.bindTokenPhoneFromZeus&c=' + code + '&s=' + state + '&phone=' + phone + '&rid=' + rid
        const dataMAP = {}
        http.post(Url, dataMAP)
          .then((response) => {
            console.log(response.data)
            if (response.data.status == 1) {
              global_.closeWXWindow();
            } else if (response.data.status == -2) {
              this.isShowQR = true
            } else {
              MessageBox.alert(response.data.msg, "提示").then(action => {
                global_.closeWXWindow();
              });
            }
          }).catch((error) => {
          console.log(error)
        })
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

  .box
    width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:0.9;
    z-index:900;
    .qrcode
      position:absolute;
      top:25%;
      left:16%;

</style>
