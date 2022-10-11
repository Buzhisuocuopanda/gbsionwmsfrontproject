<template>
  <!--销售分析-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >

        <el-form-item label="经销商"  class="item-r" label-width="80px">
          <el-select v-model="queryParams.customerId"  style="margin-left: 20px;width: 300px" clearable filterable placeholder="请输入关键词" :loading="loading2">
            <el-option v-for="item in cbcaList" :key="item.cbca01" :label="item.cbca08" :value="item.cbca01"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商" style="margin-left: 50px" class="item-r" label-width="80px">
          <el-select v-model="queryParams.supplierId"  style="margin-left: 20px;width: 300px" clearable filterable placeholder="请输入关键词" :loading="loading6">
            <el-option v-for="item in cbsaList" :key="item.cbsa01" :label="item.cbsa08" :value="item.cbsa01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="日期"  class="item-r" style="margin-left: 50px" >
          <el-date-picker size="mini" v-model="dateRange"  type="daterange"
                          style="height: 35px;width: 500px;margin-left: 20px"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="品牌"   class="item-r" label-width="80px">
          <el-select v-model="queryParams.brand" style="width: 300px;margin-left: 20px" clearable filterable placeholder="请输入关键词" :loading="loading3">
            <el-option v-for="item in calaList" :key="item.cala01" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala01"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="型号"  class="item-r" style="margin-left: 50px" label-width="80px">
          <el-input v-model="queryParams.model" style="margin-left: 20px;width: 300px" class="filter-item"  placeholder="型号" />

        </el-form-item>
       <!-- <el-form-item label="销售人员" style="margin-left: 20px"  class="item-r" >
          <el-select v-model="queryParams.saleUserId"  style="width: 300px" clearable filterable placeholder="请输入关键词" :loading="loading4">
            <el-option v-for="item in cauaList" :key="item.caua17" :label="item.caua17" :value="item.caua17"></el-option>
          </el-select>
        </el-form-item>-->


        <el-form-item style="margin: 1px -10px 1px 300px">
          <el-button v-hasPermi="['query:salesAnalysis:list']" class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['query:salesAnalysis:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['query:salesAnalysis:export']" type="primary" v-on:click="exprotData()"   style="margin-bottom:0;margin-left: 1em" >导出</el-button>
        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"
                 border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column label="客户名称" align="center" header-align="center" prop="customerName" min-width="160px;" />
        <el-table-column  label="下单时间" align="center" prop="createTime" :formatter="formatTime2" min-width="120px;"/>
        <el-table-column  label="供应商" align="center" prop="supplier" min-width="180px;">
          <template slot-scope="scope">
            <div>{{sliceString(scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="销售人员" align="center" prop="saleUser"  min-width="160px;"/>
        <el-table-column  label="销售订单号" align="center" prop="saleOrderNo" min-width="120px;"/>
        <el-table-column  label="型号" align="center" prop="model" min-width="160px;"/>
        <el-table-column  label="品牌" align="center" prop="brandName" min-width="100px;"/>
        <el-table-column  label="数量" align="center" prop="qty" min-width="80px;"/>
        <el-table-column  label="金额" align="center" prop="price" min-width="100px;"/>
        <el-table-column  label="成本" align="center" prop="cost" min-width="100px;"/>

      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[10, 15, 20, 50, 500]"
        :total="total"
        :current-page.sync="queryParams.pageNum"
        :page-size.sync="queryParams.pageSize"
        style="padding-top:40px; padding-left: 20px;float: right"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="onSearch"/>

    </div>
  </div>
</template>
<script>

import { getSalesAnalysisList,getswJsAllList,getsalermanAllList,getSwJsCustomerAllList,getSwJsSupplierlistAll } from "@/api/statisticAnalysis/index";
import {formatDate2} from "../../../utils";
//
// import { formatDate } from '../../../utils';
export default {
  name: "salesAnalysis",
  data() {
    return {
      //下拉列表数据品牌
      calaList:[],
      //下拉列表数据销售人员
      cauaList:[],
      //下拉列表数据客户
      cbcaList:[],
      //下拉列表数据供应商
      cbsaList:[],
      //下拉列表数据商品类型
      modelList:[],
      dateRange:[],

      loading:false,
      loading2:false,
      loading3:false,
      loading4:false,
      loading5:false,
      loading6:false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        // total: this.total,
        customerId: "",
        supplierId:"",
        model:"",
        brand:"",
        saleUserId:"",
        startTime:"",
        endTime:"",

      },
      inwuquList: [],
      total:0,

      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, start]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            let day = start.getDay();
            let date = start.getDate();
            if (day != 0) {
              start.setDate(date - (day - 1));
            }
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上周',
          onClick(picker) {
            var oDate = new Date()
            oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7);
            let day = oDate.getDay()
            let start = new Date(),
              end = new Date();
            if (day == 0) {
              start.setDate(oDate.getDate());
              end.setDate(oDate.getDate() + 6);
            } else {
              start.setTime(oDate.getTime() - 3600 * 1000 * 24 * (day - 1));
              end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (7 - day));
            }
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setDate(1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上月',
          onClick(picker) {
            var oDate = new Date()
            let year = oDate.getFullYear();
            let month = oDate.getMonth();
            let start, end;
            if (month == 0) {
              year--
              start = new Date(year, 11, 1)
              end = new Date(year, 11, 31)
            } else {
              start = new Date(year, month - 1, 1)
              end = new Date(year, month, 0);
            }
            picker.$emit('pick', [start, end]);
          }
        },
          {
            text: '本季度',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上季度',
            onClick(picker) {
              var oDate = new Date()
              let year = oDate.getFullYear();
              let month = oDate.getMonth() + 1;
              let n = Math.ceil(month / 3); // 季度，上一个季度则-1
              let prevN = n - 1;
              if (n == 1) {
                year--
                prevN = 4;
              }
              month = prevN * 3; // 月份
              const start = new Date(year, month - 3, 1);
              const end = new Date(year, month, 0);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '本年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(0);
              start.setDate(1);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch();
    this.getCalaList();
    // this.getCauaList();
    this.getCbcaList();
    this.getModelList();
    this.getCbsaList();
  },
  methods: {
    sliceString(row){
      if(row.supplier!=null&&row.supplier.length>2){
        return row.supplier.slice(0,row.supplier.length-1);
      }else {
        return "";
      }


    },

    formatTime2(row){
      return formatDate2(row.createTime);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.customerId = "";
      this.queryParams.supplierId = "";
      this.queryParams.model = "";
      this.queryParams.brand = "";
      this.queryParams.saleUserId = "";
      this.queryParams.pageNum = 1;
      this.dateRange = [];
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
      this.download('/query/salesAnalysisExcelList', {
        ...this.queryParams
      }, `销售分析数据_${new Date().getTime()}.xlsx`)
    },

    onSearch() {
      if(this.dateRange!=null&&this.dateRange.length>=2){
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }else {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      this.loading = true;
      getSalesAnalysisList(this.queryParams).then(response => {
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
    //下拉列表数据品牌
    getCalaList(){
      let param={cala10:"商品品牌"};
      this.loading2 = true;
      getswJsAllList(param).then(response => {
        this.loading2 = false;
        if (response.data != null) {
          this.calaList = response.data;
        } else {
          this.calaList = [];
        }
      },error => {
        this.loading2 = false;
      });
    },
    //下拉列表数据商品类型
    getModelList(){
      let param={cala10:"商品类型"};
      this.loading5 = true;
      getswJsAllList(param).then(response => {
        this.loading5 = false;
        if (response.data != null) {
          this.modelList = response.data;
        } else {
          this.modelList = [];
        }
      },error => {
        this.loading5 = false;
      });
    },
    //下拉列表数据销售人员
    getCauaList(){
      let param={};
      this.loading4 = true;
      getsalermanAllList(param).then(response => {
        this.loading4 = false;
        if (response.data != null) {
          this.cauaList = response.data;
        } else {
          this.cauaList = [];
        }
      },error => {
        this.loading4 = false;
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
    //下拉列表数据供应商
    getCbsaList(){
      let param={};
      this.loading6 = true;
      getSwJsSupplierlistAll(param).then(response => {
        this.loading6 = false;
        if (response.data != null) {
          this.cbsaList = response.data;
        } else {
          this.cbsaList = [];
        }
      },error => {
        this.loading6 = false;
      });
    },

  },
};
</script>

<style lang="" scoped>

</style>
