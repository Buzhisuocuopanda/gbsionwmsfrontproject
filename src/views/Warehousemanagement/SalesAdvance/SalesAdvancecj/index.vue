<template>
  <div class="app-container">
    <el-form ref="form2" :model="form2" label-width="130px" :rules="rules" style="">
      <div class="chuangjiancaigous">销售预订变更单</div>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="8">
          <el-form-item label="销售预订单:" prop="GsSalesOrders">
            <!-- <el-input type="text" v-model="form2.orderNo" style="width: 60%;" /> -->
            <el-popover placement="bottom-start" trigger="click">
              <SalesBooking ref="SalesBooking" @selected="selected0222"
                style="width: 210px !important; height: 100px !important" />
              <el-input slot="reference" v-model="form2.GsSalesOrders" placeholder="" style="width: 68%">
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="日期:">
            <el-date-picker
              type="date"
              placeholder=""
              v-model="form2.orderDate"
              style="width: 60%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="20">
        <el-col style="" :span="6">
          <el-form-item label="客户名称:" prop="customer">
            <el-popover placement="bottom-start" trigger="click">
              <CustomerMainten ref="CustomerMainten" @selected="selected022"
                style="width: 210px !important; height: 100px !important" />
              <el-input slot="reference" v-model="form2.customer" placeholder="" style="width: 110%">
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col style="margin-left: -2%" :span="6">
          <el-form-item label="供料单位:" prop="supplier">
            <el-popover placement="bottom-start" trigger="click">
              <supplierMaintenance ref="supplierMaintenance" @selected="selected02" style="width: 210px !important" />
              <el-input slot="reference" v-model="form2.supplier" placeholder="" style="width: 100%">
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col style="margin-left: -4%" :span="6">
          <el-form-item label="工厂:" prop="factory">
            <el-input v-model="form2.factory" placeholder=""  style="width:100%;"></el-input>
            <!-- <el-popover placement="bottom-start" trigger="click">
              <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width: 210px !important" />
              <el-input slot="reference" v-model="form2.wh" placeholder="" style="width: 100%">
              </el-input>
            </el-popover> -->
          </el-form-item>
        </el-col>
        <el-col style="margin-left: -2%" :span="6">
          <!-- <el-select v-model="form2.salerId" placeholder="" style="width:100%;">
              <el-option v-for="item in jiageLeixeng" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
          <el-form-item label="销售人员:" prop="saler">
            <el-popover placement="bottom-start" trigger="click" clearable>
              <salerman ref="salerman" @selected="selected011699" style="width: 220px !important" />
              <el-input slot="reference" v-model="form2.saler" placeholder="" style="width: 85%">
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <!--商品信息维护-->
      </el-row>
      <el-row v-if="false">
        <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="商品id:" prop="goodsId">
            <el-input v-model="form2.goodsId" placeholder="" maxlength="30" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="数量id:" prop="qty">
            <el-input v-model="form2.qty" placeholder="" maxlength="30" style="width: 80%" />
          </el-form-item>
        </el-col>
        <!-- <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="商品型号:" prop="goodsclassify">
            <el-input v-model="form2.goodsclassify" placeholder="" maxlength="30" style="width: 80%" />
          </el-form-item>
        </el-col> -->
        <el-col style="margin-top: 0%; margin-left: 2%" :span="7">
          <el-form-item label="供应商id:" prop="supplierId">
            <el-input v-model="form2.supplierId" maxlength="30" style="width: 80%; border: solid #eee thin" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="仓库id:" prop="whId">
            <el-input v-model="form2.whId" placeholder="" maxlength="30" style="width: 80%; border: solid #eee thin" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="客户id:" prop="customerId">
            <el-input v-model="form2.customerId" placeholder="" maxlength="30"
              style="width: 80%; border: solid #eee thin" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="销售人员id:" prop="salerId">
            <el-input v-model="form2.salerId" placeholder="" maxlength="30"
              style="width: 80%; border: solid #eee thin" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 0%; margin-left: -3%" :span="7">
          <el-form-item label="销售预订单id:" prop="gsSalesOrders">
            <el-input v-model="form2.gsSalesOrders" placeholder="" maxlength="30"
              style="width: 80%; border: solid #eee thin" />
          </el-form-item>
        </el-col>
        <!-- 商品信息维护 -->
        <el-col>
          <el-form-item label="" v-if="false" prop="cbpd08" style="margin-left: 0.8%">
            <el-input v-model="form2.cbpd08" style="border: solid #eee thin; width: 70%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="24">
            <el-button plain style="float: left; margin-left:1%;" type="primary" @click="_ly_addFrom">增行</el-button>
          </el-col>
        </el-row>

        <el-table :data="tableData" border :span-method="arraySpanMethod" :row-style="{ height: '10px' }"
          :cell-style="{ padding: '5px' }" style="width: 100%; margin-top: 10px">
          <el-table-column prop="cala08" label="品牌" width="300">
            <template slot-scope="scope" style="width: 200%">
              <el-popover placement="bottom-start" trigger="click">
                <Goodsone01 ref="Goodsone01" @selected="selected08($event, scope.row)"
                  style="width: 600px !important" />
                <el-input slot="reference" v-model="scope.row.cala08" placeholder=""
                  style="width: 100%">
                </el-input>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="型号" width="300" />
          <el-table-column label="描述" width="300" />
          <el-table-column label="数量" width="100" prop="qty">
            <template slot-scope="scope" style="width: 200%">
              <el-input v-model="scope.row.qty" v-only-number="{ max: 100, min: 0, precision: 0.0 }" placeholder=""
                @keyup="validateMealStandard($event)" class="shuzicaoyou" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="100" prop="price">
            <template slot-scope="scope" style="width: 200%">
              <el-input v-model="scope.row.price" v-only-number="{ max: 100, min: 0, precision: 0.0 }"
                class="shuzicaoyou" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="orderDate" label="订单日期" width="215">
            <template slot-scope="scope">
              <el-date-picker type="date" placeholder="" v-model="scope.row.orderDate" @change="dateFormat"
                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%" @blur="changedate(scope.row)">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="supplierId" label="供应商id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.supplierId" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="goodsclassify" label="型号" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodsclassify" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="goodsclassifyy" label="型号" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodsclassifyy" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="goodsId" label="商品编号id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodsId" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="salerId" label="销售人员id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salerId" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="gsSalesOrders" label="销售预订单id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gsSalesOrders" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <span @click="_ly_delFrom(scope.row)">
                <i class="el-icon-delete" style="color: red"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div class="tinajia_dingwei">
      <el-button type="primary" @click="handleAdd">保 存</el-button>
      <el-button @click="handlexiaoshouone">取 消</el-button>
    </div>
  </div>
</template>

<script>
// import { PurchaseinboundAdds } from "@/api/Warehousemanagement/SalesShipment";

import {
  bgdxz,
  saleOrderListdetail,
} from "@/api/Warehousemanagement/SalesAdvance";

import { getToken } from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//商品信息维护
import Goodsone01 from "@/components/Goodsone";

//供应商
import ListLists from "@/components/ListMaintenance";

//客户
import CustomerMainten from "@/components/CustomerMaintenance";

//销售预订单
import SalesBooking from "@/components/SalesBooking";

//销售人员
import salerman from "@/components/salerman";

export default {
  name: "AuthUser",
  dicts: [
    "sys_normal_disable",
    "sw_js_store_type",
    "sys_user_sex",
    "sw_js_store_type_manage_mode",
  ],
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  components: {
    kuweixxweihu,
    supplierMaintenance,
    ListLists,
    Goodsone01,
    CustomerMainten,
    SalesBooking,
    salerman,
  },
  data() {
    return {
      dialogVisible: this.visible,
      formArr: [], // 表单结构数组
      infoRules: {
        // 表单规则
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            max: 20,
            message: "请输入1-20位的字符",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
          {
            max: 20,
            message: "请输入1-20位的字符",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入编号",
            trigger: "blur",
          },
          {
            max: 20,
            message: "请输入1-20位的字符",
            trigger: "blur",
          },
        ],
        branch: [
          {
            required: true,
            message: "请选择部门",
            trigger: "blur",
          },
          {
            message: "请选择部门",
            trigger: "blur",
          },
        ],
      },
      treeData: [
        {
          // 树状数据
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      currentSelectIndex: -1, // 缓存当前操作第几行的select
      temp: "占位",

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
      LeixingOptions: [
        {
          value: "1",
          label: "条码管理",
        },
        {
          value: "2",
          label: "数量管理",
        },
      ],
      value: "",

      //货币类型
      jiageLeixeng: [
        {
          value: "6",
          label: "CNY",
        },
        {
          value: "5",
          label: "USD",
        },
      ],
      value: "",

      //发票类别
      fapiaoleix: [
        {
          value: "1",
          label: "增值税专用发票",
        },
        {
          value: "2",
          label: "增值税普通发票",
        },
        {
          value: "3",
          label: "个人普通发票",
        },
        {
          value: "4",
          label: "不开发票",
        },
      ],
      value: "",

      //状态
      ZhuangTaivalue: [
        {
          value: "-1",
          label: "启用",
        },
        {
          value: "1",
          label: "禁用",
        },
      ],
      //合格状态
      hegezhuangtai: [
        {
          value: "-1",
          label: "合格",
        },
        {
          value: "1",
          label: "不合格",
        },
      ],
      value: "",

      //订单分类
      dingdanfelei: [
        {
          value: "1",
          label: "国内订单",
        },
        {
          value: "2",
          label: "国际订单",
        },
      ],
      value: "",

      //扫码状态
      saomazhuangtai: [
        {
          value: "-1",
          label: "已扫码",
        },
        {
          value: "1",
          label: "未扫码",
        },
      ],
      value: "",
      //入库状态
      rukuzhuangtai: [
        {
          value: "1",
          label: "待入库",
        },
        {
          value: "2",
          label: "已入库",
        },
      ],
      value: "",
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {
        cbpc07: "",
        cbpd08: "",
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
        cbpc01: "",
        cbpc000: "",
        cbpc099: "",
        supplierId: "",
        qty: "",
        goodsId: "",
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
        cbpd08: "",
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
        cbpd12: "",
        cbpc0999: "",
        customerId: "",
        salerId: "",
        supplierId: "",
        whId: "",
        orderDate: "",
        cbpc099: "",
        cbsb177: "",
        orderNo: "",
        GsSalesOrders: "",
      },
      defaultProps: {
        children: "children",
        label: "label",
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
          Authorization: "Bearer " + getToken(),
        },
        // 上传的地址
        url:
          process.env.VUE_APP_BASE_API + "/system/barcode/importSwJsSkuBarcode",
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        page: 1,
        size: 10,
        total: this.total,
        cbpc07: undefined,
        cbsa08: undefined,
        cbwa09: undefined,
        dateRange: undefined,
      },

      rules: {
        customer: [
          {
            required: true,
            message: "客户不能为空!",
            trigger: "change",
          },
        ],
        supplier: [
          {
            required: true,
            message: "供料单位不能为空!",
            trigger: "change",
          },
        ],
        factory: [
          {
            required: true,
            message: "工厂不能为空!",
            trigger: "change",
          },
        ],
        saler: [
          {
            required: true,
            message: "销售人员不能为空!",
            trigger: "change",
          },
        ],
        // cbpc07: [
        //     { required: true, message: "编号不能为空!", trigger: "blur" }
        // ]
      },

      //表格参数
      tableData: [],
      dataId: 0,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  computed: {
    dialogTitle() {
      return "添加";
    },
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getConfigKey("sys.user.initPassword").then((response) => {
      // this.initPassword = response.msg;
    });
    this.getDicts("sw_js_store_type").then((response) => {
      this.form.type = response.rows;
    });
    // this.form.type = this.dict[0].label;
    // this.userList.housingTime.substring(0, this.userList.housingTime.indexOf("T"));
    // console.log(this.userList,123456789);
    // this.chen();
    this.form2.cbph10 = "20";

    console.log(this.form.cbpc16, 123456);
  },
  methods: {
    // validateMealStandard(e) {
    //   let mealStandard = e.target.value
    //     .replace(/[^\d.]/g, "")
    //     .replace(/\.{2,}/g, ".")
    //     .replace(".", "$#$")
    //     .replace(/\./g, "")
    //     .replace("$#$", ".")
    //     .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3")
    //     .replace(/^\./g, "");
    //   if (mealStandard >= 999999999.99) {
    //     this.tableData.qty = 999999999.99;
    //   } else {
    //     this.tableData.qty = mealStandard;
    //   }
    // },
    dateFormat(row) {
      // let date =  row.slice(0, 10) + 'T' + row.slice(11, 19) + '.000+08:00'
      // row = date
      // console.log(row,date)
    },
    changedate(row){
      // console.log(row)
    },
    //添加模块-销售人员
    selected011699(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("~") + 1), 963);
      this.form2.saler = name.substring(0, name.indexOf("~"));
      this.form2.salerId = name.substring(name.indexOf("~") + 1);
      // this.form2.icon = name;
    },

    chen(item) {
      if (item.cbpd09 > 0 && item.cbpd11 > 0) {
        this.$set(
          item,
          "cbpd12",
          parseFloat(item.cbpd09) * parseFloat(item.cbpd11)
        );
      }
    },
    // 点击右上角关闭弹窗
    _ly_closeDialog(done) {
      console.log("_ly_closeDialog");
      this.$emit("on-close");
    },
    // 点击【取消】按钮关闭弹窗
    _ly_cancelDialog(done) {
      console.log("_ly_cancelDialog");
      this.$emit("on-close");
    },
    // 关闭弹窗前，二次询问是否关闭
    _ly_beforeClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    // 点击【保存】按钮后，如果每行的表单验证成功则存储数据
    _ly_ok() {
      let arr = [];
      let arr1 = this.tableData;
      for (let i = 0; i < arr1.length; i++) {
        arr.push({
          goodsId: arr1[i].goodsId,
          // goodsclassify: arr1[i].cbpb12,
          goodsclassify: arr1[i].cala08,
          gsSalesOrders: arr1[0].id,
          // .000+08:00
          // orderDate: arr1[i].orderDate.slice(0, 10) + 'T' + arr1[i].orderDate.slice(11, 19) + '.000+08:00',
          qty: arr1[i].qty,
          orderDate:arr1[i].orderDate.replace(' ','T') +'.000+08:00',
          price: arr1[i].price,
          factory:this.form2.factory,
          // salerId: arr1[0].salerId,
          // supplierId: arr1[0].supplierId,
        });
      }

      let obj = {
        "customerId": this.form2.customerId,
        "goods": arr,
        "gsid": this.form2.id,
        "orderNo": this.form2.orderNo,
        "supplierId": this.form2.supplierId,
        "salerId": this.form2.salerId,
        "factory": this.form2.factory,
      }
      if (!arr[0].gsSalesOrders) {
        return;
      } else {
        bgdxz(JSON.stringify(obj)).then((response) => {
          if (response.code == "200") {
            this.tableData = [];
            this.form2 = {
              cbpc07: "",
              cbpd08: "",
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
              cbpd12: "",
              cbpc0999: "",
              customerId: "",
              salerId: "",
              supplierId: "",
              whId: "",
              orderDate: "",
              cbpc099: "",
              cbsb177: "",
              orderNo: "",
              GsSalesOrders: "",
              factory:'',
            };
            this.$message({ message: "创建成功", type: "success" });
            this.handlexiaoshouone();
          }
          if (count-- === 1) {
            this._ly_save();
          }
        });
      }
    },

    // 存储表单数据
    _ly_save() {
      this.$message.success("添加成功");
      // 将数据传递给父组件。
      // 如果要将数据存储到后台，可在此处自行实现
      this.$emit("on-ok", this.tableData);
    },
    // 增加一行表单
    _ly_addFrom() {
      this.tableData.push({
        goodsId: '',
        cala08: '',
        gsSalesOrders: '',
        orderDate: '',
        qty: '',
        price: '',
        salerId: '',
        supplierId: '',
      })
      // for(let i = 1;i<this.tableData.length;i++){
      //   this.tableData[i] = obj
      // }
      this.dataId++;
      console.log(this.tableData, 852369);
    },
    // 删除一行表单
    _ly_delFrom(row) {
      // console.log('index: ' + index)
      // this.formArr.splice(index, 1)
      this.tableData.splice(this.tableData.indexOf(row), 1);
    },
    // 点击select的时候，缓存下行号
    // 如果一行有多个树状结构的select，可以通过缓存列号，区分是哪个select
    _ly_chooseBefore(index) {
      console.log("_ly_chooseBefore:" + index);
      this.currentSelectIndex = index;
    },
    // 选择树状结构的某个节点时，回调到这个函数
    _ly_chooseNode(data) {
      console.log("_ly_chooseNode:" + JSON.stringify(data));
      let index = this.currentSelectIndex;
      if (index === -1) {
        return;
      }
      // 通过缓存的行号，找到对应的表单，并且将数据存储起来。
      // 如果需要缓存更多的数据，可以在此处自行实现
      this.formArr[index].branch = data.label;

      // 选择后收起下拉框
      let formName = this.tableData[index].formName;
      this.$refs[formName + "_select"][0].blur(); // myform1648431132399_select
    },

    show() {
      this.showSearch = !this.showSearch;
    },

    // chen(item) {
    //   if (item.cbpd09 > 0 && item.cbpd11 > 0) {
    //     this.$set(item, 'cbpd12', (parseFloat(item.cbpd09) * parseFloat(item.cbpd11)))
    //   }
    // },

    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 3];
      } else if (columnIndex < 3) {
        return [0, 0];
      }
    },
    //添加模块-仓库
    selected01(name) {
      console.log(name, 123);
      // console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.wh = name.substring(0, name.indexOf("-"));
      this.form2.whId = name.substring(name.indexOf("-") + 1);
      console.log(this.form2.cbpc10, 8888888);
      // this.form2.icon = name;
    },

    // //添加模块-货币类型
    // selected004(name) {
    //   console.log(name, 123)
    //   console.log(name.substring(name.indexOf("-") + 1), 963);
    //   this.form2.cbpc166 = name.substring(0, name.indexOf("-"));
    //   this.form2.cbpc16 = name.substring(name.indexOf("-") + 1)
    //   // this.form2.icon = name;
    // },

    //添加模块-客户
    selected022(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.customer = name.substring(0, name.indexOf("-"));
      this.form2.customerId = name.substring(name.indexOf("-") + 1);
      this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form2.icon = name;
    },

    //添加销售预订单-预订单主键ID
    selected0222(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.GsSalesOrders = name.substring(0, name.indexOf("-"));
      this.form2.gsSalesOrders = name.substring(name.indexOf("-") + 1);
      // this.form2.icon = name;
      this.getchange(this.form2.gsSalesOrders, this.form2.GsSalesOrders);
    },
    getchange(id, orderno) {
      let obj = {
        id: id,
      };
      saleOrderListdetail(id).then((res) => {
        if (res.code == 200) {
          console.log(res.data);
          this.form2 = res.data.rows[0];
          this.tableData = res.data.rows;
          this.tableData.map((item) => {
            item.cala08 =
            item.cala08 + " ~ " + item.cbpb12 + " ~ " + item.cbpb08;
            item.orderDate = item.orderDate.slice(0,10) + ' ' + item.orderDate.slice(11,19)
          });
          this.form2.GsSalesOrders = orderno;
          console.log(this.tableData)
        }
      });
    },
    //添加模块-供应商
    selected02(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.supplier = name.substring(0, name.indexOf("-"));
      this.form2.supplierId = name.substring(name.indexOf("-") + 1);
    },

    //查询商品信息维护
    selected08(name, row) {
      console.log(name, 111);
      console.log(row, 222);
      this.$set(row, "goodsId", name.substring(name.indexOf(".") + 1), 8523642);
      this.$set(row,"cala08",name.substring(0, name.indexOf(".")),555);
      console.log(row, 96325412);
    },

    //添加行
    addData() {
      this.tianjiahang.push({
        tianjiaoname: "",
        tianjiaogender: "",
        tianjiaocontact: "",
      });
    },
    deletData(index) {
      this.tianjiahang.splice(index, 1);
    },

    // 取消按钮
    cancel() {
      this.open2 = false;
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
        classifyNum: undefined,
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

    /** 销售预订单变更单返回操作 */
    handlexiaoshouone: function (row) {
      // this.$router.push("/system/user-auth/role/");
      // this.$router.push("/system/user-SalesAdvancefanhui/role/");
      this.$store.dispatch("tagsView/delView", this.$route);
      // this.$router.push({
      //   path: "/system/user-SalesAdvancefanhui/role/",
      //   query: { id: 1 },
      // });
      this.$tab.closePage();
      this.$router.go(-1);
    },

    /** 新增按钮操作 */
    handleAdd() {
      this._ly_ok();

      //    this._ly_ok();
    },
  },
  mounted() {
    // 初始化表单数据，至少有一行表单数据
    this.tableData = [];
    this._ly_addFrom();
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible === false) {
        // 重新打开弹窗时，初始化表单数据，至少有一行表单数据
        this.tableData = [];
        this._ly_addFrom();
      }
    },
  },
};
</script>
<style src="./SalesAdvancecjcss/index.css" scoped>

</style>
