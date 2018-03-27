<template>
  <div class="print_wraper">
    <button class="doPrint" @click="print_page" id="doPrint">打印</button>
    <h1>报销信息</h1>
    <p><span>姓名：{{username}}</span><span>手机号码：{{mobile}}</span><span>报销发票总金额：{{totalPrice2}}元</span>
      <span>报销发票总数量：{{checkedModel2.length}}张</span>  <i class="prompt" id="isBlock">提示：打印前请选择“横向”布局！</i></p>
    <div class="showList">
      <table>
        <tr>
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
        </tr>
        <tr v-for="(invoice,index) in this.checkedModel2">
          <td>{{invoice.invoiceCode}}</td>
          <td>{{invoice.invoiceNo}}</td>
          <td>{{invoice.paperDrewDate}}</td>
          <!--<td><img src="./normalInvNote.png" alt=""></td>-->
          <td  class= "photoWK_print" v-show="invoice.invoiceType=='ce'"><p><img src="./dian.png" alt="" ></p></td>
          <td  class= "photoWK_print" v-show="invoice.invoiceType=='s'"><p><img src="./zhuan.png" alt=""></p></td>
          <td  class= "photoWK_print" v-show="invoice.invoiceType=='v'"><p><img src="./ji.png" alt=""></p></td>
          <td  class= "photoWK_print" v-show="invoice.invoiceType=='c'"><p><img src="./pu.png" alt=""></p></td>

          <td>{{invoice.sellerName	}}</td>
          <td>{{invoice.purchaserName}}</td>
          <td>￥{{invoice.amountWithTaxStr}}</td>
          <td v-text="invoice.invoiceFlag !== '1' ? '作废' : '正常'"></td>
          <td v-text="verifyFlag[+invoice.verifyFlag + 1]"></td>
          <td v-text="invoice.processTime"></td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script>
  import global_ from '../../components/tool/Global'
  import http from '../wk_common/js/http'
  export default{

    data(){
      return{
        verifyFlag: [
          '未验真',
          '验真中',
          '验真成功',
          '验真失败'
        ],
        totalPrice2:'',
        checkedModel2:'',
         token:"",
        invoicesListAlready:"",
        mobile:"",
        username:"",
        userId:"",


      }
    },
    created(){
      this.checkedModel2 =  JSON.parse(this.$route.query.checkedModel2)
      this.totalPrice2 =  this.$route.query.totalPrice2
      this.userId=JSON.parse(sessionStorage.getItem('userId'))

    },
  methods:{
    data(){
      return{
       doPrint:true
      }
    },
   /* invoicesListAlready2(){
      if(this.arr1.length > 0){
        return	this.invoicesListAlready.filter((number)=> {
          return number.invoiceMain.paperDrewDate <= this.arr1[1] && number.invoiceMain.paperDrewDate >= this.arr1[0]

        })
      }else {
        return	this.invoicesListAlready
      }
    },*/


    print_page() {

      if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
        remove_ie_header_and_footer();
      }

      let doPrint=document.getElementById('doPrint')
      doPrint.style.display='none'
      let isBlock=document.getElementById('isBlock')
      isBlock.style.display='none'

      window.print();
      doPrint.style.display='block'
      isBlock.style.display='block'

    },
    remove_ie_header_and_footer() {
      let hkey_path;
      hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
      try {
        let RegWsh = new ActiveXObject("WScript.Shell");
        RegWsh.RegWrite(hkey_path + "header", "");
        RegWsh.RegWrite(hkey_path + "footer", "");
      } catch (e) {
      }
    }
  },
    mounted(){
      //this.mobile=JSON.parse(sessionStorage.getItem('mobile'))
      //this.username=JSON.parse(sessionStorage.getItem('username'))
      this.mobile=sessionStorage.getItem('mobile')
      this.username=sessionStorage.getItem('username')

      console.log( this.mobile, this.username,9999)


      /*已报销的请求*/
      this. token=JSON.parse(sessionStorage.getItem('token'))

      const dataMap={
        dataMap:JSON.stringify({
          "id" : this.userId,//动态的
          "processFlag" : "1",  //1/-1未报销
          "page" : 1,//第几页
          "row" : 10,//一页几条
          "invoiceCode":"",
          "invoiceNo":"",
          "startTime":"",
          "endTime":"",
          "token":this. token
        }),
      }

      const apikey=this. token
      const url=global_.httpUrl+apikey+'&method=xforceplus.toc.getPersonalPurchaseInvoiceList'
      http.post(url,dataMap)
        .then((response=>{
          console.log(response,"获取列表")

        }))
    },

  }
</script>
<style media="print">
  @page {
    size: auto;
    margin: 0mm;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">

.print_wraper
  position relative
  width 100%
  height: 594px
  margin 0 auto
  padding-top 20px
  table
    th
      font-weight bold
  .prompt
    color red
  .doPrint
    position absolute
    right 2.5%
    top 4%
    background-color: #41b4ec
    width 100px
    height 30px
    border none
    color #fff
    outline none
  h1
    height 100px
    line-height 100px
    font-size 25px
    text-align center
    color #333333
  p
    width 95%
    margin 0 auto
    height: 25px
    line-height 25px
    font-size 14px
    color #5a5b5d
    .prompt
      font-style normal
      float right
      font-weight bold
    span
      margin-left 30px
      font-weight bold
  .showList
    width 95%
    margin 0 auto
    border 1px solid  #9b9b9b
    padding-bottom 10px
    .photoWK_print
      img
        width 25px
        height 100%
        vertical-align middle
    table
      width 100%
      text-align center
      color #5a5b5d
      font-size 10px
      tr
        height 25px
        line-height 25px
        font-size 10px
      tr:hover
        background-color: #EDF3FE

</style>
