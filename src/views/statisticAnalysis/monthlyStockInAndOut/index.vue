<template>
  <!--zgl-->
  <!--月度出入库统计查询-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" >
        <el-form-item label="SKU"  style="margin-left: 10px"  class="item-r" >
          <el-input v-model="queryParams.cbpb12" style="margin-left: 10px;" class="filter-item"  placeholder="请输入SKU" />
        </el-form-item>
        <el-form-item label="仓库"  style="margin-left: 20px"  class="item-r" >
          <el-select style="margin-left: 10px" v-model="queryParams.cbib02" clearable filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading3">
            <el-option v-for="item in storeSkuList" :key="item.cbwa01" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份"  style="margin-left: 20px"  >
          <SelectMonth ref="child" @selected="getmonthlys" @resetBtn="clearMonth"></SelectMonth>

        </el-form-item>

        <el-form-item style="margin: 0px -10px 1px 1px;">
          <el-button v-hasPermi="['query:fnSynthesis:list']" class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['query:fnSynthesis:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['query:fnSynthesis:export']" class="filter-item" type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
        </el-form-item>
      </el-form>
      <el-table  :header-cell-style="headClasspwfnsyns" :data="inwuquList" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" element-loading-text="Loading。。。" width="100%;" height="430" v-loading="loading"
                 border fit highlight-current-row stripe >

        <el-table-column  label="月份" prop="yearAndMonth" min-width="180px;"/>
        <el-table-column  label="仓库" prop="winName" min-width="180px;"/>
        <el-table-column  label="SKU"  prop="cbpb12" min-width="150px;"/>
        <el-table-column  label="商品"  prop="goodsName" min-width="300px;"/>
        <el-table-column  label="入库数量"  :formatter="rounding" align="right" prop="inCount" min-width="60px;"/>
        <el-table-column  label="出库数量"  :formatter="rounding" align="right" prop="outCount" min-width="60px;"/>
        <el-table-column  label="产出差"  :formatter="rounding2" align="right"  min-width="60px;">

        </el-table-column>
      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[10, 15, 20, 50, 500]"
        :total="total"
        :current-page.sync="queryParams.pageNum"
        :page-size.sync="queryParams.pageSize"
        style="padding-top:20px; padding-left: 20px;float: right"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="onSearch"/>

    </div>
  </div>
</template>
<script>
// import x from ''
// import { totalOrderList } from "@/api/saleordermanage";
import { monthlyStockInAndOut,getSwJsStoreSkuAllList,getSwJsCustomerAllList } from "@/api/statisticAnalysis/index";

import SelectMonth from "@/components/SelectMonth"

// import { formatDate } from '../../../utils';
export default {
  name: "MonthlyStockInAndOut",
  components:{SelectMonth},
  data() {
    return {
      //下拉列表数据仓库
      storeSkuList:[],
      //下拉列表数据客户
      cbcaList:[],
      dateRange:[],

      loading:false,
      loading2:false,
      loading3:false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        cbib02:"",
        cbpb12:"",
        monthlys:undefined,
      },
      value5:[],
      inwuquList: [],
      total:0,

    };
  },
  computed: {},
  mounted() {

    // 自动触发写入的函数
    this.onSearch();
    this.getStoreSkuList();
    this.getCbcaList();
  },
  methods: {
    getmonthlys(value){
      console.log(value,'month')
      this.queryParams.monthlys = value;
    },
    clearMonth(){
      this.queryParams.monthlys =undefined;
    },

    rounding(row, column) {
      if(parseFloat(row[column.property]).toFixed(2)==null||isNaN(parseFloat(row[column.property]).toFixed(2))){
        return '0.00';
      }
      return parseFloat(row[column.property]).toFixed(2)
    },
    rounding2(row,column) {
      if(row.inCount == null||row.outCount == null){
        let i,o;
        if(row.inCount =null){
          i=0;
        }else {
          i =row.inCount;
        }
        if(row.outCount =null){
          o=0;
        }else {
          o=row.outCount;
        }
        return parseFloat(i-o).toFixed(2)
      }else {
        return parseFloat(row.inCount - row.outCount).toFixed(2)
      }

    },
    rounding3(row, column) {
      if(parseFloat(row[column.property]).toFixed(2)==null||isNaN(parseFloat(row[column.property]).toFixed(2))){
        return "";
      }
      return parseFloat(row[column.property]).toFixed(2)
    },
    //列表表头设置
    headClasspwfnsyns() {
      return {
        'text-align': 'left',
        height: '40px',
        padding: '0'
      }
    },


    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbib02 = "";
      this.queryParams.cbpb12 = "";
      // this.queryParams.customerId = "";
      this.dateRange = [];
      this.queryParams.monthlys = undefined;
      this.$refs.child.resetMonth();
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
    //导出
    exprotData(){
      this.download('/query/monthlyStockInAndOutExcel', {
        ...this.queryParams
      }, `月度出入库统计数据_${new Date().getTime()}.xlsx`)
    },
    onSearch() {
      /*if(this.dateRange==null){
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }else {
        if(this.dateRange.length>=2){
          this.queryParams.startTime = this.dateRange[0];
          this.queryParams.endTime = this.dateRange[1];
        }else {
          this.queryParams.startTime = undefined;
          this.queryParams.endTime = undefined;
        }
      }*/
      this.loading = true;
      monthlyStockInAndOut(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.inwuquList = response.data.rows
          this.total = response.data.total
        } else {
     /*     this.deviceList = []*/
          this.total = 0
        }
      },error => {
        this.loading = false;
      })
    },
    //下拉列表数据仓库
    getStoreSkuList(query){
      let param={cbwa09:query};
      this.loading3 = true;
      getSwJsStoreSkuAllList(param).then(response => {
        this.loading3 = false;
        if (response.data != null) {
          this.storeSkuList = response.data;
        } else {
          this.storeSkuList = [];
        }
      },error => {
        this.loading3 = false;
      });
    },
    //下拉列表数据客户
    getCbcaList(){
      let param={};
      this.loading2 = true;
      getSwJsCustomerAllList(param).then(response => {
        this.loading2 = false;
        if (response.data != null) {
          this.cbcaList = response.data;
        } else {
          this.cbcaList = [];
        }
      },error => {
        this.loading2 = false;
      });
    },

  },
};
</script>

<style lang="" scoped>

</style>
