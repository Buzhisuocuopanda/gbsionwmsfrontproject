<template>
  <!--zgl-->
  <!--销售预订单汇总-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >
        <el-form-item label="客户" style="margin-left: 10px"  class="item-r" >
          <el-select v-model="queryParams.customerId" clearable   filterable placeholder="请输入关键词" :loading="loading2">
            <el-option v-for="item in cbcaList" :key="item.cbca01" :label="item.cbca08" :value="item.cbca01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售人员" style="margin-left: 20px"   class="item-r" >
          <el-select v-model="queryParams.salerId" v-loadmore="getCauaList"  clearable  filterable placeholder="请输入关键词">
            <el-option v-for="item in cauaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="商品" v-if="false" style="margin-left: 20px"  class="item-r" >
          <el-select v-model="queryParams.cbpb01" clearable filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" style="margin-left: 20px" class="item-r" >
          <el-select v-model="queryParams.supplierId"   clearable filterable placeholder="请输入关键词" :loading="loading6">
            <el-option v-for="item in cbsaList" :key="item.cbsa01" :label="item.cbsa08" :value="item.cbsa01"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  label="日期" style="margin-left: 20px">
          <el-date-picker v-model="dateRange" type="daterange" style="height: 35px"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 30px" >
          <el-button v-hasPermi="['countQuery:inventorysumsmaryquery:list']" class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['countQuery:inventorysumsmaryquery:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['countQuery:inventorysumsmaryquery:export']" type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
        </el-form-item>
      </el-form>
      <el-table  :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" height="450"  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"
                 border fit highlight-current-row stripe style="margin-top:1em"  :span-method="objectSpanMethod">
        <el-table-column label="供料单位" align="left" header-align="center" prop="supplier" min-width="170px;" />

        <el-table-column  label="客户名称" align="left" prop="customer" min-width="240px;"/>
        <el-table-column  label="编号" align="left" prop="orderNo" min-width="180px;"/>
        <el-table-column  label="销售人员" align="left" prop="saler" min-width="120px;"/>
        <el-table-column  label="数量" align="right" :formatter="rounding" prop="num" min-width="60px;"/>
        <el-table-column  label="入库数量" align="right" :formatter="rounding" prop="enterNum" min-width="80px;"/>
        <el-table-column  label="变更数量" align="right" :formatter="rounding" prop="changeNum" min-width="80px;"/>
        <el-table-column  label="剩余数量" align="right" :formatter="rounding" prop="remainNum" min-width="80px;"/>
        <el-table-column  label="品牌" align="left" prop="cbpb10" min-width="100px;"/>
        <el-table-column  label="型号" align="left" prop="cbpb12" min-width="160px;"/>
        <el-table-column  label="商品" align="left" prop="cbpb08" min-width="490px;"/>

       <!-- <el-table-column  label="入库数量" align="center" prop="cbob10" min-width="100px;"/>
        <el-table-column  label="变更数量" align="center" min-width="100px;"/>
        <el-table-column  label="剩余数量" align="center" min-width="100px;"/>
        <el-table-column  label="是否完成" align="center" min-width="100px;">
          <template slot-scope="scope">
            <div>{{scope.row.num!=null? scope.row.num-scope.row.cbob10:''}}</div>
          </template>
        </el-table-column>-->

        <el-table-column  label="创建时间" align="left" prop="createTime" :formatter="formatTime" min-width="120px;"/>
        <!--<el-table-column  label="状态" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->

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
import {formatDate2} from '../../../utils';
import { saleOrderListCountquery,getSwJsGoodsAllList,getSwJsCustomerAllList,getsalermanAllList,getSwJsSupplierlistAll } from "@/api/statisticAnalysis/index";
import {systemUserSelect } from '@/api/saleordermanage'
import Vue from "vue";

Vue.directive('loadmore', {
  bind(el, binding) {

    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

    SELECTWRAP_DOM.addEventListener('scroll', function() {

      /*
      * scrollHeight 获取元素内容高度(只读)
      * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
      * clientHeight 读取元素的可见高度(只读)
      * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
      * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      */
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

      if(CONDITION) {
        binding.value();
      }
    });
  }
})
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
      //下拉列表数据供应商
      cbsaList:[],
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      loading6:false,
      address: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        customerId:"",
        supplierId:"",
        salerId:"",
        startTime:undefined,
        endTime:undefined,

      },

      userParams: {
        pageNum: 1,
        pageSize: 15,
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
    // this.getGoods();
    this.getCbsaList();
  },
  methods: {
    onSubmit() {},
    handleSelectionChange() {},
    formatTime(row){
      return formatDate2(row.createTime);
    },
    rounding(row, column) {
      if(parseFloat(row[column.property]).toFixed(2)==null||isNaN(parseFloat(row[column.property]).toFixed(2))){
        return '0.00';
      }
      return parseFloat(row[column.property]).toFixed(2)
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.customerId = "";
      this.queryParams.supplierId = "";
      this.queryParams.salerId = "";
      this.dateRange=[];
      this.queryParams.pageNum = 1;
      // this.resetForm("queryParams");
      this.onSearch();
    },

    // 时间转换 和合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // this.address = JSON.parse(this.form.supplierShengshiqu)
     /* if (this.crud.data != null) {
        this.crud.data.forEach(item => {
          if (item.startTime != null) {
            item.startTime = formatDate(item.startTime, 'yyyy-MM-dd hh:mm')
          }
          if (item.endTime != null) {
            item.endTime = formatDate(item.endTime, 'yyyy-MM-dd hh:mm')
          }
        })
      }*/
      if (columnIndex === 0) {
        const _row = (this.flitterData(this.inwuquList).one)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = (this.flitterData(this.inwuquList).two)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 2) {
        const _row = (this.flitterData(this.inwuquList).three)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 3) {
        const _row = (this.flitterData(this.inwuquList).four)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 4) {
        const _row = (this.flitterData(this.inwuquList).four)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 5) {
        const _row = (this.flitterData(this.inwuquList).six)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 6) {
        const _row = (this.flitterData(this.inwuquList).four)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 7) {
        const _row = (this.flitterData(this.inwuquList).three)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 11) {
        const _row = (this.flitterData(this.inwuquList).three)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },

    flitterData(arr) {
      const spanOneArr = []
      const spanTwoArr = []
      const spanThreeArr = []
      const spanEightArr = []
      const spanFourArr = []
      const spanFiveArr = []
      const spanSixArr =[]
      let concatOne = 0
      let concatTwo = 0
      let concatThree = 0
      let concatFour = 0
      let concatFive = 0
      let concatSix = 0

      let concatEight = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
          spanTwoArr.push(1)
          spanThreeArr.push(1)
          spanFourArr.push(1)
          spanFiveArr.push(1)
          spanSixArr.push(1)
          spanEightArr.push(1)
        } else {


          if (item.id === arr[index - 1].id &&item.supplier === arr[index - 1].supplier) { // 第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
            spanEightArr[concatEight] += 1
            spanEightArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
            spanEightArr.push(1)
            concatEight = index
          }

          if (item.id === arr[index - 1].id && item.customer === arr[index - 1].customer) { // 第二列需合并相同内容的判断条件
            spanTwoArr[concatTwo] += 1
            spanTwoArr.push(0)
          } else {
            spanTwoArr.push(1)
            concatTwo = index
          }

          if (item.id === arr[index - 1].id && item.onderNo === arr[index - 1].onderNo) { // 第三列需合并相同内容的判断条件
            spanThreeArr[concatThree] += 1
            spanThreeArr.push(0)
          } else {
            spanThreeArr.push(1)
            concatThree = index
          }
          if (item.id === arr[index - 1].id ) { // 第三列需合并相同内容的判断条件
            spanFourArr[concatFour] += 1
            spanFourArr.push(0)

            spanFiveArr[concatFive] += 1
            spanFiveArr.push(0)

            spanSixArr[concatSix] += 1
            spanSixArr.push(0)
          } else {
            spanFourArr.push(1)
            concatFour = index

            spanFiveArr.push(1)
            concatFive = index

            spanSixArr.push(1)
            concatSix = index
          }

        }
      })
      return {
        one: spanOneArr,
        two: spanTwoArr,
        three: spanThreeArr,
        four: spanFourArr,
        five: spanFiveArr,
        six: spanSixArr
      }
    },

    /** 搜索按钮操作 */
    handleQuery() {

      this.queryParams.pageNum = 1;
      this.onSearch();
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
      saleOrderListCountquery(this.queryParams).then(response => {
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
      this.download('/countQuery/saleOrderListCountqueryExcel', {
        ...this.queryParams
      }, `销售预订单汇总数据_${new Date().getTime()}.xlsx`)
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
      this.loading3 = true;
      systemUserSelect(this.userParams).then(response => {
        this.loading3 = false;
        if (response.code == 200) {
          this.userParams.pageNum=this.userParams.pageNum+1;
          this.cauaList.push(...response.data.rows)
        }
      },error => {
        this.loading3 = false;
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
