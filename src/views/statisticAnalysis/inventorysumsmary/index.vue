<template>
<!--zgl-->
  <!--商品占用查询-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
      <el-form-item label="商品分类"   class="item-r" >
        <el-input v-model="cbpa07" class="filter-item"  placeholder="商品分类" />
      </el-form-item>

      <el-form-item label="品牌"   class="item-r" >
        <el-input v-model="cala08" class="filter-item"  placeholder="品牌" />
      </el-form-item>
      <el-form-item label="商品"   class="item-r" >
        <el-input v-model="cbpb01" class="filter-item"  placeholder="商品" />
        <!--<el-select v-model="status"  placeholder="商品" class="middle-input">
          <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>-->
      </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
<!--          <el-button type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>-->

        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"   border fit highlight-current-row stripe >
        <el-table-column fixed align="center" label="序号" type="index" width="50"/>
        <el-table-column fixed label="销售订单号" align="center" prop="cboa07"  min-width="80px;"/>
        <el-table-column fixed label="客户" align="center" prop="cbca08" min-width="200px;"/>
        <el-table-column  label="客户订单号" align="center" prop="cboa25" min-width="200px;"/>
        <el-table-column  label="分类" align="center" prop="cbpa07" min-width="100px;"/>
        <el-table-column  label="品牌" align="center" prop="cala08" min-width="60px;"/>
        <el-table-column  label="型号" align="center" prop="cbpb12"  min-width="100px;"/>
        <el-table-column  label="占用数量" align="center" prop="lockQty" min-width="60px;"/>
        <el-table-column  label="订单数量" align="center" prop="cbob09" min-width="60px;"/>
        <el-table-column label="已发数量" align="center" prop="cbob10" min-width="60px;" />
        <el-table-column label="取消数量" align="center" prop="cbob15" min-width="60px;" />
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
import { getInventorysmsmaryList } from "@/api/statisticAnalysis/index";
export default {
  components: {},
  name: "inventorysumsmary",
  data() {
    return {
      cbpa07: "",
      cala08: "",
      cbpb01:"",
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
    this.onSearch()
  },
  methods: {
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
      this.cbpa07 = "";
      this.cala08 = "";
      this.cbpb01 = "";
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
      this.queryParams.cbpa07 = this.cbpa07;
      this.queryParams.cala08 = this.cala08;
      this.queryParams.cbpb01 = this.cbpb01;
      this.loading = true;
      getInventorysmsmaryList(this.queryParams).then(response => {
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
