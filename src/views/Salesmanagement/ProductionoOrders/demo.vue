<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="formData" label-width="80px" inline>
        <el-form-item label="订单号">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="20">
      <el-button type="primary">创建</el-button>
      <el-button type="success">导入</el-button>
      <el-button type="warning">导出</el-button>
      <el-button type="danger">删除</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="优先级" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="订单号" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="型号" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="描述" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="订单数量" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="生产数量" width="120" sortable>
      </el-table-column>
      <el-table-column
        prop="address"
        label="已发货数量"
        sortable
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="address"
        label="已占用数量"
        show-overflow-tooltip
        sortable
      ></el-table-column>
      <el-table-column
        prop="address"
        label="现有订单数量"
        show-overflow-tooltip
        sortable
      ></el-table-column>
      <el-table-column
        prop="address"
        label="类型"
        show-overflow-tooltip
        sortable
      ></el-table-column>
      <el-table-column
        prop="address"
        label="状态"
        show-overflow-tooltip
        sortable
      ></el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button size="mini">修改</el-button>
          <el-button size="mini" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import x from ''
export default {
  components: {},
  data() {
    return {
      formData: {
        name: "",
      },
      tableData: [],
    };
  },
  computed: {},
  methods: {
    onSubmit() {},
    handleSelectionChange() {},
  },
};
</script>

<style lang="" scoped></style>
