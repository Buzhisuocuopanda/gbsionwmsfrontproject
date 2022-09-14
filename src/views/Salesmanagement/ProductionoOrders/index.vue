<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >
        <el-form-item label="订单号"   class="item-r" >
          <el-input v-model="orderNo" class="filter-item"  placeholder="订单号" />
        </el-form-item>

        <el-form-item label="商品型号"   class="item-r" >
          <el-input v-model="model" class="filter-item"  placeholder="商品型号" />
        </el-form-item>
        <el-form-item label="状态"   class="item-r" >
          <el-select v-model="status"  placeholder="状态" class="middle-input">
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="onSearch">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="reset">重置</el-button>
          <el-upload
            ref="uploadExcel"
            :on-progress="onUploads"
            :action="ExcelUploadUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUploadExcel"
            :headers = "myHeaders"
            style="display: inline">
            <el-button type="primary" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >Excel导入</el-button>
          </el-upload>
          <el-button type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>
          <el-button type="primary" v-on:click="downMub()"  style="margin-bottom:0;margin-left: 1em" >导入模板下载</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="orderList" element-loading-text="Loading。。。" width="100%;" border fit highlight-current-row stripe >
        <el-table-column fixed label="优先级" align="center" prop="priority" min-width="120px;"/>
        <el-table-column fixed label="订单号" align="center" prop="orderNo" min-width="120px;"/>
        <el-table-column  label="型号" align="center" prop="model" min-width="120px;"/>
        <el-table-column  label="描述" align="center" prop="description" min-width="200px;"/>
        <el-table-column  label="订单数量" align="left" prop="orderQty" min-width="100px;"/>
        <el-table-column  label="生产数量" align="left" prop="makeQty"  min-width="100px;"/>
        <el-table-column  label="已发货数量" align="left" prop="shippedQty" min-width="100px;"/>
        <el-table-column  label="现有订单数量" align="left" prop="currentOrderQty" min-width="100px;"/>
        <el-table-column  label="类型" align="center" prop="orderTypeMsg" min-width="120px;"/>
        <el-table-column  label="状态" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>
        <el-table-column label="操作"  min-width="220px;">
        <template slot-scope="scope" >
        <el-button size="small" type="primary" @click="resetPush(scope.row)">修改</el-button>
        <el-button size="small" type="primary" @click="resetPush(scope.row)">删除</el-button>
        </template>

        </el-table-column>
      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[10, 20, 30, 40]"
        :total="totalItems"
        :current-page.sync="listQuery.pageNum"
        :page-size.sync="listQuery.pageSize"
        style="padding-top:40px; padding-left: 20px;float: right"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="onSearch"/>
    </div>
  </div>
</template>
<script>
// import x from ''
import { totalOrderList } from "@/api/saleordermanage";

export default {
  components: {},
  data() {
    return {
      orderNo: "",
      model: "",
      formData: {
        name: "",
      },
      tableData: [],
      loadingOut:false,
      loadingState:false,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      orderList: [],
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
    onSearch() {
      const param = {
        orderNo: this.orderNo,
        model: this.model,
        status: this.status,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }
      // console.info(param)
      totalOrderList(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.orderList = response.data.rows
          this.totalItems = response.data.total
        } else {
          this.deviceList = []
          this.totalItems = 0
        }
      })
    },
  },
};
</script>

<style lang="" scoped></style>
