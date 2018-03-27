<template>

  <div class="takePhoto_wrap">
    <header>
      <router-link to="/invoiceCollection" class="photo_take">
        <span class="back"  ><i class="icon-arrow_lift"></i >返回</span>
      </router-link>

      <span>拍照技巧</span>
    </header>
    <div class="takePhoto_content">

    </div>

  </div>

</template>

<script>
  export default{
    data(){
      return{
      }
    },
    created(){
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.takePhoto_wrap
  width 100%
  height 100%
  header
    position absolute
    top 0
    left 0
    width 100%
    height 44px
    line-height 44px
    background-color #433f3c
    text-align center
    color white
    font-size 16px
    font-weight 600
    font-family Algerian
    z-index 1
    .photo_take
      color #fff
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
  .takePhoto_content
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    background-color red
    background url("./takePhoto.png") no-repeat center center
    -webkit-background-size 100%


</style>
