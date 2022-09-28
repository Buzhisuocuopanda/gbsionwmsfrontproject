<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-left: -10%">
      <el-col :span="20" :xs="24" class="tooltup" style="width: 100%">
        <el-table border :header-cell-style="headClassSld" :row-style="{ height: '3px' }" :cell-style="{ padding: '2px' }"
          v-loading="loading" :data="userList" height="440" :default-sort="{ prop: 'name', order: 'descending' }"
          style="width: 92.5%; height: 8%; margin-left: -2%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="编号" align="left" key="orderNo" prop="orderNo" width="155px;" sortable fixed />
          <el-table-column label="日期" align="left" key="orderDate" prop="orderDate" width="120px;" :formatter="formatDate"
            sortable>
          </el-table-column>
          <el-table-column label="客户订单号" align="left" key="customerNo" width="120px;" prop="customerNo" sortable />
          <el-table-column label="客户" align="left" key="customerName" width="320px;" prop="customerName" sortable />
          <el-table-column label="客户等级" align="left" key="customerLevel" width="120px;" prop="customerLevel" sortable />
          <el-table-column label="联系人" align="left" key="contacts" width="120px;" prop="contacts" sortable />
          <el-table-column label="电话" align="left" key="phone" width="120px;" prop="phone" sortable />
          <el-table-column label="销售人员" align="left" key="saleUser" width="120px;" prop="saleUser" sortable />
          <el-table-column label="仓库" align="left" key="whName" width="120px;" prop="whName" sortable />
          <el-table-column label="结算货币" align="left" key="cala08" width="120px;" prop="cala08" sortable />
          <el-table-column label="收货地址" align="left" key="address" width="120px;" prop="address" sortable />
          <el-table-column label="收货人" align="left" key="contactss" width="120px;" prop="contactss" sortable />
          <el-table-column label="收货电话" align="left" key="phonee" width="120px;" prop="phonee" sortable />
          <el-table-column label="关联订单" align="left" key="cala089" width="120px;" prop="cala089" sortable />
          <el-table-column label="状态" align="left" key="statusMsg" width="120px;" prop="statusMsg" sortable>
          </el-table-column>
          <el-table-column label="提货建议表" align="left" key="checkStatusMsg" width="120px;" prop="checkStatusMsg" sortable />
          <el-table-column label="操作" align="center" width="250" fixed="right" class-name="small-padding fixed-width">
            <template slot-scope="scope" style="margin-left: -10%">
              <el-button size="mini" type="text" icon="el-icon-edit" class="button-caozuoxougai caozuoxiangqeng"
                @click="handlexiangqengSelect(scope.row)" v-if="(scope.row.status == 1) | (scope.row.status == 2)"
                v-hasPermi="['system:user:edit']">
                修改
              </el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" class="button-caozuoxougai caozuoxiangqeng"
                @click="handleDelete01(scope.row)" v-if="(scope.row.status == 1) | (scope.row.status == 2)"
                v-hasPermi="['system:user:remove']">删除</el-button>
              <el-button size="mini" type="text" icon="el-icon-share" class="caozuoxiangqeng" @click="handleAuthRole(scope.row)"
                v-hasPermi="['system:user:listselect']">详情
              </el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundShenpi(scope.row)" v-hasPermi="['system:user:listselect']" v-if="scope.row.status == 2">
                审核</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundFanShenpi(scope.row)" v-hasPermi="['system:user:listselect']"
                v-if="scope.row.status == 3">反审</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundQuxiaoWangcheng(scope.row)" v-hasPermi="['system:user:listselect']"
                v-if="scope.row.status == 4">取消完成</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundBiaojiWancheng(scope.row)" v-hasPermi="['system:user:listselect']"
                v-if="(scope.row.status == 3) | (scope.row.status == 1)">标记完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
          @pagination="getList" :page-sizes="[2, 5, 10, 15, 20]" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import { PurchaseinboundAdds } from "@/api/Warehousemanagement/SalesShipment";


  import {
    PurchaseinboundAdd,
    PurchaseinboundAdds
  } from "@/api/Warehousemanagement/PurchaseWarehousing";

 import { SwJsCustomerlistSelect } from '@/api/saleordermanage'

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

  Vue.directive('loadmore', {
    bind(el, binding) {

      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

      SELECTWRAP_DOM.addEventListener('scroll', function() {

        /*
        * scrollHeight 获取元素内容高度(只读)
        * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
        * clientHeight 读取元素的可见高度(只读)
        * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
        * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
        */
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

        if(CONDITION) {
          binding.value();
        }
      });
    }
  })


  export default {
    name: "store",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
    props: {
      visible: {
        type: Boolean,
        default () {
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
        
  customeroptions: [],

      formData: {
          orderType: 10,
          orderTypeMsg: "销售订单",
          orderClass: 2,
          orderClassMsg: '国内订单',
          receiveName:'',
          receivePhone: '',
          address: ''
        },



        dialogVisible: this.visible,
        formArr: [], // 表单结构数组
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
          cbpc01: "",
          cbpc000:""
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
          dateRange: undefined
        },


        rules: {
          cbpc099: [{
            required: true,
            message: "供料单位不能为空!",
            trigger: 'change'
          }],
          cbpc100: [{
            required: true,
            message: "仓库不能为空!",
            trigger: 'change'
          }],
          cbpc16: [{
            required: true,
            message: "结算货币不能为空!",
            trigger: 'change'
          }],
          // cbpc07: [
          //     { required: true, message: "编号不能为空!", trigger: "blur" }
          // ]
        },

        //表格参数
        tableData: [],
        dataId: 0,
        options: [{
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
      this.getList();

      this.getConfigKey("sys.user.initPassword").then(response => {
        // this.initPassword = response.msg;
      });
      this.getDicts("sw_js_store_type").then(response => {
        this.form.type = response.rows;
      });
     
      this.form2.cbph10 = "20"

      console.log(this.form.cbpc16, 123456);

    },
    methods: {

      /** 销售提货单列表 */
      getList() {
        this.loading = true;
        console.log(this.queryParams, this.dateRange, 'ceshi')
        Purchaseinbounddingdancx(
          this.addDateRange(this.queryParams, this.dateRange)
        ).then((response) => {
          this.userList = response.data.rows;
          this.total = response.data.total;
          console.log(response.data.rows, 339688);
          this.loading = false;
        });
      },
     


     customerdataFilter(val){
        this.customerListQuery.pageNum=1
        this.customerId=val
        const param={
          selectMsg: this.customerId,
          pageNum: this.customerListQuery.pageNum,
          pageSize: this.customerListQuery.pageSize
        }

        SwJsCustomerlistSelect(param).then(response => {
          if (response.code == "200") {
            this.customerListQuery.pageNum=this.customerListQuery.pageNum+1
            this.customeroptions=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });

      },



        customerOnChange(val){
        // console.log(this.formData.customer)
        // console.log("val",val)
        // console.log("val",row)
        // row.qty=0.5
        if(val=='' ){
          return
        }
        const param={
          cbca01: val,

        }

        //
        customerDetail(param).then(response => {
          if (response.code == "200") {
            this.formData.receivePhone=response.data.cbca16
            this.formData.receiveName=response.data.cbca14
            this.formData.address=response.data.cbca15


          }else {
            this.formData.receivePhone=''
            this.formData.receiveName=''
            this.formData.address=''
            this.$message.error(response.msg)

          }
        });

      },


         goodsOnChange(row){
        // console.log(this.formData.customer)
        // console.log("val",val)
        console.log("val",row)
        // row.qty=0.5

        if(this.formData.customerId==null){
            this.$message.error("请先选择客户")
          return;
          }

        //检查goodsid是否存在
        if(this.checkRepeat(this.tableData,row.goodsId)){
          row.goodsId=null
          row.normalPrice=0
          row.canUseSku=0
          this.$message.error("不能添加重复商品")

          return
        }
        const param={
          goodsId: row.goodsId,
          customerId: this.formData.customerId,
          orderClass: 2

        }

        //
        goodsPriceAndSku(param).then(response => {
          if (response.code == "200") {
            row.normalPrice=response.data.normalPrice
            row.canUseSku=response.data.canUseSku

          }else {
            row.normalPrice=0.0
            row.canUseSku=0.0

            this.$message.error(response.msg)

          }
        });

      },


    customerloadMore(){
        const param={
          selectMsg: this.customerId,
          pageNum: this.customerListQuery.pageNum,
          pageSize: this.customerListQuery.pageSize
        }


        SwJsCustomerlistSelect(param).then(response => {
          if (response.code == "200") {
            this.customerListQuery.pageNum=this.customerListQuery.pageNum+1
            this.customeroptions.push.apply(this.customeroptions,response.data.rows)
          }else {
            this.$message.error(response.msg)
          }
        });
      },

      



       chen(item) {
            if(item.cbpd09>0&&item.cbpd11>0){
                this.$set(item,'cbpd12',(parseFloat(item.cbpd09)*parseFloat(item.cbpd11)))
            }
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
          .catch(_ => {})
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
            // if (valid) {
              // 如果检查通过，则对count减1。
              // 当count为1时，表示是最后一个表单，则存储数据
              PurchaseinboundAdds(JSON.stringify(this.tableData)).then(response => {
                if (response.code == "200") {
                  this.tableData = []
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

          //   } else {
          //     console.log(obj)
          //     return false
          //   }
          // })
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
          id: this.dataId,
          date: '',
          num: '',
          address: '',
          moner: '',
          province: '',
          cbpc000: ''
        })
        this.dataId++
        console.log(this.tableData,852369);
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
        let formName = this.tableData[index].formName
        this.$refs[formName + '_select'][0].blur() // myform1648431132399_select
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
      selected08(e,row) {
        // row.cbpc000=e
        this.$set(row,"cbpc000",e.substring(0,e.indexOf(".")))
        console.log(e,111)
        console.log(row,222)
        // row.cbpc08 = e.substring(e.indexOf(".") + 1)
        this.$set(row,"cbpc08",e.substring(e.indexOf(".") +1),8523642)
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

      /** 新增按钮操作 */
      handleAdd() {

        this.$refs["form2"].validate((item) => {
          if (item) {
            PurchaseinboundAdd(this.form2).then(response => {
              if (response.code == "200") {
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  style: 'color:red;!important'
                });
                this.submitShangpin();
                this.open2 = false;
                this.reset01()
                // console.log(this.form2.cbpg161,111);
                // console.log(this.form.cbpg01,222);
                console.log(response.data.id, 333);
                this.tableData.forEach((item) => {
                  item.cbpc01 = response.data.id;
                  console.log(item.cbpc01,8523697412);
                })
                this._ly_ok()
              }
            });
          } else {
            this.$message.error('请注意规范');
          }
        })
        //    this._ly_ok();
      },

      /** 返回操作 */
      handleChuangJiangone: function(row) {
        // this.$router.push("/system/user-auth/role/");
        this.$router.push("/system/user-cktkfh/role/");
      },





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
<style src="./index.css">
</style>
