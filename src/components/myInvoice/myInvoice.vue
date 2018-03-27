<template>
<div>
  <div class="myInvoice-wrap" >
    <!--头部-->
    <header v-show="not_wx">
      <!--使用router-link跳转的方案-->
      <router-link to="/invoiceCollection" class="active" >
        <span class="back"><i class="icon-arrow_lift"></i>返回</span>
      </router-link>
      <!--<span class="back" onclick="window.history.go(-1)"><i class="icon-arrow_lift"></i>返回</span>-->
      <span>我的发票</span>
    </header>
    <div class="gray"></div>
    <nav>
      <!--<div><span @click="date">全部日期</span><i ref="rotate"></i></div>-->
      <div><span @click="date" id="top_date">{{dateTime}}<i ref="rotate"></i></span>

      </div>
      <!--<div @click="genre"><span>发票类型</span><i ref="zhuan"></i></div>-->
    </nav>
    <!--发票类型的弹窗-->
    <transition name="fade">
      <div class="invoiceGenre" v-show="invoiceGenre">

      </div>
    </transition>
    <!--白色的内容-->
    <!-- <transition name="fold">
       <div class="invoiceGenre_content" v-show="invoiceGenre" >
         <div @click="filterAllInvoice"><p>全部发票</p></div>
         <div @click="filterEInvoice"><p>电子发票</p></div>
         <div @click="filterPInvoice"><p class="none">纸质发票</p></div>
         <div class="cancel" @click="cancle">取消</div>
       </div>
     </transition>-->
    <div class="gray"></div>
    <!--中间发票列表-->
    <div class="invoice_wrap">
      <div class="item_wrap" v-bind:class="{ electronic_invoice : invoiceItem.invoice.isElectronic}" v-for="(invoiceItem,index) in result" @click="demandDetail(invoiceItem)"  v-if="invoiceItem.invoice.invoiceType !=='a'">
        <div class="item" >
          <table >
            <tr>
              <td>{{invoiceItem.invoice.sellerName!=''?'销售方：':'发票号码：'}}</td>
              <td><p><span>{{invoiceItem.invoice.sellerName!=''?invoiceItem.invoice.sellerName:invoiceItem.invoice.invoiceNo}}</span></p></td>
              <td class="invoiceValue">发票金额：</td>
            </tr>
            <tr>
              <td>{{invoiceItem.invoice.sellerName!=''?'购买方：':'发票代码：'}}</td>
              <td><p><span>{{invoiceItem.invoice.sellerName!=''?invoiceItem.invoice.purchaserName:invoiceItem.invoice.invoiceCode}}</span></p></td>
              <td  rowspan="2" class="combine"><i>¥</i> <span>{{invoiceItem.invoice.amountWithTax}}</span></td>
            </tr>
            <tr>
              <td>开票日期：</td>
              <td><span>{{invoiceItem.invoice.paperDrewDate}}</span></td>
            </tr>
          </table>
          <div class=" dottedIine">
            <div></div>
          </div>
          <div class="sanjiao" v-bind:class="{ electronic : invoiceItem.invoice.isElectronic}"><span>{{invoiceItem.invoice.isElectronic?'电':'纸'}}</span></div>
        </div>
      </div>

      <!--该图像识别失败-->
      <!--<div class="failWrap"  v-for="(invoiceItem,index) in result"   v-if="invoiceItem.invoice">
        <router-link v-bind:to="{path: '/invoiceCheckIndex/', params: { id: 123 }}" >
         <div v-show="invoiceItem.invoice.invoiceType == 'a'">
           <div class="abolishInvoice">
             <span>该图像识别失败！</span>
             <span>. <img src="./1.png" alt=""></span>
           </div>
           <div class=" dottedIine">
             <div></div>
           </div>
         </div>
          <div class="empty"></div>
       </router-link>
      </div>-->

    </div>

    <div class="failBox" v-for="(invoiceItem,index) in result"   v-if="invoiceItem.invoice" v-show="invoiceItem.invoice.invoiceType == 'a'" @click="showImgDetail(invoiceItem)">
      <!--<router-link to="/imageDetail">-->
      <!-- <router-link v-bind:to="{path: '/imageDetail/', params: { id: 123 }}" >-->
      <div id="failBox" >
        <div>该图像识别失败！</div>
        <div></div>
        <div><span><img :src=invoiceItem.invoice.imgUrl ></span></div>
      </div>
      <!--</router-link>-->

    </div>

    <div class="white"></div>

    <!--底部合计-->
    <div class="amount">
      <footer>
        <div class="amount_left">
          <span>累计发票：</span>
          <span>{{count}}张</span>
        </div>
        <div class="amount_left">
          <span>累计金额：</span>
          <span>{{totalAmount}}元</span>
        </div>
      </footer>
    </div>

    <div>

    </div>

    <mt-datetime-picker
      v-model="pickerValue"
      ref="picker"
      type="date"
      :startDate="startDate"
      :endDate="endDate"
      dateForma="{}"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      @cancel="checkinCancel"
    >

    </mt-datetime-picker>

    <!--<mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>-->
  </div>
  <div id="loading" v-show="loading"></div>
</div>
</template>
<script>
  import Vue from 'vue'
  import http from '../../http'
  import global_ from '../../components/tool/Global'
  import { DatetimePicker,Actionsheet } from 'mint-ui'
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(Actionsheet.name, Actionsheet);
  export default {
    data(){
      return{
        pickerValue:new Date(),   //设置初始选中日期为当天
        startDate: new Date('2012-01-01'),
        endDate: new Date(),
        invoiceGenre:false,
        result:'',
        dateTime:this.formatyyyyMMdd(new Date()),
        count:0,
        totalAmount:0,
        one:[
          {id:1},
          {id:2}
        ],
        itemInvoice:'',
        loading:true,
        not_wx:true
      }
    },
    methods:{
      /*进入识别失败的图片详情*/
      showImgDetail(invoiceItem){
        this.$router.push(`/imageDetail/${invoiceItem.invoice.invoiceId}`)
        this.itemInvoice=sessionStorage.setItem('invoice_item',JSON.stringify(invoiceItem))
      },

      /*日期点击取消事件*/
      checkinCancel(){
        this.$refs.rotate.style.transform='rotate(0deg)'
      },

      /*日期点击确认事件*/
      handleConfirm(){
        this.dateTime=this.formatyyyyMMdd(this.$refs.picker.value)
        this.$refs.rotate.style.transform='rotate(0deg)'
        const dataMap={
          dataMap:JSON.stringify(
            {
              "page": "1",
              "rows": "100",
              "invoiceDate": this.dateTime
            }),

        }
        const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
        const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.getInvoiceListByDate'
        http.post(url,dataMap)
          .then((response)=>{

            console.log(response,222)


            // const data=response.data
            const data=response.data
            if(data.status==1){
              let result = data.result;
              if(result instanceof Array){
                let count = 0
                let totalAmount = 0
                let index
                for(index in result){
                  const invoice = result[index].invoice;
                  const invoiceType = invoice.invoiceType;
                  if(invoiceType=='c'||invoiceType=='s'||invoiceType=='ce'){
                    count++
                    if(!isNaN(parseFloat(invoice.amountWithTax))){
                      totalAmount += parseFloat(invoice.amountWithTax);
                    }
                  }
                  if(invoice.invoiceType=='ce'){
                    invoice.isElectronic = true
                  }else if(invoice.invoiceType=='c' ||invoice.invoiceType=='s'){
                    invoice.isElectronic = false
                  }
                }
                this.count = count
                this.totalAmount = parseFloat(totalAmount).toFixed(2)
              }
              console.log("result=",result)
              this.result=result
            }
          })
      },

      formatyyyyMMdd(data){
        let year = data.getFullYear();
       let month = data.getMonth()+1;
       let day = data.getDate();
        //return year+''+month +day
        //return year + '' + (month < 10 ? "0" + month : month) + "" + (day < 10 ? "0" + day : day);
        return year + '' + (month < 10 ? "0" + month : month)+''+"  "
      },

      openPicker() {
        this.$refs.picker.open();

      },
      date(){
       if(this.$refs.rotate.style.transform=='rotate(90deg)'){
          this.$refs.rotate.style.transform='rotate(0deg)'
        }else {
          this.$refs.rotate.style.transform='rotate(90deg)'
        }

       let dateBox= document.getElementsByClassName('mint-popup')[0]

       /* if(dateBox.style.display=='block'){
          this.$refs.rotate.style.transform='rotate(90deg)'
        }else {
          this.$refs.rotate.style.transform='rotate(0deg)'
        }*/

        //时间
        this.$refs.picker.open();
        /*if(this.$refs.picker.close()){
          this.$refs.rotate.style.transform='rotate(90deg)'
        }*/

      },
      genre(){
        if(this.$refs.zhuan.style.transform=='rotate(90deg)'){
          this.$refs.zhuan.style.transform='rotate(0deg)'
        }else {
          this.$refs.zhuan.style.transform='rotate(90deg)'
        }
        this.invoiceGenre=true

      },
      cancle(){
        this.invoiceGenre=false
      },
      demandDetail(invoiceItem){
        this.$router.push(`/invoiceCheckIndex/${invoiceItem.invoice.invoiceId}`)

      },
      getRequest(){
        let url = location.search;
        console.log("url="+url)
        url = url.replace('#/myInvoice','')
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
      getInvoiceList(){
        const dataMap={
          dataMap:JSON.stringify(
            {
              "page": "1",
              "rows": "100",
              "invoiceDate": this.dateTime
            }),

        }
        const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
        const url=global_.httpUrl+userInfo+'&method=xforceplus.toc.getInvoiceListByDate'
        http.post(url,dataMap)
          .then((response)=>{

            console.log(response,111)
            this.loading=false
            const data=response.data
            if(data.status==1){
              let result = data.result;
              if(result instanceof Array){
                let count = 0
                let totalAmount = 0
                let index
                for(index in result){
                  const invoice = result[index].invoice;
                  const invoiceType = invoice.invoiceType;
                  if(invoiceType=='c'||invoiceType=='s'||invoiceType=='ce'){
                    count++
                    if(!isNaN(parseFloat(invoice.amountWithTax))){
                      totalAmount += parseFloat(invoice.amountWithTax);
                    }
                  }
                  if(invoice.invoiceType=='ce'){
                    invoice.isElectronic = true
                  }else if(invoice.invoiceType=='c' ||invoice.invoiceType=='s'){
                    invoice.isElectronic = false
                  }
                }
                this.count = count
                this.totalAmount = parseFloat(totalAmount).toFixed(2)
              }
              let fails= result.filter(fail=>{
                return  fail.invoice.invoiceType =="a"
              })
              console.log("result=",result)
              this.result=result
            }
          })
      },
    },

    created(){
      //this.dress=JSON.parse(sessionStorage.getItem('user'))//这个只针对本地起作用，测试环境不需要，测试环境的值一定是''
      this.not_wx=!global_.isWeiXin()
    },

    /*请求数据*/
    mounted(){
      const params = this.getRequest()
      let token = params.u
      let code = params.code
      let state = params.state
      console.log("token="+token)
      console.log("code="+code)
      console.log("state="+state)
      const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
      console.log("userInfo="+userInfo)
      if(!global_.isEmpty(userInfo)){
        this.getInvoiceList()
      }else if(!global_.isEmpty(token)){
        sessionStorage.setItem('userInfo', JSON.stringify(token));
        this.getInvoiceList
      }else if(!global_.isEmpty(code)){
        const Url=global_.httpLink+'/issp/ApiService?method=xforceplus.sys.gtoken&c='+code+'&s='+state
        const dataMAP={}
        http.post(Url,dataMAP)
          .then((response)=>{
            console.log(response.data)
            if(response.data.status==1){
              this.token=response.data.token
              sessionStorage.setItem('userInfo', JSON.stringify(this.token));
              console.log(sessionStorage.userInfo)
              this.getInvoiceList()
            }
          }).catch((error)=>{
          console.log(error)
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*包裹器*/
  #loading
    position fixed
    width 100%
    height 100%
    background-color #fff
    z-index 10000
    background url(./loading.gif) no-repeat center center #fff
  .myInvoice-wrap
    position absolute
    top 0
    z-index 200
    background-color: #fff
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
      .active
        color white
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
    /*灰色背景线*/
    .gray
      width 100%
      height 8px
      background-color #efeef4
    /*导航*/
    nav
      position relative
      width 100%
      height 38px
      line-height 38px

      div
        position relative
        float left
        width 100%
        height 100%
        text-align center
        color  #5d5d5d
        font-size 14px
        #top_date
          display inline-block

          height 38px
          overflow hidden

        i
          position absolute
          right 40%
          top 10px
          display inline-block
          width 8px
          height 16px
          background-color red
          background url("triangle.png") no-repeat center center
          background-size 60%
        span:nth-of-type(1)
          width 90%
    /*发票类型的弹窗*/
    .invoiceGenre
      position absolute
      top 0
      left 0
      background-color rgba(0, 0, 0, 0.7)
      width 100%
      height 100%
      z-index 1
      box-sizing border-box
      padding 0 20px
      &.fade-enter-active, &.fade-leave-active
        transition opacity  0.5s
      &.fade-enter, &.fade-leave-to
        opacity 0
    .invoiceGenre_content
      position absolute
      bottom -215px
      left 0
      width 100%
      transform translateY(-100%)
      background-color #efeef4
      box-sizing border-box
      padding 0 5px
      padding-bottom 5px
      z-index 1
      overflow hidden
      &.fold-enter-active,&.fold-leave-active
        transition all 0.3s
      &.fold-enter,&.fold-leave-active
        transform translateY(0)
      div
        width 100%
        background-color: #fff
        .none
          border-bottom none
        p
          width 95%
          margin 0 auto
          height 50px
          line-height 50px
          text-align center
          border-bottom 1.5px solid  #efeef4
          box-sizing border-box
          padding 0 8px
          font-weight bold
          color #5d5d5d
      .cancel
        width 100%
        height: 50px
        line-height 50px
        background-color #fff
        text-align center
        margin-top 10px
        font-weight bold
        color #5d5d5d
        /*识别失败的包裹器*/
    #failBox
      width 100%
      height 100px
      background-color #eeeeee
      margin-bottom 10px
      div
        display inline-block
        height 100%
        float left
        line-height 100px
        text-align center
        font-size 20px
        color red
        &:nth-of-type(1)
          width 69%
          /*background-color:pink*/
        &:nth-of-type(2)
          width 1%
          /*background-color:green*/
          background url("./dotted.png") no-repeat center center
          background-size 90%
        &:nth-of-type(3)
          width 30%
          /*background-color: beige*/
          /*background url(./fail.png) no-repeat center center*/
          background-size 125%
          span
            width 100%
            height 100%
            img
              width 100%
              height 100%
              vertical-align middle
              float: left;
    .invoice_wrap
      overflow hidden
      width 100%
      /*padding-bottom 52px*/
      .failWrap
        width 100%
        position relative
        /*margin-bottom 10px*/
        overflow hidden
        /*.empty
          height 5px
          width 100%
          background-color red*/
        .dottedIine
          position absolute
          top 0
          left 40px
          z-index 100
          height 92px
          width 2px
        .abolishInvoice //验真错的显示
          width 100%
          height 91px
          background-color #eeeeee
          z-index 99
          span
            height 100%
            display inline-block
            &:nth-of-type(1)
              width 68%
              line-height 91px
              font-size 20px
              color red
              background-color #eeeeee
              text-align center
            &:nth-of-type(2)
              width 30%
              line-height 91px
              background-color #eeeeee
              background url("fail.png") no-repeat center center
              background-size 115%
              color transparent
              float right
      .item_wrap
        position relative
        width:100%
        height 90px
        overflow: hidden;
        margin-bottom 10px
        .item
          position absolute
          height 90px
          width:100%
          background-color: rgba(255, 214, 139, 0.2)
          /*<!--background-color  rgba(255, 214, 139, 0.2)-->*/
          overflow hidden
          clear bo
          .sanjiao
            position absolute
            top 0
            right 0
            width 0
            border-width 13px
            border-style solid
            border-color  #ffd68b #ffd68b transparent transparent
            span
              font-size 10px
              color #fff
              position absolute
              top -10px
              right -12px
              -webkit-transform: rotate(45deg)
              -moz-transform: rotate(45deg)
              -ms-transform: rotate(45deg)
              -o-transform: rotate(45deg)
              transform: rotate(45deg)
          .dottedIine
            position absolute
            top 0
            right 30%
            width 3px
            border-color #fff
            border-width 2px
            height 100%
            background url(dotted.png) no-repeat center center
            -webkit-background-size 100%
          table
            width 100%
            height 90px
            font-size 13px
            tr
              width 100%
              height 30px
              line-height 30px
              td:nth-of-type(1)
                width 18%
                box-sizing border-box
                padding-left 3%
                color #ee9c3e
              td:nth-of-type(2)
                font-size 14px
                width 47% !important
                color #5d5d5d
                overflow hidden
                p
                  /*background-color orange*/
                  /*width  85%*/
                  width  204px
                  text-overflow ellipsis
                  overflow hidden
                  white-space nowrap
                  -webkit-box-orient: vertical;
                  word-break break-all
                  span
                    /*display inline-block*/
                    width 180px
                    word-break break-all

              td:nth-of-type(3)
                width 30%
                color #ee9c3e
                text-align center
                vertical-align middle
                i
                  font-size 12px
                  font-style normal
                  font-weight bold
                  color #5d5d5d
                span
                  font-size 14px
                  color #5d5d5d
              .invoiceValue
                padding-right 8%
      .electronic_invoice
        background-color transparent
        .item
          background-color: #d0e6f1
          .electronic
            border-color  #41b4ec #41b4ec transparent transparent
          table
            tr
              td:nth-of-type(1)
                color #41b4ec
              td:nth-of-type(3)
                color #41b4ec
    .white
      width 100%
      height 52px
      background-color: #fff

    .amount
      position fixed
      bottom 0
      left 0
      width 100%
      height 52px
      line-height 52px

      .amount_left
        /*width 50%*/
        float left
        text-align center
        color #fff
        font-size 13px
        background-color #41b4ec
        &:nth-of-type(1)
          width 40%
          text-align left
          box-sizing border-box
          padding-left 15px
        &:nth-of-type(2)
          width 60%
          text-align left
          box-sizing border-box
          padding-left 15px



  /*修改ui日期插件*/
    .mint-popup,.mint-datetime,.mint-popup-bottom
      .picker-toolbar
      .picker-items
        .picker-slot,.picker-slot-center
          &:nth-of-type(3)
            display none !important

</style>
