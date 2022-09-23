<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="70px"  >

<!--
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker v-model="dateRange.startTime" type="datetime" placeholder="选择开始日期" value-format="yyyy-MM-dd HH:mm:ss"
                            :default-time="'00:00:00'">
            </el-date-picker>
            ~
            <el-date-picker v-model="dateRange.endTime" type="datetime" placeholder="选择结束日期" value-format="yyyy-MM-dd HH:mm:ss"
                            :default-time="'23:59:59'">
            </el-date-picker>
          </el-form-item>
&lt;!&ndash;          <el-form-item>&ndash;&gt;
&lt;!&ndash;            <el-button type="primary" @click="onSearch()">查询</el-button>&ndash;&gt;
&lt;!&ndash;          </el-form-item>&ndash;&gt;
          <el-form-item label="编号"   class="item-r" >
            <el-input v-model="orderNo" class="filter-item"  placeholder="订单号" />
          </el-form-item>
        </el-form>
-->

<!--        <el-form-item label="订单号"   class="item-r" >-->
<!--          <el-input v-model="orderNo" class="filter-item"  placeholder="订单号" />-->
<!--        </el-form-item>-->



         <el-form-item>
              <el-button size="mini" class="biaoto-buttonchaxuen" @click="mdfDetail">加入</el-button>
         </el-form-item>
        <el-form-item style="margin: -5px -10px 1px 1px">
            
<!--          <el-button  class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom:0;margin-left: 2em" @click="onSearch">搜索</el-button>-->
<!--
          <el-button  class="filter-item" type="primary"  style="margin-bottom:0;margin-left: 2em" @click="createForm">创建</el-button>
-->

            <!--          <el-button class="filter-item" type="primary" style="margin-bottom:0;margin-left: 1em" @click="reset">重置</el-button>-->
<!--          <el-upload-->
<!--          <el-table-->
<!--            ref="multipleTable"-->
<!--            :data="tableData"-->
<!--            tooltip-effect="dark"-->
<!--            style="width: 100%"-->
<!--            border-->
<!--            @selection-change="handleSelectionChange"-->
<!--          >-->
<!--            <el-button type="primary" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >Excel导入</el-button>-->
<!--          </el-upload>-->
<!--          <el-button type="primary" v-on:click="exprotData()" :loading=loadingOut  style="margin-bottom:0;margin-left: 1em" >导出</el-button>-->
<!--          <el-button type="primary" v-on:click="downMub()"  style="margin-bottom:0;margin-left: 1em" >导入模板下载</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="orderList" element-loading-text="Loading。。。" width="100%;" border fit highlight-current-row stripe  @selection-change="handleSelectionChangee">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column fixed label="品牌" align="center" prop="brand" key="brand"  min-width="120px;"/>
        <el-table-column fixed label="型号" align="center" prop="model" min-width="120px;"/>
        <el-table-column  label="描述" align="center" prop="description" min-width="120px;" />
<!--        <el-table-column  label="销售人员" align="center" prop="caua15" min-width="200px;" />
        <el-table-column  label="制单时间" align="left" prop="cboe02" min-width="100px;" :formatter="formatDate" />-->
<!--        <el-table-column  label="生产数量" align="left" prop="makeQty"  min-width="100px;"/>-->
<!--        <el-table-column  label="已发货数量" align="left" prop="shippedQty" min-width="100px;"/>-->
<!--        <el-table-column  label="现有订单数量" align="left" prop="currentOrderQty" min-width="100px;"/>-->
<!--        <el-table-column  label="类型" align="center" prop="orderTypeMsg" min-width="120px;"/>-->
<!--        <el-table-column  label="状态" align="center" prop="status" min-width="120px;" :formatter="formatStateType"/>-->
        <el-table-column label="操作"  min-width="120px;">
          <template slot-scope="scope" >
            <el-button style="margin-left:8px; margin-top: 2px" icon="el-icon-share" plain size="mini"
                       type="text" @click="mdfDetail(scope.row)"
            >加入</el-button>

<!--            <el-button style="margin-left:8px; margin-top: 2px" icon="el-icon-share" plain size="mini"
                       type="text"  @click="delTotalOrder(scope.row)" v-hasPermi="['system:store:remove']">删除</el-button>-->
<!--            <el-button style="margin-left:8px; margin-top: 2px" icon="el-icon-share" plain size="mini"
                       type="text"
                       @click="showDetail(scope.row)">详情</el-button>-->

          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[10, 20, 30, 40]"
        :total="totalItems"
        :current-page.sync="listQuery.pageNum"
        :page-size.sync="listQuery.pageSize"
        style="padding-top:40px; padding-left: 20px;float: right"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="onSearch"/>



    </div>
    <!-- 创建 -->
    <el-dialog :title="title" :visible.sync="open2" append-to-body style="width:70%;margin-left:15%;">
      <div style="margin-top:-8%">创建售后单信息</div>
      <hr/>
      <el-form ref="form2" :model="form2"  label-width="20%" class="chuangjianformstore">

        <el-row style="margin-top:3%; ">
          <el-col style="margin-left:7%;">
            <el-form-item label="销售订单号:" prop="saleOrderNo">
              <el-input v-model="form2.saleOrderNo" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="客户:" prop="customerId">
              <el-input v-model="form2.customerId" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-left:7%;">
            <el-form-item label="商品id:" prop="goodsId">
              <el-input v-model="form2.goodsId" placeholder="" maxlength="30"
                        style="width:77%;" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="问题原因:" prop="question">
              <el-input v-model="form2.question" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-left:7%;">
            <el-form-item label="SN:" prop="sn">
              <el-input v-model="form2.sn" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="供料单位:" prop="suplierId">
              <el-input v-model="form2.suplierId" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-left:7%;">
            <el-form-item label="处理结果:" prop="answerMsg">

                <el-input v-model="form2.answerMsg" placeholder="" style="width:77%;"
                          maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="进度:" prop="process">

              <el-input v-model="form2.process" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">确 定</el-button>
        <el-button @click="cancelone">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->

    <el-dialog :title="title1" :visible.sync="open" append-to-body style="width:70%;margin-left:15%;">
      <div style="margin-top:-8%">修改售后单信息</div>
      <hr/>
      <el-form ref="form" :model="form" :rules="rules" label-width="20%" class="chuangjianformstore">

        <el-row style="margin-top:3%; ">
          <el-col style="margin-left:7%;">
            <el-form-item label="销售订单号:" prop="saleOrderNo">
              <el-input v-model="form.saleOrderNo" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="客户:" prop="customerId">
              <el-input v-model="form.customerId" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-left:7%;">
            <el-form-item label="商品id:" prop="goodsId">
              <el-input v-model="form.goodsId" placeholder="" maxlength="30"
                        style="width:77%;" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="问题原因:" prop="question">
              <el-input v-model="form.question" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-left:7%;">
            <el-form-item label="SN:" prop="sn">
              <el-input v-model="form.sn" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="供料单位:" prop="suplierId">
              <el-input v-model="form.suplierId" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-left:7%;">
            <el-form-item label="处理结果:" prop="answerMsg">

              <el-input v-model="form.answerMsg" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col style="margin-left:7%;">
            <el-form-item label="进度:" prop="process">

              <el-input v-model="form.process" placeholder="" style="width:77%;"
                        maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">确定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { delSaleOrder,saleOrderList, totalOrderExcelListtmp,addTotalOrder,mdfTotalOrder, goodsShopList} from '@/api/saleordermanage'
import { getToken } from '@/utils/auth'

export default {
  components: {},
  data() {
    return {
      title1: "",
      goodsId: "",
      ids: [],

      form: {
        customerId: "",
        saleOrderNo: "",
        goodsId: "",
        question: "",
        sn: "",
        suplierId: "",
        answerMsg: "",
        process:""
      },
      form2: {
        customerId: "",
        saleOrderNo: "",
        goodsId: "",
        question: "",
        sn: "",
        suplierId: "",
        answerMsg: "",
        process:""
      },
      title: "",

      loading: true,
      value1: '',
      userList: null,
      total: 0,

       totalItems: 0,
      cboe07: "",

      orderNo: "",
      model: "",
      formData: {
        name: "",
      },
      tableData: [],
      loadingOut:false,
      loadingState:false,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      open2: false,
      open: false,

      orderList: [],
      // 日期范围
      dateRange: {
        startTime: '',
        endTime: ''
      },
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        page: 1,
        size: 15,
        total: this.total,
        saleOrderNo: null,
      },
      // 表单参数
      // 表单校验
      rules: {
        customerId: [
          { required: true, message: "客户不能为空!", trigger: "blur" }
        ],
        saleOrderNo: [
          { required: true, message: "销售订单号不能为空!", trigger: "blur" }
        ],
        goodsId: [
          { required: true, message: "商品id不能为空!", trigger: "blur" }
        ],
        question: [
          { required: true, message: "问题原因不能为空!", trigger: "blur" }
        ],
        sn:[
          { required: true, message: "SN不能为空!", trigger:  'change'  }
        ],
        suplierId:[{
          required: true, message: "供料单位不能为空!", trigger: "blur"
        }],
        // cbla13:[{
        //     required: true, message: "备注不能为空!", trigger: "blur"
        // }],
        answerMsg:[{
          required: true, message: "处理结果不能为空!", trigger: "blur"
        }]
      },
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

      daterange: ''
    };
  },
  computed: {},
  mounted() { // 自动触发写入的函数
    this.onSearch()
  },
  created() {
    //仓库明细初始化
    // this.getList();
    },
  methods: {

     // 多选框选中数据
        handleSelectionChangee(selection) {
            this.ids = selection;
            this.idss = selection.map(item => item.goodsId);
            this.shenpiids = selection;
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },

    delTotalOrder(row){
      this.$confirm('确认要删除'+row.orderNo+"售后单？", '确认操作', {
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
        delSales(param).then(response => {
          // console.log(response)
          if ( response.code === 200) {
            this.onSearch()
            this.$notify.success("删除成功")

          } else {
            this.$notify.error(response.data.msg)
          }
        })
      })
    },

    mdfDetail(row) {
      // this.formData=row
      // this.showmdfDialog = true
    //  this.goodsId=this.orderList[0].goodsId;
     // console.log(this.goodsId,1111111)

      
       let userIds = this.ids.length > 0 ? this.ids : row
            this.$modal.confirm('是否确认删除,编号为"' + JSON.stringify(this.idss) + '"的数据项？').then(() => {
                userIds.forEach((item) => {
                 this.$router.push( {path: "/Salesmanagement/salemdfOrderDetails", query: { goods: JSON.stringify(this.idss) }})
        })
      })
      console.log(this.userIds,"123");
    },
    createForm(goodsId) {
      // this.showaddDialog = true
      this.$router.push({path: "/Salesmanagement/saleOrderDetail", query: {goodsId: goodsId}})

    },
    showDetail(row) {
      this.$router.push({path: "/Warehousemanagement/Outofstockregistrationdetail", query: {id: row.id}})

    },
    cancel() {
      this.open = false;
      this.reset();
    },
    cancelone() {
      this.open2 = false;
      this.reset01();
    },
    onSubmit() {},
    handleSelectionChange() {},
    formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return "NO"
        } else if (row.status == 4) {
          return "OK"
        }
      }
    },
    onSearch() {
      const param = {
        cboe07: this.orderNo,
        startTime: this.dateRange.startTime,
        endTime: this.dateRange.endTime,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        brand : this.brand
      }
      // console.info(param)
      goodsShopList(param).then(response => {
        if (response.data != null && response.data != null) {
          this.orderList = response.data;
          // console(response.data,8523)
          this.totalItems = response.data.total;
        } else {
          this.deviceList = []
          this.totalItems = 0
        }
        console.log(this.orderList);
      }


      )



    },
    /** 数形列表的商品分类按钮**/
    submitShangpin() {
      this.reset();
    },
    /** 普通删除按钮操作 */
    handleDelete01(row) {

      // row.classifyId = this.form.classifyId;
      // row.brand = this.form.brand;
      // row.model = this.form.model;
      // row.upc = this.form.upc;
      // row.description = this.form.description;
      // row.ifEnabled = this.form.ifEnabled;
      // row.id=this.form.id;
      // console.log(row, 2222);
      this.$modal.confirm('是否确认删除订单号为"' + row.saleOrderNo + '"的数据项？').then(function () {
        return  delSales(JSON.stringify(row));
      }).then((response) => {
        this.submitShangpin();
        this.onSearch();
        this.$modal.msgSuccess("删除成功");
      //  this.onSearch();

      }).catch(() => { });
    },
    //创建
    handlexiangqengchuangjian(row) {
      this.open2 = true;
    },
    /** 新增按钮操作 */
    handleAdd() {

      this.$refs["form2"].validate((item) => {
        if (item) {
          addSales(this.form2).then(response => {
            // console.log(this.from.parent_id, 123456789);
            // this.classifyId = response.posts;
            // console.log(response.posts,123456);

            this.$message({ message: '添加成功', type: 'success', style: 'color:red;!important' });
            // this.getTreeselect();
            // this.submitShangpin();
            //this.submitShangpin();
            this.onSearch();
            this.open2 = false;
            this.reset01();

            // console.log(this.form2.ifEnabled, 123456);
          });
        } else {
          // this.$message.error('请注意规范');
        }
      })
      // if (this.form2.swJsStoreId != undefined || this.form2.locationNum != undefined || this.form2.sort != undefined) {
      //     // console.log(this.form.id, 123456);

      //     addUserSysStoreku(this.form2).then(response => {
      //         // console.log(this.from.parent_id, 123456789);
      //         // this.classifyId = response.posts;
      //         // console.log(response.posts,123456);
      //         this.title = "添加用户";
      //         this.$message({ message: '恭喜你，添加成功', type: 'success', style: 'color:red;!important' });
      //         // this.getTreeselect();
      //         // this.submitShangpin();
      //         this.submitShangpin();
      //         this.getList();
      //         this.open2 = false;
      //         this.reset01();

      //         console.log(this.form2.ifEnabled, 123456);
      //     });
      // } else {
      //     this.$message.error('输入的内容不能为空呀');
      // }

      // this.reset();
      // } else {
      //   this.$message.error('错了哦，商品名称没有填呢');
      // }

    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let row = {}
          row.customerId = this.form.customerId;
          row.saleOrderNo = this.form.saleOrderNo;
          row.goodsId = this.form.goodsId;
          row.question = this.form.question;
          row.sn = this.form.sn;
          row.suplierId = this.form.suplierId;
          row.answerMsg = this.form.answerMsg;
          row.process = this.form.process;
          // console.log(this.form.id);
          updateSales(this.form, JSON.stringify(row)).then(response => {
            // console.log(response,789)
            // this.form = response.data;
            // this.name = response.name;
            // this.type = response.type;
            // this.deliveryPriority = response.deliveryPriority;
            // this.enableTotalOrder = response.enableTotalOrder;
            // this.enableTakeGoods = response.enableTakeGoods;
            // this.manageMode = response.manageMode;
            // this.ifEnabled = response.ifEnabled;
            // this.sysUserId = response.sysUserId;
            console.log(this.form, 789)
            // this.submitShangpin();
            this.onSearch();
            this.open = false;
            this.$message({ message: '修改成功', type: 'success' });

          });
        } else {
          // this.$message.error('库位码或库位顺序不能相同');
        }
      })
    },
    reset01() {
      this.form2 = {
        customerId: undefined,
        saleOrderNo: undefined,
        goodsId: undefined,
        question: undefined,
        sn: undefined,
        suplierId: undefined,
        answerMsg: undefined,
        process: undefined

      };
      this.resetForm("form");
    },
    /** 修改详情按钮操作**/
    handlexiangqengSelect(row) {
      console.log(this.form,111)
      console.log(row,222)
      // console.log(row)
      // this.getList();
      this.open = true;
      // console.log(row, 7788521);

      // this.form.cbpc100=this.form.cbwa09
      // this.
      // console.log(this.form)
      this.form=row
      console.log(this.form,1110)
    },
  },

  name: 'index.vue'
};
</script>

<style scoped>

</style>
