<template>
  <div class="personalCenter-wrap">
    <!--头部-->
    <header v-show="not_wx">
      <span class="back" onclick="window.history.go(-1)">
        <i class="icon-arrow_lift">
        </i>返回
      </span>

        <router-link to="/messages">
          <span>发票验真</span>
        </router-link>
    </header>
    <!--中部-->
    <div class="personalCenter_content">
        <div class="personalCenter_content_c">
          <div class="top">
            <span class="delete" @click="deleteInvoice"></span>
          </div>
          <div class="middle">
            <!--发票头部-->
            <div class="middle_top">
              <ul>
                <li><span>付款方</span><span class="pull">></span><span>北京多来点信息技术有限公司</span></li>
                <li><span>收款方</span><span class="pull"  ></span><span>汉堡王（北京）餐饮管理有限公司</span></li>
              </ul>
            </div>
            <!--发票抬头下拉-->
            <div class=" nameDetail" style="display: none">
              <ul>
                <li><span>纳税人识别号：</span><span>76543223456789098X</span></li>
                <li><span>地址、电话：</span><span>上海市长宁区金钟路999号3栋701</span></li>
                <li><span></span><span>8789876</span></li>
                <li><span>开户行账户：</span><span>中国银行虹桥临空经济园支行</span></li>
                <li><span></span><span>4322345677889</span></li>
              </ul>
            </div>
            <!--虚线-->
            <dashed></dashed>
            <!--发票中部-->
            <div class="middle_top ">
              <ul>
                <li><span>校验码</span><span class="">></span><span>34456764322211112334</span></li>
                <li><span>发票金额</span><span class="">></span><span>¥52</span></li>
                <li><span>开票日期</span><span class="">></span><span>2017-09-01</span></li>
                <li><span>发票号码</span><span class="">></span><span>88902938</span></li>
                <li><span>发票代码</span><span class="">></span><span>011001200444</span></li>
                <li><span>商品明细</span><span class="pull" ></span><span>汉堡王（北京）汉堡</span></li>
              </ul>
            </div>
            <!--发票明细下拉-->
            <div class="productDteail" style="display: none" >
              <table>
                <tr>
                  <td>名称</td>
                  <td>金额</td>
                  <td>税率</td>
                </tr>
                <tr>
                  <td><p>味全每日c果汁300ml</p></td>
                  <td>11.94</td>
                  <td>17%</td>
                </tr>
              </table>
            </div>
            <!--虚线-->
            <dashed></dashed>
            <!--发票底部-->
            <div class="middle_top middle_bottom">
              <ul class="label">
                <li class="title">标签：</li>
                <li><i>物业费</i><i>北京出差</i><i>钉钉报销</i></li>
              </ul>
              <ul class="state">
                <li class="title">状态：</li>
                <li><p><span><i></i>验真通过</span><span><i class="m"></i>&nbsp &nbsp &nbsp抬头不存在</span><span><i class="r"></i>报销中</span></p></li>
              </ul>
            </div>
          </div>
        </div>
      <!--圆点-->
        <div class="circle_t">
          <span></span>
          <span></span>
        </div>
      <!--圆点-->
        <div class=" circle_t circle_b">
          <span></span>
          <span></span>
        </div>

    </div>
    <!--底部导航-->
    <footer>
      <ul>
        <li>
          <router-link to="/invoiceCheck">
            <p></p>
            <div>发票检查</div>
          </router-link>
        </li>
        <li>
          <router-link to="/editInvoice">
            <p class="red"></p>
            <div>编辑发票</div>
          </router-link>
        </li>
        <li>
          <router-link to="/invoiceLabel">
            <p class="orange"></p>
            <div>发票标签</div>
          </router-link>
        </li>
      </ul>
    </footer>

    <!--验真错误的遮罩-->

    <transition name="fade">
      <div class="checkError" v-show="showCheckError">
        <div class="errorMessages">
          <p>上海国税暂不支持验真服务</p>
          <p>请稍后再试！</p>
          <div class="abolish" @click="checkErrorShow">取消</div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>

  import dashed from '../dashed/dashed.vue'
  import global_ from '../../components/tool/Global'
  export default {
    data(){
      return{
       /* detailShow:false,
        detailNameShow:false*/
        showCheckError:true,
        not_wx:true
      }
    },
    components:{
      dashed,

    },
    created(){
      this.not_wx=!global_.isWeiXin()
    },
    methods:{
    /*  showDetail(){
       this.detailShow=!this.detailShow
        if(this.detailShow==true){
          this.$refs.detail.style.transform='rotate(90deg)'
        }else{
          this.$refs.detail.style.transform='rotate(0deg)'
        }
      },
      showDetailName(){
        this.detailNameShow=!this.detailNameShow
        if(this.detailNameShow==true){
          this.$refs.detailName.style.transform='rotate(90deg)'
        }else{
          this.$refs.detailName.style.transform='rotate(0deg)'
        }
      },*/
      deleteInvoice(){
        alert('确定要删除吗？')
      },

      checkErrorShow(){
        this.showCheckError=false
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .personalCenter-wrap
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
    .personalCenter_content
      padding-bottom 27px
      padding-top 15px
      width 100%
      background-color #efeef4
      .personalCenter_content_c
        margin 0 auto
        width 94%
        background-color #fff
        -webkit-border-radius 10px
        -webkit-border-bottom-left-radius 0
        -webkit-border-bottom-right-radius 0
        box-shadow 0 0 5px #878787
        .top
          position relative
          width 100%
          height 100px
          background url(invoice.png) no-repeat center center #fff
          background-size 49%
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
          .middle_top
            width 100%
            padding-bottom 10px
            ul
              width 100%
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
                  &:nth-of-type(2)
                    float right
                    color #282828
                    margin-left 3%
                    color #fff
                   &:nth-of-type(3)
                    float right

          .nameDetail
            box-sizing border-box
            padding 3%
            width 90%
            height 135px
            margin 0 auto
            background-color #f7f7f7
            font-size 13px
            color #989898
            ul
              width 100%
              li
                width 100%
                height 20px
                line-height 20px
                &:nth-of-type(1)
                  margin-top 2px
                &:nth-of-type(1), &:nth-of-type(3)
                  margin-bottom 7px
                span
                  display inline-block
                  width 100%
                  &:nth-of-type(1)
                    width 31%
                  &:nth-of-type(2)
                    width 69%
          .productDteail
            width 90%
            height 76px
            background-color  #f7f7f7
            margin 0 auto
            table
              margin-top 5px
              width 100%
              font-size 13px
              tr
                width 100%
                height 35px
                line-height 35px
                color #878787
                &:nth-of-type(2)
                  height 18px
                  line-height 18px
                  color #2b2b2b
                &:nth-of-type(3)
                  height 18px
                  line-height 18px
                  color #2b2b2b
                td
                  text-align center
                  &:nth-of-type(1)
                    width 34%
                    text-align center
                    p
                      width 80%
                      text-align left
                      margin 0 0 7% 10%
                      color #939393
                  &:nth-of-type(2)
                    width 25%
                    text-align center
                    color #939393
                  &:nth-of-type(3)
                    width 25%
                    text-align center
                    color #939393
          .middle_bottom
            border-bottom none
            padding-bottom 13px
            ul
              width 100%
              li
                width 94%
                i
                  box-sizing border-box
                  padding-left 5px
                  display inline-block
                  width 68px
                  font-style normal
                  background url("label.png") no-repeat center center
                  background-size 100%
                  margin-right 20px
                  font-size 12px
                  color #fff
            .label
              width 100%
              .title
                color #878787
              li
                padding 0 7px
            .state
              .title
                    color #878787
              li
                width 100%
                p
                  width 100%
                  height 30px
                  span
                    position relative
                    display inline-block
                    width 33.33%
                    margin 0
                    height 30px
                    line-height 30px
                    float left
                    text-align center
                    box-sizing border-box
                    padding-left 20px
                    color #5d5d5d
                    i
                      position absolute
                      left 10px
                      top 6px
                      background url("circle_l.png") no-repeat center center
                      -webkit-background-size 100%
                      display inline-block
                      width 19px
                      height 19px
                      border 4px solid rgba(65, 180, 236, 0.23)
                      border-radius 50%
                    .m
                      background url("circle_m.png") no-repeat center center
                      border-radius 50%
                      border 4px solid rgba(255, 80, 73, 0.2)
                      -webkit-background-size 100%
                    .r
                      background url("circle_r.png") no-repeat center center
                      border-radius 50%
                      border 4px solid rgba(249, 210, 57, 0.2)
                      -webkit-background-size 100%

      /*圆点*/
      .circle_t
        position absolute
        top 213px
        width 100%
        height 20px
        background-color transparent
        span
          position absolute
          top 2px
          display inline-block
          width 18px
          height 18px
          background-color red
          border-radius 50%
          text-align center
          &:nth-of-type(1)
            left 3px
            background url("left.png") no-repeat center center
            -webkit-background-size 100%
          &:nth-of-type(2)
            right  3px
            background url("right.png") no-repeat center center
            -webkit-background-size 100%
      .circle_b
        position absolute
        top 392px
        width 100%
        height 20px
        background-color transparent

    /*底部*/
    footer
      width 100%
      background-color #efeef4
      overflow hidden
      ul
        li
          width 33.3333%
          float left
          text-align center
          p
            width 50px
            height 50px
            background url("search1.png") no-repeat 10px center #74afff
            border-radius 50%
            -webkit-background-size 60%
            margin  0 auto
          .red
            background url("write1.png") no-repeat center  #ff707a
            -webkit-background-size 60%
          .orange
            background url("invoiceLabel1.png") no-repeat center center  #ff9260
            -webkit-background-size 60%
          div
            height 50px
            line-height 50px
            font-size 12px
            padding-bottom 10px
            color #5d5d5d

    .checkError
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      background-color rgba(0, 0, 0, 0.7)
      &.fade-enter-active, &.fade-leave-active
        transition opacity  0.5s
      &.fade-enter, &.fade-leave-to
        opacity 0

      .errorMessages
        position absolute
        left 50%
        top 35%
        margin-left -95px
        width 190px
        /*height 106px*/
        background-color: #fff
        border-radius 10px
        color #4a4a4a
        padding-top 5px
        font-size 13px

        div
          width 100%
          text-align center
          height 40px
          line-height 40px
          border-top 1.5px solid #e5e5e5
        p
          height 30px
          line-height 28px
          text-align center
        .abolish
          color #4cb3ff

</style>
