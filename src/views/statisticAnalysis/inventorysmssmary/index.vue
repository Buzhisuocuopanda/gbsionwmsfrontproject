<template>
  <!--zgl-->
  <!--销售订单明细-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >
        <el-form-item label="客户" style="margin-left: 10px"  class="item-r" >
          <el-select v-model="queryParams.cbca08" clearable   filterable placeholder="请输入关键词" :loading="loading2">
            <el-option v-for="item in cbcaList" :key="item.cbca08" :label="item.cbca08" :value="item.cbca08"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售人员" style="margin-left: 20px"   class="item-r" >
          <el-select v-model="queryParams.caua17"  clearable  filterable placeholder="请输入关键词" :loading="loading3">
            <el-option v-for="item in cauaList" :key="item.caua17" :label="item.caua17" :value="item.caua17"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="商品" style="margin-left: 20px"  class="item-r" >
          <el-select v-model="queryParams.cbpb01" clearable filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getGoods" :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cbpb08+item.cbwa12+item.cbpb15" :value="item.cbpb01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="日期" style="margin-left: 20px">
          <el-date-picker v-model="dateRange" type="daterange" style="height: 35px"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 30px" >
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"
                 border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column label="单据编号" align="center" header-align="center" prop="cboa07" min-width="200px;" />
        <el-table-column  label="单据日期" align="center" prop="cboa08" :formatter="formatTime" min-width="120px;"/>
        <el-table-column  label="客户" align="center" prop="cbca08" min-width="240px;"/>
        <el-table-column  label="销售人员" align="center" prop="caua17" min-width="120px;"/>
        <el-table-column  label="品牌" align="center" prop="cala08" min-width="130px;"/>
        <el-table-column  label="类型" align="center" prop="cbpa08" min-width="100px;"/>
        <el-table-column  label="型号" align="center" prop="cbpb12"  min-width="160px;"/>
        <el-table-column  label="数量" align="center" prop="num" min-width="100px;"/>
        <el-table-column  label="已发货数量" align="center" prop="cbob10" min-width="100px;"/>
        <el-table-column  label="未发货数量" align="center" min-width="100px;">
          <template slot-scope="scope">
            <div>{{scope.row.num!=null? scope.row.num-scope.row.cbob10:''}}</div>
          </template>
        </el-table-column>
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
import {formatDate2} from '../../../utils';
import { getInventorysmssmaryquerysList,getSwJsGoodsAllList,getSwJsCustomerAllList,getsalermanAllList } from "@/api/statisticAnalysis/index";
export default {
  components: {},
  name: "inventorysmssmary",
  data() {
    return {

      dateRange:[],
      tableData: [],
      //下拉列表数据商品
      goodList:[],
      //下拉列表数据客户
      cbcaList:[],
      //下拉列表数据销售人员
      cauaList:[],
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cbpb01:"",
        cbwa09: "",
        caua17:"",
        startTime:undefined,
        endTime:undefined,

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
    this.getCbcaList();
    this.getCauaList();
  },
  methods: {
    onSubmit() {},
    handleSelectionChange() {},
    formatTime(row){
      return formatDate2(row.cboa08);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbca08 = "";
      this.queryParams.caua17 = "";
      this.queryParams.cbpb01 = "";
      this.dateRange=[];
      this.queryParams.pageNum = 1;
      // this.resetForm("queryParams");
      this.onSearch();
    },
    /** 搜索按钮操作 */
    handleQuery() {

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
      this.loading = true;
      getInventorysmssmaryquerysList(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.inwuquList = response.data.rows
          this.total = response.data.total
        } else {
          this.deviceList = []
          this.total = 0
        }
      },error => {
        this.loading = false;
      })
    },
    //导出
    exprotData(){
      this.download('/countQuery/InventorysmssmaryquerysExcelList', {
        ...this.queryParams
      }, `销售订单明细查询数据_${new Date().getTime()}.xlsx`)
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
    //下拉列表数据销售人员
    getCauaList(){
      let param={};
      this.loading3 = true;
      getsalermanAllList(param).then(response => {
        this.loading3 = false;
        if (response.data != null) {
          this.cauaList = response.data;
        } else {
          this.cauaList = [];
        }
      },error => {
        this.loading3 = false;
      });
    },

  },
};
</script>

<style lang="" scoped>

</style>
