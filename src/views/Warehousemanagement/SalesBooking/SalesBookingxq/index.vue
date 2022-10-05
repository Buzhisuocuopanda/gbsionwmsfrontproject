<template>
    <div>
       <section ref="print" class="recordImg" id="printRecord">
        <div class="Purchase_caigou">销售预订单</div>
        <div class="Purchase_sum" v-for="(value, key) in userList.slice(0, 1) " :key="key">
            <span class="Purchase_bianhao">编号：{{ value.orderNo }}</span>
            <span class="Purchase_riqi">日期：{{ value.orderDate.slice(0, 10) }}</span>
        </div>
        <div style="width:98%; margin-left: 1%; margin-top: 1%;">
            <!-- 横向 -->
            <el-descriptions class="margin-top" title="" :column="3" border
                v-for="(value, key) in userList.slice(0, 1)" :key="key">
                <el-descriptions-item>
                    <template slot="label">供料单位</template>{{ value.supplier }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">仓库</template>{{ value.wh }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">销售人员</template>{{ value.saler }}
                </el-descriptions-item>
            </el-descriptions>

            <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

            <el-table :header-cell-style="headClass" v-loading="loading" border :data="userList"
                :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">

                <el-table-column prop="cbpc07" key="cbpc07" label="品牌">
                </el-table-column>
                <el-table-column prop="cbpc08" key="cbpc08" :formatter="formatDate" label="型号">
                </el-table-column>
                <el-table-column prop="qty" key="qty" align="right" label="数量">
                </el-table-column>
                <el-table-column prop="price" key="price" align="right" label="单价">
                </el-table-column>
                <el-table-column prop="cbpd12" key="cbpd12" align="right" label="金额">
                   {{ parseFloat(totalPrice).toFixed(2) }}
                </el-table-column>
                <el-table-column prop="remark" key="remark" label="备注">
                </el-table-column>
            </el-table>
            <pagination v-if="false" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[999999]"
                class="pagintotal" />
            <!-- 横向 -->
            <div style="margin-top:3%;">
                <el-descriptions class="margin-top" title="" :column="2" border style="margin-top:3%;">
                    <el-descriptions-item :contentStyle="{'text-align': 'right'}"
                        :labelStyle="{ 'text-align': 'center'}">
                        <template :contentStyle="{'text-align': 'right'}" :labelStyle="{ 'text-align': 'center'}"
                            slot="label">本页数量小记</template>{{ totalCount }}
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
        </section>
        <div style="height:20px;"></div>
            <div v-if="status == 9">
                <el-button style="margin-left:5%;" type="primary" @click="PrintRow">打 印</el-button>
                <el-button  @click="handlefanhui">返回</el-button>
            </div>
            <div v-else>
                <el-button v-if="status == 0" style="margin-left:5%;" type="primary" @click="PurchaseinboundShenpi">审 核</el-button>
                <el-button v-else type="primary"  @click="PurchaseinboundFanShenpi">反 审</el-button>
                <el-button  @click="handlefanhui">返回</el-button>
            </div>
            
        <div style="height:20px;"></div>
    </div>

</template>
<script>
import { PurchaseinboundLists,PurchaseinboundSH,PurchaseinboundShs } from "@/api/Warehousemanagement/SalesBooking";
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
                userId:undefined
            },
            CBPC01:"",
            orderid:{
                id:''
            },
            status:'',
        };
    },
    watch: {
       
    },
    created() {
        this.getList();
        this.userList.cbpd12 =  this.userList.qty * this.userList.price;
    },
    methods: {
        //审批
        PurchaseinboundShenpi() {
            this.$modal.confirm('是否要审批,编号为"' + this.userList[0].orderNo + '"的数据项？').then(() => {
                PurchaseinboundSH(this.orderid).then(response => {
                if (response.code == "200") {
                    this.$message({ message: '审批成功', type: 'success' });
                    this.$router.push("/system/user-xiaosydd/role/");
                }else{
                    this.$message({ message: response.msg, type: 'error' });
                }
                });
            }).catch(() => { });
        },
        //反审
        PurchaseinboundFanShenpi() {
            this.$modal.confirm('是否要反审,编号为"' + this.userList[0].orderNo + '"的数据项？').then(() => {
                PurchaseinboundShs(this.orderid).then(response => {
                    if (response.code == "200") {
                        this.$message({ message: '反审成功', type: 'success' });
                        this.$router.push("/system/user-xiaosydd/role/");
                    }else{
                        this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
         //销售预订单返回按钮
        handlefanhui: function (row) {
            // this.$router.push("/system/user-auth/role/");
            this.$router.push("/system/user-xiaosydd/role/");
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
            console.log(this.cbpc01,852369);
        },

        //详情列表
        getList(){
            this.loading = true;
            const userId = this.$route.params &&  this.$route.params.id;
            this.orderid.id = this.$route.params &&  this.$route.params.id;
            this.status = this.$route.params && this.$route.params.status;
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
    }
};
</script>
<style src="./SalesBookingcss/index.css"></style>
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