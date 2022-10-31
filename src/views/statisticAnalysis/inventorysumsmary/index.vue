<template>
<!--zgl-->
  <!--商品占用查询-->
  <div class="app-container inventsumarys">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
      <el-form-item label="商品分类"   class="item-r" >
        <el-select v-model="queryParams.cbpa07"  style="width: 200px" clearable  filterable placeholder="请输入关键词" :loading="loading3">
          <el-option v-for="item in cbpaList" :key="item.cbpa07" :label="item.cbpa07+' ['+item.cbpa11+']'" :value="item.cbpa07"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="品牌"   class="item-r" >
        <el-select v-model="queryParams.cala08"  style="width: 200px" clearable  filterable placeholder="请输入关键词" :loading="loading2">
          <el-option v-for="item in calaList" :key="item.cala08" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala08"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品"   class="item-r" >
        <el-select @change="getGoods" :remote-method="getGoods" v-el-select-loadmore="getGoodsloadmore"  v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote  placeholder="请输入关键词"  >
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
        </el-select>
        <!--<el-select v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading1">
          <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
        </el-select>-->
      </el-form-item>

        <el-form-item style="margin: 0px -10px 1px 1px">
          <el-button v-hasPermi="['countQuery:inventorysumsmaryquery:list']" class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button v-hasPermi="['countQuery:inventorysumsmaryquery:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button v-hasPermi="['countQuery:inventorysumsmaryquery:export']" class="filter-item" type="primary" v-on:click="exprotData()"
                    style="margin-bottom:0;margin-left: 1em">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" height="460" v-loading="loading"
                border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column  align="center" label="序号" type="index" width="50"/>
        <el-table-column  label="销售订单号" align="left" prop="cboa07"  min-width="110px;"/>
        <el-table-column  label="客户" align="left" prop="cbca08" min-width="180px;"/>
        <el-table-column  label="客户订单号" align="left" prop="cboa25" min-width="150px;"/>
        <el-table-column  label="分类" align="left" prop="cbpa07" min-width="90px;"/>
        <el-table-column  label="品牌" align="left" prop="cala08" min-width="60px;"/>
        <el-table-column  label="型号" align="left" prop="cbpb12"  min-width="130px;"/>
        <el-table-column  label="未发货数量" align="right" :formatter="rounding"  prop="lockQty" min-width="60px;"/>
        <el-table-column  label="订单数量" align="right" :formatter="rounding"  prop="cbob09" min-width="60px;"/>
        <el-table-column label="已发数量" align="right" :formatter="rounding"  prop="cbob10" min-width="60px;" />
        <el-table-column label="取消数量"  align="right" :formatter="rounding" prop="cbob15" min-width="60px;" />
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
import { getInventorysmsmaryList,getswJsAllList,getSwJsGoodsAllList,getSwJsGoodsClassifyAllList } from "@/api/statisticAnalysis/index";
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
  name: "Inventorysumsmary",
  data() {
    return {

      formData: {
        name: "",
      },
      dateRange:[],
      tableData: [],
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        total: this.total,
        cbwa09: "",
        cala08: "",
        cbpb01: ""
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
      //下拉列表数据商品
      goodList:[],
      //下拉列表数据品牌
      calaList:[],
      //下拉列表数据商品分类
      cbpaList:[],
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
    this.getCalaList();
    this.getCbpaList();
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
      this.queryParams.cbpa07 = "";
      this.queryParams.cala08 = "";
      this.queryParams.cbpb01 = "";
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
      getInventorysmsmaryList(this.queryParams).then(response => {
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
      this.download('/countQuery/InventorysmsmaryquerysExcelList', {
        ...this.queryParams
      }, `商品占用查询数据_${new Date().getTime()}.xlsx`)
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

  },
};
</script>

<style  scoped>
.inventsumarys .el-form--inline {
    height: 60px !important;
  }
</style>
