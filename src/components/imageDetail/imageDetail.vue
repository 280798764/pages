<template>
<div>


  <div class="imgBox">
    <header v-show="not_wx">
      <span class="back" onclick="window.history.go(-1)">
        <i class="icon-arrow_lift">
        </i>返回
      </span>
      <span>发票详情</span>
    </header>
    <div class="imgDetail" >
      <img v-if="invoiceItem.invoice" :src=invoiceItem.invoice.imgUrl >

    </div>
    <div class="labelWrap">
      <p class="title">标签：</p>
      <!--<div class="labelShow"><span  v-for="(label,index) in labels"><i>{{label}}</i></span></div>-->
      <div class="labelShow">
        <span v-if="result.invoice"  v-for="(label,index) in labels" ><i>{{label}}</i></span>

      </div>
    </div>

    <footer class="imgFooter">
      <ul>
        <li @click="developping">
          <span class="first"></span>
          <div>重新识别</div>
        </li>
        <li @click="editInvoice">
          <span class="second"></span>
          <div>定义发票</div>
        </li>
        <li @click="intoLabel">
            <span class="three"></span>
            <div>图片标签</div>
        </li>
      </ul>
    </footer>
  </div>
</div>
</template>

<script>
  import http from '../../http'
  import global_ from '../../components/tool/Global'
  import { MessageBox } from 'mint-ui'
  export default{
    data(){
      return{
        invoiceItem:'',
        labelShow:'',
        labels:[],
        result:[],
        not_wx:true
      }
    },
    methods:{
      developping(){
        MessageBox.alert("此功能暂不开放！", "提示");
      },
      intoLabel(){
        let {invoiceItem}=this
        this.$router.push({path:`/invoiceLabel/${this.invoiceItem.invoice.invoiceId}`})
      },
      editInvoice(){
        this.$router.push({path:`/editInvoice/${this.invoiceItem.invoice.invoiceId}`})
      },
    },
    created(){
      this.invoiceItem=JSON.parse(sessionStorage.getItem('invoice_item'))
      this.not_wx=!global_.isWeiXin()
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.imgBox
  position relative
  width 100%
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
  .imgDetail
    width 100%
    height 250px
    /*background url("./fail.png") no-repeat center center*/
    /*-webkit-background-size 100%*/
    img
      width 100%
      height 100%

  .labelWrap
    width 100%
    .title
      margin-top 40px
      color #878787
      font-size 14px
      height 35px
      line-height 35px
      padding-left 40px
      /*margin-bottom 10px*/
    .labelShow
      width 80%
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

  .imgFooter
    position fixed
    bottom 6px
    left 0
    width 100%
    height 100px
    background-color: #fff
    z-index 700
    ul
      width 90%
      margin 0 auto
      li
        float left
        width 33.33%
        text-align center
        div
          font-size 12px
          margin-top 15px
          color #5d5d5d

        .first
          background url("./first.png") no-repeat center center
          -webkit-background-size 100%
        .second
          background url("./second.png") no-repeat center center
          -webkit-background-size 100%
        .three
          background url("./three.png") no-repeat center center
          -webkit-background-size 100%
        span
          width  40px
          height 40px
          display inline-block


</style>
