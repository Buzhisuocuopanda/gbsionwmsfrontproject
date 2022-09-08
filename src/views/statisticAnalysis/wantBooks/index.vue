<!-- 缺货登记 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form ref="form" :model="formData" label-width="80px" inline>
      <el-form-item label="商品分类">
        <el-select v-model="formData.goods" placeholder="请选择活动区域" width="100%" clearable filterable >
          <el-option :label="item.label" :value="item.label" v-for=" (item,index) in goodsList" :key="index"></el-option> 
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="formData.brand" placeholder="请选择活动区域" width="100%" clearable filterable>
          <el-option :label="item.cbca08" :value="item.cbca08" v-for=" (item,index) in brandList" :key="index"></el-option> 
        </el-select>
      </el-form-item>
      <el-form-item label="商品">
        <el-select v-model="formData.goods" placeholder="请选择活动区域" width="100%" clearable>
          <el-option :label="item.label" :value="item" v-for=" (item,index) in goodsList" :key="index"></el-option> 
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="序号"
        sortable
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="name" label="大类" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="分类名称"
        sortable
      ></el-table-column>
      <el-table-column prop="address" label="品牌" sortable></el-table-column>
      <el-table-column prop="address" label="型号" sortable></el-table-column>
      <el-table-column prop="address" label="UPC" sortable></el-table-column>
      <el-table-column prop="address" label="描述" sortable></el-table-column>
      <el-table-column prop="address" label="数量" sortable></el-table-column>
      <el-table-column prop="address" label="客户" sortable></el-table-column>
      <el-table-column prop="address" label="日期" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoodsList,getBrandList } from "@/api/statisticAnalysis";
export default {
  components: {},
  data() {
    return {
      formData: {
        goods:"",
        brand:""
      },
      tableData: [], // 表格数据
      goodsList:[], //商品分类列表
      brandList:[] //商品分类列表
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    //初始化数据
    async getList() {
      const res = await getGoodsList()
      this.goodsList = res.data
    //   console.log(res);
    const res1 = await getBrandList()
    console.log(res1);
    this.brandList = res1.data.rows
    console.log(this.brandList);
    },
    onSubmit() {},
  },
};
</script>

<style lang="less" scoped></style>
