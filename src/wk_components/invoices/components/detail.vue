<template>
  <el-dialog
    title="详细信息"
    :visible="visible"
    width="70%"
    class="invoice-details"
    @update:visible="$emit('update:visible', $event)">
    <div v-if="data.invoiceMain">
      <div class="invoice-details-images">
        <div ref="showImg" class="images" v-if="invoiceMain.imgUrl">
          <img :src="invoiceMain.imgUrl">
        </div>
        <div v-else class="tips">
          <i class="el-icon-warning"></i>
          <span>扫码上传的发票无影像</span>
        </div>
      </div>
      <div class="invoice-details-info">
        <div class="info-title">
          基础信息
          <img src="~images/success.png" alt="">
        </div>
        <el-row>
          <el-col :span="8">
            <ul class="base-info">
              <li>
                <label>发票类型：</label>
                <div v-text="invoiceTypes[invoiceMain.invoiceType]"></div>
              </li>
              <li>
                <label>发票号码：</label>
                <div v-text="invoiceMain.invoiceNo"></div>
              </li>
              <li>
                <label>发票代码：</label>
                <div v-text="invoiceMain.invoiceCode"></div>
              </li>
              <li>
                <label>机器编码：</label>
                <div v-text="invoiceMain.machineCode"></div>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="base-info">
              <li>
                <label>不含税金额：</label>
                <div v-text="`¥${invoiceMain.amountWithoutTaxStr}`"></div>
              </li>
              <li>
                <label>含税金额：</label>
                <div v-text="`¥${invoiceMain.amountWithTaxStr}`"></div>
              </li>
              <li>
                <label>税额：</label>
                <div v-text="`¥${invoiceMain.taxAmountStr}`"></div>
              </li>
              <li>
                <label>校验码：</label>
                <div v-text="invoiceMain.checkCode"></div>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="base-info">
              <li>
                <label>开票日期：</label>
                <div v-text="invoiceMain.paperDrewDate"></div>
              </li>
              <li>
                <label>密文：</label>
                <div>
                  <span v-if="!invoiceMain.cipherText">----</span>
                  <template v-else>
                    <el-tooltip style="width: 200px" placement="bottom" effect="light">
                      <div slot="content" style="width: 200px" v-text="invoiceMain.cipherText"></div>
                      <span>****</span>
                    </el-tooltip>
                  </template>
                </div>
              </li>
              <li>
                <label>备注：</label>
                <div></div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div class="invoice-details-info">
        <div class="info-title">
          购方信息
        </div>
        <el-row>
          <el-col :span="8">
            <ul class="base-info">
              <li>
                <label>购方名称：</label>
                <div v-text="invoiceMain.purchaserName"></div>
              </li>
              <li>
                <label>购方税号：</label>
                <div v-text="invoiceMain.purchaserTaxNo"></div>
              </li>
              <!-- <li>
                <label>购方代码：</label>
                <div></div>
              </li> -->
            </ul>
          </el-col>
          <el-col :span="16">
            <ul class="base-info">
              <li>
                <label>购方地址/电话：</label>
                <div v-text="`${invoiceMain.purchaserAddress}   ${invoiceMain.purchaserTel}`"></div>
              </li>
              <li>
                <label>购方银行名称/账号：</label>
                <div v-text="`${invoiceMain.purchaserBankName}   ${invoiceMain.purchaserBankAccount}`"></div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div class="invoice-details-info">
        <div class="info-title">
          销方信息
        </div>
        <el-row>
          <el-col :span="8">
            <ul class="base-info">
              <li>
                <label>销方名称：</label>
                <div v-text="invoiceMain.sellerName"></div>
              </li>
              <li>
                <label>销方税号：</label>
                <div v-text="invoiceMain.sellerTaxNo"></div>
              </li>
            </ul>
          </el-col>
          <el-col :span="16">
            <ul class="base-info">
              <li>
                <label>销方地址/电话：</label>
                <div v-text="`${invoiceMain.sellerAddress}   ${invoiceMain.sellerTel}`"></div>
              </li>
              <li>
                <label>销方银行名称/账号：</label>
                <div v-text="`${invoiceMain.sellerBankName}   ${invoiceMain.sellerBankAccount}`"></div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div class="invoice-details-info">
        <div class="info-title" v-text="`明细：${invoiceDetails.length} 条`"></div>
        <el-table
          :data="invoiceDetails"
          stripe
          style="width: 100%">
          <el-table-column
            prop="cargoName"
            label="货物及服务名称">
          </el-table-column>
          <el-table-column
            prop="itemSpec"
            label="规格型号">
          </el-table-column>
          <el-table-column
            prop="quantityUnit"
            width="80"
            align="center"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="quantity"
            width="80"
            align="right"
            label="数量">
          </el-table-column>
          <el-table-column
            width="80"
            align="right"
            label="单价">
            <template slot-scope="scope"><span v-text="scope.row.uniPrice ? `¥ ${scope.row.uniPrice}` : '--'"></span></template>
          </el-table-column>
          <el-table-column
            width="100"
            align="right"
            label="含税金额">
            <template slot-scope="scope"><span v-text="`¥ ${scope.row.amountWithTax}`"></span></template>
          </el-table-column>
          <el-table-column
            width="80"
            align="right"
            label="税率">
            <template slot-scope="scope"><span v-text="`${scope.row.taxRate}%`"></span></template>
          </el-table-column>
          <el-table-column
            width="100"
            align="right"
            label="税额">
            <template slot-scope="scope"><span v-text="`¥ ${scope.row.taxAmount}`"></span></template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import Viewer from 'viewerjs'
  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    computed: {
      invoiceMain() {
        if (this.data.invoiceMain.imgUrl) {
          setTimeout(() => {
            this.initViewer();
          }, 0);
        }
        return this.data.invoiceMain;
      },
      invoiceDetails() {
        return this.data.invoiceDetails;
      }
    },
    data () {
      return {
        invoiceTypes: {
          s: '增值税专用发票',
          c: '增值税普通发票',
          ce: '增值税电子普通发票'
        }
      };
    },
    methods: {
      initViewer () {
        var viewbox = this.$refs.showImg;
        var viewer = new Viewer(viewbox, {
          url: 'data-original',
          toolbar: {
            inline: false,
            oneToOne: false,
            container: viewbox,
            zoomIn: 1,
            zoomOut: 1,
            reset: 4,
            rotateLeft: 4,
            rotateRight: 4
          },
        });
      }
    }
  }
</script>
<style lang="scss">
  .invoice-details {
    .el-dialog__body {
      max-height: 500px;
      overflow-y: auto;
    }
    &-images {
      .images {
        height: 370px;
        text-align: center;
      }
      img {
        height: 100%;
        vertical-align: middle;
      }
      .tips {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 16px;
      }
      span {
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .el-icon-warning {
      color: #ffa60c;
      font-size: 30px;
    }
    &-info {
      margin: 10px 0;
      padding: 10px 0;
      &:not(:last-child) {
        border-bottom: 1px solid #dfdfdf;
      }
    }
    .info-title {
      display: flex;
      align-items: center;
      color: #5a5b5d;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 5px;
      &::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        border: 5px solid #dfdfdf;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 5px;
      }
      img {
        margin-left: 10px;
        width: 60px;
        height: 100%;
      }
    }
    .base-info {
      color: #5a5b5d;
      font-size: 12px;
      li {
        display: flex;
        align-items: center;
      }
      label,
      div {
        display: inline-block;
      }

      span {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
