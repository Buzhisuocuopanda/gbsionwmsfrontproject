<template>
    <div>
        <div class="Purchase_caigou">销售提货单</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbpc07 }}</span>
            <span class="Purchase_bianhao" style="margin-left:15%;">客户订单号：{{ value.cbpc07 }}</span>
            <span class="Purchase_riqii">日期：{{ value.cbpc08.slice(0, 10) }}</span>
        </div>
        <div style="width:90%; margin-left: 5%; margin-top: 1%;">
            <!-- 横向 -->
            <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
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
                    <template slot="label">销售人员</template>USD
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
                :key="key">
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">联系人</template>{{ value.cbsa08 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">电话</template>{{ value.cbwa09 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">客户等级</template>USD
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
                :key="key">
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">结算货币</template>{{ value.cbsa08 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">收货人</template>{{ value.cbwa09 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell01">
                    <template slot="label">关联订单/提货单</template>USD
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
                :key="key">
                <el-descriptions-item content-class-name="my-content" label-class-name="my-labell02">
                    <template slot="label">收货电话</template>{{ value.cbsa08 }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="my-labell02">
                    <template slot="label">收货地址</template>{{ value.cbwa09 }}
                </el-descriptions-item>
            </el-descriptions>

            <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

            <el-table v-loading="loading" :data="userList" height="250"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cbpc07" key="cbpc07" label="供应商">
                </el-table-column>
                <el-table-column prop="cbwa09" key="cbwa09" label="订单分类">
                </el-table-column>
                <el-table-column prop="cbpd09" key="cbpc16" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpd09" key="cbpd09" label="型号">
                </el-table-column>
                <el-table-column prop="cbpd11" key="cbpd12" label="描述">
                </el-table-column>
                <el-table-column prop="cbpd12" key="cbpd11" label="数量">
                </el-table-column>
                <el-table-column prop="cbpd11" key="cbpd11" label="已扫数量">
                </el-table-column>
                <el-table-column prop="cbpd11" key="cbpd11" label="单价">
                </el-table-column>
                <el-table-column prop="cbpd11" key="cbpd11" label="金额">
                </el-table-column>
                <el-table-column prop="cbpd11" key="cbpd11" label="备注">
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

    </div>

</template>
<script>
import { Purchaseinbounddingdanxq } from "@/api/Warehousemanagement/Saleslading";
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
            CBPC01: ""

        };
    },
    watch: {

    },
    created() {
        this.getList();

    },
    methods: {
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
            if (userId) {
                // 获取表详细信息
                Purchaseinbounddingdanxq(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
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
<style src="./Salesladingxqcss/index.css">
</style>