<template>
<!--zgl-->
  <!--库存汇总查询-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
        <el-form-item label="仓库"   class="item-r" >
          <el-select style="width: 300px" v-model="cbwa09s" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getStoreSkuList" :loading="loading2">
            <el-option v-for="item in storeSkuList" :key="item.cbwa09" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa09"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="品牌"   class="item-r" >

          <el-select v-model="queryParams.cala08"  style="width: 300px"  filterable placeholder="请选择" :loading="loading3">
            <el-option v-for="item in calaList" :key="item.cala08" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala08"></el-option>
          </el-select>
          <!--<el-input v-model="queryParams.cala08" style="width: 300px" class="filter-item"  placeholder="请输入品牌" />-->
        </el-form-item>
        <!-- multiple-->
        <el-form-item label="商品"   class="item-r" >
          <el-select v-model="queryParams.cbpb01" style="width: 300px" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getGoods" :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cbpb08+item.cbwa12+item.cbpb15" :value="item.cbpb01"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
<!--          <el-button type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>-->

        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"   border fit highlight-current-row stripe >
        <el-table-column fixed label="大类" align="center" prop="totalclassify"  min-width="80px;"/>
        <el-table-column fixed label="分类名称" align="center" prop="cbpa07" min-width="80px;"/>
        <el-table-column  label="品牌" align="center" prop="cala08" min-width="120px;"/>
        <el-table-column  label="型号" align="center" prop="cbpb12" min-width="100px;"/>
        <el-table-column  label="UPC" align="center" prop="cbpb15" min-width="100px;"/>
        <el-table-column  label="描述" align="center" prop="cbpb08"  min-width="240px;"/>
        <el-table-column  label="数量" align="center" prop="cbif09" min-width="100px;"/>
        <el-table-column  label="可用库存数量" align="center" prop="lockQty" min-width="100px;"/>
        <el-table-column label="仓库" align="center" prop="cbwa09" min-width="80px;" />
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

      <!--<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize" @pagination="onSearch" :page-sizes="[10, 20, 30]"
                />-->
    </div>
  </div>
</template>
<script>
// import x from ''
// import { totalOrderList } from "@/api/saleordermanage";
import { getSwJsStoreSkuAllList,getSwJsGoodsAllList,getInventorySummaryList,getswJsAllList } from "@/api/statisticAnalysis/index";
export default {
  components: {},
  name: "inventorySummary",
  data() {
    return {

      //下拉列表数据商品
      goodList:[],
      //下拉列表数据仓库
      storeSkuList:[],
      //下拉列表仓库多选 选中的数据
      cbwa09s:[],
      //下拉列表数据品牌
      calaList:[],
      dateRange:[],
      tableData: [],
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // total: this.total,
        cbwa09: "",
        cala08: "",
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
    this.getStoreSkuList();
    this.getCalaList();
  },
  methods: {
    onSubmit() {},
    handleSelectionChange() {},
  /*  formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return "NO"
        } else if (row.status == 4) {
          return "OK"
        }
      }
    },*/
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.cbwa09 = "";
      this.queryParams.cala08 = "";
      this.queryParams.cbpb01 = "";
      this.queryParams.pageNum = 1;
      this.goodList = [];
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
      getInventorySummaryList(this.queryParams).then(response => {
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
        });
      } else {
        this.goodList = [];
      }
    },
    //下拉列表数据仓库
    getStoreSkuList(query){
      let param={cbwa09:query};
      this.loading3 = true;
      getSwJsStoreSkuAllList(param).then(response => {
        this.loading3 = false;
        if (response.data != null) {
          this.storeSkuList = response.data;
        } else {
          this.storeSkuList = [];
        }
      });
      /*if (query !== '') {

      } else {
        this.storeSkuList = [];
      }*/
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
      });
    },

  },
};
</script>

<style lang="" scoped>

</style>
