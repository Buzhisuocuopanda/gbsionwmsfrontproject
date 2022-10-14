<template>
    <div>
        <div class="Purchase_caigou">销售退货单</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbse07 || '' }}</span>
            <span class="Purchase_riqii">日期：{{ value.cbse08.slice(0,10) }}</span>
        </div>
        <div style="width:90%; margin-left: 5%; margin-top: 1%;">
            <!-- 横向 -->
            <el-descriptions class="margin-top" title="" :column="4" border v-for="(value, key) in userList.slice(0, 1)"
                :key="key">
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">客户</template>{{
                    value.cbca08
                    }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">仓库</template>{{ value.cbwa09 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">结算货币</template>{{ value.cala08 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">关联订单</template>
                        {{
                            value.cbse18 == 0
                            ? "是"
                            : value.cbse18 == 1
                            ? "否"
                            : ""
                        }}
                </el-descriptions-item>
            </el-descriptions>


            <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

            <el-table v-loading="loading" :data="userList" height="auto"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cbsa08" key="cbsa08" label="供应商">
                </el-table-column>
                <el-table-column prop="cbsf16" key="cbsf16" label="订单分类">
                    <template scope="scope">
                        <div>
                            {{
                            scope.row.cbsf16 == 1
                            ? "国际订单"
                            : scope.row.cbsf16 == 2
                            ? "国内订单"
                            : "状态不确定"
                            }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="pinpai" key="pinpai" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" label="型号">
                </el-table-column>
                <el-table-column prop="cbpb08" key="cbpb08" label="描述">
                </el-table-column>
                <el-table-column prop="cbsf09" key="cbsf09" label="数量">
                </el-table-column>
                <el-table-column prop="saoma" key="saoma" label="已扫数量">
                </el-table-column>
                <el-table-column prop="cbsf11" key="cbsf11" label="单价">
                </el-table-column>
                <el-table-column prop="cbsf12" key="cbsf12" label="金额">
                </el-table-column>
                <el-table-column prop="cbsf13" key="cbsf13" label="备注">
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
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                            slot="label">本页数量小记</template>{{ totalCount || '' }}
                    </el-descriptions-item>
                    <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                        :labelStyle="{ 'text-align': 'center' }">
                        <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                            slot="label">本页金额小记</template>{{ parseFloat(totalPrice).toFixed(2) || '' }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <!-- 横向 -->
            <el-descriptions class="margin-top" title="" :column="2" border>
                <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                    :labelStyle="{ 'text-align': 'center' }">
                    <template slot="label">合计数量</template>{{ totalCount || '' }}
                </el-descriptions-item>
                <el-descriptions-item :contentStyle="{ 'text-align': 'right' }"
                    :labelStyle="{ 'text-align': 'center' }">
                    <template slot="label">合计金额</template>{{ parseFloat(totalPrice).toFixed(2) || '' }}
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
        <div v-if="status == 8" style="margin:10px 0;">
            <!-- <el-button style="margin-left:5%;" type="primary" @click="PrintRow">打 印</el-button> -->
            <el-button style="margin-left:5%;" @click="handlefanhui">返 回</el-button>
        </div>
        <div v-else style="margin:10px 0;">
            <el-button v-if="status == 0" style="margin-left:5%;" type="primary" @click="PurchaseinboundShenpi">审 核
            </el-button>
            <el-button v-else style="margin-left:5%;" type="primary" @click="PurchaseinboundFanShenpi">反 审</el-button>
            <el-button type="primary" @click="PurchaseinboundQuxiaoWangcheng" v-if="status == 4">取消完成</el-button>
            <el-button type="primary" @click="PurchaseinboundBiaojiWancheng" v-if="status == 1">标记完成</el-button>
            <el-button @click="handlefanhui">返回</el-button>
        </div>
    </div>

</template>
<script>
import { PurchaseinboundList, Purchaseinboundsho, PurchaseinboundSht, PurchaseinboundShtt, PurchaseinBoundshf } from "@/api/Warehousemanagement/SalesStock";
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
                pageSize: 10,
                page: 1,
                size: 10,
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
        // 标记完成
        PurchaseinboundBiaojiWancheng() {
            this.$modal.confirm('是否要标记完成,编号为"' + this.userList[0].cbse07 + '"的数据项？').then(() => {
                PurchaseinBoundshf({
                    cbse01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '标记成功', type: 'success' });
                        this.$router.push("/Warehousemanagement/SalesStock");
                    } else {
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        // 取消标记完成
        PurchaseinboundQuxiaoWangcheng() {
            this.$modal.confirm('是否要取消标记,编号为"' + this.userList[0].cbse07 + '"的数据项？').then(() => {
                PurchaseinboundShtt({
                    cbse01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '取消成功', type: 'success' });
                        this.$router.push("/Warehousemanagement/SalesStock");
                    } else {
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        //审批
        PurchaseinboundShenpi() {
            this.$modal.confirm('是否要审批,编号为"' + this.userList[0].cbse07 + '"的数据项？').then(() => {
                Purchaseinboundsho({
                    cbse01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '审批成功', type: 'success' });
                        this.$router.push("/Warehousemanagement/SalesStock");
                    } else {
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        //反审
        PurchaseinboundFanShenpi() {
            this.$modal.confirm('是否要反审,编号为"' + this.userList[0].cbse07 + '"的数据项？').then(() => {
                PurchaseinboundSht({
                    cbse01: this.ids.id
                }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '反审成功', type: 'success' });
                        this.$router.push("/Warehousemanagement/SalesStock");
                    } else {
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        // 返回
        handlefanhui() {
            // this.$router.push("/Warehousemanagement/SalesStock");
            this.$tab.closePage();
            this.$router.go(-1);
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
            this.cbse01 = routerParams.data;
            console.log(this.cbse01, 852369);
        },

        //详情列表
        getList() {
            this.loading = true;
            const userId = this.$route.params && this.$route.params.cbpg01;
            this.ids.id = this.$route.params && this.$route.params.cbpg01;
            this.status = this.$route.params && this.$route.params.status;
            console.log(this.$route)
            if (userId) {
                // 获取表详细信息
                PurchaseinboundList(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
                    this.userList = res.data.rows;
                    this.userList.map((item) =>{

                    })
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
            if (totalPrice) {
                return totalPrice
            } else {
                totalPrice = ''
            }

        }
    }
};
</script>
<style src="./SalesStockxqcss/index.css" scoped>

</style>