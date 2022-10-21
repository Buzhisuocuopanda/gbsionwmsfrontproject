<template>
    <!--  销售预订单入库单审核  -->
    <div>
        <div class="Purchase_caigou">销售预订单入库单</div>
        <div class="Purchase_sum" v-for="(value, key) in userList" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.orderNo }}</span>
            <span class="Purchase_riqi">日期：{{ value.orderDate }}</span>
        </div>
        <div style="width:98%; margin-left: 1%; margin-top: 1%;">
            <!-- 横向 -->
            <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList" :key="key">
                <el-descriptions-item>
                    <template slot="label">供料单位</template>{{ value.cbsa08 }}
                </el-descriptions-item>
                <!-- <el-descriptions-item>
                    <template slot="label">仓库</template>{{ value.cbwa09 }}
                </el-descriptions-item> -->
                <!-- <el-descriptions-item>
                    <template slot="label">结算货币</template>USD
                </el-descriptions-item> -->
            </el-descriptions>

            <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

            <el-table :header-cell-style="headClass" v-loading="loading" border :data="tabData" height="280"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">
                <el-table-column prop="factory" key="factory" label="工厂">
                </el-table-column>
                <el-table-column prop="cala08" key="cala08" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" label="型号">
                </el-table-column>
                <el-table-column prop="inQty" key="inQty" align="right" label="数量">
                </el-table-column>
                <!-- <el-table-column prop="cbpd09" key="cbpd09" align="right" label="已扫数量">
                </el-table-column> -->
                <el-table-column prop="price" key="price" align="right" label="单价">
                </el-table-column>
                <el-table-column prop="totalPrice" key="totalPrice" align="right" label="金额">
                </el-table-column>
                <el-table-column prop="cbpc17" key="cbpc17" label="备注">
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[2, 5, 10, 15, 20]"
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
                <el-descriptions-item :contentStyle="{ 'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}">
                    <template slot="label">合计数量</template>{{totalCount}}
                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}">
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
        </div>
        <div class="tinajia_dingwei" style="margin:5% 0 1% 3%;left:0;">

            <el-button @click="_ly_shenhe" type="primary" v-if="state == 0">审 核</el-button>
            <el-button @click="_ly_cancelDialog">取 消</el-button>
        </div>
    </div>

</template>
<script>

import { PurchaseinboundSalesReceipt, PurchaseinboundSH } from "@/api/Warehousemanagement/SalesReceipt";
export default {
    name: "AuthUser",
    data() {
        return {
            // 遮罩层
            loading: true,
            // 总条数
            total: 0,
            // 用户表格数据
            userList: [{}],
            tabData: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                name: undefined,
                address: undefined,
                userId: undefined
            },
            CBPC01: "",
            state: null

        };
    },
    watch: {

    },
    created() {
        this.getList();
        console.log("---------------")
    },
    methods: {
        _ly_shenhe() {
            console.log("点击审核按钮")

            this.$modal.confirm('是否要审批,ponumber为"' + this.userList[0].orderNo + '"的数据项？').then(() => {
                console.log("进入审批流程")
                // console.log(row.cbpc01, 8888);
                // console.log(row)
                console.log(this.tabData)
                PurchaseinboundSH({ id: this.userList[0].id }).then(response => {
                    if (response.code == "200") {
                        // this.getList();
                        // this.open = false;
                        this.$message({ message: '审批成功', type: 'success' });
                        this.$tab.closePage();
                        this.$router.go(-1);
                    }
                });
            }).catch(() => { });
        },
        // 点击【取消】按钮关闭弹窗
        _ly_cancelDialog(done) {
            console.log('_ly_cancelDialog')
            this.$emit('on-close')
            this.$store.dispatch("tagsView/delView", this.$route)
            // this.$router.push("/system/user-xiaoshouyddfanhui/role/");
            this.$tab.closePage();
            this.$router.go(-1);
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
            const userId = this.$route.query && this.$route.query.id;
            this.state = this.$route.query.state
            console.log(this.state)
            if (userId) {
                // 获取表详细信息
                PurchaseinboundSalesReceipt(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
                    this.userList[0] = res.data.rows[0];
                    this.userList[0].orderDate = this.userList[0].orderDate.slice(0, 10)
                    this.tabData = res.data.rows;
                    this.tabData.map((item) => {
                        item.totalPrice = item.inQty * item.price
                    })
                    this.total = res.data.total;
                    console.log(res, 888999, this.userList);
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
            for (let i = 0; i < this.tabData.length; i++) {
                totalCount += this.tabData[i].inQty;
            }
            return totalCount;
        },
        totalPrice: function () {
            var totalPrice = 0;
            for (let i = 0; i < this.tabData.length; i++) {
                totalPrice += this.tabData[i].inQty * this.tabData[i].price;
            }
            return totalPrice;
        }
    }
};
</script>
<style src="./SalesReceiptxqcss/index.css">

</style>