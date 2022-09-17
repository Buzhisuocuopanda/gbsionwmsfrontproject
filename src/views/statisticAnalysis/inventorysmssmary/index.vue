<template>
  <!--销售订单明细-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >
        <el-form-item label="客户"   class="item-r" >
          <el-input v-model="cbca08" class="filter-item"  placeholder="客户" />
        </el-form-item>
        <el-form-item label="销售人员"   class="item-r" >
          <el-input v-model="caua17" class="filter-item"  placeholder="销售人员" />
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-input v-model="cbwa09" class="filter-item"  placeholder="商品" />
        </el-form-item>
        <el-form-item  label="日期">
          <el-date-picker size="mini" v-model="dateRange" type="daterange"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <!--<el-form-item label="品牌"   class="item-r" >
          <el-input v-model="cala08" class="filter-item"  placeholder="品牌" />
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-input v-model="cbpb01" class="filter-item"  placeholder="商品" />

        </el-form-item>-->

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
         <!-- <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>-->
        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"   border fit highlight-current-row stripe >
        <el-table-column label="单据编号" align="center" header-align="center" prop="cboa07" min-width="80px;" />
        <el-table-column  label="单据日期" align="center" prop="cboa08"  min-width="80px;"/>
        <el-table-column  label="客户" align="center" prop="cbca08" min-width="80px;"/>
        <el-table-column  label="销售人员" align="center" prop="caua17" min-width="120px;"/>
        <el-table-column  label="品牌" align="center" prop="cala08" min-width="130px;"/>
        <el-table-column  label="类型" align="center" prop="cbpa08" min-width="100px;"/>
        <el-table-column  label="型号" align="center" prop="cbpb12"  min-width="270px;"/>
        <el-table-column  label="数量" align="center" prop="num" min-width="100px;"/>
        <el-table-column  label="已发货数量" align="center" prop="cbob10" min-width="100px;"/>
        <el-table-column  label="未发货数量" align="center" prop="cbwa11" min-width="100px;"/>
        <el-table-column  label="单价" align="center" prop="cbob11" min-width="100px;"/>
        <el-table-column  label="金额" align="center" prop="cbob12" min-width="100px;"/>
        <!--<el-table-column  label="状态" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->

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
import { getInventorysummaryqueryList } from "@/api/statisticAnalysis/index";
export default {
  components: {},
  name: "inventorysmssmary",
  data() {
    return {
      cbca08: "",

      caua17: "",
      cbpb01:"",
      formData: {
        name: "",
      },
      dateRange:[],
      tableData: [],
      loadingOut:false,
      loadingState:false,
      loading:false,
      queryForm:{},
      /*listQuery: {
        pageNum: 1,
        pageSize: 10
      },*/
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: this.total,
        cbwa09: "",
        cbib17:"",
        dateRange:undefined,
        // cala08: "",
        // cbpb01: ""
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
    onSubmit() {},
    handleSelectionChange() {},
    formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return "NO"
        } else if (row.status == 4) {
          return "OK"
        }
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.cbca08 = "";
      this.caua17 = "";
      this.cbpb01 = "";
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
      this.queryParams.cbca08 = this.cbca08;
      this.queryParams.caua17 = this.caua17;
      this.queryParams.dateRange = this.dateRange;
      // this.queryParams.cbpb01 = this.cbpb01;
      this.loading = true;
      getInventorysummaryqueryList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.inwuquList = response.data.rows
          this.total = response.data.total
        } else {
          this.deviceList = []
          this.total = 0
        }
      })
    },
  },
};
</script>

<style lang="" scoped>

</style>
