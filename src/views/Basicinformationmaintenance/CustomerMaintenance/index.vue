<template>
    <div class="app-container">
        <el-row :gutter="20" style="margin-left:-10%;">
            <!--用户数据-->
            <el-col class="tooltup" style="width:92%;">
                <!-- 表头内容  -->
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="68px">
                    <el-form-item prop="cbca08" label="客户名称">
                        <el-input v-model="queryParams.cbca08" id="miaoshu" placeholder="请输入客户名称" clearable
                            style="width: 240px;" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                     <el-form-item prop="cbca24" label="发票类型">
                            <el-select v-model="queryParams.cbca24" placeholder="请输入发票类型" @keyup.enter.native="handleQuery" style="width: 240px;" clearable>
                                    <el-option v-for="item in fapiaoleix" :key="item.value" :label="item.label"
                                        :value="item.label">
                                    </el-option>
                                </el-select>
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

                <el-table border :header-cell-style="headClassCMC" v-loading="loading" height="480" :data="userList"
                    :default-sort="{ prop: 'name', order: 'descending' }"
                    style="width:100%;height: 8%; margin-left: -1.5%;" class="tong"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="客户名称" align="left" key="cbca08" prop="cbca08" fixed width="300"
                        sortable />
                    <el-table-column label="客户等级" align="left" key="cbca28" prop="cbca28" width="190" sortable />
                    <el-table-column label="客户地址" align="left" key="cbca15" prop="cbca15" width="480" sortable />
                    <el-table-column label="发票类型" align="left" key="cbca24" prop="cbca24" width="200" sortable>
                        <!-- <template scope="scope">
                            <div>{{ scope.row.invoiceType == 1 ? "增值税专用发票" : scope.row.invoiceType == 2 ?
                                "增值税普通发票" : scope.row.invoiceType == 3 ? "个人普通发票" : scope.row.invoiceType == 4 ? "不开发票"
                                : "发票类型不确定"
                                }}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="联系电话" align="left" key="cbca16" prop="cbca16" width="200" sortable />
                    <el-table-column label="备注" align="left" key="cbca17" prop="cbca17" width="180" sortable />


                    <el-table-column label="操作" align="center" fixed="right" width="160"
                        class-name="small-padding fixed-width">
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
        <el-dialog :title="title1" :visible.sync="open" class=" abow_dialog3">
            
            <el-form ref="form" :model="form" label-width="45%" class="chuangjianformcust">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="客户名称:" prop="cbca08">
                            <el-input v-model="form.cbca08" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="简称:" prop="cbca10">
                            <el-input v-model="form.cbca10" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="客户地址:" prop="cbca15">
                            <el-input v-model="form.cbca15" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="客户等级:" prop="cbca28">
                            <el-input v-model="form.cbca28" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="11">
                        <el-form-item label="发票地址:" prop="cbca25">
                            <el-input v-model="form.cbca25" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系电话:" prop="cbca16">
                            <el-input v-model="form.cbca16" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发票开户行:" prop="cbca11">
                            <el-input v-model="form.cbca11" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="订单号:" prop="cbca09">
                            <el-input v-model="form.cbca09" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发票电话:" prop="cbca27">
                            <el-input v-model="form.cbca27" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="发票类型:" prop="cbca24">
                            <!-- <el-input v-model="form2.invoiceType" placeholder="请输入发票类型" style="width:98%"
                                maxlength="30" /> -->
                            <el-select v-model="form.cbca24" placeholder="" style="width:100%;">
                                <el-option v-for="item in fapiaoleix" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="邮寄地址:" prop="cbca25">
                            <el-input v-model="form.cbca25" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系人1:" prop="cbca18">
                            <el-input v-model="form.cbca18" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人1手机:" prop="cbca19">
                            <el-input v-model="form.cbca19" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="状态:" prop="cbca07">
                            <!-- <el-input v-model="form.cbca07" placeholder="" style="width:100%" maxlength="30" /> -->
                            <el-select v-model="form.cbca07" placeholder="" style="width:100%;">
                                <el-option v-for="item in ZhuangTaivalue" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人2:" prop="cbca14">
                            <el-input v-model="form.cbca14" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系人2手机:" prop="cbca20">
                            <el-input v-model="form.cbca20" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="身份证:" prop="cbca12">
                            <el-input v-model="form.cbca12" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="身份证1:" prop="cbca13">
                            <el-input v-model="form.cbca13" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="备注:" prop="cbca17">
                            <el-input v-model="form.cbca17" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="其他:" prop="cbca26">
                            <el-input v-model="form.cbca26" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" style="margin-left:80%;">
                        <el-button type="primary" @click="handleUpdate">确定</el-button>
                        <el-button @click="cancel">取 消</el-button>
                    </el-col>
                </el-row>
            </el-form>
            
        </el-dialog>

        <!-- 详情 -->
        <!-- <el-dialog :title="title" :visible.sync="open">
            <el-form ref="form" :model="form" label-width="45%" class="chuangjianform"> -->
        <el-dialog :title="title2" :visible.sync="open1" class="abow_dialog3">
           
            <el-form ref="form1" :model="form1" label-width="45%" class="chuangjianformcust">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="客户名称:" prop="cbca08">
                            <el-input v-model="form1.cbca08" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="简称:" prop="cbca10">
                            <el-input v-model="form1.cbca10" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="客户地址:" prop="cbca15">
                            <el-input v-model="form1.cbca15" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="客户等级:" prop="cbca28">
                            <el-input v-model="form1.cbca28" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="11">
                        <el-form-item label="发票地址:" prop="cbca25">
                            <el-input v-model="form1.cbca25" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系电话:" prop="cbca16">
                            <el-input v-model="form1.cbca16" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发票开户行:" prop="cbca11">
                            <el-input v-model="form1.cbca11" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="订单号:" prop="cbca09">
                            <el-input v-model="form1.cbca09" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发票电话:" prop="cbca27">
                            <el-input v-model="form1.cbca27" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="发票类型:" prop="cbca24" >
                            <!-- <el-input v-model="form2.invoiceType" placeholder="请输入发票类型" style="width:98%"
                                maxlength="30" /> -->
                            <el-select v-model="form1.cbca24" :disabled="true" placeholder="" style="width:100%;">
                                <el-option v-for="item in fapiaoleix" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="邮寄地址:" prop="cbca25">
                            <el-input v-model="form1.cbca25" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系人1:" prop="cbca18">
                            <el-input v-model="form1.cbca18" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人1手机:" prop="cbca19">
                            <el-input v-model="form1.cbca19" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="状态:" prop="cbca07">
                            <el-input v-model="form1.cbca07" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人2:" prop="cbca14">
                            <el-input v-model="form1.cbca14" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系人2手机:" prop="cbca20">
                            <el-input v-model="form1.cbca20" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="身份证:" prop="cbca12">
                            <el-input v-model="form1.cbca12" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="身份证1:" prop="cbca13">
                            <el-input v-model="form1.cbca13" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="备注:" prop="cbca17">
                            <el-input v-model="form1.cbca17" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="其他:" prop="cbca26">
                            <el-input v-model="form1.cbca26" placeholder="" style="width:100%;" />
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
        <!-- <el-dialog :title="title" :visible.sync="open2" append-to-body>
            <el-form ref="form2" :model="form2" :rules="rules" label-width="30%" class="chuangjianform"> -->
        <el-dialog :title="title" :visible.sync="open2" class="abow_dialog3">
           
            <el-form ref="form2" :model="form2" label-width="45%" :rules="rules2" class="chuangjianformcust">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="客户名称:" prop="cbca08">
                            <el-input v-model="form2.cbca08" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="简称:" prop="cbca10">
                            <el-input v-model="form2.cbca10" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="客户地址:" prop="cbca15">
                            <el-input v-model="form2.cbca15" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="客户等级:" prop="cbca28">
                            <el-input v-model="form2.cbca28" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="11">
                        <el-form-item label="发票地址:" prop="cbca25">
                            <el-input v-model="form2.cbca25" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系电话:" prop="cbca16">
                            <el-input v-model="form2.cbca16" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发票开户行:" prop="cbca11">
                            <el-input v-model="form2.cbca11" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="订单号:" prop="cbca09">
                            <el-input v-model="form2.cbca09" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="发票电话:" prop="cbca27">
                            <el-input v-model="form2.cbca27" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="发票类型:" prop="cbca24">
                            <!-- <el-input v-model="form2.invoiceType" placeholder="请输入发票类型" style="width:98%"
                                maxlength="30" /> -->
                            <el-select v-model="form2.cbca24" placeholder="" style="width:100%;">
                                <el-option v-for="item in fapiaoleix" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="邮寄地址:" prop="cbca25">
                            <el-input v-model="form2.cbca25" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系人1:" prop="cbca18">
                            <el-input v-model="form2.cbca18" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人1手机:" prop="cbca19">
                            <el-input v-model="form2.cbca19" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="状态:" prop="cbca07">
                            <!-- <el-input v-model="form2.cbca07" placeholder="" style="width:100%" maxlength="30" /> -->
                            <el-select v-model="form2.cbca07" placeholder="" style="width:100%;">
                                <el-option v-for="item in ZhuangTaivalue" :key="item.value" :label="item.label"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="联系人2:" prop="cbca14">
                            <el-input v-model="form2.cbca14" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="联系人2手机:" prop="cbca20">
                            <el-input v-model="form2.cbca20" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="身份证:" prop="cbca12">
                            <el-input v-model="form2.cbca12" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="身份证1:" prop="cbca13">
                            <el-input v-model="form2.cbca13" placeholder="" style="width:100%;" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="备注:" prop="cbca17">
                            <el-input v-model="form2.cbca17" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="其他:" prop="cbca26">
                            <el-input v-model="form2.cbca26" placeholder="" style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11" style="margin-left:56%;">
                            <el-button type="primary" style="margin-left:49%;" @click="handleAdd">确 定</el-button>
                            <el-button @click="cancells">取 消</el-button>
                    </el-col>
                </el-row>
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

// import { addUserSysCustomerke, listUserCustomerke, updateUserCustomerke, removeSysCustomerke } from "@/api/WareSys/kehuxxweihu";

// import { StoreSkuAdd, StoreSkuList, StoreSkuEdit, StoreyRemove } from "@/api/Basicinformationmaintenance/CustomerMaintenance/index";

import { CustomerAdd, CustomerList, CustomeRedit, CustomeRemove } from "@/api/Basicinformationmaintenance/CustomerMaintenance/index";
import * as req from "@/api/Basicinformationmaintenance/CustomerMaintenance/index";

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
            ids: {},
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
            //客户信息维护发票类型
            kehuxxweihufaopiao: {
                invoiceType: '1'
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


                cbca07: "",
                cbca08: "",
                cbca09: "",
                cbca10: "",
                cbca11: "",
                cbca12: "",
                cbca13: "",
                cbca14: "",
                cbca15: "",
                cbca16: "",
                cbca17: "",
                cbca18: "",
                cbca19: "",
                cbca20: "",
                cbca24: "",
                cbca25: "",
                cbca26: "",
                cbca27: "",
                cbca28: "",
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
                cbca07: "",
                cbca08: "",
                cbca09: "",
                cbca10: "",
                cbca11: "",
                cbca12: "",
                cbca13: "",
                cbca14: "",
                cbca15: "",
                cbca16: "",
                cbca17: "",
                cbca18: "",
                cbca19: "",
                cbca20: "",
                cbca24: "",
                cbca25: "",
                cbca26: "",
                cbca27: "",
                cbca28: "",
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
                url: process.env.VUE_APP_BASE_API + "/system/customer/importSwJsCustomer"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                locationNum: undefined,
                cbca08: undefined,
                cbca24: undefined,
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
                cbca08: [
                    { required: true, message: "客户名称不能为空!", trigger: "blur" }
                ],
                cbca15: [
                    { required: true, message: "客户地址不能为空!", trigger: "blur" }
                ],
                cbca25: [
                    { required: true, message: "发票地址不能为空!", trigger: "blur" }
                ],
                cbca16: [
                    { required: true, message: "联系电话不能为空!", trigger: "blur" },
                    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
                ],
                cbca11: [
                    { required: true, message: "发票开户行不能为空!", trigger: "blur" }
                ],
                cbca09: [
                    { required: true, message: "订单号不能为空!", trigger: "blur" }
                ],
                cbca24: [
                    { required: true, message: "发票类型不能为空!", trigger: "blur" }
                ],
                cbca25: [
                    { required: true, message: "邮寄地址不能为空!", trigger: "blur" }
                ],
                invoiceBank: [
                    { required: true, message: "发票开户行不能为空!", trigger: "blur" }
                ],
                invoiceTaxpayerNumber: [
                    { required: true, message: "纳税人识别号不能为空!", trigger: "blur" }
                ],
                invoiceMailingAdress: [
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
      //列表表头设置
      headClassCMC() {
        return {
          'text-align': 'left',
          height: '30px',
          padding: '0'
        }
      },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            CustomerList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
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
                cbca07: undefined,
                cbca08: undefined,
                cbca09: undefined,
                cbca10: undefined,
                cbca11: undefined,
                cbca12: undefined,
                cbca13: undefined,
                cbca14: undefined,
                cbca15: undefined,
                cbca16: undefined,
                cbca17: undefined,
                cbca18: undefined,
                cbca19: undefined,
                cbca20: undefined,
                cbca24: undefined,
                cbca25: undefined,
                cbca26: undefined,
                cbca27: undefined,
                cbca28: undefined
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
            this.idss = selection.map(item => item.cbca01);
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
                    CustomerAdd(this.form2).then(response => {
                        // console.log(this.from.parent_id, 123456789);
                        // this.classifyId = response.posts;
                        // console.log(response.posts,123456);
                        console.log(this.form2, 997445);
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
                    this.$message.error('请注意规范');
                }
            })
            // if (this.form2.address != undefined || this.form2.name != undefined || this.form2.invoiceAddress != undefined) {
            //     // console.log(this.form.id, 123456);

            //     addUserSysCustomerke(this.form2).then(response => {
            //         // console.log(this.from.parent_id, 123456789);
            //         // this.classifyId = response.posts;
            //         // console.log(response.posts,123456);
            //         console.log(this.form2,997445);
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
            //    this.$message.error('请注意规范');
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
           
                let row = {}
                row.cbca07 = this.form.cbca07;
                row.cbca08 = this.form.cbca08;
                row.cbca09 = this.form.cbca09;
                row.cbca10 = this.form.cbca10;
                row.cbca11 = this.form.cbca11;
                row.cbca12 = this.form.cbca12;
                row.cbca13 = this.form.cbca13;
                row.cbca14 = this.form.cbca14;
                row.cbca15 = this.form.cbca15;
                row.cbca16 = this.form.cbca16;
                row.cbca17 = this.form.cbca17;
                row.cbca18 = this.form.cbca18;
                row.cbca19 = this.form.cbca19;
                row.cbca20 = this.form.cbca20;
                row.cbca24 = this.form.cbca24;
                row.cbca25 = this.form.cbca25;
                row.cbca26 = this.form.cbca26;
                row.cbca27 = this.form.cbca27;
                row.cbca28 = this.form.cbca28;
                row.cbca01 = this.form.cbca01;

                console.log(row, 778899);
                // console.log(this.form.id);
                CustomeRedit(JSON.stringify(row)).then(response => {
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

        },
        /** 详情按钮操作**/
        handleSelect(row) {
            this.open1 = true;
            this.form1.cbca01 = row.cbca01;
            this.form1.cbca07 = row.cbca07;
            this.form1.cbca08 = row.cbca08;
            this.form1.cbca09 = row.cbca09;
            this.form1.cbca10 = row.cbca10;
            this.form1.cbca11 = row.cbca11;
            this.form1.cbca12 = row.cbca12;
            this.form1.cbca13 = row.cbca13;
            this.form1.cbca14 = row.cbca14;
            this.form1.cbca15 = row.cbca15;
            this.form1.cbca16 = row.cbca16;
            this.form1.cbca17 = row.cbca17;
            this.form1.cbca18 = row.cbca18;
            this.form1.cbca19 = row.cbca19;
            this.form1.cbca20 = row.cbca20;
            this.form1.cbca24 = row.cbca24;
            this.form1.cbca25 = row.cbca25;
            this.form1.cbca26 = row.cbca26;
            this.form1.cbca27 = row.cbca27;
            this.form1.cbca28 = row.cbca28;
        },
        /** 修改详情按钮操作**/
        handlexiangqengSelect(row) {
            console.log(row)
            // this.getList();
            this.open = true;
            console.log(row, 7788521);
            this.form.cbca01 = row.cbca01;
            this.form.cbca07 = row.cbca07;
            this.form.cbca08 = row.cbca08;
            this.form.cbca09 = row.cbca09;
            this.form.cbca10 = row.cbca10;
            this.form.cbca11 = row.cbca11;
            this.form.cbca12 = row.cbca12;
            this.form.cbca13 = row.cbca13;
            this.form.cbca14 = row.cbca14;
            this.form.cbca15 = row.cbca15;
            this.form.cbca16 = row.cbca16;
            this.form.cbca17 = row.cbca17;
            this.form.cbca18 = row.cbca18;
            this.form.cbca19 = row.cbca19;
            this.form.cbca20 = row.cbca20;
            this.form.cbca24 = row.cbca24;
            this.form.cbca25 = row.cbca25;
            this.form.cbca26 = row.cbca26;
            this.form.cbca27 = row.cbca27;
            this.form.cbca28 = row.cbca28;
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
                    req.CustomeRemove(JSON.stringify(item)).then((res) => {
                        console.log(res, 123)
                        this.submitShangpin();
                        this.getList();
                        this.$modal.msgSuccess("删除成功");
                    }).catch((e) => {
                        console.log(e, 456)
                    })
                })
            }).catch(() => { });

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
        this.$modal.confirm('是否确认删除ID为"' + row.cbca01 + '"的数据项？').then(function () {
          return CustomeRemove(JSON.stringify(row));
        }).then((response) => {
          this.submitShangpin();
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => { });
      },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/customer/SwJsCustomerexport', {
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
            this.download('/system/customer/SwJsCustomerimportTemplate', {
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
<style src="./CustomerMaintenancecss/index.css">
</style>
