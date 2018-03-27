<template>
  <div class="showInvoices_wraper">
    <header>
      <span class="icon_top"><img src="./taxClassification.png" alt=""></span>
      <router-link to="/print">
        <span class="text_top">我的票税助手</span>
      </router-link>

      <input placeholder="请输入发票代码" class="inp" v-model="SelectInvoiceCode"></input><span  id="search" @click="selectInvouceCode"><img   src="./search-gray.png" alt=""></span>
      <input placeholder="请输入发票号码" class="inp" v-model="SelectInvoiceNo"></input><span  id="search1" @click="selectInvouceNo"><img  src="./search-gray.png" alt=""></span>
      <div class="selectDate">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="选择日期"
          end-placeholder="选择日期">
        </el-date-picker>
        <span class="search_gray" ><img src="./search-gray.png" alt=""></span>

      </div>
      <!--<input placeholder="选择日期 → 选择日期" class="inp"></input>-->
    </header>
    <div class="check">
     <div class="check_left" v-bind:class="{ Checked: CheckedN }" @click="showNot">未报销 ({{invoicesList.length}})</div>
      <div class="check_right" v-bind:class="{ Checked: CheckedA }" @click="showAlready">已报销 ({{invoicesListAlready.length}})</div>
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
<!--
          <td><input type="checkbox" @click="checkOne(invoice.invoiceMain.invoiceId)" :checked="checkedInvoiceIds.indexOf(invoice.invoiceMain.invoiceId)>=0" ></td>
-->       <td><input type="checkbox" v-model="checkedModel" :value="invoice.invoiceMain"></td>
          <td><p>{{invoice.invoiceMain.invoiceCode}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceNo}}</p></td>
          <td><p>{{invoice.invoiceMain.paperDrewDate}}</p></td>
          <td><p><img src="./normalInvNote.png" alt=""></p></td>
          <td><p>{{invoice.invoiceMain.sellerName	}}</p></td>
          <td><p>{{invoice.invoiceMain.purchaserName}}</p></td>
          <td><p>￥{{invoice.invoiceMain.amountWithTax}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceFlag}}</p></td>
          <td><p>{{invoice.invoiceMain.verifyFlag}}</p></td>
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
          <!--<td><input type="checkbox"></td>-->
          <td><input type="checkbox" v-model="checkedMode2" :value="invoice.invoiceMain"></td>
          <td><p>{{invoice.invoiceMain.invoiceCode}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceNo}}</p></td>
          <td><p>{{invoice.invoiceMain.paperDrewDate}}</p></td>
          <td><p><img src="./normalInvNote.png" alt=""></p></td>
          <td><p>{{invoice.invoiceMain.sellerName	}}</p></td>
          <td><p>{{invoice.invoiceMain.purchaserName}}</p></td>
          <td><p>￥{{invoice.invoiceMain.amountWithTax}}</p></td>
          <td><p>{{invoice.invoiceMain.invoiceFlag}}</p></td>
          <td><p>{{invoice.invoiceMain.verifyFlag}}</p></td>
          <td><p>{{invoice.invoiceMain.createTime}}</p></td>
          <td @click="showDetailNews(index)"><p style="color: #0e91ee">查看详情</p></td>
        </tr>
      </table>
    </div>
  <!--  <div class="invoicesList_wraper" v-show="not">
      <div class="invoices_header">
        <span>发票代码</span>
        <span>发票号码</span>
        <span>开票日期</span>
        <span>发票类型</span>
        <span>销方公司名称</span>
        <span>购方公司名称</span>
        <span>含税金额</span>
        <span>发票状态</span>
        <span>验真状态</span>
        <span>操作</span>
      </div>
      <div class="invoice_item" v-for="(invoice,index) in this.invoicesList">
        <label for="one" @click="one">
          <input type="checkbox" class="checkbox" checked="checked" >
        </label>
        <div id="two" class="list" >
          &lt;!&ndash;<span>
            101010399900
            <i>
              <img src="./abnormal.png" >
              <span class="abnormalMessage">票面抬头与公司名称(税号)不一致！</span>
            </i>
          </span>
          <span>1010103999</span>
          <span>2017.12.12</span>
          &lt;!&ndash;<span><img src="./specialInvNote.png" ></span>&ndash;&gt;
          <span><img src="./normalInvNote.png" ></span>
          <span><b>深圳市至高准图书出版有限深圳市至高准图书出版有限</b>
            <i>深圳市至高准图书出版有限</i>
          </span>
          <span>
            上海云砺信息科技有限公司
            <i>
              上海云砺信息科技有限公司
            </i>
          </span>
          <span>¥9,999.99</span>
          <span>正常</span>
          <span>验真成功</span>
          <span @click="showDetailNews">查看详情</span>&ndash;&gt;
          <div>{{invoice.invoiceMain.invoiceCode}}</div>
          <div>{{invoice.invoiceMain.invoiceNo}}</div>
          <div>{{invoice.invoiceMain.paperDrewDate}}</div>
          <div><img src="./normalInvNote.png" alt=""></div>
          <div>{{invoice.invoiceMain.sellerName	}}</div>
          <div>{{invoice.invoiceMain.purchaserName}}</div>
          <div>{{invoice.invoiceMain.amountWithTax}}</div>
          <div>{{invoice.invoiceMain.invoiceFlag}}</div>
          <div>{{invoice.invoiceMain.verifyFlag}}</div>
          <div @click="showDetailNews(index)">查看详情</div>
        </div>

      </div>

    </div>

    <div class="invoicesList_wraper already" v-show="already">
      <div class="invoices_header">
        <span>发票代码</span>
        <span>发票号码</span>
        <span>开票日期</span>
        <span>发票类型</span>
        <span>销方公司名称</span>
        <span>购方公司名称</span>
        <span>含税金额</span>
        <span>发票状态</span>
        <span>验真状态</span>
        <span>操作</span>
      </div>
      <div class="invoice_item" v-for="(invoice,index) in this.invoicesListAlready">
        <label for="one">
          <input type="checkbox" class="checkbox" >
        </label>
        <div id="one" class="list">
          &lt;!&ndash;<span>
            101010399900
            <i>
              <img src="./abnormal.png" >
              <span class="abnormalMessage">票面抬头与公司名称(税号)不一致！</span>
            </i>
          </span>
          <span>1010103999</span>
          <span>2017.12.12</span>
          &lt;!&ndash;<span><img src="./specialInvNote.png" ></span>&ndash;&gt;
          <span><img src="./normalInvNote.png" ></span>
          <span>深圳市至高准图书出版有限
            <i>深圳市至高准图书出版有限</i>
          </span>
          <span>
            上海云砺信息科技有限公司
            <i>
              上海云砺信息科技有限公司
            </i>
          </span>
          <span>¥9,999.99</span>
          <span>正常</span>
          <span>验真成功</span>
          <span @click="showDetailNews">查看详情</span>&ndash;&gt;
          <div>{{invoice.invoiceMain.invoiceCode}}</div>
          <div>{{invoice.invoiceMain.invoiceNo}}</div>
          <div>{{invoice.invoiceMain.paperDrewDate}}</div>
          <div><img src="./normalInvNote.png" alt=""></div>
          <div>{{invoice.invoiceMain.sellerName	}}</div>
          <div>{{invoice.invoiceMain.purchaserName}}</div>
          <div>{{invoice.invoiceMain.amountWithTax}}</div>
          <div>{{invoice.invoiceMain.invoiceFlag}}</div>
          <div>{{invoice.invoiceMain.verifyFlag}}</div>
          <div @click="showDetailNews(index)">查看详情</div>
        </div>

      </div>
    </div>-->
    <!--未报销-->
    <footer class="invoices_footer" v-show="not">
      <!--<input type="checkbox" @click='checkedAll()' :checked="checkedInvoiceIds.length === invoicesList.length">-->
      <input type="checkbox" v-model="checkedAll" @change="changeState">
      <span>全选</span>
      <!--<span>{{checkedInvoiceIds.length}}/{{invoicesList.length}}</span>-->
      <span>{{checkedModel.length}}/{{this.invoicesList2().length}}</span>
      <span>已选发票总金额：</span>
      <!--<span>¥99.999</span>-->
      <span>¥{{totalPrice}}</span>
      <button @click="showMessageBox" >提交报销</button>
    </footer>
    <!--已报销-->
    <footer class="invoices_footer" v-show="already">
      <input type="checkbox" v-model="checkedAll2" @change="changeState2">
      <!--<input type="checkbox">-->
      <span>全选</span>
      <!--<span>4/{{invoicesListAlready.length}}</span>-->
      <span>{{checkedMode2.length}}/{{this.invoicesListAlready2().length}}</span>
      <span>已选发票总金额：</span>
      <span>¥{{totalPrice2}}</span>
      <button >打印列表</button>
      <button  >打印列表及明细</button>
    </footer>
    <!--MessageBox-->
    <transition name="show_messageBox">
      <div class="MessageBox" v-show="MessageBox">
        <div class="messages1" v-show="responseData.status=='1'">
          <span class="close_MessageBox" @click="closeMessageBox"></span>
          <p><span><img src="./Bx.png" alt=""></span><span>报销成功</span></p>
          <p>本次成功报销{{responseData.successNo}}张发票。</p>
          <p><button>打印列表</button><!--<button>打印列表及明细</button>--></p>    <!--打印列表-->
        </div>
        <div class="messages1 messages2"  v-show="false">
          <span class="close_MessageBox" @click="closeMessageBox"></span>
          <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
          <p class="tel">请先绑定手机号，再执行报销！</p>
        </div>
              <!--v-show="detailNewsShow"-->
        <div class="invoiceDetail_message" v-show="invoiceDetail_message">
          <span class="close_MessageBox" @click="closeMessageBox"></span>
            <div class="invoice_bg">
              <img :src="imgUrl">
              <span><img src="./add.png" alt=""></span>
              <span><img src="./back.png" alt=""></span>
              <span><img src="./refresh.png" alt=""></span>
            </div>
            <div class="detailNews">
              <p>
                <span><img src="./circle.png" alt=""></span>
                <span>基础信息</span>
                <span><img src="./success.png" alt=""></span>
              </p>
              <ul class="left">
                <li>发票类型：{{invoiceMain.invoiceType=="s"?"专用发票":"" || invoiceMain.invoiceType=="c"?"普通发票":"" || invoiceMain.invoiceType=="ce"?"电子普通发票":"" }}</li>
                <li>发票号码：{{invoiceMain.invoiceNo}}</li>
                <li >发票代码：{{invoiceMain.invoiceCode}}</li><!--{{invoice.invoiceDetails.invoiceCode}}-->
                <li>机器编码：{{invoiceMain.machineCode}}</li>
              </ul>
              <ul class="middle">
                <li>不含税金额：{{invoiceMain.amountWithoutTax}}</li>
                <li>含税金额：¥{{invoiceMain.amountWithTax}}</li>
                <li>税额：¥{{invoiceMain.taxAmount}}</li>
                <li>校验码：{{invoiceMain.checkCode}}</li>
              </ul>
              <ul class="right">
                <li>结算单号：333333333</li>
                <li>开票日期：{{invoiceMain.paperDrewDate}}</li>
                <li>密文：{{invoiceMain.cipherText}}</li>
                <li>备注：结算单号：23...</li>
              </ul>
            </div>
            <div class="detailNews">
              <p>
                <span><img src="./circle.png" alt=""></span>
                <span>购方信息</span>
              </p>
              <ul class="middle_left">
                <li>购方名称：{{invoiceMain.purchaserName}}</li>
                <li>购方税号：{{invoiceMain.purchaserTaxNo}}</li>
                <li>购方代码：代码</li>
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
                <li>销方名称：{{invoiceMain.sellerName}}</li>
                <li>销方税号：{{invoiceMain.sellerTaxNo}}</li>
                <li>销方代码：310456245689752</li>
              </ul>
              <ul class="middle_middle">
                <li>销方地址/电话：{{invoiceMain.sellerAddress}}&nbsp &nbsp &nbsp {{invoiceMain.sellerTel}}</li>
                <li>销方银行名称/账号：{{invoiceMain.sellerBankName}}&nbsp &nbsp &nbsp{{invoiceMain.sellerTel}}</li>
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
                  <th>金额</th>
                  <th>税率</th>
                  <th>税额</th>
                </tr>
                <tr v-for="invoiceDetail in invoiceDetails">
                  <td>{{invoiceDetail.cargoName}}</td>
                  <td>{{invoiceDetail.itemSpec}}</td>
                  <td>{{invoiceDetail.quantityUnit}}</td>
                  <td>{{invoiceDetail.quantity	}}</td>
                  <td>¥{{invoiceDetail.unitPrice}}</td>
                  <td>¥{{invoiceDetail.amountWithTax}}</td>
                  <td>{{invoiceDetail.taxRate}}</td>
                  <td>¥{{invoiceDetail.taxAmount}}</td>
                </tr>

              </table>
            </div>
        </div>
        <div class="messages1 messages3"  v-show="false">
          <span class="close_MessageBox" @click="closeMessageBox"></span>
          <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
          <p class="tel">票面抬头与公司名称(税号)不一致，无法报销！</p>
        </div>

        <!--报销部分成功-->
        <div class="messages1 messages4" v-show="this.responseData.status=='0'">
          <span class="close_MessageBox" @click="closeMessageBox"></span>
          <p><span><img src="./hint.png" alt=""></span><span>报销部分成功</span></p>
          <p>本次成功报销<span>{{responseData.successNo}}</span>张发票，报销失败<span>{{responseData.failNo}}</span>张发票。</p>
          <p><span>发票代码</span><span>发票号码</span><span>失败原因</span></p>

          <div class="middleBox">
            <table>
              <tr v-for="failDetail in responseData.details">
                <td>{{failDetail.invoiceCode}}</td>
                <td>{{failDetail.invoiceNo}}</td>
                <td>{{failDetail.message}}</td>
              </tr>

            </table>
          </div>
          <p>
            <span style="color: #0e91ee">如需打印报销结果，请切换至“已报销”列表</span>
            <!--<button>打印列表及明细</button>-->
          </p>
        </div>

        <!--此发票已被他人报销，请联系财务人员！-->
        <div class="messages1 messages5" v-show=""><!--responseData.detail.-->
          <span class="close_MessageBox" @click="closeMessageBox"></span>
          <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
          <p class="tel">此发票已被他人报销，请联系财务人员！</p>
        </div>

        <!--请先绑定姓名，再执行报销！-->

        <div class="messages1 messages6" v-show="responseData.status=='-1'">
          <span class="close_MessageBox" @click="closeMessageBox"></span>
          <p><img src="./import_failed.png" alt=""><span>报销失败</span></p>
          <!--<p class="tel">请先绑定姓名，再执行报销！</p>-->
          <p class="tel">{{responseData.msg}}</p>
        </div>
      </div>
    </transition>







  </div>
</template>

<script>
  import global_ from '../../components/tool/Global'
  import http from '../wk_common/js/http'
  import utils from './utls/utils'
  import index from '../../router/index'
  export default{
    data(){
      return{
        /*checkedInvoiceIds:[],*/
        checkedAll:false,
        checkedModel:[],
         total:0,
         checkedID:[],
         checkedAll2:false,
         checkedMode2:[],
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
        /*checkedInvoiceId:[],
        isCheckedAll: false,*/
        showInvoiceToken:"",
        responseData:"",

      }
    },
    watch:{
      value1(newValue,oldValue){
       if(newValue&&newValue.length>0 ){
         this.arr1[0] = utils.dateformat(newValue[0],'yyyyMMdd')
         this.arr1[1] = utils.dateformat(newValue[1],'yyyyMMdd')
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
      checkedMode2:{
        handler(){
          // console.log(345,this.checkedModel.length,this.invoicesList2().length)
          if(this.checkedModel2.length ==this.invoicesListAlready2().length){
            this.checkedAll2 = true
          }else {
            this.checkedAll2 = false
          }


        },
        deep:true
      },
    },


    computed:{
      totalPrice(){
        this.total = 0
        for(var i = 0;i<this.invoicesList.length;i++){

          this.total = Number(Number(Number(this.total).toFixed(2)) + Number(Number(this.checkedModel[i].amountWithTax).toFixed(2))).toFixed(2)
          console.log(456,this.total)
        }
        return this.total
      },
      totalPrice2(){
        this.total2 = 0
        for(var i = 0;i<this.invoicesListAlready.length;i++){

          this.total2 = Number(Number(Number(this.total).toFixed(2)) + Number(Number(this.checkedModel2[i].amountWithTax).toFixed(2))).toFixed(2)
          console.log(456,this.total)
        }
        return this.total2
      },
    },


    methods:{

      /*选择checkbox*/
      changeState(){
        this.checkedModel = []
        if(this.checkedAll == true){
          this.invoicesList2().forEach((value,index)=>{
            this.checkedModel.push(value.invoiceMain)
          })
        }


      },

/*
      /!*选择checkbox*!/
      checkOne(invoiceId){

        let idIndex = this.checkedInvoiceIds.indexOf(invoiceId)
        if (idIndex >= 0) {
          // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
          this.checkedInvoiceIds.splice(idIndex, 1)
        } else {
          // 选中该checkbox
          this.checkedInvoiceIds.push(invoiceId)
        }
        //console.log( this.checkedInvoiceIds,88888)
      },*/
     /* checkedAll(){

       // alert(this.checkedInvoiceIds.length)
        this.isCheckedAll = !this.isCheckedAll
        if (this.isCheckedAll) {
          // 全选时
          this.checkedInvoiceIds = []
          this.invoicesList.forEach( (invoice) =>{

            //console.log(invoice.invoiceMain.invoiceId,87777)
            this.checkedInvoiceIds.push(invoice.invoiceMain.invoiceId)
          }, this)
        } else {
          this.checkedInvoiceIds = []
        }

      },*/

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
      	this.result = this.invoicesList
        this.not=true
        this.already=false
        this.CheckedN=true
        this.CheckedA=false
        const dataMap={
          dataMap:JSON.stringify({
            "id" : 795,//动态的
            "processFlag" : "-1",  //1/-1未报销
            "page" : 1,//第几页
            "row" : 10,//一页几条
            "invoiceCode":"",
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url=this.pchttp+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,88)
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              this.invoicesList=response.data.result
             // console.log(this.invoicesList,7777)
            }
          }))
      },
      showAlready(){
      	this.result = this.invoicesListAlready
        this.not=false
        this.already=true
        this.CheckedA=true
        this.CheckedN=false
        const dataMap={
          dataMap:JSON.stringify({
            "id" : 795,//动态的
            "processFlag" : "1",  //1/-1未报销
            "page" : 1,//第几页
            "row" : 10,//一页几条
            "invoiceCode":"",
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url=this.pchttp+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              this.invoicesListAlready=response.data.result
              console.log(this.invoicesList,7777)
            }
          }))
      },
      showMessageBox(){

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
        this.showInvoiceToken=JSON.parse(sessionStorage.getItem('showInvoiceToken'))
        //console.log(this.showInvoiceToken,656565)
        const dataMap={
          dataMap:JSON.stringify({
            "token":this.showInvoiceToken,
            "userId":"",
            "invoices":this.checkedInvoiceIds
          }),
        }
        const apikey=this.showInvoiceToken
        const url=this.pchttp+apikey+'&method=xforceplus.toc.updatePersonalPurchaseInvoice'

        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"更新该用户的发票报销状态")
              this.responseData=response.data
            console.log(this.responseData,"this.responseData")

            if(response.data.status==1){                                       /*22*/


            }
          }))







      },
      closeMessageBox(){
        this.MessageBox=false
        this.detailNewsShow=false
        location.reload()
      },
      showDetailNews(inId){
        this.MessageBox=true
       // this.detailNewsShow=true
        this.invoiceDetail_message=true

        this.invoiceMain=this.result[inId].invoiceMain
        console.log( this.invoiceMain,656)
        this.invoiceDetails=this.result[inId].invoiceDetails

        //console.log(this.invoiceMain[inId].invoiceCode,789)
        this.imgUrl=this.result[inId].invoiceMain.imgUrl
        console.log( this.imgUrl)

      },
      one(){
        let two=document.getElementById('two')
        two.style.backgroundColor='pink'
      },
      /*按照发票代码搜索发票*/
      selectInvouceCode(){
        alert(11)
        const dataMap={
          dataMap:JSON.stringify({
            "id" : 795,//动态的
            "processFlag" : "-1",  //1/-1未报销
            "page" : 1,//第几页
            "row" : 10,//一页几条
            "invoiceCode":this.SelectInvoiceCode,
            "invoiceNo":"",
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url=this.pchttp+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              this.result=response.data.result
              this.invoicesList=response.data.result
              console.log(this.invoicesList,"code")

            }

          }))
      },
      /*按照发票号码搜索*/
      selectInvouceNo(){
        alert(222)
        const dataMap={
          dataMap:JSON.stringify({
            "id" : 795,//动态的
            "processFlag" : "-1",  //1/-1未报销
            "page" : 1,//第几页
            "row" : 10,//一页几条
            "invoiceCode":"",
            "invoiceNo":this.SelectInvoiceNo,
            "startTime":"",
            "endTime":"",
            "token":""
          }),
        }
        const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
        const url=this.pchttp+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
        http.post(url,dataMap)
          .then((response=>{
            console.log(response,"获取列表")
            //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
            if(response.data.status==1){
              this.result=response.data.result
              this.invoicesList=response.data.result

              console.log(this.invoicesList,"code")

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
      }
    },
    mounted(){
      const dataMap={
        dataMap:JSON.stringify({
          "id" : 795,//动态的
          "processFlag" : "-1",  //1/-1未报销
          "page" : 1,//第几页
          "row" : 10,//一页几条
          "invoiceCode":"",
          "invoiceNo":"",
          "startTime":"",
          "endTime":"",
          "token":""
        }),
      }

      const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
      const url=this.pchttp+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
      http.post(url,dataMap)
        .then((response=>{
          console.log(response,"获取列表")
          //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
          if(response.data.status==1){
            this.result=response.data.result
           this.invoicesList=response.data.result

            console.log(this.invoicesList,"拿到列表")

          }

        }))


      /*已报销的请求*/
      const dataMap2={
        dataMap:JSON.stringify({
          "id" : 795,//动态的
          "processFlag" : "1",  //1/-1未报销
          "page" : 1,//第几页
          "row" : 10,//一页几条
          "invoiceCode":"",
          "invoiceNo":"",
          "startTime":"",
          "endTime":"",
          "token":""
        }),
      }

      const apikey2="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"
      const url2=this.pchttp+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
      http.post(url2,dataMap2)
        .then((response=>{
          console.log(response,"获取列表")
          //this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
          if(response.data.status==1){
           //this.result=response.data.result
            this.invoicesListAlready=response.data.result



          }

        }))
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.showInvoices_wraper
  header
    position relative
    height 40px
    line-height 40px
    width 100%
    #search
      position absolute
      top 14px
      left 310px
      display inline-block
      width 20px
      height 20px
      line-height 20px
      text-align center
      background-color:transparent
      img
        width 65%
    #search1
      position absolute
      top 14px
      left 485px
      display inline-block
      width 20px
      height 20px
      line-height 20px
      text-align center
      background-color: transparent
      img
        width 65%
    .selectDate
      position absolute
      top 10px
      left 41%
      width 200px
      height 20px
      line-height 20px
      background-color: #fff
      border 1px solid #dfdfdf
      box-shadow 0 0 5px #dfdfdf
      border-radius 3px
      text-align center
      background url("./search-gray.png") no-repeat center right 8px
      -webkit-background-size 12px 12px
      .search_gray
        position absolute
        right 10px
        top 0
        display inline-block
        width 12px
        height 12px
        img
          width 100%
      input
        width 33.33%
        outline none
        &::-webkit-input-placeholder
          color #dfdfdf
          font-size 10px
          font-weight bold
      input:nth-of-type(2)
        margin-left 3px
      img
        width 15px
        vertical-align middle
    .icon_top
      width 20px
      height 20px
      display inline-block
      padding-left  20px
      img
        width 100%
        vertical-align middle
    .text_top
      font-size 13px
      font-weight bold
      color #5a5b5d
      padding-left 10px
      margin-right 40px
    .inp
      margin-right 10px
      width 150px
      height 20px
      border 1px solid #dfdfdf
      border-radius 3px
      outline none
      padding-left 10px
      box-shadow 0 0 5px #dfdfdf
      &::-webkit-input-placeholder
        color #dfdfdf
        font-size 10px
        font-weight bold
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
    .check_right
      float left
  .content
    width 100%
    height 470px
    overflow auto
    background-color: #f9f9f9
    table
      width 95%
      margin 0 auto
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
        td
          text-align center
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
        /*input[type="checkbox"]:checked
          background-color: red*/


      /*.list
        color #5a5b5d
        span
          display inline-block
          margin-right 50px
          &:nth-of-type(1)
            position relative
            padding-left  30px
            margin-right 30px
            i
              position relative
              display inline-block
              position absolute
              left 10px
              top 12px
              z-index 2
              background-color: #fff
              font-style normal
              width 15px
              height 15px
              line-height 15px
              img
                width 100%
              .abnormalMessage
                position absolute
                left 20px
                display none
                height 20px
                line-height 20px
                color orange
                width 1100%
                background-color: #fff
                box-shadow  0 0 5px #dfdfdf
                padding 0 10px
                margin 0
                top 18px
            i:hover
              .abnormalMessage
                display: inline-block
          &:nth-of-type(2)
            margin-right 30px
          &:nth-of-type(3)
            margin-right 55px
          &:nth-of-type(5)

            !*background-color: red
            width 146px*!

          &:nth-of-type(5),&:nth-of-type(6)
            position relative
            margin-left: -10px
            margin-right 85px
            i
              display inline-block
              display none
              position absolute
              left 15px
              top 30px
              z-index 2
              background-color: #fff
              font-style normal
              width 100%
              height 20px
              line-height 20px
              box-shadow  0 0 5px #dfdfdf
              padding 0 10px
          &:nth-of-type(5):hover,&:nth-of-type(6):hover

              i
                display inline-block
          &:nth-of-type(6)
            margin 0 63px 0 0
          &:nth-of-type(7)
            margin 0 60px 0 0
          &:nth-of-type(9)
            margin 0 40px 0 10px
          &:nth-of-type(10)
            color #41b4ec*/
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
      width 13px
      height 13px
      margin-left 20px
      margin-top 14px
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
  .MessageBox
    position fixed
    left 0
    top 0
    width:100%
    height 100%
    background-color: rgba(0,0,0,0.5)
    z-index 999
    &.show_messageBox-enter-active, &.show_messageBox-leave-active
      transition opacity 0.3s
    &.show_messageBox-enter, &.show_messageBox-leave-to
      opacity 0
    .messages1
      position absolute
      top 50%
      left 50%
      margin-left -190px
      margin-top -130px
      width 380px
      height 260px
      background-color: #fff
      box-shadow 0 0 5px gray
      .close_MessageBox
        position absolute
        top 30px
        right 30px
        font-size 20px
        display inline-block
        width 15px
        height 15px
        color #b3b2b3
        background url("./close.png") no-repeat center center
        -webkit-background-size 100%
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
      position absolute
      left 50%
      top 50%
      margin-left -400px
      margin-top: -270px
      width 800px
      height 500px
      background-color #fff
      overflow auto
      .close_MessageBox
        position fixed
        top 60px
        right 265px
        font-size 20px
        display inline-block
        width 13px
        height 13px
        color #b3b2b3
        background url("./close.png") no-repeat center center
        -webkit-background-size 100%
      .invoice_bg
        position relative
        width 600px
        height 370px
        margin-left 60px
        margin-top 40px
        -webkit-background-size 100%
        text-align center
        img
          width 95%

        span
          position absolute
          right -60px
          top 50px
          display inline-block
          width 25px
          height 25px
          img
            width 100%
        span:nth-of-type(1)
          top 130px
        span:nth-of-type(2)
          top 180px
        span:nth-of-type(3)
          top 230px
      .detailNews
        width 90%
        overflow hidden
        border-bottom:1px solid #dfdfdf
        margin 5px auto
        padding 8px 0 8px
        .middle_left
          width 33%
        .middle_middle
          width 50%
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
      width 550px
      height:450px
      margin-top -250px
      margin-left -275px
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
        height 200px
        border 1px solid #dfdfdf
        border-right none
        border-left none
        padding 5px 0
        overflow auto
        table
          width 95%
          margin 0 auto
          color #5a5b5d
          font-size 9px
          tr
            height 22px
            line-height 22px
            td
              text-align center

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
