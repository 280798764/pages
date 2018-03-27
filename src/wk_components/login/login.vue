<template>
  <div class="login_wraper">
    <div class="login_header">
        <div class="login_headerLeft">
          <img src="./login.png">
        </div>
      <div class="login_headerRight">
       <!-- <router-link to="/showInvoices">
          <span>注册</span>
        </router-link>-->

         <!-- <span class="login_btn">登录</span>-->
      </div>
    </div>
    <div class="login_content">
      <div class="login_contentLeft"><img src="./money.png"></div>
      <div class="login_contentRight">
        <div class="login_contentRight_left">
          <span><img src="./center.png"></span>
        </div>
        <div class="login_contentRight_right">
          <p class="login_title">登录票税助手</p>
          <p class="login_nav"><span  v-bind:class="{ active: isActive }" @click="erweima_show">扫码登录</span><span class="gap">|</span><span @click="telLogin_show" v-bind:class="{ active: telActive }">手机号登录</span></p>
          <div id="qrcode" class="erweima" v-show="show_erweima">
            <img :src="value" alt="" id="img">
          </div>
          <input type="text" id="getval" :value="value" placeholder="修改这个值改变二维码" style="display: none">
          <div class="telLogin" v-show="show_telLogin">
            <p><span class="tel_left"></span><input type="text" placeholder="手机号" v-model="doLoginNumber"></p>
            <span class="personTel" v-show="personTel"><img src="./wrong.png" alt="" >手机号码格式错误,请正确填写您的号码！</span>
            <p class="password_wrap"><span class="password_left"></span><input :type="pword.type" placeholder="密码" class="password" v-model="loginPassword"><img
              :src="pword.srcImg" @click="changeType"></p>
           <!-- <h3>忘记密码？</h3>-->
            <p class="btn" @click="doLogin" >立即登录</p>
            <!--<el-button :plain="true" @click="open2" class="open">立即登录</el-button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from '../wk_common/js/qrcode'
  import global_ from '../../components/tool/Global'
  import http from '../wk_common/js/http'
  export default{
    data(){
      return{
        show_erweima:true,
        show_telLogin:false,
        isActive:true,
        telActive:false,
        i:false,
        value:"",
        doLoginNumber:'',
        personTel:false,
        pword:{
          type:'password',
          srcImg:require("./eye-off.png")
        },
        userId:"",
        loginPassword:"",
        time:"",
        //getConfirmId:"",
        getTokenXunHuan:"",
        confirmId:"",
        token:""

      }
    },


    mounted() {

      /*获取随机数*/
      const dataMap={
        dataMap:JSON.stringify({
          "flag" : 1
        }),
      }
      const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"  //测试
      //const apikey="YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D"  //上线使用
     const url=global_.httpUrl+apikey+'&method=xforceplus.toc.getRandomSymbol'
      //const url=this.httpUrl+apikey+'&method=xforceplus.toc.getRandomSymbol'
      http.post(url,dataMap)
        .then((response=>{
          console.log(response,"获取随机数")
          //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
          if(response.data.status==1){
           this.value=response.data.url
            this._getQart()
            console.log(this.value,"MMMM")
            console.log(this.httpUrl,444444444)
            this.confirmId=response.data.confirmId

          }
        }))


      /*循环获取登录状态*/
      /*二维码登录*/

      this.time=setInterval( ()=> {

        this.getConfirmId=sessionStorage.getItem('confirmId')
        const dataMap={
          dataMap:JSON.stringify({
            "confirmId":this.confirmId
          }),
        }
        const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D" //测试
        //const apikey="YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D" //上线使用

        const url=global_.httpUrl+apikey+'&method=xforceplus.toc.getConfirmStatus'

        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"循环获取登录状态")

            if(response.data.status==1){
              this.getTokenXunHuan=response.data.token
              this.userId=response.data.userId
              sessionStorage.setItem('token', (this.getTokenXunHuan));
              sessionStorage.setItem('userId', (this.userId));
              sessionStorage.setItem('mobile', (response.data.mobile));
              sessionStorage.setItem('username', (response.data.userName));
              // IE 下获取localStorage
              localStorage.setItem('mobile', (response.data.mobile));
              localStorage.setItem('username', (response.data.userName));

              this.$message({
                message: '登录成功',
                type: 'success'
              })

              this.$router.push("/showInvoices")

            }else if(response.data.status==-1){
              this.$message({
                //message: "账户在票稅助手绑定信息与商家自助不一致",
                message: "您在“票税助手公众号”和“票易通账户”绑定的手机号不一致",
                type: 'warning'
              });
            }else{
            }
          }))

        console.log('time')

      },3000)

    },


    methods:{

      /*密码密文和明文切换*/
      changeType(){
        this.pword.type=this.pword.type==='password'?'text':'password'
        this.pword.srcImg=this.pword.srcImg==require("./eye-off.png")?require("./eye-on.png"):require("./eye-off.png");
      },
      erweima_show(){
        this.show_erweima=true
        this.show_telLogin=false
        this.isActive=true
        this.telActive=false
      },
      telLogin_show(){
        this.show_telLogin=true
        this.show_erweima=false
        this.telActive=true
        this.isActive=false
      },
      /*element ui*/
     /* open2() {
        this.$message({
          message: '登录成功',
          type: 'success'
        });
      },*/

      /*二维码*/
      _getQart: function() {
        if(this.i==false){
          var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 200,//设置宽高
            height : 200,
          });
          //qrcode.makeCode(document.getElementById("getval").value);
          qrcode.makeCode(this.value)
          var getval=document.getElementById('img')
        }
        this.i = true;
      },
      doLogin(){
        /*校验手机号码*/
        let personPhone = this.doLoginNumber.trim()
        let regex_isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
        let regex_isMobile = /^((\+?86)|(\(\+86\)))?(1[3|4|5|7|8][0-9]{9})$/
        if(personPhone !=''){
          if(regex_isMobile.test(personPhone) || regex_isPhone.test(personPhone)){
            this.personTel=false
          }else{
              this.personTel=true
          }
        }else{
          this.personTel=false
        }

        /*请求接口*/
        const dataMap={
          dataMap:JSON.stringify({
              "password" : this.loginPassword,
              "username" : this.doLoginNumber
          }),
        }
        const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"  //测试
        //const apikey="YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D"  //上线使用
        const url=global_.httpUrl+apikey+'&method=xforceplus.toc.login'
        http.post(url,dataMap)
          .then((response=>{

            console.log(response,"登录")

            if(response.data.status==-1){
              const messages=response.data.message
              this.$message({
                message: messages,
                type: 'error',
                duration:"2000"
              });
            }

            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
             // console.log(response.data.userId,"userId")
              this.userId=response.data.userId
              //sessionStorage.setItem('wk_userId', (this.userId));
              console.log(sessionStorage.userId,9999)
              //console.log(sessionStorage.wk_userId,9999)
              sessionStorage.setItem('mobile', response.data.mobile);
              sessionStorage.setItem('username', response.data.username)
              sessionStorage.setItem('userId', response.data.userId);
              sessionStorage.setItem('token', response.data.token);

              console.log( this.userId, this.mobile, this.username,this.token,555555);

             /* this.$message({
                message: '登录成功',
                type: 'success'
              });*/

              this.$router.push("/showInvoices")

            } else{
              if(this.doLoginNumber==""){
                this.$message({
                  message: "请输入手机号",
                  type: 'warning'
                });
              }else if(this.loginPassword==""){
                this.$message({
                  message: "请输入密码",
                  type: 'warning'
                });
              }

             /* this.$message({
                message: messages,
                type: 'warning'
              });*/
            }

          }))


      },

    },
    beforeDestroy(){
      clearInterval(this.time)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #qrcode
    //background-color: transparent
    background-color: transparent !important
    width 168px !important
    height 168px
    margin 0 !important
    img
      width 100%
  #canvas
    width 200px !important
    height 200px !important
    background-color: red
  .login_wraper
    position relative
    width 100%
    height  790px
    background-color:#f6f7fb
  .active
    color #9b9b9b
    font-weight bold
  .login_header
    height 120px
    line-height 120px
    width 100%
    .login_headerLeft
      width 100px
      height 20px
      float left
      margin-left 100px
      img
        width 100%
    .login_headerRight
      float right
      margin-right 100px
      span
        display inline-block
        width 100px
        height 30px
        line-height: 30px
        text-align center
        font-size 16px
        margin-left 30px
        color #9b9b9b
      .login_btn
        border-radius 20px
        border 1px solid #41b4ec
        color  #41b4ec
  .login_content
    overflow hidden
    margin-top 50px
    .login_contentLeft
      float left
      width 160px
      height 200px
      margin-top 250px
      img
        width 100%
    .login_contentRight
      float left
      width 800px
      height 400px
      box-shadow 0 0 30px #cbd9e4
      background-color: #fff
      margin-left 240px

      .login_contentRight_left
        float left
        width 50%
        height 100%
        line-height 1
        position relative
        background: url("./circle.png") no-repeat center center
        -webkit-background-size: 70%
        span
          position absolute
          left 50%
          top 50%
          margin-left -30px
          margin-top -30px
          display inline-block
          width 60px
          height 60px
          img
            width 100%
      .login_contentRight_right
        margin-top 50px
        width 50%
        float left
        box-sizing border-box
        padding-left  20px
        .login_title
          font-size 22px
          color #9b9b9b
          margin-bottom 15px
        .login_nav
          font-size 13px
          margin-bottom 25px
          color #bfbfbf
          span
            cursor:pointer
        .gap
          margin 0 15px
        .erweima
          width 140px
          height 140px
          img
            width 100%
        .telLogin
          position relative
          .personTel
            position absolute
            color red
            left 20px
            top 29px
            img
              width 12px
              height 12px
              vertical-align middle
              margin-right 5px
          h3
            color #bfbfbf
            margin-top 10px
          .btn
            background-color #41b4ec
            line-height 25px
            text-align center
            color #fff
            font-size 12px
            margin-top 80px
            border 1px solid  #41b4ec
          p
            width 250px
            height 25px
            margin-bottom 15px
            border 1px solid #dfdfdf
            input
              width 210px
              height 25px
              line-height 30px
              float left
              padding-left 20px
              box-sizing border-box
              outline none
              &::-webkit-input-placeholder
                color: #dfdfdf
            .tel_left,.password_left
              float left
              display inline-block
              width 39px
              border-right 1px solid  #dfdfdf
              height 25px
              background url("./iconTel.png") no-repeat center center #fff
            .password_left
              background: url("./iconPassword.png") no-repeat center center #fff
            /*.password
              background url("./eye-off.png") no-repeat center  right 10px*/
          .password_wrap
            position relative
            margin-bottom 0px
            .clickEye
              display inline-block
            input
              width 210px
            img
              position absolute
              right 15px
              width 18px
              vertical-align middle
              margin-top 7px
              padding-bottom 10px


</style>
