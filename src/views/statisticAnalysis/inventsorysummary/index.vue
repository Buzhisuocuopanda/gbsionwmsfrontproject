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
          <el-select @change="getGoods" :remote-method="getGoods" v-loadmore="getGoodsloadmore"  v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote  placeholder="请输入关键词"  >
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>
          <!--<el-select v-model="queryParams.cbpb01" style="width: 200px" clearable filterable remote reserve-keyword placeholder="请输入关键词" :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cala08+' - '+item.cbpb12+' - '+item.cbpb08" :value="item.cbpb01"></el-option>
          </el-select>-->
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
        <el-table-column fixed label="分类名称" align="left" prop="cbpa07" min-width="100px;"/>
        <el-table-column  label="品牌" align="left" prop="cala08" min-width="80px;"/>
        <el-table-column  label="型号" align="left" prop="cbpb12" min-width="130px;"/>
        <el-table-column  label="UPC" align="left" prop="cbpb15" min-width="110px;"/>
        <el-table-column  label="描述" align="left" prop="cbpb08"  min-width="400px;"/>
        <el-table-column  label="数量" align="right" prop="cbib15" :formatter="rounding" min-width="100px;"/>
        <el-table-column  label="国内可用库存数量" align="right" prop="lockQty" :formatter="rounding" min-width="100px;"/>
        <!--<el-table-column label="仓库" align="center" prop="cbwa09" min-width="80px;" />-->
        <!--<el-table-column  label="状态" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->
        <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
          <template slot-scope="scope">

            <el-button size="mini" type="text"  class="button-caozuoxougai"
                       @click="addShopping(scope.row)" v-text="judge(scope.row)">
            </el-button>
            <!--v-hasPermi="['system:list:add']"-->
          </template>
        </el-table-column>
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
import { insertgoodsShop,goodsShopList } from "@/api/statisticAnalysis/index";

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
      shoppingList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        total: this.total,
        classId: "",
        cbpb10: "",
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
    this.getgoodsShopList();
    this.getGoods();
  },
  methods: {
    //按钮显示文字
    judge(row){
      if(row.shopping == null||row.shopping == 0){
        return "添加到购物车";
      }else if(row.shopping == 1){
        return "已添加";
      }else if(row.shopping == 2){
        return "添加中。。。";
      }
    },
    //添加到购物车
    addShopping(row){
      if(row.shopping == null||row.shopping == 0){

        let param={goodsId:row.cbpb01};
        insertgoodsShop(param).then(response => {
          row.shopping=2;
          if (response.code == 200) {
            this.$message('');
            this.$message({
              message: '添加成功', type: 'success'});
            row.shopping=1;
            this.shoppingList.push(row);

          } else {
            this.$message.error('添加失败,'+response.msg);
            row.shopping=0;
          }
        },error => {
          this.$message.error('添加失败2,'+response.msg);
          row.shopping=0;
        });
      }else {
        //移除功能，暂时删除
        /*row.shopping=0;
        for(let i=0;i<this.shoppingList.length;i++){
          if(this.shoppingList[i].cbpb01==row.cbpb01){
            this.shoppingList.splice(i,1);
          }
        }*/
      }
    },
    //判断商品是否在购物车中
    contrastShopping(){
      console.log(this.inwuquList,1015)
      console.log(this.shoppingList,1015)
      for(let i=0;i<this.inwuquList.length;i++){

        this.inwuquList[i].shopping = 0;
        let indx =0;
        for(let j=0;j<this.shoppingList.length;j++){
          if(this.inwuquList[i].cbpb01!=null){
            if(this.shoppingList[j].cbpb01==this.inwuquList[i].cbpb01){
              this.inwuquList[i].shopping = 1;
              indx =1;
            }
            if(this.shoppingList[j].goodsId===this.inwuquList[i].cbpb01){
              this.inwuquList[i].shopping = 1;
              indx =1;
            }
          }

        }
        if(indx==0){
          this.inwuquList[i].shopping = 0;
        }
      }
    },
    //获取购物车列表
    getgoodsShopList(){
      goodsShopList().then(response => {
        if (response.data != null) {
          this.shoppingList = response.data;
          // this.contrastShopping();

        } else {
          this.shoppingList = [];
          this.$message.error('购物车数据获取失败');
        }
      },error => {
        this.$message.error('购物车数据获取失败');
      });
    },
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
      this.getGoods();
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
          // this.contrastShopping();
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
