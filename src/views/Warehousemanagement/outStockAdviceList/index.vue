<!-- zgl -->
<!-- 调拨建议 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="queryParams" label-width="80px" inline>
      <el-form-item label="仓库"  style="margin-left: 10px"  class="item-r" >
        <el-select style="width: 300px;margin-left: 20px" v-model="queryParams.whId" clearable filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading3">
          <el-option v-for="item in storeSkuList" :key="item.cbwa01" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa01"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号" style="margin-left: 20px">
        <el-input type="text" style="width: 300px;margin-left: 20px" v-model="queryParams.orderNo"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.status" clearable filterable remote reserve-keyword placeholder="请选择" >
          <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 100px">
        <el-button v-hasPermi="['system:outStockAdviceList:list']" type="primary" @click="handleQuery">查询</el-button>
        <el-button v-hasPermi="['system:outStockAdviceList:list']" class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
        <!--<el-button type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>-->
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" height="430" :header-cell-style="headClasspw" :data="tableData" style="width: 100%;margin-top:1em" border :default-sort="{ prop: 'date', order: 'descending' }" v-loading="loading">
      <el-table-column prop="date" label="序号" type="index" sortable width="100" align="left"></el-table-column>
      <el-table-column prop="saleOrderNo" label="商品订单" align="left" sortable></el-table-column>
      <el-table-column prop="description" label="商品描述" align="left" sortable width="300"></el-table-column>
      <el-table-column prop="brand" label="品牌" align="left" sortable></el-table-column>
      <el-table-column prop="whName" label="仓库" align="left" sortable></el-table-column>
      <el-table-column prop="model" label="型号" align="left" sortable></el-table-column>

     <!-- <el-table-column prop="description" label="描述" align="center" width="240px" sortable></el-table-column>-->


      <el-table-column prop="qty" label="数量" :formatter="rounding" align="right" sortable></el-table-column>

   <!--   <el-table-column prop="cbca08" label="客户" align="center" sortable></el-table-column>
      <el-table-column prop="cboe08" :formatter="formatTime" label="日期" align="center" sortable></el-table-column>-->
      <el-table-column prop="status" label="状态" :formatter="formatStateType" sortable align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button v-show="scope.row.status ==2"  size="mini" type="text" class="button-caozuoxougai"
                     v-hasPermi="['system:outStockAdviceList:end']" @click="stockEnd(scope.row)" >调拨
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
      style="padding-top:30px; padding-left: 20px;float: right"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="onSearch"
      @current-change="onSearch"/>
  </div>
</template>

<script>
  import {formatDate2} from '../../../utils';
  import { getoutStockAdviceList,getSwJsStoreSkuAllList,auditOutStockEnd} from "@/api/statisticAnalysis/index";
  export default {
    name: "outStockAdviceList",
    components: {},
    data() {
      return {
        //下拉列表数据仓库
        storeSkuList:[],
        //下拉列表数据商品分类
        cbpaList:[],
        //下拉列表数据品牌
        calaList:[],
        //下拉列表数据商品
        goodList:[],
        queryParams: {
          pageNum: 1,
          pageSize: 15,
          whId:"",
          status:"",
          orderNo:"",
        },
        tableData: [], // 表格数据
        loading:false,
        loading1:false,
        loading2:false,
        loading3:false,
        total:0,
        index:0,
        statusType: [
          {
            value: 1,
            label: '待审核',
          },
          {
            value: 2,
            label: '待调拨',
          },
          {
            value: 3,
            label: '已完成',
          }
        ],
      };
    },
    computed: {},
    mounted() { // 自动触发写入的函数
      this.onSearch();
      this.getStoreSkuList();
    },
    methods: {
    
      rounding(row, column) {
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
      formatStateType(row) {
        if (row != null) {
          if (row.status == 1) {
            return "待审核"
          } else if (row.status == 2) {
            return "待调拨"
          } else if (row.status == 3) {
            return "已完成"
          }
        }
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.queryParams.whId = "";
        this.queryParams.orderNo="";
        this.queryParams.status = "";
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
        getoutStockAdviceList(this.queryParams).then(response => {
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
      stockEnd(row){
        if(this.index == 0){
          this.index =1;
          let param={id:row.id,userId:row.userId};
          auditOutStockEnd(param).then(response => {
            if (response.code == 200) {
              this.index =1;
              this.$message({ message: '调拨成功', type: 'success'});
              row.status = 3;
            } else {
              this.index =1;
              this.$message.error('调拨失败');
            }
          },error => {
            this.index =1;
            this.$message.error('调拨失败');
          });
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
        },error => {
          this.loading3 = false;
        });
      },


    },
  };
</script>

<style lang="less" scoped></style>
