<template>
  <!--审批记录-->
  <div class="app-container">
    <div class="filter-container approcorde">
      <el-form :inline="true" label-width="70px" style="flex-grow: 0;height: auto;">

        <el-form-item>
          <el-date-picker v-model="dateRange.startTime" type="datetime" placeholder="选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss" :default-time="'00:00:00'">
          </el-date-picker>
          ~
          <el-date-picker v-model="dateRange.endTime" type="datetime" placeholder="选择结束日期"
            value-format="yyyy-MM-dd HH:mm:ss" :default-time="'23:59:59'">
          </el-date-picker>
        </el-form-item>
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="onSearch()">查询</el-button>-->
        <!--          </el-form-item>-->
        <el-form-item label="订单号" class="item-r">
          <el-input v-model="orderNo" class="filter-item" placeholder="订单号" />
        </el-form-item>

        <!--        <el-form-item label="订单号"   class="item-r" >-->
        <!--          <el-input v-model="orderNo" class="filter-item"  placeholder="订单号" />-->
        <!--        </el-form-item>-->




        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button v-hasPermi="['approval:approvalrecords:list']" class="filter-item" type="primary"
            icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="onSearch">搜索</el-button>
          <!--          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="reset">重置</el-button>-->
          <!--          <el-upload-->
          <!--          <el-table-->
          <!--            ref="multipleTable"-->
          <!--            :data="tableData"-->
          <!--            tooltip-effect="dark"-->
          <!--            style="width: 100%"-->
          <!--            border-->
          <!--            @selection-change="handleSelectionChange"-->
          <!--          >-->
          <!--            <el-button type="primary" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >Excel导入</el-button>-->
          <!--          </el-upload>-->
          <!--          <el-button type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>-->
          <!--          <el-button type="primary" v-on:click="downMub()"  style="margin-bottom:0;margin-left: 1em" >导入模板下载</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="orderList" :row-style="{ height: '3px' }" :cell-style="{ padding: '2px' }"
        element-loading-text="Loading。。。" width="100%;" height="490" border fit highlight-current-row stripe style="flex-grow: 1;">
        <el-table-column fixed label="单据类型" align="left" prop="cabraa07" min-width="90px;" />
        <el-table-column fixed label="单据编号" align="left" prop="cabraa14" min-width="120px;" />
        <el-table-column fixed label="客户名称" align="left" prop="cabraa21" min-width="80px;" />
        <el-table-column label="单据日期" align="left" prop="cabraa15" min-width="100px;" :formatter="formatDate" />
        <el-table-column label="审核日期" align="left" prop="cabraa02" min-width="100px;" :formatter="formatDate" />
        <el-table-column v-if="false" label="摘要" align="left" prop="cabraa21" min-width="370px;" />
        <!--        <el-table-column  label="生产数量" align="left" prop="makeQty"  min-width="100px;"/>-->
        <!--        <el-table-column  label="已发货数量" align="left" prop="shippedQty" min-width="100px;"/>-->
        <!--        <el-table-column  label="现有订单数量" align="left" prop="currentOrderQty" min-width="100px;"/>-->
        <!--        <el-table-column  label="类型" align="center" prop="orderTypeMsg" min-width="120px;"/>-->
        <!--        <el-table-column  label="状态" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->
        <el-table-column label="操作" min-width="60px;">
          <template slot-scope="scope">
            <el-button style="margin-left:8px; margin-top: 2px" icon="el-icon-share" size="mini" class="caozuoxiangqeng"
              type="text" v-hasPermi="['approval:approvalrecords:detail']" @click="showDetail(scope.row)">详情</el-button>
            <el-button v-if="scope.row.status == 2" icon="el-icon-s-order" size="mini" type="text"
              @click="auditSaleOrder(scope.row)">反审</el-button>
            <!--            <el-button size="small" type="primary" @click="resetPush(scope.row)">删除</el-button>-->
          </template>

        </el-table-column>
      </el-table>
      <el-pagination :background="true" :page-sizes="[10, 15, 20, 50, 500]" :total="totalItems"
        :current-page.sync="listQuery.pageNum" :page-size.sync="listQuery.pageSize"
        style="padding-top:20px; padding-left: 20px;text-align: right;flex-grow: 0;" layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch" @current-change="onSearch" />
    </div>
  </div>

</template>

<script>
import { records } from "@/api/Approval";
import { auditSaleOrder } from '@/api/saleordermanage'
export default {
  name: "Approvalrecords",
  components: {},
  data() {
    return {
      loading: true,
      value1: '',
      userList: null,
      total: 0,

      totalItems: 0,
      orderNo: "",
      model: "",
      formData: {
        name: "",
      },
      tableData: [],
      loadingOut: false,
      loadingState: false,
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },
      orderList: [],
      // 日期范围
      dateRange: {
        startTime: '',
        endTime: ''
      }, queryParams: {
        pageNum: 1,
        pageSize: 15,
        page: 1,
        size: 15,
        total: this.total,

      },
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

      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

      daterange: ''
    };
  },
  computed: {},
  watch: {
    '$route'() {
      this.onSearch();
    }
  },
  mounted() { // 自动触发写入的函数
    this.onSearch()
  },
  created() {
    //仓库明细初始化
  },
  methods: {
    showDetail(row) {
      // this.$router.push({path: "/approval/saleshowOrderDetail", query: {id: row.id}})
      this.$router.push({ path: "/Salesmanagement/saleshowOrderDetail", query: { id: row.id } })

    },
    /** 反审按钮操作 */
    auditSaleOrder(row) {
      this.$confirm('此操作将反审单据编号为' + row.cabraa14 + '的订单， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          orderId: row.id,
          opeateType: 6
        }
        auditSaleOrder(param).then(response => {
          if (response.code == "200") {
            this.$message.success("提交成功")
            this.onSearch();
            // this.$store.dispatch("tagsView/delView", this.$route)
            // this.$router.push({ path: "/Salesmanagement/SaleOrderGn", query: { id: 1 } })
            // this.$router.go(-1)
          } else {
            // this.$message.error(response.msg)
            // this.$router.go(-1)
          }
        });
      });

    },
    onSubmit() { },
    handleSelectionChange() { },
    formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return "NO"
        } else if (row.status == 4) {
          return "OK"
        }
      }
    },
    onSearch() {
      const param = {
        cabraa14: this.orderNo,
        startTime: this.dateRange.startTime,
        endTime: this.dateRange.endTime,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }
      // console.info(param)
      records(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.orderList = response.data.rows
          this.totalItems = response.data.total
        } else {
          this.deviceList = []
          this.totalItems = 0
        }
      })



    },
    getList() {
      this.loading = true;
      records(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.userList = response.data.rows;
        this.total = response.data.total;
        // //供应商
        // this.postOptions = response.data.content;
        // console.log(this.userList, daterange3369);
        console.log(response, 339688);
        // this.deleteFlag = response.data.rows.deleteFlag;
        this.loading = false;
      }
      );
    },

  },
};
</script>

<style lang="scss" scoped>
.caozuoxiangqeng {
  border: 0 !important;
  padding: 0 !important;
}
.approcorde{
  width:100%;
  display: flex;
  flex-direction: column;
  height: calc(93vh - 85px);
}

</style>
