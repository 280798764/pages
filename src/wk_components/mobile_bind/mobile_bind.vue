<template>
<div class="  mobileBind_wraper">
  <header>
    <span class="back"  onclick="window.history.go(-1)"><i class="icon-arrow_lift"></i >返回</span>
    <span>手机绑定</span>

  </header>
<h1>绑定成功！</h1>
  <div>
    <p>1.将已有的发票发送至你的专属邮箱</p>
    <p>15987394456@e-fp.com</p>
  </div>
  <!--<div>
    <p>2.开具电子发票时只要提供此专属邮箱，以后所有的发</p>
    <p class="as">票就统统能在票税助手查到啦</p>
  </div>-->
  <div class="bottom">
    2.开具电子发票时只要提供此专属邮箱，以后所有的发 &nbsp&nbsp 票就统统能在票税助手查到啦
  </div>

</div>
</template>

<script>
  export default{}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mobileBind_wraper
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
  h1
    width 100%
    height 60px
    line-height 60px
    color #d0021b
    padding-left 30px
    font-weight bold
  .bottom
    height 30px
    padding-bottom:35px;
    line-height 22px
    color #9b9b9b
  div
    width 90%
    margin 0 auto
    border-bottom 1px solid #efefef
    height 70px
    margin-bottom 20px
    padding-bottom:20px;
    p
      width 100%
      margin 0 auto
      height: 40px
      line-height 40px
      &:nth-of-type(1)
        color #9b9b9b
      &:nth-of-type(2)
        width 100%
        padding-left 10px
        box-sizing border-box

</style>
