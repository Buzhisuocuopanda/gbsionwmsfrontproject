<template>
  <div>
    <div>
      <div class="Purchase_caigou">销售出库单</div>
      <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
        <span class="Purchase_bianhao">编号：{{ value.cbsb07 }}</span>
        <span class="Purchase_bianhao" style="margin-left: 15%">客户订单号：{{ value.cbsb30 }}</span>
        <span class="Purchase_riqii">日期：{{ value.cbsb08.slice(0, 10) }}</span>
      </div>
      <div style="width: 90%; margin-left: 5%; margin-top: 1%">
        <!-- 横向 -->
        <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
          :key="key">
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">客户</template>{{ value.cbca08 }}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">仓库</template>{{ value.cbwa09 }}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">销售人员</template>{{ value.caua15 }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
          :key="key">
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">联系人</template>{{ value.cbsb18 }}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">电话</template>{{ value.cbsb19 }}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">客户等级</template>{{ value.cbca28 }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
          :key="key">
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">结算货币</template>{{ value.cny }}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">收货人</template>{{ value.cbsb18 }}
          </el-descriptions-item>
          <!-- <el-descriptions-item label-class-name="my-labell01">
            <template slot="label">关联订单/提货单</template>{{ value.cbsb31 }}
          </el-descriptions-item> -->
        </el-descriptions>
        <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
          :key="key">
          <el-descriptions-item content-class-name="my-content" label-class-name="my-labell02">
            <template slot="label">收货电话</template>{{ value.cbsb19 }}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-labell02">
            <template slot="label">收货地址</template>{{ value.cbsb21 }}
          </el-descriptions-item>
        </el-descriptions>

        <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

        <el-table v-loading="loading" :data="userList" :header-cell-style="headClass" border
          :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">
          <!-- <el-table-column prop="cbsa08" key="cbsa08" label="供应商">
          </el-table-column>
          <el-table-column prop="cbsc17" key="cbsc17" label="订单分类">
            <template scope="scope">
              <div>
                {{
                    scope.row.cbsc17 == 1
                      ? "国际订单"
                      : scope.row.cbsc17 == 2
                        ? "国内订单"
                        : "状态不确定"
                }}
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="cala08" key="cala08" label="品牌">
          </el-table-column>
          <el-table-column prop="cbpb12" key="cbpb12" label="型号" width="180">
          </el-table-column>
          <el-table-column prop="cbpb08" key="cbpb08" label="描述" width="320">
          </el-table-column>
          <el-table-column prop="cbsc09" key="cbsc09" label="数量">
          </el-table-column>
          <el-table-column prop="saoma" key="saoma" label="已扫数量">
          </el-table-column>
          <el-table-column prop="cbsc11" key="cbsc11" align="right" label="单价">
            <template slot-scope="scope">
              <div style="text-align: left">
              {{ parseFloat(scope.row.cbsc11 == null ? 0 : scope.row.cbsc11).toFixed(2) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cbsc12" key="cbsc12" align="right" label="金额">
            <template slot-scope="scope">
              <div style="text-align: left">
              {{ parseFloat(scope.row.cbsc12 == null ? 0 : scope.row.cbsc12).toFixed(2) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cbsc13" key="cbsc13" label="备注">
          </el-table-column>
        </el-table>
        <!-- 横向 -->
        <div style="margin-top: 3%">
          <el-descriptions class="margin-top" title="" :column="2" border style="margin-top: 3%">
            <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
              <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                slot="label">本页数量小记</template>{{ totalCount }}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
              <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                slot="label">本页金额小记</template>{{ parseFloat(totalPrice).toFixed(2) }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 横向 -->
        <el-descriptions class="margin-top" title="" :column="2" border>
          <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
            <template slot="label">合计数量</template>{{ totalCount }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
            <template slot="label">合计金额</template>{{ parseFloat(totalPrice).toFixed(2) }}
          </el-descriptions-item>
        </el-descriptions>

        <!-- 横向 -->
        <el-descriptions class="margin-top" title="" border>
          <el-descriptions-item label-class-name="my-label" :contentStyle="{ 'text-align': 'left' }"
            :labelStyle="{ 'text-align': 'center' }">
            <template slot="label">大写</template>人民币:{{
                smallToBig(totalPrice)
            }}
          </el-descriptions-item>
        </el-descriptions>
        <div>
          <span class="saomiaojluu">制单:</span>
          <span class="saomiaojluuu">审核:</span>
          <span class="saomiaojluuuu">财务:</span>
        </div>
      </div>
      <div class="saomiaojlu" style="margin-top:3%">出库建议表</div>
      <el-descriptions class="margin-top" style="width: 90%; margin-left: 5%; margin-top: 1%" title="" :column="3"
        border v-for="(value, key) in userList.slice(0, 1)" :key="key">
        <el-descriptions-item label-class-name="my-labell012">
          <template slot="label">客户</template>{{ value.cbca08 }}
        </el-descriptions-item>
      </el-descriptions>
      <el-table :header-cell-style="headClass" v-loading="loading" border :data="userList[0].outsuggestion"
        style="width: 90%; margin-left: 5%" :default-sort="{ prop: 'name', order: 'descending' }"
        @selection-change="handleSelectionChange">
        <el-table-column type="index" :index="table_index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="brand" key="brand" label="品牌">
        </el-table-column>
        <el-table-column prop="goodClass" key="goodClass" label="类型">
        </el-table-column>
        <el-table-column prop="model" key="model" align="" label="型号">
        </el-table-column>
        <el-table-column id="miaos" prop="description" key="description" align="" label="描述" width="300">
        </el-table-column>
        <el-table-column prop="sn" key="sn" align="" label="SN">
        </el-table-column>
        <!-- <el-table-column prop="sku" key="sku" align="" label="库位">
        </el-table-column> -->
        <el-table-column prop="scanStatus" key="scanStatus" label="扫描状态">
          <!-- <template scope="scope">
            <div>
              {{
                scope.row.saoma == 1
                  ? "已扫描"
                  : scope.row.saoma == 0
                  ? "未扫描"
                  : "未扫描"
              }}
            </div>
          </template> -->
        </el-table-column>
      </el-table>

      <div class="saomiaojlub" style="margin-top:3%">扫描记录</div>
      <el-table style="margin-top: 1%; width: 90%; margin-left: 5%" :header-cell-style="headClass" v-loading="loading"
        border :data="userListed" :default-sort="{ prop: 'name', order: 'descending' }"
        @selection-change="handleSelectionChange">
        <el-table-column type="index" :index="table_index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="pinpai" key="pinpai" label="品牌">
        </el-table-column>
        <el-table-column prop="lx" key="lx" label="类型">
        </el-table-column>
        <el-table-column prop="cbpb12" key="cbpb12" align="" label="型号">
        </el-table-column>
        <el-table-column id="miaos" prop="cbpb08" key="cbpb08" align="" label="描述" width="300">
        </el-table-column>
        <el-table-column prop="sn" key="sn" align="" label="SN">
        </el-table-column>
        <!-- <el-table-column prop="kwm" key="kwm" align="" label="库位">
        </el-table-column> -->
      </el-table>
    </div>
    <div style="height: 50px"></div>
    <div v-if="status == 8">
      <el-button style="margin-left: 5%" type="primary" @click="handleExport">导出</el-button>
      <el-button style="margin-left: 3%" type="primary" @click="xiaoschukudandayin">销售出库单打印</el-button>
      <el-button style="margin-left: 3%" type="primary" @click="xiaoschukujianyibiao">出库建议表打印</el-button>
      <el-button style="margin-left: 3%" type="primary" @click="xiaoschukusaomiaojlubiao">扫描记录表打印</el-button>
      <el-button @click="handlefanhui">返回</el-button>
    </div>
    <div v-else>
      <el-button v-if="status == 0" style="margin-left:5%;" type="primary" @click="PurchaseinboundShenpi">审 核
      </el-button>
      <el-button v-else type="primary" style="margin-left:5%;" @click="PurchaseinboundFanShenpi">反 审</el-button>
      <el-button v-show="status != 4 && status != 0" type="primary" @click="PurchaseinboundQuxiaoWangcheng">标记完成
      </el-button>
      <!-- <el-button v-show="status == 4" type="primary" @click="PurchaseinboundBiaojiWancheng">取消完成</el-button> -->
      <el-button @click="handlefanhui">返回</el-button>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import { PurchaseinboundLists, PurchaseinboundSH, PurchaseinboundShs, PurchaseinboundShss, Purchaseinbounds, saleoutOrderdetailsexport1 } from "@/api/Warehousemanagement/SalesShipment";
export default {
  name: 'AuthUser',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      userListed: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 99999,
        page: 1,
        size: 99999,
        total: this.total,
        name: undefined,
        address: undefined,
        userId: undefined,
      },
      CBPC01: "",
      ids: {
        id: ''
      },
      status: '',
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    // 标记完成
    PurchaseinboundQuxiaoWangcheng() {
      this.$modal.confirm('是否要标记,编号为"' + this.userList[0].cbsb07 + '"的数据项？').then(() => {
        PurchaseinboundShss({
          cbsb01: this.ids.id
        }).then(response => {
          if (response.code == "200") {
            this.$message({ message: '标记成功', type: 'success' });
            // this.$router.push("/system/user-xsckfh/role/");
            this.$tab.closePage();
            this.$router.go(-1);
          }
        });
      }).catch(() => { });
    },
    // 取消标记
    PurchaseinboundBiaojiWancheng() {
      this.$modal.confirm('是否要取消标记,编号为"' + this.userList[0].cbsb07 + '"的数据项？').then(() => {
        Purchaseinbounds({
          cbsb01: this.ids.id
        }).then(response => {
          if (response.code == "200") {
            this.$message({ message: '取消标记成功', type: 'success' });
            // this.$router.push("/system/user-xsckfh/role/");
            this.$tab.closePage();
            this.$router.go(-1);
          }
        });
      }).catch(() => { });
    },
    //审批
    PurchaseinboundShenpi() {
      this.$modal.confirm('是否要审批,编号为"' + this.userList[0].cbsb07 + '"的数据项？').then(() => {
        PurchaseinboundSH({
          cbsb01: this.ids.id
        }).then(response => {
          if (response.code == "200") {
            this.$message({ message: '审批成功', type: 'success' });
            // this.$router.push("/system/user-xsckfh/role/");
            this.$tab.closePage();
            this.$router.go(-1);
          }
        });
      }).catch(() => { });
    },
    //反审
    PurchaseinboundFanShenpi() {
      this.$modal.confirm('是否要反审,编号为"' + this.userList[0].cbsb07 + '"的数据项？').then(() => {
        PurchaseinboundShs({
          cbsb01: this.ids.id
        }).then(response => {
          if (response.code == "200") {
            this.$message({ message: '反审成功', type: 'success' });
            // this.$router.push("/system/user-xsckfh/role/");
            this.$tab.closePage();
            this.$router.go(-1);
          }
        });
      }).catch(() => { });
    },
    handlefanhui() {
      // this.$router.push("/system/user-xsckfh/role/");
      this.$tab.closePage();
      this.$router.go(-1);
    },
    //写在methods里面的方法 ---出库建议表
    PrintRow(index, row) {
      this.$print(this.$refs.print);
    },
    //扫描记录表
    PrintRowsaomiao(index, row) {
      this.$print(this.$refs.printt);
    },
    //销售出库单表
    PrintRoxiaos(index, row) {
      this.$print(this.$refs.printtt);
    },
    //序号
    table_index(index) {
      return (
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
      );
    },
    //列表表头设置
    headClass() {
      return {
        "text-align": "center",
        height: "30px",
        padding: "0",
      };
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
      console.log(this.cbpc01, 852369);
    },

    //详情列表
    getList() {
      this.loading = true;
      const userId = this.$route.params && this.$route.params.cbsb01;
      this.ids.id = this.$route.params && this.$route.params.cbsb01;
      this.status = this.$route.params && this.$route.params.status;
      if (userId) {
        // 获取表详细信息
        PurchaseinboundLists(
          userId,
          this.addDateRange(this.queryParams, this.dateRange)
        ).then((res) => {
          this.userList = res.data.rows;
          this.userListed = res.data.rows[0].goods;
          this.total = res.data.total;
          console.log(res, 888999);
          this.loading = false;
        });
      }
    },

    //销售出库单详情打印
    xiaoschukudandayin() {
      const userId = this.$route.params && this.$route.params.cbsb01;
      this.printing("/system/Selloutofwarehouse/saleoutOrderdetailsexport1", { orderId: userId }, 'pdf')

      // const userId = this.$route.params && this.$route.params.cbsb01;
      // saleoutOrderdetailsexport1({orderId:userId}).then((response) =>{
      //   const content = response
      //   console.log(content)
      //   // 主要的是在这里的转换，必须要加上{ type: 'application/pdf' }
      //   // 要不然无法进行打印
      //   const blob = new Blob([content], { type: 'application/pdf' })
      //   var date = (new Date()).getTime()
      //   var ifr = document.createElement('iframe')
      //   ifr.style.frameborder = 'no'
      //   ifr.style.display = 'none'
      //   ifr.style.pageBreakBefore = 'always'
      //   ifr.setAttribute('id', 'printPdf' + date)
      //   ifr.setAttribute('name', 'printPdf' + date)
      //   ifr.src = window.URL.createObjectURL(blob)
      //   document.body.appendChild(ifr)
      //   this.doPrint('printPdf' + date)
      //   window.URL.revokeObjectURL(ifr.src) // 释放URL 对象

      // })


      // this.download(
      //   "/system/Selloutofwarehouse/saleoutOrderdetailsexport1?orderId=" +
      //   userId,
      //   {},
      //   `销售出库单详情— ${new Date().toLocaleDateString()}.pdf`
      // );
    },
    // 打印
    doPrint(val) {
      var ordonnance = document.getElementById(val).contentWindow
      setTimeout(() => {
        // window.print()
        ordonnance.print()
        // this.pdfLoading = false
      }, 100)
    },
    //PurchaseinListsaomiaojilubiao

    //销售出库建议表打印1
    xiaoschukujianyibiao() {
      const userId = this.$route.params && this.$route.params.cbsb01;
      this.printing("/system/Selloutofwarehouse/saleoutOrderdetailsuggestsexport1", { orderId: userId }, 'pdf')
      // this.download(
      //   "/system/Selloutofwarehouse/saleoutOrderdetailsuggestsexport1?orderId=" +
      //   userId,
      //   {},
      //   `销售出库建议表— ${new Date().toLocaleDateString()}.pdf`
      // );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "商品分类";
      this.upload.open = true;
    },

    /** 扫描记录表打印 */
    xiaoschukusaomiaojlubiao() {
      const userId = this.$route.params && this.$route.params.cbsb01;
      this.printing("/system/Selloutofwarehouse/salescanOrderdetailsuggestsexport1", { orderId: userId }, 'pdf')
      // this.download(
      //   "/system/Selloutofwarehouse/salescanOrderdetailsuggestsexport1?orderId=" +
      //   userId,
      //   {},
      //   `扫描记录表—_${new Date().toLocaleDateString()}.pdf`
      // );
    },

    /** 导出按钮操作 */
    handleExport() {
      const userId = this.$route.params && this.$route.params.cbsb01;
      this.download(
        "/system/Selloutofwarehouse/saleoutOrderdetailsexport?orderId=" +
        userId,
        {
          ...this.queryParams,
        },
        `user_${new Date().toLocaleDateString()}.xlsx`
      );
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
        totalCount += this.userList[i].cbsc09;
      }
      return totalCount;
    },
    totalPrice: function () {
      var totalPrice = 0;
      for (let i = 0; i < this.userList.length; i++) {
        totalPrice += this.userList[i].cbsc09 * this.userList[i].cbsc11;
      }
      return totalPrice;
    },
  },
};
</script>
<style src="./SalesShipmentxqcss/index.css" scoped>

</style>
<style>
@page {
  size: auto;
  margin: 3mm;
}

@media print {
  html {
    background-color: #ffffff;
    height: auto;
    margin: 0px;
  }

  body {
    border: solid 1px #ffffff;
    /* margin: 10mm 15mm 10mm 15mm; */
  }

  #printRecord table {
    table-layout: auto !important;
  }

  /**  内容描述 */
  /* #printRecord .el-table__body .el-table__row .el-table_1_column_3 .cell{
      width: 280 !important;
   } */
  /**  表头描述  */
  /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_3 .cell{
      width: 280 !important;
    } */
  /** 型号内容 */
  /* #printRecord .el-table__body .el-table__row .el-table_1_column_2 .cell{
       width: 200 !important;
    } */

  /** 表头型号 */
  /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_2 .cell{
     width: 200 !important;
    } */

  /** 表头品牌 */
  /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_1 .cell{
         width: 60 !important;
   } */
  /** 品牌内容 */
  /* #printRecord .el-table__body .el-table__row .el-table_1_column_1 .cell{
       width: 60 !important;
   } */

  /** 表头数量 */
  /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_4 .cell{
 
   } */

  #printRecord .el-table__header-wrapper .el-table__header {
    width: 100% !important;
    border: solid 1px #f2f2f2;
  }

  #printRecord .el-table__body-wrapper .el-table__body {
    width: 100% !important;
  }

  #printRecord #pagetable table {
    table-layout: fixed !important;
  }
}
</style>
