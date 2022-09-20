<template>
    <div>
      <section ref="print" class="recordImg" id="printRecord">
        <div class="Purchase_caigou">库存初始化</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbie07 }}</span>
            <span class="" style="margin-left:10%;">日期：{{ value.cbie02.slice(0, 10) }}</span>
            <span class="" style="margin-left:10%;">仓库：{{ value.cbwa09 }}</span>
            <span class="" style="margin-left:10%;">币种：{{ value.cala08 }}</span>
        </div>
        <div style="width:97%; margin-left: 2%; margin-top: 1%;">
            <el-table border :header-cell-style="headClasspwbitd" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                v-loading="loading" :data="userList"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cbsa08" key="cbsa08" label="供应商">
                </el-table-column>
                <el-table-column prop="cbla09" key="cbla09" width="110px;" label="库位">
                </el-table-column>
                <el-table-column prop="cbpa07" key="cbpa07" label="商品分类" width="110px">
                </el-table-column>
                <el-table-column prop="cala08" key="cala08" label="品牌" width="55px;">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" width="118px;" label="型号">
                </el-table-column>
                <el-table-column prop="cbpb15" key="cbpb15" width="128px;" label="UPC">
                </el-table-column>
                <el-table-column prop="cbpb08" key="cbpb08" width="250px;" label="描述">
                </el-table-column>
                <el-table-column prop="cbig10" key="cbig10" width="100px;" label="商品SN">
                </el-table-column>
                <el-table-column prop="cbig13" key="cbig13" :formatter="rounding" width="70px;" label=" 价格">
                </el-table-column>
                <el-table-column prop="cbig15" :formatter="formatDate" width="100px;" key="cbig15" label="入库时间">
                </el-table-column>
                <el-table-column prop="cbig12" key="cbig12" label="备注">
                </el-table-column>
            </el-table>

            <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[999999]"
                class="pagintotal" />
            <div style="margin-top:2%;">
                <span class="saomiaojluu">制单(wanghui):</span>
                <span class="saomiaojluuu">审核:</span>
                <span class="saomiaojluuuu">财务:</span>
            </div>
        </div>
         </section>
       <div style="margin-top:5%;">
          <span>
            <el-button style="margin-left:3%;" type="primary" @click="PrintRow">打 印</el-button>
          </span>
          <span>
            <el-button type="primary" style="margin-left:3%;"  @click="handlefanhui">返回</el-button>
          </span>
       </div>
    </div>

</template>
<script>
// import { PurchaseinboundLists } from "@/api/Warehousemanagement/PurchaseWarehousing";
import { PurchaseinboundLists,PurchaseinboundShs } from "@/api/Warehousemanagement/BarcodeInventorydetails";
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
            CBPC01: ""

        };
    },
    watch: {

    },
    created() {
        this.getList();

    },
    methods: {

         //返回按钮
        handlefanhui: function (row) {
            // this.$router.push("/system/user-auth/role/");
            this.$router.push("/system/user-kcmxcshfh/role/");
        },

        //打印
        PrintRow(index, row){
            this.$print(this.$refs.print) 
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
<style src="./BarcodeInventorydetailsxqcss/index.css">
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
