<template>
  <div>
    <div class="Purchase_caigou">销售提货单修改</div>
    <!-- <div class="Purchase_sum" v-for="(value, key) in userList" :key="key">
      <span class="Purchase_bianhao">编号：{{ value.cbpg07 || "" }}</span>
      <span class="Purchase_riqii"
        >日期：{{ value.cbse08.slice(0, 10) || "" }}</span
      >
    </div> -->
    <div style="width: 90%; margin-left: 5%; margin-top: 1%">
      <!-- 横向 -->
      <el-descriptions class="margin-top" title="" :column="4" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">客户</template>
          <el-popover placement="bottom-start" trigger="click" disabled>
            <CustomerMaintenance ref="CustomerMaintenance" @selected="selected088" style="width:300px; !important;" />
            <el-input slot="reference" v-model="form2.cbse099" placeholder="" readonly style="width: 100%">
            </el-input>
          </el-popover>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">仓库</template>
          <el-popover placement="bottom-start" trigger="click" clearable disabled>
            <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width: 100% !important" />
            <el-input slot="reference" v-model="form2.cbpc100" placeholder="" readonly style="width: 100%">
            </el-input>
          </el-popover>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">结算货币</template>
          <!-- <el-input type="text" v-model="form2.cbse166" style="width: 100%" /> -->
          <el-select v-model="form2.cbse166" clearable placeholder="请选择" style="width: 70%;">
            <el-option v-for="item in jiageLeixeng" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">关联订单</template>
          <el-select v-model="form2.cbse18" placeholder="" style="width: 77%">
            <el-option v-for="item in guanliandindan" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
      <!--  -->
      <!-- 纵向 v-for="(value, key) in userList" :key="key" {{ value.cbpc01 }}-->

      <div>
        <el-row>
          <el-col :span="24">
            <el-button plain style="float: right;margin-top:10px" type="primary" @click="_ly_addFrom">增行</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border :span-method="arraySpanMethod" :row-style="{ height: '10px' }"
          :cell-style="{ padding: '5px' }" style="width: 99%; margin-top: 10px; margin-left: 0.5%">
          <el-table-column prop="cbpc000" label="品牌" width="">
            <template slot-scope="scope">
              <el-popover placement="bottom-start" trigger="click" disabled>
                <Goodsone01 ref="Goodsone01" @selected="selected08($event, scope.row)"
                  style="width:400px; !important;" />
                <el-input slot="reference" v-model="scope.row.cbpc000" placeholder="" readonly style="width: 100%">
                </el-input>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbsf08" label="商品id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbsf08" placeholder="商品id" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="型号" width="" />
          <el-table-column label="描述" width="" />
          <el-table-column prop="cbpc099" label="供应商" width="180">
            <template slot-scope="scope">
              <el-popover placement="bottom-start" trigger="click" disabled>
                <supplierMaintenance ref="supplierMaintenance" @selected="selected02($event, scope.row)"
                  style="width: 130px !important" />
                <el-input slot="reference" v-model="scope.row.cbpc099" placeholder="" readonly style="width: 100%">
                </el-input>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbsf15" label="供应商id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbsf15" placeholder="供应商id" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cbpc0990" label="订单分类" width="150">
            <template slot-scope="scope">
              <!-- <el-popover placement="bottom-start" trigger="click">
              <supplierMaintenance ref="supplierMaintenance" @selected="selected02($event,scope.row)" style="width:120px!important;" />
              <el-input slot="reference" v-model="scope.row.cbpc0990" placeholder="" readonly style="width:100%;">
              </el-input>
            </el-popover> -->
              <el-select v-model="scope.row.cbsf16" placeholder="" style="width: 100%" disabled>
                <el-option v-for="item in dingdanfelei" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbsf16" label="订单分类id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbsf16" placeholder="订单分类id" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cbsf09" label="数量" width="100">
            <template slot-scope="scopes">
              <el-input v-model="scopes.row.cbsf09" @input="chen(scopes.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cbsf11" label="单价" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbsf11" readonly @blur="chen(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cbsf12" label="金额" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbsf12" placeholder="" :precision="2" class="shuzicaoyou" style="" readonly>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cbsf13" label="备注" width="">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbsf13" placeholder=""></el-input>
            </template>
          </el-table-column>

          <el-table-column v-if="false" prop="cbse01" label="主明细id" width="150">
            <template slot-scope="scope">
              <sapn>
                <el-input v-model="scope.row.cbse01" placeholder="id" style=""></el-input>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbpc08" label="商品编号" width="150">
            <template slot-scope="scope">
              <sapn>
                <el-input v-model="scope.row.cbpc08" placeholder="商品编号" style=""></el-input>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <span @click="_ly_delFrom(scope.row)">
                <i class="el-icon-delete" style="color: red"></i>
              </span>
            </template>
          </el-table-column>
          <!-- </el-form> -->
        </el-table>
      </div>
      <div class="tinajia_dingwei">
        <!-- <span slot="footer" class="dialog-footer" style="margin-left:2%; padding-top:-2%;"> -->
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
        <el-button @click="cancells">取 消</el-button>
        <!-- </span> -->
      </div>
    </div>
  </div>
</template>
<script>
import { PurchaseinboundList } from "@/api/Warehousemanagement/SalesStock";
import {
  PurchasereturnordersAdds,
  PurchasereturnordersAdd,
  Purchaseinxiaoshoudingdan,
  PurchaseinboundEdit,
} from "@/api/Warehousemanagement/SalesStock";
import { Purchaseinbounddingdanxq } from "@/api/Warehousemanagement/Saleslading";
import { getToken } from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//供应商
import ListLists from "@/components/ListMaintenance";
//商品信息维护
import Goodsone01 from "@/components/Goodsone";

//客户信息维护
import CustomerMaintenance from "@/components/CustomerMaintenance";

export default {
  name: 'AuthUser',
  dicts: [
    "sys_normal_disable",
    "sw_js_store_type",
    "sys_user_sex",
    "sw_js_store_type_manage_mode",
  ],
  components: {
    kuweixxweihu,
    supplierMaintenance,
    ListLists,
    Goodsone01,
    CustomerMaintenance,
  },
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
        pageSize: 10,
        page: 1,
        size: 10,
        total: this.total,
        name: undefined,
        address: undefined,
        userId: undefined,
      },
      CBPC01: "",
      // 表单结构数组
      formArr: [],
      tableData: [],
      // 遮罩层
      loading: true,
      tianjiahang: [],
      ListUser: [],
      zhuangh: [],
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

      //关联订单状态
      guanliandindan: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      value: "",
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
        cbsd133: "",
        cbsd134: "",
        cbsd135: "",
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
        cbca08: "",
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
        cbsb07: "",
        cbsb09: "",
        cbsb10: "",
        cbsb17: "",
        cbsb18: "",
        cbsb19: "",
        cbsb21: "",
        cbsb30: "",
        cbse01: "",
        cbse09: "",
        cbse10: "",
        cbse15: "",
        cbse16: "",
        cbse18: "",
        cbse099: "",
        cbse166: "",
        cbsf01: "",
        cbsf08: "",
        cbsf088: "",
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
        headers: { Authorization: "Bearer " + getToken() },
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
        cbpc100: [
          { required: true, message: "仓库不能为空!", trigger: "change" },
        ],
        cbpg16: [
          { required: true, message: "结算货币不能为空!", trigger: "change" },
        ],
        // cbsb07: [
        //     { required: true, message: "编号不能为空!", trigger: "blur" }
        // ],
        cbpc1000: [
          { required: true, message: "联系人不能为空!", trigger: "blur" },
        ],
        cbpc0990: [
          { required: true, message: "收货电话不能为空!", trigger: "blur" },
        ],
        cbpc10000: [
          { required: true, message: "电话不能为空!", trigger: "blur" },
        ],
        cbpc100120: [
          { required: true, message: "收货地址不能为空!", trigger: "blur" },
        ],
        cbpc099: [
          { required: true, message: "客户不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    //销售提货单详情
    this.getList();
    this.form2.cbca08 = this.ListUser.customerName;
    //父子页面传值

    this.getParams();
    this.getConfigKey("sys.user.initPassword").then((response) => {
      // this.initPassword = response.msg;
    });
    this.getDicts("sw_js_store_type").then((response) => {
      this.form.type = response.rows;
    });
    // this.form.type = this.dict[0].label;
    // this.userList.housingTime.substring(0, this.userList.housingTime.indexOf("T"));
    // console.log(this.userList,123456789);
    this.chen();
    this.form2.cbpd11 = "20";

    console.log(this.form.cbpc16, 123456);
  },
  methods: {
    //查询商品信息维护
    selected08(e, row) {
      this.$set(row, "cbpc000", e.substring(0, e.lastIndexOf(".")));
      this.$set(row, "cbsf08", e.substring(e.lastIndexOf(".") + 1));
      this.form2.cbsf08 = e.substring(e.lastIndexOf(".") + 1)
      console.log(this.form2.cbsf08, e, '444', row)
    },

    selected088(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbse099 = name.substring(0, name.indexOf("-"));
      this.form2.cbse09 = name.substring(name.indexOf("-") + 1);
      console.log(this.form2.cbse09, this.form2.cbse099, '客户')
      // this.form2.icon = name;
    },

    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 3];
      } else if (columnIndex < 3) {
        return [0, 0];
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
      let count = this.tableData.length; // 记录当前有多少个表单
      for (var index in this.tableData) {
        var form = this.tableData[index];
        console.log(form);
        console.log(JSON.stringify(form));
        // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
        // this.$refs[form.formName][0].validate((valid, obj) => {
        //     if (valid) {
        // 如果检查通过，则对count减1。
        // 当count为1时，表示是最后一个表单，则存储数据
        PurchasereturnordersAdds(JSON.stringify(this.tableData)).then(
          (response) => {
            if (response.code == "200") {
              this.tableData = [];
              this.form2 = {
                cbpc07: "",
                cbpc08: "",
                cbca08: "",
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
                cbsb07: "",
                cbsb09: "",
                cbsb10: "",
                cbsb17: "",
                cbsb18: "",
                cbsb19: "",
                cbsb21: "",
                cbsb30: "",
                cbse09: "",
                cbse10: "",
                cbse16: "",
                cbse18: "",
              };
            }
            if (count-- === 1) {
              this._ly_save();
            }

            //  this.reset03();
            //    this.formArr.cbpg01="1234567";
            //    this.form.cbpg01=this.formArr.cbpg01;
            //    console.log(this.form.cbpg01,85203);
          }
        );

        //         } else {
        //             console.log(obj)
        //             return false
        //         }
        //   })
      }
      console.log("_ly_ok:" + JSON.stringify(this.tableData));
    },

    // 存储表单数据
    _ly_save() {
      // this.$message.success('添加成功')
      // 将数据传递给父组件。
      // 如果要将数据存储到后台，可在此处自行实现
      this.$emit("on-ok", this.tableData);
    },
    // 增加一行表单
    _ly_addFrom() {
      const cbsf = this.form2.cbsf01;
      if (this.tableData.length >= 5) {
        this.$message.warning("最多只能添加5行");
        // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
        return;
      }

      this.tableData.push({
        // id
        cbsf01: cbsf,
        // 商品ID
        cbsf08: '',
        // 数量
        cbsf09: '',
        // 单价
        cbsf11: '',
        // 金额
        cbsf12: '',
        // 备注
        cbsf13: '',
        // 销售退货单编号
        cbse01: '',
        // 供应商ID
        cbsf15: '',
        // 订单类型
        cbsf16: '',
        // user_id
        user_id: '',
      });
      this.dataId++;
      console.log(this.tableData, 852369);
    },
    // 删除一行表单
    _ly_delFrom(index) {
      console.log("index: " + index);
      this.tableData.splice(index, 1);
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
      this.tableData[index].branch = data.label;

      // 选择后收起下拉框
      let formName = this.tableData[index].formName;
      this.$refs[formName + "_select"][0].blur(); // myform1648431132399_select
    },

    getParams() {
      //  let routerParams = this.$route.query;
      //    this.ListUser = routerParams.data;
      //    let zhuangh = JSON.parse(this.ListUser);
      //    //客户
      //    this.form2.cbse09=zhuangh[0].customerName;
      //    //仓库
      //    this.form2.cbpc100 = zhuangh[0].whName;
      //    //结算货币展示
      //    this.form2.cbse166 = zhuangh[0].settleCurrentMsg;
      //    //结算货币id
      //    this.form2.cbse16 = zhuangh[0].settleCurrent;
      //    //审核时间
      //    this.form2.cbse13 = zhuangh[0].createTime;
      //    //订单分类展示
      //    this.form.cbsf166 = zhuangh[0].orderClassMsg;
      //     //订单分类id
      //    this.form.cbsf16 = zhuangh[0].orderClass;
      //    //完成日期
      //    this.form2.cbse15 = zhuangh[0].orderDate;
      //    //客户等级
      //    this.form2.cbca28 =zhuangh[0].customerLevel;
      //    //客户订单
      //    this.form2.cbsb30 = zhuangh[0].customerNo;
      //    //关联订单展示
      //    this.form2.cbse188  = zhuangh[0].orderTypeMsg;
      //    //关联订单id
      //    this.form2.cbse18  = zhuangh[0].orderType;
      // //    this.form2.cbpc16 =zhuangh[0].customerNo;
      //   console.log(JSON.parse(this.ListUser),852369);
      // //   console.log(JSON.parse(routerParams.data01),55555);
    },

    show() {
      this.showSearch = !this.showSearch;
    },
    // 乘法修正精度
    mutiply(a, b) {
      a = this.BigNumber(a);
      b = this.BigNumber(b);
      return a.multipliedBy(b).toNumber();
    },
    chen(item) {
      if (item.cbsf09 > 0 && item.cbsf11 > 0) {
        // this.$set(
        //   item,
        //   "cbsf12",
        //   parseFloat(item.cbsf09) * parseFloat(item.cbsf11)
        // );
        this.$set(item, 'cbsf12', this.mutiply(item.cbsf09, item.cbsf11))
      }
    },
    //添加模块-仓库
    selected01(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc100 = name.substring(0, name.indexOf("-"));
      this.form2.cbse10 = name.substring(name.indexOf("-") + 1);
      // this.form2.icon = name;
    },

    //添加模块-货币类型
    selected004(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc166 = name.substring(0, name.indexOf("-"));
      this.form2.cbpc16 = name.substring(name.indexOf("-") + 1);
      // this.form2.icon = name;
    },

    //添加模块-供应商
    selected02(e, row) {
      // console.log(name, 123)
      // console.log(name.substring(name.indexOf("-") + 1), 963);
      // this.form2.cbpc099 = name.substring(0, name.indexOf("-"));
      // this.form2.cbpc09 = name.substring(name.indexOf("-") + 1);
      // this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form2.icon = name;
      this.$set(row, "cbpc099", e.substring(0, e.indexOf("-")));
      console.log(e, 111);
      console.log(row, 222);
      // row.cbpc08 = e.substring(e.indexOf(".") + 1)
      this.$set(row, "cbsf15", e.substring(e.indexOf("-") + 1), 8523642);
      this.form2.cbse15 = row.cbsf15
      console.log(this.form2.cbse15)
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
      this.form2 = {
        brand: undefined,
        description: undefined,
        model: undefined,
        remark: undefined,
        skuName: undefined,
        sn: undefined,
        spuplierName: undefined,
        type: undefined,
      };
      this.resetForm("form2");
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

    /** 新增按钮操作 */
    handleAdd() {
      this.$refs["form2"].validate((item) => {
        if (item) {
          this.form2.goods = this.tableData;
          PurchasereturnordersAdd(this.form2).then((response) => {
            if (response.code == "200") {
              // console.log(response.posts, 12345678);
              this.$message({
                message: "添加成功",
                type: "success",
                style: "color:red;!important",
              });
              // this.getTreeselect();
              // this.submitShangpin();
              this.submitShangpin();

              this.open2 = false;
              this.reset01();
              this.tableData.forEach((item) => {
                item.cbse01 = response.data.id;
              });
              console.log(response.data.id, 123456);
              // console.log(this.item, 123456);
              this._ly_ok();
            }
          });
        } else {
          this.$message.error("请注意规范");
        }
      });
    },

    /** 创建操作 */
    handleChuangJiangone: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$router.push("/system/user-xsckfh/role/");
    },
    /** 销售提货单 */
    //详情列表
    getList() {
      this.loading = true;
      const userId = this.$route.params && this.$route.params.cbpc01;
      console.log(userId, 'nihao', this.$route)
      if (userId) {
        // 获取表详细信息
        Purchaseinbounddingdanxq(
          userId,
          this.addDateRange(this.queryParams, this.dateRange)
        ).then((res) => {
          console.log(res, 11111111)
          let response = res.data;
          //客户名称
          this.form2.cbse099 = response.customerName;
          // 明细表ID
          this.form2.cbsf01 = response.cbsf01;
          //仓库名称
          this.form2.cbpc100 = response.whName;
          //结算货币名称
          this.form2.cbse166 = response.currencyMsg;
          // 日期
          this.form2.cbsc08 = response.cbse08;
          this.tableData = response.goods;
          console.log(this.form2, response, 85200000, '年后1');
          response.goods.forEach((item) => {
            item.cbsf16 = item.orderClass;
            item.cbsc15 = item.supplierId;
            item.cbsd133 = item.brand;
            item.cbsd134 = item.model;
            item.cbsd135 = item.description;
            item.cbsc08 = item.goodsId;
            item.cbsf09 = item.qty;
            item.cbsf11 = item.price;
            item.cbsf12 = item.qty * item.price;
            item.cbsc13 = item.scanQty;
            item.cbsc144 = item.noSendQty;
            item.cbsc15 = item.remark;
            item.cbsc14 = item.saleOrderId;
            item.cbob01 = item.cbob01
            item.cbpc000 =
              item.brand + "~" + item.model + "~" + item.description;
            if (item.cbsc177 == "国内订单") {
              item.cbsc17 = "1";
            } else {
              item.cbsc17 = "2";
            }
          });
          this.userList = response.data;
          console.log(response, 88899977777777, this.tableData);
          this.loading = false;
        });
      }
    },
    /** 修改按钮操作 */
    handleUpdate() {
      const userId = this.$route.params && this.$route.params.cbse01;
      if (this.form.name != undefined) {
        let row = {};
        row.cbse01 = userId;
        // 编号
        row.cbpg07 = this.form.cbpc07;
        // 客户id
        row.cbse09 = this.form2.cbse09;
        // 仓库
        row.cbse10 = this.form2.cbse10;
        // 日期
        row.cbse08 = this.form2.cbsc08;
        // 结算货币
        row.cbse16 = this.form2.cbse166;
        // 关联订单
        row.cbse18 = this.form2.cbse18;
        row.change_type = 1;
        row.goods = this.tableData;

        // row.invoiceBank = this.form.remark;
        // row.invoiceNumber = this.form.skuName;
        // row.invoicePhone = this.form.sn;
        // row.invoiceTaxpayerNumber = this.form.spuplierName;
        // row.invoiceType = this.form.type;
        // row.name = this.form.warehusingStatus;
        // row.phone = this.form.scanStatus;
        // row.skuSort = this.form.orderType;
        // row.telPeople = this.form.isQualified;
        // console.log(this.form.id);
        console.log(row, '数据', this.form2, '列表', this.tableData)

        // PurchaseinboundEdit(JSON.stringify(row)).then((response) => {
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
        // console.log(response, 789);
        this.$message({ message: "修改成功", type: "success" });
        // this.$router.push("/Warehousemanagement/Saleslading/")
        this.$tab.closePage();
        this.$router.go(-1);
        // });
      } else {
        this.$message.error("错了哦，商品名称没有填呢");
      }
    },
    cancells() {
      // this.$router.push("/Warehousemanagement/Saleslading/")
      this.$tab.closePage();
      this.$router.go(-1);
    }
  },
  computed: {},
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
<style src="./Saleskadingxgcss/index.css">

</style>
