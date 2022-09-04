<template>
    <div class="app-container">
        <el-row :gutter="20" style="margin-left:-10%;">
            <!--用户数据-->
            <el-col class="tooltup" style="width:92%;">
                <!-- 表头内容  -->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="68px">
                    <el-form-item prop="cbwa09" label="仓库">
                        <el-input v-model="queryParams.cbwa09" id="miaoshu" placeholder="请输入仓库" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item prop="cbla09" label="库位码">
                        <el-input v-model="queryParams.cbla09" id="miaoshu" placeholder="请输入库位码" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" class="biaoto-buttonchaxuen" @click="handleQuery">查询</el-button>
                        <el-button size="mini" class="biaoto-buttonchuangjian" @click="handlexiangqengchuangjian">创建
                        </el-button>
                        <!-- <el-button type="danger" class="biaoto-buttonshanchu" @click="handleDelete">删除</el-button> -->

                        <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple" @click="handleDelete"
                            v-hasPermi="['system:user:remove']">删除
                        </el-button>

                        <el-button plain size="mini" class="biaoto-buttondaoru" @click="handleImport"
                            v-hasPermi="['system:user:import']">导入</el-button>
                        <el-button plain size="mini" class="biaoto-buttondaochu" @click="handleExport"
                            v-hasPermi="['system:user:export']">导出</el-button>
                    </el-form-item>
                </el-form>

                <el-table border :header-cell-style="headClassSM" v-loading="loading" height="470" :data="userList"
                    :default-sort="{ prop: 'name', order: 'descending' }"
                    style="width:100%;height: 8%;margin-left: -1.5%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="仓库" align="left" key="cbwa09" prop="cbwa09"></el-table-column>
                    <el-table-column label="库位码" align="left" key="cbla09" prop="cbla09" sortable />
                    <el-table-column label="库位容量" align="left" key="cbla11" prop="cbla11" locationNum />
                    <el-table-column label="库位顺序" align="left" key="cbla07" prop="cbla07" sortable />
                    <el-table-column label="优先型号" align="left" key="cbla12" prop="cbla12" sortable />
                    <el-table-column label="状态" align="left" key="cbla08" prop="cbla08" sortable />
                    <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                           
                            <el-button size="mini" type="text" icon="el-icon-edit" class="button-caozuoxougai"
                                @click="handlexiangqengSelect(scope.row)" v-hasPermi="['system:user:edit']">修改
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" class="button-caozuoxougai"
                                @click="handleDelete01(scope.row)" v-hasPermi="['system:user:remove']">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[2, 5, 10, 15, 20]"
                    class="pagintotal" />
            </el-col>
        </el-row>

        <!-- 修改用户配置对话框 -->

        <el-dialog :title="title1" :visible.sync="open" append-to-body style="width:70%;margin-left:15%;">
            <el-form ref="form" :model="form" :rules="rules" label-width="20%" class="chuangjianformstore">                
                 <el-row style="margin-top:3%;">
                   <el-col>
                       <el-form-item label="仓库:" prop="cbpc100">
                           <el-popover placement="bottom-start" trigger="click">
                               <kuweixxweihu ref="kuweixxweihu" @selected="selected02" />
                              <el-input slot="reference" v-model="form.cbpc100" placeholder="" 
                                style="width:77%;">
                              </el-input>
                           </el-popover>
                        </el-form-item>
                  </el-col>
                    <el-col>
                        <el-form-item label="库位码:" prop="cbla09">
                            <el-input v-model="form.cbla09" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="库位顺序:" prop="cbla07">
                            <el-input v-model="form.cbla07" placeholder="" maxlength="30"
                                style="width:77%;" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="库位容量:" prop="cbla11">
                            <el-input v-model="form.cbla11" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="优先型号:" prop="cbla12">
                            <el-input v-model="form.cbla12" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注:" prop="cbla13">
                            <el-input v-model="form.cbla13" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="状态:" prop="cbla08">
                            <!-- <el-input v-model="form.cbla08" placeholder="" style="width:77%;border:solid #eee thin;"
                                maxlength="30" /> -->
                            <el-select v-model="form.cbla08" placeholder="" style="width:77%;">
                                <el-option v-for="item in ZhuangTaivalue" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="false">
                        <el-form-item label="仓库id:" prop="cbla10">
                            <el-input v-model="form.cbla10" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">确定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 详情 -->
        <el-dialog :title="title2" :visible.sync="open1" append-to-body>
            <el-form ref="form1" :model="form1" label-width="30%">
                <el-row style="margin-top:3%;">
                     <el-col>
                        <el-form-item label="仓库:" prop="cbla09">
                            <el-input v-model="form1.cbla09" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="库位码:" prop="cbla09">
                            <el-input v-model="form1.cbla09" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="库位顺序:" prop="cbla07">
                            <el-input v-model="form1.cbla07" placeholder="" maxlength="30"
                                style="width:77%;" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="库位容量:" prop="cbla11">
                            <el-input v-model="form1.cbla11" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="优先型号:" prop="cbla10">
                            <el-input v-model="form1.cbla10" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注:" prop="cbla12">
                            <el-input v-model="form1.cbla12" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="状态:" prop="cbla08">
                            <!-- <el-input v-model="form.cbla08" placeholder="" style="width:77%;border:solid #eee thin;"
                                maxlength="30" /> -->
                            <el-select v-model="form1.cbla08" placeholder="" style="width:77%;">
                                <el-option v-for="item in ZhuangTaivalue" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="handleAdd">确 定</el-button> -->
                <!-- <el-button @click="cancells">取 消</el-button> -->
            </div>
        </el-dialog>

        <!-- 创建 -->
        <el-dialog :title="title" :visible.sync="open2" append-to-body style="width:70%;margin-left:15%;">
            <el-form ref="form2" :model="form2" :rules="rules2" label-width="20%" class="chuangjianformstore">
               
               <el-row style="margin-top:3%;">
                  <el-col>
                       <el-form-item label="仓库:" prop="cbpc100">
                           <el-popover placement="bottom-start" trigger="click">
                               <kuweixxweihu ref="kuweixxweihu" @selected="selected01" />
                              <el-input slot="reference" v-model="form2.cbpc100" placeholder="" 
                                style="width:77%;">
                              </el-input>
                           </el-popover>
                        </el-form-item>
                  </el-col>
                    <el-col>
                        <el-form-item label="库位码:" prop="cbla09">
                            <el-input v-model="form2.cbla09" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="库位顺序:" prop="cbla07">
                            <el-input v-model="form2.cbla07" placeholder="" maxlength="30"
                                style="width:77%;" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="库位容量:" prop="cbla11">
                            <el-input v-model="form2.cbla11" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="优先型号:" prop="cbla12">
                            <el-input v-model="form2.cbla12" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注:" prop="cbla13">
                            <el-input v-model="form2.cbla13" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="状态:" prop="cbla08">
                            <!-- <el-input v-model="form.cbla08" placeholder="" style="width:77%;border:solid #eee thin;"
                                maxlength="30" /> -->
                            <el-select v-model="form2.cbla08" placeholder="" style="width:77%;">
                                <el-option v-for="item in ZhuangTaivalue" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="false">
                        <el-form-item label="仓库id:" prop="cbla10">
                            <el-input v-model="form2.cbla10" placeholder="" style="width:77%;"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleAdd">确 定</el-button>
                <el-button @click="cancelone">取 消</el-button>
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
    </div>
</template>
<script>
// import { addUserSysStore, listUserStore, updateUserStore, removeSysStore } from "@/api/WareSys/Cangkuxxguanli";
// import { addUserSysStoreku, listUserStoreku, updateUserStoreku, removeSysStoreku, listUserStore } from "@/api/WareSys/Kuweixxweihu";

import { StoreAdd, StoreList, StoreEdit, StoreRemove } from "@/api/Basicinformationmaintenance/StoreMaintenance/index";
import * as req from "@/api/Basicinformationmaintenance/StoreMaintenance/index";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

// import kuweixxweihu from "@/components/kuweixxweihu";

//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";

import Vue from "vue";
export default {
    name: "store",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
    // components: { Treeselect, kuweixxweihu },
    components: { Treeselect,kuweixxweihu},
    data() {
        return {
            //库位信息维护
            // kwxxwh: kuweixxweihu,
            // 遮罩层
            loading: true,
            // 选中数组
            ids: {},
            idss: {},
            userIds: {},
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
            dateRange: [],
            // 岗位选项
            postOptions: [],
            //仓库信息
            postCangKu: [],

            kucuenmiongxichu: {
                spuplierName: '翰合供应链公司',
                skuName: 'gwqww',
                brand: '华为',
                type: '条码管理',
                model: 'jwe',
                isQualified: '合格',
                orderType: '国内订单',
                scanStatus: '启用',
                warehusingStatus: '仓库12363'
                // name:'翰合供应链公司'
            },

            //库位信息维护状态
            kuweixxweih: {
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

            //商品管理方式
            ShangponGuanliFangshi: [{
                value: '1',
                label: '条码管理'
            }, {
                value: '2',
                label: '数量管理'
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
                cbla09: "",
                cbla07: "",
                cbla11: "",
                cbla10: "",
                cbla12: "",
                cbla13: "",
                cbla08: "",
                cbpc100:"",
                cbla13:""
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
                cbla09: "",
                cbla07: "",
                cbla11: "",
                cbla10: "",
                cbla12: "",
                cbla13: "",
                cbla08: "",
                cbpc100:""
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
                url: process.env.VUE_APP_BASE_API + "/system/store/importSwJsStorelist"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                cbla09: undefined,
                sort: undefined
            },
            // 列信息
            //  columns: [
            //   {
            //     title:'状态',
            //     dataIndex:'ifEnabled',
            //     scopedSlots: { customRender: 'ifEnabled' }
            //   }
            // ],
            // 表单校验
            rules2: {
                cbla09: [
                    { required: true, message: "库位码不能为空!", trigger: "blur" }
                ],
                cbla07: [
                    { required: true, message: "库位顺序不能为空!", trigger: "blur" }
                ],
                cbla11: [
                    { required: true, message: "库位容量不能为空!", trigger: "blur" }
                ],
                preferredModel: [
                    { required: true, message: "优先型号不能为空!", trigger: "blur" }
                ],
                cbpc100:[
                    { required: true, message: "仓库不能为空!", trigger: "change" }
                ],
                cbla12:[{
                      required: true, message: "优先型号不能为空!", trigger: "blur" 
                }],
                cbla13:[{
                    required: true, message: "备注不能为空!", trigger: "blur" 
                }],
                cbla08:[{
                     required: true, message: "状态不能为空!", trigger: "blur" 
                }]
            },
            rules: {
               cbla09: [
                    { required: true, message: "库位码不能为空!", trigger: "blur" }
                ],
                cbla07: [
                    { required: true, message: "库位顺序不能为空!", trigger: "blur" }
                ],
                cbla11: [
                    { required: true, message: "库位容量不能为空!", trigger: "blur" }
                ],
                preferredModel: [
                    { required: true, message: "优先型号不能为空!", trigger: "blur" }
                ],
                cbpc100:[
                    { required: true, message: "仓库不能为空!", trigger: "change" }
                ],
                cbla12:[{
                      required: true, message: "优先型号不能为空!", trigger: "blur" 
                }],
                cbla13:[{
                    required: true, message: "备注不能为空!", trigger: "blur" 
                }],
                cbla08:[{
                     required: true, message: "状态不能为空!", trigger: "blur" 
                }]
            }

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
        //库位信息维护
        // this.getList02();

        this.getConfigKey("sys.user.initPassword").then(response => {
            // this.initPassword = response.msg;
        });
        this.getDicts("sw_js_store_type").then(response => {
            this.form.type = response.rows;
        });

        console.log(this.form2.swJsStoreId, 852369741);
        // this.form2.swJsStoreId01 = row.name;
        // this.form.type = this.dict[0].label;
    },
    methods: {
      //列表表头设置
      headClassSM() {
        return {
          'text-align': 'left',
          height: '30px',
          padding: '0'
        }
      },
        selected(name) {
            console.log(name, 123456)
            this.form.aaa = name.substring(0, name.indexOf("-"))
            this.form.swJsStoreId = name.substring(name.indexOf("-") + 1)
            // this.form2.icon = name;
        },

        //添加模块-仓库
        selected01(name) {
             this.$set(this.form2,"cbpc100",name.substring(0, name.indexOf("-")))
            this.form2.cbla10  = name.substring(name.indexOf("-") + 1)
            this.$forceUpdate()
            // this.form2.icon = name;
        },

          //修改模块-仓库
        selected02(name) {
            // console.log(name, 123)
            // console.log(name.substring(name.indexOf("-") + 1), 963);
            this.$set(this.form,"cbpc100",name.substring(0, name.indexOf("-")))
            this.form.cbla10  = name.substring(name.indexOf("-") + 1)
            this.$forceUpdate()
            // console.log("1112")
            // this.form2.icon = name;
        },

        /** 查询用户列表 */
        getList() {
            this.loading = true;
            StoreList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                console.log(response.data.rows, 3369);
                // console.log(this.form2.swJsStoreId,89768344);
                // console.log(response.data.content, 339688);
                this.deleteFlag = response.data.rows.deleteFlag;
                this.loading = false;
            }
            );
        },
        //仓库信息维护
        // getList02() {
        //     listUserStore(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        //         this.postCangKu = response.data.rows;
        //         // this.XinghaoOptions = response.data.rows;
        //         console.log(response.data.rows, 1655);
        //     });
        // },
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
            this.open = false;
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
                cbla07: undefined,
                cbla08: undefined,
                cbla09: undefined,
                cbla10: undefined,
                cbla11: undefined,
                cbla12: undefined,
                cbla13: undefined
            };
            this.resetForm("form");
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
            // this.ids = selection.map(item => item.id);
            this.ids = selection;
            this.idss = selection.map(item => item.cbwa09);
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
                    StoreAdd(this.form2).then(response => {
                        // console.log(this.from.parent_id, 123456789);
                        // this.classifyId = response.posts;
                        // console.log(response.posts,123456);

                        this.$message({ message: '添加成功', type: 'success', style: 'color:red;!important' });
                        // this.getTreeselect();
                        // this.submitShangpin();
                        this.submitShangpin();
                        this.getList();
                        this.open2 = false;
                        this.reset01();

                        // console.log(this.form2.ifEnabled, 123456);
                    });
                } else {
                    // this.$message.error('请注意规范');
                }
            })
            // if (this.form2.swJsStoreId != undefined || this.form2.locationNum != undefined || this.form2.sort != undefined) {
            //     // console.log(this.form.id, 123456);

            //     addUserSysStoreku(this.form2).then(response => {
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
        /** 修改按钮操作 */
        handleUpdate() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    let row = {}
                    row.cbla09 = this.form.cbla09;
                    row.cbla07 = this.form.cbla07;
                    row.cbla11 = this.form.cbla11;
                    row.cbla10 = this.form.cbla10;
                    row.cbla12 = this.form.cbla12;
                    row.cbla13 = this.form.cbla13;
                    row.cbla08 = this.form.cbla08;
                    row.cbla01 = this.form.cbla01;
                    // console.log(this.form.id);
                    StoreEdit(this.form, JSON.stringify(row)).then(response => {
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
                        this.$message({ message: '修改成功', type: 'success' });

                    });
                } else {
                    // this.$message.error('库位码或库位顺序不能相同');
                }
            })
        },
        /** 详情按钮操作**/
        handleSelect(row) {
            this.open1 = true;
            this.form1.cbla01 = row.cbla01;
            this.form1.cbla09 = row.cbla09;
            this.form1.cbla07 = row.cbla07;
            this.form1.cbla11 = row.cbla11;
            this.form1.cbla10 = row.cbla10;
            this.form1.cbla12 = row.cbla12;
            this.form1.cbla13 = row.cbla13;
            this.form1.cbla08 = row.cbla08;
            
        },
        /** 修改详情按钮操作**/
        handlexiangqengSelect(row) {
            console.log(this.form,111)
            console.log(row,222)
            // console.log(row)
            // this.getList();
            this.open = true;
            // console.log(row, 7788521);
            this.form = Object.assign({},row);
            this.form.cbpc100=this.form.cbwa09
            // this.
            // console.log(this.form)
        },
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
        //创建
        handlexiangqengchuangjian(row) {
            this.open2 = true;
        },
        /** 数形列表的商品分类按钮**/
        submitShangpin() {
            this.reset();
        },
        cancelone() {
            this.open2 = false;
            this.reset01();
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

            // row.classifyId = this.form.classifyId;
            // row.brand = this.form.brand;
            // row.model = this.form.model;
            // row.upc = this.form.upc;
            // row.description = this.form.description;
            // row.ifEnabled = this.form.ifEnabled;
            // row.id=this.form.id;
            this.userIds = {}
            // let userIds = [row.id].length > 0 ? [row.id] :this.ids;
            let userIds = this.ids.length > 0 ? this.ids : row
            // console.log(userIds,123)
            console.log(userIds, 123)
            console.log(typeof userIds)
            // let a =""
            // if (JSON.parse(userIds).length>0){
            //     a=userIds[0]
            // }
            // console.log(a,456)
            // // console.log(JSON.stringify(userIds),123456852)
            this.$modal.confirm('是否确认删除仓库为"' + JSON.stringify(this.idss) + '"的数据项？').then(() => {
                userIds.forEach((item) => {
                    req.StoreRemove(JSON.stringify(item)).then((res) => {
                        console.log(res, 123)
                        this.submitShangpin();
                        this.getList();
                        this.$modal.msgSuccess("删除成功");
                    }).catch((e) => {
                        console.log(e, 456)
                    })
                })
            }
                //     function () {
                //     return removeSysStoreku(JSON.stringify(userIds[0]));
                // }).then((response) => {
                //     this.submitShangpin();
                //     this.getList();
                //     this.$modal.msgSuccess("删除成功");
                // }
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
        this.$modal.confirm('是否确认删除仓库为"' + row.cbwa09 + '"的数据项？').then(function () {
          return StoreRemove(JSON.stringify(row));
        }).then((response) => {
          this.submitShangpin();
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => { });
      },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/store/export', {
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
            this.upload.title = "库位信息维护";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('/system/store/importTemplate', {
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

        //测试树状菜单
        // handleNodeClick(data) {
        //   console.log(data);
        // }
    }
};
</script>
<style src="./StoreMaintenancecss/index.css">
</style>
