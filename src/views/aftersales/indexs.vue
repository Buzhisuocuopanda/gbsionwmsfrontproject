<template>
  <div class="app-container">
    <el-form :inline="true" label-width="70px"  >

      <el-form :inline="true">
        <el-form-item>
          <el-date-picker v-model="dateRange.startTime" type="datetime" placeholder="选择开始日期" value-format="yyyy-MM-dd HH:mm:ss"
                          :default-time="'00:00:00'">
          </el-date-picker>
          ~
          <el-date-picker v-model="dateRange.endTime" type="datetime" placeholder="选择结束日期" value-format="yyyy-MM-dd HH:mm:ss"
                          :default-time="'23:59:59'">
          </el-date-picker>
        </el-form-item>
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="onSearch()">查询</el-button>-->
        <!--          </el-form-item>-->
        <el-form-item label="订单号"   class="item-r" >
          <el-input v-model="orderNo" class="filter-item"  placeholder="订单号" />
        </el-form-item>
      </el-form>

      <!--        <el-form-item label="订单号"   class="item-r" >-->
      <!--          <el-input v-model="orderNo" class="filter-item"  placeholder="订单号" />-->
      <!--        </el-form-item>-->




      <el-form-item style="margin: -5px -10px 1px 1px">
        <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="onSearch">搜索</el-button>
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:sales:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:sales:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:sales:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:sales:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="salesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="是否删除标识，-1未删除 1删除" align="center" prop="deleteFlag" />
      <el-table-column label="客户" align="center" prop="customerId" />
      <el-table-column label="销售订单号" align="center" prop="saleOrderNo" />
      <el-table-column label="商品id" align="center" prop="goodsId" />
      <el-table-column label="问题原因" align="center" prop="question" />
      <el-table-column label="sn" align="center" prop="sn" />
      <el-table-column label="供料单位" align="center" prop="suplierId" />
      <el-table-column label="处理结果" align="center" prop="answerMsg" />
      <el-table-column label="进度" align="center" prop="process" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:sales:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:sales:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改售后对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="是否删除标识，-1未删除 1删除" prop="deleteFlag">
          <el-input v-model="form.deleteFlag" placeholder="请输入是否删除标识，-1未删除 1删除" />
        </el-form-item>
        <el-form-item label="客户" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="销售订单号" prop="saleOrderNo">
          <el-input v-model="form.saleOrderNo" placeholder="请输入销售订单号" />
        </el-form-item>
        <el-form-item label="商品id" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品id" />
        </el-form-item>
        <el-form-item label="问题原因" prop="question">
          <el-input v-model="form.question" placeholder="请输入问题原因" />
        </el-form-item>
        <el-form-item label="sn" prop="sn">
          <el-input v-model="form.sn" placeholder="请输入sn" />
        </el-form-item>
        <el-form-item label="供料单位" prop="suplierId">
          <el-input v-model="form.suplierId" placeholder="请输入供料单位" />
        </el-form-item>
        <el-form-item label="处理结果" prop="answerMsg">
          <el-input v-model="form.answerMsg" placeholder="请输入处理结果" />
        </el-form-item>
        <el-form-item label="进度" prop="process">
          <el-input v-model="form.process" placeholder="请输入进度" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSales, getSales, delSales, addSales, updateSales } from "@/api/system/sales";

export default {
  name: "Sales",
  data() {
    return {
      // 日期范围
      dateRange: {
        startTime: '',
        endTime: ''
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 售后表格数据
      salesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deleteFlag: null,
        customerId: null,
        saleOrderNo: null,
        goodsId: null,
        question: null,
        sn: null,
        suplierId: null,
        answerMsg: null,
        process: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询售后列表 */
    getList() {
      this.loading = true;
      listSales(this.queryParams).then(response => {
        this.salesList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        createTime: null,
        updateTime: null,
        createBy: null,
        updateBy: null,
        deleteFlag: null,
        customerId: null,
        saleOrderNo: null,
        goodsId: null,
        question: null,
        sn: null,
        suplierId: null,
        answerMsg: null,
        process: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加售后";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSales(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改售后";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSales(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSales(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除售后编号为"' + ids + '"的数据项？').then(function() {
        return delSales(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/sales/export', {
        ...this.queryParams
      }, `sales_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
