<template>
  <div>
    <el-form
      ref="form2"
      :model="form2"
      label-width="30%"
      :rules="rules"
      style=""
    >
      <div class="chuangjiancaigous">质检单</div>
      <el-row>
        <el-col :span="7">
          <el-form-item label="编号:" prop="cbqa07" style="margin-left: 10%">
            <el-input type="text" v-model="form2.cbqa07" style="width: 50%" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期:" prop="cbqa11" style="margin-left: 20%">
            <el-date-picker
              type="date"
              placeholder=""
              v-model="form2.cbqa11"
              style="width: 70%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="false" :span="7">
          <el-form-item label="是否删除:" style="margin-left: 20%">
            <el-date-picker
              type="text"
              placeholder=""
              v-model="form2.cbqa06"
              style="width: 70%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <div>
            <div style="margin-left:3%; margin-top: 2%;">
               <el-button plain  type="primary" @click="_ly_addFrom">新增一行</el-button>
            </div>
            <div  width="1050px" center  :before-close="_ly_beforeClose" @close="_ly_closeDialog">
                <div class="hello" style="margin-top: 0.5%;margin-left: 3%;">
                    <div class="box1">
                      <table border="1" style="border:solid #eee thin;" cellspacing="0" cellpadding="1"
                            class="tablebiankuan table-heads" width="95%" height="20px">
                            <thead style="">
                                <tr style="height:30px; ">
                                    <th style="width: 130px;height: 30px;">品牌</th>
                                    <th style="width: 130px;height: 30px;">型号</th>
                                    <th style="width: 130px;height: 30px;">描述</th>
                                    <th style="width: 140px;height: 30px;">SN</th>
                                    <th style="width: 140px;height: 30px;">替换商品SN</th>
                                    <th style="width: 50px;height: 30px;">操作</th>
                                </tr>
                            </thead>
                        </table>
                    <div class="table-bodys" >
                     <table border="1" style=" border: solid #ffffff thin; width:1040px;height:42px; margin-top: 0.5%;"
                                cellspacing="0" class="tablebiankuan">
                      <el-row v-for="(form, index) in formArr" style="width:110%;margin-bottom: -1.1%;" :key="index">
                          <el-form label-position="right" label-width="50px" style="margin-top:1%;" :model="form" :ref="form.formName"
                        :inline="true">
                        <el-form-item label="" v-if="false" prop="cbpc01" style="margin-left:0.8%;">
                            <el-input v-model="form.cbpc01" style="width:70%;"></el-input>
                        </el-form-item>
                            <el-col style="margin-left: 0%;" :span="7">
                                <el-form-item label="" prop="cbpc000">
                                   <el-popover placement="bottom-start" trigger="click">
                                      <el-input slot="reference" v-model="form.cbpc000" placeholder="" readonly
                                          style="width:469%">
                                      </el-input>
                                    </el-popover>
                                </el-form-item>
                            </el-col>
                        <el-form-item label="" size="small" prop="cbpd09" class="tihuanshangp" style="margin-left:60%;">
                            <el-input type="text" v-model="form.cbpb09"  style="width:125%;"></el-input>
                        </el-form-item>
                        <el-form-item  v-if="false" label="" size="small" prop="cbpd13" style="margin-left:-4%;">
                            <el-input v-model="form.cbpd13" style="width:70%;"></el-input>
                        </el-form-item>
                        <el-form-item label="" v-if="false"  prop="name" style="margin-left:0.8%;">
                            <el-input v-model="form.cbpd08" style="border:solid #eee thin;width:70%;"></el-input>
                        </el-form-item>
                         <el-form-item label="质检单主表id" v-if="false"  prop="cbqa01" style="margin-left:0.8%;">
                            <el-input v-model="form.cbqa01" style="border:solid #eee thin;width:70%;"></el-input>
                        </el-form-item>
                        <el-form-item v-if="false" label="" size="small" prop="cbqb10" class="tihuanshangp" style="margin-left:60%;">
                            <el-input type="text" v-model="form.cbqb10"  style="width:125%;"></el-input>
                        </el-form-item>
                        <el-button v-if="index != 0" type="danger" style="position: absolute; left: 103%;"  size="small" icon="el-icon-delete"  circle
                            @click="_ly_delFrom(index)"></el-button>
                    </el-form>
                </el-row>
             </table>
                       </div>
                    </div>
                 </div>
             </div>
          </div> -->
      <div>
        <el-row>
          <el-col v-if="false" :span="24">
            <el-button
              plain
              style="float: left; margin-left: 5%"
              type="primary"
              @click="_ly_addFrom"
              >增行</el-button
            >
          </el-col>
        </el-row>

        <el-table
          :data="tableData"
          border
          :span-method="arraySpanMethod"
          :row-style="{ height: '10px' }"
          :cell-style="{ padding: '5px' }"
          style="width: 95%; margin-left: 3%; margin-top: 10px"
        >
          <!-- <el-form ref="form" :model="form" label-width="55%" lable-height="20%" class="chuangjianform"> -->
          <el-table-column prop="f" label="品牌" width="">
            <template slot-scope="scope" style="width: 200%">
              <!--<sapn>
                <el-select @change="goodsOnChange()"  v-model="scope.row.cbpc000" filterable clearable :filter-method="dataFilter" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </sapn>-->
              <el-popover placement="bottom-start" trigger="click" disabled>
                <el-input
                  slot="reference"
                  v-model="scope.row.f"
                  placeholder=""
                  readonly
                  style="width: 100%"
                >
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
          <el-table-column label="SN" width="" />
          <el-table-column v-if="false" prop="cbqd09" label="SN" width="100">
            <template slot-scope="scope">
              <!-- <sapn> -->
              <el-input
                v-model="scope.row.cbqd09"
                placeholder=""
                class="shuzicaoyou"
                style=""
              ></el-input>
              <!-- </sapn> -->
            </template>
          </el-table-column>
          <el-table-column label="替换商品SN" width="200">
            <template slot-scope="scope">
              <!-- <sapn> -->
                <el-select v-model="scope.row.cbqb09" placeholder="请选择">
                  <!-- <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                      <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input> -->
                    <el-option
                    v-for="(item,index) in tableDatas"
                    :key="index"
                    :label="item.cbpm09"
                    :value="item.cbpm09">
                    </el-option>
                </el-select>
              <!-- </sapn> -->
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbpd13" label="id" width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cbpd13"
                placeholder="id"
                style=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbpd08" label="" width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cbpd08"
                placeholder=""
                style=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="cbqb08"
            label="销售提货单扫描记录表id"
            width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cbqb08"
                placeholder=""
                style=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="cbqb10"
            label="原商品SN"
            width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cbqb10"
                placeholder=""
                style=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="cbqb08"
            label="销售提货单扫描记录表id"
            width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cbqb08"
                placeholder=""
                style=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="cbqa01"
            label="质检单主表id"
            width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cbqa01"
                placeholder=""
                style=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" label="操作" align="center" width="80">
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
      <el-button type="primary" @click="handlefanhui">取消</el-button>
      <!-- </span> -->
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
// import { PurchaseinboundAdd } from "@/api/Warehousemanagement/PurchaseWarehousing";

import {
  PurchaseinboundSellout,
  QualityinAdd,
  QualityinAdds,
  SwJsSkuBarcodeselectss,
  SwJsSkuBarcodeselectsss,
} from "@/api/Warehousemanagement/AnalysisCertificate";
import { getToken } from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//供应商
import ListLists from "@/components/ListMaintenance";

export default {
  name: "store",
  dicts: [
    "sys_normal_disable",
    "sw_js_store_type",
    "sys_user_sex",
    "sw_js_store_type_manage_mode",
  ],
  components: { kuweixxweihu, supplierMaintenance, ListLists },
  data() {
    return {
      // 遮罩层
      loading: true,
      tianjiahang: [],
      // 选中数组
      ids: [],
      shenpiids: [],
      formArr: [],
      tableData: [],
      tableDatas: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      totals: 0,
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
        cbqa01: "",
        cbqa07: "",
        cbqa11: "",
        cbqa06: "",
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
      /*// 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                cbpc07: undefined,
                cbsa08: undefined,
                cbwa09: undefined,
                dateRange: undefined
            },*/

      rules: {
        cbpc099: [
          { required: true, message: "供料单位不能为空!", trigger: "blur" },
        ],
        cbpc100: [
          { required: true, message: "仓库不能为空!", trigger: "blur" },
        ],
        cbqa11: [
          {
            type: "date",
            required: true,
            message: "日期不能为空!",
            trigger: "change",
          },
        ],
        cbqa07: [
          { required: false, message: "编号不能为空!", trigger: "blur" },
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
    this.form2.cbqa06 = "0";

    this.getList();
    this.getLists();
    this.getConfigKey("sys.user.initPassword").then((response) => {
      // this.initPassword = response.msg;
    });
    this.getDicts("sw_js_store_type").then((response) => {
      this.form.type = response.rows;
    });
    // this.form.type = this.dict[0].label;
    // this.userList.housingTime.substring(0, this.userList.housingTime.indexOf("T"));
    // console.log(this.userList,123456789);

    console.log(this.form.cbpc16, 123456);
  },
  methods: {
    //   搜索sn
    seach(){

    },
    //返回按钮
    handlefanhui: function (row) {
      // this.$router.push("/system/user-auth/role/");
      // this.$router.push("/system/user-zjdfh/role/");

      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push("/system/user-zjdfh/role/");
    },

    //单元格合并
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 4];
      } else if (columnIndex < 4) {
        return [0, 0];
      }
    },

    /** 质检详情查询 */
    getList() {
      let id = this.$route.query.data
      // console.log(zhuangh[0].id,889999);
      SwJsSkuBarcodeselectss(
        {cbpk01:id}
      ).then((response) => {
          console.log(response,'年后')
        // response.data.scans.forEach((item) => {
        //   // item.cbsc177=item.orderClass;
        //   item.cbpb09 = item.sku;
        //   // if(item.cbsc177=="国内订单"){
        //   //       item.cbsc17="1";
        //   // }
        //   item.cbpc000 =
        //     item.brand +
        //     "-" +
        //     item.model +
        //     "-" +
        //     item.description +
        //     "-" +
        //     item.sn;
        //   item.cbqb09 = item.sku;
        //   item.cbqb10 = item.sn;
        //   item.cbqb08 = "695414";
        //   console.log(item.cbpd09, 19991119);
        // });

        this.tableData = response.data.rows;

        this.total = response.data.total;
        console.log(response.data.scans, 339688);
        // this.userList01 = JSON.stringify(this.userList);
        // response.data.goods.forEach((e)=>{
        //   this.form.cbsc17=e.orderClass;
        // })
        // let
      });
    },
    // 替换sn查询
    getLists(){
      let id = this.$route.query.data
      SwJsSkuBarcodeselectsss(
        {cbpk01:id}
      ).then((response) => {
        console.log(response,'年后11')
        this.tableDatas = response.data.rows;
        this.totals = response.data.total;
        console.log(response.data.scans, 789789);
      });
    },
    show() {
      this.showSearch = !this.showSearch;
    },

    chen() {
      this.form2.cbpd11 = "20";
      this.form2.cbpd12 = this.form2.cbpd11 * this.form2.cbpd09;
    },
    /* //添加模块-仓库
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
*/

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
      this.form2.cbqa06 = "0";
      this.$refs["form2"].validate((item) => {
        if (item) {
          QualityinAdd(this.form2).then((response) => {
            if (response.code == "200") {
              // console.log(response.posts, 12345678);
              this.$message({
                message: "添加成功",
                type: "success",
                style: "color:red;!important",
              });
              this.submitShangpin();
              this.open2 = false;
              this.reset01();
              this.tableData.forEach((item) => {
                item.cbqa01 = response.data.id;
                item.cbqb10 = item.cbpm09;
              });
              console.log(item.cbqa01, 896523);

              this._ly_ok();
            }
          });
        } else {
          // this.$message.error('请注意规范');
        }
      });
    },

    /*// 点击右上角关闭弹窗
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
        },*/
    // 点击【保存】按钮后，如果每行的表单验证成功则存储数据
    _ly_ok() {
      let count = this.tableData.length; // 记录当前有多少个表单
    //   for (var index in this.tableData) {
    //     var form = this.tableData[index];
    //     console.log(form);
    //     console.log(JSON.stringify(form));
    //     // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
    //     // this.$refs[form.formName][0].validate((valid, obj) => {
    //     //     if (valid) {
    //     // 如果检查通过，则对count减1。
    //     // 当count为1时，表示是最后一个表单，则存储数据
    //     QualityinAdds(JSON.stringify(this.tableData)).then((response) => {
    //       if (response.code == "200") {
    //         this.tableData = [];
    //       }
    //       if (count-- === 1) {
    //         this._ly_save();
    //       }
    //       this._ly_addFrom();
    //     });
    //   }
      QualityinAdds(JSON.stringify(this.tableData)).then((response) => {
          if (response.code == "200") {
            this.tableData = [];
            this.handlefanhui()
          }
        //   if (count-- === 1) {
        //     this._ly_save();
        //   }
        //   this._ly_addFrom();
        });
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
      if (this.tableData.length >= 100) {
        this.$message.warning("最多只能添加100行");
        this.reset01();
        // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
        return;
      }

      this.tableData.push({
        cbpc000: "",
        cbsc08: "",
        cbsc09: "",
        cbsc10: "",
        branch: "",
      });
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
<style src="./AnalysisCertificatecjcss/index.css"></style>
