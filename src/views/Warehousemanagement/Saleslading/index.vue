<template>
  <!--销售提货单-->
  <div class="app-container">
    <el-row :gutter="20" style="margin:0;width: 100%;">
      <el-col :span="20" :xs="24" class="tooltup" style="width: 100%">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px"
          style="flex-grow: 0;height: auto;">
          <el-form-item prop="orderNo" label="编号">
            <el-input v-model="queryParams.orderNo" id="miaoshu" placeholder="请输入编号" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item prop="whName" label="仓库">
            <el-input v-model="queryParams.whName" id="miaoshu" placeholder="请输入仓库" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="创建时间" style="margin-left: 1%">
            <el-date-picker :size="mini" v-model="dateRange" type="daterange" :picker-options="pickerOptions"
              popper-class="elDatePicker" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" class="biaoto-buttonchaxuen" @click="handleQuery">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="biaoto-buttonchuangjian" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
          <el-form-item style="margin-left: 0;">
            <el-button size="mini" class="biaoto-buttonchuangjian" style="margin-left: -2%">创建</el-button>
            <el-dropdown trigger="click" v-hasPermi="['system:whmanagement:add']">
              <span class="xialaxuanxanggdd">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix" @click.native="tong">
                  通过订单创建
                  <el-badge class="mark" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple" @click="handleDelete"
              v-hasPermi="['system:whmanagement:remove']">删除</el-button>
            <!-- <el-button
              plain
              size="mini"
              class="biaoto-buttondaochu"
              :disabled="multiple"
              @click="PurchaseinboundShenpi01"
              v-hasPermi="['system:user:export']"
              >审核</el-button
            >
            <el-button
              plain
              size="mini"
              class="biaoto-buttonfanshen"
              :disabled="multiple"
              @click="PurchaseinboundFanShenpi01"
              v-hasPermi="['system:user:export']"
              >反审</el-button
            > -->
            <!-- <el-button
              plain
              size="mini"
              class="biaoto-buttondaochu"
              @click="PurchaseinboundBiaojiWancheng01"
              :disabled="multiple"
              v-hasPermi="['system:whmanagement:auditTakeOrder']"
              >标记完成
            </el-button>
            <el-button
              plain
              size="mini"
              class="biaoto-buttonfanshen"
              @click="PurchaseinboundQuxiaoWangcheng01"
              :disabled="multiple"
              v-hasPermi="['system:whmanagement:auditTakeOrder']"
              >取消完成
            </el-button> -->
          </el-form-item>
        </el-form>

        <el-table border :header-cell-style="headClassSld" :row-style="{ height: '3px' }"
          :cell-style="{ padding: '2px' }" v-loading="loading" :data="userList" height="440"
          :default-sort="{ prop: 'name', order: 'descending' }"
          style="width:100%;height: 8%;margin-left: 0;flex-grow: 1;" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="编号" align="left" key="orderNo" prop="orderNo" width="155px;" sortable fixed />
          <el-table-column label="日期" align="left" key="orderDate" prop="orderDate" width="110px;"
            :formatter="formatDate" sortable>
          </el-table-column>
          <el-table-column label="客户订单号" align="left" key="customerNo" width="210px;" prop="customerNo" sortable />
          <el-table-column label="客户" align="left" key="customerName" width="320px;" prop="customerName" sortable />
          <el-table-column label="客户等级" align="left" key="customerLevel" width="110px;" prop="customerLevel" sortable />
          <el-table-column label="联系人" align="left" key="contacts" width="90px;" prop="contacts" sortable />
          <el-table-column label="电话" align="left" key="phone" width="120px;" prop="phone" sortable />
          <el-table-column label="销售人员" align="left" key="saleUser" width="100px;" prop="saleUser" sortable />
          <el-table-column label="仓库" align="left" key="whName" width="80px;" prop="whName" sortable />
          <el-table-column label="结算货币" align="left" key="cala08" width="120px;" prop="cala08" sortable />
          <el-table-column label="收货地址" align="left" key="address" width="520px;" prop="address" sortable />
          <el-table-column label="收货人" align="left" key="contactss" width="120px;" prop="contactss" sortable />
          <el-table-column label="收货电话" align="left" key="phonee" width="120px;" prop="phonee" sortable />
          <el-table-column label="关联订单" align="left" key="cala089" width="120px;" prop="cala089" sortable />
          <el-table-column label="状态" align="center" key="statusMsg" width="100px;" prop="statusMsg" sortable>
          </el-table-column>
          <el-table-column label="提货建议表" align="left" key="checkStatusMsg" width="120px;" prop="checkStatusMsg"
            sortable>
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" class="button-caozuoxougai caozuoxiangqeng"
                @click="handlexiangqengSelects(scope.row)" v-if="(scope.row.status == 2)"
                v-hasPermi="['system:whmanagement:edit']">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250" fixed="right" class-name="small-padding fixed-width">
            <template slot-scope="scope" style="margin-left: -10%">
              <!-- <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                class="button-caozuoxougai caozuoxiangqeng"
                @click="handlexiangqengSelect(scope.row)"
                v-if="(scope.row.status == 0)"
                v-hasPermi="['system:whmanagement:edit']"
              >
                修改
              </el-button> -->
              <el-button size="mini" type="text" icon="el-icon-delete" class="button-caozuoxougai caozuoxiangqeng"
                @click="handleDelete01(scope.row)" v-if="(scope.row.status == 0)"
                v-hasPermi="['system:whmanagement:remove']">删除</el-button>
              <el-button size="mini" type="text" icon="el-icon-share" class="caozuoxiangqeng"
                @click="handleAuthRole(scope.row)" v-hasPermi="['system:whmanagement:detail']">详情
              </el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundShenpis(scope.row)" v-hasPermi="['system:whmanagement:auditTakeOrder']"
                v-if="scope.row.status == 1">撤销</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundShenpi(scope.row)" v-hasPermi="['system:whmanagement:sh']"
                v-if="scope.row.status == 1">审核</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundFanShenpi(scope.row)" v-hasPermi="['system:whmanagement:fs']"
                v-if="scope.row.status == 2">反审</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PrintRow(scope.row)" v-hasPermi="['system:whmanagement:auditTakeOrder']"
                v-if="scope.row.checkStatus == 2 && scope.row.status == 2">质检</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundQuxiaoWangcheng(scope.row)" v-hasPermi="['system:whmanagement:auditTakeOrder']"
                v-if="scope.row.status == 3">取消完成</el-button>
              <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                @click="PurchaseinboundBiaojiWancheng(scope.row)" v-hasPermi="['system:whmanagement:auditTakeOrder']"
                v-if="(scope.row.status == 2)">标记完成</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[10, 15, 20, 50, 500]"
          class="pagintotal" />
      </el-col>
    </el-row>

    <!--订单创建-->
    <el-dialog :visible.sync="open3" @close="close">
      <el-row :gutter="20" style="margin-left:-14px;margin-bottom:10px">
        <el-col :span="6">
          <!-- <el-popover placement="bottom-start" trigger="click" clearable>
            <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width: 260px !important" />
            <el-input slot="reference" v-model="form2.cbpc100" placeholder="请选择仓库" readonly style="width: 96%">
            </el-input>
          </el-popover> -->
          <el-popover placement="bottom-start" trigger="click" clearable>
            <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width: 260px !important" />
            <el-input slot="reference" v-model="form2.cbpc100" placeholder="请选择仓库" readonly style="width: 96%">
            </el-input>
          </el-popover>
        </el-col>
        <el-col :span="6">
          <el-input v-model="queryParamsxs.saleNo" id="miaoshu" placeholder="请输入销售订单编号" clearable style="width: 100%"
            @change="handleQuerys(queryParamsxs.saleNo)" />
        </el-col>

        <el-col :span="6">
          <!-- <el-select v-model="valuexs" placeholder="请选择客户" @change="hello">
            <el-option v-for="item in customerLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->

          <el-input v-model="queryParamsxs.customerName" id="miaoshu" placeholder="请输入客户名称" clearable
            style="width: 100%" @keyup.enter.native="hello" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="found">创建提货单</el-button>
        </el-col>
      </el-row>
      <el-table border :header-cell-style="headClassssmtt" v-loading="loading" :data="userList01" height="440"
        :default-sort="{ prop: 'name', order: 'descending' }" style="width: 100%; height: 8%; margin-left: -2%"
        @selection-change="handleSelectionChangee">
        <el-table-column label="" align="center" width="50" class-name="small-padding fixed-width" type="selection">
        </el-table-column>
        <!-- <el-table-column label="" align="center" width="50" class-name="small-padding fixed-width">
          <template slot-scope="scope" style="margin-left: -10%">
            <el-button size="mini" icon="el-icon-share" class="button-caozuoxougai caozuoxiangqeng" type="primary"
              @click="sendParams(scope.row)">
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="编号" align="left" key="orderNo" prop="orderNo" sortable
          style="padding-top: 60px !important" width="260px;" />
        <el-table-column label="单据日期" align="left" key="orderDate" prop="orderDate" width="180px;" sortable />
        <el-table-column label="客户" align="left" key="customerName" prop="customerName" width="220px;" sortable />
        <el-table-column label="销售人员" align="left" key="saleUser" prop="saleUser" width="160px;" sortable>
        </el-table-column>
        <el-table-column label="制单日期" align="left" key="createTime" prop="createTime" width="280px;" sortable />
        <el-table-column label="订单分类" align="left" key="orderClassMsg" prop="orderClassMsg" width="280px;" sortable />
      </el-table>
      <pagination v-show="totall > 0" :total="totall" :page.sync="queryParamsxs.pageNum"
        :limit.sync="queryParamsxs.pageSize" @pagination="getList09" :page-sizes="[10, 15, 20, 50, 500]" />
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { addUserSysPurchaseinbound, listUserPurchaseinbound, updateUserPurchaseinbound, removeSysPurchaseinbound, henUserSysPurchaseinbound, listUserGongyinShangs, listUserShangPxxweihus, listUserKuweisKus, listUsercangkuStore } from "@/api/Warehousemanagement/PurchaseWarehousing";
import {
  PurchaseinboundAdd,
  Purchaseinbounddingdancx,
  PurchaseinboundEdit,
  PurchaseinboundRemove,
  PurchaseinboundSH,
  PurchaseinboundShs,
  Purchaseinbounds,
  PurchaseinboundShss,
  SupplierList,
  GoodsList,
  StoreList,
  StoreSkuList,
  PurchaseinboundLists,
  Purchaseinbounddingdanxsdd,
  saleOrderListGoods,
  auditTakeOrder,
} from "@/api/Warehousemanagement/Saleslading";

import * as req from "@/api/Warehousemanagement/Saleslading";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { SwJsCustomerlist } from "@/api/Basicinformationmaintenance/CustomerMaintenance";


//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

export default {
  name: "Saleslading",
  dicts: [
    "sys_normal_disable",
    "sw_js_store_type",
    "sys_user_sex",
    "sw_js_store_type_manage_mode",
  ],
  components: { Treeselect, kuweixxweihu, supplierMaintenance },
  data() {
    return {
      isok: false,
      whId: "",
      valuexs: null,
      customerLists: null,
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
      showSearch: true,
      // 总条数
      total: 0,
      totall: 0,
      // 用户表格数据
      userList: null,
      userList01: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      open1: false,
      open2: false,
      open3: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
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
      postCangKu: [],
      //修改下拉框首选值
      kucuenmiongxichu: {
        spuplierName: "翰合供应链公司",
        skuName: "gwqww",
        brand: "华为",
        type: "条码管理",
        model: "jwe",
        isQualified: "合格",
        orderType: "国内订单",
        scanStatus: "已扫码",
        warehusingStatus: "待入库",
        // name:'翰合供应链公司'
      },
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
          value: "1",
          label: "CNY",
        },
        {
          value: "2",
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
        orderNo: "",
        customerName: "",
        contacts: "",
        phone: "",
        name: "",
        phone: "",
        skuSort: "",
        telPeople: "",
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
        cbpc10: "",
        cbpc09: "",
        cbsa07: "",
        cbsa09: "",
        cbsa10: "",
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
        pageSize: 15,
        page: 1,
        size: 15,
        // status:'',
        total: this.total,
        totall: this.totall,
        saleOrderNo: undefined,
        whName: undefined,
        orderNo: undefined,
        cbwa09: undefined,
        dateRange: undefined,
      },
      // 查询参数
      queryParams2: {
        pageNum: 1, // 当前页码
        pageSize: 15,
        page: 1,
        size: 15,
        // status:'',
        total: this.total,
        totall: this.totall,
        saleOrderNo: undefined,
        whName: undefined,
        orderNo: undefined,
        cbwa09: undefined,
        dateRange: undefined,
      },
      queryParamsxs: {
        pageNum: 1, // 当前页码
        pageSize: 15,
        whId: null,
        saleNo: null,
        customerName: null
      },
      // 列信息
      //  columns: [
      //   {
      //     title:'状态',
      //     dataIndex:'ifEnabled',
      //     scopedSlots: { customRender: 'ifEnabled' }
      //   }
      // ],
      //表单校验
      rules: {
        num: [{ required: true, message: "数据不能为空!", trigger: "blur" }],
        price: [{ required: true, message: "单价不能为空!", trigger: "blur" }],
        totalPrice: [
          { required: true, message: "金额不能为空!", trigger: "blur" },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, start]);
            },
          },
          {
            text: "本周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              let day = start.getDay();
              let date = start.getDate();
              if (day != 0) {
                start.setDate(date - (day - 1));
              }
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上周",
            onClick(picker) {
              var oDate = new Date();
              oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7);
              let day = oDate.getDay();
              let start = new Date(),
                end = new Date();
              if (day == 0) {
                start.setDate(oDate.getDate());
                end.setDate(oDate.getDate() + 6);
              } else {
                start.setTime(oDate.getTime() - 3600 * 1000 * 24 * (day - 1));
                end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (7 - day));
              }
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setDate(1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上月",
            onClick(picker) {
              var oDate = new Date();
              let year = oDate.getFullYear();
              let month = oDate.getMonth();
              let start, end;
              if (month == 0) {
                year--;
                start = new Date(year, 11, 1);
                end = new Date(year, 11, 31);
              } else {
                start = new Date(year, month - 1, 1);
                end = new Date(year, month, 0);
              }
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本季度",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上季度",
            onClick(picker) {
              var oDate = new Date();
              let year = oDate.getFullYear();
              let month = oDate.getMonth() + 1;
              let n = Math.ceil(month / 3); // 季度，上一个季度则-1
              let prevN = n - 1;
              if (n == 1) {
                year--;
                prevN = 4;
              }
              month = prevN * 3; // 月份
              const start = new Date(year, month - 3, 1);
              const end = new Date(year, month, 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(0);
              start.setDate(1);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      daterange: "",
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    '$route'() {
      this.getList();
    }
  },
  created() {
    //仓库明细初始化
    this.getList();
    //供应商
    this.getList01();
    //库位
    this.getList02();
    //商品信息维护
    this.getList03();
    //仓库
    this.getList04();

    // //销售订单
    // this.getList09();

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
    this.form2.cbsa09 = "20";

    // 获取客户列表
    SwJsCustomerlist({ pageNum: 1, pageSize: 999999 }).then(res => {
      console.log(res, "res")
      this.customerLists = res.data.rows.map(item => {
        return { value: item.cbca08, label: item.cbca08 }
      })
      console.log(this.customerLists, 'this.customerLists')
    })
  },
  methods: {
    found() {
      let isok = true;
      if (this.shenpiids[0]) {
        let customerName1 = this.shenpiids[0].customerName
        for (let i = 0; i < this.shenpiids.length; i++) {
          if (this.shenpiids[i].customerName !== customerName1) {
            isok = false
          }
        }
      }
      if (!this.form2.cbpc10) {
        this.$message({
          message: '请选择仓库',
          type: 'warning'
        });
      } else if (!this.shenpiids[0]) {
        this.$message({
          message: '请选择订单',
          type: 'warning'
        });
      }
      else if (!isok) {
        this.$message({
          message: '请选择同一客户',
          type: 'warning'
        });
      }
      else {
        console.log('跳转到创建界面')
        this.$router.push({
          path: "/system/user-authhhxsxiaosdingdantihuo/role/",
          // name: "AuthUser",
          query: {
            data: this.idss,
            whNameid: this.form2.cbpc10
          },
        });
        this.form2.cbpc100 = ''
        this.queryParams.orderNo = ''
        this.open3 = false
        this.valuexs = ""
        this.form2.cbpc10 = ""
        // this.queryParams.orderNo = ""
        // this.valuexs = ""
        // this.tcwhId = ""
        // this.orderNo = ""
        // this.tcOrderNo = ""
        // this.form2.cbpc10 = ""
        // this.orderNo1 = ""
        // this.open3 = false
        this.close()

      }
    },
    // 创建分页
    getList09() {
      this.loading = true;
      // this.queryParams.status = 5

      saleOrderListGoods(this.queryParamsxs).then((response) => {
        this.userList01 = response.data.rows;
        this.totall = response.data.total;
        // //供应商
        // this.postOptions = response.data.content;
        // console.log(this.userList, 3369);
        console.log(response, 199911196914);
        // this.deleteFlag = response.data.rows.deleteFlag;
        this.loading = false;
      });
    },
    // 选择客户
    hello() {

      // cus.status = 5
      // cus.orderNo = this.queryParams.orderNo
      // cus.customerName = this.valuexs
      // cus.pageSize = 15
      // this.form2.icon = name;
      // this.customerName = this.valuexs
      this.queryParamsxs.pageNum = 1
      // this.queryParamsxs.customerName = this.valuexs

      console.log(this.queryParamsxs, "this.queryParamsxs--------------this.queryParamsxs")

      saleOrderListGoods(this.queryParamsxs).then((res) => {

        if (res.code == 200) {
          console.log(res, "----------------res")
          this.userList01 = res.data.rows;
          //   this.userList01 = response.data.rows;
          this.totall = res.data.total;
          // // //供应商
          // // this.postOptions = response.data.content;
          // // console.log(this.userList, 3369);
          // console.log(response, 199911196914);
          // // this.deleteFlag = response.data.rows.deleteFlag;
          // this.loading = false;
        }
        console.log(res, 4444444)
      })
    },
    close() {
      this.form2.cbpc100 = ''
      this.whId = ""
      this.form2.cbpc10 = ""
      this.valuexs = ""
      this.queryParamsxs.whId = null
      this.queryParamsxs.saleNo = null
      this.queryParamsxs.customerName = null
    },
    //列表表头设置
    headClassssmtt() {
      return {
        'text-align': 'left',
        height: "30px",
        padding: "0",
      };
    },

    //销售订单
    tong() {
      this.open3 = true;
      this.getList09();
    },

    //列表表头设置
    headClassSld() {
      return {
        'text-align': 'left',
        height: "40px",
        padding: "0",
      };
    },
    chen() {
      this.form2.cbsa09 = "20";
      this.form2.cbsa10 = this.form2.cbsa07 * this.form2.cbsa09;
    },
    //仓库
    selected01(name) {
      this.form2.cbpc100 = name.substring(0, name.indexOf("-"));
      this.form2.cbpc10 = name.substring(name.indexOf("-") + 1);
      this.loading = true;
      this.queryParamsxs.whId = this.form2.cbpc10
      // let cus = this.addDateRange(this.queryParams2, this.dateRange)
      // cus.whId = this.form2.cbpc10
      // cus.status = 5
      // cus.orderNo = this.queryParams2.orderNo
      // cus.customerName = this.valuexs
      // cus.pageSize = 15
      // this.form2.icon = name;
      // this.customerName = this.valuexs
      // console.log(cus, "cus")
      saleOrderListGoods(this.queryParamsxs).then((response) => {
        this.userList01 = response.data.rows;
        this.totall = response.data.total;
        // //供应商
        // this.postOptions = response.data.content;
        // console.log(this.userList, 3369);
        console.log(response, 199911196914);
        // this.deleteFlag = response.data.rows.deleteFlag;
        this.loading = false;
        // this.queryParams2.whId = cus.whId
        // cus.whId = ""
        // cus.status = ""
        // this.whId = ""
      });

    },
    //供应商
    selected02(name) {
      console.log(name, 123);
      console.log(name.substring(name.indexOf("-") + 1), 963);
      this.form2.cbpc099 = name.substring(0, name.indexOf("-"));
      this.form2.cbpc09 = name.substring(name.indexOf("-") + 1);
      // this.form2.icon = name;
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

    /** 销售提货单列表 查询 */
    getList() {
      this.loading = true;
      console.log(this.queryParams, this.dateRange, "ceshi");
      Purchaseinbounddingdancx(
        this.addDateRange(this.queryParams, this.dateRange)
      ).then((response) => {
        this.userList = response.data.rows;
        this.total = response.data.total;
        console.log(response.data.rows, 339688);
        this.loading = false;
      });
    },

    /** 销售订单列表 */
    // getList09() {
    //   this.loading = true;
    //   // this.queryParams.status = 5

    //   Purchaseinbounddingdanxsdd(this.addDateRange(this.queryParams2, this.dateRange)).then((response) => {
    //     this.userList01 = response.data.rows;
    //     this.totall = response.data.total;
    //     // //供应商
    //     // this.postOptions = response.data.content;
    //     // console.log(this.userList, 3369);
    //     console.log(response, 199911196914);
    //     // this.deleteFlag = response.data.rows.deleteFlag;
    //     this.loading = false;
    //   });
    // },

    //供应商
    getList01() {
      SupplierList(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.postOptions = response.data.rows;
          // console.log(response.data.rows,551100);
        }
      );
    },
    //库位
    getList02() {
      StoreList(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.KuWeiOptions = response.data.rows;
          // console.log(response.data.rows,663322);
        }
      );
    },

    //商品信息维护
    getList03() {
      GoodsList(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.shangponOptions = response.data.rows;
          this.XinghaoOptions = response.data.rows;
          this.ponpaixenghaomiaoshu = response.data.rows;
          // console.log(response.data.rows, 1655);
        }
      );
    },
    //仓库信息维护
    getList04() {
      StoreSkuList(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.postCangKu = response.data.rows;
          // this.XinghaoOptions = response.data.rows;
          // console.log(response.data.rows, 1655);
        }
      );
    },

    // 取消按钮
    cancel() {
      this.open2 = false;
    },
    //修改的取消按钮
    cancells() {
      this.open = false;
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
    /** 搜索按钮操作 */
    handleQuery() {
      // var neirong = $('#miaoshu').val();
      this.userList.sn = this.form.sn;
      this.getList();
      this.queryParams.pageNum = 1;
      this.queryParams.sn = "";
      console.log(this.queryParams);
    },
    handleQuerys(saleNo) {
      console.log(saleNo)
      this.queryParamsxs.saleNo = saleNo;
      // let obj = {
      //   orderNo: saleNo,
      //   type: ''
      // }
      saleOrderListGoods(this.queryParamsxs).then((res) => {
        if (res.code == 200) {
          this.userList01 = res.data.rows;
          this.totall = res.data.total
        }
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection;
      this.idss = selection.map((item) => item.id);
      this.shenpiids = selection;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 多选框选中数据
    handleSelectionChangee(selection) {
      this.ids = selection;
      this.idss = selection.map((item) => item.id);
      this.shenpiids = selection;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      console.log(this.idss, "tis.idss------------this.idss")
    },
    // 处理多条数据
    changeMoreArrary(row, type) {
      let paramss = {
        goods: [],
        opType: type,
        takeOrderId: row.id,
        userId: 1,
      };
      auditTakeOrder(paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: res.msg, type: "success" });
          this.getList()
        } else {
          // this.$message({ message:res.msg, type: "error" });
        }
      });
      // let obj = {
      //   "goodQty": 0,
      //   "plId": 0
      // }
      // paramss.goods = this.userLists.map(item =>{
      //   obj.goodQty = item.qty;
      //   obj.plId = item.cbplId;
      //   return obj
      // })
      // console.log(this.paramss.goods,'4444')
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    handlechuangjiang() {
      this.open2 = true;
      this.form2.swJsStoreId01 = row.name;
    },

    //审批
    PurchaseinboundShenpi(row) {

      console.log(row.id, 8888);
      let userId = row.id;
      let status = row.status
      let checkstatus = row.checkStatus
      let edit = 0
      this.$router.push("/system/user-authhhh/role/" + userId + status + checkstatus + edit);
      // PurchaseinboundSH(row).then((response) => {
      //   // console.log(this.form.cbpc01, 789)
      //   // this.submitShangpin();
      //   console.log(response);
      //   if (response.code == 200) {
      //     this.getList();
      //     // this.open = false;
      //     this.$message({ message: "审批成功", type: "success" });
      //   } else {
      //    // this.$modal.msgError(response.msg);
      //   }
      // });
    },
    //审批上面内容
    PurchaseinboundShenpi01(row) {

      // let userIds = this.shenpiids.length > 0 ? this.shenpiids : row;
      // console.log(userIds, 8888);
      // userIds.forEach((item) => {
      //   req
      //     .PurchaseinboundSH(item)
      //     .then((res) => {
      //       // console.log(res, 123)
      //       if (res.code == 200) {
      //         this.getList();
      //         this.$modal.msgSuccess("审批成功");
      //       } else {
      //        // this.$modal.msgError(res.msg);
      //       }
      //     })
      //     .catch((e) => {
      //       // console.log(e, 456)
      //     });
      // });
    },
    //反审
    PurchaseinboundFanShenpi(row) {
      // console.log(row.cbpc01, 8888);
      let userId = row.id;
      let status = row.status
      let checkstatus = row.checkStatus
      let edit = 0
      this.$router.push("/system/user-authhhh/role/" + userId + status + checkstatus + edit);

      // PurchaseinboundShs(row).then((response) => {
      //   if (response.code == 200) {
      //     // console.log(this.form.cbpc01, 789)
      //     // this.submitShangpin();
      //     this.getList();
      //     // this.open = false;
      //     this.$message({ message: "反审成功", type: "success" });
      //   } else {
      //     this.$modal.msgError(response.msg);
      //   }
      // });
    },

    //反审上面的
    PurchaseinboundFanShenpi01(row) {
      let userIds = this.shenpiids.length > 0 ? this.shenpiids : row;
      // console.log(row.cbpc01, 8888);

      userIds.forEach((item) => {
        req
          .PurchaseinboundShs(item)
          .then((res) => {
            if (res.code == 200) {
              // console.log(res, 123)
              this.getList();
              this.$modal.msgSuccess("反审成功");
            }
          })
          .catch((e) => {
            // console.log(e, 456)
          });
      });
    },
    // 质检
    PrintRow(row) {
      let userId = row.id;
      let status = 3;
      let checkstatus = 1
      let edit = 0
      this.$router.push("/system/user-authhhh/role/" + userId + status + checkstatus + edit);
      // this.changeMoreArrary(row,6)

      // this.paramss.opType = 6;
      // this.changeMoreArrary()
      // auditTakeOrder(this.paramss).then((res) => {
      //   if (res.code == 200) {
      //     this.$message({ message: "质检完成成功", type: "success" });
      //     this.$router.push("/Warehousemanagement/Saleslading/");
      //   } else {
      //     this.$message({ message: res.msg, type: "error" });
      //   }
      // });
    },
    //标记完成
    PurchaseinboundBiaojiWancheng(row) {
      this.changeMoreArrary(row, 4)
      // PurchaseinboundShss(row).then((response) => {
      //   if (response.code == 200) {
      //     console.log(this.form.id, 789);
      //     // this.submitShangpin();
      //     this.getList();
      //     // this.open = false;
      //     this.$message({ message: "标记完成", type: "success" });
      //   } else {
      //     this.$modal.msgError(response.msg);
      //   }
      // });
    },

    //标记完成上面的按钮
    PurchaseinboundBiaojiWancheng01(row) {
      let userIds = this.shenpiids.length > 0 ? this.shenpiids : row;
      // console.log(row.cbpc01, 8888);
      console.log(userIds)
      let paramss = {
        goods: [],
        opType: '',
        takeOrderId: '',
        userId: 1,
      };
      userIds.forEach((item) => {
        paramss = {
          opType: 4,
          takeOrderId: item.id,
          userId: 1
        }
        req.auditTakeOrder(paramss).then((res) => {
          if (res.code == 200) {
            // console.log(res, 123)
            this.getList();
            this.$modal.msgSuccess("标记完成");
          }
        })
          .catch((e) => {
            console.log(e, 456)
          });
      });
      // userIds.forEach((item) => {
      //   req
      //     .PurchaseinboundShss(item)
      //     .then((res) => {
      //       if (res.code == 200) {
      //         // console.log(res, 123)
      //         this.getList();
      //         this.$modal.msgSuccess("标记完成");
      //       } else {
      //         this.$modal.msgError(res.msg);
      //       }
      //     })
      //     .catch((e) => {
      //       // console.log(e, 456)
      //     });
      // });
    },
    //取消标记
    PurchaseinboundQuxiaoWangcheng(row) {
      // console.log(row.cbpc01, 8888);

      // Purchaseinbounds(row).then(response => {
      //     console.log(this.form.cbpc01, 789)
      //     // this.submitShangpin();
      //     this.getList();
      //     // this.open = false;
      //     this.$message({ message: '恭喜你，取消标记成功', type: 'success' });

      // });

      // console.log(row.cbpc01, 8888);
      this.$modal
        .confirm('是否要取消标记为ID"' + row.id + '"的数据项？')
        .then(() => {
          Purchaseinbounds(row).then((response) => {
            if (response.code == 200) {
              console.log(this.form.id, 789);
              this.getList();
              this.$message({ message: "取消标记成功", type: "success" });
            }
          });
        })
        .catch(() => { });
    },
    //取消标记上面的
    PurchaseinboundQuxiaoWangcheng01(row) {
      let userIds = this.shenpiids.length > 0 ? this.shenpiids : row;
      // console.log(row.cbpc01, 8888);
      let paramss = {
        goods: [],
        opType: '',
        takeOrderId: '',
        userId: 1,
      };
      userIds.forEach((item) => {
        paramss = {
          opType: 5,
          takeOrderId: item.id,
          userId: 1
        }
        req.auditTakeOrder(paramss).then((res) => {
          if (res.code == 200) {
            this.getList();
            this.$modal.msgSuccess("取消标记成功");
          }
        })
          .catch((e) => {
            console.log(e, 456)
          });
      });
      // userIds.forEach((item) => {
      //   req
      //     .Purchaseinbounds(item)
      //     .then((res) => {
      //       if (res.code == 200) {
      //         // console.log(res, 123)
      //         this.getList();
      //         this.$modal.msgSuccess("取消标记成功");
      //       } else {
      //         this.$modal.msgError(res.msg);
      //       }
      //     })
      //     .catch((e) => {
      //       // console.log(e, 456)
      //     });
      // });
    },
    // 撤销
    // auditTakeOrder,
    PurchaseinboundShenpis(row) {
      this.changeMoreArrary(row, 2)
    },
    /** 修改按钮操作 */
    handleUpdate() {
      if (this.form.name != undefined) {
        let row = {};
        row.id = this.form.id;
        row.customerName = this.form.customerName;
        row.contacts = this.form.contacts;
        row.phone = this.form.phone;
        row.orderNo = this.form.orderNo;
        // console.log(this.form.id);
        PurchaseinboundEdit(JSON.stringify(row)).then((response) => {
          // console.log(this.form, 789)
          this.getList();
          this.open = false;
          this.$message({ message: "修改成功", type: "success" });
        });
      } else {
        this.$message.error("错了哦，商品名称没有填呢");
      }
    },

    /** 详情按钮操作 */
    handlexiangqeng() {
      if (this.form.name != undefined) {
        let row1 = {};
        row.cbpc07 = this.form1.cbpc07;
        row.cbsa08 = this.form1.cbsa08;
        row.cbwa09 = this.form1.cbwa09;
        row.cala08 = this.form1.cala08;
        row.cbpc01 = this.form1.cbpc01;
        // console.log(this.form.id);
        PurchaseinboundEdit(JSON.stringify(row)).then((response) => {
          // console.log(this.form, 789)
          this.getList();
          this.open = false;
          this.$message({ message: "修改成功", type: "success" });
        });
      } else {
        this.$message.error("错了哦，商品名称没有填呢");
      }
    },
    /** 详情按钮操作**/
    handleSelect(row) {
      this.getList05();
      this.open1 = true;
      this.form1.cbpc01 = row.cbpc01;
      this.form1.cbpc07 = row.cbpc07;
      // this.form.cbpc08 = row.cbpc08;
      this.form1.cbsa08 = row.cbsa08;
      this.form1.cbwa09 = row.cbwa09;
      this.form1.cala08 = row.cala08;
    },
    /** 修改详情按钮操作**/
    handlexiangqengSelect(row) {
      this.open = true;
      console.log(row, 7788521);
      this.form.id = row.id;
      this.$router.push("/system/user-authhhhxg/role/" + this.form.id);

      // this.form.customerName = row.customerName;
      // this.form.contacts = row.contacts;
      // this.form.phone = row.phone;
      // this.form.orderNo = row.orderNo;
    },
    /* 编辑按钮操作 */
    handlexiangqengSelects(row) {
      this.open = true;
      console.log(row, 7788521);
      let userId = row.id;
      let status = row.status
      let checkstatus = row.checkStatus
      let edit = 1
      this.$router.push("/system/user-authhhh/role/" + userId + status + checkstatus + edit);
    },
    /** 数形列表的商品分类按钮**/
    submitShangpin() {
      this.reset();
    },
    //列表刷新
    liebiaoshuax() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.$refs["form2"][0].validate((item) => {
      //     if (item) {
      PurchaseinboundAdd(this.form2).then((response) => {
        // console.log(response.posts, 12345678);
        this.$message({
          message: "添加成功",
          type: "success",
          style: "color:red;!important",
        });
        // this.getTreeselect();
        // this.submitShangpin();
        this.submitShangpin();
        this.getList();
        this.open2 = false;
        this.reset01();

        // console.log(this.form2.ifEnabled, 123456);
      });
      //     } else {
      //         this.$message.error('请注意规范');
      //     }
      // })

      // if (this.form2.name != undefined || this.form2.address != undefined || this.form2.telPeople != undefined) {
      //     // console.log(this.form.id, 123456);

      //     addUserSysBarcode(this.form2).then(response => {
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

      // // this.reset();
      // // } else {
      // //   this.$message.error('错了哦，商品名称没有填呢');
      // // }
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            this.$modal.msgSuccess("修改成功，新密码是：" + value);
          });
        })
        .catch(() => { });
    },
    /** 分配角色操作 详情跳转 */
    handleAuthRole: function (row) {
      const userId = row.id;
      let status = 0
      let checkstatus = 0
      let edit = 3
      this.$router.push("/system/user-authhhh/role/" + userId + status + checkstatus + edit);
    },
    /** 创建操作 */
    handletihuoone: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$router.push("/system/user-xsth/role/");
    },
    // /** 提交按钮 */
    // submitForm: function () {
    //     this.$refs["form"].validate(valid => {
    //         if (valid) {
    //             if (this.form.userId != undefined) {
    //                 updateUserStore(this.form).then(response => {
    //                     this.$modal.msgSuccess("修改成功");
    //                     this.open = false;
    //                     this.getList();
    //                 });
    //             } else {
    //                 addUser(this.form).then(response => {
    //                     this.$modal.msgSuccess("新增成功");
    //                     this.open = false;
    //                     this.getList();
    //                 });
    //             }
    //         }
    //     });
    // },
    /** 批量删除按钮操作 */
    handleDelete(row) {
      // row.classifyId = this.form.classifyId;
      // row.brand = this.form.brand;
      // row.model = this.form.model;
      // row.upc = this.form.upc;
      // row.description = this.form.description;
      // row.ifEnabled = this.form.ifEnabled;
      // row.id=this.form.id;
      let userIds = this.ids.length > 0 ? this.ids : row;
      console.log([JSON.stringify(this.idss), this.idss, '数据'])
      this.$modal.confirm('是否确认删除仓库为"' + JSON.stringify(this.idss) + '"的数据项？')
        .then(() => {
          userIds.forEach((item) => {
            req
              .PurchaseinboundRemove(JSON.stringify(item.id))
              .then((res) => {
                if (res.code == 200) {
                  this.submitShangpin();
                  this.getList();
                  this.$modal.msgSuccess("删除成功");
                }
              })
              .catch((e) => {
                // console.log(e, 456)
              });
          });
        })
        .catch(() => { });
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "/system/Purchaseinbound/SwJsGoodsexport",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
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
      console.log(row, 2222);
      this.$modal
        .confirm('是否确认删除编号为"' + row.orderNo + '"的数据项？')
        .then(function () {
          return PurchaseinboundRemove(JSON.stringify(row.id));
        })
        .then((response) => {
          if (response.code == 200) {
            this.submitShangpin();
            this.getList();
            this.$modal.msgSuccess("删除成功");
          }
        })
        .catch(() => { });
    },
    // /** 导出按钮操作 */
    // handleExport() {
    //     this.download('/system/supplier/SwJsSupplierexport', {
    //         ...this.queryParams
    //     }, `user_${new Date().getTime()}.xlsx`)
    // },

    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm('是否确认导出所有用户数据项?', "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(function () {
    //     return exportUser(queryParams);
    //   }).then(response => {
    //     this.download(response.msg);
    //   }).catch(function () { });
    // },

    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "商品分类";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "/system/barcode/importSwJsSkuBarcodeimportTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      // this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    sendParams(row) {
      console.log(this.form2.cbpc10)
      if (!this.form2.cbpc10) {
        this.$message({
          message: '请选择仓库',
          type: 'warning'
        });
      } else {
        this.$router.push({
          path: "/system/user-authhhxsxiaosdingdantihuo/role/",
          // name: "AuthUser",
          query: {
            data: row.id,
            whNameid: this.form2.cbpc10
          },
        });
        this.form2.cbpc100 = ''
        this.queryParams.orderNo = ''
        this.open3 = false
        this.valuexs = ""
        this.form2.cbpc10 = ""
        // location.reload();
      }

    },

    //测试树状菜单
    // handleNodeClick(data) {
    //   console.log(data);
    // }
  },
};
</script>
<style src="./Salesladingcss/index.css" scoped >

</style>
<style lang="scss" scoped>
.tooltup {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(93vh - 85px);
  padding: 0 !important;
  margin: 0;
}

::v-deep .pagination-container .el-pagination {
  position: inherit;
}

.pagintotal {
  flex-grow: 0;
  text-align: right;
  height: auto;
  padding: 20px 0 0 !important;
  margin: 0;
}
</style>
