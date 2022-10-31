<template>
    <div class="app-container">
        <el-row>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini"
                    style="margin-bottom: 20px;font-weight: bold;" @click="handleImport"
                    v-hasPermi="['system:classify:import']" class="app-container-dr">导入</el-button>
            </el-col>
        </el-row>

        <el-row :span="50">
            <el-col style="width:270px;" :span="8">
                <div class="head-container">
                    <a @click="submitShangpin" class="shuzhuangliebiaofenleig">商品分类</a>
                    <el-tree :data="deptOptions" :props="defaultProps" style="height:500px;"
                        :expand-on-click-node="false" ref="tree" default-expand-all highlight-current
                        @node-click="handleNodeClick" />
                </div>
            </el-col>

            <!--用户数据-->
            <el-col :span="18">
                <el-form ref="form" :model="form" :rules="rules" size="small" :inline="true" v-show="showSearch"
                    label-width="90px">
                    <div class="shangponfenlei-lase">
                        <div class="shangponfenlei">
                            商品分类信息
                        </div>
                        <hr />
                        <div class="shangponfenlei-middle">
                            <el-row>
                                <el-col v-if="false" style="margin-left: 120px;">
                                    <el-form-item label="父字节编号" prop="cbpa09">
                                        <el-input v-model="form.cbpa09" maxlength="30" style="width: 400px;" />
                                    </el-form-item>
                                </el-col>
                                <el-col style="margin-left: 120px;">
                                    <el-form-item label="名称" prop="cbpa07">
                                        <el-input v-model="form.cbpa07" maxlength="30" style="width: 400px;" />
                                    </el-form-item>
                                </el-col>
                                <el-col style="margin-left: 120px;">
                                    <el-form-item label="分类编号" prop="cbpa11">
                                        <el-input v-model="form.cbpa11" maxlength="30" style="width: 400px;" />
                                    </el-form-item>
                                </el-col>

                                <el-col v-if="false">
                                    <el-form-item label="id" prop="cbpa01">
                                        <el-input v-model="form.cbpa01" maxlength="30" style="width: 400px;" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="shangponfenlei-following">
                            <div class="button-style">
                                <el-button type="primary" class="button-fontsize-xg"
                                    v-hasPermi="['system:classify:edit']" @click="handleUpdate">修改
                                </el-button>
                                <el-button type="success" class="button-fontsize-xz"
                                    v-hasPermi="['system:classify:add']" @click="handleAdd">新增</el-button>
                                <el-button type="danger" class="button-fontsize-sc"
                                    v-hasPermi="['system:classify:remove']" @click="handleDelete">删除</el-button>
                            </div>
                        </div>
                    </div>
                </el-form>
            </el-col>

        </el-row>

        <!-- 用户导入对话框 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body
            class="dialog-yhdrdhk">
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text el-upload-margin">将文件拖到此处，或<em>点击上传</em></div>
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
                <!-- <el-button type="success" :underline="false" style="font-size:12px;vertical-align: baseline;"
                    @click="importTemplate" class="dialog-footer-xzmb">下载模板</el-button> -->
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";
// import { addUserSys, listUser, updateUser, treeselectt, removeSys } from "@/api/Basicinformationmaintenance/GoodsClassify/index";
import { ClassifyAdd, ClassifyList, ClassifyEdit, ClassifyTreeselect, ClassifyRemove, ClassifyImport } from "@/api/Basicinformationmaintenance/GoodsClassify/index";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "User",
    dicts: ['sys_normal_disable', 'sys_user_sex'],
    components: { Treeselect },
    data() {
        return {
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
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
            // 部门名称
            deptName: undefined,
            // 默认密码
            initPassword: undefined,
            // 日期范围
            dateRange: [],
            // 岗位选项
            postOptions: [],
            // 角色选项
            roleOptions: [],
            // 表单参数
            form: {
                cbpa11: "",
                cbpa07: "",
                id: "",
                children:[]
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
                url: process.env.VUE_APP_BASE_API + "/system/classify/importSwJsGoodsClassify"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                userName: undefined,
                phonenumber: undefined,
                status: undefined,
                deptId: undefined
            },
            // 列信息
            columns: [
                { key: 0, label: `用户编号`, visible: true },
                { key: 1, label: `用户名称`, visible: true },
                { key: 2, label: `用户昵称`, visible: true },
                { key: 3, label: `部门`, visible: true },
                { key: 4, label: `手机号码`, visible: true },
                { key: 5, label: `状态`, visible: true },
                { key: 6, label: `创建时间`, visible: true }
            ],
            // 表单校验
            rules: {
                cbpa07: [
                    { required: true, message: "名称不能为空!", trigger: "blur" }
                ],
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
        this.form.cbpa09 = "0";
        this.getList();
        this.getTreeselect();
        this.getConfigKey("sys.user.initPassword").then(response => {
            this.initPassword = response.msg;
        });
    },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            // ClassifyList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            //     this.userList = response.rows;
            //     this.total = response.total;
            //     console.log(response.data.rows,85236)
            //     this.loading = false;
            // }
            // );
        },
        /** 查询部门下拉树结构 */
        getTreeselect() {
            ClassifyTreeselect().then(response => {
                console.log(response.data, 123)
                response.data.forEach((res) => {
                    res.code = res.label ? res.label.substring(res.label.indexOf("~") + 1) : ""
                    res.label = res.label ? res.label.substring(0, res.label.indexOf("~")) : ""
                    if (res.children) {
                        res.children.forEach((i) => {
                            i.code = i.label ? i.label.substring(i.label.indexOf("~") + 1) : ""
                            i.label = i.label ? i.label.substring(0, i.label.indexOf("~")) : ""
                            console.log(i.children, 666)
                            if (i.children) {
                                i.children.forEach((it) => {
                                    console.log(it)
                                    it.code = it.label ? it.label.substring(it.label.indexOf("~") + 1) : ""
                                    it.label = it.label ? it.label.substring(0, it.label.indexOf("~")) : ""
                                })
                            }
                        })

                        // if(res.children.children){
                        //     res.children.children.forEach((i) => {
                        //         i.code = i.label ? i.label.substring(i.label.indexOf("~") + 1) : ""
                        //         i.label = i.label ? i.label.substring(0, i.label.indexOf("~")) : ""
                        //     })
                        // }
                    }
                })
                this.deptOptions = response.data;
            });
        },
        // 筛选节点
        // filterNode(value, data) {
        //
        //   if (!value) return true;
        //   alert("ddd");
        //   return data.indexOf(value) !== -1;
        // },
        // 节点单击事件
        handleNodeClick(data) {
            // console.log((data.code.split("-")),456)
            console.log(data,'----------------')
            // this.queryParams.deptId = data.id;
            // console.log(data.label,88888);
            // const v1=data.label.substring(0, data.label.indexOf("-"));
            this.form.cbpa11 = "";
            for (let i = 0; i < (data.code.split("~")).length - 1; i++) {
                if (i != 0) {
                    this.form.cbpa011 += ("~" + (data.code.split("~"))[i])
                    this.form.cbpa11 += ("~" + (data.code.split("~"))[i]).substring(data.code.indexOf("~") + 1)
                } else {
                    this.form.cbpa11 += (data.code.split("~"))[i]
                }
            }
            // this.form.classifyNum =  data.code ? data.code.substring(0,data.code.indexOf("-") ):""//data.label.substring(v1.length+1, data.label.length);
            this.form.cbpa07 = data.label
            this.form.cbpa09 = (data.code.split("~"))[data.code.split("~").length - 1]
            // this.form.cbpa01 = this.form.cbpa011.substring(data.code.indexOf("~")+6);
            this.form.cbpa01 = (this.form.cbpa011.split("~"))[this.form.cbpa011.split("~").length - 1]
            console.log(this.form.cbpa09, 88880099);
            console.log(this.form.cbpa11, 111111111);
            console.log(this.form.cbpa01, 1010101);
            // console.log(data.code ? data.code.substring(data.code.indexOf("-") + 1) : "");
            this.handleQuery();
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                cbpa07: undefined,
                cbpa11: undefined
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
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
            this.ids = selection.map(item => item.userId);
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
            this.form.cbpa09 = this.form.cbpa01
            this.form.cbpa01 = "";
            // return
            this.$refs["form"].validate((item) => {
                if (item) {
                    ClassifyAdd(this.form).then(response => {
                        if (response.code == "200") {
                            // this.form.parent_id=this.form.id;
                            // console.log(this.from.parent_id,123456789);
                            this.title = "添加用户";
                            this.$message({ message: '添加成功', type: 'success', style: 'color:red;!important' });
                            this.getTreeselect();
                            this.submitShangpin();
                            this.getList();
                            this.reset();
                            // this.form.cbpa09 = "0";
                        } else {
                            // this.$message({ message: response.msg, type: 'error' });
                        }

                    });
                } else {

                }
            })
            // if(this.form.classifyName!=undefined)
            // {
            //   // this.reset();
            //   // console.log(this.form.id, 123456);
            //   addUserSys(this.form).then(response => {
            //     // this.form.parent_id=this.form.id;
            //     // console.log(this.from.parent_id,123456789);
            //     this.title = "添加用户";
            //     this.$message({ message: '恭喜你，添加成功', type: 'success', style: 'color:red;!important' });
            //     this.getTreeselect();
            //     this.submitShangpin();
            //     this.getList();
            //     this.reset();
            //   });

            // }else{
            //   this.$message.error('错了哦，商品名称没有填呢');
            // }

        },
        /** 修改按钮操作 */
        handleUpdate() {
            this.$refs["form"].validate((item) => {
                if (item) {
                    let row = Object.assign({}, this.form)
                    // console.log(row)
                    row.cbpa11 = this.form.cbpa11;
                    row.cbpa07 = this.form.cbpa07;
                    row.cbpa09 = this.form.cbpa09;
                    row.cbpa01 = this.form.cbpa01;
                    ClassifyEdit(JSON.stringify(row)).then(response => {
                        if (response.code == "200") {
                            this.form = response.data;
                            this.cbpa07 = response.cbpa07;
                            this.cbpa11 = response.cbpa11;
                            this.cbpa09 = response.cbpa09;
                            this.cbpa01 = response.cbpa01;
                            this.getTreeselect();
                            this.submitShangpin();
                            this.$message({ message: '修改成功', type: 'success' });
                        } else {
                            this.$message({ message: response.msg, type: 'error' });
                        }
                    });

                }
            })
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
                        updateUser(this.form).then(response => {
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
        handleDelete() {
            this.$refs["form"].validate((item) => {
                if (item) {
                    let row = {}
                    row.cbpa07 = this.form.cbpa07;
                    row.cbpa11 = this.form.cbpa11;
                    row.cbpa01 = this.form.cbpa01;
                    // removeSys(JSON.stringify(row)).then(response => {
                    //   this.form = response.data;
                    //   this.classifyName = response.classifyName;
                    //   this.classifyNum = response.classifyNum;

                    //   this.getTreeselect();
                    //   this.submitShangpin();
                    //   this.$message({ message: '恭喜你，修改成功', type: 'success' });
                    // });


                    this.$modal.confirm('是否确认删除,名称为"' + JSON.stringify(row.cbpa07) + '"的数据项？').then(function () {
                        return ClassifyRemove(JSON.stringify(row));
                    }).then((response) => {
                        if (response.code == "200") {
                            this.getTreeselect();
                            this.submitShangpin();
                            this.$modal.msgSuccess("删除成功");
                            this.getList();
                        } else {
                            this.$message({ message: response.msg, type: 'error' });
                        }
                    }).catch(() => { });

                }
            });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/classify/SwJsGoodsClassifyexport', {
                ...this.queryParams
            }, `user_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "商品分类";
            this.upload.open = true;
        },
        /** 下载模板操作
         *
         * /dev-api/stage-api/system/classify/importTemplate
        */
        importTemplate() {
            this.download('/system/classify/importTemplate', {
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
<style src="./GoodsClassifyCss/index.css">

</style>
