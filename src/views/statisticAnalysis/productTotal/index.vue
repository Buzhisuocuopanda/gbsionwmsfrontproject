<!-- zgl -->
<!-- 生产总订单查询 -->
<template>
  <div class="app-container prodtotal">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="订单号">
        <el-input type="text" style="width: 200px;" v-model="queryParams.cbba07" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="商品">
        <el-select :remote-method="getGoods" v-el-select-loadmore="getGoodsloadmore" v-model="queryParams.cbpb01"
          style="width: 200px" clearable filterable remote placeholder="请输入关键词">
          <el-option v-for="item in goodList" :key="item.cbpb01"
            :label="item.cala08 + ' - ' + item.cbpb12 + ' - ' + item.cbpb08" :value="item.cbpb01"></el-option>
        </el-select>

        <!--<el-select v-model="queryParams.cbpb01" style="width: 200px;" clearable filterable remote reserve-keyword placeholder="请输入关键词" :loading="loading1">
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="状态">
        <el-select style="width:200px;" v-model="queryParams.cbba12" clearable filterable remote reserve-keyword
          placeholder="请选择">
          <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-hasPermi="['countQuery:inventsorysummaryquery2:list']" class="filter-item" type="primary"
          style="margin-left: 0px" @click="handleQuery">查询</el-button>
        <el-button v-hasPermi="['countQuery:inventsorysummaryquery2:list']" class="filter-item" type="primary"
          style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
        <el-button v-hasPermi="['countQuery:inventsorysummaryquery2:export']" class="filter-item" type="primary"
          v-on:click="exprotData()" style="margin-bottom:0;margin-left: 1em">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="headClasspw" :row-style="{ height: '3px' }"
      @sort-change="handleTableSort" :cell-style="{ padding: '2px' }" height="490"
      style="width: 100%;  margin-top:0.1em;flex-grow: 1;" border :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="序号" type="index" sortable width="60" align="left"></el-table-column>
      <el-table-column prop="cbba07" label="订单号" sortable align="left" min-width="150"></el-table-column>
      <el-table-column prop="cala08" label="品牌" min-width="90" sortable align="left"></el-table-column>
      <el-table-column prop="cbpb12" min-width="140" label="型号" sortable align="left"></el-table-column>
      <el-table-column prop="cbpb08" label="描述" sortable width="360px" align="left"></el-table-column>
      <el-table-column min-width="100" prop="cbba09" label="订单数量" :formatter="rounding" sortable="custom" align="right">
      </el-table-column>
      <el-table-column min-width="115" prop="cbba11" label="已发货数量" :formatter="rounding" sortable="custom"
        align="right"></el-table-column>
      <el-table-column min-width="115" prop="cbba13" label="已生产数量" :formatter="rounding" sortable="custom"
        align="right">
        <template slot-scope="scope">
          <div>{{ parseFloat(scope.row.cbba11 + scope.row.cbba13).toFixed(2) }}</div>
        </template>
      </el-table-column>
      <el-table-column width="100" label="缺货数量" sortable="custom" align="center">
        <template slot-scope="scope">
          <div>{{ parseFloat(scope.row.cbba09 - scope.row.cbba13 - scope.row.cbba11).toFixed(2) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="cbba12" label="状态" min-width="80" :formatter="formatStateType" sortable align="center">
      </el-table-column>
    </el-table>
    <!-- <el-descriptions title="合计">
      <el-descriptions-item label="订单数量">kooriookami</el-descriptions-item>
      <el-descriptions-item label="已发货数量">胜多负少</el-descriptions-item>
      <el-descriptions-item label="已生产数量">打发</el-descriptions-item>
      <el-descriptions-item label="缺货数量">阿萨德啊</el-descriptions-item>
    </el-descriptions> -->
    <el-pagination :background="true" :page-sizes="[10, 15, 20, 50, 500]" :total="total"
      :current-page.sync="queryParams.pageNum" :page-size.sync="queryParams.pageSize"
      style="padding-top:20px; padding-left: 20px;text-align: right;flex-grow: 0;"
      layout="total, sizes, prev, pager, next, jumper" @size-change="onSearch" @current-change="onSearch" />
  </div>
</template>

<script>
import { getInvsensstorsysummaryqueryList, getSwJsGoodsAllList } from "@/api/statisticAnalysis/index";

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
  name: "ProductTotal",
  components: {},
  data() {
    return {
      //下拉列表数据商品
      goodList: [],
      loading: false,
      loading1: false,
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        cbba07: "",
        cbpb01: "",
        cbba12: "",
      },
      // 商品查询参数
      goodsQueryParams: {
        pageNum: 1,
        pageSize: 10,
        cbpb08: "",
        cbpb15: "",
        cbpb12: ""
      },
      tableData: [], // 表格数据
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
      sortkey: "",
      sortType: "",
      orderNo: "",
      model: "",
      status: "",

    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch();
    this.getGoods();
  },
  methods: {

    handleTableSort(column) {
      console.log('1111', column)
      this.sortkey = column.prop
      this.sorttype = column.order
      const param = {
        orderNo: this.orderNo,
        model: this.model,
        status: this.status,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        sortKey: this.sortkey,
        sortType: this.sorttype
      }
      // console.info(param)
      getInvsensstorsysummaryqueryList(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.tableData = response.data.rows
          this.total = response.data.total
        } else {
          // this.orderList = []
          this.total = 0
        }
      })
    },
    rounding(row, column) {
      if (parseFloat(row[column.property]).toFixed(2) == null || isNaN(parseFloat(row[column.property]).toFixed(2))) {
        return '0.00';
      }
      return parseFloat(row[column.property]).toFixed(2)
    },

    //列表表头设置
    headClasspw() {
      return {
        'text-align': 'left',
        height: '30px',
        padding: '0'
      }
    },

    onSubmit() { },
    formatStateType(row) {
      if (row != null) {
        if (row.cbba12 == 0) {
          return "NO"
        } else if (row.cbba12 == 4) {
          return "OK"
        }
      }
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbba07 = "";
      this.queryParams.cbba12 = "";
      this.queryParams.cbpb01 = "";
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
    onSearch() {
      this.loading = true;
      getInvsensstorsysummaryqueryList(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.tableData = response.data.rows
          this.total = response.data.total

          console.log(this.tableData)
        } else {
          /*     this.deviceList = []*/
          this.total = 0
        }
      }, error => {
        this.loading = false;
      })
    },
    //导出
    exprotData() {
      // this.loading=true;
      this.download('/countQuery/InvsensstorsysummaryqueryExcelList', {
        ...this.queryParams
      }, `生产总订单查询数据_${new Date().getTime()}.xlsx`)
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
