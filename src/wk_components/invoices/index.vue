<template>
  <div class="invoices">
    <el-row class="invoices-header">
      <el-col :span="4" class="header-title">
        <img src="~images/taxClassification.png">
        <h1>我的票税助手</h1>
      </el-col>
      <el-col :span="20" class="header-search">
        <el-col :span="6">
          <el-input placeholder="请输入销方公司名称" v-model="params.sellerName">
            <template slot="prepend">销</template>
          </el-input>
          <!-- <el-input v-model="params.invoiceCode" placeholder="请输入完整的发票代码"></el-input> -->
        </el-col>
        <el-col :span="6">
          <el-input v-model="params.purchaserName" placeholder="请输入购方公司名称">
            <template slot="prepend">购</template>
          </el-input>
          <!-- <el-input v-model="params.invoiceNo" placeholder="请输入完整的发票号码"></el-input> -->
        </el-col>
        <el-col :span="6">
          <el-date-picker v-model="dateTime"
            type="daterange"
            :clearable="false"
            range-separator="至"
            value-format="yyyyMMdd"
            start-placeholder="创建日期"
            end-placeholder="创建日期">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="text" @click="extendHandler">添加筛选条件</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" plain icon="el-icon-search" @click="searchFetch">搜索</el-button>
        </el-col>
      </el-col>
    </el-row>
    <transition name="el-fade-in-linear">
      <search :visible.sync="extendFilters" @submitHandler="submitHandler"></search>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="tag-tips" v-if="tags.length">
        <el-tag
          v-for="tag in tags"
          :key="tag.type"
          closable
          type="info"
          @close="closeTagHandler(tag)">
          <span v-text="tag.label"></span>
        </el-tag>
      </div>
    </transition>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="`未报销(${noApplyData.length})`" name="notApply"></el-tab-pane>
      <el-tab-pane :label="`已报销(${applyData.length})`" name="apply"></el-tab-pane>
    </el-tabs>
    <el-table
      ref="multipleTable"
      :data="dataList"
      class="invoices-list"
      tooltip-effect="dark"
      style="width: auto; margin: 0 20px 50px;"
      @selection-change="handleSelectionChange">
       <el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column align="center" min-width="120" label="发票代码">
        <template slot-scope="scope">{{ scope.row.invoiceMain.invoiceCode }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="90" label="发票号码">
        <template slot-scope="scope">{{ scope.row.invoiceMain.invoiceNo }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="110" label="开票日期">
        <template slot-scope="scope">{{ scope.row.invoiceMain.paperDrewDate }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="发票类型">
        <template slot-scope="scope">
          <img v-if="scope.row.invoiceMain.invoiceType === 'ce'" src="~images/dian.png">
          <img v-if="scope.row.invoiceMain.invoiceType === 's'" src="~images/zhuan.png">
          <img v-if="scope.row.invoiceMain.invoiceType === 'v'" src="~images/ji.png">
          <img v-if="scope.row.invoiceMain.invoiceType === 'c'" src="~images/pu.png">
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="220" label="销方公司名称">
        <template slot-scope="scope">{{ scope.row.invoiceMain.sellerName }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="200" label="购方公司名称">
        <template slot-scope="scope">{{ scope.row.invoiceMain.purchaserName }}</template>
      </el-table-column>
      <el-table-column align="right" min-width="120" label="含税金额">
        <template slot-scope="scope">￥{{ scope.row.invoiceMain.amountWithTaxStr }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="发票状态">
        <template slot-scope="scope">{{ scope.row.invoiceMain.invoiceFlag === '1' ? '正常' : '作废' }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="验真状态">
        <template slot-scope="scope">{{ verifyFlag[+scope.row.invoiceMain.verifyFlag + 1] }}</template>
      </el-table-column>
      <el-table-column v-if="activeTab === 'apply'" align="center" min-width="100" label="报销时间">
        <template slot-scope="scope">{{ scope.row.invoiceMain.processTime }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="操作">
        <template slot-scope="scope"><span class="see-detail" @click="showDetailHandler(scope.row)">查看详情</span></template>
      </el-table-column>
    </el-table>
    <el-row class="invoices-footer">
      <el-col :span="1">
        <div class="all-checked">
          <el-checkbox v-model="allChecked">全选</el-checkbox>
          <div class="mask" @click="allCheckedHandler"></div>
        </div>
      </el-col>
      <el-col :span="1" class="checked-count" v-text="`${checkedData.length} / ${dataList.length}`"></el-col>
      <el-col :span="6" class="checked-total">
        <span>已选发票总金额：</span>
        <span v-text="`¥ ${totalPrice}`"></span>
      </el-col>
      <el-col :span="2" class="checked-count">
        <el-button :disabled="!checkedData.length" type="primary" size="mini" plain v-text="activeTab === 'notApply' ? '提交报销' : '打印列表'" @click="operationHandler"></el-button>
      </el-col>
    </el-row>
    <!-- 详细信息 -->
    <Detail :visible.sync="dialogDetailVisible" :data="detailInfo"></Detail>
    <Operation :visible.sync="dialogOperationVisible" :data="applyResponseData"></Operation>
  </div>
</template>
<script>
  import Api from 'api/invoices';
  import Storage from '@/common/utils/sessionStorage';
  import localStorage from '@/common/utils/localStorage';
  import Utils from '@/common/utils';
  import Detail from './components/detail.vue';
  import Operation from './components/operation.vue';
  import Search from './components/search.vue';
  export default {
    components: {
      Detail,
      Operation,
      Search
    },
    data () {
      return {
        verifyFlag: [
          '未验真',
          '验真中',
          '验真成功',
          '验真失败'
        ],
        extendFilters: false, // 是否扩展筛选条件
        token: Storage.get('token'),
        userId: Storage.get('userId'),
        dateTime: '', // 搜索时间
        activeTab: 'notApply',
        noApplyData: [], // 未报销数据
        applyData: [], // 已报销数据
        dataList: [], // 展示数据
        checkedData: [], // 选中数据
        params: {
          sellerName: '',
          purchaserName: '',
          invoiceCode: '', // 发票代码
          invoiceNo: '', // 发票号码
          token: '',
          row: 1000,
          page: 1,
          processTimeStart: '', // 筛选报销日期 开始时间
          processTimeEnd: '', // 筛选报销日期 结束时间
          paperDrewDateStart: '', // 筛选开票日期 开始时间
          paperDrewDateEnd: '', // 筛选开票日期 结束时间
          createTimeStart: '', // 筛选创建日期 开始时间
          createTimeEnd: '', // 筛选创建日期 结束时间
          amountWithTaxMin: '', // 筛选含税金额 金额最小值
          amountWithTaxMax: '', // 筛选含税金额 金额最大值
          invoiceTypes: [] // 筛选发票类型 s-专票 c-普票 ce电票 空-全部
        },
        allChecked: false,
        allCheckedTag: false,
        dialogDetailVisible: false, // 详情弹窗
        dialogOperationVisible: false, // 操作弹窗
        detailInfo: {}, // 查看详情
        applyResponseData: {}, // 提交报销返回信息
        addExtendFilters: [] // 新增的筛选条件
      }
    },
    created () {
      const {token, operationToken} = this.$route.query;
      if (token && operationToken) {
        const params = {
          token,
          operationToken
        }
        Api.switchUserToken({dataMap: JSON.stringify(params)})
          .then(({data}) => {
            if (data.status === 1) {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.userId = data.userId
              this.token = data.token
              this.mobile = data.mobile
              this.username = data.username

              Storage.set('token', (this.token));
              Storage.set('userId', (this.userId));
              Storage.set('mobile', (this.mobile));
              Storage.set('username', (this.username));
              localStorage.set('mobile', (this.mobile));
              localStorage.set('username', (this.username));
              this.fetchAll();
            } else {
              this.$message({
                message: data.message,
                type: 'error',
                duration: '2000'
              });
            }
          })
      } else {
        this.fetchAll();
      }
    },
    watch: {
      activeTab(val) {
        this.fetchData(val)
          .then((data) => {
            this.dataList = data;
            val === 'notApply' ? this.noApplyData = data : this.applyData = data;
          });
      },
      dialogOperationVisible(val) {
        if (!val) this.fetchAll()
      }
    },
    computed: {
      tags() {
        let arr = [];
        if (this.params.sellerName) arr.push({
          type: 'sellerName',
          label: `销方公司：${this.params.sellerName}`
        });
        if (this.params.purchaserName) arr.push({
          type: 'purchaserName',
          label: `购方公司：${this.params.purchaserName}`,
        });
        if (this.dateTime) {
          arr.push({
            type: 'dateTime',
            label: '创建日期：' + this.dateTime.join(' ~ '),
          });
        }
        return arr.concat(this.addExtendFilters);
      },
      totalPrice() {
        let totalPrice = 0;
        const checkedList = this.checkedData.map(item => {return item.invoiceMain.amountWithTax});
        if (checkedList.length) {
          totalPrice = checkedList.reduce((item, sum) => {
            return item + sum;
          });
        }
        return Utils.toThousands(+totalPrice.toFixed(2));
      }
    },
    methods: {
      // 查询条件
      fetchParams(flag) {
        const params = Object.assign({}, this.params, {
          id: this.userId,
          processFlag: flag || '-1'
        });

        if (this.dateTime) {
          params.createTimeStart = this.dateTime[0];
          params.createTimeEnd = this.dateTime[1];
        }

        return params;
      },
      // 请求数据
      fetchData(activeTab) {
        const processFlag = activeTab === 'notApply' ? '-1' : '1';
        const params = this.fetchParams(processFlag);
        return Api.getPersonalPurchaseInvoiceList(this.token, {dataMap: JSON.stringify(params)})
          .then(({data}) => {
            if (data.status === -1) {
              this.$router.push({path: 'wk_login'});
            } else {
              data.result.forEach(item => {
                item.invoiceMain.amountWithTaxStr = Utils.toThousands(item.invoiceMain.amountWithTax);
                item.invoiceMain.amountWithoutTaxStr = Utils.toThousands(item.invoiceMain.amountWithoutTax);
                item.invoiceMain.taxAmountStr = Utils.toThousands(item.invoiceMain.taxAmount);
                item.invoiceMain.paperDrewDate = Utils.formatDay(item.invoiceMain.paperDrewDate);
                item.invoiceMain.processTime = Utils.formatDay(item.invoiceMain.processTime, 'YYYY-MM-DD HH:MM:SS');
              });
            }
            return data.result;
          });
      },
      // 请求未报销数据
      fetchNoApply() {
        return this.fetchData('notApply')
          .then(data => {
            this.noApplyData = data;
          });
      },
      // 请求已报销数据
      fetchApply() {
        return this.fetchData('apply')
          .then(data => {
            this.applyData = data;
          });
      },
      // 请求数据
      fetchAll() {
        this.fetchNoApply()
          .then(() => {
            this.dataList = this.noApplyData;
          });
        this.fetchApply();
      },
      // 搜索操作
      searchFetch() {
        this.fetchNoApply()
          .then(() => {
            if (this.activeTab === 'notApply') this.dataList = this.noApplyData;
          });

        this.fetchApply()
          .then(() => {
            if (this.activeTab === 'apply') this.dataList = this.applyData;
          });

      },
      // 选中事件
      handleSelectionChange(val) {
        this.checkedData = val;
        this.allChecked = val.length === this.dataList.length;
      },
      // 全选操作
      allCheckedHandler() {
        this.allCheckedTag = !this.allCheckedTag;
        if (this.allCheckedTag) {
          let list = []
          this.dataList.forEach(item => {
            const hasItem = this.checkedData.some(rel => rel === item);
            if (!hasItem) list.push(item);
          });
          list.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item);
          })
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 详细信息
      showDetailHandler(val) {
        this.dialogDetailVisible = true;
        this.detailInfo = val;
      },
      // 未报销发票报销操作
      operationHandler() {
        if (this.activeTab === 'notApply') {
          this.$alert('确定提交报销吗？', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              if (action === 'cancel') return;
              const invoicesId = this.checkedData.map(item => {
                return item.invoiceMain.invoiceId;
              })
              const { token, userId } = this;
              const { query } = this.$route;
              const params = {
                token,
                userId,
                accessToken: query.token,
                operationToken: query.operationToken,
                invoices: invoicesId
              }
              const Loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              Api.updatePersonalPurchaseInvoice(this.token, {dataMap: JSON.stringify(params)})
                .then(({data}) => {
                  Loading.close();
                  this.dialogOperationVisible = true;
                  this.applyResponseData = data;
                });
            }
          });
        } else {
          const result = {
            totalPrice: this.totalPrice,
            list: this.checkedData.map(item => { return item.invoiceMain })
          };
          localStorage.set('printInfo', JSON.stringify(result));
          const { href } = this.$router.resolve({ path: 'printInvoices' });
          window.open(href, '_blank');
        }
      },
      // 移除 tag 操作
      closeTagHandler(item) {
        const { params } = this;
        switch(item.type) {
          case 'dateTime':
            this.dateTime = '';
            break;
          case 'amountWithTax':
            params['amountWithTaxMin'] = '';
            params['amountWithTaxMax'] = '';
            break;
          case 'paperDrewDate':
            params['paperDrewDateStart'] = '';
            params['paperDrewDateEnd'] = '';
            break;
          case 'processTime':
            params['processTimeStart'] = '';
            params['processTimeEnd'] = '';
            break;
          case 'invoiceTypes':
            params[item.type] = [];
            break;
          default:
            params[item.type] = '';
            break;
        }
        const index = this.addExtendFilters.findIndex(res => res === item);
        if (index !== -1) this.addExtendFilters.splice(index, 1);
        bus.$emit('removeExtend', item.type);
        this.searchFetch();
      },
      // 扩展筛选条件
      extendHandler() {
        this.extendFilters = !this.extendFilters;
      },
      // 筛选
      submitHandler(val) {
        const { params } = this;
        if (!val.length) {
          params.amountWithTaxMin = '';
          params.amountWithTaxMax = '';
          params.paperDrewDateStart = '';
          params.paperDrewDateEnd = '';
          params.processTimeStart = '';
          params.processTimeEnd = '';
          params.invoiceTypes = [];
          params.invoiceCode = '';
          params.invoiceNo = '';
        }
        this.addExtendFilters = val.map(item => {
          switch (item.type) {
            case 'amountWithTax':
              params['amountWithTaxMin'] = item.value[0];
              params['amountWithTaxMax'] = item.value[1];
              break
            case 'paperDrewDate':
              params['paperDrewDateStart'] = item.value[0];
              params['paperDrewDateEnd'] = item.value[1];
              break;
            case 'processTime':
              params['processTimeStart'] = item.value[0];
              params['processTimeEnd'] = item.value[1];
              break;
            default:
              params[item.type] = item.value;
              break;
          }
          return {
            type: item.type,
            label: item.label
          };
        });

        this.searchFetch();
      }
    }
  }
</script>
<style lang="scss">
  .invoices {
    &-header {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border-bottom: 1px solid #dfdfdf;
    }
    .header-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #5a5b5d;
      img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
      h1 {
        display: inline-block;
      }
    }
    .header-search {
      .el-col {
        +.el-col {
          margin-left: 20px;
        }
      }
    }
    .el-date-editor--daterange.el-input__inner {
      width: auto;
    }
    .tag-tips {
      padding: 10px 20px 0 20px;
      border-bottom: 1px solid #dfdfdf;
      .el-tag {
        margin-bottom: 10px;
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
    .el-tabs__item {
      text-align: center;
      width: 150px;
    }
    &-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 20px 0 40px;
      background-color: rgba(90, 91, 93, .75);
      z-index: 101;
      font-size: 14px;
      color: #fff;
      .el-checkbox,
      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #fff;
      }
    }
    .checked-count {
      text-align: right;
    }
    .checked-total {
      display: flex;
      justify-content: space-around;
      font-size: 0;
      span {
        font-size: 14px;
        display: inline-block;
        width: 50%;
        text-align: center;
      }
    }
    .invoices-list {
      img {
        width: 24px;
        height: 100%;
      }
      thead .el-checkbox {
        display: none;
      }
      th>.cell {
        font-weight: bold;
      }
    }
    .see-detail {
      color: #0e91ee;
      &:hover {
        cursor: pointer;
      }
    }
    .all-checked {
      position: relative;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
