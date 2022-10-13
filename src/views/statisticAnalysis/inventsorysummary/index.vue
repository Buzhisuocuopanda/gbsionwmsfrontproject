<template>
  <!--销售库存查询-->
  <div class="app-container insorymay">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
        <el-form-item label="商品分类"   class="item-r" >
          <el-select v-model="queryParams.classId"  style="width: 200px" clearable  filterable placeholder="请输入关键词" :loading="loading3">
            <el-option v-for="item in cbpaList" :key="item.cbpa01" :label="item.cbpa07+' ['+item.cbpa11+']'" :value="item.cbpa01"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="品牌"   class="item-r" >
          <el-select v-model="queryParams.cbpb10"  style="width: 200px" clearable filterable placeholder="请输入关键词" :loading="loading2">
            <el-option v-for="item in calaList" :key="item.cala01" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-select v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote reserve-keyword placeholder="请输入关键词" :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin: 0px -10px 1px 1px">
          <el-button v-hasPermi="['countQuery:inventsorysummaryquery:list']" class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['countQuery:inventsorysummaryquery:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['countQuery:inventsorysummaryquery:export']" class="filter-item" type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>

        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" element-loading-text="Loading。。。" width="100%;" height="465" v-loading="loading"
                border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column fixed align="left" label="序号" type="index" width="50"></el-table-column>
        <el-table-column fixed label="大类" align="left" prop="totalclassify"  min-width="60px;"/>
        <el-table-column fixed label="分类名称" align="left" prop="cbpa07" min-width="80px;"/>
        <el-table-column  label="品牌" align="left" prop="cala08" min-width="80px;"/>
        <el-table-column  label="型号" align="left" prop="cbpb12" min-width="110px;"/>
        <el-table-column  label="UPC" align="left" prop="cbpb15" min-width="110px;"/>
        <el-table-column  label="描述" align="left" prop="cbpb08"  min-width="280px;"/>
        <el-table-column  label="数量" align="right" prop="cbib15" :formatter="rounding" min-width="100px;"/>
        <el-table-column  label="可用库存数量" align="right" prop="lockQty" :formatter="rounding" min-width="100px;"/>
        <!--<el-table-column label="仓库" align="center" prop="cbwa09" min-width="80px;" />-->
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

      <!--<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize" @pagination="onSearch" :page-sizes="[10, 20, 30]"
                />-->
    </div>
  </div>
</template>
<script>
// import x from ''
// import { totalOrderList } from "@/api/saleordermanage";
import { getInnnvsentorsysummaryList,getSwJsGoodsAllList,getSwJsGoodsClassifyAllList,getswJsAllList } from "@/api/statisticAnalysis/index";
export default {
  components: {},
  name: "inventsorysummary",
  data() {
    return {
      dateRange:[],
      tableData: [],
      //下拉列表数据商品
      goodList:[],
      //下拉列表数据商品分类
      cbpaList:[],
      //下拉列表数据品牌
      calaList:[],
      loadingOut:false,
      loadingState:false,
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        total: this.total,
        classId: "",
        cbpb10: "",
        cbpb01: ""
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
      this.queryParams.classId = "";
      this.queryParams.cbpb10 = "";
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
      getInnnvsentorsysummaryList(this.queryParams).then(response => {
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
      // this.loading=true;
      this.download('/countQuery/InventsorysummaryqueryExcelList', {
        ...this.queryParams
      }, `销售库存查询数据_${new Date().getTime()}.xlsx`)
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
      let param={};
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

  },

};
</script>

<style  scoped>
  .insorymay .el-form--inline{
    height:60px !important;
  }
</style>
