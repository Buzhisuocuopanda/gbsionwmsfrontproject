<template>
    <!-- 库存明细初始化 -->
    <div class="app-container">
        <el-row :gutter="20" style="margin:0;width: 100%;">
            <!--用户数据-->
            <el-col :span="20" :xs="24" class="tooltup" style="width:100%;">
                <!-- 表头内容  -->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="auto" style="flex-grow: 0;height: auto;">
                    <el-form-item prop="cbie07" label="编号">
                        <el-input v-model="queryParams.cbie07" id="miaoshu" placeholder="请输入编号" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item prop="cbwa09" label="仓库" style="margin-left:1%;">
                        <el-input v-model="queryParams.cbwa09" id="miaoshu" placeholder="请输入仓库" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="日期" style="margin-left:1%;">
                        <el-date-picker :size="mini" v-model="dateRange" type="daterange"
                            :picker-options="pickerOptions" popper-class="elDatePicker" value-format="yyyy-MM-dd"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left:0.1%;" size="mini" class="biaoto-buttonchaxuen"
                            v-hasPermi="['system:swJsStorea:list']" @click="handleQuery">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="biaoto-buttonchuangjian" v-hasPermi="['system:swJsStorea:list']" size="mini"
                            @click="resetQuery">重置</el-button>
                    </el-form-item>
                    <el-form-item style="margin-left:0;">
                        <!-- <el-button size="mini" class="biaoto-buttonchuangjian" @click="handlechuangjiang">创建</el-button> -->
                        <el-button size="mini" class="biaoto-buttonchuangjian" v-hasPermi="['system:swJsStorea:add']"
                            @click="handlekucunone">创建</el-button>
                        <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple"
                            v-hasPermi="['system:swJsStorea:remove']" @click="handleDelete">删除</el-button>
                        <!-- <el-button plain size="mini" class="biaoto-buttondaoru" @click="handleImport"
                            v-hasPermi="['system:user:import']">导入</el-button>
                        <el-button size="mini" class="biaoto-buttonchaxuen" @click="handleExport">导出</el-button> -->
                        <!-- <el-button plain size="mini" class="biaoto-buttondaochu" :disabled="multiple"
                            @click="PurchaseinboundShenpi01" v-hasPermi="['system:swJsStorea:sh']">审核</el-button>
                        <el-button plain size="mini" class="biaoto-buttonfanshen" :disabled="multiple"
                            @click="PurchaseinboundFanShenpi01" v-hasPermi="['system:swJsStorea:fs']">反审</el-button> -->
                        <el-button plain size="mini" class="biaoto-buttondaoru" @click="handleImport"
                            v-hasPermi="['system:swJsStorea:import']">导入</el-button>
                        <!-- <el-button plain size="mini" class="biaoto-buttondaochu"
                            @click="PurchaseinboundBiaojiWancheng01" :disabled="multiple"
                            v-hasPermi="['system:swJsStorea:bjwc']">标记完成
                        </el-button>
                        <el-button plain size="mini" class="biaoto-buttonfanshen"
                            @click="PurchaseinboundQuxiaoWangcheng01" :disabled="multiple"
                            v-hasPermi="['system:swJsStorea:qxwc']">取消完成
                        </el-button> -->
                    </el-form-item>
                </el-form>

                <el-table border :header-cell-style="headClassac" :row-style="{ height: '3px' }"
                    :cell-style="{ padding: '2px' }" v-loading="loading" :data="userList" height="430"
                    :default-sort="{ prop: 'name', order: 'descending' }"
                    style="width:100%;height: 8%;margin-left: 0;flex-grow: 1;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="编号" align="left" key="cbie07" width="400px;" prop="cbie07" sortable />
                    <el-table-column label="日期" align="left" key="cbie02" prop="cbie02" :formatter="formatDate"
                        sortable>
                    </el-table-column>
                    <el-table-column label="仓库" align="left" key="cbwa09" prop="cbwa09" sortable />
                    <!-- <el-table-column label="供应商" align="center" key="cbsa08" prop="cbsa08" sortable />

                    <el-table-column label="结算货币" align="center" key="cala08" prop="cala08" sortable /> -->
                    <el-table-column label="状态" width="150px;" align="center" key="cbie10" prop="cbie10" sortable>
                        <template scope="scope">
                            <div>{{ scope.row.cbie10 == 0 ? "未审核" : scope.row.cbie10 == 1 ?
                                    "已审核" : scope.row.cbie10 == 4 ? "已完成" : "未确定状态"
                            }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width">
                        <template slot-scope="scope" style="margin-left:-10%;">
                            <!-- <el-button size="mini" type="text" icon="el-icon-edit"
                                class="button-caozuoxougai caozuoxiangqeng" @click="handlexiangqengSelect(scope.row)"
                                v-if="scope.row.cbie10 == 0 | scope.row.cbie10 == 2" v-hasPermi="['system:swJsStorea:edit']">
                                修改
                            </el-button> -->
                            <el-button size="mini" type="text" icon="el-icon-delete"
                                class="button-caozuoxougai caozuoxiangqeng" @click="handleDelete01(scope.row)"
                                v-if="scope.row.cbie10 == 0 | scope.row.cbie10 == ' '"
                                v-hasPermi="['system:swJsStorea:remove']">删除</el-button>
                            <el-button size="mini" type="text" icon="el-icon-share" class="caozuoxiangqeng"
                                @click="handleAuthRole(scope.row)" v-if="scope.row.cbie10 == 4 | scope.row.cbie10 == 1"
                                v-hasPermi="['system:swJsStorea:detail']">详情
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                                @click="PurchaseinboundShenpi(scope.row)" v-hasPermi="['system:swJsStorea:sh']"
                                v-if="scope.row.cbie10 == 0">审核</el-button>
                            <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                                @click="PurchaseinboundFanShenpi(scope.row)" v-hasPermi="['system:swJsStorea:fs']"
                                v-if="scope.row.cbie10 == 1">反审</el-button>
                            <!-- <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                                @click="PurchaseinboundQuxiaoWangcheng(scope.row)"
                                v-hasPermi="['system:user:listselect']" v-if="scope.row.cbie10 == 4">取消完成</el-button>
                            <el-button size="mini" type="text" icon="el-icon-s-order" class="caozuoxiangqeng"
                                @click="PurchaseinboundBiaojiWancheng(scope.row)"
                                v-hasPermi="['system:user:listselect']"
                                v-if="scope.row.cbie10 == 1 | scope.row.cbie10 == 1">标记完成</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[10, 15, 20, 50, 500]"
                    class="pagintotal" />
            </el-col>
        </el-row>

        <!--修改-->
        <!-- <el-dialog :visible.sync="open">
            <div style="margin-top:-30px;">
                <span style="font-size:20px;">库存明细初始化</span>
                <hr />
            </div>
            <el-form ref="form" :model="form" label-width="30%" style="margin-left:-15%;margin-top:3%;">
                <el-row>
                    <el-col style="margin-top:1%;">
                        <el-form-item label="编号:" prop="cbie07">
                            <el-input v-model="form.cbie07" maxlength="30" style="width:50%" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="margin-top:1%;">
                         <el-form-item label="仓库:" prop="cbwa09">
                            <el-popover placement="bottom-start" trigger="click">
                                <kuweixxweihu ref="kuweixxweihu" @selected="selected04" style="width:320px;" />
                                <el-select slot="reference" v-model="form.cbwa09" placeholder="" readonly
                                    style=" width: 50%;">
                                </el-select>
                            </el-popover>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="false">
                    <el-form-item label="仓库id:" prop="cbie09">
                            <el-input v-model="form.cbie09" placeholder="" maxlength="30" style="width:50%" />
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
                <el-button @click="cancells">取 消</el-button>
            </div>
        </el-dialog> -->

        <!-- 用户导入对话框 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <div class="el-upload__tip" slot="tip">
                        <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>
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
</template>
<script>
// import { addUserSysPurchaseinbound, listUserPurchaseinbound, updateUserPurchaseinbound, removeSysPurchaseinbound, henUserSysPurchaseinbound, listUserGongyinShangs, listUserShangPxxweihus, listUserKuweisKus, listUsercangkuStore } from "@/api/Warehousemanagement/PurchaseWarehousing";
// import { PurchaseinboundAdd, PurchaseinboundList, PurchaseinboundEdit, PurchaseinboundRemove, PurchaseinboundSH, PurchaseinboundShs, Purchaseinbounds, PurchaseinboundShss, SupplierList, GoodsList, StoreList, StoreSkuList, PurchaseinboundLists } from "@/api/Warehousemanagement/PurchaseWarehousing";
import { QualityinAdd, PurchaseinboundList, PurchaseinboundRemove, PurchaseinboundSH, PurchaseinboundShs, Purchaseinbounds, PurchaseinboundShss, SupplierList, GoodsList, StoreList, StoreSkuList, PurchaseinboundLists } from "@/api/Warehousemanagement/BarcodeInventorydetails";
import * as req from "@/api/Warehousemanagement/BarcodeInventorydetails";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

export default {
    name: "BarcodeInventorydetails",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
    components: { Treeselect, kuweixxweihu, supplierMaintenance },
    data() {
        return {
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
            // 日期范围
            dateRange: [],
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
                spuplierName: '翰合供应链公司',
                skuName: 'gwqww',
                brand: '华为',
                type: '条码管理',
                model: 'jwe',
                isQualified: '合格',
                orderType: '国内订单',
                scanStatus: '已扫码',
                warehusingStatus: '待入库'
                // name:'翰合供应链公司'
            },
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
                value: '1',
                label: 'CNY'
            }, {
                value: '2',
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
                cbsa10: ""
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
                headers: { Authorization: "Bearer " + getToken() },
                // 上传的地址/dev-api/stage-api/system/Warehousedetailsinitialize/importSwJsGoods
                url: process.env.VUE_APP_BASE_API + "/system/Warehousedetailsinitialize/importSwJsGoods"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 15,
                page: 1,
                size: 15,
                total: this.total,
                cbie07: undefined,
                cbwa09: undefined,
                daterange: undefined
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
                num: [
                    { required: true, message: "数据不能为空!", trigger: "blur" }
                ],
                price: [
                    { required: true, message: "单价不能为空!", trigger: "blur" }
                ],
                totalPrice: [
                    { required: true, message: "金额不能为空!", trigger: "blur" }
                ]
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

        this.getConfigKey("sys.user.initPassword").then(response => {
            // this.initPassword = response.msg;
        });
        this.getDicts("sw_js_store_type").then(response => {
            this.form.type = response.rows;
        });
        // this.form.type = this.dict[0].label;
        // this.userList.housingTime.substring(0, this.userList.housingTime.indexOf("T"));
        // console.log(this.userList,123456789);
        this.chen();
    },
    methods: {

        //列表表头设置
        headClassac() {
            return {
                'text-align': 'left',
                height: '30px',
                padding: '0'
            }
        },
        chen() {
            this.form2.cbsa10 = this.form2.cbsa07 * this.form2.cbsa09;
        },
        //仓库
        selected01(name) {
            console.log(name, 123)
            console.log(name.substring(name.indexOf("-") + 1), 963);
            this.form2.cbpc100 = name.substring(0, name.indexOf("-"))
            this.form2.cbpc10 = name.substring(name.indexOf("-") + 1)
            // this.form2.icon = name;
        },
        //供应商
        selected02(name) {
            console.log(name, 123)
            console.log(name.substring(name.indexOf("-") + 1), 963);
            this.form2.cbpc099 = name.substring(0, name.indexOf("-"))
            this.form2.cbpc09 = name.substring(name.indexOf("-") + 1)
            // this.form2.icon = name;
        },

        //修改模块-仓库
        selected04(name) {
            console.log(name, 123)
            console.log(name.substring(name.indexOf("-") + 1), 963);
            this.form.cbwa09 = name.substring(0, name.indexOf("-"));
            this.form.cbie09 = name.substring(name.indexOf("-") + 1)
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

        /** 查询用户列表 */
        getList() {
            this.loading = true;
            PurchaseinboundList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                // //供应商
                // this.postOptions = response.data.content;
                // console.log(this.userList, 3369);
                console.log(response, 339688);
                // this.deleteFlag = response.data.rows.deleteFlag;
                this.loading = false;
            }
            );
        },

        /** 详情列表 */
        // getList05() {
        //     this.loading = true;
        //     PurchaseinboundLists(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        //         this.userList = response.data.rows;
        //         this.total = response.data.total;
        //         console.log(response, 3396888952);
        //         this.loading = false;
        //     }
        //     );
        // },
        //供应商
        getList01() {
            SupplierList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.postOptions = response.data.rows;
                // console.log(response.data.rows,551100);
            });
        },
        //库位
        getList02() {
            StoreList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.KuWeiOptions = response.data.rows;
                // console.log(response.data.rows,663322);
            });
        },

        //商品信息维护
        getList03() {
            GoodsList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.shangponOptions = response.data.rows;
                this.XinghaoOptions = response.data.rows;
                this.ponpaixenghaomiaoshu = response.data.rows;
                // console.log(response.data.rows, 1655);
            });
        },
        //仓库信息维护
        getList04() {
            StoreSkuList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.postCangKu = response.data.rows;
                // this.XinghaoOptions = response.data.rows;
                // console.log(response.data.rows, 1655);
            });
        },

        // /** 查询部门下拉树结构 */
        // getTreeselect() {
        //     treeselectt().then(response => {
        //         response.data.forEach((res) => {
        //             res.code = res.label ? res.label.substring(res.label.indexOf("-") + 1) : ""
        //             res.label = res.label ? res.label.substring(0, res.label.indexOf("-")) : ""
        //             if (res.children) {
        //                 res.children.forEach((i) => {
        //                     i.code = i.label ? i.label.substring(i.label.indexOf("-") + 1) : ""
        //                     i.label = i.label ? i.label.substring(0, i.label.indexOf("-")) : ""
        //                 })
        //             }
        //         })
        //         this.deptOptions = response.data;
        //         // this.deptOptions = response.data[0].label.substring(0, response.data[0].label.indexOf("-"));
        //         // console.log(response.data[response.data.length].label.substring(0, response.data[response.data.length].label.indexOf("-")),123456789);
        //         // console.log(response.data.label);
        //         // console.log(JSON.stringify(Object.assign({}, response.data)));
        //         // var j = JSON.stringify(Object.assign({}, response.data))
        //         // for(var key in j)
        //         // {
        //         //   //  alert();
        //         //   // console.log(key);
        //         // }
        //         // console.log(response);
        //         // console.log(response.data);
        //     });
        // },
        // 筛选节点
        // filterNode(value, data) {
        //
        //   if (!value) return true;
        //   alert("ddd");
        //   return data.indexOf(value) !== -1;
        // },
        // 节点单击事件
        // handleNodeClick(data) {
        //     // console.log(data)
        //     // this.queryParams.deptId = data.id;
        //     // console.log(data.label,88888);
        //     // const v1=data.label.substring(0, data.label.indexOf("-"));
        //     this.form.classifyNum = "";
        //     for (let i = 0; i < (data.code.split("-")).length - 1; i++) {
        //         if (i != 0) {
        //             this.form.classifyNum += ("-" + (data.code.split("-"))[i])
        //         } else {
        //             this.form.classifyNum += (data.code.split("-"))[i]
        //         }
        //     }
        //     // this.form.classifyNum =  data.code ? data.code.substring(0,data.code.indexOf("-") ):""//data.label.substring(v1.length+1, data.label.length);
        //     this.form.classifyName = data.label
        //     this.form.id = (data.code.split("-"))[data.code.split("-").length - 1]
        //     // console.log(data.code ? data.code.substring(data.code.indexOf("-") + 1) : "");
        //     this.handleQuery();
        // },
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
                classifyNum: undefined
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
                type: undefined
            };
            this.resetForm("form2");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            // var neirong = $('#miaoshu').val();


            this.queryParams.pageNum = 1;
            this.getList();
            // this.getList();
            //  this.queryParams.pageNum = this.form.classifyName;
            // this.getList();

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
            this.idss = selection.map(item => item.cbie07);
            this.shenpiids = selection;
            this.single = selection.length != 1;
            this.multiple = !selection.length;
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
            this.$modal.confirm('是否要审批,编号为"' + row.cbie07 + '"的数据项？').then(() => {
                console.log(row.cbpc01, 8888);
                PurchaseinboundSH(row).then(response => {

                    if (response.code == "200") {
                        // console.log(this.form.cbpc01, 789)
                        // this.submitShangpin();
                        this.getList();
                        // this.open = false;
                        this.$message({ message: response.msg, type: 'success' });
                    } else {
                        // this.$message({ message: response.msg, type: 'error' });
                    }


                });
            }).catch(() => { });
        },
        //审批上面内容
        PurchaseinboundShenpi01(row) {
            console.log(row, 777777);
            this.$modal.confirm('是否要审批,编号为"' + this.idss + '"的数据项？').then(() => {
                let userIds = this.shenpiids.length > 0 ? this.shenpiids : row
                // console.log(row.cbpc01, 8888);

                userIds.forEach((item) => {
                    req.PurchaseinboundSH(item).then((res) => {

                        if (res.code == "200") {
                            this.getList();
                            this.$modal.msgSuccess(res.msg);
                        } else {
                            // this.$message({ message: res.msg, type: 'error' });
                        }

                    }).catch((e) => {
                        // console.log(e, 456)
                    })
                });
            }).catch(() => { });
        },
        //反审
        PurchaseinboundFanShenpi(row) {
            this.$modal.confirm('是否要反审,编号为"' + row.cbie07 + '"的数据项？').then(() => {
                // console.log(row.cbpc01, 8888);

                PurchaseinboundShs(row).then(response => {
                    if (response.code == "200") {
                        this.getList();
                        // this.open = false;
                        this.$message({ message: response.msg, type: 'success' });
                    } else {
                        // this.$message({ message: response.msg, type: 'error' });
                    }

                });
            }).catch(() => { });
        },

        //反审上面的
        PurchaseinboundFanShenpi01(row) {
            this.$modal.confirm('是否要反审,编写为"' + this.idss + '"的数据项？').then(() => {
                let userIds = this.shenpiids.length > 0 ? this.shenpiids : row
                // console.log(row.cbpc01, 8888);

                userIds.forEach((item) => {
                    req.PurchaseinboundShs(item).then((res) => {

                        if (res.code == "200") {
                            // console.log(res, 123)
                            this.getList();
                            this.$modal.msgSuccess(res.msg);
                        } else {
                            // this.$message({ message: res.msg, type: 'error' });
                        }
                    }).catch((e) => {
                        // console.log(e, 456)
                    })
                });
            }).catch(() => { });
        },


        //标记完成
        PurchaseinboundBiaojiWancheng(row) {
            // console.log(row.cbpc01, 8888);

            PurchaseinboundShss(row).then(response => {
                if (response.code == "200") {
                    console.log(this.form.cbpc01, 789)
                    // this.submitShangpin();
                    this.getList();
                    // this.open = false;
                    this.$message({ message: response.msg, type: 'success' });
                } else {
                    // this.$message({ message: response.msg, type: 'error' });
                }

            });
        },

        //标记完成上面的按钮
        PurchaseinboundBiaojiWancheng01(row) {
            let userIds = this.shenpiids.length > 0 ? this.shenpiids : row
            // console.log(row.cbpc01, 8888);

            userIds.forEach((item) => {
                req.PurchaseinboundShss(item).then((res) => {
                    if (res.code == "200") {
                        // console.log(res, 123)
                        this.getList();
                        this.$modal.msgSuccess(res.msg);
                    } else {
                        // this.$message({ message: res.msg, type: 'error' });
                    }
                }).catch((e) => {
                    // console.log(e, 456)
                })
            })
        },
        //取消标记
        PurchaseinboundQuxiaoWangcheng(row) {
            this.$modal.confirm('是否要取消标记,编号为"' + row.cbie07 + '"的数据项？').then(() => {
                Purchaseinbounds(row).then(response => {
                    if (response.code == "200") {
                        console.log(this.form.cbpc01, 789);
                        this.getList();
                        this.$message({ message: response.msg, type: 'success' });
                    } else {
                        // this.$message({ message: response.msg, type: 'error' });
                    }
                });
            }).catch(() => { });
        },
        //取消标记上面的
        PurchaseinboundQuxiaoWangcheng01(row) {
            this.$modal.confirm('是否要取消标记,编号为"' + row.cbie07 + '"的数据项？').then(() => {
                let userIds = this.shenpiids.length > 0 ? this.shenpiids : row
                // console.log(row.cbpc01, 8888);

                userIds.forEach((item) => {
                    req.Purchaseinbounds(item).then((res) => {
                        if (res.code == "200") {
                            // console.log(res, 123)
                            this.getList();
                            this.$modal.msgSuccess(res.msg);
                        } else {
                            // this.$message({ message: res.msg, type: 'error' });
                        }

                    }).catch((e) => {
                        // console.log(e, 456)
                    })
                });

            }).catch(() => { });
        },

        /** 修改按钮操作 */
        handleUpdate() {

            let row = {}
            row.cbie07 = this.form.cbie07;
            row.cbie09 = this.form.cbie09;
            // console.log(this.form.id);
            PurchaseinboundEdit(JSON.stringify(row)).then(response => {
                if (response.code == "200") {
                    // console.log(this.form, 789)
                    this.getList();
                    this.open = false;
                    this.$message({ message: response.msg, type: 'success' });

                } else {
                    // this.$message({ message: response.msg, type: 'error' });
                }

            });
        },
        // /** 修改详情按钮操作**/
        // handlexiangqengSelect(row) {
        //     console.log(row)
        //     this.open = true;
        //     // console.log(row, 7788521);
        //     this.form = row;
        // },
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
            QualityinAdd(this.form2).then(response => {

                if (response.code == "200") {
                    // console.log(response.posts, 12345678);
                    this.$message({ message: response.msg, type: 'success', style: 'color:red;!important' });
                    // this.getTreeselect();
                    // this.submitShangpin();
                    this.submitShangpin();
                    this.getList();
                    this.open2 = false;
                    this.reset01();
                } else {
                    // this.$message({ message: response.msg, type: 'error' });
                }
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
                inputErrorMessage: "用户密码长度必须介于 5 和 20 之间"
            }).then(({ value }) => {
                resetUserPwd(row.userId, value).then(response => {
                    this.$modal.msgSuccess("修改成功，新密码是：" + value);
                });
            }).catch(() => { });
        },
        /** 分配角色操作 */
        handleAuthRole: function (row) {
            // const userId = row.cbie01;
            // this.$router.push("/system/user-authhhhhhh/role/" + userId);

            let cbie01 = row.cbie01;
            console.log(cbie01, 1234);
            // let status = row.cbie10;
            // consoel.log(row,2222);
            this.$router.push("/system/user-authhhhhhh/role/" + cbie01);
        },

        /** 创建操作 */
        handlekucunone: function (row) {
            // this.$router.push("/system/user-auth/role/");
            this.$router.push("/system/user-kcmx/role/");
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
            let userIds = this.ids.length > 0 ? this.ids : row
            this.$modal.confirm('是否确认删除,编号为"' + JSON.stringify(this.idss) + '"的数据项？').then(() => {
                userIds.forEach((item) => {
                    req.PurchaseinboundRemove(JSON.stringify(item)).then((res) => {

                        if (res.code == "200") {
                            // console.log(res, 123)
                            this.submitShangpin();
                            this.getList();
                            this.$modal.msgSuccess(res.msg);
                        } else {
                            // this.$message({ message: res.msg, type: 'error' });
                        }

                    }).catch((e) => {
                        // console.log(e, 456)
                    })
                })
            }).catch(() => { });
        },

        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/Purchaseinbound/SwJsGoodsexport', {
                ...this.queryParams
            }, `user_${new Date().getTime()}.xlsx`)
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
            this.$modal.confirm('是否确认删除,编号为"' + row.cbie07 + '"的数据项？').then(function () {
                return PurchaseinboundRemove(JSON.stringify(row));
            }).then((response) => {
                if (response.code == "200") {
                    this.submitShangpin();
                    this.getList();
                    this.$modal.msgSuccess(response.msg);
                } else {
                    // this.$message({ message: response.msg, type: 'error' });
                }

            }).catch(() => { });
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
            this.upload.title = "库存初始化";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('/system/Warehousedetailsinitialize/importTemplate', {
            }, `库存明细初始化模板_${new Date().getTime()}.xlsx`)
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

        //测试树状菜单
        // handleNodeClick(data) {
        //   console.log(data);
        // }
    }
};
</script>

<style src="./BarcodeInventorycss/index.css" scoped>

</style>
<style lang="scss" scoped>
.tooltup{
    width:100%;
    display: flex;
    flex-direction: column;
    height: calc(93vh - 85px);
    padding: 0 !important;
    margin: 0;
}
::v-deep .pagination-container .el-pagination {
    position: inherit;
}
.pagintotal{
    flex-grow: 0;
    text-align: right;
    height:auto;
    padding:20px 0 0 !important;
    margin:0;
}
</style>
