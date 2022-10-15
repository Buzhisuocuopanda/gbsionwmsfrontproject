<template>
  <!--zgl-->
  <!--财务库存明细查询-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
        <el-form-item label="仓库"   class="item-r" >
          <el-select  v-model="queryParams.cbwa09s" multiple filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading2">
            <el-option v-for="item in storeSkuList" :key="item.cbwa09" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa09"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位"   class="item-r" >
          <el-select  v-model="queryParams.cbla09s" :remote-method="getCblaList"  multiple filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading3">
            <el-option v-for="item in cblaList" :key="item.cbla09" :label="item.cbla09" :value="item.cbla09"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-select @change="getGoods" :remote-method="getGoods" v-loadmore="getGoodsloadmore"  v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote  placeholder="请输入关键词"  >
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>
         <!-- <el-select v-model="queryParams.cbpb01" clearable filterable remote reserve-keyword placeholder="请输入关键词"
                     :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="商品SN"   class="item-r" >
          <el-input v-model="queryParams.cbig10" class="filter-item"  placeholder="商品SN" />
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button v-hasPermi="['query:fnInventorysummaryquery:list']"  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['query:fnInventorysummaryquery:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['query:fnInventorysummaryquery:list']" class="filter-item" type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>

        </el-form-item>
      </el-form>
      <el-table :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" height="460" v-loading="loading"
                 border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column  v-if="false" align="center" prop="cbig01"  min-width="80px;"/>
        <el-table-column fixed label="仓库" align="left" prop="cbwa09"  min-width="80px;"/>
        <el-table-column fixed label="库位" align="left" prop="cbla09" min-width="80px;"/>
        <!--<el-table-column  label="大类" align="center" prop="cala08" min-width="120px;"/>-->
        <el-table-column  label="商品分类" align="left" prop="cbpa07" min-width="100px;"/>
        <el-table-column  label="品牌" align="left" prop="cbpb15" min-width="100px;"/>
        <el-table-column  label="型号" align="left" prop="cbpb12"  min-width="240px;"/>
        <el-table-column  label="UPC" align="left" prop="cbpb15" min-width="100px;"/>
        <!--<el-table-column  label="描述" align="center" prop="lockQty" min-width="260px;"/>-->
        <el-table-column label="商品SN" align="left" prop="cbig10" min-width="80px;" />
        <el-table-column  label="入库日期" align="left" prop="cbig15" :formatter="formatTime2" min-width="80px;" />


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
import { getFnInventorysummaryquerysList,getSwJsStoreSkuAllList,getSwJsStoreAllList,getSwJsGoodsAllList } from "@/api/statisticAnalysis/index";
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
  name: "fnInventorysummaryquerys",
  data() {
    return {
      //下拉列表数据仓库
      storeSkuList:[],
      //下拉列表仓库多选 选中的数据
      cbwa09s:[],
      //下拉列表数据库位
      cblaList:[],
      //下拉列表库位多选 选中的数据
      cblas:[],
      //商品下拉列表数据
      goodList:[],
      dateRange:[],
      tableData: [],
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      queryForm:{},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        cbwa09s: [],
        cbla09s: [],
        cbpb01: "",
        cbig10:"",
      },
      // 商品查询参数
      goodsQueryParams:{
        pageNum: 1,
        pageSize: 10,
        cbpb08:"",
        cbpb15:"",
        cbpb12:""
      },
      inwuquList: [],
      total:0,

    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch();
    this.getStoreSkuList();
    this.getCblaList();
    this.getGoods();
  },
  methods: {
    formatTime2(row){
      return formatDate2(row.cbig15);
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
      this.queryParams.cbwa09s = [];
      this.queryParams.cbla09s = [];
      this.queryParams.cbpb01 = "";
      this.queryParams.cbig10 = "";
      this.queryParams.pageNum = 1;
      this.getGoods();
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
      getFnInventorysummaryquerysList(this.queryParams).then(response => {
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
      this.download('/query/fnInventorysummaryquerysExcelList', {
        ...this.queryParams
      }, `财务库存明细查询数据_${new Date().getTime()}.xlsx`)
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
    //下拉列表数据仓库
    getStoreSkuList(query){
      let param={cbwa09:query};
      this.loading2 = true;
      getSwJsStoreSkuAllList(param).then(response => {
        this.loading2 = false;
        if (response.data != null) {
          this.storeSkuList = response.data;
        } else {
          this.storeSkuList = [];
        }
      },error => {
        this.loading2 = false;
      });
    },
    //下拉列表数据库位
    getCblaList(query){
      let param={pageNum:1,pageSize:1000, cbla09:query};
      this.loading3 = true;
      getSwJsStoreAllList(param).then(response => {
        this.loading3 = false;
        if (response.data != null) {
          this.cblaList = response.data;
        } else {
          this.cblaList = [];
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
