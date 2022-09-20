<!-- 缺货登记 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="商品分类">
        <el-select v-model="queryParams.cbpa07"  style="width: 300px"  filterable placeholder="请输入关键词" :loading="loading3">
          <el-option v-for="item in cbpaList" :key="item.cbpa07" :label="item.cbpa07+' ['+item.cbpa11+']'" :value="item.cbpa07"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="queryParams.cala08"  style="width: 300px"  filterable placeholder="请输入关键词" :loading="loading2">
          <el-option v-for="item in calaList" :key="item.cala08" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala08"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品">
        <el-select v-model="queryParams.cbpb01" style="width: 300px" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getGoods" :loading="loading1">
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cbpb08+item.cbwa12+item.cbpb15" :value="item.cbpb01"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
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
      <el-table-column prop="cbpa08" label="大类" align="center" sortable width="180"></el-table-column>
      <el-table-column prop="cbpa07" label="分类名称" align="center" sortable></el-table-column>
      <el-table-column prop="cala08" label="品牌" align="center" sortable></el-table-column>
      <el-table-column prop="cbpb12" label="型号" align="center" sortable></el-table-column>
      <el-table-column prop="cbpb15" label="UPC" align="center" sortable></el-table-column>
      <el-table-column prop="cbpb08" label="描述" align="center" width="240px" sortable></el-table-column>
      <el-table-column prop="cbof09" label="数量" align="center" sortable></el-table-column>
      <el-table-column prop="cbca08" label="客户" align="center" sortable></el-table-column>
      <el-table-column prop="cboe08" :formatter="formatTime" label="日期" align="center" sortable></el-table-column>
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
  import {formatDate2} from '../../../utils';
  import { getInvsentorsysummaryqueryList,getSwJsGoodsClassifyAllList,getswJsAllList,getSwJsGoodsAllList } from "@/api/statisticAnalysis/index";
  export default {
    name: "wantBooks",
    components: {},
    data() {
      return {
        //下拉列表数据商品分类
        cbpaList:[],
        //下拉列表数据品牌
        calaList:[],
        //下拉列表数据商品
        goodList:[],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          cbpa07:"",
          cala08:"",
          cbpb01:"",
        },
        tableData: [], // 表格数据
        loading:false,
        loading1:false,
        loading2:false,
        loading3:false,
        total:0,
      };
    },
    computed: {},
    mounted() { // 自动触发写入的函数
      this.onSearch();
      this.getCbpaList();
      this.getCalaList();
    },
    methods: {
      onSubmit() {},
      formatTime(row){
        return formatDate2(row.cboe08);
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.queryParams.cbpa07 = "";
        this.queryParams.cala08 = "";
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
      //下拉列表数据商品分类
      getCbpaList(){
        let param={};
        this.loading3 = true;
        getSwJsGoodsClassifyAllList(param).then(response => {
          this.loading3 = false;
          if (response.data != null) {
            this.cbpaList = response.data;
          } else {
            this.cbpaList = [];
          }
        });
      },
      //下拉列表数据品牌
      getCalaList(){
        let param={};
        this.loading2 = true;
        getswJsAllList(param).then(response => {
          this.loading2 = false;
          if (response.data != null) {
            this.calaList = response.data;
          } else {
            this.calaList = [];
          }
        });
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
          });
        } else {
          this.goodList = [];
        }
      },


    },
  };
</script>

<style lang="less" scoped></style>
