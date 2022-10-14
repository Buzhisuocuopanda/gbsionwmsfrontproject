<template>
  <!--国际销售订单-->
  <div class="app-container">
    <div class="filter-container saleorderGj">
      <el-form :inline="true" label-width="70px">
        <el-form-item label="订单号" class="item-r">
          <el-input v-model="orderNo" class="filter-item" placeholder="订单号"/>
        </el-form-item>

        <el-form-item label="客户" class="item-r">
          <el-input v-model="customer" class="filter-item" placeholder="客户"/>
        </el-form-item>
        <el-form-item  label="状态" class="item-r">
          <el-select v-model="status" placeholder="状态" class="middle-input" style="width:120px">
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" style="margin-left:1%;">
          <el-date-picker  v-model="dateRange" type="daterange"
                          :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin: -5px -10px 1px 1px">
          <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em"
                    @click="onSearch">搜索
          </el-button>
          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="reset">重置
          </el-button>
<!--          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="createForm">-->
<!--            创建-->
<!--          </el-button>-->
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
          <el-button v-hasPermi="['sale:saleOrder:import']" type="primary" v-on:click="handleImport()" style="margin-bottom:0;margin-left: 1em">导入</el-button>

          <el-button v-hasPermi="['sale:saleOrderGj:export']" type="primary" v-on:click="exprotData()" :loading=loadingOut
                    style="margin-bottom:0;margin-left: 1em">导出
          </el-button>
          <el-button  type="primary" v-on:click="skuDistribution()" :loading=loadingOut
                    style="margin-bottom:0;margin-left: 1em">库存分配
          </el-button>


<!--          <el-button type="primary" v-on:click="downMub()" style="margin-bottom:0;margin-left: 1em">导入模板下载</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="orderList"  :row-style="{height: '3px'}" :cell-style="{padding: '2px'}" element-loading-text="Loading。。。" width="100%;" height="450" border fit highlight-current-row
                stripe style="margin-top:1em">
        <el-table-column fixed label="编号" align="left" prop="orderNo" min-width="150px;"/>
        <el-table-column  label="客户订单号" align="left" prop="customerNo" min-width="120px;"/>
        <el-table-column  label="日期" align="left" prop="orderDate" min-width="120px;"/>
        <el-table-column label="客户" align="left" prop="customerName" min-width="200px;"/>
        <el-table-column label="销售人员" align="left" prop="saleUser" min-width="100px;"/>
        <el-table-column label="结算货币" align="left" prop="settleCurrentMsg" min-width="100px;"/>
        <el-table-column label="收货人" align="left" prop="receiver" min-width="100px;"/>
        <el-table-column label="地址" align="left" prop="address" min-width="500px;"/>
        <el-table-column label="电话" align="left" prop="phone" min-width="120px;"/>
        <el-table-column label="订单类型" align="left" prop="orderTypeMsg" min-width="120px;"/>
        <el-table-column label="订单分类" align="left" prop="orderClassMsg" min-width="120px;"/>
        <el-table-column label="工厂账号" align="left" prop="fcNumber" min-width="120px;"/>
        <el-table-column label="其他" align="left" prop="other" min-width="120px;"/>
        <el-table-column label="制单时间" align="left" prop="createTime" min-width="180px;"/>
<!--        <el-table-column  fixed="right"  label="确认库存状态" align="left" prop="confirmSkuStatusMsg" min-width="120px;"/>-->
        <el-table-column  fixed="right"  label="状态" align="center" prop="statusMsg" min-width="120px;"/>
<!--        <el-table-column label="其他" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->
        <el-table-column fixed="right" label="操作" min-width="180px;">
          <template slot-scope="scope">
            <el-button class="caozuoxiangqengGJ" style="margin-left:8px; margin-top: 2px" size="mini" icon="el-icon-share" type="text" @click="showDetail(scope.row)" v-hasPermi="['sale:saleOrderGj:detail']">详情</el-button>
            <el-button style="margin-top: 2px" v-show="scope.row.status==0" size="mini" type="primary" @click="mdfDetail(scope.row)">修改</el-button>
<!--            <el-button style="margin-top: 2px" v-show="scope.row.status==1" size="mini" type="primary" @click=" auditDetail(scope.row,2)">撤销</el-button>-->
            <el-button class="caozuoxiangqengGJ" style="margin-top: 2px" v-show="scope.row.status==1" icon="el-icon-edit" size="mini" type="text" @click="auditDetail(scope.row,3)" v-hasPermi="['sale:saleOrderGj:audit']">审核</el-button>
<!--            <el-button style="margin-top: 2px" v-show="scope.row.status==2" size="mini" type="primary" @click="auditDetail(scope.row,6)">反审</el-button>-->
<!--            <el-button style="margin-top: 2px" v-show="scope.row.status==5" size="mini" type="primary" @click="auditDetail(scope.row,7)">标记完成</el-button>-->
<!--            <el-button size="small" type="primary" @click="auditDetail(scope.row,4)">取消完成</el-button>-->
            <el-button class="caozuoxiangqengGJ" style="margin-top: 2px" v-show="scope.row.status==6" icon="el-icon-edit" size="mini" type="text" @click="auditDetail(scope.row,5)" v-hasPermi="['sale:saleOrderGj:audit']">指定结束</el-button>
<!--            <el-button class="caozuoxiangqengGJ" style="margin-top: 2px" v-show="scope.row.confirmSkuStatus==2" icon="el-icon-edit" size="mini" type="text" @click=" showConfirmDetail(scope.row,2)" v-hasPermi="['sale:saleOrder:confirm']">确认库存</el-button>-->
<!--            <el-button class="caozuoxiangqengGJ" style="margin-top: 2px" v-show="scope.row.confirmSkuStatus==1" icon="el-icon-edit" size="mini" type="text" @click=" showConfirmDetail(scope.row,1)" v-hasPermi="['sale:saleOrder:confirm']">取消库存</el-button>-->
            <el-button class="caozuoxiangqengGJ" style="margin-top: 2px" v-show="scope.row.status==0" icon="el-icon-edit" size="mini" type="text" @click="delSaleOrder(scope.row)" v-hasPermi="['sale:saleOrderGj:remove']">删除</el-button>
          </template>


        </el-table-column>
      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[10, 15, 20, 50, 500]"
        :total="totalItems"
        :current-page.sync="listQuery.pageNum"
        :page-size.sync="listQuery.pageSize"
        style="padding-top:25px; padding-left: 10px;float: right"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="onSearch"/>



      <!-- 用户导入对话框 -->
      <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
        <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                   :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                   :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip text-center" slot="tip">
            <!--            <div class="el-upload__tip" slot="tip">-->
            <!--              <el-checkbox v-model="upload.updateSupport" /> -->
            <!--            </div>-->
            <span>仅允许导入xls、xlsx格式文件。</span>
            <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                     @click="importTemplate">下载模板</el-link>
          </div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">确 定</el-button>
          <el-button @click="upload.open = false">取 消</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  // import x from ''
  import { confirmSkuSaleOrder,delSaleOrderGj,saleOrderListGj, totalOrderExcelListtmp,addTotalOrder,mdfTotalOrder } from '@/api/saleordermanage'
  import { getToken } from '@/utils/auth'
  //商品信息维护
  import Goodsone01 from "@/components/Goodsone";
  export default {
    components: {
      Goodsone01

    },
    data() {
      return {
        upload: {
          // 是否显示弹出层（用户导入）
          open: false,
          // 弹出层标题（用户导入）
          title: "",
          // 是否禁用上传
          isUploading: false,
          // 是否更新已经存在的用户数据
          updateSupport: 0,
          // 设置上传的请求头部
          headers: { Authorization: "Bearer " + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/sale/importySaleOrder"
        },
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
      selected08(e,row) {
        // row.cbpc000=e
        // this.$set(row,"cbpc000",e.substring(0,e.indexOf(".")))
        this.$set(this.formData,"goods",e.substring(0,e.indexOf(".")))
        this.$set(this.formData,"goodsId",e.substring(e.indexOf(".") +1),8523642)
        console.log(e,111)
        console.log(row,222)
        // row.cbpc08 = e.substring(e.indexOf(".") + 1)
        // this.$set(row,"cbpd08",e.substring(e.indexOf(".") +1),8523642)
        console.log(row,555)
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
      },
      createForm() {
        // this.showaddDialog = true
        this.$router.push({path: "/Salesmanagement/saleOrderDetail", query: {id: 1}})

      },
      showDetail(row) {
        this.$router.push({path: "/Salesmanagement/saleOrderDetail/showGjSale", query: {id: row.id}})

      },
      closeDetail() {
        this.showDialog = false
        this.formData={}

      },

      closeMdfDetail() {
        this.showmdfDialog = false
        this.formData={}
      },
      closeAddDetail() {
        this.showaddDialog = false
        this.formData={}
      },
      mdfDetail(row) {
        // this.formData=row
        // this.showmdfDialog = true

        this.$router.push({path: "/Salesmanagement/saleOrderDetail/mdfGjSale", query: {id: row.id}})

      },
      auditDetail(row,opeateType) {
        this.$router.push({path: "/Salesmanagement/gjAuditOrderDetail", query: {id: row.id,status:opeateType}})

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
      delSaleOrderGj(row){
        this.$confirm('确认要删除'+row.orderNo+"销售订单吗？", '确认操作', {
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
            if ( response.code === 200) {
              this.$message.success("删除成功")
            } else {

              this.$message.error(response.msg)
            }
          })
        })
      },


      exprotData() {
        var startTime=null
        var endTime=null
        if(this.dateRange!=null && this.dateRange.length==2){
          startTime=this.dateRange[0];
          endTime=this.dateRange[1];
        }
        const param = {
          orderNo: this.orderNo,
          customer: this.customer,
          status: this.status,
          startTime: startTime,
          endTime: endTime,
          type: 1
        }
        // this.loading=true;

        this.download('/sale/saleOrderExcelListGj', {
          ...param
        }, `国际销售订单数据_${new Date().getTime()}.xlsx`)

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

      addTotalOrder(){
        const param = {
          priority: this.formData.priority,
          orderNo: this.formData.orderNo,
          goodsId: this.formData.goodsId,
          qty: this.formData.qty

        }

        addTotalOrder(param).then(response => {
          if (response.code == 200) {
            this.$notify.success("添加成功")

            this.showaddDialog=false
            this.formData={}
            this.onSearch();
          } else {
            this.$notify.error(response.data.msg)

          }
        })



      },
      delTotalOrder(row){
        this.$confirm('确认要删除'+row.orderNo+"生产总订单？", '确认操作', {
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
            if ( response.code === 200) {
              this.$notify.success("删除成功")
            } else {
              this.$notify.error(response.msg)
            }
          })
        })
      },

      mdfTotalOrder(){
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

            this.showmdfDialog=false
            this.formData={}
            this.onSearch();
          } else {
            this.$notify.error(response.msg)

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
      handleImport() {
        this.upload.title = "生产总订单";
        this.upload.open = true;
      },
      /** 下载模板操作 */
      importTemplate() {
        this.download('/sale/exportSaleOrderTmp', {
        }, `国际销售订单模板_${new Date().getTime()}.xlsx`)
      },
      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true;
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        if(response.code == 200){
          this.$message.success('上传成功')
        }else {
          this.$message.error(response.msg);


        }
        this.upload.open = false;
        this.upload.isUploading = false;
        this.$refs.upload.clearFiles();
        // this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
        this.onSearch();
      },
      // 提交上传文件
      submitFileForm() {
        this.$refs.upload.submit();
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
      showConfirmDetail(row,status){
        this.$router.push({path: "/Salesmanagement/gjAuditOrderDetail", query: {id: row.id,confirmStatus:status}})

      },

      skuDistribution(){
        this.$router.push({path: "/Salesmanagement/saleGjDistribution"})

      },
      confirmSkuSaleOrder(row,operate){
        const param = {
          id: row.id,
          opearte: operate
        }

        confirmSkuSaleOrder(param).then(response => {
          if (response.code == 200) {
            this.message.success("修改成功")

            this.onSearch();
          } else {
            this.message.error(response.msg)

          }
        })

      },
      onSearch() {
        console.log('dateRange',this.dateRange)
        var startTime=null
        var endTime=null
        if(this.dateRange!=null && this.dateRange.length==2){
          startTime=this.dateRange[0];
          endTime=this.dateRange[1];
        }

        const param = {
          orderNo: this.orderNo,
          customer: this.customer,
          model: this.model,
          type: 1,
          status: this.status,
          startTime:startTime,
          endTime:endTime,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize
        }
        // console.info(param)
        saleOrderListGj(param).then(response => {
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

<style lang="scss">
/*.el-dialog__footer {*/
  /*  padding: 15px;*/
  /*  padding-top: 10px;*/
  /*  text-align: right;*/
  /*  -webkit-box-sizing: border-box;*/
  /*  box-sizing: border-box*/
  /*}*/
.caozuoxiangqengGJ {
  border: 0 !important;
  padding:0 !important;
}

.saleorderGj .el-button{
  border: 0px !important;
}
</style>
