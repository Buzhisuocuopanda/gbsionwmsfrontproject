<template>
  <!--zgl-->
  <!--月度销售数据查询-->
  <div class="app-container">
    <div class="filter-container prodtotal">
      <el-form :inline="true">
        <el-form-item label="客户" class="item-r" label-width="80px">
          <el-select v-model="queryParams.customerId" style="margin-left: 10px;width: 240px" clearable filterable
            placeholder="请输入关键词" :loading="loading2">
            <el-option v-for="item in cbcaList" :key="item.cbca01" :label="item.cbca08" :value="item.cbca01">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份" style="margin-left: 20px">
          <SelectMonth ref="child" @selected="getmonthlys" @resetBtn="clearMonth"></SelectMonth>

        </el-form-item>

        <el-form-item style="margin: 0px -10px 1px 1px;">
          <el-button v-hasPermi="['query:monthlySales:list']" class="filter-item" type="primary" icon="el-icon-search"
            style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['query:monthlySales:list']" class="filter-item" type="primary"
            style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['query:monthlySales:export']" class="filter-item" type="primary"
            v-on:click="exprotData()" style="margin-bottom:0;margin-left: 1em">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table :header-cell-style="headClasspwfnsyns" :data="inwuquList" :row-style="{ height: '3px' }"
        :cell-style="{ padding: '2px' }" element-loading-text="Loading。。。" width="100%;" height="430" v-loading="loading"
        border fit highlight-current-row stripe>
        <el-table-column label="月份" prop="yearAndMonth" min-width="100px;" />
        <el-table-column label="客户" prop="customerName" min-width="150px;" />
        <el-table-column label="出库数量" :formatter="rounding" align="right" prop="outCount" min-width="100px;" />
        <el-table-column label="出库价值" :formatter="rounding" align="right" prop="outMoney" min-width="100px;" />
        <el-table-column label="出库数量占比（%）" align="right" prop="outCountTotal100" min-width="100px;" />
        <el-table-column label="出库价值占比（%）" align="right" prop="outMoneyTotal100" min-width="100px;" />
      </el-table>
      <el-pagination :background="true" :page-sizes="[10, 15, 20, 50, 500]" :total="total"
        :current-page.sync="queryParams.pageNum" :page-size.sync="queryParams.pageSize"
        style="padding-top:20px; padding-left: 20px;float: right;text-align: right;"
        layout="total, sizes, prev, pager, next, jumper" @size-change="onSearch" @current-change="onSearch" />

    </div>
  </div>
</template>
<script>
import { monthlySales, getSwJsStoreSkuAllList, getSwJsCustomerAllList } from "@/api/statisticAnalysis/index";

import SelectMonth from "@/components/SelectMonth"

// import { formatDate } from '../../../utils';
export default {
  name: "MonthlySales",
  components: { SelectMonth },
  data() {
    return {
      //下拉列表数据仓库
      storeSkuList: [],
      //下拉列表数据客户
      cbcaList: [],
      dateRange: [],

      loading: false,
      loading2: false,
      loading3: false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        customerId: undefined,
        monthlys: undefined,
      },
      value5: [],
      inwuquList: [],
      total: 0,
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
    getmonthlys(value) {
      console.log(value, 'month')
      this.queryParams.monthlys = value;
    },
    clearMonth() {
      this.queryParams.monthlys = undefined;
    },

    rounding(row, column) {
      if (parseFloat(row[column.property]).toFixed(2) == null || isNaN(parseFloat(row[column.property]).toFixed(2))) {
        return '';
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

      this.queryParams.customerId = undefined;
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
    exprotData() {
      this.download('/query/monthlySalesExcel', {
        ...this.queryParams
      }, `月度销售数据_${new Date().getTime()}.xlsx`)
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
      monthlySales(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.inwuquList = response.data.rows
          this.total = response.data.total
        } else {
          /*     this.deviceList = []*/
          this.total = 0
        }
      }, error => {
        this.loading = false;
      })
    },
    //下拉列表数据仓库
    getStoreSkuList(query) {
      let param = { cbwa09: query };
      this.loading3 = true;
      getSwJsStoreSkuAllList(param).then(response => {
        this.loading3 = false;
        if (response.data != null) {
          this.storeSkuList = response.data;
        } else {
          this.storeSkuList = [];
        }
      }, error => {
        this.loading3 = false;
      });
    },
    //下拉列表数据客户
    getCbcaList() {
      let param = {};
      this.loading2 = true;
      getSwJsCustomerAllList(param).then(response => {
        this.loading2 = false;
        if (response.data != null) {
          this.cbcaList = response.data;
        } else {
          this.cbcaList = [];
        }
      }, error => {
        this.loading2 = false;
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.prodtotal {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(93vh - 85px);
}

.prodtotal .el-form--inline {
  height: auto !important;
  flex-grow: 0;
}
</style>
