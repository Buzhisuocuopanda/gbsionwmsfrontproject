<template>

  <!--库存明细查询-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
        <el-form-item label="仓库"   class="item-r" >
          <el-select  v-model="queryParams.cbwa09s" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getStoreSkuList" :loading="loading2">
            <el-option v-for="item in storeSkuList" :key="item.cbwa09" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa09"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位"   class="item-r" >
          <el-select  v-model="queryParams.cbla09s" multiple filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading3">
            <el-option v-for="item in cblaList" :key="item.cbla09" :label="item.cbla09" :value="item.cbla09"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-select v-model="queryParams.cbpb01"  clearable filterable remote reserve-keyword placeholder="请输入关键词"
            :remote-method="getGoods"
            :loading="loadingGood">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品SN"   class="item-r" >
          <el-input v-model="queryParams.cbig10"  class="filter-item"  placeholder="商品SN" />
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="queryParams.status" clearable filterable remote reserve-keyword placeholder="请选择" >
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select v-model="queryParams.groudStatus"  clearable filterable remote reserve-keyword placeholder="请选择" >
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button v-hasPermi="['countQuery:inventorysummaryquerys:list']"  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['countQuery:inventorysummaryquerys:list']"  class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['countQuery:inventorysummaryquerys:export']" class="filter-item"  type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>

        </el-form-item>
      </el-form>
      <el-table  :header-cell-style="headClasspw" :data="inwuquList" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" element-loading-text="Loading。。。" width="100%;" height="430" v-loading="loading"
                border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column  v-if="false" align="center" prop="cbig01"  min-width="80px;"/>
        <el-table-column  label="仓库" align="left" prop="cbwa09"  min-width="80px;"/>
        <el-table-column  label="库位" align="left" prop="cbla09" min-width="110px;"/>
        <!--<el-table-column  label="大类" align="center" prop="cala08" min-width="120px;"/>-->
        <el-table-column  label="商品分类" align="left" prop="cbpa07" min-width="100px;"/>
        <el-table-column  label="品牌" align="left" prop="cala08" min-width="100px;"/>
        <el-table-column  label="型号" align="left" prop="cbpb12"  min-width="240px;"/>
        <el-table-column  label="UPC" align="left" prop="cbpb15" min-width="100px;"/>
        <!--<el-table-column  label="描述" align="center" prop="lockQty" min-width="260px;"/>-->
        <el-table-column label="商品SN" align="left" prop="sn" min-width="90px;" />
        <el-table-column  label="入库日期" align="left" prop="inTime" :formatter="formatTime2" min-width="80px;" />
        <el-table-column prop="status" label="商品状态" :formatter="formatState" sortable align="center"></el-table-column>
        <el-table-column prop="groudStatus" label="上架状态" :formatter="formatStateType" sortable align="center"></el-table-column>

      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[10, 15, 20, 50, 500]"
        :total="total"
        :current-page.sync="queryParams.pageNum"
        :page-size.sync="queryParams.pageSize"
        style="padding-top:25px; padding-left: 20px;float: right"
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
import { getInventorysummaryquerysList,getSwJsGoodsAllList,getSwJsStoreSkuAllList,getSwJsStoreAllList } from "@/api/statisticAnalysis/index";
import { formatDate2 } from '../../../utils';
export default {
  components: {},
  name: "inventorysummaryquerys",
  data() {
    return {
      dateRange:[],
      tableData: [],
      loadingOut:false,
      loadingState:false,
      loading:false,
      loading2:false,
      loading3:false,
      loadingGood:false,
      queryForm:{},
      //商品下拉列表数据
      goodList:[],
      //下拉列表数据仓库
      storeSkuList:[],
      //下拉列表仓库多选 选中的数据
      cbwa09s:[],
      //下拉列表数据库位
      cblaList:[],
      //下拉列表库位多选 选中的数据
      cblas:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        total: this.total,
        cbwa09s: [],
        cbla09s: "",
        cbpb01: "",
        cbig10:"",
        groudStatus:undefined,
        status:undefined,
      },
      inwuquList: [],
      total:0,
      status: [
        {
          value: 1,
          label: '已入库',
        },
        {
          value: 2,
          label: '出库中',
        },
        {
          value: 3,
          label: '已出库',
        }
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

    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch()
    this.getStoreSkuList();
    this.getCblaList();
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

    formatTime2(row){
      return formatDate2(row.inTime);
    },
    formatState(row) {
      if (row != null) {
        if (row.status == 1) {
          return "已入库"
        } else if (row.status == 2) {
          return "出库中"
        }else if (row.status == 3) {
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
    onSubmit() {},
    handleSelectionChange() {},

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbwa09s = [];
      this.queryParams.cbla09s = [];
      this.queryParams.cbpb01 = "";
      this.queryParams.cbig10 = "";
      this.queryParams.groudStatus="";
        this.queryParams.status="";
      this.queryParams.pageNum = 1;
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
      getInventorysummaryquerysList(this.queryParams).then(response => {
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
      this.download('/countQuery/InventorysummaryquerysExcelList', {
        ...this.queryParams
      }, `库存明细查询数据_${new Date().getTime()}.xlsx`)
    },

    //获取下拉列表数据商品
    getGoods(query){
      if (query !== '') {
        let param={cbpb08:query, cbpb15:query, cbpb12:query,};
        this.loadingGood = true;
        getSwJsGoodsAllList(param).then(response => {
          this.loadingGood = false;
          if (response.data != null) {
            this.goodList = response.data;
          } else {
            this.goodList = [];
          }
        },error => {
          this.loadingGood = false;
        });
      } else {
        this.goodList = [];
      }
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
