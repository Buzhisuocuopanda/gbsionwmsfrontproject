<template>
  <div>
    <el-form ref="form2" :model="form2" label-width="30%" :rules="rules" style="">
      <div class="chuangjiancaigous">质检单</div>
      <el-row>
        <el-col :span="7">
          <el-form-item label="编号:" prop="cbqa07" style="margin-left:10%;">
            <el-input type="text" v-model="form2.cbqa07" style="width: 50%;" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期:" prop="cbqa11" style="margin-left:20%;">
            <el-date-picker type="date" placeholder="" v-model="form2.cbqa11" style="width: 70%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="false" :span="7">
          <el-form-item label="是否删除:" style="margin-left:20%;">
            <el-date-picker type="text" placeholder="" v-model="form2.cbqa06" style="width: 70%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col v-if="false" :span="24">
            <el-button plain style="float:left; margin-left:5%;" type="primary" @click="_ly_addFrom">增行</el-button>
          </el-col>
        </el-row>

        <el-table :data="tableData" border :span-method="arraySpanMethod" :row-style="{height: '10px'}"
          :cell-style="{padding: '5px'}" style="width: 95%;  margin-left: 3%; margin-top: 10px;">
          <!-- <el-form ref="form" :model="form" label-width="55%" lable-height="20%" class="chuangjianform"> -->
          <el-table-column prop="f" label="品牌" width="">
            <template slot-scope="scope" style="width:200%;">
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
                <el-input slot="reference" v-model="scope.row.f" placeholder="" readonly style="width:100%;">
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
              <el-input v-model="scope.row.cbqd09" placeholder="" class="shuzicaoyou" style=""></el-input>
              <!-- </sapn> -->
            </template>
          </el-table-column>
          <el-table-column prop="cbqb09" label="替换商品SN" width="200">
            <template slot-scope="scope">
              <!-- <sapn> --><!--:remote-method="getLists" reserve-keyword -->
              <el-select v-model="scope.row.cbqb09"   filterable remote
                placeholder="请输入关键词" :loading="loading3">
                <el-option v-for="item in scope.row.snList" :key="item.cbpm09" :label="item.cbpm09" :value="item.cbpm09">
                </el-option>
              </el-select>
              <!-- <el-input v-model="scope.row.cbqb09" class="shuzicaoyou" placeholder="" style=""></el-input>-->
              <!-- </sapn> -->
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbpd13" label="id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbpd13" placeholder="id" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbpd08" label="" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbpd08" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbqb08" label="销售提货单扫描记录表id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbqb08" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbqb10" label="原商品SN" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbqb10" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbqb08" label="销售提货单扫描记录表id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbqb08" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="cbqa01" label="质检单主表id" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cbqa01" placeholder="" style=""></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="false" label="操作" align="center" width="80">
            <template slot-scope="scope">
              <span @click="_ly_delFrom(scope.row)">
                <i class="el-icon-delete" style="color: red;"></i>
              </span>
            </template>
          </el-table-column>
          <!-- </el-form> -->
        </el-table>
      </div>
    </el-form>
    <div class="tinajia_dingwei">
      <!-- <span slot="footer" class="dialog-footer" style="margin-left:2%; padding-top:-2%;"> -->
      <el-button type="primary" @click="handleEdit">保 存</el-button>
      <el-button type="primary" @click="handlefanhui">取消</el-button>
      <!-- </span> -->
    </div>
    <div style="height:100px;"></div>
  </div>
</template>

<script>
// import { PurchaseinboundAdd } from "@/api/Warehousemanagement/PurchaseWarehousing";
//下拉列表替换sn
import { PurchaseinboundSellout, QualityinAdd, QualityinAdds, QualityinLists, QualityinEditOne, SwJsSkuBarcodeselectsss } from "@/api/Warehousemanagement/AnalysisCertificate";
import { getToken } from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//供应商
import ListLists from "@/components/ListMaintenance";



export default {
  name: "AuthUser",
  dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
  components: { kuweixxweihu, supplierMaintenance, ListLists },
  data() {
    return {
      // 遮罩层
      loading: true,
      loading3: false,
      tianjiahang: [],
      // 选中数组
      ids: [],
      shenpiids: [],
      formArr: [],
      tableData: [],
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
        cbpc16: ""

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
        goods: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 999999,
        page: 1,
        size: 999999,
        total: this.total,
        name: undefined,
        address: undefined,
        userId: undefined
      },
      //下拉列表替换商品sn
      snList: [],
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
        url: process.env.VUE_APP_BASE_API + "/system/barcode/importSwJsSkuBarcode"
      },

      rules: {
        cbpc099: [
          { required: true, message: "供料单位不能为空!", trigger: "blur" }
        ],
        cbpc100: [
          { required: true, message: "仓库不能为空!", trigger: "blur" }
        ],
        cbqa11: [
          { type: 'date', required: true, message: '日期不能为空!', trigger: 'change' }
        ],
        cbqa07: [
          { required: true, message: "编号不能为空!", trigger: "blur" }
        ]
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
    let routerParams = this.$route.query;
    // this.formArr = {cbqa01:routerParams.data};
    this.formArr = routerParams.data;
    this.form2.cbqa01 = routerParams.data;
    this.form2.cbqa07 = routerParams.cbqa07;
    this.form2.cbqa11 = routerParams.cbqa11;
    // this.getLists2();
    this.getList()
    // this.getLists()
    // this.getDetail();
    this.getConfigKey("sys.user.initPassword").then(response => {
      // this.initPassword = response.msg;
    });
    this.getDicts("sw_js_store_type").then(response => {
      this.form.type = response.rows;
    });
    // this.form.type = this.dict[0].label;
    // this.userList.housingTime.substring(0, this.userList.housingTime.indexOf("T"));
    // console.log(this.userList,123456789);

    console.log(this.form.cbpc16, 123456);

  },
  methods: {
    // 替换sn查询
    getLists(item) {
      // let id = this.$route.query.data
      // this.loading3 = true;

      SwJsSkuBarcodeselectsss({
        // cbpk01:id,
        cbpm08: item.cbpm08
      }).then((response) => {
        // this.loading3 = false;
        item.snList = response.data.rows;
        console.log(item.snList,10152);
      }, error => {
        // item.snList = [];
        // this.loading3 = false;
      });
    },

    // 替换sn查询
    getLists2() {
      // let id = this.$route.query.data
      // this.loading3 = true;

      SwJsSkuBarcodeselectsss({
        // cbpk01:id,
        cbpm08: undefined
      }).then((response) => {
        // this.loading3 = false;
        this.snList = response.data.rows;

      }, error => {
        // this.snList = [];
      });
    },
    //返回按钮
    handlefanhui: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$store.dispatch("tagsView/delView", this.$route)
      // this.$router.push("/system/user-zjdfh/role/");
      this.$tab.closePage();
      this.$router.go(-1);
    },

    //单元格合并
    // 合并单元格
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        return [1, 4];
      } else if (columnIndex < 4) {
        return [0, 0];
      }
    },
    //根据主键查询质检单详情
    getDetail() {

      let routerParams = this.$route.query;
      // this.formArr = {cbqa01:routerParams.data};
      this.formArr = routerParams.data;
      this.form2.cbqa01 = routerParams.data;
      this.form2.cbqa07 = routerParams.cbqa07;
      this.form2.cbqa11 = routerParams.cbqa11;
      // console.log(zhuangh[0].id,889999);
      QualityinLists(this.formArr).then(response => {

        response.data.forEach((item) => {
          // item.cbsc177=item.orderClass;
          item.cbpb09 = item.sku;
          // if(item.cbsc177=="国内订单"){
          //       item.cbsc17="1";
          // }
          item.cbpc000 = item.brand + "-" + item.model + "-" + item.description + "-" + item.sn;
          item.cbqb09 = item.sku;
          item.cbqb10 = item.sn;
          item.cbqb08 = '695414';
          console.log(item.cbpd09, 19991119);

        })
        this.tableData = response.data;
        this.total = response.data.total;
      });

    },
    //详情列表
    getList() {
      this.loading = true;
      const userId = this.$route.query && this.$route.query.data;
      if (userId) {
        // 获取表详细信息
        QualityinLists(userId, this.addDateRange(this.queryParams, this.dateRange)).then(res => {
          this.userList = res.data.rows[0];
          this.tableData = res.data.rows;
          this.tableData.map((item) => {
            // item.snList =this.snList;
            this.getLists(item);
            item.snList =this.snList;
            item.f = item.cala08 + ' ~ ' + item.cbpb08 + ' ~ ' + item.cbpb12 + ' ~ ' + item.cbqb10
            console.log(item);
          })

          this.total = res.data.total;
          console.log(this.tableData, 101514);
          this.loading = false;
        });
      }
    },
    // 表单重置
    reset() {
      this.form = {
        classifyName: undefined,
        classifyNum: undefined
      };
      // this.resetForm("form");
    },


    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },


    /** 修改按钮操作 */
    handleEdit() {

      const userId = this.$route.query && this.$route.query.data;
      this.form2.goods = this.tableData;
      this.form2.cbqa01 = userId
      console.log(this.form2, 1013)
      QualityinEditOne(this.form2).then(response => {
        if (response.code == "200") {
          // console.log(response.posts, 12345678);
          this.$message({ message: '修改成功', type: 'success', style: 'color:red;!important' });
          this.handlefanhui()
          //   this._ly_ok();
        }
      });

    },


    // 点击【保存】按钮后，如果每行的表单验证成功则存储数据
    _ly_ok() {
      let count = this.tableData.length // 记录当前有多少个表单
      for (var index in this.tableData) {
        var form = this.tableData[index]
        console.log(form)
        console.log(JSON.stringify(form))
        // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
        // this.$refs[form.formName][0].validate((valid, obj) => {
        //     if (valid) {
        // 如果检查通过，则对count减1。
        // 当count为1时，表示是最后一个表单，则存储数据
        QualityinAdds(JSON.stringify(this.tableData)).then(response => {
          if (response.code == "200") {
            this.tableData = []
            this.form2 = {
              cbqa01: "",
              cbqa07: "",
              cbqa11: "",
              cbqa06: "",
              goods: []
            }

          }
          if (count-- === 1) {
            this._ly_save()
          }
          this._ly_addFrom()

        });

      }
      console.log('_ly_ok:' + JSON.stringify(this.tableData))
    },





    // 存储表单数据
    _ly_save() {
      this.$message.success('添加成功')
      // 将数据传递给父组件。
      // 如果要将数据存储到后台，可在此处自行实现
      this.$emit('on-ok', this.tableData)
    },
    // 增加一行表单
    _ly_addFrom() {
      if (this.tableData.length >= 100) {
        this.$message.warning('最多只能添加100行')
        this.reset01();
        // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
        return

      }

      this.tableData.push({
        cbpc000: '',
        cbsc08: '',
        cbsc09: '',
        cbsc10: '',
        branch: '',
      })
    },
    // 删除一行表单
    _ly_delFrom(index) {
      console.log('index: ' + index)
      this.tableData.splice(index, 1)
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
      this.tableData[index].branch = data.label

      // 选择后收起下拉框
      let formName = this.tableData[index].formName
      this.$refs[formName + '_select'][0].blur() // myform1648431132399_select
    },



  },
  computed: {

  },
  mounted() {
    // 初始化表单数据，至少有一行表单数据
    this.tableData = []
    this._ly_addFrom()
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
      if (this.dialogVisible === false) {
        // 重新打开弹窗时，初始化表单数据，至少有一行表单数据
        this.tableData = []
        this._ly_addFrom()
      }
    }
  }
};
</script>
<style src="./AnalysisCertificatecjcss/index.css" scoped>

</style>
