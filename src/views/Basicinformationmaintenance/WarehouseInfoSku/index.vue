<template>
    <div class="app-container">
        <el-row :gutter="20" style="margin-left:-10%;">
            <!--用户数据-->
            <el-col class="tooltup" style="width:100%;">
                <!-- 表头内容  -->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="68px">
                    <el-form-item prop="cbwa09" label="仓库名称">
                        <el-input v-model="queryParams.cbwa09"  id="miaoshu" placeholder="请输入仓库名称"  clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item prop="cbwa11" label="仓库类型">
                        <el-select v-model="queryParams.cbwa11" placeholder="请输入仓库类型" style="width: 240px;" clearable @keyup.enter.native="handleQuery">
                            <el-option v-for="dict in CangkuLeixvalue" :key="dict.value" :label="dict.label"
                                        :value="dict.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" class="biaoto-buttonchaxuen" @click="handleQuery">查询</el-button>
                        <el-button size="mini" class="biaoto-buttonchuangjian" @click="handlechuangjiang">创建</el-button>
                        <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple" @click="handleDelete"
                            v-hasPermi="['system:user:remove']">删除
                        </el-button>
                    </el-form-item>
                </el-form>

                <el-table border :header-cell-style="headClassWSS" v-loading="loading" height="490" :data="userList"
                    :default-sort="{ prop: 'name', order: 'descending' }"
                    style="width:92%;height: 8%; margin-left:-1.5%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="仓库名称" align="left" key="cbwa09" prop="cbwa09" sortable />
                    <el-table-column label="仓库类型" align="left" key="cbwa11" prop="cbwa11" sortable>
                        <!-- <template scope="scope">
                            <div>{{ scope.row.type == 1 ? "普通仓库" : scope.row.type == 2 ? "CDC仓库" : "仓库未知" }}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="出库优先级" align="left" key="cbwa07" prop="cbwa07" sortable>
                        <!-- <template scope="scope">
                            <div>{{ scope.row.cbwa07 <= 1 ? "优先出库" : "正常出库" }} </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="管理方式" align="left" key="cbwa12" prop="cbwa12" sortable>
                        <!-- <template scope="scope">
                            <div>{{ scope.row.cbwa12 == 1 ? "条码管理" : scope.row.cbwa12 == 2 ? "数量管理" : "管理方式未知"
                            }}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="启用总订单" align="left" key="cbwa13" prop="cbwa13" sortable>
                        <template scope="scope">
                            <div>{{ scope.row.cbwa13 == 0 ? "是" : scope.row.cbwa13 == 1 ?
                            "否" : "状态不确定"
                            }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="启用提货单" align="left" key="cbwa14" prop="cbwa14" sortable>
                        <template scope="scope">
                            <div>{{ scope.row.cbwa14 == 0 ? "是" : scope.row.cbwa14 == 1 ? "否" :
                            "状态不确定"
                            }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="启用" align="left" key="cbwa08" prop="cbwa08" sortable>
                        <!-- <template scope="scope">
                            <div>{{ scope.row.cbwa15 == -1 ? "启用" : scope.row.cbwa15 == 1 ? "禁用" : "状态不确定" }}
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
        <el-dialog :title="title1" :visible.sync="open"  class="abow_dialog"  append-to-body>
            <!-- <div style="padding-top:-1%;font-weight: 900;font-size: 20px; color: black;">仓库信息</div> -->
            <!-- <hr /> -->
            <el-form ref="form" :model="form" label-width="30%" >
                <div style="margin-left:-10%;">
                    <el-row>
                        <el-col>
                            <el-form-item label="名称:" prop="cbwa09">
                                <el-input v-model="form.cbwa09" placeholder="" maxlength="30" style="width:55%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="名称1:" prop="cbwa10">
                                <el-input v-model="form.cbwa10" placeholder="" maxlength="30" style="width:55%;" />
                                <!-- <el-select v-model="cangkuxialakuang.enableTotalOrder" placeholder="请选择类型"
                                    style="width:55%">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="出库优先级:" prop="cbwa07">
                                <el-input v-model="form.cbwa07" maxlength="30" style="width:55%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="状态:" prop="cbwa08">
                                <!-- <el-input v-model="form.cbwa08" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form.cbwa08" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in ZhuangTaivalue" :key="dict.value" :label="dict.label"
                                        :value="dict.label"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="类型:" prop="cbwa11">
                                <!-- <el-input v-model="form.cbwa11" placeholder="" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form.cbwa11" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in CangkuLeixvalue" :key="dict.value" :label="dict.label"
                                        :value="dict.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="管理模式:" prop="cbwa12">
                                <!-- <el-input v-model="form.cbwa12" placeholder="" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form.cbwa12" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in CangGuanlimshi" :key="dict.value" :label="dict.label"
                                        :value="dict.label"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="是否启用总订单:" prop="cbwa13">
                                <!-- <el-input v-model="form.cbwa13" placeholder="" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form.cbwa13" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="是否启用提货单:" prop="cbwa14">
                                <!-- <el-input v-model="form.cbwa14" placeholder="" style="width:55%;" maxlength="30" /> -->
                                 <el-select v-model="form.cbwa14" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in Tihuodan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="是否可用:" prop="cbwa15">
                                <!-- <el-input v-model="form.cbwa15" placeholder="" style="width:55%;" maxlength="30" /> -->
                                 <!-- <el-input v-model="form2.cbwa15" placeholder="" style="width:55%" maxlength="30" /> -->
                                <el-select v-model="form.cbwa15" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                             <div style="margin-left:79%;margin-top: 3%;">
                               <el-button type="primary" @click="handleUpdate">确定</el-button>
                               <el-button @click="cancel">取 消</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            
        </el-dialog>

        <!-- 详情 -->
        <el-dialog :title="title2" :visible.sync="open1" class="abow_dialog" append-to-body>
            <!-- <div style="margin-top:-4%;font-weight: 900;font-size: 20px; color: black;">仓库信息</div> -->
            <!-- <hr /> -->
            <el-form ref="form1" :model="form1" label-width="30%" style="margin-top:3%;margin-left:-8%;">
                <el-row>
                    <el-col>
                        <el-form-item label="名称:" prop="cbwa09">
                            <el-input v-model="form1.cbwa09" placeholder="" maxlength="30" style="width:55%;" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="名称1:" prop="cbwa10">
                            <el-input v-model="form1.cbwa10" placeholder="" maxlength="30" style="width:55%;" />
                            <!-- <el-select v-model="cangkuxialakuang.enableTotalOrder" placeholder="请选择类型"
                                    style="width:55%">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="出库优先级:" prop="cbwa07">
                            <el-input v-model="form1.cbwa07" maxlength="30" style="width:55%;" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="状态:" prop="cbwa08">
                            <el-input v-model="form1.cbwa08" maxlength="30" style="width:55%;" />
                            <!-- <el-select v-model="cangkuxialakuang.type" placeholder="请选择类型" style="width:55%">
                                    <el-option v-for="dict in dict.type.sw_js_store_type" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select> -->
                            <!-- <el-select v-model="form.type" placeholder="请选择类型">
                                <el-option v-for="dict in CangkuLeixvalue" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>


                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="类型:" prop="cbwa11">
                            <el-input v-model="form1.cbwa11" placeholder="" maxlength="30" style="width:55%;" />
                            <!-- <el-select v-model="cangkuxialakuang.enableTakeGoods" placeholder="请选择类型"
                                    style="width:55%">
                                    <el-option v-for="dict in Tihuodan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="管理模式:" prop="cbwa12">
                            <el-input v-model="form1.cbwa12" placeholder="" maxlength="30" style="width:55%;" />
                            <!-- <el-select v-model="cangkuxialakuang.manageMode" placeholder="请输入商品管理方式"
                                    style="width:55%">
                                    <el-option v-for="dict in dict.type.sw_js_store_type_manage_mode" :key="dict.value"
                                        :label="dict.label" :value="dict.value"></el-option>
                                </el-select> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="是否启用总订单:" prop="cbwa13">
                            <el-input v-model="form1.cbwa13" placeholder="" maxlength="30" style="width:55%;" />
                            <!-- <el-select v-model="cangkuxialakuang.ifEnabled" placeholder="请选择类型" style="width:55%">
                                    <el-option v-for="dict in ZhuangTaivalue" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="是否启用提货单:" prop="cbwa14">
                            <el-input v-model="form1.cbwa14" placeholder="" style="width:55%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="是否可用:" prop="cbwa15">
                            <el-input v-model="form1.cbwa15" placeholder="" style="width:55%;" maxlength="30" />
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
        <el-dialog :title="title" :visible.sync="open2" class="abow_dialog" append-to-body>
            <!-- <div style="margin-top:-4%; font-weight: 900; font-size: 20px; color: black;">仓库信息</div> -->
            <!-- <hr /> -->
            <el-form ref="form2" :model="form2" :rules="rules2" label-width="30%" class="chuangjianformWare">
                <div style="margin-left:-10%;">
                    <el-row>
                        <el-col>
                            <el-form-item label="名称:" prop="cbwa09">
                                <el-input v-model="form2.cbwa09" placeholder="" maxlength="30" style="width:55%;" />
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="名称1:" prop="cbwa10">
                                <el-input v-model="form2.cbwa10" placeholder="" maxlength="30" style="width:55%;" />
                                <!-- <el-select v-model="cangkuxialakuang.enableTotalOrder" placeholder="请选择类型"
                                    style="width:55%">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="出库优先级:" prop="cbwa07">
                                <el-input v-model="form2.cbwa07" maxlength="30" style="width:55%;" />
                            </el-form-item>
                        </el-col>



                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="类型:" prop="cbwa11">
                                <!-- <el-input v-model="form2.cbwa11" placeholder="" maxlength="30" style="width:55%" /> -->
                                <el-select v-model="form2.cbwa11" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in CangkuLeixvalue" :key="dict.value" :label="dict.label"
                                        :value="dict.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="管理模式:" prop="cbwa12">
                                <!-- <el-input v-model="form2.cbwa12" placeholder="" maxlength="30" style="width:55%" /> -->
                                <el-select v-model="form2.cbwa12" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in CangGuanlimshi" :key="dict.value" :label="dict.label"
                                        :value="dict.label"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="是否启用总订单:" prop="cbwa13">
                                <!-- <el-input v-model="form2.cbwa13" placeholder="" maxlength="30" style="width:55%" /> -->
                                <el-select v-model="form2.cbwa13" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="是否启用提货单:" prop="cbwa14">
                                <!-- <el-input v-model="form2.cbwa14" placeholder="" style="width:55%" maxlength="30" /> -->
                                <el-select v-model="form2.cbwa14" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in Tihuodan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="状态:" prop="cbwa08">
                                <!-- <el-input v-model="form2.cbwa08" maxlength="30" style="width:55%" /> -->
                                <el-select v-model="form2.cbwa08" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in ZhuangTaivalue" :key="dict.value" :label="dict.label"
                                        :value="dict.label"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="是否可用:" prop="cbwa15">
                                <!-- <el-input v-model="form2.cbwa15" placeholder="" style="width:55%" maxlength="30" /> -->
                                <el-select v-model="form2.cbwa15" placeholder="" style="width:55%;">
                                    <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                        :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                         <el-col>
                            <div style="margin-left:79%;margin-top: 3%;">
                               <el-button type="primary" @click="handleAdd">确定</el-button>
                               <el-button @click="cancells">取 消</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            
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

import { StoreSkuAdd, StoreSkuList,StoreSkuEdit, StoreyRemove } from "@/api/Basicinformationmaintenance/WarehouseInfoSku/index";
import * as req from "@/api/Basicinformationmaintenance/WarehouseInfoSku/index";

import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "store",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
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
            //仓库下拉框选择
            cangkuxialakuang: {
                type: '1',
                manageMode: '1',
                ifEnabled: '-1',
                enableTakeGoods: '-1',
                enableTotalOrder: '-1'
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
            //管理模式
            CangGuanlimshi: [{
                value: '1',
                label: '条码管理'
            }, {
                value: '2',
                label: '数量管理'
            }],
            value: '',

            //是否启用提货单
            Tihuodan: [{
                value: '0',
                label: '是'
            }, {
                value: '1',
                label: '否'
            }],
            value: '',

            //是否启用总订单
            ZongDingdan: [{
                value: '0',
                label: '是'
            }, {
                value: '1',
                label: '否'
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
                value: '1',
                label: '启用'
            }, {
                value: '2',
                label: '禁用'
            }],
            value: '',
            // 角色选项
            roleOptions: [],
            // 表单参数
            form: {
                cbwa07: "",
                cbwa08: "",
                cbwa09: "",
                cbwa10: "",
                cbwa11: "",
                cbwa12: "",
                cbwa13: "",
                cbwa14: "",
                cbwa15: ""
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
                cbwa07: "",
                cbwa08: "",
                cbwa09: "",
                cbwa10: "",
                cbwa11: "",
                cbwa12: "",
                cbwa13: "",
                cbwa14: "",
                cbwa15: ""
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
                page: 1,
                size: 10,
                total: this.total,
                cbwa09: undefined,
                classifyNum: undefined
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
                cbwa09: [
                    { required: true, message: "名称不能为空!", trigger: "blur" }
                ],
                cbwa13: [
                    { required: true, message: "是否启用总订单不能为空!", trigger: "blur" }
                ],
                cbwa14: [
                    { required: true, message: "是否启用提货单不能为空!", trigger: "blur" }
                ],
                cbwa15: [
                    { required: true, message: "是否可用不能为空!", trigger: "blur" }
                ],
                cbwa08: [
                    { required: true, message: "状态不能为空!", trigger: "blur" }
                ],
                cbwa11: [
                    { required: true, message: "类型不能为空!", trigger: "blur" }
                ],
                cbwa12: [
                    { required: true, message: "管理模式不能为空!", trigger: "blur" }
                ]
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
        this.getConfigKey("sys.user.initPassword").then(response => {
            // this.initPassword = response.msg;
        });
        this.getDicts("sw_js_store_type").then(response => {
            this.form.type = response.rows;
        });
        // this.form.type = this.dict[0].label;
    },
    methods: {
      //列表表头设置
      headClassWSS() {
        return {
          'text-align': 'left',
          height: '30px',
          padding: '0'
        }
      },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            StoreSkuList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                console.log(response.data.rows, 3369);
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
            this.open = false;
            this.reset();
        },
        cancells() {
            this.open2 = false;
            this.reset01();
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
                cbwa07: undefined,
                cbwa08: undefined,
                cbwa09: undefined,
                cbwa10: undefined,
                cbwa11: undefined,
                cbwa12: undefined,
                cbwa13: undefined,
                cbwa14: undefined,
                cbwa15: undefined
            };
            this.resetForm("form2");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            // var neirong = $('#miaoshu').val();
            this.userList.name = this.form.name;
            
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
            this.idss = selection.map(item => item.cbwa01);
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
                    StoreSkuAdd(this.form2).then(response => {
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

                        console.log(this.form2.ifEnabled, 123456);
                    });
                } else {
                    this.$message.error('请注意规范' + this.form.cbwa09 + '初五');
                }
            })
            // if (this.form2.name != undefined || this.form2.type != undefined || this.form2.manageMode != undefined) {
            //     // console.log(this.form.id, 123456);

            //     addUserSysStore(this.form2).then(response => {
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
        handlechuangjiang() {
            this.open2 = true;
        },
        /** 修改按钮操作 */
        handleUpdate() {
            if (this.form.cbwa09 != undefined) {
                let row = {}
                row.cbwa07 = this.form.cbwa07;
                row.cbwa08 = this.form.cbwa08;
                row.cbwa09 = this.form.cbwa09;
                row.cbwa10 = this.form.cbwa10;
                row.cbwa11 = this.form.cbwa11;
                row.cbwa12 = this.form.cbwa12;
                row.cbwa13 = this.form.cbwa13;
                row.cbwa14 = this.form.cbwa14;
                row.cbwa15 = this.form.cbwa15;
                row.cbwa01 = this.form.cbwa01;
                // console.log(this.form.id);
                StoreSkuEdit(JSON.stringify(row)).then(response => {
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
            this.form1.cbwa01 = row.cbwa01;
            this.form1.cbwa07 = row.cbwa07;
            this.form1.cbwa08 = row.cbwa08;
            this.form1.cbwa09 = row.cbwa09;
            this.form1.cbwa10 = row.cbwa10;
            this.form1.cbwa11 = row.cbwa11;
            this.form1.cbwa12 = row.cbwa12;
            this.form1.cbwa13 = row.cbwa13;
            this.form1.cbwa14 = row.cbwa14;
            this.form1.cbwa15 = row.cbwa15;
            if(this.form1.cbwa13=="0"){
               this.form1.cbwa13="是"
            }else if(this.form1.cbwa13=="1")
            {
               this.form1.cbwa13="否"
            }
            
             if(this.form1.cbwa14=="0"){
               this.form1.cbwa14="是"
            }else if(this.form1.cbwa14=="1")
            {
               this.form1.cbwa14="否"
            }
            if(this.form1.cbwa15=="0"){
               this.form1.cbwa15="是"
            }else if(this.form1.cbwa15=="1")
            {
               this.form1.cbwa15="否"
            }
        },
        /** 修改详情按钮操作**/
        handlexiangqengSelect(row) {
            console.log(row)
            // this.getList();
            this.open = true;
            console.log(row, 7788521);
            this.form.cbwa01 = row.cbwa01;
            this.form.cbwa07 = row.cbwa07;
            this.form.cbwa08 = row.cbwa08;
            this.form.cbwa09 = row.cbwa09;
            this.form.cbwa10 = row.cbwa10;
            this.form.cbwa11 = row.cbwa11;
            this.form.cbwa12 = row.cbwa12;
            this.form.cbwa13 = row.cbwa13;
            this.form.cbwa14 = row.cbwa14;
            this.form.cbwa15 = row.cbwa15;

           if(row.cbwa13=="0"){
               this.form.cbwa13==="是"
               row.cbwa13=="0"
            }else if(row.cbwa13=="1")
            {
               this.form.cbwa13==="否"
               row.cbwa13=="1"
            }
            

             if(row.cbwa14=="0"){
               this.form.cbwa14==="是"
               row.cbwa14=="0"
            }else if(row.cbwa14=="1")
            {
               this.form.cbwa14==="否"
               row.cbwa14=="1"
            }


            if(row.cbwa15=="0"){
               this.form.cbwa15==="是"
               row.cbwa15=="0"
            }else if(row.cbwa15=="1")
            {
               this.form.cbwa15==="否"
                row.cbwa15=="0"
            }
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
                    req.StoreyRemove(JSON.stringify(item)).then((res) => {
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
        this.$modal.confirm('是否确认删除ID编号为"' + row.cbwa01 + '"的数据项？').then(function () {
          return StoreyRemove(JSON.stringify(row));
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
        /** 下载模板操作 */
        importTemplate() {
            this.download('/system/classify/SwJsGoodsClassifyimportTemplate', {
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
<style src="./WarehouseInfoSkucss/index.css">
</style>
