<template>
 <div>
   <div class="editInvoice_wrap">
     <!--头部-->
     <header v-show="weixin">
      <span class="back" onclick="window.history.go(-1)">
        <i class="icon-arrow_lift">
        </i>返回
      </span>
       <span>编辑发票</span>
     </header>

     <div class="invoice_type">
       <span>发票类型：</span>
       <select name="" id="select" @change="changeType">
         <option value="">请选择发票类型</option>
         <option value="ce">电子普通发票</option>
         <option value="s">专用发票</option>
         <option value="c">普通发票</option>
       </select>
     </div>

     <!--中间内容部分-->
     <div class="editInvoice_content">

       <!--内容的上部分-->
       <!--
            <div class="editInvoice_content_top normal" v-show="result.invoice.invoiceType=='c'" v-if="result.invoice">
            </div>
            <div class="editInvoice_content_top dedicated" v-show="result.invoice.invoiceType=='s'" v-if="result.invoice">
            </div>
            <div class="editInvoice_content_top  noneType" v-show="result.invoice.invoiceType==''" v-if="result.invoice">
              <h2>未识别出发票类型</h2>
            </div>
            <div class="editInvoice_content_top  noneType" v-show="result.invoice.invoiceType=='a'" v-if="result.invoice">
              <h2>您上传的图片不是发票</h2>
            </div>

            <div class="editInvoice_content_top electronic" v-show="result.invoice.invoiceType=='ce'" v-if="result.invoice">
            </div>-->
       <!--内容的中-->
       <div class="editInvoice_content_middle">
         <!--上部分-->
         <ul class="ecm_t">
           <li><span>付款方</span><input type="text" value="北京多来点信息技术有限公司" v-model="result.invoice.purchaserName" v-if="result.invoice"/></li>
           <li><span>纳税人识别号：</span><input type="text" value="76543223456789098X" v-model="result.invoice.purchaserTaxNo" v-if="result.invoice"/></li>
           <li><span>地址、电话：</span><input type="text" value="111" v-model="result.invoice.purchaserAddress" v-if="result.invoice"/></li>
           <li><span></span><input type="text" value="8789876" v-model="result.invoice.purchaserTel" v-if="result.invoice"/></li>
           <li><span>开户行账户：</span><input type="text" value="中国银行虹桥临空经济园支行" v-model="result.invoice.purchaserBankName" v-if="result.invoice"/></li>
           <li><span></span><input type="text" value="4322345677889" v-model="result.invoice.purchaserBankAccount" v-if="result.invoice"/></li>
         </ul>
         <dashed></dashed>
         <!--中间部分-->
         <ul class="ecm_t">
           <li><span>收款方</span><input type="text" value="汉堡王（北京）餐饮管理有限公司" v-model="result.invoice.sellerName"  v-if="result.invoice"/></li>
           <li><span>纳税人识别号：</span><input type="text" value="76543223456789098X" v-model="result.invoice.sellerTaxNo" v-if="result.invoice"/></li>
           <li><span>地址、电话：</span><input type="text" value="上海市长宁区金钟路999号3栋701室" v-model="result.invoice.sellerAddress" v-if="result.invoice"/></li>
           <li><span></span><input type="text" value="8789876" v-model="result.invoice.sellerTel" v-if="result.invoice"></li>
           <li><span>开户行账户：</span><input type="text" value="中国银行虹桥临空经济园支行" v-model="result.invoice.sellerBankName" v-if="result.invoice"/></li>
           <li><span></span><input type="text" value="4322345677889" v-model="result.invoice.sellerBankAccount" v-if="result.invoice"/></li>
         </ul>
         <dashed></dashed>

         <ul class="ecm_t " id="common">
           <li><span>校验码</span><input type="text" value="34456764322211112334" v-model="result.invoice.checkCode" v-if="result.invoice"/></li>
           <li><span>发票金额</span><span class="money">￥</span><input class="amountWithTax" type="text" value="¥52" v-model="result.invoice.amountWithTax" v-if="result.invoice"/></li>
           <li><span>发票税额</span><span class="money">￥</span><input class="taxAmount" type="text" value="¥52" v-model="result.invoice.taxAmount" v-if="result.invoice"/></li>
           <li><span>开票日期</span><input type="text" value="2017-09-01" v-model="result.invoice.paperDrewDate" v-if="result.invoice"/></li>
           <li><span>发票号码</span><input type="text" value="88902938" v-model="result.invoice.invoiceNo" v-if="result.invoice"/></li>
           <li><span>发票代码</span><input type="text" value="011001200444" v-model="result.invoice.invoiceCode" v-if="result.invoice"/></li>
         </ul>

         <dashed></dashed>

         <div class="product_detail">
           <table>
             <tr>
               <td>商品明细</td>
               <td>金额</td>
               <td>税率</td>
               <td></td>
             </tr>

             <!--  <tr v-for="detail in result.details" v-if="result.details">
                 <td><input type="text" v-model="detail.cargoName"></td>
                 <td><input type="text" v-model="detail.amountWithTax"></td>
                 <td><input type="text" v-model="detail.taxRate"></td>
               </tr>-->
             <tr  v-for="(detail,index) in result.details" v-if="result.details">
               <td><input type="text" v-model="detail.cargoName" v-if="detail"></td>
               <td ><input type="text" v-model="detail.amountWithTax"></td>
               <td><input type="text" v-model="detail.taxRate"></td>
               <td><span @click="deleteP(index)"></span></td>
             </tr>
             <!--<tr  v-for="detail in result.details" v-if="result.details">
               <td><p >{{detail.cargoName}}</p></td>
               <td >{{detail.amountWithTax}}</td>
               <td>{{detail.taxRate}}</td>
               <td><span @click="deleteP(index)"></span></td>
             </tr>-->
             <!-- <tr>
                <td><p>味全每日c果汁300ml</p></td>
                <td>11.94</td>
                <td>17%</td>
                <td><span @click="deleteP(index)"></span></td>
              </tr>-->

           </table>
         </div>

       </div>
       <div class="bottom">
         <div @click="saveData">保 存</div>
       </div>
       <!--<div  class="footer">

    </div>-->


     </div>


     <!--遮罩-->
     <transition name="fade">
       <div class="deleteShade" v-show="showDeleteShade">
         <div class="reminder">
           <p>是否删除商品明细？</p>
           <p><span @click="cancel">取消</span><span @click="deleteItem(index)">删除</span></p>
         </div>
       </div>
     </transition>



     <!--<div  class="footer">
       <div @click="saveData">保 存</div>
     </div>-->

   </div>
  <div class="review-img" @click="imgBoxHandler" ref="reviewImg" v-if="result.invoice && result.invoice.imgUrl">
    <img :src="result.invoice.imgUrl" alt="">
  </div>
  <div id="loading" v-show="loading"></div>
 </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import dashed from '../dashed/dashed.vue'
  import http from '../../http'
  import { MessageBox } from 'mint-ui';
  import global_ from '../../components/tool/Global'
  export default{
   data(){
     return{
       index:'',
       result:'',
       showDeleteShade:false,
       detailLists:[],
       loading:false,
       weixin:true
     }
   },
    components:{
      dashed

    },
    methods:{
      imgBoxHandler() {
        this.initViewer();
      },
      initViewer(){
        // var viewbox = document.getElementById('imgBox');
        var viewbox = this.$refs.reviewImg;
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
     /*改变option*/
      changeType(){
        let select=document.getElementById('select')
        let index=select.selectedIndex
        this.result.invoice.invoiceType = select.options[index].value

      },

      deleteP(index){
        this.index=index
        //alert("确定要删除此项吗？")
        this.showDeleteShade=true

      },
      cancel(){
        this.showDeleteShade=false
      },
      deleteItem(index){
        this.index=index
        this.detailLists.splice(index,1)
        this.showDeleteShade=false
      },
     /* delive(){
        this.index=index
      }*/
    /*保存编辑的内容*/
      saveData(){

        let select=document.getElementById('select')
        let index=select.selectedIndex
        this.result.invoice.invoiceType = select.options[index].value
        if(select.options[index].value==''){
          MessageBox.alert("请选择发票类型！", "提示");
          return
        }
        /*if(select.value=''){
          alert(11)
          return
        }*/

        let data = []
        const invoice = {"invoiceMain":this.result.invoice,
          "invoiceDetails":this.result.details}
        data.push(invoice)
        const dataMap1={
          dataMap:JSON.stringify(

            {
              //"invoiceId":"AE0010101",
              "invoiceId":this.$route.params.id+'',
              "detailUpdate":"0",
              "data":data
            }

            ),

        }
        const userInfo1=JSON.parse(sessionStorage.getItem('userInfo'))
        const dress=global_.httpUrl+userInfo1+'&method=xforceplus.toc.updateInvoiceInfo'
        http.post(dress,dataMap1)
        .then((response)=>{
          this.loading=false
          MessageBox.alert('保存成功', '提示');
          this.$router.push({path:`/invoiceCheckIndex/${this.$route.params.id}`})
          //this.$router.push(`/invoiceCheckIndex/${.invoice.invoiceId}`)

          //this.$router.push('')
          console.log(response,5555)     //xforceplus.toc.udpateInvoiceInfo

          if(response.data.status==1){

          }
          //console.log(dataMap1,777)
        })

      }


    },

    created(){
      this.$route.params.id
     // console.log( this.$route.params.id,8888)
      this.weixin=!global_.isWeiXin()
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
      http.post(url,dataMap)
        .then((response)=>{
          const data=response.data;
          if(data.status==1){
            this.result=data.result
            this.detailLists=data.result.details
            console.log(this.detailLists,888)
            //console.log(response,999)
            const type = this.result.invoice.invoiceType
            let select=document.getElementById('select')
            if(type=='ce'){
              select.selectedIndex = 1
            }else if(type=='s'){
              select.selectedIndex = 2
            }else if(type=='c'){
              select.selectedIndex = 3
            }
          }

        })

    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .review-img 
    position fixed
    top 50%
    right 0
    transform translate(0, -50%)
    background-image url(./img.png)
    background-size contain
    background-repeat no-repeat
    width 30px
    height 30px
    z-index 1001
    img 
      width 100%
      height 100%
      opacity 0
  #loading
    position fixed
    width 100%
    height 100%
    background-color #fff
    z-index 10000
    background url(./loading.gif) no-repeat center center #fff
  .editInvoice_wrap

    position relative
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
    .invoice_type
      position relative
      font-family Algerian
      color #939393
      width 80%
      margin 0 auto
      height 40px
      line-height 40px
      font-size 14px
      select
        position absolute
        right 0
        top 5px
        height 25px
        line-height: 25px
        outline none
        color #939393
        border none
        font-size 12px
        option
          font-size 12px
    .editInvoice_content
      .editInvoice_content_top
        position relative
        width 100%
        height 100px
        line-height 100px
        text-align center
        color red
        background-color #eeeeee
        //background url(invoice.png) no-repeat center center #fff
        background-size 45%
      .noneType
        background url("./bg.jpg")
        -webkit-background-size: 100%
      .normal
        background url(normal.png) no-repeat center center #fff
        background-size 37%
      .dedicated
        background url(dedicated.png) no-repeat center center #fff
        background-size 37%
      .electronic
        background url(electronic.png) no-repeat center center #fff
        background-size 47%
      .editInvoice_content_middle
        width 100%
        .ecm_t
          width 100%
          box-sizing border-box
          padding 7px 10% 7px
          background-color: #fff
          /*.amountWithTax
            background-color: red*/
          .money
            float right
            color #282828;

          li
            height 25px
            line-height 25px
            overflow hidden
            &:nth-of-type(1)
              margin-bottom 10px
            span
              font-size 13px
              float left
              color #939393
            input
              height 100%
              float right
              color #282828
              font-size 13px
              outline none
              border none
              width 57%
              text-align right
        #common
          li
          &:nth-of-type(1)
            margin-bottom 0
        .product_detail
          width 100%
          table
            margin-top 5px
            width 95%
            margin-left 5%
            font-size 13px
            tr
              width 100%
              height 25px
              line-height 25px
              color #878787
              &:nth-of-type(1)
                height 30px
                line-height 30px
              td
                text-align center
                input
                  margin-top 10px
                  outline none
                  border none
                  float left
                &:nth-of-type(1)
                  width 30%
                  text-align center
                  input
                    height 100%
                    width 100%
                    text-align center
                &:nth-of-type(2)
                  width 25%
                  text-align center
                  input
                    height 100%
                    width 100%
                    text-align center
                &:nth-of-type(3)
                  width 20%
                  text-align center
                  /*background-color: yellow*/
                  input
                    width 100%
                    height 100%
                    text-align center
                &:nth-of-type(4)
                  position relative
                  width 20%
                  text-align left
                  /*background-color: green*/
                  input
                    width 100%
                    height 100%
                    text-align center
                  span
                    position absolute
                    top 6px
                    left 27px
                    display inline-block
                    height 18px
                    width 18px
                    background url("delete.png") no-repeat center center
                    -webkit-background-size 100%
      .bottom
        width 100%
        //height 40px
        //background-color red
        margin 20px 0

        div
          width 95%
          margin 0 auto
          text-align center
          color #fff
          height 50px
          line-height 50px
          background-color #41b4ec
          border-radius 10px
          font-size 20px
    .deleteShade
      position fixed
      left 0px
      top 0
      width 100%
      height 100%
      font-size 13px
      background-color rgba(0, 0, 0, 0.7)
      z-index 100
      &.fade-enter-active, &.fade-leave-active
        transition opacity 0.5s
      &.fade-enter, &.fade-leave-to
        opacity 0
      .reminder
        position absolute
        top 35%
        left 50%
        margin-left -99px
        width: 197px
        height 100px
        background-color white
        border-radius 10px
        p
          height 49px
          line-height 49px
          text-align center
          span
            display inline-block
            width 50%
            &:nth-of-type(1)
              box-sizing border-box
              border-right 1px solid #e5e5e5
              color #4cb3ff
            &:nth-of-type(2)
              color #eb3b3b
          &:nth-of-type(1)
            border-bottom 1px solid #e5e5e5


    .footer
      //position absolute
      //left 0
      //bottom -80px
      width 100%
      margin 0 auto
      z-index 1
      //margin-bottom 10px


</style>
