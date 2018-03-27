<template>
  <div class="xforce-select">
    <label v-if="label" class="xforce-select--label">{{ label }}</label>
    <div class="xforce-select--items">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedList">
        <el-checkbox v-for="(item, index) in labelList" :label="item" :key="index">{{ item }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: Array,
      label: String,
      data: Array
    },
    data() {
      return {
        checkAll: false,
        checkedList: []
      };
    },
    created() {
      this.checkedList = this.value[0] === '全部' ? this.labelList : this.value;
      bus.$on('resetInvoiceTypes', () => {
        this.checkedList = [];
      });
    },
    computed: {
      labelList() {
        return this.data.map(item => item.name);
      },
      valueList() {
        return this.data.map(item => item.value);
      }
    },
    watch: {
      checkedList(val) {
        const isEqual = val.length === this.labelList.length;
        this.checkAll = isEqual;
        this.$emit('input', isEqual ? ['全部'] : val);
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedList = val ? this.labelList : [];
      }
    }
  }
</script>
<style lang="scss">
  .xforce-select {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #5a5b5d;
    height: 40px;
    &--label {
      width: 80px;
    }
    &--items {
      flex: 1;
      display: flex;
      align-items: center;
      font-weight: bold;
      .el-checkbox-group {
        display: flex;
        margin-left: 30px;
      }
    }
  }
</style>
