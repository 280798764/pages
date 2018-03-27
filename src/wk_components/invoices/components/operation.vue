<template>
  <el-dialog
    :visible="visible"
    :width="status ? '30%' : '50%'"
    class="invoice-operation"
    @update:visible="$emit('update:visible', $event)">
    <div class="content" v-if="status === 1">
      <p class="success-title">
        <i class="el-icon-success"></i>
        <span>报销成功</span>
      </p>
      <p class="success-description" v-text="`本次成功报销 ${data.successNo} 张发票。`"></p>
      <p class="success-print">
        <el-button type="primary" @click="printHandler" plain>打印列表</el-button>
      </p>
    </div>
    <div class="content" v-else-if="status === -1">
      <p class="success-title">
        <i class="el-icon-warning"></i>
        <span>报销失败</span>
      </p>
      <p class="success-description" v-text="data.message"></p>
    </div>
    <div class="content" v-else>
      <p class="success-title">
        <i class="el-icon-warning"></i>
        <span>报销结果</span>
      </p>
      <p class="success-description">本次成功报销<span class="success-tips" v-text="data.successNo"></span>张发票，报销失败 <span class="fail-tips" v-text="data.failNo"></span> 张发票。</p>
      <el-table
        :data="failDataList"
        style="width: 100%">
        <el-table-column
          prop="invoiceCode"
          label="发票代码"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="invoiceNo"
          align="center"
          label="发票号码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="message"
          align="center"
          label="失败原因">
        </el-table-column>
      </el-table>
      <p class="success-print">
        <el-button type="primary" @click="printHandler" plain>打印列表</el-button>
      </p>
    </div>
  </el-dialog>
</template>
<script>
  import Utils from '@/common/utils';
  import Storage from '@/common/utils/localStorage';
  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    data() {
      return {
        status: 1,
        failDataList: [],
        printInfo: {}
      }
    },
    watch: {
      data(val) {
        this.status = val.status;
        if (!val.status) this.failDataList = val.details.filter(item => item.status === -1);
        if (this.data.status !== -1) {
          let totalPrice = 0;
          const printList = this.data.details.filter(item => item.status === 1).map(item => {return item.invoice});
          printList.forEach(item => {
            item.amountWithTaxStr = Utils.toThousands(item.amountWithTax);
            item.amountWithoutTaxStr = Utils.toThousands(item.amountWithoutTax);
            item.taxAmountStr = Utils.toThousands(item.taxAmount);
            item.processTime = Utils.formatDay(item.processTime, 'YYYY-MM-DD HH:MM:SS');
          })
          const priceList = printList.map(item => {return item.amountWithTax});
          if (priceList.length) totalPrice = priceList.reduce((item, sum) => { return item + sum});
          this.printInfo = {
            totalPrice: Utils.toThousands(+totalPrice.toFixed(2)),
            list: printList
          };
        }
      }
    },
    methods: {
      printHandler() {
        Storage.set('printInfo', JSON.stringify(this.printInfo));
        const { href } = this.$router.resolve({ path: 'printInvoices' });
        window.open(href, '_blank');
      }
    }
  }
</script>
<style lang="scss">
  .invoice-operation {
    .content {
      p {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
    .success {
      &-title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        i {
          font-size: 30px;
          margin-right: 10px;
        }
      }
      &-description {
        color: #979797;
        font-size: 12px;
        span {
          margin: 0 10px;
        }
      }
      &-print {
        margin-top: 20px;
        text-align: center;
      }
    }
    .success-tips {
      color: #41b4ec;
    }
    .fail-tips {
      color: #ffa500;
    }
    .el-icon-success {
      color: #9acc00;
    }
    .el-icon-warning {
      color: #ffa60c;
    }
  }
</style>
