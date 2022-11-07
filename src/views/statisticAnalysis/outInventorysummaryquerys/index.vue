<template>

  <!--已出库明细查询-->
  <div class="app-container">
    <div class="filter-container prodtotal">
      <el-form :inline="true" label-width="70px">
        <el-form-item label="日期" style="margin-left: 27px">
          <el-date-picker v-model="dateRange" type="daterange" style="height: 35px" :picker-options="pickerOptions"
            popper-class="elDatePicker" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="仓库" class="item-r">
          <el-select v-model="queryParams.cbwa09s" multiple filterable remote reserve-keyword placeholder="请输入关键词"
            :remote-method="getStoreSkuList" :loading="loading2">
            <el-option v-for="item in storeSkuList" :key="item.cbwa09" :label="item.cbwa09 + ' [' + item.cbwa10 + ']'"
              :value="item.cbwa09"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="false" label="库位" class="item-r">
          <el-select v-model="queryParams.cbla09s" :remote-method="getCblaList" multiple filterable remote
            reserve-keyword placeholder="请输入关键词" :loading="loading3">
            <el-option v-for="item in cblaList" :key="item.cbla09" :label="item.cbla09" :value="item.cbla09">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" class="item-r">
          <el-select v-model="queryParams.cbpb10" style="width: 200px" clearable filterable placeholder="请选择">
            <el-option v-for="item in calaList" :key="item.cala01" :label="item.cala08 + ' [' + item.cala09 + ']'"
              :value="item.cala01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" class="item-r">
          <el-select :remote-method="getGoods" v-el-select-loadmore="getGoodsloadmore" v-model="queryParams.cbpb01"
            style="width: 200px" clearable filterable remote placeholder="请输入关键词">
            <el-option v-for="item in goodList" :key="item.cbpb01"
              :label="item.cala08 + ' - ' + item.cbpb12 + ' - ' + item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>
          <!--<el-select v-model="queryParams.cbpb01"  clearable filterable remote reserve-keyword placeholder="请输入关键词"
            :remote-method="getGoods"
            :loading="loadingGood">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="商品SN" class="item-r">
          <el-input v-model="queryParams.cbig10" class="filter-item" placeholder="商品SN" />
        </el-form-item>
        <el-form-item v-if="false" label="商品状态">
          <el-select v-model="queryParams.status" clearable filterable remote reserve-keyword placeholder="请选择">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="false" label="上架状态">
          <el-select v-model="queryParams.groudStatus" clearable filterable remote reserve-keyword placeholder="请选择">
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button v-hasPermi="['countQuery:outInventorysummaryquerys:list']" class="filter-item" type="primary"
            icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['countQuery:outInventorysummaryquerys:list']" class="filter-item" type="primary"
            style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['countQuery:outInventorysummaryquerys:export']" class="filter-item" type="primary"
            v-on:click="exprotData()" :loading=loadingOut style="margin-bottom:0;margin-left: 1em">导出</el-button>

        </el-form-item>
      </el-form>
      <el-table :header-cell-style="headClasspw" :data="inwuquList" :row-style="{ height: '3px' }"
        :cell-style="{ padding: '2px' }" element-loading-text="Loading。。。" width="100%;" height="430" v-loading="loading"
        border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column v-if="false" align="center" prop="cbig01" min-width="80px;" />
        <el-table-column label="仓库" align="left" prop="cbwa09" min-width="80px;" />
        <el-table-column v-if="false" label="库位" align="left" prop="cbla09" min-width="110px;" />
        <!--<el-table-column  label="大类" align="center" prop="cala08" min-width="120px;"/>-->
        <el-table-column label="商品分类" align="left" prop="cbpa07" min-width="100px;" />
        <el-table-column label="品牌" align="left" prop="cala08" min-width="100px;" />
        <el-table-column label="型号" align="left" prop="cbpb12" min-width="180px;" />
        <el-table-column label="UPC" align="left" prop="cbpb15" min-width="150px;" />
        <!--<el-table-column  label="描述" align="center" prop="lockQty" min-width="260px;"/>-->
        <el-table-column label="商品SN" align="left" prop="sn" min-width="120px;" />
        <el-table-column label="出库日期" align="left" prop="outTime" :formatter="formatTime2" min-width="110px;" />
        <el-table-column v-if="false" prop="status" label="商品状态" width="80" :formatter="formatState" sortable
          align="center"></el-table-column>
        <el-table-column v-if="false" prop="groudStatus" width="80" label="上架状态" :formatter="formatStateType" sortable
          align="center"></el-table-column>
        <el-table-column v-if="false" prop="repairStatus" width="80" label="质量状态" :formatter="repairStateType" sortable
          align="center"></el-table-column>

      </el-table>
      <el-pagination :background="true" :page-sizes="[10, 15, 20, 50, 500]" :total="total"
        :current-page.sync="queryParams.pageNum" :page-size.sync="queryParams.pageSize"
        style="padding-top:25px; padding-left: 20px;float: right;text-align: right;"
        layout="total, sizes, prev, pager, next, jumper" @size-change="onSearch" @current-change="onSearch" />

      <!--<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize" @pagination="onSearch" :page-sizes="[10, 20, 30]"
                />-->
    </div>
  </div>
</template>
<script>
// import x from ''
// import { totalOrderList } from "@/api/saleordermanage";
import { outInventorysummaryquerys, getSwJsGoodsAllList, getSwJsStoreSkuAllList, getSwJsStoreAllList, getswJsAllList } from "@/api/statisticAnalysis/index";
import { formatDate2 } from '../../../utils';
import Vue from 'vue';
Vue.directive('loadmore', {
  bind(el, binding) {

    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

    SELECTWRAP_DOM.addEventListener('scroll', function () {

      /*
      * scrollHeight 获取元素内容高度(只读)
      * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
      * clientHeight 读取元素的可见高度(只读)
      * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
      * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      */
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

      if (CONDITION) {
        binding.value();
      }
    });
  }
})
export default {
  components: {},
  name: "OutInventorysummaryquerys",
  data() {
    return {
      dateRange: [],
      tableData: [],
      loadingOut: false,
      loadingState: false,
      loading: false,
      loading2: false,
      loading3: false,
      loadingGood: false,
      queryForm: {},
      //商品下拉列表数据
      goodList: [],
      //下拉列表数据仓库
      storeSkuList: [],
      //下拉列表仓库多选 选中的数据
      cbwa09s: [],
      //下拉列表数据库位
      cblaList: [],
      //下拉列表库位多选 选中的数据
      cblas: [],
      //下拉列表数据品牌
      calaList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        total: this.total,
        cbwa09s: [],
        cbla09s: "",
        cbpb01: "",
        cbig10: "",
        cbpb10: "",
        groudStatus: undefined,
        status: undefined,
      },
      // 商品查询参数
      goodsQueryParams: {
        pageNum: 1,
        pageSize: 10,
        cbpb08: "",
        cbpb15: "",
        cbpb12: ""
      },
      inwuquList: [],
      total: 0,
      status: [
        {
          value: 1,
          label: '已入库',
        },
        {
          value: 2,
          label: '出库中',
        },
        /* {
           value: 3,
           label: '已出库',
         }*/
      ],
      statusType: [
        {
          value: 1,
          label: '上架',
        },
        {
          value: 2,
          label: '已下架',
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
    this.getStoreSkuList();
    this.getCblaList();
    this.getGoods();
    this.getCalaList();
  },
  methods: {

    //列表表头设置
    headClasspw() {
      return {
        'text-align': 'left',
        height: '30px',
        padding: '0'
      }
    },

    formatTime2(row) {
      return formatDate2(row.inTime);
    },
    formatState(row) {
      if (row != null) {
        if (row.status == 1) {
          return "已入库"
        } else if (row.status == 2) {
          return "出库中"
        } else if (row.status == 3) {
          return "已出库"
        }
      }
    },
    formatStateType(row) {
      if (row != null) {
        if (row.groudStatus == 1) {
          return "上架"
        } else if (row.groudStatus == 2) {
          return "已下架"
        }
      }
    },
    repairStateType(row) {
      if (row != null) {
        if (row.repairStatus == 1) {
          return "维修中"
        } else {
          return "正常"
        }
      }
    },
    onSubmit() { },
    handleSelectionChange() { },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbwa09s = [];
      this.queryParams.cbla09s = [];
      this.queryParams.cbpb01 = "";
      this.queryParams.cbig10 = "";
      this.queryParams.cbpb10 = "";
      this.queryParams.groudStatus = "";
      this.dateRange = [];
      this.queryParams.status = "";
      this.queryParams.pageNum = 1;
      this.getGoods()
      this.onSearch();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // var neirong = $('#miaoshu').val();

      this.queryParams.pageNum = 1;
      this.onSearch();
    },
    onSearch() {
      if (this.dateRange != null && this.dateRange.length >= 2) {
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      } else {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      this.loading = true;
      outInventorysummaryquerys(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.inwuquList = response.data.rows
          this.total = response.data.total
        } else {
          // this.deviceList = []
          this.total = 0
        }
      }, error => {
        this.loading = false;
      })
    },
    //导出
    exprotData() {
      this.download('/countQuery/InventorysummaryquerysExcelList', {
        ...this.queryParams
      }, `库存明细查询数据_${new Date().getTime()}.xlsx`)
    },

    //获取下拉列表数据商品
    getGoods(val) {
      this.goodsQueryParams.cbpb08 = val;
      this.goodsQueryParams.cbpb15 = val;
      this.goodsQueryParams.cbpb12 = val;
      this.goodsQueryParams.pageNum = 1;
      // this.loading1 = true;
      getSwJsGoodsAllList(this.goodsQueryParams).then(response => {
        // this.loading1 = false;
        if (response.data != null) {
          this.goodsQueryParams.pageNum += 1;
          this.goodList = response.data;
        } else {
          this.goodList = [];
        }
      }, error => {
        // this.loading1 = false;
      });
    },
    //获取下拉列表数据商品
    getGoodsloadmore() {
      // this.goodsQueryParams.cbpb08 = query;
      // this.goodsQueryParams.cbpb15 = query;
      // this.goodsQueryParams.cbpb12 = query;
      // this.goodsQueryParams.pageNum = 1;
      // this.loading1 = true;
      getSwJsGoodsAllList(this.goodsQueryParams).then(response => {
        // this.loading1 = false;
        if (response.data != null) {
          this.goodsQueryParams.pageNum += 1;
          this.goodList.push(...response.data);
        } else {
          // this.goodList = [];
        }
      }, error => {
        // this.loading1 = false;
      });
    },
    //下拉列表数据仓库
    getStoreSkuList(query) {
      let param = { cbwa09: query };
      this.loading2 = true;
      getSwJsStoreSkuAllList(param).then(response => {
        this.loading2 = false;
        if (response.data != null) {
          this.storeSkuList = response.data;
        } else {
          this.storeSkuList = [];
        }
      }, error => {
        this.loading2 = false;
      });
    },
    //下拉列表数据库位
    getCblaList(query) {
      let param = { pageNum: 1, pageSize: 1000, cbla09: query };
      this.loading3 = true;
      getSwJsStoreAllList(param).then(response => {
        this.loading3 = false;
        if (response.data != null) {
          this.cblaList = response.data;
        } else {
          this.cblaList = [];
        }
      }, error => {
        this.loading3 = false;
      });
    },
    //下拉列表数据品牌
    getCalaList() {
      let param = { cala10: "商品品牌" };

      getswJsAllList(param).then(response => {
        this.loading2 = false;
        if (response.data != null) {
          this.calaList = response.data;
        } else {
          this.calaList = [];
        }
      }, error => {
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
