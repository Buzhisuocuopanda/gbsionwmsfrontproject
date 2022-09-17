<template>
  <!--财务库存明细查询-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
        <el-form-item label="仓库"   class="item-r" >
          <el-input v-model="cbwa09" class="filter-item"  placeholder="仓库" />
        </el-form-item>
        <el-form-item label="库位"   class="item-r" >
          <el-input v-model="cbla09" class="filter-item"  placeholder="库位" />
        </el-form-item>
        <el-form-item label="商品"   class="item-r" >
          <el-input v-model="cbpb01" class="filter-item"  placeholder="商品" />
        </el-form-item>
        <el-form-item label="商品SN"   class="item-r" >
          <el-input v-model="cbig10" class="filter-item"  placeholder="商品SN" />
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
<!--          <el-button type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>-->

        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"   border fit highlight-current-row stripe >
        <el-table-column fixed label="仓库" align="center" prop="cbwa09"  min-width="80px;"/>
        <el-table-column fixed label="库位" align="center" prop="cbla09" min-width="80px;"/>
        <!--<el-table-column  label="大类" align="center" prop="cala08" min-width="120px;"/>-->
        <el-table-column  label="商品分类" align="center" prop="cbpa07" min-width="100px;"/>
        <el-table-column  label="品牌" align="center" prop="cbpb15" min-width="100px;"/>
        <el-table-column  label="型号" align="center" prop="cbpb12"  min-width="240px;"/>
        <el-table-column  label="UPC" align="center" prop="cbpb15" min-width="100px;"/>
        <!--<el-table-column  label="描述" align="center" prop="lockQty" min-width="260px;"/>-->
        <el-table-column label="商品SN" align="center" prop="cbig10" min-width="80px;" />
        <el-table-column  label="入库日期" align="center" prop="cbig15" :formatter="formatTime2" min-width="80px;" />


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
import { getFnInventorysummaryquerysList } from "@/api/statisticAnalysis/index";
import { formatDate2 } from '../../../utils';
export default {
  components: {},
  name: "fnInventorysummaryquerys",
  data() {
    return {
      cbwa09: "",
      cala09: "",
      cbpb01:"",
      cbig10:"",
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
        cala09: "",
        cbpb01: "",
        cbig10:"",
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
    this.onSearch()
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
      this.cbwa09 = "";
      this.cala09 = "";
      this.cbpb01 = "";
      this.cbig10 = "";
      this.queryParams.pageNum = 1;
      this.resetForm("queryParams");
      this.onSearch();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // var neirong = $('#miaoshu').val();


      this.queryParams.pageNum = 1;
      this.onSearch();
    },
    onSearch() {
      this.queryParams.cbwa09 = this.cbwa09;
      this.queryParams.cala09 = this.cala08;
      this.queryParams.cbpb01 = this.cbpb01;
      this.queryParams.cbig10 = this.cbig10;
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
      })
    },
  },
};
</script>

<style lang="" scoped>

</style>
