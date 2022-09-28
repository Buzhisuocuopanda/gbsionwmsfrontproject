<template>
  <!--zgl-->
  <!--库存情况报表-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"   >

        <el-form-item label="仓库"   class="item-r" >
          <el-select  v-model="queryParams.whIds" multiple filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading3">
            <el-option v-for="item in storeSkuList" :key="item.cbwa01" :label="item.cbwa09+' ['+item.cbwa10+']'" :value="item.cbwa01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" style="margin-left: 20px"  class="item-r" >
          <el-select v-model="queryParams.brandIds" multiple  filterable placeholder="请输入关键词" :loading="loading3">
            <el-option v-for="item in calaList" :key="item.cala01" :label="item.cala08+' ['+item.cala09+']'" :value="item.cala01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" style="margin-left: 20px"  class="item-r" >
          <el-select v-model="queryParams.goodsIds" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getGoods" :loading="loading1">
            <el-option v-for="item in goodList" :key="item.cbpb01" :label="item.cbpb08+item.cbwa12+item.cbpb15" :value="item.cbpb01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="日期" style="margin-left: 20px">
          <el-date-picker size="mini" v-model="dateRange" type="daterange" style="height: 32px"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="resetQuery">重置</el-button>
          <el-button type="primary" v-on:click="exprotData()"  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
        </el-form-item>
      </el-form>
      <el-table  :data="inwuquList" element-loading-text="Loading。。。" width="100%;" v-loading="loading"
                 border fit highlight-current-row stripe style="margin-top:1em">
        <el-table-column label="仓库" align="center" header-align="center" prop="cbwa09" min-width="100px;" />
        <el-table-column  label="供应商" align="center" prop="supplieName"  min-width="100px;"/>
        <el-table-column  label="品牌" align="center" prop="brand" min-width="180px;"/>
        <el-table-column  label="大类" align="center" prop="bclass" min-width="120px;"/>
        <el-table-column  label="小类" align="center" prop="sclass" min-width="80px;"/>
        <!--<el-table-column  label="SKU" align="center" prop="qty" min-width="60px;"/>-->
        <el-table-column  label="型号" align="center" prop="model"  min-width="160px;"/>
        <el-table-column  label="期初库存" align="center" prop="firstQty" min-width="100px;"/>
        <el-table-column  label="生产入库" align="center" prop="makeQty" min-width="100px;"/>
       <!-- <el-table-column  label="改型号" align="center" prop="suplierName" min-width="200px;"/>-->
        <el-table-column  label="不良返工" align="center" prop="badQty" min-width="100px;"/>
        <el-table-column  label="累计" align="center" prop="totalQty" min-width="100px;"/>
        <el-table-column  label="销售出库" align="center" prop="outSaleQty" min-width="60px;"/>
        <el-table-column  label="库存" align="center" prop="skuQty" min-width="160px;"/>
        <!--<el-table-column  label="现有订单" align="center" prop="cgRprice" min-width="60px;"/>
        <el-table-column  label="订单分配" align="center" prop="cgRprice" min-width="60px;"/>
        <el-table-column  label="订单缺货" align="center" prop="cbib16" min-width="100px;"/>
        <el-table-column  label="无订单" align="center" prop="cbib16" min-width="100px;"/>-->
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

    </div>
  </div>
</template>
<script>

import { getfnSkuList,getSwJsStoreSkuAllList,getswJsAllList,getSwJsGoodsAllList } from "@/api/statisticAnalysis/index";
//
// import { formatDate } from '../../../utils';
export default {
  name: "fnSkuList",
  data() {
    return {
      //下拉列表数据商品
      goodList:[],
      //下拉列表数据仓库
      storeSkuList:[],
      //下拉列表数据品牌
      calaList:[],
      dateRange:[],
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // total: this.total,
        brandIds: [],
        whIds:[],
        goodsIds:[],
        startTime:"",
        endTime:"",

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
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, start]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            let day = start.getDay();
            let date = start.getDate();
            if (day != 0) {
              start.setDate(date - (day - 1));
            }
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上周',
          onClick(picker) {
            var oDate = new Date()
            oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7);
            let day = oDate.getDay()
            let start = new Date(),
              end = new Date();
            if (day == 0) {
              start.setDate(oDate.getDate());
              end.setDate(oDate.getDate() + 6);
            } else {
              start.setTime(oDate.getTime() - 3600 * 1000 * 24 * (day - 1));
              end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (7 - day));
            }
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setDate(1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上月',
          onClick(picker) {
            var oDate = new Date()
            let year = oDate.getFullYear();
            let month = oDate.getMonth();
            let start, end;
            if (month == 0) {
              year--
              start = new Date(year, 11, 1)
              end = new Date(year, 11, 31)
            } else {
              start = new Date(year, month - 1, 1)
              end = new Date(year, month, 0);
            }
            picker.$emit('pick', [start, end]);
          }
        },
          {
            text: '本季度',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上季度',
            onClick(picker) {
              var oDate = new Date()
              let year = oDate.getFullYear();
              let month = oDate.getMonth() + 1;
              let n = Math.ceil(month / 3); // 季度，上一个季度则-1
              let prevN = n - 1;
              if (n == 1) {
                year--
                prevN = 4;
              }
              month = prevN * 3; // 月份
              const start = new Date(year, month - 3, 1);
              const end = new Date(year, month, 0);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '本年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(0);
              start.setDate(1);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },

    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch();
    this.getStoreSkuList();
    this.getCalaList();
  },
  methods: {
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.brandIds = [];
      this.queryParams.whIds = [];
      this.queryParams.goodsId = [];
      this.dateRange = [];
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
      if(this.dateRange!=null&&this.dateRange.length>=2){
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }else {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }

      this.loading = true;
      getfnSkuList(this.queryParams).then(response => {
        this.loading = false;
        if (response.data != null && response.data.rows != null) {
          this.inwuquList = response.data.rows
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
      this.download('/query/fnSkuListExcelList', {
        ...this.queryParams
      }, `库存情况报表查询数据_${new Date().getTime()}.xlsx`)
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
  },
};
</script>

<style lang="" scoped>

</style>
