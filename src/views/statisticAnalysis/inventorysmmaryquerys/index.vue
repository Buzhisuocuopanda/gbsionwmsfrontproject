<template>
  <!--仓库台账-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >
        <el-form-item  label="日期">
          <el-date-picker size="mini" v-model="dateRange" type="daterange" style="width:400px;height: 32px;"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="单据日期起始" end-placeholder="单据日期截止" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据类型/仓库"   class="item-r" >
          <el-input v-model="queryParams.cbwa09" class="filter-item" style="width: 300px" placeholder="单据类型/仓库" />
        </el-form-item>

        <!--<el-form-item label="品牌"   class="item-r" >
          <el-input v-model="cala08" class="filter-item"  placeholder="品牌" />
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-input v-model="cbpb01" class="filter-item"  placeholder="商品" />

        </el-form-item>-->

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"   border fit highlight-current-row stripe >
        <el-table-column label="仓库" align="center" header-align="center" prop="cbwa09" min-width="80px;" />
        <el-table-column  label="单据日期" align="center"  prop="cbib04" :formatter="formatTime2"  min-width="100px;"/>
        <el-table-column  label="单据类型" align="center" prop="cbib17" min-width="80px;"/>
        <el-table-column  label="单据编号" align="center" prop="cbib03" min-width="120px;"/>
        <el-table-column  label="摘要" align="center" prop="cbib17" min-width="130px;"/>
        <el-table-column  label="往来单位" align="center" prop="cbib06" min-width="100px;"/>
        <el-table-column  label="商品" align="center" prop="cbpb08"  min-width="270px;"/>
        <el-table-column  label="上次结存数量" align="center" prop="cbib09" min-width="60px;"/>
        <el-table-column  label="上次结存成本金额" align="center" prop="cbib10" min-width="100px;"/>
        <el-table-column  label="本次入库数量" align="center" prop="cbib11" min-width="60px;"/>
        <el-table-column  label="本次入库金额" align="center" prop="cbib12" min-width="100px;"/>
        <el-table-column  label="本次出库数量" align="center" prop="cbib13" min-width="60px;"/>
        <el-table-column  label="本次出库金额" align="center" prop="cbib14" min-width="100px;"/>
        <el-table-column  label="本次结存数量" align="center" prop="cbib15" min-width="60px;"/>
        <el-table-column  label="本次结存金额" align="center" prop="cbib16" min-width="100px;"/>
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
import { formatDate2 } from '../../../utils';
import { getInventorysmmaryquerysList } from "@/api/statisticAnalysis/index";
export default {
  components: {},
  name: "inventorysmmaryquerys",
  data() {
    return {

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
        startTime:undefined,
        endTime:undefined,
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
    formatTime2(row){
      return formatDate2(row.cbib04);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbib17 = "";
      this.queryParams.cbwa09 = "";
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
    onSearch() {
      if(this.dateRange.length>=2){
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }else {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }


      // this.queryParams.cbpb01 = this.cbpb01;
      this.loading = true;
      getInventorysmmaryquerysList(this.queryParams).then(response => {
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
