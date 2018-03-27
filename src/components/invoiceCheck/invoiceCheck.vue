<template>
<div class="invoiceCheck-wrap">
  <!--头部-->
  <header v-show="not_wx">
    <span class="back" onclick="window.history.go(-1)"><i class="icon-arrow_lift"></i>返回</span>
      <span>发票验真</span>
  </header>
  <div class="title"><p>该发票正在验真中…</p></div>
  <div class="content"></div>

  <!--<h1>发票查验</h1>
  <p>3-4</p>
  <p>3-5</p>
  <p>3-6</p>
  <p>3-7</p>
  <p>3-8</p>-->
</div>
</template>

<script>
  import http from '../../http'
  import global_ from '../../components/tool/Global'
  export default{
    data(){
      return{
        result:'',
        not_wx:true
      }
    },
    created(){
      this.not_wx=!global_.isWeiXin()
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .invoiceCheck-wrap
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    background url("yanzhen3.png") no-repeat center center
    -webkit-background-size 100%
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
    .title
      position: absolute
      left 0
      top 110px
      width 100%
      p
        width 100%
        height 30px
        line-height 30px
        text-align center
        font-size 28px
        color #fff
    .content
      width 100%
      height 623px
      -webkit-background-size 100%
</style>
