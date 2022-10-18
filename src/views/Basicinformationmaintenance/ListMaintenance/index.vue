<template>
    <div class="app-container listmaince">
        <el-row :gutter="20" style="margin-left:-10%;">
            <!--用户数据-->
            <el-col class="tooltup" style="width:92%;">
                <!-- 表头内容  -->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="68px">
                    <el-form-item prop="cala08" label="名称">
                        <el-input v-model="queryParams.cala08" id="miaoshu" placeholder="请输入名称" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item prop="cala10" label="类别">
                        <!-- <el-input v-model="queryParams.cala10" id="miaoshu" placeholder="请输入类别" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" /> -->
                        <el-select v-model="queryParams.cala10" placeholder="请输入类别" style="width: 240px;" clearable
                            @keyup.enter.native="handleQuery">
                            <el-option v-for="dict in pongpaioptions" :key="dict.value" :label="dict.label"
                                :value="dict.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" class="biaoto-buttonchaxuen" v-hasPermi="['system:list:list']"
                            @click="handleQuery">查询</el-button>
                        <el-button size="mini" class="biaoto-buttonchuangjian" v-hasPermi="['system:list:add']"
                            @click="handlechuangjiang">创建</el-button>

                        <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple"
                            @click="handleDelete" v-hasPermi="['system:list:remove']">删除
                        </el-button>

                    </el-form-item>
                </el-form>

                <el-table border :header-cell-style="headClassLM" :row-style="{height: '3px'}"
                    :cell-style="{padding: '2px'}" v-loading="loading" height="470" :data="userList"
                    :default-sort="{ prop: 'name', order: 'descending' }"
                    style="width:100%;height: 8%;margin-left: -1.5%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="类别" align="left" key="cala10" prop="cala10" sortable />
                    <el-table-column label="索引" align="left" key="cala02" prop="cala02" sortable />
                    <el-table-column label="名称" align="left" key="cala08" prop="cala08" sortable />
                    <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-share" class="button-caozuoxougai"
                                @click="handleSelect(scope.row)" v-hasPermi="['system:list:detail']">详情
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-edit" class="button-caozuoxougai"
                                @click="handlexiangqengSelect(scope.row)" v-hasPermi="['system:list:edit']">修改
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" class="button-caozuoxougai"
                                @click="handleDelete01(scope.row)" v-hasPermi="['system:list:remove']">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[10, 15, 20, 50, 500]"
                    class="pagintotal" />
            </el-col>
        </el-row>

        <!-- 修改用户配置对话框 -->
        <el-dialog :title="title2" :visible.sync="open" append-to-body>
            <div
                style="margin-top:-3%;font-weight: 700;font-size: 20px; color: black;margin-left:44%; position: relative;">
                列表管理修改
            </div>
            <el-form ref="form" :model="form" label-width="30%" :rules="rules22"
                style="margin-left:-15%;margin-top:3%;">
                <el-row style="margin-left:-15%;">
                    <el-col style="margin-top:1%;margin-left:5%;">
                        <el-form-item label="类别:" prop="cala10">
                            <!-- <el-input v-model="form2.cala10" placeholder="" maxlength="30" style="width:50%" /> -->
                            <el-select v-model="form.cala10" placeholder="" style="width:50%;">
                                <el-option v-for="dict in pongpaioptions" :key="dict.value" :label="dict.label"
                                    :value="dict.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:1%;margin-left:5%;">
                        <el-form-item label="索引:" prop="cala11">
                            <el-input v-model="form.cala02" placeholder="" maxlength="30" style="width:50%;" />
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:1%;margin-left:5%;">
                        <el-form-item label="名称:" prop="cala08">
                            <el-input v-model="form.cala08" placeholder="" maxlength="30" style="width:50%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 详情 -->
        <el-dialog :title="title" :visible.sync="open1">
            <div
                style="margin-top:-3%;font-weight: 700;font-size: 20px; color: black;margin-left:44%; position: relative;">
                列表管理详情
            </div>
            <el-form ref="form1" :model="form1" label-width="25%" lable-height="20%">
                <div style="margin-top:3%;">
                    <el-row>
                        <el-col>
                            <el-form-item label="类别:" prop="cala10">
                                <el-input v-model="form1.cala10" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="索引:" prop="cala02">
                                <el-input v-model="form1.cala02" maxlength="30" placeholder="" style="width:70%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="名称:" prop="cala08">
                                <el-input v-model="form1.cala08" placeholder="" maxlength="30" style="width:70%;" />
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
        <el-dialog :title="title" :visible.sync="open2" append-to-body>
            <div
                style="margin-top:-3%;font-weight: 700;font-size: 20px; color: black;margin-left:44%; position: relative;">
                列表管理创建
            </div>
            <el-form ref="form2" :model="form2" :rules="rules2" label-width="30%" style="margin-top:3%;">
                <el-row style="margin-left:-15%;">
                    <el-col style="margin-top:1%;">
                        <el-form-item label="类别:" prop="cala10">
                            <!-- <el-input v-model="form2.cala10" placeholder="" maxlength="30" style="width:50%" /> -->
                            <el-select v-model="form2.cala10" placeholder="" style="width:50%;">
                                <el-option v-for="dict in pongpaioptions" :key="dict.value" :label="dict.label"
                                    :value="dict.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:1%;">
                        <el-form-item label="索引:" prop="cala02">
                            <el-input v-model="form2.cala02" placeholder="" maxlength="30" style="width:50%;" />
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:1%;">
                        <el-form-item label="名称:" prop="cala08">
                            <el-input v-model="form2.cala08" placeholder="" maxlength="30" style="width:50%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div style="height:200px;"></div> -->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleAdd">确 定</el-button>
                <el-button @click="cancellss">取 消</el-button>
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
// import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";
// import { addUserSys, listUser, updateUser, treeselectt, removeSys } from "@/api/WareSys/shangpinxxweihu";
// import { addUserSyslist, listUserlist, updateUserlist, removeSyslist } from "@/api/WareSys/SystemListword";

import { ListAdd, ListLists, ListEdit, ListRemove } from "@/api/Basicinformationmaintenance/ListMaintenance/index";

import * as req from "@/api/Basicinformationmaintenance/ListMaintenance/index";

import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "ListMaintenance",
    dicts: ['sys_normal_disable', 'sys_user_sex'],
    components: { Treeselect },
    data() {
        return {
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
            //类别
            pongpaioptions: [{
                value: '1',
                label: '商品品牌'
            }, {
                value: '2',
                label: '商品类别'
            }, {
                value: '3',
                label: '币种'
            }, {
                value: '4',
                label: '客户等级'
            }, {
                value: '5',
                label: '销售订单类型'
            }],
            value: '',
            //商品状态
            ifEnabledoptions: [{
                value: '1',
                label: '启用'
            }, {
                value: '-1',
                label: '禁用'
            }],
            value: '',
            // 角色选项
            roleOptions: [],
            // 表单参数
            form: {
                cala08: "",
                cala09: "",
                cala10: "",
                cala11: "",
                cala12: ""
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
                cala08: "",
                cala09: "",
                cala10: "",
                cala11: "",
                cala12: ""
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
                // 上传的地址/dev-api/stage-api/system/store/importSwJsStorelist
                url: process.env.VUE_APP_BASE_API + "/system/store/importSwJsStorelist"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 15,
                page: 15,
                size: 1,
                total: this.total,
                cala10: undefined,
                cala08: undefined,
                classifyNum: undefined,
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
                cala08: [
                    { required: true, message: "名称不能为空!", trigger: "blur" }
                ],
                cala10: [
                    { required: true, message: "类别不能为空!", trigger: "change" }
                ],
                cala02: [
                    {
                        required: true, message: "索引不能为空!", trigger: "blur"
                    }]
            },
            rules22: {
                cala08: [
                    { required: true, message: "名称不能为空!", trigger: "blur" }
                ],
                cala10: [
                    { required: true, message: "类别不能为空!", trigger: "change" }
                ],
                cala02: [
                    { required: true, message: "索引不能为空!", trigger: "blur" }
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
            this.initPassword = response.msg;
        });
        // this.form2.ifEnabled = this.ifEnabledoptions[0].label;
    },
    methods: {
        //列表表头设置
        headClassLM() {
            return {
                'text-align': 'left',
                height: '30px',
                padding: '0'
            }
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            ListLists(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                console.log(response, 3369);
                // console.log(response.data.content, 339688);
                // this.deleteFlag = response.data.rows.deleteFlag;
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
            this.open = false;
            this.reset();
        },
        cancells() {
            this.open1 = false;
            this.reset();
        },
        cancellss() {
            this.open2 = false;
            this.reset01();
        },
        // 表单重置
        reset() {
            this.form = {
                classifyName: undefined,
                classifyNum: undefined
            };
            this.resetForm("form");
        },

        // 表单重置
        reset01() {
            this.form2 = {
                cala08: undefined,
                cala09: undefined,
                cala10: undefined,
                cala11: undefined,
                cala12: undefined
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
            this.idss = selection.map(item => item.cala10);
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
                    ListAdd(this.form2).then(response => {
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
        },
        handlechuangjiang() {
            this.open2 = true;
        },
        /** 修改按钮操作 */
        handleUpdate() {
            this.open = true;
            let row = {}
            row.cala08 = this.form.cala08;
            row.cala09 = this.form.cala09;
            row.cala10 = this.form.cala10;
            row.cala11 = this.form.cala11;
            row.cala12 = this.form.cala12;
            row.cala01 = this.form.cala01;
            console.log(this.form.cala01);
            this.$refs["form"].validate((item) => {
                if (item) {
                    ListEdit(JSON.stringify(row)).then(response => {

                        // this.form = response.data;
                        // this.sort = response.sort;
                        // this.type = response.type;
                        // this.typeName = response.typeName;
                        // this.name = response.name;

                        // this.submitShangpin();
                        this.getList();
                        this.open = false;
                        this.$message({ message: '修改成功', type: 'success' });

                    });
                } else {
                    // this.$message.error('请注意规范');
                }
            })
        },
        /** 修改详情按钮操作**/
        handlexiangqengSelect(row) {
            this.open = true;
            console.log(row, 7788521);
            this.form = row;
        },

        /** 详情按钮操作**/
        handleSelect(row) {
            this.open1 = true;
            this.form1.cala01 = row.cala01;
            this.form1.cala02 = row.cala02;
            this.form1.cala09 = row.cala09;
            this.form1.cala07 = row.cala07;
            this.form1.cala11 = row.cala11;
            this.form1.cala10 = row.cala10;
            this.form1.cala12 = row.cala12;
            this.form1.cala13 = row.cala13;
            this.form1.cala08 = row.cala08;

        },
        /** 数形列表的商品分类按钮**/
        submitShangpin() {
            this.reset();
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
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.userId != undefined) {
                        updateUserlist(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addUser(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
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
            this.$modal.confirm('是否确认删除类别为"' + JSON.stringify(this.idss) + '"的数据项？').then(() => {
                userIds.forEach((item) => {
                    req.ListRemove(JSON.stringify(item)).then((res) => {
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
            this.$modal.confirm('是否确认删除类别为"' + row.cala10 + '"的数据项？').then(function () {
                return ListRemove(JSON.stringify(row));
            }).then((response) => {
                this.submitShangpin();
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/classify/SwJsGoodsClassifyimportTemplate', {
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
        /** 下载模板操作
         * 
         * /dev-api/stage-api/system/store/importTemplate
         */
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
<style src="./ListMaintenanceCss/index.css" scoped>

</style>
