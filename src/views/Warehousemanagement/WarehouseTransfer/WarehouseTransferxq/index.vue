<template>
    <div>
        <section ref="print" class="recordImg" id="printRecord">
            <div class="Purchase_caigou">调拨单</div>
            <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1) " :key="key">
                <span class="Purchase_bianhao">编号：{{ value.cbaa07 }}</span>
                <span class="Purchase_riqi">日期：{{ value.cbaa08.slice(0, 10) }}</span>
            </div>
            <div style="width:98%; margin-left: 1%; margin-top: 1%;">
                <!-- 横向 -->
                <el-descriptions class="margin-top" title="" :column="3" border
                    v-for="(value, key) in userList.slice(0, 1)" :key="key">
                    <el-descriptions-item>
                        <template slot="label">调出仓库</template>{{ value.cbwa09 }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">调入仓库</template>{{ value.cbwa10 }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">结算货币</template>{{ value.cala08 }}
                    </el-descriptions-item>
                </el-descriptions>

                <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

                <el-table :header-cell-style="headClass" v-loading="loading" border :data="userList"
                    :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                    <el-table-column prop="cbsa08" key="cbsa08" label="供应商">
                    </el-table-column>
                    <!-- <el-table-column prop="cbab15" key="cbab15" label="订单分类">
                    </el-table-column> -->
                    <el-table-column prop="pinpai" key="pinpai" align="left" label="品牌" width="120">
                    </el-table-column>
                    <el-table-column prop="cbpb12" key="cbpb12" align="left" label="型号" width="130">
                    </el-table-column>
                    <el-table-column prop="cbpb08" key="cbpb08" align="left" label="描述" width="300">
                    </el-table-column>
                    <el-table-column prop="cbab09" key="cbab09" align="right" label="数量" width="60">
                    </el-table-column>
                    <el-table-column prop="saoma" key="saoma" align="right" label="已扫数量" width="80">
                    </el-table-column>
                    <el-table-column prop="cbab11" key="cbab11" align="right" label="单价" width="90">
                        <template slot-scope="scope">
                            <div style="text-align: left">
                            {{ parseFloat(scope.row.cbab11 == null ? 0 : scope.row.cbab11).toFixed(2) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cbab12" key="cbab12" align="right" label="金额" width="100">
                        <template slot-scope="scope">
                            <div style="text-align: left">
                            {{ parseFloat(scope.row.cbab12 == null ? 0 : scope.row.cbab12).toFixed(2) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cbpc17" key="cbpb08" label="备注">
                    </el-table-column>
                </el-table>
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
                <div style="margin-top:3%;">
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
                </div>
                <!-- 横向 -->
                <el-descriptions class="margin-top" title="" :column="2" border>
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template slot="label">合计数量</template>{{ totalCount }}
                    </el-descriptions-item>
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template slot="label">合计金额</template>{{ parseFloat(totalPrice).toFixed(2) }}
                    </el-descriptions-item>
                </el-descriptions>

                <!-- 横向 -->
                <el-descriptions class="margin-top" title="" border>
                    <el-descriptions-item label-class-name="my-label" :contentStyle="{ 'text-align': 'left' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template slot="label">大写</template>人民币:{{ smallToBig(totalPrice) }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div>
                <span class="saomiaojluu">制单:</span>
                <span class="saomiaojluuu">审核:</span>
                <span class="saomiaojluuuu">财务:</span>
            </div>
            <div class="saomiaojlu" style="margin-top:3%">扫描记录</div>
            <el-table style="margin-top:1%;" :header-cell-style="headClass" v-loading="loading" border :data="userLists"
                :row-style="{ height: '3px' }" :cell-style="{ padding: '2px' }"
                :default-sort="{ prop: 'name', order: 'descending' }">
                <el-table-column prop="pinpai" key="pinpai" label="品牌">
                </el-table-column>
                <el-table-column prop="lx" key="lx" label="类型">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" align="" label="型号">
                </el-table-column>
                <el-table-column id="miaos" prop="cbpb08" key="cbpb08" align="" label="描述" width="250">
                </el-table-column>
                <el-table-column prop="sn" key="sn" align="" label="SN">
                </el-table-column>
                <el-table-column prop="kwm" key="kwm" align="" label="库位">
                </el-table-column>
                <el-table-column prop="cbpe03" key="cbpe03" :formatter="formatDate" label="入库时间">
                </el-table-column>
            </el-table>
        </section>
        <div v-if="status == 8" style="margin-top:2%">
            <el-button style="margin-left:2%;" type="primary" @click="PrintRow">打 印</el-button>
            <el-button style="margin-left:2%;" @click="handlexiaoshouone">返 回</el-button>
        </div>
        <div v-else style="margin-top:2%">
            <el-button v-if="status == 0" style="margin-left:2%;" type="primary" @click="PurchaseinboundShenpi">审 核
            </el-button>
            <div v-else-if="status == 1" style="display:inline-block;margin-right: 10px;margin-left:2%;">
                <el-button type="primary" @click="PurchaseinboundFanShenpi">反 审</el-button>
                <el-button type="primary" @click="PurchaseinboundQuxiaoWangcheng">标记完成</el-button>
            </div>

            <!-- <el-button type="primary" @click="PurchaseinboundBiaojiWancheng">调出标记完成</el-button> -->
            <el-button @click="handlexiaoshouone">返回</el-button>
        </div>
    </div>

</template>
<script>
import { PurchaseinboundLists, Purchaseinboundsho, PurchaseinboundSht, PurchaseinboundShtt, PurchaseinBoundshf } from "@/api/Warehousemanagement/WarehouseTransfer";
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

        //列表表头设置
        headClass() {
            return {
                'text-align': 'center',
                height: '30px',
                padding: '0'
            }
        },
        //
        // 入
        PurchaseinboundQuxiaoWangcheng() {
            this.$modal.confirm('是否要标记完成,编号为"' + this.userList[0].cbaa07 + '"的数据项？').then(() => {
                // PurchaseinBoundshf
                PurchaseinBoundshf({
                    cbaa01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '成功', type: 'success' });
                        // this.$router.push("/system/cangkudiaobudanfh/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    }
                });
            }).catch(() => { });
        },
        // 出
        PurchaseinboundBiaojiWancheng() {
            this.$modal.confirm('是否要调出标记,编号为"' + this.userList[0].cbaa07 + '"的数据项？').then(() => {
                PurchaseinboundShtt({
                    cbaa01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '成功', type: 'success' });
                        // this.$router.push("/system/cangkudiaobudanfh/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    }
                });
            }).catch(() => { });
        },

        //审批
        PurchaseinboundShenpi() {
            this.$modal.confirm('是否要审批,编号为"' + this.userList[0].cbaa07 + '"的数据项？').then(() => {
                Purchaseinboundsho({
                    cbaa01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '审批成功', type: 'success' });
                        // this.$router.push("/system/cangkudiaobudanfh/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    }
                });
            }).catch(() => { });
        },
        //反审
        PurchaseinboundFanShenpi() {
            this.$modal.confirm('是否要反审,编号为"' + this.userList[0].cbaa07 + '"的数据项？').then(() => {
                PurchaseinboundSht({
                    cbaa01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '反审成功', type: 'success' });
                        // this.$router.push("/system/cangkudiaobudanfh/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    }
                });
            }).catch(() => { });
        },

        /** 仓库调拨单返回操作 */
        handlexiaoshouone: function (row) {
            // this.$router.push("/system/user-auth/role/");
            // this.$router.push("/system/cangkudiaobudanfh/role/");
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
            const userId = this.$route.params && this.$route.params.cbaa01;
            this.ids.id = this.$route.params && this.$route.params.cbaa01;
            this.status = this.$route.params && this.$route.params.status;
            if (userId) {
                // 获取表详细信息
                PurchaseinboundLists(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
                    this.userList = res.data.rows;
                    for (var i = 0; i < this.userList.length; i++) {
                        this.userList[i].cbab12 = this.userList[i].cbab11 * this.userList[i].cbab09
                    }
                    console.log(this.userList, "this.userList-------------this.userList")
                    this.total = res.data.total;
                    console.log(res, 888999);
                    let userlistss = res.data.rows.map(item => {
                        return item.goods;
                    })
                    this.userLists = userlistss[0];
                    console.log(this.userLists, 123456);
                    console.log(res, 888999);
                    this.loading = false;
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
                totalCount += this.userList[i].cbab09;
            }
            return totalCount;
        },
        totalPrice: function () {
            var totalPrice = 0;
            for (let i = 0; i < this.userList.length; i++) {
                totalPrice += this.userList[i].cbab09 * this.userList[i].cbab11;
            }
            return totalPrice;
        }
    }
};
</script>
<style src="./WarehouseTransferxqcss/index.css">

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
<style lang="scss" scoped>
.Purchase_sum {
    margin-top: 1%;
    margin-left: 20%;
    font-weight: 200;
    display: block;
    width: 63%;
}
</style>
