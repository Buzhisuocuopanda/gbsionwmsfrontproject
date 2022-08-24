<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--用户数据-->
            <el-col :span="20" :xs="24" style="width:100%;">
                <!-- 表头内容  -->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="68px" style="margin-left:2%;">
                    <el-form-item prop="cbsa08">
                        <el-input v-model="queryParams.cbsa08" id="miaoshu" placeholder="请输入公司名称" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" class="biaoto-buttonchaxuen" @click="handleQuery">查询</el-button>
                        <el-button size="mini" class="biaoto-buttonchuangjian" @click="handlechuangjiang">创建</el-button>

                        <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple" @click="handleDelete"
                            v-hasPermi="['system:user:remove']">删除
                        </el-button>

                        <el-button plain size="mini" class="biaoto-buttondaoru" @click="handleImport"
                            v-hasPermi="['system:user:import']">导入</el-button>
                        <el-button plain size="mini" class="biaoto-buttondaochu" @click="handleExport"
                            v-hasPermi="['system:user:export']">导出</el-button>
                    </el-form-item>
                </el-form>

                <el-table :max-height="maxheight"  border :header-cell-style="headClassSPM" v-loading="loading" height="480" :data="userList"
                    :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="公司名称" align="left" key="cbsa08" prop="cbsa08" sortable />
                    <el-table-column label="公司地址" align="left" key="cbsa13" prop="cbsa13" locationNum />
                    <el-table-column label="联系人" align="left" key="cbsa14" prop="cbsa14" sortable />
                    <el-table-column label="联系电话" align="left" key="cbsa15" prop="cbsa15" sortable />
                    <el-table-column label="发票类型" align="left" key="cbsa18" prop="cbsa18" sortable>
                        <template scope="scope">
                            <div>{{ scope.row.cbsa18 == 1 ? "增值税专用发票" : scope.row.cbsa18 == 2 ?
                            "增值税普通发票" : scope.row.cbsa18 == 3 ?
                            "个人普通发票" : scope.row.cbsa18 == 4 ? "不开发票" : "发票类型不确定"
                            }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center" key="cbsa07" prop="cbsa07" sortable>
                        <!-- <template scope="scope">
                            <div>{{ scope.row.ifEnabled == -1 ? "启用" : scope.row.ifEnabled == 1 ? "禁用" : "状态不确定" }}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-edit" class="button-caozuoxougai"
                                @click="handlexiangqengSelect(scope.row)" v-hasPermi="['system:user:edit']">修改
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" class="button-caozuoxougai"
                                @click="handleDelete01(scope.row)" v-hasPermi="['system:user:remove']">删除</el-button>
                            <el-button size="mini" type="text" icon="el-icon-share" class="caozuoxiangqeng"
                                @click="handleSelect(scope.row)" v-hasPermi="['system:user:listselect']">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[2, 5, 10, 15, 20]"
                    class="pagintotal" />
            </el-col>
        </el-row>

        <!-- 修改用户配置对话框 -->
        <el-dialog :title="title" :visible.sync="open"  class="abow_dialogg">
            <!-- <div style="margin-top:-4%;font-weight: 900;font-size: 20px; color: black;">供应商信息维护</div> -->
            <!-- <hr /> -->
            <el-form ref="form" :model="form" label-width="25%" lable-height="20%" class="chuangjianform">
                <div style="margin-top:3%;">
                    <el-row>
                        <el-col>
                            <el-form-item label="公司名称:" prop="cbsa08">
                                <el-input v-model="form.cbsa08" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="联系人:" prop="cbsa14">
                                <el-input v-model="form.cbsa14" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="公司地址:" prop="cbsa13">
                                <el-input v-model="form.cbsa13" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="联系电话:" prop="cbsa15">
                                <el-input v-model="form.cbsa15" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="出库顺序:" prop="cbsa09">
                                <el-input v-model="form.cbsa09" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票账号:" prop="cbsa10">
                                <el-input v-model="form.cbsa10" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="发票地址:" prop="cbsa11">
                                <el-input v-model="form.cbsa11" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票电话:" prop="cbsa12">
                                <el-input v-model="form.cbsa12" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="发票类型:" prop="cbsa18">
                                <!-- <el-input v-model="form2.invoiceType" placeholder="请输入发票类型" maxlength="30" /> -->
                                <el-select v-model="form.cbsa18" placeholder="" style="width:70%;">
                                    <el-option v-for="item in fapiaoleix" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票开户行:" prop="cbsa16">
                                <el-input v-model="form.cbsa16" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="纳税人识别号:" prop="cbsa17">
                                <el-input v-model="form.cbsa17" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="状态:" prop="cbsa07">
                                <!-- <el-input v-model="form2.ifEnabled" placeholder="请输入状态" maxlength="30" /> -->
                                <el-select v-model="form.cbsa07" placeholder="" style="width:70%;">
                                    <el-option v-for="item in ZhuangTaivalue" :key="item.label" :label="item.label"
                                        :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="GongyingShangjiaoyan">
                            <el-form-item>
                                <el-button type="primary" @click="handleUpdate">确定</el-button>
                                <el-button @click="cancel01">取 消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
            </div>
        </el-dialog>

        <!-- 详情 -->
        <el-dialog :title="title" :visible.sync="open1"  class="abow_dialogg">
            <!-- <div style="margin-top:-4%;font-weight: 900;font-size: 20px; color: black;">供应商信息维护</div> -->
            <!-- <hr /> -->
            <el-form ref="form1" :model="form1" label-width="25%" lable-height="20%" class="chuangjianform">
                <div style="margin-top:3%;">
                    <el-row>
                        <el-col>
                            <el-form-item label="公司名称:" prop="cbsa08">
                                <el-input v-model="form1.cbsa08" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="联系人:" prop="cbsa14">
                                <el-input v-model="form1.cbsa14" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="公司地址:" prop="cbsa13">
                                <el-input v-model="form1.cbsa13" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="联系电话:" prop="cbsa15">
                                <el-input v-model="form1.cbsa15" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="出库顺序:" prop="cbsa09">
                                <el-input v-model="form1.cbsa09" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票账号:" prop="cbsa10">
                                <el-input v-model="form1.cbsa10" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="发票地址:" prop="cbsa11">
                                <el-input v-model="form1.cbsa11" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票电话:" prop="cbsa12">
                                <el-input v-model="form1.cbsa12" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="发票类型:" prop="cbsa18">
                                <!-- <el-input v-model="form2.invoiceType" placeholder="请输入发票类型" maxlength="30" /> -->
                                <el-select v-model="form1.cbsa18" placeholder="" style="width:70%;">
                                    <el-option v-for="item in fapiaoleix" :key="item.label" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票开户行:" prop="cbsa16">
                                <el-input v-model="form1.cbsa16" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="纳税人识别号:" prop="cbsa17">
                                <el-input v-model="form1.cbsa17" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="状态:" prop="cbsa07">
                                <!-- <el-input v-model="form2.ifEnabled" placeholder="请输入状态" maxlength="30" /> -->
                                <el-select v-model="form1.cbsa07" placeholder="" style="width:70%;">
                                    <el-option v-for="item in ZhuangTaivalue" :key="item.label" :label="item.label"
                                        :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="handleUpdate">确定</el-button> -->
                <!-- <el-button @click="cancel">取 消</el-button> -->
            </div>
        </el-dialog>

        <!-- 创建 -->
        <el-dialog :title="title" :visible.sync="open2"  class="abow_dialogg">
            <!-- <div style="margin-top:-4%;font-weight: 900;font-size: 20px; color: black;">供应商信息维护</div> -->
            <!-- <hr /> -->
            <el-form ref="form2" :model="form2" label-width="25%" :rules="rules"
                class="chuangjianform">
                <div style="margin-top:3%;">
                    <el-row>
                        <el-col>
                            <el-form-item label="公司名称:" prop="cbsa08">
                                <el-input v-model="form2.cbsa08" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="联系人:" prop="cbsa14">
                                <el-input v-model="form2.cbsa14" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="公司地址:" prop="cbsa13">
                                <el-input v-model="form2.cbsa13" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="联系电话:" prop="cbsa15">
                                <el-input v-model="form2.cbsa15" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="出库顺序:" prop="cbsa09">
                                <el-input v-model="form2.cbsa09" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票账号:" prop="cbsa10">
                                <el-input v-model="form2.cbsa10" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="发票地址:" prop="cbsa11">
                                <el-input v-model="form2.cbsa11" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票电话:" prop="cbsa12">
                                <el-input v-model="form2.cbsa12" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="发票类型:" prop="cbsa18">
                                <!-- <el-input v-model="form2.invoiceType" placeholder="请输入发票类型" maxlength="30" /> -->
                                <el-select v-model="form2.cbsa18" placeholder="" style="width:70%;">
                                    <el-option v-for="item in fapiaoleix" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="发票开户行:" prop="cbsa16">
                                <el-input v-model="form2.cbsa16" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="纳税人识别号:" prop="cbsa17">
                                <el-input v-model="form2.cbsa17" placeholder="" maxlength="30" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="状态:" prop="cbsa07">
                                <!-- <el-input v-model="form2.ifEnabled" placeholder="请输入状态" maxlength="30" /> -->
                                <el-select v-model="form2.cbsa07" placeholder="" style="width:70%;">
                                    <el-option v-for="item in ZhuangTaivalue" :key="item.label" :label="item.label"
                                        :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="GongyingShangjiaoyan">
                            <el-form-item>
                                <el-button type="primary" @click="handleAdd">确定</el-button>
                                <el-button @click="cancel">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">

                <!-- <el-button @click="cancel">取 消</el-button> -->
            </div>
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
        <el-dialog :title="title6" :visible.sync="open6">
            <!-- startprint-->
            <!-- <div id="printContent">打印内容</div> -->
            <!--endprint -->
            <div ref="print">我是打印哈哈哈</div>

        </el-dialog>
    </div>
</template>
<script>
// import { addUserSysSupplier, listUserSupplier, updateUserSupplier, removeSysSupplier } from "@/api/WareSys/gongyingshangxxweihu";

import { SupplierAdd, SupplierList, SupplieRedit, SupplierRemove } from "@/api/Basicinformationmaintenance/SupplierMaintenance/index";
import * as req from "@/api/Basicinformationmaintenance/SupplierMaintenance/index";

import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "store",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
    components: { Treeselect },
    data() {
        
        const phoneValidator11 = (rule, value, callback) => {
            if (/^1[3456789]\d{9}$/.test(value)) { // 利用正则表达式校验手机号
                callback()
            } else {
                callback(new Error('请输入正确手机号'))
            }
        }
        return {
             maxheight: window.innerHeight - 50,
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            idss: {},
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
            title1: "",
            title2: "",
            title6: "",
            // 部门树选项
            deptOptions: undefined,
            // 是否显示弹出层
            open: false,
            open1: false,
            open2: false,
            open6: false,
            // 部门名称
            deptName: undefined,
            // 默认密码
            initPassword: undefined,
            // 日期范围
            dateRange: [],
            // 岗位选项
            postOptions: [],
            //供应商信息维护
            gongyingshangxxweihuleix: {
                invoiceType: '1',
                ifEnabled: '-1'

            },
            //仓库类型
            CangkuLeixvalue: [{
                value: '1',
                label: '普通仓库'
            }, {
                value: '2',
                label: 'CDC仓库'
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
            value: '',
            // 角色选项
            roleOptions: [],
            // 表单参数
            form: {
                cbsa07: "",
                cbsa08: "",
                cbsa09: "",
                cbsa10: "",
                cbsa11: "",
                cbsa12: "",
                cbsa13: "",
                cbsa14: "",
                cbsa15: "",
                cbsa16: "",
                cbsa17: "",
                cbsa18: ""
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
                cbsa07: "",
                cbsa08: "",
                cbsa09: "",
                cbsa10: "",
                cbsa11: "",
                cbsa12: "",
                cbsa13: "",
                cbsa14: "",
                cbsa15: "",
                cbsa16: "",
                cbsa17: "",
                cbsa18: ""
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
                // 上传的地址
                url: process.env.VUE_APP_BASE_API + "/system/supplier/importSwJsSupplier"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                cbsa08: undefined,
                address: undefined
            },
            // 列信息
            //  columns: [
            //   {
            //     title:'状态',
            //     dataIndex:'ifEnabled',
            //     scopedSlots: { customRender: 'ifEnabled' }
            //   }
            // ],

            // 手机号校验器

            //表单校验
            rules: {
                cbsa08: [
                    { required: true, message: "公司名称不能为空!", trigger: "blur" }
                ],
                cbsa14: [
                    { required: true, message: "联系人不能为空!", trigger: "blur" }
                ],
                cbsa13: [
                    { required: true, message: "公司地址不能为空!", trigger: "blur" }
                ],
                cbsa15: [
                    { required: true, message: "联系电话不能为空!", trigger: "blur" },
                    { validator: phoneValidator11, trigger: 'blur' }
                ],
                cbsa09: [
                    { required: true, message: "出库顺序不能为空!", trigger: "blur" }
                ],
                cbsa11: [
                    { required: true, message: "发票地址不能为空!", trigger: "blur" }
                ],
                cbsa10: [
                    { required: true, message: "发票账号不能为空!", trigger: "blur" }
                ],
                cbsa12: [
                    { required: true, message: "发票电话不能为空!", trigger: "blur" },
                    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
                ],
                cbsa18: [
                    { required: true, message: "发票类型不能为空!", trigger: "blur" }
                ],
                cbsa16: [
                    { required: true, message: "发票开户行不能为空!", trigger: "blur" }
                ],
                cbsa17: [
                    { required: true, message: "纳税人识别号不能为空!", trigger: "blur" }
                ],
                cbsa07: [
                    { required: true, message: "状态不能为空!", trigger: "blur" }
                ]
            },

        };
    },
    watch: {
        // 根据名称筛选部门树
        deptName(val) {
            this.$refs.tree.filter(val);
        }
    },
    created() {
        this.getList();
        this.getConfigKey("sys.user.initPassword").then(response => {
            // this.initPassword = response.msg;
        });
        this.getDicts("sw_js_store_type").then(response => {
            this.form.type = response.rows;
        });
        // this.form.type = this.dict[0].label;
    },
    methods: {

        // submitForm() {
        //     return new Promise((resole, reject) => {
        //         this.$refs['form2'].validate((valid) => {
        //             if (valid) {
        //                 console.log('submit!');
        //                 resole(this.form2);
        //             } else {
        //                 console.log('error submit!!');
        //                 reject();
        //             }
        //         })
        //     })
        // },
     //列表表头设置
      headClassSPM() {
        return {
          'text-align': 'left',
          height: '30px',
          padding: '0'
        }
      },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            SupplierList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                console.log(response.data.rows, 3369);
                // console.log(response.data.content, 339688);
                this.deleteFlag = response.data.rows.deleteFlag;
                this.loading = false;
            }
            );
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
            this.reset01();
        },
        cancel01() {
            this.open = false;

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
                cbsa07: undefined,
                cbsa08: undefined,
                cbsa09: undefined,
                cbsa10: undefined,
                cbsa11: undefined,
                cbsa12: undefined,
                cbsa13: undefined,
                cbsa14: undefined,
                cbsa15: undefined,
                cbsa16: undefined,
                cbsa17: undefined,
                cbsa18: undefined
            };
            this.resetForm("form2");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            // var neirong = $('#miaoshu').val();
           
           
            this.queryParams.pageNum = 1;
            this.getList();
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
            this.idss = selection.map(item => item.cbsa01);
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
        /** 新增按钮操作 */
        handleAdd() {
            this.$refs["form2"].validate((item) => {
                if (item) {
                    // alert("可以提交");
                    SupplierAdd(this.form2).then(response => {
                        // console.log(this.from.parent_id, 123456789);
                        // this.classifyId = response.posts;
                        // console.log(response.posts,123456);
                        this.$message({ message: '恭喜你，添加成功', type: 'success', style: 'color:red;!important' });
                        // this.getTreeselect();
                        // this.submitShangpin();
                        this.submitShangpin();
                        this.getList();
                        this.open2 = false;
                        this.reset01();
                    });
                } else {
                    // alert("不可提交");
                    this.$message.error('请注意规范');
                }
            })


            // this.submitForm();
            // if (this.form2.name != null || this.form2.address != undefined || this.form2.telPeople != undefined) {
            //     // console.log(this.form.id, 123456);

            //     addUserSysSupplier(this.form2).then(response => {
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

            // this.reset();
            // } else {
            //   this.$message.error('错了哦，商品名称没有填呢');
            // }

        },
        handlechuangjiang() {

            this.open2 = true;
        },
        /** 修改按钮操作 */
        handleUpdate() {
            if (this.form.cbsa08 != undefined) {
                let row = {}
                row.cbsa07 = this.form.cbsa07;
                row.cbsa08 = this.form.cbsa08;
                row.cbsa09 = this.form.cbsa09;
                row.cbsa10 = this.form.cbsa10;
                row.cbsa11 = this.form.cbsa11;
                row.cbsa12 = this.form.cbsa12;
                row.cbsa13 = this.form.cbsa13;
                row.cbsa14 = this.form.cbsa14;
                row.cbsa15 = this.form.cbsa15;
                row.cbsa16 = this.form.cbsa16;
                row.cbsa17 = this.form.cbsa17;
                row.cbsa18 = this.form.cbsa18;
                row.cbsa01 = this.form.cbsa01;
                // console.log(this.form.id);
                SupplieRedit(JSON.stringify(row)).then(response => {
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
                    console.log(this.form, 789)
                    // this.submitShangpin();
                    this.getList();
                    this.open = false;
                    this.$message({ message: '恭喜你，修改成功', type: 'success' });

                });

            } else {
                this.$message.error('错了哦，商品名称没有填呢');
            }

        },
        /** 详情按钮操作**/
        handleSelect(row) {
            this.open1 = true;
            this.form1.cbsa01 = row.cbsa01;
            this.form1.cbsa07 = row.cbsa07;
            this.form1.cbsa08 = row.cbsa08;
            this.form1.cbsa09 = row.cbsa09;
            this.form1.cbsa10 = row.cbsa10;
            this.form1.cbsa11 = row.cbsa11;
            this.form1.cbsa12 = row.cbsa12;
            this.form1.cbsa13 = row.cbsa13;
            this.form1.cbsa14 = row.cbsa14;
            this.form1.cbsa15 = row.cbsa15;
            this.form1.cbsa16 = row.cbsa16;
            this.form1.cbsa17 = row.cbsa17;
            this.form1.cbsa18 = row.cbsa18;
        },
        /** 修改详情按钮操作**/
        handlexiangqengSelect(row) {
            console.log(row)
            // this.getList();
            this.open = true;
            console.log(row, 7788521);
            this.form.cbsa01 = row.cbsa01;
            this.form.cbsa07 = row.cbsa07;
            this.form.cbsa08 = row.cbsa08;
            this.form.cbsa09 = row.cbsa09;
            this.form.cbsa10 = row.cbsa10;
            this.form.cbsa11 = row.cbsa11;
            this.form.cbsa12 = row.cbsa12;
            this.form.cbsa13 = row.cbsa13;
            this.form.cbsa14 = row.cbsa14;
            this.form.cbsa15 = row.cbsa15;
            this.form.cbsa16 = row.cbsa16;
            this.form.cbsa17 = row.cbsa17;
            this.form.cbsa18 = row.cbsa18;
        },
        /** 数形列表的商品分类按钮**/
        submitShangpin() {
            this.reset();
        },
        //列表刷新
        liebiaoshuax() {
            this.getList();
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
            const userId = row.userId;
            this.$router.push("/system/user-auth/role/" + userId);
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
        /** 删除按钮操作 */
        handleDelete(row) {
            this.userIds = {}
            let userIds = this.ids.length > 0 ? this.ids : row
            console.log(userIds, 123)
            console.log(typeof userIds)
            this.$modal.confirm('是否确认删除ID为"' + JSON.stringify(this.idss) + '"的数据项？').then(() => {
                userIds.forEach((item) => {
                    req.SupplierRemove(JSON.stringify(item)).then((res) => {
                        console.log(res, 123)
                        this.submitShangpin();
                        this.getList();
                        this.$modal.msgSuccess("删除成功");
                    }).catch((e) => {
                        console.log(e, 456)
                    })
                })
            }
            ).catch(() => { });



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
        this.$modal.confirm('是否确认删除ID为"' + row.cbsa01 + '"的数据项？').then(function () {
          return SupplierRemove(JSON.stringify(row));
        }).then((response) => {
          this.submitShangpin();
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => { });
      },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/supplier/SwJsSupplierexport', {
                ...this.queryParams
            }, `user_${new Date().getTime()}.xlsx`)
        },

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
            this.download('/system/supplier/SwJsSupplierimportTemplate', {
            }, `user_template_${new Date().getTime()}.xlsx`)
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
            this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
            this.getList();
        },
        // 提交上传文件
        submitFileForm() {
            this.$refs.upload.submit();
        },

        daoying() {
            // this.$print(this.$refs.print);
        }

        //测试树状菜单
        // handleNodeClick(data) {
        //   console.log(data);
        // }
    },mounted () {
    window.onresize = () => {
      return (() => {
          this.maxheight = window.innerHeight - 50
      })()
    }
  },
  activated () {
    this.maxheight = window.innerHeight - 50
},
};
</script>
<style src="./SupplierMaintenancecss/index.css">
</style>
