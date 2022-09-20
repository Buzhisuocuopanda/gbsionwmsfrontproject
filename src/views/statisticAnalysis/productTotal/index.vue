<!-- 缺货登记 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="订单号">
        <el-input type="text" v-model="queryParams.cbba07"></el-input>
      </el-form-item>
      <el-form-item label="商品">
        <el-input type="text" v-model="queryParams.cbpb01"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input type="text" v-model="queryParams.cbba12"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="序号" type="index" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="cbba07" label="订单号" sortable width="180"></el-table-column>
      <el-table-column prop="cala08" label="品牌" sortable></el-table-column>
      <el-table-column prop="cbpb12" label="型号" sortable></el-table-column>
      <el-table-column prop="cbpb08" label="描述" sortable></el-table-column>
      <el-table-column prop="cbba09" label="订单数量" sortable></el-table-column>
      <el-table-column prop="cbba11" label="已发货数量" sortable></el-table-column>
      <el-table-column prop="cbba13" label="已生产数量" sortable></el-table-column>
      <el-table-column prop="cbof09" label="缺货数量" sortable></el-table-column>
      <el-table-column prop="cbba12" label="状态" sortable></el-table-column>
    </el-table>
    <el-pagination
      :background="true"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      :current-page.sync="queryParams.pageNum"
      :page-size.sync="queryParams.pageSize"
      style="padding-top:40px; padding-left: 20px;float: right"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="onSearch"
      @current-change="onSearch"/>
  </div>
</template>

<script>
  import { getInvsensstorsysummaryqueryList } from "@/api/statisticAnalysis/index";
export default {
  name: "productTotal",
  components: {},
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cbba07: "",
        cbpb01:"",
        cbba12:"",
      },
      tableData: [], // 表格数据
      total:0,
    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch()
  },
  methods: {
    onSubmit() {},

    onSearch() {
      /*this.queryParams.brandId = this.brandId;
      this.queryParams.whId = this.whId;
      if(this.dateRange.length>=2){
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }*/

      this.loading = true;
      getInvsensstorsysummaryqueryList(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.tableData = response.data.rows
          this.total = response.data.total
        } else {
          /*     this.deviceList = []*/
          this.total = 0
        }
      })
    },
  },
};
</script>

<style lang="less" scoped></style>
