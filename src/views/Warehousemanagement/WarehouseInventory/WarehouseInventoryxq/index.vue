<template>
    <div>
      <section ref="print" class="recordImg" id="printRecord">
        <div class="Purchase_caigou">仓库盘点表</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbsh07 }}</span>
            <span class="Purchase_riqii">日期：{{ value.cbsj03.slice(0, 10) }}</span>
        </div>
        <div style="width:90%; margin-left: 5%; margin-top: 1%;">
            <!-- 横向 -->
            <!-- <el-descriptions class="margin-top" title="" :column="4" border v-for="(value, key) in userList.slice(0, 1)"
                :key="key">
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">客户</template>{{
                    value.cbsa08
                    }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">仓库</template>{{ value.cbwa09 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">结算货币</template>USD
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">关联订单</template>USD
                </el-descriptions-item>
            </el-descriptions> -->


            <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

            <el-table v-loading="loading" :data="userList"
            :header-cell-style="headClass"
            :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cala08" key="cala08" label="品牌" width="100">
                </el-table-column>
                <el-table-column prop="cbpb15" key="cbpb15" label="UPC" width="120">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" label="型号" width="110">
                </el-table-column>
                <el-table-column prop="cbpb08" width="auto" key="cbpb08" label="描述">
                </el-table-column>
                <el-table-column prop="cbsj09" key="cbsj09" label="商品SN" width="110">
                </el-table-column>
                <el-table-column prop="cbla09" key="cbla09" label="库位" width="110">
                </el-table-column>
                <el-table-column prop="cbsj11" key="cbsj12" label="状态">
                    <template scope="scope">
                        <div>
                            {{
                            scope.row.cbsj11 == 0
                            ? "已入库"
                            : scope.row.cbsj11 == 1
                            ? ""
                            : ""
                            }}
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column prop="cbwa09" key="cbwa09" label="仓库名称" width="75">
                </el-table-column>
                <el-table-column prop="cbph10" key="cbph10" label="备注">
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[2,5,10,15,20]"
                class="pagintotal" />
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
            <!-- <div style="margin-top:3%;">
                <el-descriptions class="margin-top" title="" :column="2" border style="margin-top:3%;">
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                            slot="label">本页数量小记</template>{{ totalCount }}
                    </el-descriptions-item>
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                            slot="label">本页金额小记</template>{{ parseFloat(totalPrice).toFixed(2) }}
                    </el-descriptions-item>
                </el-descriptions>
            </div> -->
            <!-- 横向 -->
            <!-- <el-descriptions class="margin-top" title="" :column="2" border>
                <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                    :labelStyle="{ 'text-align': 'center' }">
                    <template slot="label">合计数量</template>{{ totalCount }}
                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                    :labelStyle="{ 'text-align': 'center' }">
                    <template slot="label">合计金额</template>{{ parseFloat(totalPrice).toFixed(2) }}
                </el-descriptions-item>
            </el-descriptions> -->

            <!-- 横向 -->
            <!-- <el-descriptions class="margin-top" title="" border>
                <el-descriptions-item label-class-name="my-label" :contentStyle="{ 'text-align': 'left' }"
                    :labelStyle="{ 'text-align': 'center' }">
                    <template slot="label">大写</template>人民币:{{ smallToBig(totalPrice) }}
                </el-descriptions-item>
            </el-descriptions> -->
        </div>
      </section>

      <el-button style="margin-left:5%;" type="primary" @click="PrintRow">打 印</el-button>
      <el-button style="margin-left:5%;" type="primary" @click="cangkupandian" >返 回</el-button>
    </div>

</template>
<script>
import { SkuBarcodeListss } from "@/api/Warehousemanagement/WarehouseInventory";
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
                pageSize: 15,
                page: 1,
                size: 15,
                total: this.total,
                name: undefined,
                address: undefined,
                cbsh01: undefined
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

        //仓库盘点明细返回按钮
        cangkupandian: function (row) {
            // this.$router.push("/system/user-auth/role/");
            this.$router.push("/system/user-cangkupandian/role/");
        },

         //打印
        PrintRow(index, row){
            this.$print(this.$refs.print) 
        },
         //列表表头设置
        headClass() {
            return {
                'text-align': 'center',
                 height: '30px',
                padding: '0'
            }
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection;
            this.idss = selection.map(item => item.cbpc01);
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
            const cbsh01 = this.$route.params && this.$route.params.cbpg01;
            this.queryParams.cbsh01 =this.$route.params && this.$route.params.cbpg01;
            console.log(45648789)
            if (cbsh01) {
                // 获取表详细信息
                SkuBarcodeListss(this.addDateRange(this.queryParams, this.dateRange)).then(res => {
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
                totalCount += this.userList[i].cbph09;
            }
            return totalCount;
        },
        totalPrice: function () {
            var totalPrice = 0;
            for (let i = 0; i < this.userList.length; i++) {
                totalPrice += this.userList[i].cbph09 * this.userList[i].cbph10;
            }
            return totalPrice;
        }
    }
};
</script>
<style src="./WarehouseInventoryxqcss/index.css">
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