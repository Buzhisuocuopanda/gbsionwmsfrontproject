<template>
  <div class="app-container">
    <!-- 国际订单审核页面 -->
    <section ref="print" class="recordImg" id="printRecord">
      <el-form ref="form2" :model="form2" label-width="230px" :rules="rules" style="" class="demo-ruleForm">
        <div class="chuangjiancaigous">销售订单</div>
        <el-descriptions :column="3" border style="margin-top: 30px" :contentStyle="CS" :label-style="LS">
          <el-descriptions-item label="编号">{{ this.formData.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="客户单号">{{ this.formData.customerNo }}</el-descriptions-item>
          <el-descriptions-item label="日期">{{ this.formData.orderDate }}</el-descriptions-item>
          <el-descriptions-item label="客户">{{ this.formData.customerName }}</el-descriptions-item>
          <el-descriptions-item label="销售人员">{{ this.formData.saleUser }}</el-descriptions-item>
          <el-descriptions-item label="结算货币">{{ this.formData.currencyMsg }}</el-descriptions-item>
          <el-descriptions-item label="收货人">{{ this.formData.receiveName }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ this.formData.receivePhone }}</el-descriptions-item>
          <el-descriptions-item label="发票类型">{{ this.formData.invoiceType }}</el-descriptions-item>
          <el-descriptions-item label="订单类型">{{ this.formData.orderTypeMsg }}</el-descriptions-item>
          <el-descriptions-item label="工厂账号">{{ this.formData.fcNumber }}</el-descriptions-item>
          <el-descriptions-item label="订单分类">{{ this.formData.orderClassMsg }}</el-descriptions-item>
          <el-descriptions-item label="地址">{{ this.formData.address }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ this.formData.remark }}</el-descriptions-item>
          <el-descriptions-item label="纳税人识别号">{{ this.formData.taxpayerid }}</el-descriptions-item>
          <el-descriptions-item label="发票地址">{{ this.formData.fpAdress }}</el-descriptions-item>
          <el-descriptions-item label="发票电话">{{ this.formData.fpPhone }}</el-descriptions-item>
          <el-descriptions-item label="发票开户行">{{ this.formData.fpbank }}</el-descriptions-item>
          <el-descriptions-item label="发票账号">{{ this.formData.fpNumber }}</el-descriptions-item>
          <el-descriptions-item label="发票邮寄地址">{{ this.formData.fpReceiveAddress }}</el-descriptions-item>
          <el-descriptions-item label="其他">{{ this.formData.other }}</el-descriptions-item>
        </el-descriptions>

        <div>
          <el-row>
            <el-col :span="24">
            </el-col>
          </el-row>
          <el-table :data="tableData" border :span-method="arraySpanMethod" style="width: 100%;margin-top: 10px;">
            <el-table-column prop="goodsMsg" label="品牌" width="">
              <template slot-scope="scope">
                <sapn>
                  <span>{{ scope.row.goodsMsg }}</span>
                </sapn>
              </template>
            </el-table-column>
            <el-table-column label="型号" width="" />
            <el-table-column label="描述" width="" />
            <el-table-column prop="qty" label="数量" width="150">
              <template slot-scope="scope">
                <div style="text-align: right">
                  {{ parseFloat(scope.row.qty).toFixed(2) }}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="confirmQty" label="确认库存数量" width="150" :formatter="rounding">
              <template slot-scope="scope">
                <div style="text-align: right">
                  {{ parseFloat(scope.row.confirmQty).toFixed(2) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="normalPrice" label="标准单价" width="150">
              <template slot-scope="scope">
                <div style="text-align: right">
                  {{ parseFloat(scope.row.normalPrice == null ? 0 : scope.row.normalPrice).toFixed(2) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="currentPrice" label="本次单价" width="150">
              <template slot-scope="scope">
                <div style="text-align: right">
                  {{ parseFloat(scope.row.currentPrice).toFixed(2) }}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="totalPrice" label="金额" width="150">
              <template slot-scope="scope">
                <div style="text-align: right">
                  {{ parseFloat(scope.row.totalPrice).toFixed(2) }}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="remark" label="备注" width="">
              <template slot-scope="scope">
                <sapn>
                  <span>{{ scope.row.remark }}</span>
                </sapn>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>

      <el-descriptions :column="2" border :contentStyle="CS" :label-style="LS">
        <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" label="本页数量小计"
          labelStyle="width: 30%;text-align:center">{{ parseFloat(this.formData.sumQty).toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" label="本页金额小计"
          labelStyle="width: 30%;text-align:center">{{ parseFloat(this.formData.sumPrice).toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" label="合计数量"
          labelStyle="width: 30%;text-align:center">{{ parseFloat(this.formData.sumQty).toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" label="合计金额"
          labelStyle="width: 30%;text-align:center">{{ parseFloat(this.formData.sumPrice).toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item label="大写" labelStyle="width: 30%;text-align:center">{{ this.formData.capPrice }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="3" border :contentStyle="CS" :label-style="LS">
        <el-descriptions-item label="制单" labelStyle="width: 20%;text-align:center">{{ this.formData.makeUser }}
        </el-descriptions-item>
        <el-descriptions-item label="审核" labelStyle="width: 20%;text-align:center">{{ this.formData.auditUser }}
        </el-descriptions-item>
        <el-descriptions-item label="仓库" labelStyle="width: 20%;text-align:center">{{ this.formData.ck }}
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 30px">
        <el-table :data="auditData" border style="width: 100%;margin-top: 10px; ">
          <el-table-column prop="auditUser" label=审批人 width="300%" style="text-align:center">
            <template slot-scope="scope">
              <sapn>
                <span>{{ scope.row.auditUser }}</span>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="审批详情" width="900%">
            <template slot-scope="scope">
              <sapn>
                <span>{{ scope.row.description }}</span>
              </sapn>
            </template>
          </el-table-column>

          <el-table-column prop="auditResult" label="审批结果" width="300%">
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.auditResult }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <div class="tinajia_dingwei">
      <!-- <el-button style="margin-left: 2%" type="primary" @click="handleExport">导出</el-button>
      <el-button style="margin-left: 2%" type="primary" @click="handleExport1">导出1</el-button>
      <el-button style="margin-left: 2%" type="primary" @click="xiaoschukudandayin">
        打印
      </el-button>
      <el-button style="margin-left: 2%" type="primary" @click="xiaoschukujianyibiao">
        打印1
      </el-button> -->
      <el-button style="margin-left: 2%" type="primary" @click="toExamine">
        审核
      </el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>



import {
  PurchaseinboundAdd,
  PurchaseinboundAdds, GoodsList01
} from "@/api/Warehousemanagement/PurchaseWarehousing";
import { mdfSaleOrder, saleOderDetailGj, swJsGoodslistBySelect, SwJsCustomerlistSelect, systemUserSelect, goodsPriceAndSku, customerDetail, addSaleOrder, auditSaleOrderGj } from '@/api/saleordermanage'


import {
  getToken
} from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//商品信息维护
import Goodsone01 from "@/components/Goodsone";

//供应商
import ListLists from "@/components/ListMaintenance";

// //客户
// import CustomerMainten from "@/components/CustomerMaintenance";

import Vue from 'vue';
Vue.directive('loadmore', {
  bind(el, binding) {

    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

    SELECTWRAP_DOM.addEventListener('scroll', function () {

      /*
      * scrollHeight 获取元素内容高度(只读)
      * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
      * clientHeight 读取元素的可见高度(只读)
      * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
      * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      */
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

      if (CONDITION) {
        binding.value();
      }
    });
  }
})
export default {
  name: "index",

  dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    kuweixxweihu,
    supplierMaintenance,
    ListLists,
    Goodsone01
  },
  data() {
    return {
      CS: {
        'text-align': 'center',
        'min-width': '250px',
        'word-break': 'break-all',

      },
      LS: {
        'color': '#000',
        'text-align': 'center',
        'font-weight': '600',
        'height': '40px',
        // 'background-color': 'rgba(255, 97, 2, 0.1)',
        'min-width': '110px',
        'word-break': 'keep-all',
      },
      infoform: {},
      dialogVisible: this.visible,
      formArr: [], // 表单结构数组
      goodsMsg: "",
      customerId: "",
      slaeUserId: "",
      qtyclass: "normQtyclass",
      infoRules: { // 表单规则
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        {
          max: 20,
          message: '请输入1-20位的字符',
          trigger: 'blur'
        }
        ],
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        },
        {
          max: 20,
          message: '请输入1-20位的字符',
          trigger: 'blur'
        }
        ],
        code: [{
          required: true,
          message: '请输入编号',
          trigger: 'blur'
        },
        {
          max: 20,
          message: '请输入1-20位的字符',
          trigger: 'blur'
        }
        ],
        branch: [{
          required: true,
          message: '请选择部门',
          trigger: 'blur'
        },
        {
          message: '请选择部门',
          trigger: 'blur'
        }
        ]
      },
      treeData: [{ // 树状数据
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentSelectIndex: -1, // 缓存当前操作第几行的select
      temp: '占位',

      // 遮罩层
      loading: true,
      tianjiahang: [],
      // 选中数组
      ids: [],
      shenpiids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      open1: false,
      open2: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      housingTime: [],
      // 供应商选项
      postOptions: [],
      //库位
      KuWeiOptions: [],
      //商品信息维护品牌
      shangponOptions: [],
      //商品信息维护的型号
      XinghaoOptions: [],
      //仓库信息维护
      //商品的品牌型号描述
      ponpaixenghaomiaoshu: [],
      // 日期范围
      dateRange: [],
      postCangKu: [],
      //修改下拉框首选值

      //主副表id
      zfb: [],
      //仓库类型
      LeixingOptions: [{
        value: '1',
        label: '条码管理'
      }, {
        value: '2',
        label: '数量管理'
      }],
      value: '',

      //货币类型
      jiageLeixeng: [{
        value: '6',
        label: 'CNY'
      }, {
        value: '5',
        label: 'USD'
      }],
      //发票类型
      invoiceoptions: [{
        value: '1',
        label: '增值税专用发票'
      }, {
        value: '2',
        label: '增值税普通发票'
      }, {
        value: '3',
        label: '个人普通发票'
      }, {
        value: '4',
        label: '不开发票'
      }],

      value: '',

      //发票类别
      fapiaoleix: [{
        value: '1',
        label: '增值税专用发票'
      }, {
        value: '2',
        label: '增值税普通发票'
      }, {
        value: '3',
        label: '个人普通发票'
      }, {
        value: '4',
        label: '不开发票'
      }],
      value: '',

      //状态
      ZhuangTaivalue: [{
        value: '-1',
        label: '启用'
      }, {
        value: '1',
        label: '禁用'
      }],
      //合格状态
      hegezhuangtai: [{
        value: '-1',
        label: '合格'
      }, {
        value: '1',
        label: '不合格'
      }],
      value: '',

      //订单分类
      dingdanfelei: [{
        value: '1',
        label: '国内订单'
      }, {
        value: '2',
        label: '国际订单'
      }],
      value: '',

      //扫码状态
      saomazhuangtai: [{
        value: '-1',
        label: '已扫码'
      }, {
        value: '1',
        label: '未扫码'
      }],
      value: '',
      //入库状态
      rukuzhuangtai: [{
        value: '1',
        label: '待入库'
      }, {
        value: '2',
        label: '已入库'
      }],
      value: '',
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {
        cbpc07: "",
        cbpc08: "",
        cbsa08: "",
        cbwa09: "",
        cala08: "",
        invoiceNumber: "",
        invoicePhone: "",
        invoiceTaxpayerNumber: "",
        invoiceType: "",
        name: "",
        phone: "",
        skuSort: "",
        telPeople: "",
        cbpd09: "",
        cbpd11: "",
        cbpd12: "",
        cbpc166: "",
        cbpc16: "",
        cbpc01: ""
      },
      formData: {
        orderType: 10,
        orderTypeMsg: "销售订单",
        orderClass: 2,
        orderClassMsg: '国内订单',
        receiveName: '',
        receivePhone: '',
        address: ''
      },
      form1: {
        // classifyId: "",
        // brand: "",
        // model: "",
        // upc: "",
        // description: "",
        // ifEnabled: ""
      },
      form2: {
        cbpc07: "",
        cbpc08: "",
        cbsa08: "",
        cbwa09: "",
        cala08: "",
        cbpc100: "",
        cbpc099: "",
        cbpc166: "",
        cbpc10: "",
        cbpc09: "",
        cbpd09: "",
        cbpd11: "",
        cbpd12: "",
        cbpc16: "",
        cbpc12: "",
        cbpc14: "",
        cbpd08: "",
        cbph09: "",
        cbph10: "",
        cbph11: "",
        cbpg161: "",
        cbpc01: "",
        cbpc000: "",
        cbpd09: "",
        cbpd11: "",
        cbpd12: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 用户导入参数
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
        headers: {
          Authorization: "Bearer " + getToken()
        },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/barcode/importSwJsSkuBarcode"
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      customerListQuery: {
        pageNum: 1,
        pageSize: 10
      },
      saleUserListQuery: {
        pageNum: 1,
        pageSize: 10
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,

        total: this.total,
        cbpc07: undefined,
        cbsa08: undefined,
        cbwa09: undefined,
        dateRange: undefined
      },


      rules: {
        orderDate: [
          { required: true, message: '请输入日期', trigger: 'blur' },
          // { type: 'number', message: '优先级必须为数字'}
        ],
        saleUserId: [
          { required: true, message: '请输入销售人员', trigger: 'blur' },
        ],
        // goods: [
        //   { required: true, message: '请选择商品', trigger: 'blur' },
        // ],
        customerId: [
          { required: true, message: '请输入客户', trigger: 'blur' },
          // { type: 'number', message: '数量必须为数字'}
        ],
      },
      //表格参数
      tableData: [],
      auditData: [],
      dataId: 0,
      options: [],
      saleUseroptions: [],
      customeroptions: [],
      saleUseroptions: [],

      //选择集合
      currencyoptions: [
        {
          value: 6,
          label: 'CNY'
        }, {
          value: 7,
          label: 'USD'
        }
      ],

      options3: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      },
      {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      options2: [{
        value: '选项1',
        label: '黄金糕2'
      }, {
        value: '选项2',
        label: '双皮奶2'
      }, {
        value: '选项3',
        label: '蚵仔煎2'
      }, {
        value: '选项4',
        label: '龙须面2'
      }, {
        value: '选项5',
        label: '北京烤鸭2'
      }],
    };
  },
  computed: {
    dialogTitle() {
      return '添加'
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {

    console.log(this.form.cbpc16, 123456);

  },
  methods: {

    // auditSaleOrder() {
    //   const param = {
    //     orderId: this.formData.id,
    //     opeateType: this.$route.query.status
    //   }
    //   auditSaleOrderGj(param).then(response => {
    //     if (response.code == "200") {
    //       this.$message.success("提交成功")
    //       this.$store.dispatch("tagsView/delView", this.$route)

    //       // this.$router.push({ path: "/Salesmanagement/SaleOrderGj", query: { id: 1 } })
    //       this.$tab.closePage();
    //       this.$router.go(-1)
    //     }
    //   })
    // },
    // 审核按钮
    toExamine() {
      const param = {
        orderId: this.formData.id,
        opeateType: this.$route.query.status
      }
      auditSaleOrderGj(param).then(response => {
        if (response.code == "200") {
          this.$message.success("提交成功")
          this.$store.dispatch("tagsView/delView", this.$route)

          // this.$router.push({ path: "/Salesmanagement/SaleOrderGj", query: { id: 1 } })
          this.$tab.closePage();
          this.$router.go(-1)
        }
      })
    },
    // 销售订单导出
    handleExport() {
      const userId = this.$route.query && this.$route.query.id;
      console.log([userId, this.$route])
      this.download(
        "/sale/saleOrderdetailsexport1?orderId=" +
        userId,
        {},
        `销售订单导出表— ${new Date().toLocaleDateString()}`
      );
    },
    // 销售订单导出1
    handleExport1() {
      const userId = this.$route.query && this.$route.query.id;
      console.log([userId, this.$route])
      this.download(
        "sale/saleOrderdetailsexport?orderId=" +
        userId,
        {},
        `销售订单导出表1— ${new Date().toLocaleDateString()}.xls`
      );
    },
    // 销售订单 打印
    xiaoschukujianyibiao() {
      const userId = this.$route.query && this.$route.query.id;
      console.log([userId, this.$route])
      this.download(
        "/sale/printSaleOrder?orderId=" +
        userId,
        {},
        `销售订单表— ${new Date().toLocaleDateString()}.pdf`
      );
    },
    // 销售订单打印页面
    xiaoschukudandayin(index, row) {
      // window.print()
      this.$print(this.$refs.print)
    },
    // 合并单元格
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        return [1, 3];
      } else if (columnIndex < 3) {
        return [0, 0];
      }
    },
    // 点击右上角关闭弹窗
    _ly_closeDialog(done) {
      console.log('_ly_closeDialog')
      this.$emit('on-close')
    },
    // 点击【取消】按钮关闭弹窗
    _ly_cancelDialog(done) {
      console.log('_ly_cancelDialog')
      this.$emit('on-close')
    },
    // 关闭弹窗前，二次询问是否关闭
    _ly_beforeClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 点击【保存】按钮后，如果每行的表单验证成功则存储数据
    _ly_ok() {
      let count = this.formArr.length // 记录当前有多少个表单
      for (var index in this.formArr) {
        var form = this.formArr[index]
        console.log(form)
        console.log(JSON.stringify(form))
        // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
        this.$refs[form.formName][0].validate((valid, obj) => {
          if (valid) {
            // 如果检查通过，则对count减1。
            // 当count为1时，表示是最后一个表单，则存储数据
            PurchaseinboundAdds(JSON.stringify(this.formArr)).then(response => {
              if (response.code == "200") {
                this.formArr = []
                this.form2 = {
                  cbpc07: "",
                  cbpc08: "",
                  cbsa08: "",
                  cbwa09: "",
                  cala08: "",
                  cbpc100: "",
                  cbpc099: "",
                  cbpc166: "",
                  cbpc10: "",
                  cbpc09: "",
                  cbpd09: "",
                  cbpd11: "",
                  cbpd12: "",
                  cbpc16: "",
                  cbpc12: "",
                  cbpc14: "",
                  cbpd08: "",
                  cbph09: "",
                  cbph10: "",
                  cbph11: "",
                  cbpg161: "",
                  cbpc01: "",
                  cbpc000: "",
                  cbpd09: "",
                  cbpd11: "",
                  cbpd12: ""
                }
              }
              if (count-- === 1) {
                this._ly_save()
              }
              this._ly_addFrom()
              //    this.formArr.cbpg01="1234567";
              //    this.form.cbpg01=this.formArr.cbpg01;
              //    console.log(this.form.cbpg01,85203);
            });

          } else {
            console.log(obj)
            return false
          }
        })
      }
      console.log('_ly_ok:' + JSON.stringify(this.formArr))
    },





    // 存储表单数据
    _ly_save() {
      this.$message.success('添加成功')
      // 将数据传递给父组件。
      // 如果要将数据存储到后台，可在此处自行实现
      this.$emit('on-ok', this.formArr)
    },
    // 增加一行表单
    _ly_addFrom() {
      // if (this.formArr.length >= 10) {
      //   this.$message.warning('最多只能添加10行')
      //   this.reset01();
      //   // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
      //   return

      // }

      // this.formArr.push({
      //   formName: 'myform' + (new Date()).getTime(), // myform1648431132399
      //   cbsc08: '',
      //   cbsc09: '',
      //   cbsc10: '',
      //   branch: '',
      //   cbpc01: this.form2.cbpg161,
      //   cbpd08: this.form2.cbpd08,
      // })
      this.tableData.push({
        goodsId: '',
        // normalPrice: '',
        qty: '',
        canUseSku: 0,
        moner: '',
        province: '',
      })
      this.dataId++
      console.log(this.tableData);
    },
    // 删除一行表单
    _ly_delFrom(row) {
      // console.log('index: ' + index)
      // this.formArr.splice(index, 1)
      this.tableData.splice(this.tableData.indexOf(row), 1)
    },
    // 点击select的时候，缓存下行号
    // 如果一行有多个树状结构的select，可以通过缓存列号，区分是哪个select
    _ly_chooseBefore(index) {
      console.log('_ly_chooseBefore:' + index)
      this.currentSelectIndex = index
    },
    // 选择树状结构的某个节点时，回调到这个函数
    _ly_chooseNode(data) {
      console.log('_ly_chooseNode:' + JSON.stringify(data))
      let index = this.currentSelectIndex
      if (index === -1) {
        return
      }
      // 通过缓存的行号，找到对应的表单，并且将数据存储起来。
      // 如果需要缓存更多的数据，可以在此处自行实现
      this.formArr[index].branch = data.label

      // 选择后收起下拉框
      let formName = this.formArr[index].formName
      this.$refs[formName + '_select'][0].blur() // myform1648431132399_select
    },






    show() {
      this.showSearch = !this.showSearch;
    },

    chen(item) {
      if (item.cbpd09 > 0 && item.cbpd11 > 0) {
        this.$set(item, 'cbpd12', (parseFloat(item.cbpd09) * parseFloat(item.cbpd11)))
      }
      // this.form2.cbpd12 = this.form2.cbpd09 * this.form2.cbpd11;
    },
    //添加模块-仓库
    selected01(name) {
      console.log(name, 123)
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc100 = name.substring(0, name.indexOf("-"))
      this.form2.cbpc10 = name.substring(name.indexOf("-") + 1)
      // this.form2.icon = name;
    },

    //添加模块-货币类型
    selected004(name) {
      console.log(name, 123)
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc166 = name.substring(0, name.indexOf("-"));
      this.form2.cbpc16 = name.substring(name.indexOf("-") + 1)
      // this.form2.icon = name;
    },

    //添加模块-供应商
    selected02(name) {
      console.log(name, 123)
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc099 = name.substring(0, name.indexOf("-"));
      this.form2.cbpc09 = name.substring(name.indexOf("-") + 1);
      this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form2.icon = name;
    },

    //查询商品信息维护
    selected08(e, index) {
      console.log(e, 111)
      console.log(index, 222)
      this.$set(this.formArr[index], "cbpc000", e)

      // this.formArr[index].cbpc000=''
      // this.formArr[index].cbpc000=e
      // console.log(this.formArr)
      // console.log(name.substring(name.indexOf("-") + 1), 963);
      // this.form2.cbpc099 = name.substring(0, name.indexOf("-"));
      // this.form2.cbpc09 = name.substring(name.indexOf("-") + 1);
      // this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form.cbpc000 = name;
      // this.form.cbpd08  =  name.substring(name.indexOf(".") +1);
      // console.log(this.form2.cbpd08,852369421);
    },

    //添加行
    addData() {
      this.tianjiahang.push({
        tianjiaoname: '',
        tianjiaogender: '',
        tianjiaocontact: ''
      })
    },
    deletData(index) {
      this.tianjiahang.splice(index, 1);
    },






    // 取消按钮
    cancel() {
      this.$store.dispatch("tagsView/delView", this.$route)
      // this.$router.push({ path: "/Salesmanagement/SaleOrderGj", query: { id: 1 } })
      this.$tab.closePage();
      this.$router.go(-1);
    },

    //添加的取消按钮
    cancel9() {
      this.open2 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        classifyName: undefined,
        classifyNum: undefined
      };
      // this.resetForm("form");
    },

    // 表单重置
    reset01() {
      // this.form2 = {
      //     brand: undefined,
      //     description: undefined,
      //     model: undefined,
      //     remark: undefined,
      //     skuName: undefined,
      //     sn: undefined,
      //     spuplierName: undefined,
      //     type: undefined
      // };
      // this.resetForm("form2");
      this.$refs["form2"].resetFields();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },



    /** 数形列表的商品分类按钮**/
    submitShangpin() {
      this.reset();
    },
    saleUserloadMore() {
      const param = {
        selectMsg: this.saleUser,
        pageNum: this.saleUserListQuery.pageNum,
        pageSize: this.saleUserListQuery.pageSize
      }


      SwJsCustomerlistSelect(param).then(response => {
        if (response.code == "200") {
          this.saleUserListQuery.pageNum = this.saleUserListQuery.pageNum + 1
          this.saleUseroptions.push.apply(this.saleUserListQuery, response.data.rows)
        } else {
          // this.$message.error(response.msg)
        }
      });
    },
    customerloadMore() {
      const param = {
        selectMsg: this.customerName,
        pageNum: this.customerListQuery.pageNum,
        pageSize: this.customerListQuery.pageSize
      }


      SwJsCustomerlistSelect(param).then(response => {
        if (response.code == "200") {
          this.customerListQuery.pageNum = this.customerListQuery.pageNum + 1
          this.customeroptions.push.apply(this.customeroptions, response.data.rows)
        } else {
          // this.$message.error(response.msg)
        }
      });
    },
    loadMore() {
      //         console.log("滚动到底部了")
      // // 这里可以做你想做的任何事 到底执行
      //        this.options=this.options2
      const param = {
        goodsMsg: this.goodsMsg,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }


      swJsGoodslistBySelect(param).then(response => {
        if (response.code == "200") {
          this.listQuery.pageNum = this.listQuery.pageNum + 1
          // this.options.push.apply(this.options,response.data.rows)
          this.options.push(...response.data.rows)
        } else {
          // this.$message.error(response.msg)
        }
      });
    },
    dataFilter(val) {
      this.listQuery.pageNum = 1
      this.goodsMsg = val
      const param = {
        goodsMsg: this.goodsMsg,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }

      swJsGoodslistBySelect(param).then(response => {
        if (response.code == "200") {

          this.listQuery.pageNum = this.listQuery.pageNum + 1
          this.options = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });

    },
    saleUserdataFilter(val) {
      this.saleUserListQuery.pageNum = 1
      this.saleUser = val
      const param = {
        selectMsg: this.saleUser,
        pageNum: this.saleUserListQuery.pageNum,
        pageSize: this.saleUserListQuery.pageSize
      }

      systemUserSelect(param).then(response => {
        if (response.code == "200") {
          this.saleUserListQuery.pageNum = this.saleUserListQuery.pageNum + 1
          this.saleUseroptions = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });

    },
    customerdataFilter(val) {
      this.customerListQuery.pageNum = 1
      this.customerName = val
      const param = {
        selectMsg: this.customerId,
        pageNum: this.customerListQuery.pageNum,
        pageSize: this.customerListQuery.pageSize
      }

      SwJsCustomerlistSelect(param).then(response => {
        if (response.code == "200") {
          this.customerListQuery.pageNum = this.customerListQuery.pageNum + 1
          this.customeroptions = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });

    },
    selected022(name) {
      console.log(name, 123)
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc0999 = name.substring(0, name.indexOf("-"));
      this.form2.customerId = name.substring(name.indexOf("-") + 1);
      this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form2.icon = name;
    },
    initCustomerSelect() {
      const param = {}

      SwJsCustomerlistSelect(param).then(response => {
        if (response.code == "200") {
          this.customeroptions = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });
    },
    goodsQtyChange(row) {
      if (row.qty > row.canUseSku) {
        row.qty = 0
        this.$message.error("数量不能超过可用库存数量")
      }
    },

    goodsOnChange(row, val) {
      // console.log(this.formData.customer)
      // console.log("val",val)
      console.log("row", row)
      console.log("val", val)
      row.goodsId = val
      // row.qty=0.5

      if (this.formData.customerId == null) {
        this.$message.error("请先选择客户")
        return;
      }

      //检查goodsid是否存在
      if (this.checkRepeat(this.tableData, row.goodsId)) {
        row.goodsId = null
        row.normalPrice = 0
        row.canUseSku = 0
        this.$message.error("不能添加重复商品")

        return
      }
      const param = {
        goodsId: row.goodsId,
        customerId: this.formData.customerId,
        orderClass: 2
      }

      //
      goodsPriceAndSku(param).then(response => {
        if (response.code == "200") {
          row.normalPrice = response.data.normalPrice
          row.canUseSku = response.data.canUseSku

        } else {
          row.normalPrice = 0.0
          row.canUseSku = 0.0

          // this.$message.error(response.msg)

        }
      });

    },
    getQtyStyle(row) {
      return "color: red"

    },
    checkRepeat(arr, goodsId) {
      console.log('arr', arr)
      console.log('goodsId', goodsId)
      var dupNum = 0
      arr.forEach((item) => {
        if (item.goodsId == goodsId) {
          console.log("重复了")
          dupNum = dupNum + 1;

        }

      });
      console.log("重复了2")
      if (dupNum == 1 || dupNum == 0) {
        return false
      } else {
        return true;

      }
    },
    saleUserOnChange(val) {
      this.formData.saleUserId = val
    },
    customerOnChange(val) {
      // console.log(this.formData.customer)
      // console.log("val",val)
      // console.log("val",row)
      // row.qty=0.5
      if (val == '') {
        return
      }
      const param = {
        cbca01: val,

      }

      //
      customerDetail(param).then(response => {
        if (response.code == "200") {
          this.formData.receivePhone = response.data.cbca16
          this.formData.receiveName = response.data.cbca14
          this.formData.address = response.data.cbca15
          this.formData.customerId = response.data.cbca01


        } else {
          this.formData.receivePhone = ''
          this.formData.receiveName = ''
          this.formData.address = ''
          // this.$message.error(response.msg)

        }
      });

    },

    initSaleUserSelect() {
      const param = {}

      systemUserSelect(param).then(response => {
        if (response.code == "200") {
          this.saleUseroptions = response.data.rows
        } else {
          // this.$message.error(response.msg)
        }
      });
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



    /** 新增按钮操作 */
    handleAdd() {

      this.formData.goods = this.tableData
      mdfSaleOrder(this.formData).then(response => {
        if (response.code == "200") {
          this.$message.success("修改成功")
          this.$store.dispatch("tagsView/delView", this.$route)
          this.$router.push({ path: "/Salesmanagement/SaleOrderGn", query: { id: 1 } })

        } else {

          // this.$message.error(response.msg)

          // this.$router.go(-1)

        }
      }
      )



      // this.$refs["form2"].validate((item) => {
      //   if (item) {
      //     PurchaseinboundAdd(this.form2).then(response => {
      //       if (response.code == "200") {
      //         this.$message({
      //           message: '添加成功',
      //           type: 'success',
      //           style: 'color:red;!important'
      //         });
      //         this.submitShangpin();
      //         this.open2 = false;
      //         this.reset01()
      //         this.form2.cbpg161 = response.data.id;
      //         this.form.cbpc01 = response.data.id;
      //         // console.log(this.form2.cbpg161,111);
      //         // console.log(this.form.cbpg01,222);
      //         console.log(response.data.id, 333);
      //         this.formArr.forEach((item) => {
      //           item.cbpc01 = response.data.id
      //           // item.cbpd08= this.form2.cbpd08;
      //           // item.cbpd09= this.form.cbpd09;
      //           // item.cbpd11= this.form.cbpd11;
      //           // item.cbpd12= this.form.cbpd12;
      //           let t = item.cbpc000;
      //           item.cbpd08 = t.substring(t.indexOf(".") + 1);
      //           console.log(t.substring(t.indexOf(".") + 1), 33333);
      //         })
      //         console.log(this.formArr, 888)
      //         this._ly_ok()
      //       }
      //     });
      //   } else {
      //     this.$message.error('请注意规范');
      //   }
      // })
      //    this._ly_ok();
    },

    /** 返回操作 */
    handleChuangJiangone: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$router.push("/system/user-cktkfh/role/");
    },
    sum(row) {
      if (row.qty != null && row.currentPrice != null) {
        row.totalPrice = row.qty * row.currentPrice;
      }
    },

  },
  mounted() {
    // 初始化表单数据，至少有一行表单数据
    this.formArr = []
    this._ly_addFrom()

    const param = {
      orderId: this.$route.query.id
    }
    saleOderDetailGj(param).then(response => {
      if (response.code == "200") {
        // this.formData=response.data
        // this.formData.id =response.data.id
        // this.formData.orderNo =response.data.orderNo
        // this.formData.customerNo =response.data.customerNo
        // this.formData.customerId =response.data.customerId
        // this.formData.customerName =response.data.customerName
        // this.formData.orderDate =response.data.orderDate
        // this.formData.saleUserId =response.data.saleUserId
        // this.formData.saleUser =response.data.saleUser
        // this.formData.currency =response.data.currency
        // this.formData.receiveName =response.data.receiveName
        // this.formData.receivePhone =response.data.receivePhone
        // this.formData.invoiceType =response.data.invoiceType
        // this.formData.address =response.data.address
        // this.formData.fcNumber =response.data.fcNumber
        // this.formData.sumQty =response.data.sumQty
        // this.formData.sumPrice =response.data.sumPrice
        // this.formData.CapPrice =response.data.CapPrice
        // this.formData.makeUser =response.data.makeUser
        // this.formData.auditUser =response.data.auditUser
        // this.formData.fpAdress =response.data.fpAdress
        // this.formData.taxpayerid =response.data.taxpayerid
        // this.formData.fpAdress =response.data.fpAdress
        // this.formData.fpPhone =response.data.fpPhone
        // this.formData.fpbank =response.data.fpbank
        // this.formData.fpNumber =response.data.fpNumber
        // this.formData.fpReceiveAddress =response.data.fpReceiveAddress
        this.formData = response.data
        this.formData.other = response.data.other
        this.auditData = response.data.audits
        // this.tableData.push(...response.data.goods)
        this.tableData = response.data.goods
        console.log('tableData', this.tableData)

      } else {
        // this.$message.error(response.msg)
      }
    }
    )
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
      if (this.dialogVisible === false) {
        // 重新打开弹窗时，初始化表单数据，至少有一行表单数据
        this.formArr = []
        this._ly_addFrom()
      }
    }
  }
};
</script>


<style src=".././PurchaseWarehousingcjcss/index.css">
.normQtyclass {
  background-color: #00afff;
}

.demo-ruleForm>>>.el-input__inner {
  border: 0;
}



/*.inputDeep >>> .el-input__inner {*/
/*  -webkit-appearance: none;*/
/*  background-color: #FFF;*/
/*  background-image: none;*/
/*  border-radius: 4px;*/
/*  border: 0px;*/
/*width: 100%;*/
/*}*/
</style>
