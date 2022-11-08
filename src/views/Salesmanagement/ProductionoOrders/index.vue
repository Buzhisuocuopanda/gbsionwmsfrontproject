<template>
  <!--生产总订单-->
  <div class="app-container">
    <div class="filter-container shengchuang">
      <el-form :inline="true" style="flex-grow: 0;height: auto;">
        <el-form-item label="订单号" class="item-r" label-width="60px">
          <el-input v-model="orderNo" class="filter-item" placeholder="订单号" />
        </el-form-item>

        <el-form-item label="商品型号" class="item-r" label-width="70px">
          <el-input v-model="model" class="filter-item" placeholder="商品型号" />
        </el-form-item>
        <el-form-item label="状态" class="item-r">
          <el-select v-model="status" placeholder="状态" class="middle-input" style="width:100px">
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="">
          <el-button v-hasPermi="['system:totalOrder:list']" class="filter-item" type="primary" icon="el-icon-search"
            style="margin-bottom:0;margin-left: 1em" @click="onSearch1">搜索
          </el-button>
          <el-button v-hasPermi="['system:totalOrder:list']" class="filter-item" type="primary"
            style="margin-bottom:0;margin-left: 1em" @click="reset">重置
          </el-button>
          <el-button v-hasPermi="['system:totalOrder:list']" class="filter-item" type="primary"
            style="margin-bottom:0;margin-left: 1em" @click="pldelete1">批量删除
          </el-button>
          <el-button v-hasPermi="['system:totalOrder:add']" class="filter-item" type="primary"
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
          <el-button v-hasPermi="['system:totalOrder:import']" class="filter-item" type="primary"
            v-on:click="handleImport()" style="margin-bottom:0;margin-left: 1em">导入</el-button>

          <el-button v-hasPermi="['system:totalOrder:export']" class="filter-item" type="primary"
            v-on:click="exprotData()" :loading=loadingOut style="margin-bottom:0;margin-left: 1em">导出
          </el-button>
          <!--          <el-button type="primary" v-on:click="downMub()" style="margin-bottom:0;margin-left: 1em">导入模板下载</el-button>-->
        </el-form-item>
      </el-form>
      <!-- style="height:calc(100% - 10)" -->
      <el-table @selection-change="handleSelectionChange" @sort-change="handleTableSort" :loading="loading"
        :data="orderList" :row-style="{ height: '3px' }" :cell-style="{ padding: '2px' }"
        element-loading-text="Loading。。。" width="100%;" height="500" border fit highlight-current-row stripe
        :row-key="getRowKeys" style="flex-grow: 1;">
        <el-table-column type='selection' label="全选" width="55" fixed>
        </el-table-column>
        <el-table-column sortable="custom" fixed label="优先级" align="left" prop="priority" min-width="100px;" />
        <el-table-column fixed label="订单号" align="left" prop="orderNo" min-width="140px;" />
        <el-table-column label="型号" align="left" prop="model" min-width="140px;" />
        <el-table-column label="描述" align="left" prop="description" min-width="380px;" />
        <el-table-column sortable="custom" :formatter="rounding" label="订单数量" align="right" prop="orderQty"
          min-width="100px;" />
        <el-table-column sortable="custom" :formatter="rounding" label="生产数量" align="right" prop="makeQty"
          min-width="100px;" />
        <el-table-column :formatter="rounding" label="占用数量" align="right" prop="useQty" min-width="76px;" />
        <el-table-column :formatter="rounding" label="已发货数量" align="right" prop="shippedQty" min-width="89px;" />
        <el-table-column :formatter="rounding" label="现有订单数量" align="right" prop="currentOrderQty" min-width="100px;" />
        <el-table-column label="类型" align="left" prop="orderTypeMsg" min-width="95px;" />
        <el-table-column label="状态" align="center" prop="status" min-width="80px;" :formatter="formatStateType" />
        <el-table-column label="操作" min-width="220px;">
          <template slot-scope="scope">
            <el-button v-hasPermi="['system:totalOrder:detail']" icon="el-icon-share" size="mini"
              class="caozuoxiangqengOrder" type="text" @click="showDetail(scope.row)">详情</el-button>
            <el-button v-hasPermi="['system:totalOrder:edit']" icon="el-icon-edit" size="mini"
              class="caozuoxiangqengOrder" type="text" @click="mdfDetail(scope.row)">修改</el-button>
            <el-button v-hasPermi="['system:totalOrder:remove']" icon="el-icon-delete" size="mini"
              class="caozuoxiangqengOrder" type="text" @click="delTotalOrder(scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination :background="true" :page-sizes="[10, 15, 20, 50, 500]" :total="totalItems"
        :current-page.sync="listQuery.pageNum" :page-size.sync="listQuery.pageSize"
        style="padding-top:20px; padding-left: 10px;text-align: right;flex-grow: 0;"
        layout="total, sizes, prev, pager, next, jumper" @size-change="onSearch" @current-change="onSearch" />


      <!--      创建-->
      <el-dialog :visible.sync="showaddDialog" :close-on-click-modal="false" title="创建生产订单" width="55%"
        @close="closeAddDetail" style="top:15%">

        <el-form label-position="right" label-width="80px" :model="formData" :rules="rule">
          <el-form-item label="优先级" prop="priority">
            <el-input v-model.number="formData.priority" style="width:50%">
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

            <el-select @change="goodsOnChange($event)" v-el-select-loadmore="loadMore" v-model="formData.goods"
              filterable clearable remote :remote-method="dataFilter" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in options" :key="item" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <!--            <template  style="width:200%;">-->
            <!--              <el-popover placement="bottom-start" trigger="click">-->
            <!--                <Goodsone01 ref="Goodsone01" @selected="selected08($event,1)"-->
            <!--                            style="width:630px!important;" />-->
            <!--                <el-input slot="reference" v-model="formData.goods" placeholder="" readonly-->
            <!--                          style="width:100%;">-->
            <!--                </el-input>-->
            <!--              </el-popover>-->
            <!--            </template>-->
          </el-form-item>
          <el-form-item label="订单数量" prop="qty">
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
        @close="closeMdfDetail" style="top:15%">

        <el-form label-position="right" label-width="80px" :model="formData" :rules="rule">
          <el-form-item label="优先级" prop="priority">
            <el-input v-model.number="formData.priority" style="width:50%">
            </el-input>
          </el-form-item>
          <el-form-item label="订单号" prop="orderNo">
            <el-input readonly v-model="formData.orderNo" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="商品" prop="goods">
            <!--            <el-popover placement="bottom-start" trigger="click">-->
            <!--              <Goodsone01 ref="Goodsone01" @selected="selected08($event,index)"-->
            <!--                          style="width:370px!important;" />-->
            <!--              <el-input slot="reference" v-model="formData.cbpc000" placeholder="" readonly-->
            <!--                        style="width:205.6%;">-->
            <!--              </el-input>-->
            <!--            </el-popover>-->
            <el-select disabled @change="goodsOnChange($event)" v-loadmore="loadMore" v-model="formData.goods"
              filterable clearable remote :remote-method="dataFilter" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!--            <template  style="width:200%;">-->
            <!--              <el-popover placement="bottom-start" trigger="click">-->
            <!--                <Goodsone01 ref="Goodsone01" @selected="selected08($event,1)"-->
            <!--                            style="width:630px!important;" />-->
            <!--                <el-input slot="reference" v-model="formData.goods" placeholder="" readonly-->
            <!--                          style="width:100%;">-->
            <!--                </el-input>-->
            <!--              </el-popover>-->
            <!--            </template>-->
          </el-form-item>
          <el-form-item label="订单数量" prop="qty">
            <el-input v-model="formData.qty" style="width:50%;text-align: right"
              oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
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
        @close="closeDetail" style="top:15%">
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
            <!--                  <el-input v-model="formData.priority" style="width:50%" readonly></el-input>-->
            <span>{{ formData.priority }}</span>
          </el-form-item>
          <el-form-item label="订单号">
            <!--                  <el-input v-model="formData.orderNo" style="width:50%" readonly></el-input>-->
            <span>{{ formData.orderNo }}</span>
          </el-form-item>
          <el-form-item label="商品">
            <!--            <el-popover placement="bottom-start" trigger="click">-->
            <!--              <Goodsone01 ref="Goodsone01" @selected="selected08($event,index)"-->
            <!--                          style="width:370px!important;" />-->
            <!--              <el-input slot="reference" v-model="formData.cbpc000" placeholder="" readonly-->
            <!--                        style="width:205.6%;">-->
            <!--              </el-input>-->
            <!--            </el-popover>-->

            <!--                  <el-input  v-model="formData.goods" placeholder=""-->
            <!--                            style="width:70%;" readonly>-->
            <!--                  </el-input>-->
            <span>{{ formData.goods }}</span>

            <!--                  <template  style="width:200%;">-->

            <!--                    <el-popover placement="bottom-start" trigger="click">-->
            <!--                      <Goodsone01 ref="Goodsone01" @selected="selected08($event,1)"-->
            <!--                                  style="width:630px!important;" />-->

            <!--                    </el-popover>-->
            <!--                  </template>-->
          </el-form-item>
          <el-form-item label="订单数量">
            <!--                  <el-input : v-model="formData.qty" style="width:50%;text-align: right" readonly></el-input>-->
            <span>
              {{ parseFloat(formData.qty).toFixed(2) }}
            </span>
          </el-form-item>
          <!--        <el-form-item >-->
          <!--                <div class="el-dialog__footer" >-->
          <!--                  <el-button size="medium" type="primary" @click="showDetail(scope.row)">保存</el-button>-->
          <!--                </div>-->


          <!--        </el-form-item>-->
        </el-form>
      </el-dialog>

      <!-- 用户导入对话框 -->
      <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body style="top:15%">
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
import { pldelete, totalOrderDetail, swJsGoodslistBySelect, swJsGoodslistBySelectAll, totalOrderList, totalOrderExcelListtmp, addTotalOrder, mdfTotalOrder } from '@/api/saleordermanage'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui';
//商品信息维护
import Goodsone01 from "@/components/Goodsone";
// import Vue from 'vue'
// Vue.directive('loadmore', {
//   bind(el, binding) {

//     // 获取element-ui定义好的scroll盒子
//     const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

//     SELECTWRAP_DOM.addEventListener('scroll', function () {

//       /*
//       * scrollHeight 获取元素内容高度(只读)
//       * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
//       * clientHeight 读取元素的可见高度(只读)
//       * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
//       * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
//       */
//       const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

//       if (CONDITION) {
//         binding.value();
//       }
//     });
//   }
// })
export default {
  name: 'ProductionoOrders',
  components: {
    Goodsone01

  },
  data() {
    return {
      rule: {
        priority: [
          { required: true, message: '请输入优先级' },
          { type: 'number', message: '优先级必须为数字', trigger: 'blur' }
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
      optionsAll: null,
      options: [],
      currrent: 0,
      listQuerySelect: {
        pageNum: 1,
        pageSize: 15
      },
      goodsMsg: '',
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
      single: true,
      formData: {},
      showDialog: false,
      showaddDialog: false,
      showmdfDialog: false,
      tableData: [],
      loadingOut: false,
      loadingState: false,
      plDeleIds: [],
      plDeleRows: [],
      sortkey: '',
      sorttype: '',
      orderList: [],
      loading: false,

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
        url: process.env.VUE_APP_BASE_API + "/sale/importTotalOrder"
      },
      statusType: [
        {
          value: 0,
          label: 'NO'
        },
        {
          value: 4,
          label: 'OK'
        }
      ],
      multipleSelection: []

    }
  },

  computed: {},
  watch: {
    '$route'(to, from) {
      this.onSearch()
    }
  },
  mounted() { // 自动触发写入的函数
    this.onSearch()
    this.initSelect()

    const param = {
      goodsMsg: this.formData.goods,
      pageNum: this.listQuerySelect.pageNum,
      pageSize: this.listQuerySelect.pageSize
    }
    swJsGoodslistBySelectAll(param).then(res => {
      if (res.code == "200") {
        this.optionsAll = res.data.rows
        this.options = this.optionsAll.slice(0, 50)
        this.current = 50
      } else {
        // this.$message.error(res.msg)
      }
    })
  },
  methods: {
    // getRowKeys(row) {
    //   return row.id
    // },
    handleSelectionChange(a) {
      console.log(a)
      this.multipleSelection = a.map(item => item.id)
      console.log(this.multipleSelection)
    },
    // 批量删除
    pldelete1() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning',
        })
      } else {
        this.$confirm('确定删除吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
        }).then(() => {
          console.log(this.multipleSelection)
          this.loading = true
          pldelete({ ids: this.multipleSelection }).then(response => {
            if (response.code == 200) {
              this.$notify({
                title: '删除成功',
                message: '',
                type: 'success',
                duration: 2000
              })
              this.multipleSelection = []
              this.onSearch()
              // this.$tab.refreshPage()
              console.log(this.multipleSelection)
              this.loading = false
            }
          }
          )
        })
      }
    },

    //列表表头设置
    headClasspw() {
      return {
        'text-align': 'left',
        height: '30px',
        padding: '0'
      }
    },


    onSubmit() {
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

    },
    createForm() {
      this.showaddDialog = true
    },
    showDetail(row) {
      const param = {
        id: row.id
      }
      totalOrderDetail(param).then(response => {
        if (response.code == 200) {

          this.showDialog = true
          this.formData = response.data
        }
      })

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
      const param = {
        id: row.id
      }
      totalOrderDetail(param).then(response => {
        if (response.code == 200) {

          this.showmdfDialog = true
          this.formData = response.data
        }
      })


    },
    getDateString() {
      let date = new Date()
      var year = date.getFullYear().toString().padStart(4, "0");
      var month = (date.getMonth() + 1).toString().padStart(2, "0");
      var day = date.getDate().toString().padStart(2, "0");

      return `${year}${month}${day}`;
    },

    exprotData() {
      const param = {
        orderNo: this.orderNo,
        model: this.model,
        status: this.status
      }
      // this.loading=true;
      let date = this.getDateString()

      this.download('/sale/totalOrderExcelList', {
        ...param
      }, `生产订单数据_${date}.xlsx`)

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
    // downMub() {
    //   this.download('/sale/totalOrderExcelListtmp', {
    //     ...this.queryParams
    //   }, `生产订单模板_${new Date().getTime()}.xlsx`)
    //
    //   // totalOrderExcelListtmp(param).then(response => {
    //   //   if (response.data != null && response.data.rows != null) {
    //   //     this.orderList = response.data.rows
    //   //     this.totalItems = response.data.total
    //   //   } else {
    //   //     this.deviceList = []
    //   //     this.totalItems = 0
    //   //   }
    //   // })
    // },

    addTotalOrder() {
      const param = {
        priority: this.formData.priority,
        orderNo: this.formData.orderNo,
        goodsId: this.formData.goodsId,
        qty: this.formData.qty
      }
      addTotalOrder(param).then(response => {
        if (response.code == 200) {
          this.$message.success("添加成功")

          this.showaddDialog = false
          this.formData = {}
          this.onSearch();
        } else {
          // this.$message.error(response.msg)

        }
      })
      this.initSelect()


    },
    delTotalOrder(row) {
      this.$confirm('确认要删除' + row.orderNo + "生产总订单？", '确认操作', {
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
            this.$message.success("删除成功")
            this.onSearch()
          } else {
            // this.$message.error(response.msg)
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
          this.$message.success("修改成功")

          this.showmdfDialog = false
          this.formData = {}
          this.onSearch();
        } else {
          // this.$message.error(response.msg)

        }
      })



    },
    // uploadSuccess(res, file, fileList) {
    //   this.deviceRes = res.data
    //   // console.info(this.deviceRes[0].row)
    //   // console.info(this.deviceRes[0].columnList)
    //   this.message = ''
    //   this.loadingState = true
    //   if (res.code === 200) {
    //     this.loadingState = false
    //     this.$message.warning({
    //       dangerouslyUseHTMLString: true,
    //       showClose: true,
    //       message: '成功'
    //     })
    //     this.onSearch()
    //
    //   } else {
    //     this.message = res.msg
    //     this.$message.warning({
    //       dangerouslyUseHTMLString: true,
    //       showClose: true,
    //       message: this.message.toString()
    //     })
    //     this.loadingState = false
    //   }
    // },
    // beforeUploadExcel(file) {
    //   var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    //   const extension = testmsg === 'xls'
    //   const extension2 = testmsg === 'xlsx'
    //   this.loadingState = true
    //   if (!extension && !extension2) {
    //     this.$message({
    //       message: '上传文件只能是 xls、xlsx格式!',
    //       type: 'warning'
    //     })
    //   }
    //   return extension || extension2
    // },

    formatStateType(row) {
      if (row != null) {
        if (row.status == 0) {
          return 'NO'
        } else if (row.status == 4) {
          return 'OK'
        }
      }
    },
    goodsOnChange(val) {
      // console.log(this.formData.customer)
      // console.log("val",val)
      console.log("val", val)
      this.formData.goodsId = val
      // row.qty=0.5
      //
      // if(this.formData.customerId==null){
      //   this.$message.error("请先选择客户")
      //   return;
      // }

      //检查goodsid是否存在
      // if(this.checkRepeat(this.tableData,row.goodsId)){
      //   row.goodsId=null
      //   row.normalPrice=0
      //   row.canUseSku=0
      //   this.$message.error("不能添加重复商品")
      //
      //   return
      // }
      // const param={
      //   goodsId: row.goodsId,
      //   customerId: this.formData.customerId,
      //   orderClass: 2
      // }
      //
      // //
      // goodsPriceAndSku(param).then(response => {
      //   if (response.code == "200") {
      //     row.normalPrice=response.data.normalPrice
      //     row.canUseSku=response.data.canUseSku
      //
      //   }else {
      //     row.normalPrice=0.0
      //     row.canUseSku=0.0
      //
      //     this.$message.error(response.msg)
      //
      //   }
      // });

    },
    initSelect() {
      const param = {}

      swJsGoodslistBySelect(param).then(response => {
        if (response.code == "200") {
          this.options = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });
    },

    dataFilter(val) {
      this.listQuerySelect.pageNum = 1
      this.goodsMsg = val
      const param = {
        goodsMsg: this.goodsMsg,
        pageNum: this.listQuerySelect.pageNum,
        pageSize: this.listQuerySelect.pageSize
      }

      swJsGoodslistBySelect(param).then(response => {
        if (response.code == "200") {

          this.listQuerySelect.pageNum = this.listQuerySelect.pageNum + 1
          this.options = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });

    },
    loadMore() {
      let arr = this.optionsAll.slice(this.current, this.current + 50)
      for (let i = 0; i < arr.length; i++) {
        this.options.push(arr[i])
      }
      this.curremt += 50

      //         console.log("滚动到底部了")
      // // 这里可以做你想做的任何事 到底执行
      //        this.options=this.options2
      // const param = {
      //   goodsMsg: this.formData.goods,
      //   pageNum: this.listQuerySelect.pageNum,
      //   pageSize: this.listQuerySelect.pageSize
      // }


      // swJsGoodslistBySelect(param).then(response => {
      //   if (response.code == "200") {
      //     this.listQuerySelect.pageNum = this.listQuerySelect.pageNum + 1
      //     // this.options.push.apply(this.options,response.data.rows)
      //     this.options.push(...response.data.rows)
      //   } else {
      //     this.$message.error(response.msg)
      //   }
      // });
    },
    handleImport() {
      this.upload.title = "生产总订单";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('/sale/totalOrderExcelListtmp', {
      }, `生产总订单模板_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      if (response.code == 200) {
        // this.$message.success(response.msg)
        this.$alert(response.msg, '上传结果', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `导入完成`
            // });
          }
        });
      } else {

        this.$alert(response.msg, '上传结果', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `导入完成`
            // });
          }
        });
        // this.$message.error(response.msg);


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


    rounding(row, column) {
      if (parseFloat(row[column.property]).toFixed(2) == null || isNaN(parseFloat(row[column.property]).toFixed(2))) {
        return '0.00';
      }
      return parseFloat(row[column.property]).toFixed(2)
    },
    // pldelete1() {
    //   console.log("批量删除")
    //   // var arr = []
    //   //遍历点击选择的对象集合，拿到每一个对象的id添加到新的集合中
    //   // this.plDeleRows.forEach(row => arr.push(row.id))
    //   console.log(this.plDeleRows)
    //   let arr = this.plDeleRows.map(item => item.id)
    //   console.log(arr)
    //   const param = {
    //     ids: arr
    //   }
    //   this.$confirm('确定删除吗', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'success',
    //     callback: action => {

    //       if (action == 'confirm') {
    //         //批量删除
    //         pldelete(param).then(response => {
    //           if (response.code == 200) {
    //             this.$notify({
    //               title: '删除成功',
    //               message: '',
    //               type: 'success',
    //               duration: 2000
    //             })
    //             console.log(this.plDeleRows)
    //             this.plDeleRows.slice(0, -1)

    //             console.log(this.plDeleRows)
    //             this.onSearch()

    //           } else {

    //           }

    //         }).catch(() => {
    //           console.log('error submit')
    //         })
    //       }
    //     }
    //   })

    // },
    // handleSelectionChange(val) {
    //   // console.log(val, "------------------")  //打印选中的行集合
    //   this.plDeleRows.push(...val)
    //   console.log(this.plDeleRows, "--------------------")
    //   // this.multipleSelection = val;
    // },
    //点击行触发，选中或不选中复选框
    handleRowClick(row, column, event) {
      // this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
      console.log(row)  //打印的时当前选中的行
    },
    handleTableSort(column) {
      console.log('1111', column)
      this.sortkey = column.prop
      this.sorttype = column.order
      const param = {
        orderNo: this.orderNo,
        model: this.model,
        status: this.status,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        sortKey: this.sortkey,
        sortType: this.sorttype


      }
      // console.info(param)
      totalOrderList(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.orderList = response.data.rows
          this.totalItems = response.data.total
        } else {
          this.orderList = []
          this.totalItems = 0
        }
      })

    },


    onSearch() {
      console.log('sort', this.sortkey)
      const param = {
        orderNo: this.orderNo,
        model: this.model,
        status: this.status,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        sortKey: this.sortkey,
        sortType: this.sorttype
      }
      // console.info(param)
      totalOrderList(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.orderList = response.data.rows
          this.totalItems = response.data.total
        } else {
          this.orderList = []
          this.totalItems = 0
        }
      })
    },

    onSearch1() {
      console.log('sort', this.sortkey)
      const param = {
        orderNo: this.orderNo,
        model: this.model,
        status: this.status,
        pageNum: 1,
        pageSize: this.listQuery.pageSize,
        sortKey: this.sortkey,
        sortType: this.sorttype
      }
      // console.info(param)
      totalOrderList(param).then(response => {
        if (response.data != null && response.data.rows != null) {
          this.orderList = response.data.rows
          this.totalItems = response.data.total
          this.listQuery.pageNum = 1
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

.shengchuang {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(93vh - 85px);
}

.caozuoxiangqengOrder {
  border: 0 !important;
  padding: 0 !important;
}

::v-deep .el-table__header-wrapper {
  height: 55px;
}

::v-deep .el-table__fixed-body-wrapper {
  position: absolute;
  left: 0;
  top: 55px !important;
  overflow: hidden;
  z-index: 3;
}
</style>
