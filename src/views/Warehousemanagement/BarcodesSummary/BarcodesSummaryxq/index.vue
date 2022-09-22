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

            <el-table border :header-cell-style="headClasspwbitd" v-loading="loading" :data="userList" 
                 :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cbsa08" key="cbsa08" width="110px;" label="供应商">
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
                <el-table-column prop="cbpb08" key="cbpb08" width="490px;" label="描述">
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
          <span class="saomiaojluu">制单(wanghui):</span>
          <span class="saomiaojluuu">审核:</span>
          <span class="saomiaojluuuu">财务:</span>
       </div>
     </section>
       <div style="height:50px;"></div>
       <div style="margin-top:5%;">
          <span>
            <el-button style="margin-left:3%;" type="primary" @click="PrintRow">打 印</el-button>
          </span>
          <span>
            <el-button type="primary" style="margin-left:3%;"  @click="handlefanhui">返回</el-button>
          </span>
       </div>
      <div style="height:50px;"></div>
    </div>
</template>
<script>
// import { PurchaseinboundLists } from "@/api/Warehousemanagement/PurchaseWarehousing";
import { PurchaseinboundLists } from "@/api/Warehousemanagement/BarcodesSummary";
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
            console.log(row,column,111,row[column.property])
            if(!row[column.property]){
                return ''
            }else{
                return parseFloat(row[column.property]).toFixed(2)
            }
            
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
<style src="./BarcodesSummaryxqcss/index.css">
</style>