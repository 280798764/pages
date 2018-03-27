<template>
  <div class="invoiceCollection-wrap">
    <!--<input type="file" style="width:100%;height:55px;" onchange=""/>-->
    <!--头部-->
    <!--<input type="file" style="width:100%;height:55px;" @change="getFile($event)"/>-->
    <header>
        <span class="back"  onclick="window.history.go(-1)"><i class="icon-arrow_lift"></i>返回</span>
        <span>发票管理</span>
        <span class="close" @click="closeWindow()">关闭</span>

    </header>
    <div class="discern" v-show="discernCount>0">{{discernCount}}张发票正在识别中</div>
    <!--中间盒子-->
    <!--拍摄技巧-->
    <router-link to="/takePhoto">
      <div class="takePhoto">拍摄技巧</div>
    </router-link>

    <router-link to="/wk_login">
      <h1>pc-web</h1>
    </router-link>

    <div class="invoiceCollection-content">

      <!--相机盒子-->
      <div class="content" @click="showShade(true)">

        <input type="file" id="upload" @change="getFile($event)" multiple="multiple" class="input" >
      </div>
    </div>
    <!--底部-->
    <div class="bottomNav">
      <ul>
        <li>
          <!--<router-link to="invoiceCollection">
            <div class="left"></div>
            <p>发票归集</p>
          </router-link>-->
        </li>
        <li>
          <router-link to="/myInvoice">
          <!--<router-link v-bind:to="{path:`/myInvoice/${this.$route.params.id}`}">-->
          <!--<router-link v-bind:to="{path:`/myInvoice/${this.user}`}">-->

            <div class="left middle"></div>
            <p>我的发票</p>
          </router-link>
        </li>
        <li>
          <!--<router-link to="/personalCenter">
            <div class="left right"></div>
            <p>个人中心</p>
          </router-link>-->
        </li>
      </ul>
    </div>

    <!--遮罩层-->
  <!--  <transition name="fade">
      <div class="shade"  v-show="shadeShow">
        <form action="">
          <ul class="content">
            <li>
              &lt;!&ndash;<label for="upload" style="display: block;height: 65px">&ndash;&gt;
                <span class="common">1 </span>
                <span class="upload">上传照片</span>
                &lt;!&ndash;<input type="file" name="file" accept="image/*" multiple="multiple" id="upload" @click="change" ref="file">&ndash;&gt;
                <input type="file" id="upload" @change="getFile($event)" multiple="multiple"  />
              &lt;!&ndash;</label>&ndash;&gt;
            </li>
            <li>
              <span class="common scan"> 1</span>
              <span >扫二维码</span>
            </li>
            <li>
              &lt;!&ndash;<label for="upload" style="display: block;height: 65px">&ndash;&gt;
                <span class="common photograph">1 </span>
                <span >拍照上传</span>
                &lt;!&ndash;<input type="file" name="file" accept="image/*" multiple="multiple" id="upload">&ndash;&gt;
                <input type="file" id="upload" @change="getFile($event)" multiple="multiple"  accept="image/*" />
              &lt;!&ndash;</label>&ndash;&gt;
            </li>
            <li>
              <span class="common close " @click="showShade(false)"></span>
            </li>
          </ul>
        </form>

      </div>
    </transition>-->
  </div>
</template>
<script>
  import axios from 'axios'
  import http from '../../http'
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import global_ from '../../components/tool/Global'
//  import Exif from 'exif-js'
  export default {
    data(){
      return{
        shadeShow:false,
//        files:[],
        file:'',
        token:'',
        discernCount:'',  //识别的数量
        search:'',
        source:'',
        otId:'',
        str:'',
        user:'',
        time:''
      }
    },
    created(){
      const that = this;
      const params = this.getRequest()
      this.source = params.source
      this.otId = params.otId
      console.log(this.source,111)
      console.log(this.otId,222)
      const parm={
        dataMap:JSON.stringify({
          'source':this.source+'',
          'otId':this.otId+''
        }),
        method:'xforceplus.sys.qToken'
      }
      /*获取token*/
      http.post('/issp/ApiService',parm)
        .then((response)=>{
          console.log(response.data)
          this.token=response.data.token
          sessionStorage.setItem('userInfo', JSON.stringify(this.token));
          console.log(sessionStorage.userInfo)
        }).catch((error)=>{
        console.log(error)
      })
     /*定时刷新页面*/
     this.time=setInterval(function(){
         const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
         const Url=global_.httpUrl+userInfo+'&method=xforceplus.toc.countDiscern'
         const dataMAP={}
         http.post(Url,dataMAP)
           .then((response)=>{
             const countData=response.data
             if(countData.status==1){
               that.discernCount=countData.count

             }
           })
     }
     ,8000)
    },
    methods:{
      closeWindow(){
        window.opener = null;//禁止某些浏览器的一些弹窗
        window.open('','_self');
        window.close()
      },
      getRequest(){
        let url = location.search;//统一，本地启使用这个访问http://localhost:8080/?otId=chq&source=chq#/invoiceCollection
        console.log("url="+url)
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
          let str = url.split("?")[1]
          this.user=str
          //console.log("str="+str)
          var strs = str.split("&");
          for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      },
      showShade(isShow){
        this.shadeShow=isShow
      },
      resetUpload(){
        document.getElementById("upload").value = "";//#6101,修复第二次选择无效的问题(file的onchange事件只能在刷新页面后，执行一次，第二次就不执行了)
      },
      getFile(event) {
        let files = event.target.files;
        let vm = this;
        if(files.length<1){
          return;
        }
        if(files.length>6){
          MessageBox.alert('上传图片不能超过六张', "提示")
          this.resetUpload();
          return;
        }
        //图片类型校验
        for(let i=0; i< files.length; i++ ){
          if(!new RegExp("(jpg|jpeg|png|pdf)+","gi").test(files[i].type)){
            MessageBox.alert("文件上传：文件类型必须是JPG、JPEG、PNG、PDF");
            this.resetUpload();
            return;
          }
          if(files[i].type==="application/pdf" && files[i].size/1024>1024){
            MessageBox.alert("PDF文件不能大于1M");
            this.resetUpload();
            return;
          }
        }
        let images=[]
        //追加文件数据
        for(let i=0; i< files.length; i++ ){
          var fileReader = new FileReader();
          fileReader.readAsDataURL(files[i]);
          if(new RegExp("(jpg|jpeg|png)+","gi").test(files[i].type)){
            //图片上传
            fileReader.onload = function () {
              var IMG = new Image();
              IMG.src = this.result;
              IMG.onload = function () {
                const w = this.naturalWidth, h = this.naturalHeight;
                let resizeW = 0, resizeH = 0, multiple=1;
                // maxSize 是压缩的设置，设置图片窄边最大为640，另一边等比缩放，
                const maxSize = 640;
                if(w>h){
                  resizeH = maxSize;
                  multiple = h/maxSize;
                  resizeW = w/multiple;
                }else{
                  resizeW = maxSize;
                  multiple = w/maxSize;
                  resizeH = h/multiple;
                }
                var canvas = document.createElement('canvas'),
                  ctx = canvas.getContext('2d');
                canvas.width = resizeW;
                canvas.height = resizeH;
                ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
                var base64 = canvas.toDataURL('image/jpeg');
                //const image = base64.replace("data:image/jpeg;base64,",'');
                images.push(base64)
                if(images.length===files.length){
                  vm.imageUpload(images)
                }
              }
            };
          }else if(new RegExp("(pdf)+","gi").test(files[i].type)){
            //pdf上传
            fileReader.onload = function () {
              images.push(this.result);
              if(images.length===files.length){
                vm.imageUpload(images)
              }
            };
          }
        }
        console.log(fileReader,99)
      },
      imageUpload(images){
       // alert(images)
        //alert( window.URL.createObjectURL(images))
        this.resetUpload();
        console.log("images="+images.length)
        let backNumber = 0;
        Indicator.open({
          text: '上传中...',
          spinnerType: 'fading-circle'
        });
        for(let i=0;i<images.length;i++){
          const dataMap = {
            dataMap: JSON.stringify(
              {
                "image": images[i]
              }
            )
          }
          this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
          const url=global_.httpUrl+this.userInfo+'&method=xforceplus.toc.imageUpload2'
          http.post(url, dataMap)
            .then((response) => {
              if(response.data.status===1){
                console.log(response,999)

                backNumber++;
                if(backNumber==images.length){

                  Indicator.close();
                  MessageBox.alert('上传成功', "提示")
                }
              }else{
                Indicator.close();
                MessageBox.alert('上传失败：'+data.msg, "提示")
              }
            }).catch((error)=>{
            Indicator.close();
            console.log(error)
          })
        }
      }
    },
    mounted(){
      //alert('in...');
      const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
      const Url=global_.httpUrl+userInfo+'&method=xforceplus.toc.countDiscern'
      const dataMAP={}
      http.post(Url,dataMAP)
        .then((response)=>{
          const countData=response.data
          if(countData.status==1){
            this.discernCount=countData.count

          }
        })
    },
    beforeDestroy(){
      clearInterval(this.time)
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .invoiceCollection-wrap
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color: red
    background: -webkit-linear-gradient( #0e91ee 5%, #28b3ff 30%, #4ecdff 100% );
    header
      width 100%
      height 44px
      line-height 44px
      background-color #433f3c
      text-align center
      color white
      font-size 16px
      font-weight 600
      font-family Algerian
      .back
        position absolute
        left 10px
        top 0
        .icon-arrow_lift
          font-size 18px
          margin-right 5px
          position relative
          left 0px
          top 2px
      .close
        position absolute
        left 85%
        top 0
    .discern
      position absolute
      left 0
      top 44px
      width 100%
      height 30px
      line-height 30px
      text-align center
      font-size 15px
      color #7ac5ec
      background-color  #d4e9fa
    .takePhoto
      position absolute
      top 100px
      right 35px
      height 30px
      line-height 30px
      color rgba(255, 255, 255, 0.57)
      font-size 16px
      z-index 11
    .invoiceCollection-content
      position absolute
      height 100%
      width 100%
      bottom: 0;
      padding-bottom: 0;
      margin-bottom: 0;

      .content
        position absolute
        width 192px
        height 192px
        left 50%
        top 50%
        margin-left -96px
        margin-top -96px
        background url("camera.png") no-repeat center  center
        background-size 105%
        .input
          background-color: red
          width 100%
          height 100%
          opacity 0

    .bottomNav
      position absolute
      left 0
      bottom 0
      width 100%
      height 170px
      line-height 40px
      color gold
      box-sizing border-box
      padding 0 23px
      li
        width 100%
        /*width 33.3333%*/
        float left
        text-align center
        font-size 14px
        p
          color #fff
        .left
          width 90px
          height 90px
          background url("Group 6.png") no-repeat center center #fff
          background-size 65%
          margin 0 auto
          border-radius 50%
          box-sizing border-box
          border-width 7px
          border-style solid
          border-color #73d2ff
        .middle
          background url("Group.png") no-repeat center center #fff
          background-size 48%
        .right
          background url("Group 2.png") no-repeat center center #fff
          background-size 50%
    .shade
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background-color: rgba(0, 0, 0, 0.7)
      &.fade-enter-active, &.fade-leave-active
        transition opacity  0.5s
      &.fade-enter, &.fade-leave-to
        opacity 0
      .content
        position absolute
        left 0
        bottom 99px
        width 100%
        height 320px
        box-sizing border-box
        padding-left 11.6%
        li:nth-of-type(4)
          position relative
          .close
            position absolute
            top 0
            left -5px
        li
          position relative
          height 65px
          line-height 65px
          margin-bottom 20px
          input
            opacity 0
          #upload
            position absolute
            top 0px
            left 0px
            color transparent
            background-color transparent
            height 100%
            width 100%
            z-index 2

            //display none
          span
            color #fff
          .upload
            position absolute
            z-index 2
        .common
          display inline-block
          width 65px
          height 65px
          border-radius 50%
          /*background  url("photo.png") no-repeat center center #41b4ec*/
          background-size 55%
          color #41b4ec
          margin-right 13px
        .scan
          background  url("scan.png") no-repeat center center #41b4ec
          background-size 55%
        .photograph
          background  url("photograph.png") no-repeat center center #41b4ec
          background-size 55%
        .close
          background  url("close.png") no-repeat center center
          background-size 85%
          width 78px
          height 78px

</style>
