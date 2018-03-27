<template>
  <div class="print_wraper">
    <button class="doPrint" @click="print_page" id="doPrint">打印</button>
    <h1>报销信息</h1>
    <p>
      <span>姓名：{{username}}</span>
      <span>手机号码：{{mobile}}</span>
      <span>报销发票总金额：¥ {{totalPrice}}元</span>
      <span>报销发票总数量：{{printInfoList.length}}张</span>
      <i class="prompt" id="isBlock" style="color: red">提示：打印前请选择“横向”布局！</i>
    </p>
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
      <tr v-for="(item, index) in printInfoList" :key="index">
        <td v-text="item.invoiceCode"></td>
        <td v-text="item.invoiceNo"></td>
        <td v-text="item.paperDrewDate"></td>
        <td>
          <img v-if="item.invoiceType === 'ce'" src="~images/dian.png" alt="">
          <img v-if="item.invoiceType === 's'" src="~images/zhuan.png" alt="">
          <img v-if="item.invoiceType === 'v'" src="~images/ji.png" alt="">
          <img v-if="item.invoiceType === 'c'" src="~images/pu.png" alt="">
        </td>
        <td v-text="item.sellerName"></td>
        <td v-text="item.purchaserName"></td>
        <td v-text="`¥ ${item.amountWithTaxStr}`"></td>
        <td v-text="item.invoiceFlag !== '1' ? '作废' : '正常'"></td>
        <td v-text="verifyFlag[+item.verifyFlag + 1]"></td>
        <td v-text="item.processTime"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Storage from '@/common/utils/localStorage';
  export default{
    data() {
      return {
        verifyFlag: [
          '未验真',
          '验真中',
          '验真成功',
          '验真失败'
        ],
        mobile: '',
        username: '',
        totalPrice: '0.00',
        printInfoList: []
      };
    },
    created(){
      const printInfo = JSON.parse(Storage.get('printInfo'));
      this.totalPrice = printInfo.totalPrice;
      this.printInfoList = printInfo.list;

      this.mobile = Storage.get('mobile');
      this.username = Storage.get('username');
    },
    methods:{
      print_page() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
          this.remove_ie_header_and_footer();
        }
        let doPrint=document.getElementById('doPrint');
        doPrint.style.display='none';
        let isBlock=document.getElementById('isBlock');
        isBlock.style.display='none';

        window.print();
        doPrint.style.display='block';
        isBlock.style.display='block';

      },
      remove_ie_header_and_footer() {
        const hkey_path = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\';
        try {
          let RegWsh = new ActiveXObject('WScript.Shell');
          RegWsh.RegWrite(hkey_path + 'header', '');
          RegWsh.RegWrite(hkey_path + 'footer', '');
        } catch (e) {
        }
      }
    }
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
    margin 0 auto 20px
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
  table
    width 96%
    margin 0 auto
    text-align center
    color #5a5b5d
    font-size 10px
    border 1px solid  #9b9b9b
    tr
      height 30px
      line-height 30px
      font-size 12px
      &:not(:last-child)
        border-bottom 1px solid  #ebeef5
    tr:hover
      background-color: #EDF3FE
    img
      width 24px
      height 15px
      vertical-align middle
</style>
