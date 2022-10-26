<template>
  <div class="app-container">
    <el-form ref="form2" :model="form2" label-width="130px" :rules="rules" style="">
      <div class="chuangjiancaigous">采购退库单</div>

      <!-- 编号:56221589223 -->

      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="8">
          <el-form-item label="编号:" prop="cbpg07">
            <el-input type="text" v-model="form2.cbpg07" style="width: 60%;" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期:">
            <el-date-picker type="date" placeholder="" v-model="form2.cbpg08" style="width: 60%" disabled>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-if="false" style="margin-top: -0.4%; margin-left: -3%" :span="7">
          <el-form-item label="主副表id:" prop="cbpg161">
            <el-input v-model="form2.cbpg161" placeholder="" maxlength="30" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col style="" :span="8">
          <el-form-item label="供料单位:" prop="cbpc099">
            <el-popover placement="bottom-start" trigger="click">
              <supplierMaintenance ref="supplierMaintenance" @selected="selected02" style="width: 210px !important" />
              <el-input slot="reference" v-model="form2.cbsa08" placeholder="" readonly style="width: 80%">
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col style="" :span="8">
          <el-form-item label="仓库:" prop="cbpc100">
            <el-popover placement="bottom-start" trigger="click">
              <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width: 210px !important" />
              <el-input slot="reference" v-model="form2.cbwa09" placeholder="" readonly style="width: 80%">
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col style="" :span="8">
          <el-form-item label="结算货币:" prop="cbpc16">
            <el-select v-model="form2.cala08" placeholder="" style="width: 80%">
              <el-option v-for="item in jiageLeixeng" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="结算货币:" prop="cbpc166">
                  <el-popover placement="bottom-start" trigger="click">
                      <ListLists ref="ListLists" @selected="selected004" />
                      <el-select slot="reference" v-model="form2.cbpc166" placeholder="" readonly
                          style="border:solid #eee thin; width:77%;">
                      </el-select>
                  </el-popover>
              </el-form-item> -->
        </el-col>
        <!--商品信息维护-->
      </el-row>
      <el-row v-if="false">
        <el-col style="margin-top: -0.4%; margin-left: 2%" :span="7">
          <el-form-item label="供应商id:" prop="cbpc09">
            <el-input v-model="form2.cbpc09" maxlength="30" style="width: 80%; border: solid #eee thin" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -0.4%; margin-left: -3%" :span="7">
          <el-form-item label="仓库id:" prop="cbpc10">
            <el-input v-model="form2.cbpc10" placeholder="" maxlength="30"
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
            <el-button plain style="float: right" type="primary" @click="_ly_addFrom">增行</el-button>
          </el-col>
        </el-row>

        <el-table :data="tableData" border :span-method="arraySpanMethod" :row-style="{ height: '10px' }"
          :cell-style="{ padding: '5px' }" style="width: 100%; margin-top: 10px">
          <!-- <el-form ref="form" :model="form" label-width="55%" lable-height="20%" class="chuangjianform"> -->
          <el-table-column prop="cbpc000" label="品牌" width="">
            <template slot-scope="scope" style="width: 200%">
              <el-popover placement="bottom-start" trigger="click">
                <Goodsone01 ref="Goodsone01" @selected="selected08($event, scope.row)"
                  style="width: 630px !important" />
                <el-input slot="reference" v-model="scope.row.cbpc000" placeholder="" readonly style="width: 100%">
                </el-input>
              </el-popover>
            </template>
            <!-- <el-col style="margin-left: 0%;" :span="7">
              <el-form-item label="" prop="cbpc000">
                  <el-popover placement="bottom-start" trigger="click">
                       <Goodsone01 ref="Goodsone01" @selected="selected08"
                          style="width:100% !important;" />
                        <el-input slot="reference" v-model="form.cbpc000" placeholder="" readonly
                            style="width:100%;">
                        </el-input>
                  </el-popover>
              </el-form-item>
            </el-col> -->
          </el-table-column>
          <el-table-column label="型号" width="" />
          <el-table-column label="描述" width="" />
          <el-table-column prop="cbpd09" label="数量" width="100">
            <template slot-scope="scope">
              <!-- <sapn> -->
              <el-input v-model="scope.row.cbph09" @blur="chen(scope.row)" placeholder="" class="shuzicaoyou" style="">
              </el-input>
              <!-- </sapn> -->
            </template>
          </el-table-column>
          <el-table-column prop="cbpd11" label="单价" width="100">
            <template slot-scope="scope">
              <!-- <sapn> -->
              <el-input v-model="scope.row.cbph10" @blur="chen(scope.row)" class="shuzicaoyou" placeholder="" style="">
              </el-input>
              <!-- </sapn> -->
            </template>
          </el-table-column>
          <el-table-column prop="cbpd12" label="金额" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbph11" placeholder="" class="shuzicaoyou" style="" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cbph13" label="备注" width="">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbph13" placeholder=""></el-input>
            </template>
          </el-table-column>

          <el-table-column v-if="false" prop="cbpc01" label="id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbpc01" placeholder="id" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbpd08" label="商品编号" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbpd08" placeholder="商品编号" style=""></el-input>
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
    </el-form>
    <div class="tinajia_dingwei">
      <!-- <span slot="footer" class="dialog-footer" style="margin-left:2%; padding-top:-2%;"> -->
      <el-button type="primary" @click="handleAdd">保 存</el-button>
      <el-button @click="_ly_cancelDialog">取 消</el-button>
      <!-- </span> -->
    </div>
  </div>
</template>

<script>
import { PurchaseinboundList, PurchaseinboundEditone } from "@/api/Warehousemanagement/PurchaseReturn";

import { getToken } from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//商品信息维护
import Goodsone01 from "@/components/Goodsone";

//供应商
import ListLists from "@/components/ListMaintenance";

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
        pageSize: 99999,
        page: 1,
        size: 99999,
        total: this.total,
        cbpc07: undefined,
        cbsa08: undefined,
        cbwa09: undefined,
        dateRange: undefined,
      },

      rules: {
        cbsa08: [
          {
            required: true,
            message: "供料单位不能为空!",
            trigger: "change",
          },
        ],
        cbwa09: [
          {
            required: true,
            message: "仓库不能为空!",
            trigger: "change",
          },
        ],
        cala08s: [
          {
            required: true,
            message: "结算货币不能为空!",
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
    this.getList();
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
    // this.form2.cbph10 = "20";

    console.log(this.form.cbpc16, 123456);

  },
  methods: {
    //返回按钮
    handlefanhui: function (row) {
      // this.$router.push("/system/user-auth/role/");
      // this.$router.push("/system/user-zjdfh/role/");
      this.$tab.closePage();
      this.$router.go(-1);
    },

    chen(item) {
      if (item.cbph09 > 0 && item.cbph10 > 0) {
        this.$set(
          item,
          "cbph11",
          parseFloat(item.cbph09) * parseFloat(item.cbph10)
        );
        // this.form2.cbph11 = item.cbph11
      }
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
      //   console.log("_ly_cancelDialog");
      //   this.$emit("on-close");
      this.reset01()
      // this.$router.push("/system/user-cktkfh/role/");
       this.$tab.closePage();
      this.$router.go(-1);
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
      // let count = this.tableData.length // 记录当前有多少个表单
      // for (var index in this.tableData) {
      //   var form = this.tableData[index]
      //   console.log(form)
      //   console.log(JSON.stringify(form))
      //   }
      // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
      // this.$refs[form.formName][0].validate((valid, obj) => {
      // if (valid) {
      // 如果检查通过，则对count减1。
      // 当count为1时，表示是最后一个表单，则存储数据
      console.log(this.tableData, 333);
      PurchaseinboundAdds(JSON.stringify(this.tableData)).then((response) => {
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
          };
        }
        if (count-- === 1) {
          this._ly_save();
        }
        this._ly_addFrom();
        //    this.formArr.cbpg01="1234567";
        //    this.form.cbpg01=this.formArr.cbpg01;
        //    console.log(this.form.cbpg01,85203);
      });

      //   } else {
      //     console.log(obj)
      //     return false
      //   }
      // })

      console.log("_ly_ok:" + JSON.stringify(this.tableData));
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
        "cbpg01": this.form2.cbpg01,
        "cbph01": this.form2.cbph01,
        "cbph08": '',
        "cbph09": '',
        "cbph10": '',
        "cbph11": '',
        "cbpg13": "",
      });
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
    //添加模块-仓库
    selected01(name) {
      console.log(name, 123);
      // console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbwa09 = name.substring(0, name.indexOf("-"));
      this.form2.cbpc10 = name.substring(name.indexOf("-") + 1);
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

    //添加模块-供应商
    selected02(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbsa08 = name.substring(0, name.indexOf("-"));
      this.form2.cbpg09 = name.substring(name.indexOf("-") + 1);
      this.form.cbsa08 = name.substring(0, name.indexOf("-"));
      // this.form2.icon = name;
    },

    //查询商品信息维护
    selected08(e, row) {
      // row.cbpc000=e
      this.$set(row, "cbpc000", e.substring(0, e.indexOf(".")));
      console.log(e, 111);
      console.log(row, 222);
      // row.cbpc08 = e.substring(e.indexOf(".") + 1)
      this.$set(row, "cbph08", e.substring(e.indexOf(".") + 1), 8523642);
      // this.form2.cbph08 = row.cbph08
      console.log(row, 555);
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

    /** 新增按钮操作 */
    handleAdd() {
      this.$refs["form2"].validate((item) => {
        if (item) {
          if(this.form2.cala08 == 'CNY'){
            this.form2.cbpc16 = 6
          }else{
            this.form2.cbpc16 = 5
          }
          let that = this
          // 声明空数组，for循环生成新的数组
          let newarr = []
          for(let i = 0;i<that.tableData.length;i++){
            newarr.push({
              "cbpg01": that.tableData[i].cbpg01,
              "cbph01": that.tableData[i].cbph01,
              "cbph08": that.tableData[i].cbph08,
              "cbph09": that.tableData[i].cbph09,
              "cbph11": that.tableData[i].cbph11,
              "cbph10": that.tableData[i].cbph10,
              "cbph13": that.tableData[i].cbph13,
            })
          }
          this.form2.goods = newarr
          PurchaseinboundEditone(this.form2).then((response) => {
            if (response.code == "200") {
              this.$message({
                message: "修改成功",
                type: "success",
                style: "color:red;!important",
              });
              this.$tab.closePage();
              this.$router.go(-1);
              this.submitShangpin();
              // this.open2 = false;
              this.reset01();
              // this.$router.push("/system/user-cktkfh/role/");
              //  this.$tab.closePage();
              // this.$router.go(-1);
            }
          });
        } else {
          // this.$message.error('请注意规范');
        }
      });
      //    this._ly_ok();
    },

    /** 返回操作 */
    handleChuangJiangone: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$router.push("/system/user-cktkfh/role/");
    },
    //详情列表
    getList() {
      this.loading = true;
      const userId = this.$route.params && this.$route.params.id;
      if (userId) {
        // 获取表详细信息
        PurchaseinboundList(userId, this.addDateRange(this.queryParams)).then(
          (res) => {
            this.userList = res.data.rows;
            this.total = res.data.total;
            let userlistss = res.data.rows.map((item) => {
              return item.goods;
            });
            this.userLists = userlistss[0];
            this.form2 = res.data.rows[0];
            this.tableData = res.data.rows;
            this.tableData.map((item) =>{
              item.cbpc000 = item.pinpai + ' - ' + item.cbpb12 + ' - ' + item.cbpb08
            })
            console.log(this.userLists, 123456);
            console.log(res, 888999);
            this.loading = false;
          }
        );
      }
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
<style src="./PurchaseReturnxgcss/index.css">

</style>
