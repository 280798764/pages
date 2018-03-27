<template>
  <div class="showInvoices_wraper">
    <header>
      <div class="header_left">
        <span class="icon_top">
          <img src="./taxClassification.png" alt="">
        </span>
        <span class="text_top" >我的票税助手</span>
      </div>
      <div class="header_right">
        <div class="header_right_input">
          <input placeholder="请输入完整的发票代码" class="inp" v-model="SelectInvoiceCode"/>
          <span  class="search_icon" @click="selectInvouceCode">
            <img   src="./search-gray.png" alt="">
          </span>
        </div>
        <div class="header_right_input">
          <input placeholder="请输入完整的发票号码" class="inp" v-model="SelectInvoiceNo" />
          <span  class="search_icon" @click="selectInvouceNo">
            <img  src="./search-gray.png" alt="">
          </span>
        </div>
        <div class="selectDate">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开票日期"
            end-placeholder="选择开票日期">
          </el-date-picker>
          <span class="search_icon" @click="dateSelect" >
            <img src="./search-gray.png" alt="" >
          </span>
        </div>
      </div>

    </header>
    <div class="check">
     <div class="check_left" v-bind:class="{ Checked: CheckedN }" @click="showNot">未报销 ({{this.invoicesList2().length}})</div>
      <div class="check_right" v-bind:class="{ Checked: CheckedA }" @click="showAlready">已报销 ({{this.invoicesListAlready2().length}})</div>
      <!--<div class="right_yellow">
        <img src="./yellow.png" alt=""><div>扫描二维码上传的发票暂不支持报销，请重新拍照上传！</div>
      </div>-->
    </div>

    <!--未报销-->
    <div class="content" v-show="not">
      <table>
        <tr>
          <th></th>
          <th>发票代码</th>
          <th>发票号码</th>
          <th>开票日期</th>
          <th>发票类型</th>
          <th>销方公司名称</th>
          <th>购方公司名称</th>
          <th>含税金额</th>
          <th>发票状态</th>
          <th>验真状态</th>
          <th>操作</th>
        </tr>
        <!--<tr  v-for="(invoice,index) in this.invoicesList">-->
        <tr  v-for="(invoice,index) in this.invoicesList2()">
          <td><input type="checkbox" v-model="checkedModel" :value="invoice.invoiceMain"></td>
          <td><p>{{invoice.invoiceMain.invoiceCode}}<!--<img src="./abnormal.png" >--><span>{{}}</span></p></td>
          <td><p>{{invoice.invoiceMain.invoiceNo}}</p></td>
          <td><p>{{invoice.invoiceMain.paperDrewDate}}</p></td>
          <!--<td><p><img src="./normalInvNote.png" alt=""></p></td>-->

          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='ce'"><p><img src="./dian.png" alt="" ></p></td>
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='s'"><p><img src="./zhuan.png" alt=""></p></td>
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='v'"><p><img src="./ji.png" alt=""></p></td>
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='c'"><p><img src="./pu.png" alt=""></p></td>


          <td><p>{{invoice.invoiceMain.sellerName	}}<span class="hover" >{{invoice.invoiceMain.sellerName	}}</span>  </p></td>
          <td><p>{{invoice.invoiceMain.purchaserName}}<span class="hover" >{{invoice.invoiceMain.purchaserName	}}</span></p></td>
          <td><p>￥{{invoice.invoiceMain.amountWithTaxStr}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceFlag=='1'?"正常":"作废"}}</p></td>
          <td><p>{{invoice.invoiceMain.verifyFlag ==='1'?"验真成功":'' ||
          invoice.invoiceMain.verifyFlag ==='-1'?"未验真":''||
          invoice.invoiceMain.verifyFlag ==='0'?"验真中":''||
          invoice.invoiceMain.verifyFlag ==='2'?"验真失败":''
            }}</p></td>
          <td @click="showDetailNews(index)"><p style="color: #0e91ee">查看详情</p></td>
        </tr>
      </table>
    </div>
    <!--已报销-->
    <div class="content" v-show="already">
      <table>
        <tr>
          <th></th>
          <th>发票代码</th>
          <th>发票号码</th>
          <th>开票日期</th>
          <th>发票类型</th>
          <th>销方公司名称</th>
          <th>购方公司名称</th>
          <th>含税金额</th>
          <th>发票状态</th>
          <th>验真状态</th>
          <th>报销时间</th>
          <th>操作</th>
        </tr>
        <tr  v-for="(invoice,index) in this.invoicesListAlready2()">
          <td><input type="checkbox" v-model="checkedModel2" :value="invoice.invoiceMain"></td>
          <td><p>{{invoice.invoiceMain.invoiceCode}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceNo}}</p></td>
          <td><p>{{invoice.invoiceMain.paperDrewDate}}</p></td>
         <!-- <td><p><img src="./normalInvNote.png" alt=""></p></td>-->
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='ce'"><p><img src="./dian.png" alt="" ></p></td>
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='s'"><p><img src="./zhuan.png" alt=""></p></td>
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='v'"><p><img src="./ji.png" alt=""></p></td>
          <td  class= "photoWK" v-show="invoice.invoiceMain.invoiceType=='c'"><p><img src="./pu.png" alt=""></p></td>
          <td><p>{{invoice.invoiceMain.sellerName	}}</p></td>
          <td><p>{{invoice.invoiceMain.purchaserName}}</p></td>
          <td><p>￥{{invoice.invoiceMain.amountWithTaxStr}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceFlag=='1'?"正常":""}}</p></td>
          <td><p>{{invoice.invoiceMain.verifyFlag ==='1'?"验真成功":'' ||
          invoice.invoiceMain.verifyFlag ==='-1'?"未验真":''||
          invoice.invoiceMain.verifyFlag ==='0'?"验真中":''||
          invoice.invoiceMain.verifyFlag ==='2'?"验真失败":''
            }}</p></td>
          <td><p>{{invoice.invoiceMain.processTime}}</p></td>
          <td @click="showDetailNews(index)"><p style="color: #0e91ee">查看详情</p></td>
        </tr>
      </table>
    </div>

    <!--未报销-->
    <footer class="invoices_footer" v-show="!already">
      <input type="checkbox" v-model="checkedAll" @change="changeState">
      <span>全选</span>
      <span>{{checkedModel.length}}/{{this.invoicesList2().length}}</span>
      <span>已选发票总金额：</span>
      <span>¥{{totalPrice}}</span>
      <button :disabled="!checkedModel.length" @click="showMessageBox" >提交报销</button>
    </footer>
    <!--已报销-->
    <footer class="invoices_footer" v-show="already">
      <input type="checkbox" v-model="checkedAll2" @change="changeState2">
      <span>全选</span>
      <span>{{checkedModel2.length}}/{{this.invoicesListAlready2().length}}</span>
      <span>已选发票总金额：</span>
      <span>¥{{totalPrice2}}</span>
      <button :disabled="!checkedModel2.length" @click="toPage" >打印列表</button>
      <!--<button  >打印列表及明细</button>-->
    </footer>
    <!--MessageBox-->
    <transition name="show_messageBox">
      <div class="MessageBox" v-show="MessageBox" >
        <!-- 该处messageBox后续可优化，目前的结构只好这么处理了 -->
        <div class="mask" v-if="invoiceDetail_message || responseData.status=='1' || showMessages4 || responseData.status=='-1'"></div>
        <div class="messagebox-body" v-if="invoiceDetail_message || responseData.status=='1' || showMessages4 || responseData.status=='-1'">
          <span class="close_MessageBox" v-if="invoiceDetail_message" @click="closeMessageBoxDetail"></span>
          <span v-else class="close_MessageBox" @click="closeMessageBox"></span>
          <div class="messages1" v-show="this.responseData.status=='1'">
            <p><span><img src="./Bx.png" alt=""></span><span>报销成功</span></p>
            <p>本次成功报销{{this.responseData.successNo}}张发票。</p>
            <button @click="toPageInvoice">打印列表</button>
            <!--<p><button>打印列表</button><button>打印列表及明细</button></p>-->
            <p></p>
          </div>


          <div class="messages1 messages2"  v-show="false">
            <!--<span class="close_MessageBox" @click="closeMessageBox"></span>-->
            <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
            <p class="tel">请先绑定手机号，再执行报销！</p>
          </div>
                <!--v-show="detailNewsShow"-->
          <div class="invoiceDetail_message" v-show="invoiceDetail_message">
            <div class="invoice_bg">
              <div v-if="imgUrl" id="imgsviewer">
                <img :src="imgUrl">
              </div>
              <div v-else class="invoice-url-null">
                <img src="./yellow.png" alt="">
                <span>扫码上传的发票无影像</span>
              </div>
              <!-- <div class="control_img">
                <span><img src="./add.png" alt=""></span>
                <span><img src="./back.png" alt=""></span>
                <span><img src="./refresh.png" alt=""></span>
              </div> -->
            </div>

            <div class="detailNews">
              <p class="detailNews_contentTitle">
                <span><img src="./circle.png" alt=""></span>
                <span>基础信息</span>
                <span><img src="./success.png" alt=""></span>
              </p>
              <div class="detailNews_contentTop">
                <ul class="left" >
                  <li>发票类型：{{invoiceMain.invoiceType=="s"?"增值税专用发票":"" || invoiceMain.invoiceType=="c"?"增值税普通发票":"" || invoiceMain.invoiceType=="ce"?"增值税电子普通发票":"" }}</li>
                  <li>发票号码：{{invoiceMain.invoiceNo}}</li>
                  <li >发票代码：{{invoiceMain.invoiceCode}}</li><!--{{invoice.invoiceDetails.invoiceCode}}-->
                  <li>机器编码：{{invoiceMain.machineCode}}</li>
                </ul>
                <ul class="middle" >
                  <li>不含税金额：¥{{invoiceMain.amountWithoutTaxStr}}</li>
                  <li>含税金额：¥{{invoiceMain.amountWithTaxStr}}</li>
                  <li>税额：¥{{invoiceMain.taxAmountStr}}</li>
                  <li>校验码：{{invoiceMain.checkCode}}</li>
                </ul>
                <ul class="right">
                  <!--<li>结算单号：333333333</li>-->
                  <li>开票日期：{{invoiceMain.paperDrewDate}}</li>
                  <li v-show="invoiceMain.cipherText !==''" class="miwen_wrap">密文：****<i class="miwen">{{invoiceMain.cipherText}}</i></li>
                  <li v-show="invoiceMain.cipherText==''">密文：----</li>
                  <li>备注：</li>
                </ul>
              </div>
            </div>
            <div class="detailNews">
              <p>
                <span><img src="./circle.png" alt=""></span>
                <span>购方信息</span>
              </p>
              <ul class="middle_left">
                <li>购方名称：{{invoiceMain.purchaserName}}</li>
                <li>购方税号：{{invoiceMain.purchaserTaxNo}}</li>
                <!-- <li>购方代码：代码</li>-->
              </ul>
              <ul class="middle_middle">
                <li>购方地址/电话：{{invoiceMain.purchaserAddress}}&nbsp &nbsp &nbsp{{invoiceMain.purchaserTel}}</li>
                <li>购方银行名称/账号：{{invoiceMain.purchaserBankName}}&nbsp &nbsp &nbsp{{invoiceMain.purchaserBankAccount}}</li>
              </ul>
            </div>
            <div class="detailNews">
              <p>
                <span><img src="./circle.png" alt=""></span>
                <span>销方信息</span>
              </p>
              <ul class="middle_left">
                <li>销方名称：{{invoiceMain.sellerName}} </li>
                <li>销方税号：{{invoiceMain.sellerTaxNo}}</li>
                <!-- <li>销方代码：310456245689752</li>-->
              </ul>
              <ul class="middle_middle">
                <li>销方地址/电话：{{invoiceMain.sellerAddress}}&nbsp &nbsp &nbsp {{invoiceMain.sellerTel}}</li>
                <li>销方银行名称/账号：{{invoiceMain.sellerBankName}}&nbsp &nbsp &nbsp{{invoiceMain.sellerBankAccount}}</li>
              </ul>
            </div>
            <div class="table_wrap">
              <p>
                <span><img src="./circle.png" alt=""></span>
                <span >明细：{{invoiceDetails.length}}条</span>
              </p>
              <table class="table">
                <tr>
                  <th>货物及服务名称</th>
                  <th>规格型号</th>
                  <th>单位</th>
                  <th>数量</th>
                  <th>单价</th>
                  <th>含税金额</th>
                  <th>税率</th>
                  <th>税额</th>
                </tr>
                <tr v-for="invoiceDetail in invoiceDetails">
                  <td>{{invoiceDetail.cargoName}}</td>
                  <td>{{invoiceDetail.itemSpec}}</td>
                  <td>{{invoiceDetail.quantityUnit}}</td>
                  <td>{{invoiceDetail.quantity	}}</td>
                  <td>¥{{invoiceDetail.uniPrice==0 ?"--":invoiceDetail.uniPrice}}</td>
                  <td>¥{{invoiceDetail.amountWithTax}}</td>
                  <td>{{invoiceDetail.taxRate}}%</td>
                  <td>¥{{invoiceDetail.taxAmount}}</td>
                </tr>

              </table>
            </div>
          </div>
          <div class="messages1 messages3"  v-show="false">
            <!--<span class="close_MessageBox" @click="closeMessageBox"></span>-->
            <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
            <p class="tel">票面抬头与公司名称(税号)不一致，无法报销！</p>
          </div>

          <!--报销部分成功-->
          <div class="messages1 messages4" v-show="showMessages4"  style="display: none;">
            <!--<span class="close_MessageBox" @click="closeMessageBox"></span>-->
            <p><span><img src="./hint.png" alt=""></span><span>报销结果</span></p>
            <p>本次成功报销<span>{{this.responseData.successNo}}</span>张发票，报销失败<span>{{this.responseData.failNo}}</span>张发票。</p>
            <div class="wk_title_content"><span>发票代码</span><span >发票号码</span><span>失败原因</span></div>

            <div class="middleBox">
              <ul class="middleBox_content">
                <li v-for="failDetail in responseData.details" v-show="failDetail.message !='发票报销成功'"><span>{{failDetail.invoiceCode}}</span><span>{{failDetail.invoiceNo}}</span><span>{{failDetail.message}}</span></li>
              </ul>
            </div>
            <div class="bottom_btn" >
              <!--<span style="color: #0e91ee">如需打印报销结果，请切换至“已报销”列表</span>-->
              <button @click="toPageInvoice">打印列表</button>
            </div>
          </div>

          <!--此发票已被他人报销，请联系财务人员！-->
          <div class="messages1 messages5" v-show="false">
            <!--<span class="close_MessageBox" @click="closeMessageBox"></span>-->
            <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
            <p class="tel">此发票已被他人报销，请联系财务人员！</p>
          </div>

          <!--请先绑定姓名，再执行报销！-->

          <div class="messages1 messages6" v-show="responseData.status=='-1'">
            <!--<span class="close_MessageBox" @click="closeMessageBox"></span>-->
            <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
            <p class="tel">{{responseData.message}}</p>
          </div>
        </div>

          <!--弹框-->


      </div>
    </transition>

  </div>
</template>

<script>

  import Viewer from 'viewerjs'
  import global_ from '../../components/tool/Global'
  import http from '../wk_common/js/http'
  import utils from './utls/utils'
  import index from '../../router/index'
  import CommonUtils from '@/common/utils/index';
  export default{
    data(){
      return{
        checkedAll:false,
        checkedModel:[],
        total:0,
        checkedID:[],
        checkedAll2:false,
        checkedModel2:[],
        total:0,
        checkedID2:[],
        arr1:[],
        value1:'',
        not:true,
        already:false,
        CheckedN:true,
        CheckedA:false,
        messages1:false,
        MessageBox:false,
        detailNewsShow:false,
        invoicesList:'',
        invoiceDetail_message:false,
        result:'',
        invoiceMain:"",
        invoiceDetails:"",
        imgUrl:"",
        SelectInvoiceCode:"",
        SelectInvoiceNo:"",
        invoicesListAlready:"",
        token:"",
        responseData:"",
        checkedInvoiceIds:"",
        userId:'',
        showMessages4:false,
        printInvoice:[],
        totalAmount:'',
       /* creatTimes:""*/
        token:'',//一键登录的token
        operationToken:"",
        dialogVisible: false,
        processFlag:"1",
        printTotal:"",
        getPcToken:"",//扫码登录的token
        mobile:"",
        username:"",
        printInvoiceList:''//打印的渲染数据


      }
    },
    created(){
      console.log("01")
      this.userId= (sessionStorage.getItem('userId'))
      console.log(this.userId, "03")
      const {token, operationToken} = this.$route.query;
      if(!this.userId || this.userId.length == 0 || (token && operationToken)){
        const dataMap={
          dataMap:JSON.stringify({
            token,
            operationToken
          }),
        }
        /*线上*/   //const apikey="YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D"  //上线使用
        const url=global_.httpUrl+global_.apikey+'&method=xforceplus.toc.SwitchUserToken'
        http.post(url,dataMap)
          .then((response=>{
            if(response.data.status=="1"){

              this.$message({
                message: '登录成功',
                type: 'success'
              });

              this.userId=response.data.userId
              this.token=response.data.token
              this.mobile=response.data.mobile
              this.username=response.data.username
              console.log( this.token,this.userId,"登陆成功打印")

              sessionStorage.setItem('token', (this.token));
              sessionStorage.setItem('userId', (this.userId));
              sessionStorage.setItem('mobile', (this.mobile));
              sessionStorage.setItem('username', (this.username));

              this.initPage()

            }else if(response.data.status=="-1"){
              /* this.$message({
               message:"登录失败",
               type: 'error',
               duration:"3000"
               });*/
            }
            else if(response.data.status=="0"){
              const msg=response.data.message
              this.$message({
                message:msg,
                type: 'error',
                duration:"3000"
              });
            }else {   //500的情况
              const msg=response.data.message
              this.$message({
                message:msg,
                type: 'error',
                duration:"3000"
              });

            }
            console.log(response,"===========================================================转换toCtoken")
          }))
      } else {
        this.initPage();
      }
      console.log(this.userId,666)
    },
    watch:{
      value1(newValue,oldValue){
       if(newValue&&newValue.length>0 ){
         this.arr1[0] = utils.dateformat(newValue[0],'yyyyMMdd')
         this.arr1[1] = utils.dateformat(newValue[1],'yyyyMMdd')
       }else{
         this.arr1=[]
       }
      },
      checkedModel:{
        handler(){
         // console.log(345,this.checkedModel.length,this.invoicesList2().length)
          if(this.checkedModel.length ==this.invoicesList2().length){
            this.checkedAll = true
          }else {
            this.checkedAll = false
          }

        },
        deep:true
      },
      checkedModel2:{
        handler(){
          if(this.checkedModel2.length==0){
            return
          }
          // console.log(345,this.checkedModel.length,this.invoicesList2().length)
          if(this.checkedModel2.length ==this.invoicesListAlready2().length){
            this.checkedAll2 = true
          }else {
            this.checkedAll2 = false
          }
        },
        deep:true
      },
    }
    ,
    computed:{
      totalPrice(){
        this.total = 0
        for(var i = 0;i<this.checkedModel.length;i++){

          this.total = Number(Number(Number(this.total).toFixed(2)) + Number(Number(this.checkedModel[i].amountWithTax).toFixed(2))).toFixed(2)
          console.log(456,this.total)
        }
        return CommonUtils.toThousands(this.total)
      },
      totalPrice2(){
        this.total2 = 0
        for(var i = 0;i<this.checkedModel2.length;i++){

          this.total2 = Number(Number(Number(this.total2).toFixed(2)) + Number(Number(this.checkedModel2[i].amountWithTax).toFixed(2))).toFixed(2)
          console.log(456,this.total)
        }
        return CommonUtils.toThousands(this.total2)
      },
    },
    methods:{

      getRequest(){
        let url = location.href;//统一，本地启使用这个访问http://localhost:8080/?otId=chq&source=chq#/invoiceCollection
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
      initPage(){

        this.userId=sessionStorage.getItem('userId')
        this.token=sessionStorage.getItem('token')
        this.mobile=sessionStorage.getItem('mobile')
        this.username=sessionStorage.getItem('username')

        console.log( this.token,this.userId,"initPage")

        const dataMap={
          dataMap:JSON.stringify({
            "id" :  this.userId,//动态的
            "processFlag" : "-1",  //1/-1未报销
            "page" : 1,//第几页
            "row" : 1000,//一页几条
            "invoiceCode":"",
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }

        // const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        // let apikey=sessionStorage.getItem('token')
        // console.log(apikey,"获取列表00")
        const url=global_.httpUrl+this.token+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表01")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              this.result=response.data.result
              response.data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = CommonUtils.toThousands(item.invoiceMain.taxAmount);
              });
              this.invoicesList=response.data.result
              // console.log(this.invoicesList,"拿到列表")
            }

          }))
        /*已报销的请求*/
        const dataMap2={
          dataMap:JSON.stringify({
            "id" : this.userId,//动态的
            "processFlag" : "1",  //1/-1未报销
            "page" : 1,//第几页
            "row" : 1000,//一页几条
            "invoiceCode":"",
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }

        //  let apikey2=sessionStorage.getItem('token')
        // const apikey2="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url2=global_.httpUrl+this.token+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url2,dataMap2)
          .then((response=>{
            console.log(response,"获取列表02")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              response.data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = CommonUtils.toThousands(item.invoiceMain.taxAmount);
              });
              this.invoicesListAlready=response.data.result
              console.log(this.invoicesListAlready,7777)
            }
          }))
      },

      dateSelect(){
        //this.$message.error('请选择日期的范围');
        this.$message({
          message: '请选择日期的范围',
          type: 'error',
          duration:"1000"
        });


        //alert(111)
      },

      toPage(){
        const {href} = this.$router.resolve({
          path:'print',
          query:{
            checkedModel2:JSON.stringify(this.checkedModel2),
            totalPrice2:this.totalPrice2
          }
        })
           window.open(href, '_blank')

      },
      /*弹框内打印报销成功的发票*/
      toPageInvoice(){
        // this.MessageBox=false
        // this.showMessages4=false
        const {href} = this.$router.resolve({
          path:'printInvoices',
          query:{
           /* printInvoice:JSON.stringify(this.printInvoice),*/
          // totalPrice2:this.totalPrice2
            //printTotal:this.printTotal
          }
        })
        window.open(href, '_blank')

      },
      /*选择checkbox*/
      changeState(){
        this.checkedModel = []
        if(this.checkedAll == true){
          this.invoicesList2().forEach((value,index)=>{
            this.checkedModel.push(value.invoiceMain)
          })
        }
      },
      changeState2(){
        this.checkedModel2 = []
        if(this.checkedAll2 == true){
          this.invoicesListAlready2().forEach((value,index)=>{
            this.checkedModel2.push(value.invoiceMain)
          })
        }
      },
      /*日期筛选*/
			invoicesListAlready2(){
        if(this.arr1.length > 0){
          return	this.invoicesListAlready.filter((number)=> {
            return number.invoiceMain.paperDrewDate <= this.arr1[1] && number.invoiceMain.paperDrewDate >= this.arr1[0]
          })
        }else {
          return	this.invoicesListAlready
        }
      },

      invoicesList2(){
        if(this.arr1.length > 0){
          return	this.invoicesList.filter((number)=> {
            return number.invoiceMain.paperDrewDate <= this.arr1[1] && number.invoiceMain.paperDrewDate >= this.arr1[0]
          })
        }else {
          return	this.invoicesList
        }
      },
      showNot(){
        this.processFlag="-1"
      	this.result = this.invoicesList
        this.not=true
        this.already=false
        this.CheckedN=true
        this.CheckedA=false
        const dataMap={
          dataMap:JSON.stringify({
            "id" : this.userId,//动态的
            "processFlag" : this.processFlag,  //1/-1未报销
            "page" : 1,//第几页
            "row" : 1000,//一页几条
            "invoiceCode":"",
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        //let apikey=sessionStorage.getItem('token')
        //const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url=global_.httpUrl+this.token+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,88)
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              response.data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = CommonUtils.toThousands(item.invoiceMain.taxAmount);
              });
              this.invoicesList=response.data.result
            }
          }))
      },
      showAlready(){
        this.processFlag="1"
      	this.result = this.invoicesListAlready
        this.not=false
        this.already=true
        this.CheckedA=true
        this.CheckedN=false
        const dataMap={
          dataMap:JSON.stringify({
            "id" : this.userId,//动态的
            "processFlag" : this.processFlag,  //1/-1未报销
            "page" : 1,//第几页
            "row" : 1000,//一页几条
            "invoiceCode":"",
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        //let apikey=sessionStorage.getItem('token')
        //const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url=global_.httpUrl+this.token+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表03")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              response.data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = CommonUtils.toThousands(item.invoiceMain.taxAmount);
              });
              this.invoicesListAlready=response.data.result
              console.log(this.invoicesList,7777)

            }
          }))
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      showMessageBox(){

        /*弹框*/

        this.$alert('确定提交报销吗？', '提示', {
          confirmButtonText: '确定',

          callback: action => {
            if (action === 'cancel') {
              this.MessageBox = false;
              return;
            }
            this.invoiceDetail_message=false

            if(this.checkedModel.length ==0){
              return
            }
            this.checkedID = []
            this.checkedModel.forEach((item,index)=>{
              this.checkedID.push(item.invoiceId)
            })
            this.checkedID2 = []
            this.checkedModel2.forEach((item,index)=>{
              this.checkedID2.push(item.invoiceId)
            })
            this.MessageBox=true

            /*接口*/
            this.token=sessionStorage.getItem('token')
            //console.log(this.showInvoiceToken,656565)
            const dataMap={
              dataMap:JSON.stringify({
                "token":this.token,
                "userId":this.userId,
                "invoices":this.checkedID
              }),
            }
            //const apikey=this.token
            const url=global_.httpUrl+this.token+'&method=xforceplus.toc.updatePersonalPurchaseInvoice'

            http.post(url,dataMap)
              .then((response=>{
                console.log(response,"更新该用户的发票报销状态")
                this.responseData=response.data
                if(this.responseData.status=='0'){
                  this.showMessages4=true
                }
                var detailsInvoices=response.data.details

                console.log(detailsInvoices,99999)
                this.printInvoices2=detailsInvoices.filter(function (item,index) {
                  return item.status=="1"
                })
                console.log(this.printInvoices2,"this.printInvoices2,00000000000000")
                if(this.printInvoices2){
                  this.printInvoices2.forEach(item => {
                    item.invoice.amountWithTaxStr = CommonUtils.toThousands(item.invoice.amountWithTax);
                    item.invoice.amountWithoutTaxStr = CommonUtils.toThousands(item.invoice.amountWithoutTax);
                    item.invoice.taxAmountStr = CommonUtils.toThousands(item.invoice.taxAmount);
                  });
                  console.log(1)
                  /*计算总金额*/
                  var amountWithTax=[]
                  for(let i=0;i<this.printInvoices2.length;i++){
                    amountWithTax.push(this.printInvoices2[i].invoice.amountWithTax)
                    console.log(amountWithTax,"amountWithTax")
                   this.printTotal=amountWithTax.reduce(function (accumulator,currentValue) {
                      return accumulator+currentValue
                    })
                    sessionStorage.setItem('printTotal', CommonUtils.toThousands(this.printTotal))
                    console.log( this.printTotal," this.printTotal")

                  }
                  /*渲染打印成功的列表*/
                 /* this.printInvoiceList=[]
                  this.printInvoices2.forEach((value,index)=>{
                    this.printInvoiceList.push(value.invoice)
                    return this.printInvoiceList
                  })*/


                }

                sessionStorage.setItem('printIN',JSON.stringify(this.printInvoices2));


                console.log(this.responseData,"this.responseData")
                console.log(response,678)
                if(response.data.status==1){                                       /*22*/

                }
              }))

          }
        });


      },
      closeMessageBox(){
        this.MessageBox = false
        this.detailNewsShow = false
        this.checkedModel = []
        this.checkedModel2 = []
        this.responseData = '';
        this.initPage();
      },

      closeMessageBoxDetail(){

        this.MessageBox=false
        this.detailNewsShow=false
      },
      showDetailNews(inId){
        this.MessageBox=true
        // this.detailNewsShow=true
        this.invoiceDetail_message=true
        this.invoiceMain=this.result[inId].invoiceMain
        this.invoiceDetails=this.result[inId].invoiceDetails
        //console.log(this.invoiceMain[inId].invoiceCode,789)
        this.imgUrl=this.result[inId].invoiceMain.imgUrl
        if (this.imgUrl) this.initViewer();
        console.log( this.imgUrl)

        this.showMessages4=false

      },
      /*按照发票代码搜索发票*/
      selectInvouceCode(){

        const dataMap={
          dataMap:JSON.stringify({
            "id" : this.userId,//动态的
            "processFlag" : this.processFlag,  //1/-1未报销
            "page" : 1,//第几页
            "row" : 1000,//一页几条
            "invoiceCode":this.SelectInvoiceCode,
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }

        //const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        //let apikey=sessionStorage.getItem('token')
        const url=global_.httpUrl+this.token+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表04")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              response.data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = CommonUtils.toThousands(item.invoiceMain.taxAmount);
              });
              if(this.processFlag=="1"){
                this.result=response.data.result
                this.invoicesListAlready=response.data.result
              }else{

                this.result=response.data.result
                this.invoicesList=response.data.result
                console.log(this.invoicesList,"code")
              }

            }
          }))

        if(this.SelectInvoiceCode.trim()=="" ){
          this.$message({
            message: '请输入发票代码',
            type: 'error',
            duration:"1000"
          });
        }else if(this.invoicesList.length==0){

        }
      },
      /*按照发票号码搜索*/
      selectInvouceNo(){
        const dataMap={
          dataMap:JSON.stringify({
            "id" :  this.userId,//动态的
            "processFlag" : this.processFlag,  //1/-1未报销
            "page" : 1,//第几页
            "row" : 1000,//一页几条
            "invoiceCode":"",
            "invoiceNo":this.SelectInvoiceNo,
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        //const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        // apikey=sessionStorage.getItem('token')
        const url=global_.httpUrl+this.token+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表05")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              response.data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = CommonUtils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = CommonUtils.toThousands(item.invoiceMain.taxAmount);
              });
              if(this.processFlag=="1"){
                this.result=response.data.result
                this.invoicesListAlready=response.data.result
              }else{
                this.result=response.data.result
                this.invoicesList=response.data.result
                console.log(this.invoicesList,"code")
              }

              if(this.SelectInvoiceNo.trim()===""){
               // this.$message.error('请输入发票号码');

                this.$message({
                  message: '请输入发票号码',
                  type: 'error',
                  duration:"1000"
                });
              }else if(this.invoicesList.length==0){
               /* location.reload()*/
              }
         }

          }))

      },
      selectDate(){
        var arr2 = []
        for( var i = 0;i < this.invoicesList.length ; i++){
          var date =	this.invoicesList[i].invoiceMain.paperDrewDate
          if(date < this.arr1[1] && date > this.arr1[0]){
            console.log(123,this.invoicesList[i])
            arr2.push(this.invoicesList[i])
          }
        }
        this.invoicesList = arr2
      },
      initViewer(){
        var viewbox = document.getElementById('imgsviewer');
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.showInvoices_wraper
  width 100%
  header
    width 100%
    overflow hidden
    .header_left
      float left
      height 45px
      line-height 45px
      margin-right 50px
      padding-left 30px
      .text_top
        font-size 14px
        font-weight 900
        color #5a5b5d
      img
        width 25px
        vertical-align middle
        margin-right 5px
        vertical-align middle
    .header_right
      float left
      padding-top:13px;
      .header_right_input
        float left
        width 150px
        height 20px
        margin-right 10px
        border-right 10px
        border 1px solid #dfdfdf
        border-radius 3px
        box-shadow 0 0 5px #dfdfdf
        position relative
        .inp
          width 100%
          height 100%
          outline none
          border none
          float left
          padding-left 10px
          border-radius 3px
          box-sizing border-box
          &::-webkit-input-placeholder
            color #DDDFE4
            font-size 10px
        .search_icon
          position absolute
          display inline-block
          width 20px
          height 20px
          line-height 20px
          text-align center
          right 0px
          top 2.5px
          img
            width 65%
      .selectDate
        position relative
        float left
        width 220px
        height 20px
        line-height 20px
        background-color: #fff
        border 1px solid #dfdfdf
        box-shadow 0 0 5px #dfdfdf
        border-radius 3px
        text-align center
        background url("./search-gray.png") no-repeat center right 8px
        -webkit-background-size 12px 12px
        .el-range-separator
          position absolute
          left 87px
        .search_icon
          position absolute
          right 10px
          top 2.5px
          display inline-block
          width 20px
          height 20px
          img
            width 65%
  .check
    width 100%
    height 35px
    line-height 35px
    border 1px solid #dfdfdf
    .Checked
      color #41b4ec
    .check_left
      padding 0 60px 0 30px
      float left
      cursor pointer
    .check_right
      float left
      cursor pointer
    .right_yellow
      position relative
      float right
      width 30px
      height 30px
      padding-right 30px
      &:hover
        div
          display block
      div
        position absolute
        right 50px
        top 30px
        width:150px
        box-shadow 0 0 3px gray
        background-color: #fff
        line-height 20px
        display none
        padding 5px
      img
        width 20px
        vertical-align middle

  .content
    width 100%
    height 670px
    overflow auto
    background-color: #f9f9f9
    input
      width 20px
      height 20px
      vertical-align middle
    table
      width 95%
      margin 0 auto 50px
      tr:nth-of-type(1)
        box-shadow 0 0 30px #dfdfdf
      tr
        height 40px
        line-height 40px
        background-color: #fff
        box-shadow 0 0 30px #dfdfdf
        margin-bottom 10px
        width 100%
        th
          background-color: #f9f9f9
          font-weight bold
          margin-top 10px
        .photoWK
          img
            width 25px
            vertical-align middle
        td
          text-align center
          p
            position relative
            span
              position absolute
              display inline-block
              background-color: #fff
              height 15px
              line-height 15px
              left 30%
              top 33px
              box-shadow 0 0 5px #dfdfdf
              padding 0 10px
              display none
          &:last-child
            p
              &:hover
                cursor pointer
        td:nth-of-type(6):hover,td:nth-of-type(7):hover
          .hover
            display block
            color #5a5b5d
        td:nth-of-type(2)
          position relative
        td:nth-of-type(2) img
          position absolute
          left 10px
          top 14px
          display inline-block
          width 15px
  .invoicesList_wraper
    width 100%
    height 491px
    overflow auto
    background-color: #f9f9f9
    .invoices_header
      height 40px
      line-height 40px
      width 100%
      span
        font-size 10px
        font-weight bold
        color #5a5b5d
        margin-right 50px
        &:nth-of-type(1)
          margin-left 100px
          margin-right 50px
        &:nth-of-type(4)
          margin-right 70px
        &:nth-of-type(6)
          margin 0 85px
          margin-right 95px
        &:nth-of-type(9)
          margin-right 65px

    .invoice_item
      position relative
      width 95%
      height 35px
      line-height 35px
      background-color #fff
      box-shadow 0 0 5px #dfdfdf
      margin 0 20px 0 50px
      margin-bottom  10px
      .list
        overflow hidden
        div
          float left
          text-align center
          text-overflow ellipsis
          white-space nowrap
        div:nth-of-type(1)
          width 10%
        div:nth-of-type(2)
          width 6%
        div:nth-of-type(3)
          width 10%
        div:nth-of-type(4)
          width 5%
        div:nth-of-type(5)
          width 16%
        div:nth-of-type(6)
          width 16%
        div:nth-of-type(7)
          width 9%
        div:nth-of-type(8)
          width 6%
        div:nth-of-type(9)
          width 9%
        div:nth-of-type(10)
          width 7%
          color #41b4ec

      label
        .checkbox
          position absolute
          left -20px
          top 12px
          display inline-block
          width 12px
          height 12px
  .invoices_footer
    position fixed
    bottom 0
    left 0
    width 100%
    height 40px
    line-height 40px
    background-color: rgba(90, 91, 93, 0.75)
    box-sizing border-box
    padding-left  50px
    z-index 800
    input
      position absolute
      width 20px
      height 20px
      margin-left 10px
      margin-top 10px
      left 20px
      top 4px
    span
      margin-left: 20px
      color #fff
      &:nth-of-type(1)
        margin-left 10px
      &:nth-of-type(4)
        font-size 16px
    button
      width 100px
      height 25px
      background-color: #41b4ec
      border none
      font-size 11px
      color #fff
      margin-left 30px
      &:hover
        cursor pointer
      &:disabled
        opacity .8
        cursor not-allowed
  .MessageBox
    .mask
      position fixed
      left 0
      top 0
      width:100%
      height 100%
      background-color: rgba(0,0,0,0.5)
      z-index 999
    .messagebox-body
      position fixed
      top 50%
      left 50%
      transform translate(-50%, -50%)
      background-color: #fff
      box-shadow 0 0 5px gray
      z-index 1001
    .close_MessageBox
      position absolute
      top 12px
      right 12px
      font-size 20px
      display inline-block
      width 13px
      height 13px
      color #b3b2b3
      background url("./close.png") no-repeat center center
      -webkit-background-size 100%
      &:hover
        cursor pointer
    &.show_messageBox-enter-active, &.show_messageBox-leave-active
      transition opacity 0.3s
    &.show_messageBox-enter, &.show_messageBox-leave-to
      opacity 0
    .messages1
      width 380px
      height 260px
      text-align center
      button
        width 100px
        height 28px
        line-height 28px
        background-color: #fff
        border 1px solid #0e91ee
        color #0e91ee
        border-radius 3px
      p
        text-align center
        &:nth-of-type(1)
          font-size 18px
          margin-top 80px
          img
            width 20px
            height 20px
            vertical-align middle
            margin-right 10px
        &:nth-of-type(2)
          color #979797
          margin  30px 0 30px 0
        &:nth-of-type(3)
          button
            width: 100px
            height 30px
            border 1px solid #41b4ec
            background-color: #fff
            border-radius 3px
            color #41b4ec
            outline none
            &:nth-of-type(1)
              margin-right 20px
    .messages2
      p
        &:nth-of-type(2)
          box-sizing border-box
          padding-left 20px
          font-size 12px
    .invoiceDetail_message
      width 800px
      height 500px
      overflow auto
      .invoice_bg
        position relative
        margin-left 30px
        margin-right 30px
        margin-top 22px
        -webkit-background-size 100%
        text-align center
        #imgsviewer
          height 370px
        img
          height 100%
        .control_img
          position absolute
          right -60px
          top 100px
          span
            display block
            width 30px
            height 30px
            margin-bottom 30px
      .invoice-url-null
        display flex
        align-items center
        img
          vertical-align middle
        span
          color #666
          font-size 18px
          font-weight bold
          margin-left 10px
      .detailNews
        width 90%
        overflow hidden
        border-bottom:1px solid #dfdfdf
        margin 5px auto
        padding 8px 0 8px
        .detailNews_contentTitle
          margin-bottom 10px
        .detailNews_contentTop
          overflow: hidden;
        .middle_left
          width 33%
        .middle_middle
          width 67%
        .middle_left,.middle_middle
          float left
          padding 5px 0
          color #5a5b5d
          li
            height 20px
            line-height 20px
        .left,.middle,.right
          float left
          margin-left 20px
          width 30%
          color #5a5b5d
          li
            height 20px
            line-height 20pxgray
        .left
          margin-top 0
          margin-left 0
        p
          text-align left
          margin:8px 0 5px
          span
            display inline-block
            &:nth-of-type(1)
              width 12px
              margin-right 3px
              img
                width 100%
                vertical-align middle
                margin-bottom 2px
            &:nth-of-type(2)
              font-size 11px
              font-weight bold
              color #5a5b5d
            &:nth-of-type(3)
                width 55px
                margin-left 3px
                img
                  width 100%
                  vertical-align middle
                  margin-bottom 3px
        .right
          .miwen_wrap
            position relative
            &:hover
              .miwen
                display block
            .miwen
              position absolute
              left 30px
              top 0
              display inline-block
              width 200px
              box-shadow 0 0 3px gray
              background-color: #fff
              line-height 15px
              padding 3px
              font-style normal
              display none
    .table_wrap
      padding-bottom 30px
      p
        text-align left
        margin:20px 0 5px
        padding-left  5%
        span:nth-of-type(2)
          font-size 11px
          color #5a5b5d
          font-weight bold
        img
          width 12px
          vertical-align middle
          margin-bottom 2px
          margin-right 3px
      .table
        width 90%
        margin-left 5%
        text-align left
        margin-top 10px
        box-sizing border-box
        tr
          height 30px
          line-height 30px
          color #5a5b5d
          th
            font-weight bold
          th:nth-of-type(1)
            padding-left 10px
          td:nth-of-type(1)
            padding-left 10px
        tr:nth-of-type(2n)
          background-color: #f2f2f2
        tr:hover
          background-color: #EDF3FE
    .messages3
      p:nth-of-type(2)
        text-align center
    .messages4
      width 650px
      height:550px
      .wk_title_content
        width 90%
        margin 0 auto
        height 30px
        line-height 30px
        font-weight bold
        span
          display inline-block
          text-align center
          &:nth-of-type(1)
            width 26%
          &:nth-of-type(2)
            width 26%
          &:nth-of-type(3)
            width 48%
      .close_MessageBox
        position absolute
        top 30px
        right 30px
        font-size 20px
        display inline-block
        width 13px
        height 13px
        color #b3b2b3
        background url("./close.png") no-repeat center center
        -webkit-background-size 100%
      p:nth-of-type(1)
        margin-top 25px
        text-align left
        width 85%
        margin 35px auto 10px
        font-size 12px
        color #5a5b5d
        span
          font-weight bold
        img
          width 15px
          height 15px
          vert-align middle
      p:nth-of-type(2)
        width 85%
        margin 25px auto
        text-align left
        color #5a5b5d
        font-size 9px
        span:nth-of-type(1),span:nth-of-type(2)
          color #41b4ec
          font-size 14px
          margin 0 8px
        span:nth-of-type(2)
          color orange
      p:nth-of-type(3)
        height 30px
        line-height 30px
        text-align left
        color #5a5b5d
        font-size 10px
        span
          display inline-block
          font-weight bold
          &:nth-of-type(1)
            margin-right 75px
            margin-left 50px
          &:nth-of-type(2)
            margin-right 160px
      p:nth-of-type(4)
        height 80px
        line-height 80px
        button
          width 90px
          height 23px
          border 1px solid #41b4ec
          border-radius 3px
          outline none
          background-color: #fff
          color #41b4ec
          font-size 10px
          &:nth-of-type(1)
            margin-right 15px
      .middleBox
        width 100%
        height 300px
        border 1px solid #dfdfdf
        border-right none
        border-left none
        padding 5px 0
        overflow auto
        .middleBox_content
          width 90%
          margin 0 auto
          line-height 25px
          height 25px
          color #5a5a5a
          li
            width 100%
            span
              display inline-block
              text-align center
              &:nth-of-type(1)
                width 26%
              &:nth-of-type(2)
                width 26%
              &:nth-of-type(3)
                width 48%
      .bottom_btn
        width 100%
        text-align center
        height 90px
        line-height 90px
        button
          width 100px
          background-color: #fff
          border 1px solid #41b4ec
          height 25px
          line-height 25px
          color  #41b4ec
          border-radius 2px
          outline none
  .el-date-editor
    position relative
    width 100% !important
    height 100% !important
    line-height 25px !important
    padding 0 !important
    border none

    .el-range-input
      position absolute
      top 0px
      padding 0 !important
      font-size 10px !important
      &:nth-of-type(1)
        left 10px
      &:nth-of-type(2)
        right 30px
    .el-range-separator
      position absolute
      left 78px
      top -4px
      color gray
    .el-input__icon el-range__icon,.el-icon-date
      display none !important
    .el-icon-circle-close
      position absolute
      top -3px
      right 20px
      /*display none*/
      background-color: transparent
      z-index 700
    .is-active
      outline:none


</style>
