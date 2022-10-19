<template>
  <!--zgl-->
  <!--财务综合报表-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" >
        <el-form-item  label="日期" style="margin-left: 20px;">
          <el-date-picker size="mini" v-model="dateRange" type="daterange" style="margin-left: 10px;height: 35px"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="销售订单号"  style="margin-left: 10px"  class="item-r" >
          <el-input v-model="queryParams.saleOrderNo" style="margin-left: 10px;" class="filter-item"  placeholder="销售订单号" />
        </el-form-item>
        <el-form-item label="仓库"  style="margin-left: 20px"  class="item-r" >
          <el-select style="margin-left: 10px" v-model="queryParams.whId" clearable filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading3">
            <el-option v-for="item in storeSkuList" :key="item.cbwa01" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户" style="margin-left: 20px;margin-top: -10px"  class="item-r" >
          <el-select v-model="queryParams.customerId"  style="margin-left: 10px" clearable filterable placeholder="请输入关键词" :loading="loading2">
            <el-option v-for="item in cbcaList" :key="item.cbca01" :label="item.cbca08" :value="item.cbca01"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item style="margin: -10px -10px 1px 1px;">
          <el-button v-hasPermi="['query:fnSynthesis:list']" class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['query:fnSynthesis:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['query:fnSynthesis:export']" class="filter-item" type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
        </el-form-item>
      </el-form>
      <el-table  :header-cell-style="headClasspwfnsyns" :data="inwuquList" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" element-loading-text="Loading。。。" width="100%;" height="430" v-loading="loading"
                 border fit highlight-current-row stripe >
        <el-table-column fixed label="入库时间" align="left" :formatter="formatDate" header-align="center" prop="inWhTime" min-width="100px;" />
        <el-table-column fixed label="出库时间" align="left" prop="outWhTimeMsg"  min-width="100px;"/>
        <el-table-column fixed label="订单号" align="left" prop="orderNo" min-width="180px;"/>
        <el-table-column  label="生产总订单" align="left" prop="totalOrderNo" min-width="180px;"/>
        <el-table-column  label="型号" align="left" prop="model" min-width="150px;"/>
        <el-table-column  label="描述" align="left" prop="description" min-width="300px;"/>
        <el-table-column  label="数量" :formatter="rounding2" align="right" prop="qty" min-width="60px;"/>
        <el-table-column  label="序列号" align="left" prop="sn"  min-width="120px;"/>
        <el-table-column  label="销售单价U" :formatter="rounding3" align="right" prop="uprice" min-width="100px;">
          <!--<template slot-scope="scope">
            <div >{{RToU(scope.row.rprice )}}</div>
          </template>-->
        </el-table-column>
        <el-table-column  label="销售单价R" :formatter="rounding3" align="right" prop="rprice" min-width="100px;"/>
        <el-table-column  label="经销商品名称" align="left" prop="suplierName" min-width="220px;"/>
        <el-table-column  label="品牌" align="left" prop="brand" min-width="100px;"/>
        <el-table-column  label="工厂" align="left" prop="gc" min-width="100px;"/>
        <el-table-column  label="采购单价U" :formatter="rounding3" align="right" prop="cgUprice" min-width="110px;">
          <!--<template slot-scope="scope">
            <div >{{RToU(scope.row.cgRprice )}}</div>
          </template>-->
        </el-table-column>
        <el-table-column  label="采购单价R" align="right" :formatter="rounding3" prop="cgRprice" min-width="110px;"/>
        <!--<el-table-column  label="生产总订单号" align="center" prop="cbib16" min-width="100px;"/>-->
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
import { getfnSynthesisList,getSwJsStoreSkuAllList,getSwJsCustomerAllList } from "@/api/statisticAnalysis/index";
//
// import { formatDate } from '../../../utils';
export default {
  name: "FnSynthesis",
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
        // total: this.total,
        saleOrderNo: "",
        whId:"",
        customerId:"",
        startTime:"",
        endTime:"",

      },
      inwuquList: [],
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
  mounted() {

    // 自动触发写入的函数
    this.onSearch();
    this.getStoreSkuList();
    this.getCbcaList();
  },
  methods: {

    rounding(row, column) {
      if(parseFloat(row[column.property]).toFixed(2)==null||isNaN(parseFloat(row[column.property]).toFixed(2))){
        return '0.00';
      }
      return parseFloat(row[column.property]).toFixed(2)
    },
    rounding2() {

      return parseFloat("1").toFixed(2)
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

/*    onSubmit() {},*/
    /*handleSelectionChange() {},*/
   /* formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return "NO"
        } else if (row.status == 4) {
          return "OK"
        }
      }
    },*/
    RToU(num){
      if(num!=null){
        return num*141/1000;
      }else {
        return "";
      }

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.saleOrderNo = "";
      this.queryParams.whId = "";
      this.queryParams.customerId = "";
      this.dateRange = [];
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
      this.download('/query/fnSynthesisExcelList', {
        ...this.queryParams
      }, `财务综合报表查询数据_${new Date().getTime()}.xlsx`)
    },
    onSearch() {
      if(this.dateRange==null){
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
      }
      this.loading = true;
      getfnSynthesisList(this.queryParams).then(response => {
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
