<template>
    <div>
      <section ref="print" class="recordImg" id="printRecord">
        <div class="Purchase_caigou">库存初始化</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbie07 }}</span>
            <span class="" style="margin-left:8%;">日期：{{ value.cbie02.slice(0, 10) }}</span>
            <span class="" style="margin-left:8%;">仓库：{{ value.cbwa09 }}</span>
            <span class="" style="margin-left:8%;">币种：{{ value.cala08 }}</span>
        </div>
        <div style="width:97%; margin-left: 2%; margin-top: 1%;">

            <el-table border :header-cell-style="headClasspwbitd" v-loading="loading" :data="userList"
                 :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cbsa08" key="cbsa08" width="100px;" label="供应商">
                </el-table-column>
                <!-- <el-table-column prop="cbla09" key="cbla09" width="150px;" label="库位">
                </el-table-column> -->
                <el-table-column prop="cbpa07" key="cbpa07" width="110px;" label="商品分类">
                </el-table-column>
                <el-table-column prop="cala08" key="cala08" width="60px;" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" width="140px;" label="型号">
                </el-table-column>
                <el-table-column prop="cbpb15" key="cbpb15" width="120px;" label="UPC">
                </el-table-column>
                <el-table-column prop="cbpb08" key="cbpb08" width="390px;" label="描述">
                </el-table-column>
                <el-table-column prop="cbif09" key="cbif09" align="right" width="50px;" label="数量">
                </el-table-column>
                <el-table-column prop="cbif11" key="cbif11" :formatter="rounding" align="right" width="90" label=" 价格">
                </el-table-column>
                <el-table-column prop="cbif12"  width="100px;" key="cbif12" :formatter="rounding"  align="right"  label="金额">
                </el-table-column>
                <el-table-column prop="cbif13" key="cbif13" label="备注">
                </el-table-column>
            </el-table>
            <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[999999]"
                class="pagintotal" />
        </div>
       <div style="margin-top:5%;">
          <span class="saomiaojluu">制单:</span>
          <span class="saomiaojluuu">审核:</span>
          <span class="saomiaojluuuu">财务:</span>
       </div>
     </section>
       <div style="height:50px;"></div>
       <div style="margin-top:5%;">
            <div v-if="status == 8">
                <el-button style="margin-left:3%;" type="primary" @click="PrintRow">打 印</el-button>
                <el-button  style="margin-left:3%;"  @click="handlefanhui">返回</el-button>
            </div>
            <div v-else>
                <el-button v-if="status == 0" style="margin-left:5%;" type="primary" @click="PurchaseinboundShenpi">审 核</el-button>
                <el-button v-else style="margin-left:5%;" type="primary"  @click="PurchaseinboundFanShenpi">反 审</el-button>
                <el-button  @click="handlefanhui">返回</el-button>
            </div>
       </div>
      <div style="height:50px;"></div>
    </div>
</template>
<script>
// import { PurchaseinboundLists } from "@/api/Warehousemanagement/PurchaseWarehousing";
import { PurchaseinboundLists,PurchaseinboundSH,PurchaseinboundShs } from "@/api/Warehousemanagement/BarcodesSummary";
export default {

    data() {
        return {
            // 遮罩层
            loading: true,
            // 总条数
            total: 0,
            // 用户表格数据
            userList: null,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 999999,
                page: 1,
                size: 999999,
                total: this.total,
                name: undefined,
                address: undefined,
                userId: undefined
            },
            CBPC01: "",
            ids:{
                id:''
            },
            status:'',
        };
    },
    watch: {

    },
    created() {
        this.getList();

    },
    methods: {
        //审批
        PurchaseinboundShenpi() {
            this.$modal.confirm('是否要审批,编号为"' + this.userList[0].cbie07 + '"的数据项？').then(() => {
                PurchaseinboundSH({cbie01:this.ids.id}).then(response => {
                if (response.code == "200") {
                    this.$message({ message: '审批成功', type: 'success' });
                    this.$router.push("/system/user-kchzcshfh/role/");
                }else{
                    this.$message({ message: response.msg, type: 'error' });
                }
                });
            }).catch(() => { });
        },
        //反审
        PurchaseinboundFanShenpi() {
            this.$modal.confirm('是否要反审,编号为"' + this.userList[0].cbie07 + '"的数据项？').then(() => {
                PurchaseinboundShs({cbie01:this.ids.id}).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '反审成功', type: 'success' });
                        this.$router.push("/system/user-kchzcshfh/role/");
                    }else{
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
          //打印
        PrintRow(index, row){
            this.$print(this.$refs.print)
        },

           //返回按钮
        handlefanhui: function (row) {
            // this.$router.push("/system/user-auth/role/");
            this.$router.push("/system/user-kchzcshfh/role/");
        },
        //列表表头设置
        headClasspwbitd() {
            return {
                'text-align': 'left',
                height: '30px',
                padding: '0'
            }
        },
        //列表价格数值
      rounding(row, column) {
        if(parseFloat(row[column.property]).toFixed(2)==null||isNaN(parseFloat(row[column.property]).toFixed(2))){
          return '0.00';
        }
        return parseFloat(row[column.property]).toFixed(2)
      },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection;
            this.idss = selection.map(item => item.cbie01);
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
            const userId = this.$route.params && this.$route.params.cbie01;
            this.ids.id = this.$route.params && this.$route.params.cbie01;
            this.status = this.$route.params && this.$route.params.status;
            if (userId) {
                // 获取表详细信息
                PurchaseinboundLists(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
                    this.userList = res.data.rows;
                    this.total = res.data.total;
                    console.log(res, 888999);
                    this.loading = false;
                });
            }
        },

        //时间的转换
        smallToBig(money) {
            var cnMoney = "零元整";
            var strOutput = "";
            var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
            money += "00";
            var intPos = money.indexOf('.');
            if (intPos >= 0) {
                money = money.substring(0, intPos) + money.substr(intPos + 1, 2);
            }
            strUnit = strUnit.substr(strUnit.length - money.length);
            for (var i = 0; i < money.length; i++) {
                strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(money.substr(i, 1), 1) + strUnit.substr(i, 1);
            }
            cnMoney = strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
            return cnMoney;
        }
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
        }
    }
};
</script>
<style src="./BarcodesSummaryxqcss/index.css">
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
