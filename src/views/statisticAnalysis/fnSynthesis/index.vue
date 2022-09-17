<template>
  <!--财务综合报表-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >
        <el-form-item label="销售订单号"   class="item-r" >
          <el-input v-model="saleOrderNo" class="filter-item"  placeholder="销售订单号" />
        </el-form-item>
        <el-form-item label="仓库"   class="item-r" >
          <el-input v-model="whId" class="filter-item"  placeholder="仓库" />
        </el-form-item><el-form-item label="客户"   class="item-r" >
        <el-input v-model="customerName" class="filter-item"  placeholder="客户" />
      </el-form-item>

        <el-form-item  label="日期">
          <el-date-picker size="mini" v-model="dateRange" type="daterange"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
         <!-- <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>-->
        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"   border fit highlight-current-row stripe >
        <el-table-column label="入库时间" align="center" header-align="center" prop="inWhTimeMsg" min-width="100px;" />
        <el-table-column  label="出库时间" align="center" prop="outWhTimeMsg"  min-width="100px;"/>
        <el-table-column  label="订单号" align="center" prop="orderNo" min-width="180px;"/>
        <el-table-column  label="型号" align="center" prop="model" min-width="120px;"/>
        <el-table-column  label="描述" align="center" prop="description" min-width="290px;"/>
        <el-table-column  label="数量" align="center" prop="qty" min-width="60px;"/>
        <el-table-column  label="序列号" align="center" prop="sn"  min-width="160px;"/>
        <el-table-column  label="销售单价U" align="center" prop="uPrice" min-width="100px;"/>
        <el-table-column  label="销售单价R" align="center" prop="rPrice" min-width="100px;"/>
        <el-table-column  label="经销商品名称" align="center" prop="suplierName" min-width="200px;"/>
        <el-table-column  label="品牌" align="center" prop="brand" min-width="100px;"/>
        <el-table-column  label="工厂" align="center" prop="gc" min-width="100px;"/>
        <el-table-column  label="采购单价U" align="center" prop="cgUprice" min-width="60px;"/>
        <el-table-column  label="采购单价R" align="center" prop="cgRprice" min-width="60px;"/>
        <!--<el-table-column  label="生产总订单号" align="center" prop="cbib16" min-width="100px;"/>-->
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
  </div>
</template>
<script>
// import x from ''
// import { totalOrderList } from "@/api/saleordermanage";
import { getfnSynthesisList } from "@/api/statisticAnalysis/index";
//
// import { formatDate } from '../../../utils';
export default {
  name: "fnSynthesis",
  data() {
    return {
      saleOrderNo:"",
      whId:"",
      customerName:"",
      /*formData: {
        name: "",
      },*/
      dateRange:[],
     /* tableData: [],*/
      /*loadingOut:false,*/
  /*    loadingState:false,*/
      loading:false,
      /*queryForm:{},*/
      /*listQuery: {
        pageNum: 1,
        pageSize: 10
      },*/
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // total: this.total,
        saleOrderNo: "",
        whId:"",
        customerName:"",
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
  mounted() { // 自动触发写入的函数
    this.onSearch()
  },
  methods: {
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
    /** 重置按钮操作 */
    resetQuery() {
      this.saleOrderNo = "";
      this.whId = "";
      this.customerName = "";

      this.queryParams.pageNum = 1;
      this.resetForm("queryParams");
      this.onSearch();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // var neirong = $('#miaoshu').val();
      this.queryParams.pageNum = 1;
      this.onSearch();
    },
    onSearch() {
      this.queryParams.saleOrderNo = this.saleOrderNo;
      this.queryParams.whId = this.whId;
      if(this.dateRange.length>=2){
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }


      this.queryParams.customerName = this.customerName;
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
      })
    },
  },
};
</script>

<style lang="" scoped>

</style>
