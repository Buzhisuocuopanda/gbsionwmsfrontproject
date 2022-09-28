<template>
  <div>
    <div class="Purchase_caigou">销售提货单</div>
    <div class="Purchase_sum">
      <span class="Purchase_bianhao">销售订单号：{{ userList.saleOrderNo || "" }}</span>
      <span class="Purchase_bianhao">编号：{{ userList.orderNo || "" }}</span>
      <span class="Purchase_bianhao">客户订单号：{{ userList.customerNo || "" }}</span>
      <span class="Purchase_riqii">日期：{{ userList.orderDate || "" }}</span>
    </div>
    <div
      style="width: 90%; margin-left: 5%; margin-top: 1%; padding-bottom: 5%"
    >
      <!-- 横向 -->
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">客户</template
          >{{ userList.customerName || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">仓库</template>{{ userList.whName || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">销售人员</template
          >{{ userList.userName || "" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">联系人</template>{{ userList.phone || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">电话</template>{{ userList.phone || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">客户等级</template
          >{{ userList.customerLevel || "" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">结算货币</template
          >{{ userList.currencyMsg || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">收货人</template>{{ userList.receiver || "" }}
        </el-descriptions-item>
        <el-descriptions-item
          label-class-name="my-labell01"
        >
          <template slot="label">收货电话</template
          >{{ userList.receivPhone || "" }}
        </el-descriptions-item>
        <!-- <el-descriptions-item style="visibility: hidden;" label-class-name="my-labell01">
          <template slot="label">销售订单号</template>{{ userList.saleOrderNo }}
        </el-descriptions-item> -->
      </el-descriptions>
      <el-descriptions class="margin-top" title="" :column="3" border>
        <!-- <el-descriptions-item
          content-class-name="my-content"
          label-class-name="my-labell02"
        >
          <template slot="label">收货电话</template
          >{{ userList.receivPhone || "" }}
        </el-descriptions-item> -->
        <el-descriptions-item label-class-name="my-labell02">
          <template slot="label">收货地址</template
          >{{ userList.receiveAdress || "" }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

      <el-table
        v-loading="loading"
        :data="userLists"
        height="250"
        border
        :default-sort="{ prop: 'name', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="supplierId" key="supplierId" label="供应商">
        </el-table-column>
        <el-table-column prop="orderClass" key="orderClass" label="订单分类">
        </el-table-column>
        <el-table-column prop="brand" key="brand" label="品牌">
        </el-table-column>
        <el-table-column prop="model" key="model" label="型号">
        </el-table-column>
        <el-table-column prop="description" key="description" label="描述">
        </el-table-column>
        <!-- goodsNum -->
        <el-table-column label="良品数量">
          <template scope="scope">
            <el-input v-model="scope.row.qty" :readonly="status == 2 || status == 0?true:false"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="qty" key="qty" label="数量"> </el-table-column>
        <el-table-column prop="scanQty" key="scanQty" label="已扫数量">
        </el-table-column>
        <el-table-column prop="price" key="price" label="单价">
        </el-table-column>
        <el-table-column prop="totalPrice" key="totalPrice" label="金额">
        </el-table-column>
        <el-table-column prop="remark" key="remark" label="备注">
        </el-table-column>
      </el-table>
      <div class="saomiaojlu">出库建议表</div>
      <el-descriptions
        class="margin-top"
        style="width: 90%; margin-left: 5%; margin-top: 1%"
        title=""
        :column="3"
        border
      >
        <el-descriptions-item label-class-name="my-labell012">
          <template slot="label">客户</template>{{ userList.customerName }}
        </el-descriptions-item>
      </el-descriptions>
      <el-table
        :header-cell-style="headClass"
        v-loading="loading"
        border
        :data="userListsss"
        style="width: 90%; margin-left: 5%"
        :default-sort="{ prop: 'name', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="index"
          :index="table_index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="brand" key="brand" label="品牌">
        </el-table-column>
        <el-table-column prop="goodClass" key="goodClass" label="类型">
        </el-table-column>
        <el-table-column prop="model" key="model" align="" label="型号">
        </el-table-column>
        <el-table-column
          id="miaos"
          prop="description"
          key="description"
          align=""
          label="描述"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="sn" key="sn" align="" label="SN">
        </el-table-column>
        <el-table-column prop="sku" key="sku" align="" label="库位">
        </el-table-column>
        <el-table-column prop="scanStatus" key="scanStatus" label="扫描状态">
          
        </el-table-column>
      </el-table>

      <div class="saomiaojlu">扫描记录</div>
      <el-table
        style="margin-top: 1%; width: 90%; margin-left: 5%"
        :header-cell-style="headClass"
        v-loading="loading"
        border
        :data="userList1"
        :default-sort="{ prop: 'name', order: 'descending' }"
      >
        <el-table-column
          type="index"
          :index="table_index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="brand" key="brand" label="品牌">
        </el-table-column>
        <el-table-column prop="goodClass" key="goodClass" label="类型">
        </el-table-column>
        <el-table-column prop="model" key="model" align="" label="型号">
        </el-table-column>
        <el-table-column
          id="miaos"
          prop="description"
          key="description"
          align=""
          label="描述"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="sn" key="sn" align="" label="SN">
        </el-table-column>
        <el-table-column prop="sku" key="sku" align="" label="库位">
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[2, 5, 10, 15, 20]"
                class="pagintotal" /> -->

      <!-- <el-descriptions title="" direction="vertical" :column="8.5" border>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" :contentStyle="{ 'text-align': 'center'}"
                    label="品牌">
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" :contentStyle="{ 'text-align': 'center'}"
                    label="型号">
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" label-class-name="my-label"
                    :contentStyle="{ 'text-align': 'center'}" label="描述">

                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="数量"></el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="已扫数量">
                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="单价"></el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="金额"></el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" :contentStyle="{ 'text-align': 'center'}"
                    label="备注"></el-descriptions-item>
            </el-descriptions> -->
      <!--100 -->
      <!-- <el-descriptions title="" direction="vertical" :column="8.5" border v-for="(value, key) in userList"
                :key="key">
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" :contentStyle="{ 'text-align': 'center'}"
                    label="">{{ value.cbpc07 }}
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" :contentStyle="{ 'text-align': 'center'}"
                    label="">EA22VSNH3
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" label-class-name="my-label"
                    :contentStyle="{ 'text-align': 'center'}" label="">
                    J-45 Student J-45 Student J-45 Student
                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="">6</el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="">18100000000
                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="">91.00</el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                    label="">546.00</el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'text-align': 'center'}" :contentStyle="{ 'text-align': 'center'}"
                    label="">苏州市</el-descriptions-item>
            </el-descriptions> -->

      <!-- 横向 -->
      <div style="margin-top: 3%">
        <el-descriptions
          class="margin-top"
          title=""
          :column="2"
          border
          style="margin-top: 3%"
        >
          <el-descriptions-item
            :contentStyle="{ 'text-align': 'right' }"
            :labelStyle="{ 'text-align': 'center' }"
          >
            <template
              :contentStyle="{ 'text-align': 'right' }"
              :labelStyle="{ 'text-align': 'center' }"
              slot="label"
              >本页数量小记</template
            >{{ totalCount }}
          </el-descriptions-item>
          <el-descriptions-item
            :contentStyle="{ 'text-align': 'right' }"
            :labelStyle="{ 'text-align': 'center' }"
          >
            <template
              :contentStyle="{ 'text-align': 'right' }"
              :labelStyle="{ 'text-align': 'center' }"
              slot="label"
              >本页金额小记</template
            >{{ parseFloat(totalPrice).toFixed(2) }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 横向 -->
      <el-descriptions class="margin-top" title="" :column="2" border>
        <el-descriptions-item
          :contentStyle="{ 'text-align': 'right' }"
          :labelStyle="{ 'text-align': 'center' }"
        >
          <template slot="label">合计数量</template>{{ totalCount }}
        </el-descriptions-item>
        <el-descriptions-item
          :contentStyle="{ 'text-align': 'right' }"
          :labelStyle="{ 'text-align': 'center' }"
        >
          <template slot="label">合计金额</template
          >{{ parseFloat(totalPrice).toFixed(2) }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 横向 -->
      <el-descriptions class="margin-top" title="" border>
        <el-descriptions-item
          label-class-name="my-label"
          :contentStyle="{ 'text-align': 'left' }"
          :labelStyle="{ 'text-align': 'center' }"
        >
          <template slot="label">大写</template>人民币:{{
            smallToBig(totalPrice)
          }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="height: 20px"></div>
    <div style="margin-left: 5%">
      <el-button v-show="status == 1" type="primary" @click="PrintRows"
      >审 核</el-button
    >
      <el-button v-show="status == 2" type="primary" @click="PrintRowss"
        >反 审</el-button
      >
      <!-- <el-button v-if="checkStatus == 1" type="primary" @click="PrintRow">质 检</el-button> -->
      <el-button type="primary" @click="handlefanhui">返 回</el-button>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>
<script>
import {
  Purchaseinbounddingdanxq,
  auditTakeOrder,
  auditTakeOrders,
} from "@/api/Warehousemanagement/Saleslading";
export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: {},
      userLists: [],
      userList1: [],
      userListsss:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        page: 1,
        size: 10,
        total: this.total,
        name: undefined,
        address: undefined,
        userId: undefined,
      },
      CBPC01: "",
      paramss: {
        goods:[],
        opType: "",
        takeOrderId: "",
        userId: "",
      },
      // 订单状态
      status:'',
      // 质检状态
      checkstatus:'',
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    //列表表头设置
    headClass() {
      return {
        "text-align": "center",
        height: "30px",
        padding: "0",
      };
    },
    //序号
    table_index(index) {
      return (
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
      );
    },
    //返回按钮
    handlefanhui: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$router.push("/Warehousemanagement/Saleslading/");
    },
    // 审核
    PrintRows(row) {
      this.paramss.opType = 1;
      this.changeMoreArrary()
      auditTakeOrder(this.paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "审批成功", type: "success" });
          this.$router.push("/Warehousemanagement/Saleslading/");
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    // 反审
    PrintRowss(row) {
      this.paramss.opType = 3;
      this.changeMoreArrary();
      auditTakeOrder(this.paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "反审成功", type: "success" });
          this.$router.push("/Warehousemanagement/Saleslading/");
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    // 质检
    PrintRow(index, row) {
      this.paramss.opType = 6;
      this.changeMoreArrary()
      auditTakeOrder(this.paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "质检完成成功", type: "success" });
          this.$router.push("/Warehousemanagement/Saleslading/");
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    // 处理多条数据
    changeMoreArrary(){
      let obj = {
        "goodQty": 0,
        "plId": 0
      }
      this.paramss.goods = this.userLists.map(item =>{
        obj.goodQty = item.qty;
        obj.plId = item.cbplId;
        return obj
      })
      console.log(this.paramss.goods,'4444')
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection;
      this.idss = selection.map((item) => item.cbpc01);
      this.shenpiids = selection;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    //父子页面传值
    getParams() {
      let routerParams = this.$route.query;
      this.cbpc01 = routerParams.data;
      // console.log(this.cbpc01, 852369);
    },

    //详情列表
    getList() {
      this.loading = true;
      const userId = this.$route.params && this.$route.params.cbpc01;
      this.status = this.$route.params && this.$route.params.status;
      this.checkstatus = this.$route.params && this.$route.params.checkStatus;
      console.log(this.$route.params,'路由');
      this.paramss.takeOrderId = Number(userId);
      if (userId) {
        // 获取表详细信息
        Purchaseinbounddingdanxq(
          userId,
          this.addDateRange(this.queryParams, this.dateRange)
        ).then((res) => {
          this.userList = res.data;
          this.userLists = res.data.goods;
          this.userList1 = res.data.scans;
          this.userListsss = res.data.sugests;
          this.paramss.userId = res.data.userId;
          // this.total = res.data.total;
          console.log(res, 888999,this.userListss);
          this.loading = false;
          console.log(res.data, this.userList);
        });
      }
    },

    //时间的转换
    smallToBig(money) {
      var cnMoney = "零元整";
      var strOutput = "";
      var strUnit = "仟佰拾亿仟佰拾万仟佰拾元角分";
      money += "00";
      var intPos = money.indexOf(".");
      if (intPos >= 0) {
        money = money.substring(0, intPos) + money.substr(intPos + 1, 2);
      }
      strUnit = strUnit.substr(strUnit.length - money.length);
      for (var i = 0; i < money.length; i++) {
        strOutput +=
          "零壹贰叁肆伍陆柒捌玖".substr(money.substr(i, 1), 1) +
          strUnit.substr(i, 1);
      }
      cnMoney = strOutput
        .replace(/零角零分$/, "整")
        .replace(/零[仟佰拾]/g, "零")
        .replace(/零{2,}/g, "零")
        .replace(/零([亿|万])/g, "$1")
        .replace(/零+元/, "元")
        .replace(/亿零{0,3}万/, "亿")
        .replace(/^元/, "零元");
      return cnMoney;
    },
  },
  mounted() {
    this.getParams();
  },
  computed: {
    totalCount: function () {
      var totalCount = 0;
      for (let i = 0; i < this.userList.length; i++) {
        totalCount += this.userList[i].cbpd09;
      }
      return totalCount;
    },
    totalPrice: function () {
      var totalPrice = 0;
      for (let i = 0; i < this.userList.length; i++) {
        totalPrice += this.userList[i].cbpd09 * this.userList[i].cbpd11;
      }
      return totalPrice;
    },
  },
};
</script>
<style src="./Salesladingxqcss/index.css"></style>
