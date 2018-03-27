<template>
  <div>
    <div class="checkResultr-wrap">
      <!--头部-->
      <header v-show="not_wx">
      <span class="back" onclick="window.history.go(-1)">
        <i class="icon-arrow_lift">
        </i>返回
      </span>
        <span>验真结果</span>
      </header>
      <!--中部-->
      <div class="checkResultr_content">
        <div class="checkResultr_content_c">

          <div class="invoiceType electronic" v-show="result.mainInvoice.invoiceType=='ce'" v-if="result.mainInvoice">
            <img src="./electronic.png" >
          </div>
          <div class="invoiceType normal" v-show="result.mainInvoice.invoiceType=='c'" v-if="result.mainInvoice">
            <img src="./normal.png" >
          </div>
          <div class="invoiceType dedicated" v-show="result.mainInvoice.invoiceType=='s'" v-if="result.mainInvoice">
            <img src="./dedicated.png" >
          </div>
          <!--<div class="invoiceType noneType">
            <span>未识别出发票类型</span>
            <img src="./bg.jpg" alt="">

          </div>
          <div class="invoiceType noneType">
            <span>您上传的图片不是发票</span>
            <img src="./bg.jpg" alt="">

          </div>-->
          <!-- <div class="invoiceType noneType">
             <img src="./bg.png" >
           </div>-->


          <!-- <div class="invoiceType noneType">
             <img src="./bg.png" >
           </div>
           <div class="invoiceType noneType">
             <img src="./bg.png" >
           </div>
   -->

          <!-- <div class="top electronic " v-show="result.mainInvoice.invoiceType=='ce'" v-if="result.mainInvoice">

           </div>
           <div class="top normal" v-show="result.mainInvoice.invoiceType=='c'" v-if="result.mainInvoice">

           </div>
           <div class="top dedicated" v-show="result.mainInvoice.invoiceType=='s'" v-if="result.mainInvoice">

           </div>
           <div class="top " v-show="result.mainInvoice.invoiceType==''" v-if="result.mainInvoice">

           </div>
           <div class="top " v-show="result.mainInvoice.invoiceType=='a'" v-if="result.mainInvoice">

           </div>-->
          <div class="middle">
            <!--发票头部-->

            <div class="middle_top top_top">
              <ul>
                <li @click="showOne"><span>付款方</span><span class="pull" ref="one">></span><span v-if="result.verifyMain">{{result.verifyMain.purchaserName}}</span></li>
                <div id="publicUpload" v-show="false"><span class="left">上传信息</span><span class="right">信息内容</span></div>
                <transition name="fade">
                  <div class="purchaserDetail" v-show="one">
                    <p><span>纳税人识别号：</span><span v-if="result.verifyMain">{{result.verifyMain.purchaserTaxNo}}</span></p>
                    <p><span>地址、电话：</span><span v-if="result.verifyMain">{{result.verifyMain.purchaserAddress}}</span></p>
                    <p><span></span><span v-if="result.verifyMain">{{result.verifyMain.purchaserTel}}</span></p>
                    <p><span>开户行账户：</span><span v-if="result.verifyMain">{{result.verifyMain.purchaserBankName}}</span></p>
                    <p><span></span><span v-if="result.verifyMain">{{result.verifyMain.purchaserBankAccount}}</span></p>
                  </div>
                </transition>
                <!-- <transition name="pull">

                 <div class="purchaserDetail" v-show="one" >
                   <ul>
                     <li><span>纳税人识别号：</span><span v-if="result.verifyMain">{{result.verifyMain.purchaserTaxNo}}</span></li>
                     <li><span>地址、电话：</span><span v-if="result.verifyMain">{{result.verifyMain.purchaserAddress}}</span></li>
                     <li><span></span><span v-if="result.verifyMain">{{result.verifyMain.purchaserTel}}</span></li>
                     <li><span>开户行账户：</span><span v-if="result.verifyMain">{{result.verifyMain.purchaserBankName}}</span></li>
                     <li><span></span><span v-if="result.verifyMain">{{result.verifyMain.purchaserBankAccount}}</span></li>
                   </ul>
                 </div>
               </transition>-->

                <li @click="showTwo"><span>收款方</span><span class="pull" ref="two"  ></span><span v-if="result.verifyMain">{{result.verifyMain.sellerName}}</span></li>


                <transition name="fade">
                  <div  class="sellerDetail" v-show="two">
                    <p><span>纳税人识别号：</span><span v-if="result.verifyMain">{{result.verifyMain.sellerTaxNo}}</span></p>
                    <p><span>地址、电话：</span><span v-if="result.verifyMain">{{result.verifyMain.sellerAddress}}</span></p>
                    <p><span></span><span v-if="result.verifyMain">{{result.verifyMain.sellerTel}}</span></p>
                    <p><span>开户行账户：</span><span v-if="result.verifyMain">{{result.verifyMain.sellerBankName}}</span></p>
                    <p><span></span><span v-if="result.verifyMain">{{result.verifyMain.sellerBankAccount}}</span></p>
                  </div>
                </transition>
                <!--<transition name="pull">
                  <div class="sellerDetail" v-show="two">
                    <ul>
                      <li><span>纳税人识别号：</span><span v-if="result.verifyMain">{{result.verifyMain.sellerTaxNo}}</span></li>
                      <li><span>地址、电话：</span><span v-if="result.verifyMain">{{result.verifyMain.sellerAddress}}</span></li>
                      <li><span></span><span v-if="result.verifyMain">{{result.verifyMain.sellerTel}}</span></li>
                      <li><span>开户行账户：</span><span v-if="result.verifyMain">{{result.verifyMain.sellerBankName}}</span></li>
                      <li><span></span><span v-if="result.verifyMain">{{result.verifyMain.sellerBankAccount}}</span></li>
                    </ul>
                  </div>
                </transition>-->
              </ul>
            </div>

            <!--虚线-->
            <dashed></dashed>
            <!--发票中部-->
            <div class="middle_top middle_pop ">
              <ul>
                <li ><span>校验码</span><span >></span>
                  <span  v-if="result.verifyMain"  v-bind:class="{ errorMassage:successMassages }">{{result.verifyMain.checkCode}}</span>
                  <!--<span class="checkCode_why" @click="getCheckCode" v-if="result.verifyMain" v-show="result.mainInvoice.checkCode != result.verifyMain.checkCode"><img src="./why.png" alt=""></span>-->
                  <span class="checkCode_why" @click="getCheckCode" v-if="result.verifyMain" v-show="contrast"><img src="./why.png" alt=""></span>
                </li>
                <div class="checkCode" v-show="checkCodeShow"><span class="left">识别信息</span><span class="right" v-if="result.mainInvoice">{{result.mainInvoice.checkCode}}</span></div>
                <li>
                  <span>发票金额</span><span class="">></span>
                  <span v-if="result.verifyMain" v-bind:class="{ errorMassage:M_amountWithTax }">¥{{result.verifyMain.amountWithTax}}</span>
                  <!--<span class="amountWithTax_why"  @click="getAmountWithTax" v-if="result.verifyMain" v-show="result.mainInvoice.amountWithTax != result.verifyMain.amountWithTax"><img src="./why.png" alt=""></span>-->
                  <span class="amountWithTax_why"  @click="getAmountWithTax" v-if="result.verifyMain" v-show="contrast1"><img src="./why.png" alt=""></span>
                </li>
                <div class="amountWithTax" v-show="amountWithTaxShow"><span class="left">识别信息</span><span class="right" v-if="result.mainInvoice">￥{{result.mainInvoice.amountWithTax}}</span></div>
                <li>
                  <span>开票日期</span><span class="">></span>
                  <span v-if="result.verifyMain" v-bind:class="{ errorMassage:M_paperDrewDate }">{{result.verifyMain.paperDrewDate}}</span>
                  <span class="paperDrewDate_why" @click="getPaperDrewDateShow" v-if="result.verifyMain" v-show="contrast2"><img src="./why.png" alt=""></span>
                </li>
                <div class="paperDrewDate" v-show="paperDrewDateShow"><span class="left">识别信息</span><span class="right" v-if="result.mainInvoice">{{result.mainInvoice.paperDrewDate}}</span></div>
                <li>
                  <span>发票号码</span><span class="">></span>
                  <span  v-if="result.verifyMain" v-bind:class="{ errorMassage:M_invoiceNo }">{{result.verifyMain.invoiceNo}}</span>
                  <span class="invoiceNo_why" @click="getInvoiceNo"  v-if="result.verifyMain" v-show="contrast3"><img src="./why.png" alt=""></span>
                </li>
                <div class="invoiceNo" v-show="invoiceNoShow"><span class="left">识别信息</span><span class="right" v-if="result.mainInvoice">{{result.mainInvoice.invoiceNo}}</span></div>
                <li>
                  <span>发票代码</span><span class="">></span>
                  <span v-if="result.verifyMain" v-bind:class="{ errorMassage:M_invoiceCode }">{{result.verifyMain.invoiceCode}}</span>
                  <span class="invoiceCode_why" @click="getInvoiceCode" v-if="result.verifyMain" v-show="contrast4"><img src="./why.png" alt=""></span>
                </li>
                <div class="invoiceCode" v-show="invoiceCodeShow"><span class="left">识别信息</span><span class="right" v-if="result.mainInvoice">{{result.mainInvoice.invoiceCode}}</span></div>
                <li @click="showThree"><span>商品明细</span><span class="pull" ref="three" ></span><span v-if="result.verifyMain">详情</span></li>

                <transition name="pull">
                  <div class="productDteail" v-show="three">
                    <table>
                      <tr>
                        <td>名称</td>
                        <td>金额</td>
                        <td>税率</td>
                      </tr>
                      <tr v-for="detail in result.verifyDetails" v-if="result.verifyDetails">
                        <td><p>{{detail.cargoName}}</p></td>
                        <td>{{detail.amountWithTax}}</td>
                        <td>{{detail.taxRate}}</td>
                      </tr>
                    </table>
                  </div>
                </transition>

              </ul>
            </div>
            <!--虚线-->
            <!--<dashed class="line"></dashed>-->
            <div style="width: 100% ;height: 10px ;background-color: #fff"></div>
            <!--圆点-->
            <div class="circle_t">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="message" v-show="reminder">查验结果与上传发票信息不符！</div>
        <!--底部-->
        <footer>
          <div class="wrap">
            <div class="btn" @click="uedate">修改上传发票信息</div>
          </div>
          <!--<div class="wrap">-->
          <!--<div class="btn">重新验真</div>-->
          <!--</div>-->
        </footer>
      </div>
    </div>
    <div id="loading" v-show="loading"></div>
  </div>
</template>
<script>
  import http from '../../http'
  import dashed from '../dashed/dashed.vue'
  import { MessageBox } from 'mint-ui';
  import global_ from '../../components/tool/Global'
  export default {
    data(){
      return{
        result:'',
        one:false,
        two:false,
        three:false,
        invoices:'',
        checkCodeShow:false,
        amountWithTaxShow:false,
        paperDrewDateShow:false,
        invoiceNoShow:false,
        invoiceCodeShow:false,
        successMassages:false,
        M_amountWithTax:false,
        M_paperDrewDate:false,
        M_invoiceNo:false,
        M_invoiceCode:false,
        reminder:false,
        loading:true,
        contrast:false,
        contrast1:false,
        contrast2:false,
        contrast3:false,
        contrast4:false,
        not_wx:true
      }
    },
    components:{
      dashed
    },
    created(){
      this.not_wx=!global_.isWeiXin()
    },
    methods:{
      /*点击出现识别信息 点击？号*/
      getCheckCode(){
        this.checkCodeShow =! this.checkCodeShow
      },
      getAmountWithTax(){
        this.amountWithTaxShow =! this.amountWithTaxShow
      },

      getPaperDrewDateShow(){
        this.paperDrewDateShow =! this.paperDrewDateShow
      },

      getInvoiceNo(){
        this.invoiceNoShow=!this.invoiceNoShow
      },
      getInvoiceCode(){
        this.invoiceCodeShow=!this.invoiceCodeShow
      },

      showOne(){
        this.one=!this.one
        if(this.one==true){
          this.$refs.one.style.transform='rotate(90deg)'
        }else{
          this.$refs.one.style.transform='rotate(0deg)'
        }

      },
      showTwo(){
        this.two=!this.two
        if(this.two==true){
          this.$refs.two.style.transform='rotate(90deg)'
        }else{
          this.$refs.two.style.transform='rotate(0deg)'
        }
      },
      showThree(){
        this.three=!this.three
        if(this.three==true){
          this.$refs.three.style.transform='rotate(90deg)'
        }else{
          this.$refs.three.style.transform='rotate(0deg)'
        }
      },
      uedate(){
       /* const dataSucesses={
          dataMap:JSON.stringify(
            { "invoices":
              [ {
              "invoiceId":"AE0010101",
                "invoiceCode":"71091231",
                "invoiceNo":"01012312",
                "invoiceType":"c",
                "amountWithTax":"106",
                "amountWithoutTax":"100",
                "taxAmount":"6",
                "paperDrewDate":"20171101",
                "purchaserTaxNo":"900123123123019US",
                "purchaserName":"上海云砺科技有限公司",
                "purchaserBankInfo":"",
                "purchaserAddrTel":"",
                "sellerTaxNo":"900123123123019US",
                "sellerName":"上海云砺科技有限公司",
                "sellerBankInfo":"",
                "sellerAddrTel":"",
                "machineCode":"",
                "checkCode":"12314512311231231231",
                "cipherText":"",
                "cipherTextTwoCode":"",
                "cashierName":"黄琪",
                "checkerName":"主席",
                "invoicerName":"程龙",
                "remark":"Good Job 程龙",
              } ] }
          )
        }*/
        const dataMap1={
          dataMap:JSON.stringify(
            {
              //"invoiceId":"AE0010101",
              "invoiceId":this.$route.params.id+'',
              "detailUpdate":"1",
              "verifyData":"1",
              "data":[{
                "invoiceMain":{
                  "purchaserName":this.result.verifyMain.purchaserName+'',
                  "purchaserTaxNo":this.result.verifyMain.purchaserTaxNo+'',
                  "purchaserAddress":this.result.verifyMain.purchaserAddress+'',
                  "purchaserTel":this.result.verifyMain.purchaserTel+'',
                  "purchaserBankName":this.result.verifyMain.purchaserBankName+'',
                  "purchaserBankAccount":this.result.verifyMain.purchaserBankAccount+'',
                  "sellerName":this.result.verifyMain.sellerName+'',
                  "sellerTaxNo":this.result.verifyMain.sellerTaxNo+'',
                  "sellerAddress":this.result.verifyMain.sellerAddress+'',
                  "sellerTel":this.result.verifyMain.sellerTel+'',
                  "sellerBankName":this.result.verifyMain.sellerBankName+'',
                  "sellerBankAccount":this.result.verifyMain.sellerBankAccount+'',
                  "checkCode":this.result.verifyMain.checkCode+'',
                  "amountWithTax":this.result.verifyMain.amountWithTax+'',
                  "paperDrewDate":this.result.verifyMain.paperDrewDate+'',
                  "invoiceNo":this.result.verifyMain.invoiceNo+'',
                  "invoiceCode":this.result.verifyMain.invoiceCode+'',
                  "machineCode":this.result.verifyMain.machineCode+'',
                  "remark":this.result.verifyMain.remark+''

                },
                "invoiceDetails":this.result.verifyDetails,

              }]
            }
          ),
        }
        const userInfo1=JSON.parse(sessionStorage.getItem('userInfo'))
        const dress=global_.httpUrl+userInfo1+'&method=xforceplus.toc.updateInvoiceInfo'
       console.log(dataMap1,99999)
         http.post(dress,dataMap1)
          .then((response)=>{
            console.log(333)
            MessageBox.alert("更新成功！", "提示");
            this.$router.push({path:`/invoiceCheckIndex/${this.$route.params.id}`})
          })
      }
    },
    mounted(){
      //const dataMAPMAP=
      const dataSucesses={
        dataMap:JSON.stringify(
          {
            "invoiceId":this.$route.params.id+"" ,
            'status':'1'  //有1主档信息会返回
          }),
      }
      const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
      const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.getVerifyInvoice'   //查询验真数据接口
      http.post(url,dataSucesses)
        .then((response)=>{
        this.loading=false
          //console.log(response,333)
          const data=response.data
          if(data.status==1){
           this.result=data.result

           this.invoices=data.result.verifyMain
            console.log(response,88)

            if(this.result.mainInvoice.checkCode != this.result.verifyMain.checkCode ){
              this.successMassages=true
              this.reminder=true
              this.contrast=true
            }
            if( this.result.mainInvoice.amountWithTax != this.result.verifyMain.amountWithTax){
              this.M_amountWithTax=true
              this.reminder=true
              this.contrast1=true
            }
            if( this.result.mainInvoice.paperDrewDate != this.result.verifyMain.paperDrewDate){
              this.M_paperDrewDate=true
              this.reminder=true
              this.contrast2=true
            }
            if( this.result.mainInvoice.invoiceNo != this.result.verifyMain.invoiceNo){
              this.M_invoiceNo=true
              this.reminder=true
              this.contrast3=true
            }
            if( this.result.mainInvoice.invoiceCode != this.result.verifyMain.invoiceCode){
              this.M_invoiceCode=true
              this.reminder=true
              this.contrast4=true
            }




          }
        })
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
  .checkResultr-wrap
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
    .checkResultr_content
      padding-bottom 40px
      padding-top 15px
      width 100%
      background-color #efeef4
      overflow auto
      .checkResultr_content_c
        margin 0 auto
        width 94%
        background-color #fff
        -webkit-border-radius 10px
        -webkit-border-bottom-left-radius 0
        -webkit-border-bottom-right-radius 0
        box-shadow 0 0 5px #878787
        .invoiceType
          width 100%
          height 100px
          line-height 100px
          background-color #fff
          text-align center
          img
            vertical-align middle
        .electronic
          img
            width 50%
        .normal
          img
            width 48%
        .dedicated
          img
            width 48%
        .noneType
          img
            width 80%
        .top
          position relative
          width 100%
          height 100px
        .normal
        .dedicated
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
          .middle_pop
            position relative
            .checkCode_why,.amountWithTax_why,.paperDrewDate_why,.invoiceNo_why,.invoiceCode_why
              display inline-block
              width 18px
              height 18px
              position absolute
              right 10px
              top 3px
              z-index 700
              img
                width 100%
            .amountWithTax_why
              top 32px
            .paperDrewDate_why
              top 60px
            .invoiceNo_why
              top 88px
            .invoiceCode_why
              top 115px
            .checkCode,.amountWithTax,.paperDrewDate,.invoiceNo,.invoiceCode
              position absolute
              left 3%
              top 30px
              background-color #fff
              width: 94%
              height 30px
              line-height 30px
              z-index 999
              font-size 14px
              box-shadow 0  0 5px #878787
              border-radius 2px
              color #878787
              .left
                padding-left  8px
              .right
                float right
                padding-right 17px
            .errorMassage
              color red
            .amountWithTax
              top 55px
            .paperDrewDate
              top 85px
            .invoiceNo
              top 110px
            .invoiceCode
              top 140px
          .top_top
            position relative
            #publicUpload
              position absolute
              left 3%
              top 25px
              margin 0 auto
              z-index 100
              height 30px
              line-height 30px
              box-shadow 0 0 5px #878787
              background-color: #fff
              width 94%
              font-size 14px
              .left
                color red
                padding-left 5px
              .right
                color green
                float right
                padding-right 15px
          .middle_top
            width 100%
            ul
              width 100%
              .error
                color #ff5049
              .purchaserDetail,.sellerDetail
                box-sizing border-box
                width 90%
                background-color #f7f7f7
                margin 0 auto
                font-size 13px
                color #878787
                padding 8px
                &.fade-enter-active, &.fade-leave-active
                  transition all  0.2s linear
                  height 150px
                  overflow hidden
                &.fade-enter, &.fade-leave-to
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
                      /*text-align right*/
              .productDteail
                width 90%
                background-color  #f7f7f7
                margin 0 auto
                &.pull-enter-active, &.pull-leave-active
                  transition all  0.2s linear
                  height 100px
                  overflow hidden
                &.pull-enter, &.pull-leave-to
                  height 0
                table
                  margin-top 5px
                  width 100%
                  font-size 13px

                  tr
                    width 100%
                    height 28px
                    line-height 28px
                    color #878787
                    text-align center
                    &:nth-of-type(1)
                      height 30px
                      line-height 30px
                      td
                        text-align center
                        &:nth-of-type(1)
                          width 34%
                          text-align center
                          p
                            width 80%
                            text-align center
                            margin 0 0 7% 10%
                            color #939393
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
                    /*=====================================width:32%*/
                  &:nth-of-type(2)
                    float right
                    color #282828
                    margin-left 3%
                    color #fff
                  &:nth-of-type(3)
                    float right

    /*圆点*/
    .circle_t
      position absolute
      top 215px
      left 2px
      width 100%
      height 20px
      background-color transparent
      width 90%
      span
        position absolute
        top 0
        display inline-block
        width 18px
        height 18px
        background-color #efeef4
        border-radius 50%
        text-align center
        &:nth-of-type(1)
          left 0
          background url("left.png") no-repeat center center
          -webkit-background-size 100%
        &:nth-of-type(2)
          right  -33px
          background url("right.png") no-repeat center center
          -webkit-background-size 100%
    .line
      margin-top 10px
    .message
      margin-top 28px
      width 100%
      height 30px
      line-height 30px
      font-size 19px
      text-align center
      color #ff5049
    footer

      width 95%
      margin 0 auto
      margin-top 28px
      .wrap
        height 53px
        line-height 53px
        text-align center
        background-color: #41b4ec
        border-radius 10px
        font-size 19px
        color #fff
        margin-bottom 15px

</style>
