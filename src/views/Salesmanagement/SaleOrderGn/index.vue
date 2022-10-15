<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px">
        <el-form-item label="订单号" class="item-r">
          <el-input v-model="orderNo" class="filter-item" style="width:200px;" placeholder="订单号" />
        </el-form-item>

        <el-form-item label="客户" class="item-r" style="margin-left:-1%;">
          <el-input v-model="customer" class="filter-item" style="width:180px;" placeholder="客户" />
        </el-form-item>
        <el-form-item label="状态" class="item-r" style="margin-left:-1%;">
          <el-select v-model="status" placeholder="状态" class="middle-input" style="width:120px">
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" style="margin-left:-1%;">
          <el-date-picker style="width:330px;" v-model="dateRange" type="daterange" :picker-options="pickerOptions"
            popper-class="elDatePicker" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin: -11px -10px 1px 1px;">
          <el-button v-hasPermi="['sale:saleOrder:list']" class="filter-item" type="primary" icon="el-icon-search"
            style="margin-bottom:0;margin-left: 2em" @click="onSearch">搜索
          </el-button>
          <el-button v-hasPermi="['sale:saleOrder:list']" class="filter-item" type="primary"
            style="margin-bottom:0;margin-left: 1em" @click="reset">重置
          </el-button>
          <el-button v-hasPermi="['sale:saleOrder:add']" class="filter-item" type="primary"
            style="margin-bottom:0;margin-left: 1em" @click="createForm">
            创建
          </el-button>
          <!--          <el-upload-->
          <!--            ref="uploadExcel"-->
          <!--            :action="ExcelUploadUrl"-->
          <!--            :show-file-list="false"-->
          <!--            :on-success="uploadSuccess"-->
          <!--            :before-upload="beforeUploadExcel"-->
          <!--            :headers="headers"-->
          <!--            style="display: inline">-->
          <!--            <el-button type="primary" :loading=loadingOut style="margin-bottom:0;margin-left: 1em">Excel导入</el-button>-->
          <!--          </el-upload>-->
          <el-button class="filter-item" type="primary" v-on:click="exprotData()" :loading=loadingOut
            v-hasPermi="['sale:saleOrder:export']" style="margin-bottom:0;margin-left: 1em">导出
          </el-button>

          <!--          <el-button type="primary" v-on:click="downMub()" style="margin-bottom:0;margin-left: 1em">导入模板下载</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="orderList" :row-style="{height: '3px'}" :cell-style="{padding: '2px'}"
        element-loading-text="Loading。。。" width="100%;" height="450" border fit highlight-current-row stripe
        style="margin-top:0.5em">
        <el-table-column fixed label="编号" align="left" prop="orderNo" min-width="140px;" />
        <el-table-column label="客户订单号" align="left" prop="customerNo" max-width="250px;" min-width="230px;" />
        <el-table-column label="日期" align="left" prop="orderDate" min-width="100px;" />
        <el-table-column label="客户" align="left" prop="customerName" min-width="260px;" />
        <el-table-column label="销售人员" align="left" prop="saleUser" min-width="95px;" />
        <el-table-column label="结算货币" align="left" prop="settleCurrentMsg" min-width="75px;" />
        <el-table-column label="收货人" align="left" prop="receiver" max-width="150px;" min-width="100px;" />
        <el-table-column label="地址" align="left" prop="address" max-width="600px;" min-width="500px;" />
        <el-table-column label="电话" align="left" prop="phone" min-width="120px;" />
        <el-table-column label="订单类型" align="left" prop="orderClassMsg" min-width="86px;" />
        <el-table-column label="订单分类" align="left" prop="orderTypeMsg" min-width="86px;" />
        <el-table-column label="工厂账号" align="left" prop="fcNumber" min-width="120px;" />
        <el-table-column label="其他" align="left" prop="other" min-width="120px;" />
        <el-table-column label="制单时间" align="left" prop="createTime" min-width="160px;" />
        <el-table-column fixed="right" label="状态" align="center" prop="statusMsg" min-width="100px;" />
        <!--        <el-table-column label="其他" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->
        <el-table-column fixed="right" label="操作" min-width="270px;">
          <template slot-scope="scope">
            <el-button class="caozuoxiangqengGN" style="margin-left:8px; margin-top: 2px" icon="el-icon-share"
              size="mini" type="text" @click="showDetail(scope.row)" v-hasPermi="['sale:saleOrder:detail']">详情
            </el-button>
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==0"
              icon="el-icon-edit" size="mini" type="text" @click="mdfDetail(scope.row)"
              v-hasPermi="['sale:saleOrder:edit']">修改</el-button>
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==1"
              icon="el-icon-edit" size="mini" type="text" @click=" auditDetail(scope.row,2)"
              v-hasPermi="['sale:saleOrder:audit']">撤销</el-button>
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==1"
              icon="el-icon-edit" size="mini" type="text" @click="auditDetail(scope.row,3)"
              v-hasPermi="['sale:saleOrder:audit']">审核</el-button>
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==2"
              icon="el-icon-edit" size="mini" type="text" @click="auditDetail(scope.row,6)"
              v-hasPermi="['sale:saleOrder:audit']">反审</el-button>
            <!--            <el-button style="margin-top: 1px" v-show="scope.row.status==5"  icon="el-icon-edit"  size="mini"   type="text" @click="auditDetail(scope.row,7)">标记完成</el-button>-->
            <!--            <el-button size="small" type="primary" @click="auditDetail(scope.row,4)">取消完成</el-button>-->
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==5"
              icon="el-icon-edit" size="mini" type="text" @click="auditDetail(scope.row,5)"
              v-hasPermi="['sale:saleOrder:audit']">指定结束</el-button>
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==0"
              icon="el-icon-edit" size="mini" type="text" @click=" reAddDetail(scope.row)"
              v-hasPermi="['sale:saleOrder:submit']">重新提交</el-button>
            <el-button class="caozuoxiangqengGN" style="margin-top: 1px" v-show="scope.row.status==0"
              icon="el-icon-delete" size="mini" type="text" @click="delSaleOrder(scope.row)"
              v-hasPermi="['sale:saleOrder:remove']">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination :background="true" :page-sizes="[10, 15, 20, 50, 500]" :total="totalItems"
        :current-page.sync="listQuery.pageNum" :page-size.sync="listQuery.pageSize"
        style="padding-top:25px; padding-left: 20px;float: right" layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch" @current-change="onSearch" />




      <!--      创建-->
      <el-dialog :visible.sync="showaddDialog" :close-on-click-modal="false" title="创建销售订单" width="55%"
        @close="closeAddDetail">

        <el-form label-position="right" label-width="80px" :model="formData" :rules="rule">
          <el-form-item label="优先级" prop="priority">
            <el-input v-model="formData.priority" style="width:50%" oninput="value=value.replace(/[^\d]/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="formData.orderNo" style="width:50%">></el-input>
          </el-form-item>
          <el-form-item label="商品" prop="goods">
            <!--            <el-popover placement="bottom-start" trigger="click">-->
            <!--              <Goodsone01 ref="Goodsone01" @selected="selected08($event,index)"-->
            <!--                          style="width:370px!important;" />-->
            <!--              <el-input slot="reference" v-model="formData.cbpc000" placeholder="" readonly-->
            <!--                        style="width:205.6%;">-->
            <!--              </el-input>-->
            <!--            </el-popover>-->

            <template style="width:200%;">
              <el-popover placement="bottom-start" trigger="click">
                <Goodsone01 ref="Goodsone01" @selected="selected08($event,1)" style="width:630px!important;" />
                <el-input slot="reference" v-model="formData.goods" placeholder="" readonly style="width:100%;">
                </el-input>
              </el-popover>
            </template>
          </el-form-item>
          <el-form-item label="数量" prop="qty">
            <el-input v-model="formData.qty" style="width:50%" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
          <!--        <el-form-item >-->
          <div class="el-dialog__footer">
            <el-button size="medium" type="primary" @click="addTotalOrder()">保存</el-button>
          </div>


          <!--        </el-form-item>-->
        </el-form>
      </el-dialog>


      <!--      修改生成订单-->
      <el-dialog :visible.sync="showmdfDialog" :close-on-click-modal="false" title="修改生产订单" width="55%"
        @close="closeMdfDetail">

        <el-form label-position="right" label-width="80px" :model="formData" :rules="rule">
          <el-form-item label="优先级" prop="priority">
            <el-input v-model="formData.priority" style="width:50%" oninput="value=value.replace(/[^\d]/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="formData.orderNo" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="商品" prop="goods">
            <!--            <el-popover placement="bottom-start" trigger="click">-->
            <!--              <Goodsone01 ref="Goodsone01" @selected="selected08($event,index)"-->
            <!--                          style="width:370px!important;" />-->
            <!--              <el-input slot="reference" v-model="formData.cbpc000" placeholder="" readonly-->
            <!--                        style="width:205.6%;">-->
            <!--              </el-input>-->
            <!--            </el-popover>-->

            <template style="width:200%;">
              <el-popover placement="bottom-start" trigger="click">
                <Goodsone01 ref="Goodsone01" @selected="selected08($event,1)" style="width:630px!important;" />
                <el-input slot="reference" v-model="formData.goods" placeholder="" readonly style="width:100%;">
                </el-input>
              </el-popover>
            </template>
          </el-form-item>
          <el-form-item label="数量" prop="qty">
            <el-input v-model="formData.qty" style="width:50%" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
          <!--        <el-form-item >-->
          <div class="el-dialog__footer">
            <el-button size="medium" type="primary" @click="mdfTotalOrder()">保存</el-button>
          </div>


          <!--        </el-form-item>-->
        </el-form>
      </el-dialog>


      <!--            详情-->
      <el-dialog :visible.sync="showDialog" :close-on-click-modal="false" title="生产订单详情" width="55%"
        @close="closeDetail">
        <!--        <el-form ref="infoform" :inline="true" label-width="11em" label-position = "right">-->
        <!--          <div class="divv" >-->
        <!--            <span>基本信息</span>-->
        <!--            <div style="width: 100%;height: 1px;border-top: solid #dfdfdf 0.2em"/>-->
        <!--            <div style="height: auto;width: 100%">-->

        <!--              <table border="0" class="tableclss">-->
        <!--                <tr><td>设备号:<span>{{ this.infoform.deviceNo }}</span>-->
        <!--                </td>-->
        <!--                </tr>-->
        <!--                <tr><td>设备号:<span>{{ infoform.deviceNo }}</span>-->
        <!--                </td>-->
        <!--                </tr>-->
        <!--                <tr><td>设备号:<span>{{ infoform.deviceNo }}</span>-->
        <!--                </td>-->
        <!--                </tr>-->
        <!--              </table>-->
        <!--            </div>-->
        <!--          </div>-->

        <!--        </el-form>-->

        <!--        <el-descriptions class="margin-top" title="设备信息" :column="3"  border>-->
        <!--          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>-->

        <!--          <el-descriptions-item label="设备号">{{this.infoform.deviceNo}}</el-descriptions-item>-->
        <!--          <el-descriptions-item label="设备号">{{this.infoform.deviceNo}}</el-descriptions-item>-->
        <!--          <el-descriptions-item label="设备号">{{this.infoform.deviceNo}}</el-descriptions-item>-->
        <!--          <el-descriptions-item label="设备号">{{this.infoform.deviceNo}}</el-descriptions-item>-->
        <!--          <el-descriptions-item label="设备号">{{this.infoform.deviceNo}}</el-descriptions-item>-->


        <!--        </el-descriptions>-->

        <el-form label-position="right" label-width="80px" :model="formData" :rules="rule">
          <el-form-item label="优先级">
            <el-input v-model="formData.priority" style="width:50%" readonly></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNo" style="width:50%" readonly></el-input>
          </el-form-item>
          <el-form-item label="商品">
            <!--            <el-popover placement="bottom-start" trigger="click">-->
            <!--              <Goodsone01 ref="Goodsone01" @selected="selected08($event,index)"-->
            <!--                          style="width:370px!important;" />-->
            <!--              <el-input slot="reference" v-model="formData.cbpc000" placeholder="" readonly-->
            <!--                        style="width:205.6%;">-->
            <!--              </el-input>-->
            <!--            </el-popover>-->

            <el-input v-model="formData.goods" placeholder="" style="width:70%;" readonly>
            </el-input>
            <!--                  <template  style="width:200%;">-->

            <!--                    <el-popover placement="bottom-start" trigger="click">-->
            <!--                      <Goodsone01 ref="Goodsone01" @selected="selected08($event,1)"-->
            <!--                                  style="width:630px!important;" />-->

            <!--                    </el-popover>-->
            <!--                  </template>-->
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="formData.qty" style="width:50%" readonly></el-input>
          </el-form-item>
          <!--        <el-form-item >-->
          <!--                <div class="el-dialog__footer" >-->
          <!--                  <el-button size="medium" type="primary" @click="showDetail(scope.row)">保存</el-button>-->
          <!--                </div>-->


          <!--        </el-form-item>-->
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>
<script>
// import x from ''
import { reAddSaleOrder, delSaleOrder, saleOrderList, totalOrderExcelListtmp, addTotalOrder, mdfTotalOrder } from '@/api/saleordermanage'
import { getToken } from '@/utils/auth'
//商品信息维护
import Goodsone01 from "@/components/Goodsone";
export default {
  components: {
    Goodsone01

  },
  data() {
    return {

      dateRange: [],
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, start]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            let day = start.getDay();
            let date = start.getDate();
            if (day != 0) {
              start.setDate(date - (day - 1));
            }
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上周',
          onClick(picker) {
            var oDate = new Date()
            oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7);
            let day = oDate.getDay()
            let start = new Date(),
              end = new Date();
            if (day == 0) {
              start.setDate(oDate.getDate());
              end.setDate(oDate.getDate() + 6);
            } else {
              start.setTime(oDate.getTime() - 3600 * 1000 * 24 * (day - 1));
              end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (7 - day));
            }
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setDate(1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上月',
          onClick(picker) {
            var oDate = new Date()
            let year = oDate.getFullYear();
            let month = oDate.getMonth();
            let start, end;
            if (month == 0) {
              year--
              start = new Date(year, 11, 1)
              end = new Date(year, 11, 31)
            } else {
              start = new Date(year, month - 1, 1)
              end = new Date(year, month, 0);
            }
            picker.$emit('pick', [start, end]);
          }
        },
        {
          text: '本季度',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上季度',
          onClick(picker) {
            var oDate = new Date()
            let year = oDate.getFullYear();
            let month = oDate.getMonth() + 1;
            let n = Math.ceil(month / 3); // 季度，上一个季度则-1
            let prevN = n - 1;
            if (n == 1) {
              year--
              prevN = 4;
            }
            month = prevN * 3; // 月份
            const start = new Date(year, month - 3, 1);
            const end = new Date(year, month, 0);
            picker.$emit('pick', [start, end]);
          }
        },
        {
          text: '本年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(0);
            start.setDate(1);
            picker.$emit('pick', [start, end]);
          }
        }
        ]
      },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      daterange: '',
      rule: {

        priority: [
          { required: true, message: '请输入优先级', trigger: 'blur' },
          // { type: 'number', message: '优先级必须为数字'}
        ],
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
        ],
        // goods: [
        //   { required: true, message: '请选择商品', trigger: 'blur' },
        // ],
        qty: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          // { type: 'number', message: '数量必须为数字'}
        ],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },
      totalItems: 0,
      // ExcelUploadUrl: process.env.VUE_APP_BASE_API+"/sale/importTotalOrder",
      // 设置上传的请求头部
      headers: { Authorization: 'Bearer ' + getToken() },
      // 上传的地址
      ExcelUploadUrl: process.env.VUE_APP_BASE_API + '/sale/importTotalOrder',
      orderNo: '',
      model: '',
      status: '',
      customer: "",
      formData: {},
      showDialog: false,
      showaddDialog: false,
      showmdfDialog: false,
      tableData: [],
      loadingOut: false,
      loadingState: false,

      orderList: [],
      statusType: [
        {
          value: 0,
          label: '未提交'
        },
        {
          value: 1,
          label: '已提交'
        },
        {
          value: 2,
          label: '已审核'
        },
        {
          value: 4,
          label: '已完成'
        },
        {
          value: 5,
          label: '已复审'
        },
        {
          value: 6,
          label: '指定结束'
        }
      ]

    }
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch()
  },
  methods: {
    onSubmit() {
    },
    handleSelectionChange() {
    },




    //查询商品信息维护
    selected08(e, row) {
      // row.cbpc000=e
      // this.$set(row,"cbpc000",e.substring(0,e.indexOf(".")))
      this.$set(this.formData, "goods", e.substring(0, e.indexOf(".")))
      this.$set(this.formData, "goodsId", e.substring(e.indexOf(".") + 1), 8523642)
      console.log(e, 111)
      console.log(row, 222)
      // row.cbpc08 = e.substring(e.indexOf(".") + 1)
      // this.$set(row,"cbpd08",e.substring(e.indexOf(".") +1),8523642)
      console.log(row, 555)
      // console.log(row.cbpc08,96325412);
      // console.log(name, 111)
      // console.log(index, 222)
      // this.$set(this.tableData, "cbpc000", e)

      // this.formArr[index].cbpc000=''
      // this.formArr[index].cbpc000=e
      // console.log(this.formArr)
      // console.log(name.substring(name.indexOf("-") + 1), 963);
      // this.form.cbpc000 = name.substring(0, name.indexOf("-"));
      // this.form2.cbpc09 = name.substring(name.indexOf("-") + 1);
      // this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form.cbpc000 = name;
      // this.form.cbpd08  =  name.substring(name.indexOf(".") +1);
      // console.log(this.form2.cbpd08,852369421);

      // this.$set(this.form,"cbpc000",name.substring(name.indexOf(".") +1))
      //  this.$set(this.form,"cbpc000",name.substring(0, name.indexOf("-")))
      // this.form.cbpc000 = name;
      // this.$set(this.tableData,"cbpc000",name);
      // this.$set(this.tableData,"cbpc000",name.substring(name.indexOf(".") +1));
      // this.tableData.cbpc000 = name.substring(name.indexOf(".") +1);
      // this.$forceUpdate()
      // console.log(this.$set(this.tableData,"cbpc000",name.substring(name.indexOf(".") +1)),852369421);
      // this.tableData.cbpc000 = "123";
      // this.tableData.num = "23344";
      // console.log(name,556623);
      // console.log(this.tableData.cbpc000,20220905);
    },

    reset() {
      this.model = ''
      this.orderNo = ''
      this.status = ''
      this.customer = ''
      this.dateRange = ''

    },
    createForm() {
      // this.showaddDialog = true
      this.$router.push({ path: "/Salesmanagement/saleOrderDetail/addSale", query: { id: 1 } })

    },
    showDetail(row) {
      this.$router.push({ path: "/Salesmanagement/saleOrderDetail/showSale", query: { id: row.id } })

    },
    closeDetail() {
      this.showDialog = false
      this.formData = {}

    },

    closeMdfDetail() {
      this.showmdfDialog = false
      this.formData = {}
    },
    closeAddDetail() {
      this.showaddDialog = false
      this.formData = {}
    },
    mdfDetail(row) {
      // this.formData=row
      // this.showmdfDialog = true

      this.$router.push({ path: "/Salesmanagement/saleOrderDetail/mdfSale", query: { id: row.id } })

    },
    auditDetail(row, opeateType) {
      this.$router.push({ path: "/Salesmanagement/saleOrderDetail/auditSale", query: { id: row.id, status: opeateType } })

      // const param = {
      //   orderId: row.id,
      //   opeateType: opeateType,
      //
      // }
      // auditSaleOrder(param).then(response => {
      //   // console.log(response)
      //   if ( response.code === 200) {
      //     this.$message.success("删除成功")
      //   } else {
      //     this.$message.error(response.data.msg)
      //   }
      // })
    },
    delSaleOrder(row) {
      this.$confirm('确认要删除' + row.orderNo + "销售订单吗？", '确认操作', {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        confirmButtonClass: this.confirmClass

      }).then(() => {
        const param = {
          orderId: row.id,
          delete: 1,

        }
        delSaleOrder(param).then(response => {
          // console.log(response)
          if (response.code === 200) {
            this.$message.success("删除成功")
          } else {
            // this.$message.error(response.msg)
          }
        })
      })
    },


    exprotData() {
      var startTime = null
      var endTime = null
      if (this.dateRange != null && this.dateRange.length == 2) {
        startTime = this.dateRange[0];
        endTime = this.dateRange[1];
      }
      const param = {
        orderNo: this.orderNo,
        customer: this.customer,
        status: this.status,
        startTime: startTime,
        endTime: endTime,
        type: 2
      }
      // this.loading=true;

      this.download('/sale/saleOrderExcelList', {
        ...param
      }, `国内销售订单数据_${new Date().getTime()}.xlsx`)

      // totalOrderExcelListtmp(param).then(response => {
      //   if (response.code === 200) {
      //
      //     this.$message({
      //       showClose: true,
      //       message: "下载成功",
      //       type: 'success'
      //     });
      //     this.loadingOut=false;
      //     // loading.close();
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: "没有生成相应的excel",
      //       type: 'waring'
      //     });
      //     // loading.close();
      //   }
      // })
    },
    downMub() {
      this.download('/sale/totalOrderExcelListtmp', {
        ...this.queryParams
      }, `生产订单模板_${new Date().getTime()}.xlsx`)

      // totalOrderExcelListtmp(param).then(response => {
      //   if (response.data != null && response.data.rows != null) {
      //     this.orderList = response.data.rows
      //     this.totalItems = response.data.total
      //   } else {
      //     this.deviceList = []
      //     this.totalItems = 0
      //   }
      // })
    },

    addTotalOrder() {
      const param = {
        priority: this.formData.priority,
        orderNo: this.formData.orderNo,
        goodsId: this.formData.goodsId,
        qty: this.formData.qty

      }

      addTotalOrder(param).then(response => {
        if (response.code == 200) {
          this.$notify.success("添加成功")

          this.showaddDialog = false
          this.formData = {}
          this.onSearch();
        } else {
          this.$notify.error(response.data.msg)

        }
      })



    },
    delTotalOrder(row) {
      this.$confirm('确认要删除' + row.orderNo + "销售订单？", '确认操作', {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        confirmButtonClass: this.confirmClass

      }).then(() => {
        const param = {
          id: row.id,
          delete: 1,

        }
        mdfTotalOrder(param).then(response => {
          // console.log(response)
          if (response.code === 200) {
            this.$notify.success("删除成功")
          } else {
            this.$notify.error(response.data.msg)
          }
        })
      })
    },

    mdfTotalOrder() {
      const param = {
        id: this.formData.id,
        priority: this.formData.priority,
        orderNo: this.formData.orderNo,
        goodsId: this.formData.goodsId,
        qty: this.formData.qty

      }

      mdfTotalOrder(param).then(response => {
        if (response.code == 200) {
          this.$notify.success("修改成功")

          this.showmdfDialog = false
          this.formData = {}
          this.onSearch();
        } else {
          this.$notify.error(response.data.msg)

        }
      })



    },
    uploadSuccess(res, file, fileList) {
      this.deviceRes = res.data
      // console.info(this.deviceRes[0].row)
      // console.info(this.deviceRes[0].columnList)
      this.message = ''
      this.loadingState = true
      if (res.code === 200) {
        this.loadingState = false
        this.$message.warning({
          dangerouslyUseHTMLString: true,
          showClose: true,
          message: '成功'
        })
        this.onSearch()

      } else {
        this.message = res.msg
        this.$message.warning({
          dangerouslyUseHTMLString: true,
          showClose: true,
          message: this.message.toString()
        })
        this.loadingState = false
      }
    },
    beforeUploadExcel(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      this.loadingState = true
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        })
      }
      return extension || extension2
    },

    formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return 'NO'
        } else if (row.status == 4) {
          return 'OK'
        }
      }
    },
    reAddDetail(row) {
      this.$confirm('确认要重新提交' + row.orderNo + "销售订单？", '确认操作', {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        confirmButtonClass: this.confirmClass

      }).then(() => {
        const param = {
          orderId: row.id


        }
        reAddSaleOrder(param).then(response => {
          // console.log(response)
          if (response.code === 200) {
            this.$message.success("提交成功")
          } else {
            // this.$message.error(response.msg)
          }
        })
      })
    },
    onSearch() {
      console.log('dateRange', this.dateRange)
      var startTime = null
      var endTime = null
      if (this.dateRange != null && this.dateRange.length == 2) {
        startTime = this.dateRange[0];
        endTime = this.dateRange[1];
      }

      const param = {
        orderNo: this.orderNo,
        model: this.model,
        customer: this.customer,
        type: 2,
        status: this.status,
        startTime: startTime,
        endTime: endTime,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }
      // console.info(param)
      saleOrderList(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.orderList = response.data.rows
          this.totalItems = response.data.total
        } else {
          this.orderList = []
          this.totalItems = 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/*.el-dialog__footer {*/
/*  padding: 15px;*/
/*  padding-top: 10px;*/
/*  text-align: right;*/
/*  -webkit-box-sizing: border-box;*/
/*  box-sizing: border-box*/
/*}*/

.caozuoxiangqengGN {
  border: 0 !important;
  padding: 0 !important;
}
</style>
