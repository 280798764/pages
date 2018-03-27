<template>
 <div>
   <div class="invoiceLabel_wrap">
     <!--头部-->
     <header v-show="not_wx">
      <span class="back" onclick="window.history.go(-1)">
        <i class="icon-arrow_lift">
        </i>返回
      </span>
       <span></span>
     </header>
     <!--中间内容部分-->
     <div class="invoiceLabel_content">
       <!--灰色背景-->
       <div class="gray"></div>
       <!--内容头-->
       <div class="invoiceLabel_content_top">
         <p @click="addItem">
           <span>1</span>
           <span>创建新标签</span>
         </p>
       </div>
       <!--灰色背景-->
       <div class="gray"></div>
       <!--列表内容-->
       <div class="invoiceLabel_content_item" ref="itemDiv">
         <ul ref="ul">
           <li v-for="(todoItem,index) in todos" @click="itemClick($event, todoItem)" :key="index" >
             <span v-bind:class="{ marked: todoItem.state }"></span>
             <input type="text" v-model="todoItem.labelName" unselectable="on" v-bind:readonly="!todoItem.edited" class="active" v-focus='{isFocus : todoItem.focusActive, isReadonly: !todoItem.edited}' id="inp" >
             <img name="complete" v-if="todoItem.edited" src="./complete.png" @click="updateLabel(index)">
             <img name="edit" v-else src="./edit.png" >
             <img name="delete" src="./delete.png" @click="deliver(index)">
           </li>
         </ul>
       </div>
       <!--遮罩-->
       <transition name="fade">
         <div class="deleteShade" v-show="showDeleteShade">
           <div class="reminder">
             <p>是否删除该标签？</p>
             <p><span @click="cancel">取消</span><span @click="deleteItem(index)">删除</span></p>
           </div>
         </div>
       </transition>
     </div>
     <!--底部-->
     <!--div class="footer">
       <div>保 存</div>
     </div-->
   </div>
   <div id="loading" v-show="loading"></div>
 </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import BScroll from 'better-scroll'
  import http from '../../http'
  import global_ from '../../components/tool/Global'
  export default{
    data(){
      return {
        showDeleteShade: false,
        index: '',
        todos: [],
        userInfo:'',
        loading:true,
        not_wx:true
      }
    },
    mounted(){
      this.$nextTick(() => {
        console.log(111)
        const itemDivHeight = this.$refs.itemDiv.clientHeight
        const ulHeight = this.$refs.ul.clientHeight
        console.log(itemDivHeight, ulHeight)
        if (ulHeight > itemDivHeight) {
          console.log(222)
          this._initScroll()
        }
      })
    },
    created(){
      this.not_wx=!global_.isWeiXin()
    },
    directives: {//自定义指令
      focus: {//自定义一个v-focus指令
        inserted: function (el, binding) {//指令的inserted方法
          if (binding.value.isFocus) {//判断当前指令是否需要聚焦
            el.focus();//用focus事件来聚焦
          }
        },
        update: function (el, binding) {//指令的update方法
          if (binding.value.isFocus) {
            el.focus()
          }
          if (binding.value.isReadonly) el.blur();
        }
      }
    },
    /*发送请求*/
    mounted(){
      const dataMap = {
        dataMap: JSON.stringify(
          {
            "invoiceId": this.$route.params.id+""
          }
        )
      }
      console.log(JSON.stringify(dataMap))
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const url=global_.httpUrl+this.userInfo+'&method=xforceplus.toc.getLabels'
      http.post(url, dataMap)
        .then((response) => {
        this.loading=false
          const datas = response.data;
          if (datas.result instanceof Array) {
            let index
            for (index in datas.result) {
              datas.result[index].edited = false;
              if(datas.result[index].status == '1'){
                datas.result[index].state = true
              }else {
                datas.result[index].state = false
              }
              this.todos.push(datas.result[index])
            }
          }
        })
    },
    methods: {
      updateLabel(index){

        let id = this.todos[index].id
        if (!this.todos[index].labelName.trim()) {
          return
        }
        if (global_.isEmpty(id)) {
          //if id is null,add
          const url=global_.httpUrl+this.userInfo+'&method=xforceplus.toc.addLabel'
          const dataMap = {
            dataMap: JSON.stringify(
              {
                "labelName": this.todos[index].labelName
              }
            )
          }
          http.post(url, dataMap)
            .then((response) => {
              const datas = response.data;
              console.log("======" + datas.msg);
              if (datas.status == "1") {
                this.todos[index].id = datas.id
                console.log('标签新增成功');
              }else{
                console.log('标签新增失败');
              }
            })
        } else {
          //update
          const url=global_.httpUrl+this.userInfo+'&method=xforceplus.toc.updateLabel'
          const dataMap = {
            dataMap: JSON.stringify(
              {
                "labelId": id,
                "labelName": this.todos[index].labelName
              }
            )
          }
          http.post(url, dataMap)
            .then((response) => {
              const datas = response.data;
              if (datas.status == "1") {
                console.log('标签修改成功');
              }else{
                console.log('标签修改失败');
              }
            })
        }
      },
      deliver(index){
        this.index = index
      },
      _initScroll(){
        new BScroll(this.$refs.itemDiv, {
          click: true,
          scrollY: true
        })
      },
      addItem() {
        let item = {
          labelName: "",
          status: '0',
          state: false,
          edited: true,
          focusActive: true //为新创建的标签数据添加一个focusActive用来聚焦
        }
        if(this.todos.length>0){
          if (!this.todos[0].labelName.trim()) {
            return
          }
        }
        this.todos.map((v) => {//遍历所有标签数据
            v.focusActive = false;
        })
        this.todos.unshift(item);
        // document.getElementById('inp').focus()

      },
      deleteItem(index) {
        MessageBox.confirm('确定要删除该标签?').then(action => {
          console.log("delete label")
          if (!global_.isEmpty(index+'')) {
            const url=global_.httpUrl+this.userInfo+'&method=xforceplus.toc.deleteLabel'
            if (!this.todos[index].id) {
              this.todos.splice(index, 1);
              this.showDeleteShade = false;
              return
            }
            const dataMap = {
              dataMap: JSON.stringify(
                {
                  "labelId": this.todos[index].id
                }
              )
            }
            http.post(url, dataMap)
              .then((response) => {
                const datas = response.data;
                console.log("======" + datas.msg);
                if (datas.status == "1") {
                  this.todos.splice(index, 1)
                  console.log('标签删除成功');
                }else{
                  console.log('标签删除失败');
                }
              })
          }else{
            this.todos.splice(index, 1)
          }
          this.showDeleteShade = false
        });
      },
      itemClick(event, item) {

        let target = event.target.tagName;
        let name = event.target.name;
        if (target === "INPUT") {
          item.state = !item.state;
          //选中or不选中
          const url=global_.httpUrl+this.userInfo+'&method=xforceplus.toc.updateInvoiceLabel'
          const dataMap = {
            dataMap: JSON.stringify(
              {
                "invoiceId": this.$route.params.id+"",
                "labelId": item.id+"",
                "status":item.state?"1":"0"
              }
            )
          }
          http.post(url, dataMap)
            .then((response) => {
              const datas = response.data;
              if (datas.status == "1") {
                console.log('发票标签修改成功');
              }else{
                console.log('发票标签修改失败');
              }
            })
        } else {//判断点击修改编辑
            this.todos.map((v) => {//遍历所有标签数据
                if (v.id == item.id) {//判断当前点击标签的数据id
                    v.focusActive = true; //为当前标签的数据id添加focusActive属性来控制自定义指令v-focus的处理
                } else {
                    v.focusActive = false;

                }
            })
        }
        switch (name) {
          case "edit":
            item.edited = true;
            break;
          case "complete":
            item.edited = false;
            break;
          case "delete":
            this.showDeleteShade = true;
            break;
        }
      },
      cancel(){
        this.showDeleteShade = false
      },
    },

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
  .invoiceLabel_wrap
    position relative
    width 100%
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
    .invoiceLabel_content
      width 100%
    .gray
      width 100%
      height 8px
      background-color #efeef4
    .invoiceLabel_content_top
      width 100%
      height 49px
      line-height: 49px;
      box-sizing border-box
      padding-left 10%
      p
        width 100%
        span
          display inline-block
          &:nth-of-type(1)
            width 39px
            height 100%
            background url("add.png") no-repeat center center
            -webkit-background-size 50%
            color #fff
          &:nth-of-type(2)
            color #41b4ec
            font-size 18px
    .invoiceLabel_content_item
      width 100%
      box-sizing border-box
      padding-left 30px
      font-size 13px
      color #282828
      /*height 450px*/
      overflow hidden
      overflow auto
      ul
        width 95%
        .check
          span
            &:nth-of-type(1)
              background-color #dfdfdf
        li
          display flex
          flex-wrap: nowrap
          align-items center
          width 100%
          height 48px
          line-height 48px
          border-bottom 2px solid #f0f0f0
          .active
            outline none

          span
            width 10px
            height 10px
            border-radius 50%
            margin-right 10px
            background-color #dfdfdf
          .marked
            background-color #41b4ec
          input
            flex-grow 1
            width 50%
            height 48px
          img
            width 20px
            height 20px
            margin 8px
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
      position absolute
      left 0
      bottom -80px
      width 100%
      margin 0 auto
      z-index 1
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

</style>
