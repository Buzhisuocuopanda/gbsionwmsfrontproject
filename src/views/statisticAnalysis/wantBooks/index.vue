<!-- zgl -->
<!-- 缺货登记查询 -->
<template>
  <div class="app-container wantbooks">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="商品分类">
        <el-select v-model="queryParams.cbpa07"  style="width: 200px" clearable filterable placeholder="请输入关键词" :loading="loading3">
          <el-option v-for="item in cbpaList" :key="item.cbpa07" :label="item.cbpa07+' ['+item.cbpa11+']'" :value="item.cbpa07"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="queryParams.cala08"  style="width: 200px" clearable filterable placeholder="请输入关键词" :loading="loading2">
          <el-option v-for="item in calaList" :key="item.cala08" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala08"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品">
        <el-select @change="getGoods" :remote-method="getGoods" v-loadmore="getGoodsloadmore"  v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote  placeholder="请输入关键词"  >
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
        </el-select>
       <!-- <el-select v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote reserve-keyword placeholder="请输入关键词" :loading="loading1">
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item>
        <el-button v-hasPermi="['countQuery:invsentorsysummaryquery:list']" class="filter-item" type="primary" @click="handleQuery">查询</el-button>
        <el-button v-hasPermi="['countQuery:invsentorsysummaryquery:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
        <el-button v-hasPermi="['countQuery:invsentorsysummaryquery:export']" class="filter-item" type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="headClasspw"  style="width: 100%;margin-top:0.1em" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" height="460" border :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="序号" type="index" sortable width="50" align="left"></el-table-column>
      <el-table-column prop="cbpa08" label="大类" align="left" sortable width="110"></el-table-column>
      <el-table-column prop="cbpa07" label="分类名称" align="left" width="100" sortable></el-table-column>
      <el-table-column prop="cala08" label="品牌" width="80" align="left" sortable></el-table-column>
      <el-table-column prop="cbpb12" label="型号" align="left" width="140" sortable></el-table-column>
      <el-table-column prop="cbpb15" label="UPC" align="left" width="145" sortable></el-table-column>
      <el-table-column prop="cbpb08" label="描述" align="left" width="280px" sortable></el-table-column>
      <el-table-column prop="cbof09" label="数量" align="right" :formatter="rounding" sortable></el-table-column>
      <el-table-column prop="cbca08" label="客户" align="left" width="240px;" sortable></el-table-column>
      <el-table-column prop="cboe08" width="110" :formatter="formatTime" label="日期" align="left" sortable></el-table-column>
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
</template>

<script>
  import {formatDate2} from '../../../utils';
  import { getInvsentorsysummaryqueryList,getSwJsGoodsClassifyAllList,getswJsAllList,getSwJsGoodsAllList } from "@/api/statisticAnalysis/index";
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
    name: "wantBooks",
    components: {},
    data() {
      return {
        //下拉列表数据商品分类
        cbpaList:[],
        //下拉列表数据品牌
        calaList:[],
        //下拉列表数据商品
        goodList:[],
        queryParams: {
          pageNum: 1,
          pageSize: 15,
          cbpa07:"",
          cala08:"",
          cbpb01:"",
        },
        // 商品查询参数
        goodsQueryParams:{
          pageNum: 1,
          pageSize: 10,
          cbpb08:"",
          cbpb15:"",
          cbpb12:""
        },
        tableData: [], // 表格数据
        loading:false,
        loading1:false,
        loading2:false,
        loading3:false,
        total:0,
      };
    },
    computed: {},
    mounted() { // 自动触发写入的函数
      this.onSearch();
      this.getCbpaList();
      this.getCalaList();
      this.getGoods();
    },
    methods: {

      rounding(row, column) {
        if(parseFloat(row[column.property]).toFixed(2)==null||isNaN(parseFloat(row[column.property]).toFixed(2))){
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

      onSubmit() {},
      formatTime(row){
        return formatDate2(row.cboe08);
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.queryParams.cbpa07 = "";
        this.queryParams.cala08 = "";
        this.queryParams.cbpb01 = "";
        this.queryParams.pageNum = 1;
        this.getGoods()
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
        getInvsentorsysummaryqueryList(this.queryParams).then(response => {
          this.loading = false;
          if (response.data != null && response.data.rows != null) {
            this.tableData = response.data.rows
            this.total = response.data.total
          } else {
            /*     this.deviceList = []*/
            this.total = 0
          }
        },error => {
          this.loading = false;
        })
      },
      //导出
      exprotData(){
        // this.loading=true;
        this.download('/countQuery/InvsentorsysummaryqueryExcelList', {
          ...this.queryParams
        }, `缺货登记查询数据_${new Date().getTime()}.xlsx`)
      },
      //下拉列表数据商品分类
      getCbpaList(){
        let param={};
        this.loading3 = true;
        getSwJsGoodsClassifyAllList(param).then(response => {
          this.loading3 = false;
          if (response.data != null) {
            this.cbpaList = response.data;
          } else {
            this.cbpaList = [];
          }
        },error => {
          this.loading3 = false;
        });
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
      //获取下拉列表数据商品
      getGoods(val){
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
        },error => {
          // this.loading1 = false;
        });
      },
      //获取下拉列表数据商品
      getGoodsloadmore(){
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
        },error => {
          // this.loading1 = false;
        });
      },

    },
  };
</script>

<style  scoped>
.wantbooks .el-form--inline {
  height: 60px !important;
}
</style>
