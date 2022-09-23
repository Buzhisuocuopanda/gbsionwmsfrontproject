<!-- zgl -->
<!-- 生产总订单查询 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="订单号">
        <el-input type="text" style="width: 300px" v-model="queryParams.cbba07"></el-input>
      </el-form-item>
      <el-form-item label="商品">
        <el-select v-model="queryParams.cbpb01" style="width: 300px" clearable filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getGoods" :loading="loading1">
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cbpb08+item.cbwa12+item.cbpb15" :value="item.cbpb01"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.cbba12" clearable filterable remote reserve-keyword placeholder="请选择" >
          <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 200px" @click="handleQuery">查询</el-button>
        <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
        <el-button type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;margin-top:1em" border :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="序号" type="index" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="cbba07" label="订单号" sortable align="center" width="180"></el-table-column>
      <el-table-column prop="cala08" label="品牌" sortable align="center"></el-table-column>
      <el-table-column prop="cbpb12" label="型号" sortable align="center"></el-table-column>
      <el-table-column prop="cbpb08" label="描述" sortable width="260px" align="center"></el-table-column>
      <el-table-column prop="cbba09" label="订单数量" sortable align="center"></el-table-column>
      <el-table-column prop="cbba11" label="已发货数量" sortable align="center"></el-table-column>
      <el-table-column prop="cbba13" label="已生产数量" sortable align="center"></el-table-column>
      <!--<el-table-column  prop="cbba14" label="缺货数量"  sortable align="center">-->
        <!--<template slot-scope="scope">
          <div>{{scope.row.cbba09-scope.row.cbba13}}</div>
        </template>
      </el-table-column>-->
      <el-table-column prop="cbba12" label="状态" :formatter="formatStateType" sortable align="center"></el-table-column>
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
  import { getInvsensstorsysummaryqueryList,getSwJsGoodsAllList } from "@/api/statisticAnalysis/index";
export default {
  name: "productTotal",
  components: {},
  data() {
    return {
      //下拉列表数据商品
      goodList: [],
      loading: false,
      loading1: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cbba07: "",
        cbpb01:"",
        cbba12:"",
      },
      tableData: [], // 表格数据
      total:0,
      statusType: [
        {
          value: 0,
          label: 'NO',
        },
        {
          value: 4,
          label: 'OK',
        }
      ],
    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch()
  },
  methods: {
    onSubmit() {},
    formatStateType(row) {
          if (row != null) {
            if (row.cbba12 == 0) {
              return "NO"
            } else if (row.cbba12 == 4) {
              return "OK"
            }
          }
        },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbpa07 = "";
      this.queryParams.cbba12 = "";
      this.queryParams.cbpb01 = "";
      this.queryParams.pageNum = 1;
      // this.resetForm("queryParams");
      this.onSearch();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // var neirong = $('#miaoshu').val();
      this.queryParams.pageNum = 1;
      this.onSearch();
    },
    onSearch() {
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
      },error => {
        this.loading = false;
      })
    },
    //导出
    exprotData(){
      // this.loading=true;
      this.download('/countQuery/InvsensstorsysummaryqueryExcelList', {
        ...this.queryParams
      }, `生产总订单查询数据_${new Date().getTime()}.xlsx`)
    },
    //获取下拉列表数据商品
    getGoods(query){
      if (query !== '') {
        let param={cbpb08:query, cbpb15:query, cbpb12:query,};
        this.loading1 = true;
        getSwJsGoodsAllList(param).then(response => {
          this.loading1 = false;
          if (response.data != null) {
            this.goodList = response.data;
          } else {
            this.goodList = [];
          }
        },error => {
          this.loading1 = false;
        });
      } else {
        this.goodList = [];
      }
    },

  },
};
</script>

<style lang="less" scoped></style>
