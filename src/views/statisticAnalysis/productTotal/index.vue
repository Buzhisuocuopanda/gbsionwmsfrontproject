<!-- 缺货登记 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="formData" label-width="80px" inline>
      <el-form-item label="商品分类">
        <el-input type="text" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input type="text" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item label="商品">
        <el-input type="text" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="序号"
        sortable
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="name" label="大类" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="分类名称"
        sortable
      ></el-table-column>
      <el-table-column prop="address" label="品牌" sortable></el-table-column>
      <el-table-column prop="address" label="型号" sortable></el-table-column>
      <el-table-column prop="address" label="UPC" sortable></el-table-column>
      <el-table-column prop="address" label="描述" sortable></el-table-column>
      <el-table-column prop="address" label="数量" sortable></el-table-column>
      <el-table-column prop="address" label="客户" sortable></el-table-column>
      <el-table-column prop="address" label="日期" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      formData: {
        name: "",
      },
      tableData: [], // 表格数据
    };
  },
  computed: {},
  methods: {
    onSubmit() {},
  },
};
</script>

<style lang="less" scoped></style>
