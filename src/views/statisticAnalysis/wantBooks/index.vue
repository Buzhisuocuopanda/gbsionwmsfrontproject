<!-- 缺货登记 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="商品分类">
        <el-input type="text" v-model="queryParams.cbpa07"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input type="text" v-model="queryParams.cala08"></el-input>
      </el-form-item>
      <el-form-item label="商品id">
        <el-input type="text" v-model="queryParams.cbpb01"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
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
      <el-table-column prop="date" label="序号" type="index" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="cbpa08" label="大类" sortable width="180"></el-table-column>
      <el-table-column prop="cbpa07" label="分类名称" sortable></el-table-column>
      <el-table-column prop="cala08" label="品牌" sortable></el-table-column>
      <el-table-column prop="cbpb12" label="型号" sortable></el-table-column>
      <el-table-column prop="address" label="UPC" sortable></el-table-column>
      <el-table-column prop="cbpb15" label="描述" sortable></el-table-column>
      <el-table-column prop="cbof09" label="数量" sortable></el-table-column>
      <el-table-column prop="cbca08" label="客户" sortable></el-table-column>
      <el-table-column prop="cboe08" label="日期" sortable></el-table-column>
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
  import { getInvsentorsysummaryqueryList } from "@/api/statisticAnalysis/index";
  export default {
    name: "wantBooks",
    components: {},
    data() {
      return {
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          cbpa07: "",
          cala08:"",
          cbpb01:"",
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
        getInvsentorsysummaryqueryList(this.queryParams).then(response => {
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
