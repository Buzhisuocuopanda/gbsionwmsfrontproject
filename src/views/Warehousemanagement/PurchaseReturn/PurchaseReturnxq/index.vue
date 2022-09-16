<template v-if="userList.length=1">
    <div>
       <section ref="print" class="recordImg" id="printRecord">
        <div class="Purchase_caigou">采购退货单</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1)" :key="key">
            <span class="Purchase_bianhao">编号：{{ value.cbpg07 }}</span>
            <span class="Purchase_riqi">日期：{{ value.cbpg08.slice(0, 10) }}</span>
        </div>
        <div style="width:98%; margin-left: 1%;margin-top: 1%;">
            <!-- 横向 -->
            <el-descriptions class="margin-top" title="" :column="3" border v-for="(value, key) in userList.slice(0, 1)"
                :key="key">
                <el-descriptions-item>
                    <template slot="label">供料单位</template>{{ value.cbsa08 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">仓库</template>{{ value.cbwa09 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">结算货币</template>{{ value.cala08 }}
                </el-descriptions-item>
            </el-descriptions>

            <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

            <el-table border v-loading="loading" :data="userList"  :header-cell-style="headClassprxq"
                :cell-style="{ padding:'5px 0' }" :row-style="{ height:'10px' }"
            :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cala08" key="cala08" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" label="型号" width="200px;">
                </el-table-column>
                <el-table-column prop="cbpb08" key="cbpb08" label="描述" width="450px;">
                </el-table-column>
                <el-table-column prop="cbph09" key="cbph09" align="right"  label="数量">
                </el-table-column>
                <el-table-column prop="cbph09" key="cbph09" align="right" label="已扫数量">
                </el-table-column>
                <el-table-column prop="cbph10" key="cbph10" align="right" label="单价">
                </el-table-column>
                <el-table-column prop="cbph11" key="cbph11" align="right" label="金额">
                </el-table-column>
                <el-table-column prop="cbph13" key="cbph13" label="备注">
                </el-table-column>
            </el-table>
            <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[9999999]"
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
                    label="">{{ value.cbpc01 }}
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
             <div >
                <span class="saomiaojluu">制单(wanghui):</span>
                <span class="saomiaojluuu">审核:</span>
                <span class="saomiaojluuuu">财务:</span>
            </div>
             <div class="saomiaojlu">扫描记录</div>
             <el-table style="margin-top:1%;" :header-cell-style="headClass" v-loading="loading" border :data="userList" 
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">                
                <el-table-column prop="cala08" key="cala08" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpa08" key="cbpa08"  label="类型">
                </el-table-column>
                <el-table-column prop="cbpb12" key="cbpb12" align="" label="型号">
                </el-table-column>
                <el-table-column prop="cbpb08" key="cbpb08" align="" label="描述" width="390">
                </el-table-column>
                <el-table-column prop="cbpi09" key="cbpi09" align="" label="SN">
                </el-table-column>
                <el-table-column prop="cbla09" key="cbla09" align="" label="库位">
                </el-table-column>
                <el-table-column prop="cbpg08" key="cbpg08" :formatter="formatDate" label="入库时间">
                </el-table-column>
            </el-table>
        </div>
       <div style="height:100px;"></div>
     </section>
       <el-button style="margin-left:5%;" type="primary" @click="PrintRow">打 印</el-button>
       <el-button type="primary" @click="handlefanhui">取消</el-button>
       <div style="height:100px;"></div>
    </div>

</template>
<script>
import { PurchaseinboundList } from "@/api/Warehousemanagement/PurchaseReturn";
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
                pageSize: 99999,
                page: 1,
                size: 99999,
                total: this.total,
                name: undefined,
                address: undefined,
                userId: undefined
            },
            CBPC01: "",
            cbpg01:""

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
            this.$router.push("/system/user-cktkfh/role/");
        },

        //写在methods里面的方法
       PrintRow(index, row){
            this.$print(this.$refs.print) 
        },
        //列表表头设置
        headClassprxq() {
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
            const userId = this.$route.params && this.$route.params.cbpg01;
            if (userId) {
                // 获取表详细信息
                PurchaseinboundList(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
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
<style src="./PurchaseReturnxqcss/index.css">
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
   /**  内容描述 */
    /* #printRecord .el-table__body .el-table__row .el-table_1_column_3 .cell{
      width: 280 !important;
   } */
/**  表头描述  */
    /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_3 .cell{
      width: 280 !important;
    } */
    /** 型号内容 */
    /* #printRecord .el-table__body .el-table__row .el-table_1_column_2 .cell{
       width: 200 !important;
    } */


    /** 表头型号 */
   /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_2 .cell{
     width: 200 !important;
    } */


   /** 表头品牌 */
  /* #printRecord .el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_1 .cell{
         width: 60 !important;
   } */
    /** 品牌内容 */
   /* #printRecord .el-table__body .el-table__row .el-table_1_column_1 .cell{
       width: 60 !important;
   } */


     /** 表头数量 */
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
