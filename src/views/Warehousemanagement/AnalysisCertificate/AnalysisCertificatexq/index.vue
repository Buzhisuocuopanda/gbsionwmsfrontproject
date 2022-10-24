<template>
    <div>
        <div class="Purchase_caigou">质检单</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbpk07 }}</span>
            <!-- <span class="Purchase_riqi">日期：{{ value.cbqa08.slice(0, 10) }}</span> -->
        </div>
        <div style="width:90%; margin-left: 5%; margin-top: 1%;">

            <el-table border :header-cell-style="headClassACC" v-loading="loading" :data="userList"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cala08" key="cala08" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" label="型号">
                </el-table-column>
                <el-table-column prop="cbpb08" key="cbpb08" width="520px;" label="描述">
                </el-table-column>
                <el-table-column prop="cbqb10" key="cbqb10" label="原商品SN">
                </el-table-column>
                <el-table-column prop="cbqb09" key="cbqb09" label="替换商品SN">
                </el-table-column>
            </el-table>
            <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[999999]" class="pagintotal" />
        </div>

        <el-button type="primary" style="margin-left:10%;margin-top:4%;" @click="handlefanhui">返回</el-button>
    </div>

</template>
<script>
import { QualityinLists } from "@/api/Warehousemanagement/AnalysisCertificate";
export default {
    name:"AnalysisCertificateXq",
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
      console.log(10242)
        this.getList();

    },
    methods: {

        //返回按钮
        handlefanhui: function (row) {
            // this.$router.push("/system/user-auth/role/");
            // this.$router.push("/system/user-zjdfh/role/");
            this.$tab.closePage();
            this.$router.go(-1);
        },
        //列表表头设置
        headClassACC() {
            return {
                'text-align': 'center',
                height: '30px',
                padding: '0'
            }
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection;
            this.idss = selection.map(item => item.cbqa01);
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
            const userId = this.$route.params && this.$route.params.cbqa01;
            if (userId) {
                // 获取表详细信息
                QualityinLists(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
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
<style src="./AnalysisCertificatexqcss/index.css" scoped>

</style>
