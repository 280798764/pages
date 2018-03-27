<template>
  <div>
    <div class="personalCenter-wrap">
      <!--头部-->
      <header v-show="not_wx">

        <!--<span class="back" onclick="window.history.go(-2)">
          <i class="icon-arrow_lift">
          </i>返回
        </span>-->
        <router-link to="/myInvoice" class="light">
       <span class="back" >
        <i class="icon-arrow_lift">
        </i>返回
      </span>
        </router-link>


        <span>发票详情</span>
      </header>
      <!--中部-->
      <div class="personalCenter_content">
        <div id="triangle">
        </div>
        <!--尚未验真-->
        <div class="wei" v-show="result.invoice.verifyFlag==-1" v-if="result.invoice" >

        </div>

        <!--正在验真-->
        <div class="zhong" v-show="result.invoice.verifyFlag==0" v-if="result.invoice" >

        </div>
        <!--验真通过-->
        <div class="guo" v-show="result.invoice.verifyFlag==1" v-if="result.invoice">

        </div>
        <!--验真未通过-->
        <div class="fail" v-show="result.invoice.verifyFlag==2" v-if="result.invoice">

        </div>


        <div class="personalCenter_content_c">
          <!-- <div class="top dedicated noneType" id="noneType" v-show="result.invoice.invoiceType == '' "  v-if="result.invoice">
             <h2>未识别出发票类型</h2>
             <span class="delete" @click="deleteInvoice"></span>
           </div>-->
          <!--
                    <div class="top normal" v-show="result.invoice.invoiceType=='c'" v-if="result.invoice">
                      <span class="delete" @click="deleteInvoice"></span>
                    </div>
                    <div class="top dedicated" v-show="result.invoice.invoiceType=='s'" v-if="result.invoice">
                      <span class="delete" @click="deleteInvoice"></span>
                    </div>

                    <div class="top electronic" v-show="result.invoice.invoiceType=='ce'" v-if="result.invoice">
                      <span class="delete" @click="deleteInvoice"></span>
                    </div>-->
          <!--重新制作的发票类型-->
          <div class="invoiceType electronic " v-show="result.invoice.invoiceType=='ce'" v-if="result.invoice">   <!--电子发票-->
            <span class="delete" @click="deleteInvoice"></span>
            <img src="./electronic.png" >
          </div>
          <div class="invoiceType normal" v-show="result.invoice.invoiceType=='c'" v-if="result.invoice">    <!--普通发票-->
            <span class="delete" @click="deleteInvoice"></span>
            <img src="./normal.png" >
          </div>
          <div class="invoiceType dedicated"  v-show="result.invoice.invoiceType=='s'" v-if="result.invoice" >    <!--专用发票-->
            <span class="delete" @click="deleteInvoice"></span>
            <img src="./dedicated.png" >
          </div>
          <div class="invoiceType noneType" v-show="result.invoice.invoiceType == '' "  v-if="result.invoice">    <!--未识别出发票类型-->
            <span class="delete" @click="deleteInvoice"></span>
            <span>未识别出发票类型</span>
            <!--<img src="./invoice.png" >-->
          </div>
          <div class="invoiceType noneType" v-show="result.invoice.invoiceType == 'a' "  v-if="result.invoice">    <!--您上传的图片不是发票-->
            <span class="delete" @click="deleteInvoice"></span>
            <span>您上传的图片不是发票</span>
            <!--<img src="./invoice.png" >-->
          </div>
          <div class="middle">
            <!--发票头部-->
            <div class="middle_top">
              <ul>
                <li @click="showPurchaserDetailName"><span>付款方</span><span class="pull" ref="tiggle"></span><span v-if="result.invoice">{{result.invoice.purchaserName}}</span></li>
                <!--发票抬头下拉 付款方-->
                <transition name="pull">
                  <div class="purchaserDetail" v-show="purchaserDetailNameShow">
                    <p><span>纳税人识别号：</span><span  class="short" v-if="result.invoice">{{result.invoice.purchaserTaxNo}}</span></p>
                    <p><span>地址、电话：</span><span v-if="result.invoice">{{result.invoice.purchaserAddress}}</span></p>
                    <p><span></span><span v-if="result.invoice">{{result.invoice.purchaserTel}}</span></p>
                    <p><span>开户行账户：</span><span v-if="result.invoice">{{result.invoice.purchaserBankName}}</span></p>
                    <p><span></span><span v-if="result.invoice">{{result.invoice.purchaserBankAccount}}</span></p>
                  </div>
                </transition>
                <!--<transition name="pull">
                  <div class=" nameDetail " id="sellerDetail" v-show="purchaserDetailNameShow">
                    <ul>
                      <li><span>纳税人识别号：</span><span  class="short" v-if="result.invoice">{{result.invoice.purchaserTaxNo}}</span></li>
                      <li><span>地址、电话：</span><span v-if="result.invoice">{{result.invoice.purchaserAddress}}</span></li>
                      <li><span></span><span v-if="result.invoice">{{result.invoice.purchaserTel}}</span></li>
                      <li><span>开户行账户：</span><span v-if="result.invoice">{{result.invoice.purchaserBankName}}</span></li>
                      <li><span></span><span v-if="result.invoice">{{result.invoice.purchaserBankAccount}}</span></li>
                    </ul>
                  </div>
                </transition>-->
                <li @click="showDetailName" ><span>收款方</span><span class="pull" ref="detailName" ></span><span v-if="result.invoice">{{result.invoice.sellerName}}</span></li>
                <!--发票抬头下拉 收款方-->
                <transition name="pull">
                  <div class="sellerDetail" v-show="detailNameShow">
                    <p><span>纳税人识别号：</span><span  class="short" v-if="result.invoice">{{result.invoice.sellerTaxNo}}</span></p>
                    <p><span>地址、电话：</span><span v-if="result.invoice">{{result.invoice.sellerAddress}}</span></p>
                    <p><span></span><span v-if="result.invoice">{{result.invoice.sellerTel}}</span></p>
                    <p><span>开户行账户：</span><span v-if="result.invoice">{{result.invoice.sellerBankName}}</span></p>
                    <p><span></span><span v-if="result.invoice">{{result.invoice.sellerBankAccount}}</span></p>
                  </div>
                </transition>
              </ul>
            </div>

            <!--<transition name="pull">
              <div class=" nameDetail" v-show="detailNameShow">
                <ul>
                  <li><span>纳税人识别号：</span><span v-if="result.invoice">{{result.invoice.sellerTaxNo}}</span></li>
                  <li><span>地址、电话：</span><span v-if="result.invoice">{{result.invoice.sellerAddress}}</span></li>
                  <li><span></span><span v-if="result.invoice">{{result.invoice.sellerTel}}</span></li>
                  <li><span>开户行账户：</span><span v-if="result.invoice">{{result.invoice.sellerBankName}}</span></li>
                  <li><span></span><span v-if="result.invoice">{{result.invoice.sellerBankAccount}}</span></li>
                </ul>
              </div>
            </transition>-->
            <!--虚线-->
            <dashed></dashed>
            <!--发票中部-->
            <div class="middle_top ">
              <ul>
                <li><span>校验码</span><span class="">></span><span v-if="result.invoice">{{result.invoice.checkCode}}</span></li>
                <li><span>发票金额</span><span class="">></span><span v-if="result.invoice">¥{{result.invoice.amountWithTax}}</span></li>
                <li><span>开票日期</span><span class="">></span><span v-if="result.invoice">{{result.invoice.paperDrewDate}}</span></li>
                <li><span>发票号码</span><span class="">></span><span v-if="result.invoice">{{result.invoice.invoiceNo}}</span></li>              <!---->
                <li><span>发票代码</span><span class="">></span><span v-if="result.invoice">{{result.invoice.invoiceCode}}</span></li>  <!--011001200444-->
                <li  @click="showDetail"><span>商品明细</span><span class="pull" ref="detail"></span><span>详情</span></li>
              </ul>
            </div>
            <!--发票明细下拉-->
            <transition name="pull">
              <div id="productDteail_detail" v-show="detailShow">
                <table>
                  <tr>
                    <td>名称</td>
                    <td>金额</td>
                    <td>税率（%）</td>
                  </tr>
                  <tr v-for="detail in result.details" v-if="result.details">
                    <td><p>{{detail.cargoName}}</p></td>
                    <td>{{detail.amountWithTax}}</td>
                    <td>{{detail.taxRate}}</td>
                  </tr>
                </table>
              </div>
            </transition>
            <!--虚线-->
            <dashed></dashed>
            <!--发票底部-->
            <div class="middle_top middle_bottom">
              <p class="title">标签：</p>
              <div class="labelShow"><span  v-for="(label,index) in labels"><i>{{label}}</i></span></div>

              <!--<ul class="label">
                &lt;!&ndash;<li class="title">标签：</li>&ndash;&gt;
                &lt;!&ndash;<li><i>物业费</i><i>北京出差</i><i>钉钉报销</i></li>&ndash;&gt;
                <li><i v-for="(label,index) in labels">{{label}}</i></li>
              </ul>-->
              <!--<div class="labelShow">
              </div>-->

              <div class="stateBody">
                <p>状态：</p>
                <div class="status">
                  <!--<span v-if="result.invoice">
                    <i><img src="./blue.png" ></i>
                    {{verifyFlag}}
                  </span>-->
                  <span v-if="result.invoice" v-show="result.invoice.hasTitle!=1 ">
                    <i><img src="./red.png" ></i>
                    {{result.invoice.hasTitle==0 ? "抬头未维护": null}}
                      {{result.invoice.hasTitle==1 ? "抬头已维护": null}}
                  </span>
                  <span v-if="result.invoice" v-show="result.invoice.processFlag!=-1">
                    <i><img src="./red.png" ></i>
                     {{result.invoice.processFlag==-1?"未报销":null}}
                      {{result.invoice.processFlag==1?"已报销":null}}
                      {{result.invoice.processFlag==0?"报销中":null}}
                    </span>
                  <span v-if="result.invoice" v-show="result.invoice.uniqueFlag=='0'">
                    <i><img src="./red.png"></i>
                    {{result.invoice.uniqueFlag=='0' ? "已被他人保存": "未被他人保存"}}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!--圆点-->
        <div class="circle_t">
          <span></span>
          <span></span>
        </div>
        <!--圆点-->
        <div class=" circle_t circle_b">
          <span></span>
          <span></span>
        </div>

      </div>
      <!--底部导航-->
      <footer>
        <ul>
          <li @click="checkStatus" v-if="result.invoice">
            <p></p>
            <h1 v-text="result.invoice.verifyFlag < 0 ? '发票查验' : '查验结果'"></h1>
          </li>

          <li>
            <!--<router-link to="/editInvoice/">-->
            <a @click="editInvoice">
              <!--<router-link v-bind:to="'/invoiceCheckIndex/'+invoiceItem.invoice.invoiceId">-->
              <p class="red"></p>
              <h1>编辑发票</h1>
            </a>
          </li>
          <li>
            <a @click="editLabels">
              <p class="orange"></p>
              <h1>发票标签</h1>
            </a>
          </li>
          <li @click="imgBoxHandler" ref="imgBox" v-if="result.invoice && result.invoice.imgUrl">
            <img :src="result.invoice.imgUrl" alt="">
            <p class="view"></p>
            <h1>发票预览</h1>
          </li>
        </ul>
      </footer>
      <!--验真错误的遮罩-->
      <transition name="fade">
        <div class="checkError" v-show="showCheckError">
          <div class="errorMessages">
            <div class="error_top">
              <p v-if="failDate.verifyMain" >{{failDate.verifyMain.verifyRemark}}</p>
              <p v-else>验真失败，请核实相关信息！</p>
            </div>
            <div class="abolish">
              <span @click="renewal" > 重验</span>
              <span id="cancel" @click="checkErrorShow">取消</span>
            </div>
            <!--<div class="abolish" @click="checkErrorShow">取消</div>
            <div class="abolish" @click="checkErrorShow">取消</div>-->
          </div>
        </div>
      </transition>

      <!--<transition name="fade">
        <div class="checkError" v-show="showCheckError">
          <div class="errorMessages">
            <p>上海国税暂不支持验真服务</p>
            <p>请稍后再试！</p>
            <div class="abolish">
              <span @click="renewal" > 重验</span>
              <span id="cancel" @click="checkErrorShow">取消</span>
            </div>
            &lt;!&ndash;<div class="abolish" @click="checkErrorShow">取消</div>
            <div class="abolish" @click="checkErrorShow">取消</div>&ndash;&gt;
          </div>
        </div>
      </transition>-->
    </div>
    <div id="loading" v-show="loading"></div>
  </div>
</template>
<script>
  import Viewer from 'viewerjs'
  import dashed from '../dashed/dashed.vue'
  import http from '../../http'
  import { MessageBox } from 'mint-ui'
  import global_ from '../../components/tool/Global'

  export default {
    data(){
      return{
        detailShow:false,
        detailNameShow:false,
        purchaserDetailNameShow:false,
        result:{},
        verifyFlag:'',
        showCheckError:false,
        labels:[],
        failDate:'',
        loading:true,
        not_wx:true
      }
    },
    components:{
      dashed
    },
    created(){
      this.not_wx=!global_.isWeiXin()
      const params = this.getRequest()
      let token = params.u
      let code = params.code
      let state = params.state
      if(!global_.isEmpty(token)){
        sessionStorage.setItem('userInfo', JSON.stringify(token));
      }else if(!global_.isEmpty(code)){
        const parm={
          dataMap:JSON.stringify({
            'code':code+'',
            'state':state+''
          }),
          method:'xforceplus.sys.gtoken'
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
      }
    },

    /*请求数据*/
    mounted(){
      const dataMap={
        dataMap:JSON.stringify({
        "invoiceId": this.$route.params.id+""
      })
      }
      const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
      const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.getInvoiceById'
      //const url='http://www.e-fp.cn/issp/ApiService?APIKey='+userInfo+'&method=xforceplus.toc.getInvoiceListByDate'
        http.post(url,dataMap)
        .then((response)=>{
        this.loading=false
        //console.log(response,2222)
        const data=response.data;

          if(data.status==1){
            this.result=data.result
            if(data.result.invoice.verifyFlag==-1){

              this.verifyFlag='未验真'

            }else if(data.result.invoice.verifyFlag==0){
              this.verifyFlag='验真中'
              //this.$router.push('/messages')


            }else if(data.result.invoice.verifyFlag==1){
              this.verifyFlag='验真成功'

            }else{
              this.verifyFlag='验真失败'
              //this.showCheckError=true

            }
            const labelStr = data.result.invoice.ext1
            if(labelStr!=''){
              if(labelStr.indexOf(',')>0){
                const arr = labelStr.split(',')
                let index
                for(index in arr){
                  this.labels.push(arr[index])
                }
              }else{
                this.labels.push(labelStr)
              }
            }
          }
        })

    },

    methods:{
      imgBoxHandler() {
        this.initViewer();
      },
      initViewer(){
        // var viewbox = document.getElementById('imgBox');
        var viewbox = this.$refs.imgBox;
        var viewer = new Viewer(viewbox, {
          url: 'data-original',
          toolbar: {
            inline:false,
            oneToOne: false,
            container:viewbox,
            zoomIn: 1,
            zoomOut: 1,
            reset: 4,
            rotateLeft: 4,
            rotateRight: 4
          },
        });
      },
      getRequest(){
        let url = location.hash;
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
      showDetail(){
       this.detailShow=!this.detailShow
        if(this.detailShow==true){
          this.$refs.detail.style.transform='rotate(90deg)'
        }else{
          this.$refs.detail.style.transform='rotate(0deg)'
        }
      },
      showDetailName(){
        this.detailNameShow=!this.detailNameShow
        if(this.detailNameShow==true){
          this.$refs.detailName.style.transform='rotate(90deg)'
        }else{
          this.$refs.detailName.style.transform='rotate(0deg)'
        }
      },

      showPurchaserDetailName(){
        this.purchaserDetailNameShow=!this.purchaserDetailNameShow
        if(this.purchaserDetailNameShow==true){
          this.$refs.tiggle.style.transform='rotate(90deg)'
        }else{
          this.$refs.tiggle.style.transform='rotate(0deg)'
        }
      },
      deleteInvoice(){
        if(this.result.invoice.verifyFlag=="0"||this.result.invoice.processFlag=="0"||this.result.invoice.processFlag=="1"){
          MessageBox.alert("验真中/报销中/已报销的发票不能删除", "提示");
          return;
        }
        MessageBox.confirm('确定要删除该发票?').then(action => {
          console.log("delete invoice")
          const dataMap={
            dataMap:JSON.stringify({
              "invoiceId": this.$route.params.id+""
            })
          }

          const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
          const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.deleteInvoice'
          http.post(url,dataMap)
            .then((response)=>{
              this.$router.push(`/myInvoice`)
            })
        });
      },
      editInvoice(){
        if(this.result.invoice.verifyFlag=="0"||this.result.invoice.processFlag=="0"||this.result.invoice.processFlag=="1"){
          MessageBox.alert("验真中/报销中/已报销的发票不能编辑", "提示");
          return;
        }
        this.$router.push({path:`/editInvoice/${this.$route.params.id}`})
      },
      editLabels(){
        if(this.result.invoice.processFlag=="0"||this.result.invoice.processFlag=="1"){
          MessageBox.alert("报销中/已报销的发票不可修改标签", "提示");
          return;
        }
        this.$router.push({path:`/invoiceLabel/${this.$route.params.id}`})
      },
      created(){
        this.$route.params.id
     // console.log(this.$route.params.id,444)
      },
      checkErrorShow(){
        this.showCheckError=false
      },
      /*重新验证*/
      renewal(){
        console.log('重新验证函数')
        this.showCheckError=false

        /*调用验真接口*/
        const dataMap={
          dataMap:JSON.stringify(
            { "invoiceId":this.$route.params.id+""  }),
        }
        const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
        const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.verifyInvoiceUpload' //调验真接口
        http.post(url,dataMap)
          .then((response)=>{
            console.log(response,55)
            const data=response.data
            console.log(data.status)
            if(data.status==-1){
              //alert(data.msg)
              MessageBox.alert(data.msg, "提示");
            }
            if(data.status==1){
              this.$router.push({path:`/invoiceCheck/${this.$route.params.id}`})
              //this.$router.push('/invoiceCheck')
            }
          })
      },
      /*验真状态不同对应函数不同*/
      checkStatus(){
        if( this.result.invoice.verifyFlag==-1){
         // alert('未验真')
            const dataMap={
              dataMap:JSON.stringify(
                { "invoiceId":this.$route.params.id+"" }),
            }
            const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
            const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.verifyInvoiceUpload' //验真接口
            http.post(url,dataMap)
              .then((response)=>{
                console.log(response)
                const data=response.data
                if(data.status==1){
                  this.result=data.msg                   /*msg有问题？???????????????????????????????????/*/
                  this.$router.push({path:`/invoiceCheck/${this.$route.params.id}`})
                }else{
                  //alert(data.msg)
                  MessageBox.alert(data.msg, "提示");
                }
              })
        }else if( this.result.invoice.verifyFlag==0){
          //alert("验真中")
          this.$router.push({path:`/invoiceCheck/${this.$route.params.id}`})
        }else if(this.result.invoice.verifyFlag==1){
          //console.log(this.$route.params.id+"" ,888)
          //alert("验真成功")

           this.$router.push({path:`/messages/${this.$route.params.id}`}) //跳转到验真结果页面

        }else if(this.result.invoice.verifyFlag==2){
          this.showCheckError=true
          //alert("验真失败")
          const dataFail={
            dataMap:JSON.stringify(
              { "invoiceId":this.$route.params.id+"" }),
          }
          const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
          const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.getVerifyInvoice'   //查询验真数据接口
          http.post(url,dataFail)
            .then((response)=>{
              if(response.data.status==1){
                const date=response.data
                this.failDate=date.result

              }
              //console.log(response.data.result.verifyMain.verifyRemark,222)
            })
        }
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #loading
    position fixed
    width 100%
    height 100%
    background-color #fff
    z-index 10000
    background url(./loading.gif) no-repeat center center #fff
  .personalCenter-wrap
    position absolute
    top 0
    left 0
    z-index 200
    background-color #efeef4
    width 100%
    height 100%
    /*头部*/
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
      .light
        color #fff
      .back
        position absolute
        left 10px
        top 0
        .icon-arrow_lift
          font-size 18px
          margin-right 5px
          position relative
          left 0
          top 2px
   /*中部*/
    .personalCenter_content
      position relative
      padding-bottom 27px
      padding-top 15px
      width 100%
      background-color #efeef4
      #triangle,.guo,.fail,.zhong,.wei
        position absolute
        top 14px
        left 12px
        width 90px
        height 90px
        z-index 300
      .wei
        background url("./wei.png") no-repeat center center
        z-index 301
        -webkit-background-size 100%
      .guo
        background url("./guo.png") no-repeat center center
        z-index 302
        -webkit-background-size 100%
      .zhong
        background url("./zhong.png") no-repeat center center
        z-index 303
        -webkit-background-size 100%
      .fail
        background url("./fail.png") no-repeat center center
        z-index 304
        -webkit-background-size 100%
      .invoiceType
        position relative
        width 100%
        height 100px
        line-height 100px
        background-color:#fff
        text-align center
        img
          vertical-align middle
        .delete
          display inline-block
          width 20px
          height 20px
          position absolute
          top 20px
          right 20px
          background-color red
          background url("./delete.png") no-repeat center center
          background-size:98%;
      .electronic
        img
          width 50%
      .normal
        img
          width 40%
      .dedicated
        img
          width 40%
      .noneType
        color red
        background url(./bg.jpg) no-repeat center center
        -webkit-background-size: 100%
      .personalCenter_content_c
        margin 0 auto
        width 94%
        background-color #fff
        -webkit-border-radius 10px
        -webkit-border-bottom-left-radius 0
        -webkit-border-bottom-right-radius 0
        box-shadow 0 0 5px #878787
        /*电子发票*/

        #noneType
          background-image: none
          background-color: #eeeeee
          h2
            text-align center
            line-height 100px
            color red
        .top
          position relative
          width 100%
          height 100px
          background-size 49%
          background-color pink
          .delete
            position absolute
            right 20px
            top 20px
            display inline-block
            width 20px
            height 20px
            background url("delete.png") no-repeat center center
            background-size 95%
          .delete
            position absolute
            right 20px
            top 20px
            display inline-block
            width 20px
            height 20px
            background url("delete.png") no-repeat center center
            background-size 95%
          /*专用发票*/
          .delete
            position absolute
            right 20px
            top 20px
            display inline-block
            width 20px
            height 20px
            background url("delete.png") no-repeat center center
            background-size 95%
        .middle
          .middle_top
            width 100%
            padding-bottom 10px
            /*付款方详情*/
            .purchaserDetail , .sellerDetail
              box-sizing border-box
              width 90%
              background-color #f7f7f7
              margin 0 auto
              font-size 13px
              color #878787
              padding 8px
              &.pull-enter-active, &.pull-leave-active
                transition all  0.2s linear
                height 135px
                overflow hidden
              &.pull-enter, &.pull-leave-to
                height 0
              p
                height 25px
                line-height 25px
                clear both
                span
                  display inline-block
                  &:nth-of-type(1)
                    float left
                    width 32%
                  &:nth-of-type(2)
                    float right
                    word-wrap break-word
                    width 60%




            .title
              width 90%
              margin 0 auto
              font-size 14px
              color #878787
              line-height 40px
              height 40px
            ul
              width 100%
              li
                box-sizing border-box
                padding-left 5%
                padding-right 2%
                height 28px
                line-height 28px
                font-size 13px
                width 100%
                margin 0 auto
                .pull
                  position relative
                  top 10px
                  left -3px
                  display inline-block
                  height 11px
                  width 7px
                  background url("lt.png") no-repeat center center
                  -webkit-background-size 100%
                span
                  display inline-block
                  &:nth-of-type(1)
                    float left
                    color #878787
                    padding -right 0
                  &:nth-of-type(2)
                    float right
                    color #282828
                    margin-left 3%
                    color #fff
                   &:nth-of-type(3)
                    float right
          .nameDetail
            .short
              width 185px !important
            box-sizing border-box
            padding 3%
            width 90%
            height 135px
            margin 0 auto
            background-color #f7f7f7
            font-size 13px
            color #989898
            &.pull-enter-active, &.pull-leave-active
              transition all  0.2s linear
              height 135px
              overflow hidden
            &.pull-enter, &.pull-leave-to
              height 0
            ul
              width 100%
              li
                width 100%
                height 20px
                line-height 20px
                &:nth-of-type(1)
                  margin-top 2px
                &:nth-of-type(1), &:nth-of-type(3)
                  margin-bottom 7px
                span
                  display inline-block
                  width 100%
                  &:nth-of-type(1)
                    width 31%
                  &:nth-of-type(2)
                    width 63%
                    text-align right
          #sellerDetail
            ul
              padding 0
              margin 0
              li
                padding-left 0
                span
                  color #939393
                  &:nth-of-type(1)
                    width 33%
                    padding-left 0
                    margin-left 0
          #productDteail_detail
            width 90%
            background-color  #f7f7f7
            margin 0 auto
            &.pull-enter-active, &.pull-leave-active
              transition all  0.2s linear
              overflow hidden
              height 120px
            &.pull-enter, &.pull-leave-to
              height 0
            table
              margin-top 5px
              width 100%
              font-size 13px
              tr
                width 100%
                height 18px
                line-height 18px
                color #878787
                &:nth-of-type(1)
                  height 30px
                  line-height 30px
                /*&:nth-of-type(2)
                  height 18px
                  line-height 18px
                  color #2b2b2b
                &:nth-of-type(3)
                  height 18px
                  line-height 18px
                  color #2b2b2b*/
                td
                  text-align center
                  &:nth-of-type(1)
                    width 34%
                    text-align center
                    p
                      width 80%
                      text-align center !important
                      margin 0 0 7% 10%
                      color #939393
                  &:nth-of-type(2)
                    width 25%
                    text-align center
                    color #939393
                  &:nth-of-type(3)
                    width 25%
                    text-align center
                    color #939393
          .middle_bottom
            border-bottom none
            padding-bottom 13px
            ul
              width 100%
              li
                width 94%
                i
                  box-sizing border-box
                  padding-left 5px
                  padding-right 4px
                  display inline-block
                  height 28px
                  width 68px
                  overflow hidden
                  font-style normal
                  background url("label.png") no-repeat center center
                  background-size 100%
                  margin-right 20px
                  font-size 12px
                  color #fff
            .label
              width 100%
              .title
                color #878787
              li
                padding 0 7px
            .labelShow
              width 90%
              /*height 100px*/
              /*background-color #eeeeee*/
              margin 0 auto
              span
                box-sizing border-box
                padding-left 5px
                padding-right 4px
                display inline-block
                height 28px
                line-height 28px
                width 75px
                overflow hidden
                background url("label.png") no-repeat center center
                background-size 100%
                margin-right 20px
                font-size 12px
                color #fff
                margin-bottom 5px

                i
                  white-space nowrap
                  display inline-block
                  width 58px
                  text-overflow ellipsis
                  overflow hidden
                  font-style normal
            .stateBody
              width 100%
              overflow hidden
              p
                color #878787
                padding-left  17px
                font-size 14px
                height 30px
                line-height 30px
              .status
                width 90%
                margin 0 auto
                span
                  float left
                  font-size 12px
                  display inline-block
                  width 33.33%
                  height 30px
                  line-height 30px
                  color #5d5d5d
                  i
                    display inline-block
                    width 20px
                    height 20px
                    margin-right 5px
                    img
                      width 100%
                      vertical-align middle
      /*圆点*/
      .circle_t
        position absolute
        top 213px
        width 100%
        height 20px
        background-color transparent
        span
          position absolute
          top 3
          display inline-block
          width 18px
          height 18px
          border-radius 50%
          text-align center
          &:nth-of-type(1)
            left 3px
            background url("left.png") no-repeat center center
            -webkit-background-size 100%
          &:nth-of-type(2)
            right  3px
            background url("right.png") no-repeat center center
            -webkit-background-size 100%


      .circle_b
        position absolute
        top 392px
        width 100%
        height 20px
        background-color transparent

    /*底部*/
    footer
      width 100%
      background-color #efeef4
      overflow hidden
      ul
        display flex
        align-items center
        justify-content center
        li
          position relative
          flex 1
          text-align center
          p
            width 50px
            height 50px
            background url("search2.png") no-repeat  center center #74afff
            border-radius 50%
            -webkit-background-size 100%
            margin  0 auto
          .red
            background url("write2.png") no-repeat center  center #ff707a
            -webkit-background-size 100%
          .orange
            background url("invoiceLabel2.png") no-repeat center center  #ff9260
            -webkit-background-size 100%
          .view
            background url(./view.png) no-repeat center center  #ff9260
            -webkit-background-size 100%
          h1
            height 50px
            line-height 50px
            font-size 12px
            padding-bottom 10px
            color #5d5d5d

      img {
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        opacity 0;
        z-index 1111
      }
    /*遮罩*/

    .checkError
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      background-color rgba(0, 0, 0, 0.7)
      z-index 999
      &.fade-enter-active, &.fade-leave-active
        transition opacity  0.5s
      &.fade-enter, &.fade-leave-to
        opacity 0
      .errorMessages
        position absolute
        left 50%
        top 35%
        margin-left -95px
        width 190px
        /*height 106px*/
        background-color: #fff
        border-radius 10px
        color #4a4a4a
        padding-top 5px
        font-size 13px
        .error_top
          width 100%
          height 65px
          border-top 0
          /*background-color: red*/
          p
          /*height 30px*/
            padding 0 20px
            line-height 28px
            text-align center
        div
          width 100%
          text-align center
          height 40px
          line-height 40px
          border-top 1.5px solid #e5e5e5

        .abolish
          width 100%
          color #4cb3ff
          span
            display inline-block
            float left
            width 50%
            text-align center
            box-sizing border-box
            &:nth-of-type(2)
              border-left 1.5px solid #e5e5e5


</style>
