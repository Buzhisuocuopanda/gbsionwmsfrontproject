<!-- 配件入库详情页 -->
<template>
    <div>
        <section ref="print" class="recordImg" id="printRecord">
            <div class="Purchase_caigou">配件入库单</div>
            <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1) " :key="key"
                v-show="userList[0].orderNo !== null">
                <span class="Purchase_bianhao">编号：{{ value.orderNo }}</span>
                <span class="Purchase_riqi">日期：{{ value.orderDate.slice(0, 10) }}</span>
            </div>
            <div style="width:98%; margin-left: 1%; margin-top: 1%;">
                <el-descriptions class="margin-top" title="" :column="3" border
                    v-for="(value, key) in userList.slice(0, 1) " :key="key">
                    <el-descriptions-item>
                        <template slot="label">客户名称</template>{{ value.cbca08 }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">供货单位</template>{{ value.cbsa08 }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">仓库</template>{{ value.cbwa09 }}
                    </el-descriptions-item>
                </el-descriptions>

                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
                    <el-table :header-cell-style="headClass" v-loading="loading" border :data="userList"
                        :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                        :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">
                        <el-table-column prop="cala08" key="cala08" label="品牌">
                        </el-table-column>
                        <el-table-column prop="cbpb12" key="cbpb12" label="型号">
                        </el-table-column>
                        <el-table-column prop="cbpb08" key="cbpb08" label="描述" width="250">
                        </el-table-column>
                        <el-table-column prop="qty" key="cbpd09" align="right" label="数量">
                        </el-table-column>
                        <el-table-column prop="price" key="saoma" align="right" label="单价">
                        </el-table-column>
                        <el-table-column prop="remark" key="remark" label="备注">
                        </el-table-column>
                    </el-table>
                </el-form>
                <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[999999]"
                    class="pagintotal" />
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

            </div>
        </section>
        <div style="height:20px;"></div>
        <div v-if="status == 8">
            <el-button style="margin-left:5%;" type="primary" @click="PrintRow">打 印</el-button>
            <el-button @click="handlefanhui">返回</el-button>
        </div>
        <div v-else>
            <el-button v-if="status == 0" style="margin-left:5%;" type="primary" @click="PurchaseinboundShenpi">
                审 核
            </el-button>
            <el-button v-else style="margin-left:5%;" type="primary" @click="PurchaseinboundFanShenpi">反 审
            </el-button>
            <el-button @click="handlefanhui">返回</el-button>
        </div>
        <div style="height:20px;"></div>
    </div>
</template>
<script>
import { PurchaseinboundLists, PurchaseinboundSH } from "@/api/Warehousemanagement/PurchaseOrder";

export default {
    data() {
        return {
            // title: '',
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
        }
    },

    methods: {
        //详情列表
        getList() {
            this.loading = true;

            let id = this.$route.params && this.$route.params.id;
            const userId = id.slice(0, -1)
            this.status = id.substr(-1, 1)
            // console.log(this.$route.params)
            // const userId = this.$route.params && this.$route.params.id;
            // this.ids.id = this.$route.params && this.$route.params.id;
            // this.status = this.$route.params && this.$route.params.status;
            // console.log(this.$route, '555555')
            console.log(userId, "id")
            console.log(this.status, "状态码")
            if (userId) {
                // 获取表详细信息
                PurchaseinboundLists({ id: userId }, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
                    this.userList = res.data.rows;
                    this.total = res.data.total;
                    console.log(res, 888999);
                    console.log(this.userList, '字段')
                    // let userlistss = res.data.rows.map(item => {
                    //     return item.goods;
                    // })
                    // this.userLists = userlistss[0];
                    // console.log(this.userLists, 123456);
                    this.loading = false;

                });
            }
        },
        //审批
        PurchaseinboundShenpi() {
            this.$modal.confirm('是否要审批,编号为"' + this.userList[0].orderNo + '"的数据项？').then(() => {

                console.log('成功进入审批阶段')
                PurchaseinboundSH({ id: this.userList[0].id }).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '审批成功', type: 'success' });
                        // this.$router.push("/system/user-cgddxq/role/");
                        this.$tab.closePage();
                        this.$router.go(-1);
                    } else {
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        // 打印
        PrintRow(index, row) {
            this.$print(this.$refs.print)
        },
        // 返回按钮
        handlefanhui: function (row) {
            // this.$router.push("/system/user-cgddxq/role/");
            this.$tab.closePage();
            this.$router.go(-1);
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
        },
        headClass() {

        },
        handleSelectionChange() {

        },

    },

    computed: {
        totalCount: function () {
            var totalCount = 0;
            for (let i = 0; i < this.userList.length; i++) {
                totalCount += this.userList[i].qty;
            }
            return totalCount;
        },
        totalPrice: function () {
            var totalPrice = 0;
            for (let i = 0; i < this.userList.length; i++) {
                totalPrice += this.userList[i].qty * this.userList[i].price;
            }
            return totalPrice;
        }
    },
    created() {
        this.getList();

    },


    // data() {
    //     return {
    //         // 遮罩层
    //         loading: true,
    //         // 总条数
    //         total: 0,
    //         // 用户表格数据
    //         userList: null,
    //         // 查询参数
    //         queryParams: {
    //             pageNum: 1,
    //             pageSize: 10,
    //             page: 1,
    //             size: 10,
    //             total: this.total,
    //             name: undefined,
    //             address: undefined,
    //             userId: undefined
    //         },
    //         CBPC01: ""

    //     };
    // },
    // watch: {

    // },

    // methods: {
    //     // 多选框选中数据
    //     handleSelectionChange(selection) {
    //         this.ids = selection;
    //         this.idss = selection.map(item => item.cbpc01);
    //         this.shenpiids = selection;
    //         this.single = selection.length != 1;
    //         this.multiple = !selection.length;
    //     },
    //     //父子页面传值
    //     getParams() {
    //         let routerParams = this.$route.query;
    //         this.cbpc01 = routerParams.data;
    //         console.log(this.cbpc01, 852369);
    //     },

    //     //详情列表
    //     getList() {
    //         this.loading = true;
    //         const userId = this.$route.params && this.$route.params.id;
    //         console.log(userId)
    //         if (userId) {
    //             // 获取表详细信息
    //             PurchaseinboundLists({ id: userId }, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
    //                 this.userList = res.data.rows;
    //                 this.total = res.data.total;
    //                 console.log(res, 888999);
    //                 this.loading = false;
    //             });
    //         }
    //     },

    //     //时间的转换
    //     smallToBig(money) {
    //         var cnMoney = "零元整";
    //         var strOutput = "";
    //         var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    //         money += "00";
    //         var intPos = money.indexOf('.');
    //         if (intPos >= 0) {
    //             money = money.substring(0, intPos) + money.substr(intPos + 1, 2);
    //         }
    //         strUnit = strUnit.substr(strUnit.length - money.length);
    //         for (var i = 0; i < money.length; i++) {
    //             strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(money.substr(i, 1), 1) + strUnit.substr(i, 1);
    //         }
    //         cnMoney = strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
    //         return cnMoney;
    //     }
    // },
    // mounted() {
    //     this.getParams();
    // },
    // computed: {
    //     totalCount: function () {
    //         var totalCount = 0;
    //         for (let i = 0; i < this.userList.length; i++) {
    //             totalCount += this.userList[i].cbph09;
    //         }
    //         return totalCount;
    //     },
    //     totalPrice: function () {
    //         var totalPrice = 0;
    //         for (let i = 0; i < this.userList.length; i++) {
    //             totalPrice += this.userList[i].cbph09 * this.userList[i].cbph10;
    //         }
    //         return totalPrice;
    //     }
    // }
};
</script>
<style src="./PurchaseOrderxqcss/index.css">

</style>

