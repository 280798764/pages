<template>
  <div class="invoice-search" v-if="visible">
    <el-form :model="ruleForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="含税金额范围">
            <div class="amount-range">
              <el-input placeholder="输入金额（小）" type="number" v-model.number="ruleForm.amountWithTax[0]"></el-input>
              <span>-</span>
              <el-input placeholder="输入金额（大）" type="number" v-model.number="ruleForm.amountWithTax[1]"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票代码">
            <el-input placeholder="请输入发票代码" v-model="ruleForm.invoiceCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号码">
            <el-input placeholder="请输入发票号码" v-model="ruleForm.invoiceNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开票日期">
            <el-date-picker v-model="ruleForm.paperDrewDate"
              type="daterange"
              :clearable="false"
              range-separator="至"
              value-format="yyyyMMdd"
              start-placeholder="开票日期"
              end-placeholder="开票日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报销日期">
            <el-date-picker v-model="ruleForm.processTime"
              type="daterange"
              :clearable="false"
              range-separator="至"
              value-format="yyyyMMdd"
              start-placeholder="报销日期"
              end-placeholder="报销日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="发票类型">
        <select-items v-model="ruleForm.invoiceTypes" :data="invoiceTypeList"></select-items>
      </el-form-item>
    </el-form>
    <div class="seach-footer">
      <el-button plain @click="resetForm">重置</el-button>
      <el-button plain @click="closeHandler">取消</el-button>
      <el-button plain type="primary" @click="submitForm">应用筛选</el-button>
    </div>
  </div>
</template>
<script>
  import Clickoutside from 'element-ui/lib/utils/clickoutside';
  import { invoiceTypeList } from '@/common/constants/selectType.js';
  import SelectItems from './select-item.vue';
  export default {
    directives: { Clickoutside },
    components: {
      SelectItems
    },
    props: {
      visible: Boolean
    },
    data() {
      return {
        invoiceTypeList,
        ruleForm: {
          amountWithTax: [], // 含税金额范围
          invoiceCode: '', // 发票代码
          invoiceNo: '', // 发票号码
          paperDrewDate: '', // 开票日期
          processTime: '', // 报销日期
          invoiceTypes: [] // 发票类型
        },
        tagList: {
          amountWithTax: '含税金额范围：',
          invoiceCode: '发票代码：',
          invoiceNo: '发票号码：',
          paperDrewDate: '开票日期：',
          processTime: '报销日期：',
          invoiceTypes: '发票类型：'
        }
      };
    },
    created () {
      bus.$on('removeExtend', val => {
        this.ruleForm[val] = val === 'amountWithTax' || val === 'invoiceTypes' ? [] : '';
      });
    },
    methods: {
      closeHandler() {
        this.$emit('update:visible', false);
      },
      resetForm() {
        this.ruleForm = {
          amountWithTax: [], // 含税金额范围
          invoiceCode: '', // 发票代码
          invoiceNo: '', // 发票号码
          paperDrewDate: '', // 开票日期
          processTime: '', // 报销日期
          invoiceTypes: [] // 发票类型
        };
        bus.$emit('resetInvoiceTypes');
      },
      submitForm() {
        let filterParams = [];
        for(let key in this.ruleForm) {
          const item = this.ruleForm[key];
          if (item && item.length) {
            if (key === 'invoiceTypes') {
              let value = [];
              this.invoiceTypeList.forEach(typeItem => {
                const hasOne = item.some(res => res === typeItem.name);
                if (hasOne) value.push(typeItem.value);
              });
              filterParams.push({
                type: key,
                value,
                label: this.tagList[key] + item.join(', ')
              });
            } else {
              filterParams.push({
                type: key,
                value: item,
                label: this.tagList[key] + (Array.isArray(item) ? item.join(' ~ ') : item)
              });
            }
          }
        }
        this.$emit('submitHandler', filterParams);
        this.closeHandler();
      }
    }
  }
</script>
<style lang="scss">
  .invoice-search {
    position: fixed;
    top: 61px;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
    border: 1px solid #dfdfdf;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .06);
    .el-form {
      padding: 20px 40px 0 40px;
    }
    .el-input {
      // width: auto;
      &__inner {
        // height: 30px;
      }
    }
    .seach-footer {
      border-top: 1px solid #dfdfdf;
      height: 60px;
      line-height: 60px;
      text-align: right;
      padding-right: 40px;
    }
    .amount-range {
      display: flex;
      span {
        width: 50px;
        text-align: center;
      }
      .el-input {
        flex: 1;
        // width: auto;
      }
    }
  }
</style>

