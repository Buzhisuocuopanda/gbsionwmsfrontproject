<template>
    <div>
        <section ref="print" class="recordImg" id="printRecord">
            <div class="Purchase_caigou">采购入库单</div>
            <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1) " :key="key">
                <span class="Purchase_bianhao">编号：{{ value.cbpc07 }}</span>
                <span class="Purchase_riqi">日期：{{ value.cbpc08.slice(0, 10) }}</span>
            </div>
            <div style="width:98%; margin-left: 1%; margin-top: 1%;">
                <!-- 横向 -->
                <el-descriptions class="margin-top" title="" :column="3" border
                    v-for="(value, key) in userList.slice(0, 1)" :key="key">
                    <el-descriptions-item>
                        <template slot="label">供料单位</template>{{ value.cbsa08 }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">仓库</template>{{ value.cbwa09 }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">结算货币</template>{{ value.cala08s }}
                    </el-descriptions-item>
                </el-descriptions>

                <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
                    <el-table style="width:100%" :header-cell-style="headClass" v-loading="loading" border :data="userList"
                        :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                        :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">
                        <el-table-column prop="cala08" key="cala08" label="品牌">
                        </el-table-column>
                        <el-table-column prop="cbpb12" key="cbpb12" label="型号">
                        </el-table-column>
                        <el-table-column prop="cbpb08" key="cbpb08" label="描述" width="250">
                        </el-table-column>
                        <el-table-column prop="cbpd09" key="cbpd09" align="right" label="数量">
                        </el-table-column>
                        <el-table-column prop="saoma" key="saoma" align="right" label="已扫数量">
                        </el-table-column>
                        <el-table-column prop="cbpd11" key="cbpd11" align="right" label="单价">
                        </el-table-column>
                        <el-table-column prop="cbpd12" key="cbpd12" align="right" label="金额">
                        </el-table-column>
                        <el-table-column prop="cbpd13" key="cbpd13" label="备注">
                        </el-table-column>
                    </el-table>
                </el-form>
                <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[999999]"
                    class="pagintotal" />
                <!-- 横向 -->
                <div style="margin-top:3%;">
                    <el-descriptions class="margin-top" title="" :column="2" border style="margin-top:3%;">
                        <el-descriptions-item :contentStyle="{'text-align': 'right'}"
                            :labelStyle="{ 'text-align': 'center'}">
                            <template :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                                slot="label">本页数量小记</template>{{totalCount}}
                        </el-descriptions-item>
                        <el-descriptions-item :contentStyle="{'text-align': 'right'}"
                            :labelStyle="{ 'text-align': 'center'}">
                            <template :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                                slot="label">本页金额小记</template>{{ parseFloat(totalPrice).toFixed(2) }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <!-- 横向 -->
                <el-descriptions class="margin-top" title="" :column="2" border>
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right'}"
                        :labelStyle="{ 'text-align': 'center'}">
                        <template slot="label">合计数量</template>{{totalCount}}
                    </el-descriptions-item>
                    <el-descriptions-item :contentStyle="{'text-align': 'right'}"
                        :labelStyle="{ 'text-align': 'center'}">
                        <template slot="label">合计金额</template>{{ parseFloat(totalPrice).toFixed(2) }}
                    </el-descriptions-item>
                </el-descriptions>

                <!-- 横向 -->
                <el-descriptions class="margin-top" title="" border>
                    <el-descriptions-item label-class-name="my-label" :contentStyle="{'text-align': 'left'}"
                        :labelStyle="{ 'text-align': 'center'}">
                        <template slot="label">大写</template>人民币:{{ smallToBig(totalPrice) }}
                    </el-descriptions-item>
                </el-descriptions>
                <div>
                    <span class="saomiaojluu">制单:</span>
                    <span class="saomiaojluuu">审核:</span>
                    <span class="saomiaojluuuu">财务:</span>
                </div>
                <div class="saomiaojlu">扫描记录</div>
                <el-table style="margin-top:1%;" :header-cell-style="headClass" v-loading="loading" border
                    :data="userLists" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                    :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">
                    <el-table-column prop="pinpai" key="pinpai" label="品牌">
                    </el-table-column>
                    <el-table-column prop="lx" key="lx" label="类型">
                    </el-table-column>
                    <el-table-column prop="cbpb12" key="cbpb12" align="" label="型号">
                    </el-table-column>
                    <el-table-column id="miaos" prop="cbpb08" key="cbpb08" align="" label="描述" >
                    </el-table-column>
                    <el-table-column prop="sn" key="sn" align="" label="SN">
                    </el-table-column>
                    <el-table-column prop="kwm" key="kwm" align="" label="库位">
                    </el-table-column>
                    <el-table-column prop="cbpe03" key="cbpe03" :formatter="formatDate" label="入库时间">
                    </el-table-column>
                </el-table>
            </div>
        </section>
        <div style="height:20px;"></div>
        <div v-if="status == 8">
            <el-button style="margin-left:5%;" type="primary" @click="PrintRow">打 印</el-button>
            <el-button @click="handlefanhui">返回</el-button>
        </div>
        <div v-else>
            <el-button v-if="status == 0" style="margin-left:5%;" type="primary" @click="PurchaseinboundShenpi">审 核
            </el-button>
            <el-button v-else style="margin-left:5%;" type="primary" @click="PurchaseinboundFanShenpi">反 审</el-button>
            <el-button @click="handlefanhui">返回</el-button>
        </div>
        <div style="height:20px;"></div>
    </div>

</template>
<script>
import { PurchaseinboundLists, PurchaseinboundSH, PurchaseinboundShs } from "@/api/Warehousemanagement/PurchaseWarehousing";
export default {

    data() {
        return {
            // 遮罩层
            loading: true,
            // 总条数
            total: 0,
            // 用户表格数据
            userList: null,
            // 扫描部分储存
            userLists: null,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 99999,
                page: 1,
                size: 99999,
                total: this.total,
                name: undefined,
                address: undefined,
                userId: undefined
            },
            CBPC01: "",
            ids: {
                id: ''
            },
            status: '',
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
            this.$modal.confirm('是否要审批,编号为"' + this.userList[0].cbpc07 + '"的数据项？').then(() => {
                PurchaseinboundSH({ cbpc01: this.ids.id }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '审批成功', type: 'success' });
                        // this.$router.push("/system/user-ckrkfh/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    } else {
                        // this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        //反审
        PurchaseinboundFanShenpi() {
            this.$modal.confirm('是否要反审,编号为"' + this.userList[0].cbpc07 + '"的数据项？').then(() => {
                PurchaseinboundShs({ cbpc01: this.ids.id }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '反审成功', type: 'success' });
                        // this.$router.push("/system/user-ckrkfh/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    } else {
                        // this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        //返回按钮
        handlefanhui: function (row) {
            // this.$router.push("/system/user-auth/role/");
            // this.$router.push("/system/user-ckrkfh/role/");
            this.$tab.closePage();
            this.$router.go(-1);
        },
        //打印
        PrintRow(index, row) {
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
            const userId = this.$route.params && this.$route.params.cbpc01;
            this.ids.id = this.$route.params && this.$route.params.cbpc01;
            this.status = this.$route.params && this.$route.params.status;
            console.log(this.$route, '555555')
            if (userId) {
                // 获取表详细信息
                PurchaseinboundLists(userId, this.addDateRange(this.queryParams)).then(res => {
                    this.userList = res.data.rows;
                    // this.userLists = res.data.rows;
                    this.total = res.data.total;
                    //     this.tableData.forEach((item) => {
                    //   item.cbpc01 = response.data.id;
                    //   console.log(item.cbpc01,8523697412);
                    // })
                    let userlistss = res.data.rows.map(item => {
                        return item.goods;
                    })
                    this.userLists = userlistss[0];
                    console.log(this.userLists, 123456);
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
<style src="./PurchaseWarehouscss/index.css" scoped>

</style>
<style lang="scss" scoped>
::v-deep .el-table__header,::v-deep .el-table__body{
    width: 100% !important;
}
</style>
<style scoped>
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

    /**  内容描述  */
    #printRecord .el-table__body .el-table__row .el-table_1_column_3 .cell {
        width: 280 !important;
    }

    /**  表头描述  */
    #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_3 .cell {
        width: 280 !important;
    }

    /** 型号内容  */
    #printRecord .el-table__body .el-table__row .el-table_1_column_2 .cell {
        width: 200 !important;
    }

    /**  表头型号  */
    #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_2 .cell {
        width: 200 !important;
    }

    /**  表头品牌  */
    #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_1 .cell {
        width: 60 !important;
    }

    /** 品牌内容  */
    #printRecord .el-table__body .el-table__row .el-table_1_column_1 .cell {
        width: 60 !important;
    }

    /**  表头数量  */
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
