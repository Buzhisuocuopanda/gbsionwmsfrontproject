<template>
    <div class="app-container">
        <div style="width:102.5%;">
            <el-row :gutter="20">
                <!--部门数据-->
                <el-col :span="40" :xs="24">
                    <div style="width:250px;">
                        <!--树状菜单-->
                        <a @click="submitShangpin" class="shuzhuangliebiaofenlei">商品分类</a>
                        <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" ref="tree"
                            default-expand-all highlight-current style="height:550px;"  />
                    </div>
                </el-col>
                <!--用户数据-->
                <el-col :span="45" class="tooltup" style="width:77.7%; margin-left: 1%;">
                    <!-- 表头内容  -->
                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                        label-width="68px">
                        <el-form-item prop="cbpa07" label="商品分类">
                            <!-- placeholder="描述/助记符/品牌/UPC/" -->
                            <el-input v-model="queryParams.cbpa07" id="miaoshu" placeholder="请输入商品分类" clearable
                                style="width: 240px;" @keyup.enter.native="handleQuery" />
                        </el-form-item>
                         <el-form-item prop="cbpb12" label="型号">
                            <!-- placeholder="描述/助记符/品牌/UPC/" -->
                            <el-input v-model="queryParams.cbpb12" id="miaoshu" placeholder="请输入型号" clearable
                                style="width: 240px;" @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini" class="biaoto-buttonchaxuen" @click="handleQuery">查询</el-button>
                            <el-button size="mini" class="biaoto-buttonchuangjian" @click="handlechuangjiang">创建
                            </el-button>

                            <el-button size="mini" type="danger" class="biaoto-buttonshanchu" :disabled="multiple"
                                @click="handleDelete" v-hasPermi="['system:user:remove']">删除
                            </el-button>

                            <el-button plain size="mini" class="biaoto-buttondaoru" @click="handleImport"
                                v-hasPermi="['system:user:import']">导入</el-button>
                            <el-button plain size="mini" class="biaoto-buttondaochu" @click="handleExport"
                                v-hasPermi="['system:user:export']">导出</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table :max-height="maxheight"  border :header-cell-style="headClassGDC" v-loading="loading" height="490" :data="userList"
                        :default-sort="{ prop: 'name', order: 'descending' }" style="margin-left: -1.5%; width:100%;"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50" align="center" />
                        <el-table-column label="商品分类" align="left" key="cbpa07" width="190px;" prop="cbpa07"/>
                        <el-table-column label="商品描述" align="left" key="cbpb08" prop="cbpb08" width="480px;"
                            locationNum />
                        <el-table-column label="商品品牌" align="left" key="cbpb10" prop="cbpb10" width="180px;" sortable >
                            <template scope="scope">
                            <div>{{ scope.row.cbpb10 == 1 ? "Epiphone" : scope.row.cbpb10 == 2 ?
                            "Gibson" : scope.row.cbpb10 == 3 ? "Kramer" : scope.row.cbpb10 == 4 ? 
                            "Steinberger" : scope.row.cbpb10 == 5 ?  "Mesa/Boogie" : scope.row.cbpb10 == 6 ?  
                            "Maestro" : "发票类型不确定"
                            }}
                            </div>
                        </template>
                        </el-table-column>


                        <el-table-column label="型号" align="left" key="cbpb12" width="150" prop="cbpb12" locationNum />
                        <el-table-column label="库位顺序" align="left" key="cbpb13" width="110px;" prop="cbpb13" sortable />
                        <el-table-column label="库位容量" align="left" key="cbpb14" width="110px;" prop="cbpb14" sortable />
                        <el-table-column label="UPC" align="left" key="cbpb15" width="150" prop="cbpb15" sortable />
                        <el-table-column label="状态" align="left" key="cbpb07" prop="cbpb07" sortable />
                        <el-table-column label="操作" align="center" fixed="right" width="160" class-name="small-padding fixed-width">
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
                        :limit.sync="queryParams.pageSize" @pagination="getList" :page-sizes="[2, 5, 10, 15, 20,3000]"
                        class="pagintotal" />
                </el-col>
            </el-row>
        </div>
        <!-- 修改用户配置对话框 -->
        <el-dialog :title="title1" :visible.sync="open" class="abow_dialog5">
          <div>
                <span style="font-size:15px;margin-left: 3%;">商品基础信息</span>
                <hr />
            </div>
            <el-form ref="form" :model="form" :rules="rules2"  style="margin-top:20px;" label-width="100px">
                   <el-row style="margin-left:5.2%;" :gutter="20"  class="el-row">
                        <el-col :span="11">
                            <el-form-item label="商品分类:" prop="cbpa07">
                                <el-input v-model="form.cbpa07" @focus="shuzhuangliebiao" placeholder="" maxlength="30" style="width:80%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" style="margin-left:-1%;">
                            <el-form-item label="商品品牌:" prop="cbpb10">
                                <!-- <el-input v-model="form.cbpb10" placeholder="" maxlength="30" style="width:55%;" /> -->
                            <el-select v-model="form.cbpb10" placeholder="" style="width:80%;">
                                <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-left:6%;">
                        <el-col :span="11">
                            <el-form-item label="商品描述:" prop="cbpb08">
                                <el-input v-model="form.cbpb08" placeholder="" maxlength="30" style="width:78%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="型号:" prop="cbpb12">
                                <!-- <el-input v-model="form.ifEnabled" placeholder="是否启用" maxlength="30" /> -->
                                <el-input v-model="form.cbpb12" placeholder="" maxlength="30" style="width:78%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-left:6%;">                          
                        <el-col :span="11">
                            <el-form-item label="UPC:" prop="cbpb15">
                                <el-input v-model="form.cbpb15" placeholder="" maxlength="30" style="width:78%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="状态:" prop="cbpb07">
                                <!-- <el-input v-model="form.cbpb07" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form.cbpb07" placeholder="" style="width:78%;">
                                <el-option v-for="dict in ZhuangTaivalue" :key="dict.value" :label="dict.label"
                                    :value="dict.label"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row v-if="false">                          
                        <el-col :span="11">
                            <el-form-item label="商品分类id" prop="cbpb14">
                                <el-input v-model="form.cbpb14" placeholder="" maxlength="30" style="width:78%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="商品描述:" prop="cbpb07">
                               <el-input v-model="form.cbpb09" placeholder="" maxlength="30" style="width:78%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                 </el-form>
                  <div style="margin-top:7%;">
                    <span style="font-size:15px;margin-left: 3%;">结算货币</span>
                    <hr />
                </div>
               <div>
            <div style="margin-left:3%; margin-top: 2%;">
              
            </div>
                        <div  width="1050px" center  :before-close="_ly_beforeClose" @close="_ly_closeDialog">                   
                <div class="hello" style="margin-top: 0.5%;margin-left: 3%;">
                    <div class="box1">
                      <table  class="tablebiankuan table-heads" width="95%" height="20px">
                            <thead style="">
                                <tr style="height:30px; ">
                                    <th style="width: 60px;height: 30px;">客户等级</th>  
                                    <th style="width: 70px;height: 30px;">结算类型</th> 
                                    <th style="width: 70px;height: 30px;">标准进价</th> 
                                    <th style="width: 90px;height: 30px;">标准销货价</th>                   
                                    <th style="width: 80px;height: 30px;">生效日期</th>
                                    <th style="width: 50px;height: 30px;font-size:23px;">
                                      <!-- <el-button plain  type="primary" @click="_ly_addFrom">+</el-button> -->
                                      <!-- <i class="el-icon-circle-plus-outline" @click="_ly_addFrom"></i> -->
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    <div class="table-bodyss" >
                     <table border="1" style=" border: solid #ffffff thin; width:1040px;height:42px; margin-top: 0.5%;"
                                cellspacing="0" class="tablebiankuan">
                      <el-row >
                     <el-form label-position="right" ref="form5" :model="form5" label-width="50px" style="margin-top:1%;"
                        :inline="true">                        
                        <!-- <el-form-item label="" v-if="false" prop="cbpc01" style="margin-left:0.8%;">
                            <el-input v-model="form.cbpc01" style="width:50%;"></el-input>
                        </el-form-item>                       -->
                            <el-col style="margin-left: 1%;" :span="7">
                                <el-form-item label="" prop="cbpf02">
                                      <el-select v-model="form5.cbpf02" placeholder="" style="width:70%;">
                                         <el-option v-for="dict in kehudengji" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                                </el-form-item>
                         </el-col>
                        <el-form-item  style="margin-left:-10%;"  label="" size="small" prop="cbpf06" >
                            <!-- <el-input type="text" v-model="form.cbpd09"  style="width:70.2%;"></el-input> -->
                             <el-select v-model="form5.cbpf06" placeholder="" style="width:78%;">
                                         <el-option v-for="dict in Currencyhuobi" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" style="margin-left:-1%;" size="small" prop="cbpf04" >
                            <el-input v-model="form5.cbpf04" style="width:74%;"></el-input>
                        </el-form-item>
                        <el-form-item label="" size="small" style="margin-left:2%;" prop="cbpf05" >
                            <el-input v-model="form5.cbpf05" style="width:74%;"></el-input>
                        </el-form-item>
                        <el-form-item label="" size="small" style="position: absolute;left: 85%;" prop="cbpf07">
                        <el-date-picker type="date" placeholder="" v-model="form.cbpf07" style="width: 100%;"> -->
                        </el-date-picker>
                            <!-- <el-input v-model="form.cbpd13" style="width:55.1%;"></el-input> -->
                        </el-form-item>
                        <!-- <i class="el-icon-remove-outline" style="position: absolute; left: 98.7%;font-size:23px;"  @click="_ly_delFrom(index)"></i> -->

                    </el-form>
                </el-row>
             </table>
                       </div>
                    </div>
                 </div>
             </div>
          </div>
            <div class="tinajia_dingweii">
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
       
        <!--修改树状菜单-->
        <el-dialog :visible.sync="open1" append-to-body>
           <el-tree :data="deptOptions" :props="defaultProps" style="height:500px;"
                        :expand-on-click-node="false" ref="tree" default-expand-all highlight-current
                        @node-click="handleNodeClick" />
        </el-dialog>

          <!--创建树状菜单-->
        <el-dialog :visible.sync="open4" append-to-body>
           <el-tree :data="deptOptions" :props="defaultProps" style="height:500px;"
                        :expand-on-click-node="false" ref="tree" default-expand-all highlight-current
                        @node-click="handleNodeClickcj" />
        </el-dialog>

        <!-- 创建 -->
        <el-dialog :title="title" :visible.sync="open2" width="90%;" style="" append-to-body class="abow_dialog5">
            <div>
                <span style="font-size:15px;margin-left: 3%;">商品基础信息</span>
                <hr />
            </div>
            <el-form ref="form2" :model="form2" :rules="rules2" style="margin-top:20px;" label-width="100px">
                   <el-row style="margin-left:6%;">
                        <el-col :span="11">
                            <el-form-item label="商品分类:" prop="cbpa07">
                                <el-input v-model="form2.cbpa07" @focus="shuzhuangliebiaocj" placeholder="" maxlength="30" style="width:80%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="商品品牌:" prop="cbpb10">
                                <!-- <el-input v-model="form.cbpb10" placeholder="" maxlength="30" style="width:55%;" /> -->
                            <el-select v-model="form2.cbpb10" placeholder="" style="width:80%;">
                                <el-option v-for="dict in ZongDingdan" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-left:6%;">
                        <el-col :span="11">
                            <el-form-item label="商品描述:" prop="cbpb08">
                                <el-input v-model="form2.cbpb08" placeholder="" maxlength="30" style="width:80%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="型号:" prop="cbpb12">
                                <!-- <el-input v-model="form.ifEnabled" placeholder="是否启用" maxlength="30" /> -->
                                <el-input v-model="form2.cbpb12" placeholder="" maxlength="30" style="width:80%;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-left:6%;">                          
                        <el-col :span="11">
                            <el-form-item label="UPC:" prop="cbpb15">
                                <el-input v-model="form2.cbpb15" placeholder="" maxlength="30" style="width:80%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="状态:" prop="cbpb07">
                                <!-- <el-input v-model="form.cbpb07" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form2.cbpb07" placeholder="" style="width:80%;">
                                <el-option v-for="dict in ZhuangTaivalue" :key="dict.value" :label="dict.label"
                                    :value="dict.label"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row v-if="false">                          
                        <el-col :span="11">
                            <el-form-item label="商品分类id" prop="cbpb14">
                                <el-input v-model="form2.cbpb14" placeholder="" maxlength="30" style="width:78%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="状态:" prop="cbpb07">
                                <!-- <el-input v-model="form.cbpb07" maxlength="30" style="width:55%;" /> -->
                                <el-select v-model="form.cbpb07" placeholder="" style="width:78%;">
                                <el-option v-for="dict in ZhuangTaivalue" :key="dict.value" :label="dict.label"
                                    :value="dict.label"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
            </el-form>
                  <div style="margin-top:7%;">
                    <span style="font-size:15px;margin-left: 3%;">结算货币</span>
                    <hr />
                </div>
               <div>
            <div style="margin-left:3%; margin-top: 2%;">
              
            </div>
            <div  width="1050px" center  :before-close="_ly_beforeClose" @close="_ly_closeDialog">                   
                <div class="hello" style="margin-top: 0.5%;margin-left: 3%;">
                    <div class="box1">
                      <table  class="tablebiankuan table-heads" width="95%" height="20px">
                            <thead style="">
                                <tr style="height:30px; ">
                                    <th style="width: 60px;height: 30px;">客户等级</th>  
                                    <th style="width: 70px;height: 30px;">结算类型</th> 
                                    <th style="width: 70px;height: 30px;">标准进价</th> 
                                    <th style="width: 90px;height: 30px;">标准销货价</th>                   
                                    <th style="width: 80px;height: 30px;">生效日期</th>
                                    <th style="width: 50px;height: 30px;font-size:23px;">
                                      <!-- <el-button plain  type="primary" @click="_ly_addFrom">+</el-button> -->
                                      <!-- <i class="el-icon-circle-plus-outline" @click="_ly_addFrom"></i> -->
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    <div class="table-bodyss" >
                     <table border="1" style=" border: solid #ffffff thin; width:1040px;height:42px; margin-top: 0.5%;"
                                cellspacing="0" class="tablebiankuan">
                      <el-row >
                     <el-form label-position="right" ref="form5" :model="form5" label-width="50px" style="margin-top:1%;"
                        :inline="true">                        
                        <!-- <el-form-item label="" v-if="false" prop="cbpc01" style="margin-left:0.8%;">
                            <el-input v-model="form.cbpc01" style="width:50%;"></el-input>
                        </el-form-item>                       -->
                            <el-col style="margin-left: 1%;" :span="7">
                                <el-form-item label="" prop="cbpf02">
                                      <el-select v-model="form5.cbpf02" placeholder="" style="width:70%;">
                                         <el-option v-for="dict in kehudengji" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                                </el-form-item>
                         </el-col>
                        <el-form-item  style="margin-left:-10%;"  label="" size="small" prop="cbpf06" >
                            <!-- <el-input type="text" v-model="form.cbpd09"  style="width:70.2%;"></el-input> -->
                             <el-select v-model="form5.cbpf06" placeholder="" style="width:78%;">
                                         <el-option v-for="dict in Currencyhuobi" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" style="margin-left:-1%;" size="small" prop="cbpf04" >
                            <el-input v-model="form5.cbpf04" style="width:74%;"></el-input>
                        </el-form-item>
                        <el-form-item label="" size="small" style="margin-left:2%;" prop="cbpf05" >
                            <el-input v-model="form5.cbpf05" style="width:74%;"></el-input>
                        </el-form-item>
                        <el-form-item label="" size="small" style="position: absolute;left: 85%;" prop="cbpf07">
                        <el-date-picker type="date" placeholder="" v-model="form.cbpf07" style="width: 100%;"> -->
                        </el-date-picker>
                            <!-- <el-input v-model="form.cbpd13" style="width:55.1%;"></el-input> -->
                        </el-form-item>
                        <!-- <i class="el-icon-remove-outline" style="position: absolute; left: 98.7%;font-size:23px;"  @click="_ly_delFrom(index)"></i> -->

                    </el-form>
                </el-row>
             </table>
                       </div>
                    </div>
                 </div>
             </div>
          </div>
         <div class="tinajia_dingweii">
            <!-- <span slot="footer" class="dialog-footer" style="margin-left:2%; padding-top:-2%;"> -->
                <el-button type="primary" @click="handleAdd">保 存</el-button>
                <el-button @click="_ly_cancelDialog">取 消</el-button>
            <!-- </span> -->
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
// import { ClassifyAdd, ClassifyList, ClassifyEdit, ClassifyTreeselect, ClassifyRemove, ClassifyImport } from "@/api/Basicinformationmaintenance/Goods/index";
import { GoodsAdd, GoodsList, GoodsEdit, ClassifyTreeselect, GoodsRemove,GoodsAddss } from "@/api/Basicinformationmaintenance/Goods/index";

import * as req from "@/api/Basicinformationmaintenance/Goods/index";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "User",
    dicts: ['sys_normal_disable', 'sys_user_sex', 'sw_js_goods_if_enabled'],
    components: { Treeselect },
    data() {
        return {
            maxheight: window.innerHeight - 50,
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            idss: {},
            formArr:[],
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
            open4: false,
            // 部门名称
            deptName: undefined,
            // 默认密码
            initPassword: undefined,
            // 日期范围
            dateRange: [],
            // 岗位选项
            postOptions: [],

            projectInfo: {
                ifEnabled: '-1'
            },
            //品牌
            pongpaioptions: [{
                value: '选项1',
                label: '家具'
            }, {
                value: '选项2',
                label: '美食'
            }, {
                value: '选项3',
                label: '工具'
            }, {
                value: '选项4',
                label: '服装'
            }, {
                value: '选项5',
                label: '通话工具'
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

            //状态
            ZhuangTaivalue: [{
                value: '1',
                label: '启用'
            }, {
                value: '2',
                label: '禁用'
            }],
            value: '',

            //客户等级
            kehudengji: [{
                value: '1',
                label: '1[1]'
            }, {
                value: '2',
                label: '2[2]'
            }, {
                value: '3',
                label: '3[3]'
            }],
            value: '',

            //商品品牌
            ZongDingdan: [{
                value: '1',
                label: 'Epiphone'
            }, {
                value: '2',
                label: 'Gibson'
            }, {
                value: '3',
                label: 'Kramer'
            }, {
                value: '4',
                label: 'Steinberger'
            }, {
                value: '5',
                label: 'Mesa/Boogie'
            }, {
                value: '6',
                label: 'Maestro'
            }],
            value: '',

            //结算货币
            Currencyhuobi: [{
                value: '1',
                label: 'CNY'
            }, {
                value: '2',
                label: 'USD'
            }],
            // 角色选项
            roleOptions: [],
            // 表单参数
            form: {
                cbpb07: "",
                cbpb08: "",
                cbpb09: "",
                cbpb10: "",
                cbpb11: "",
                cbpb12: "",
                cbpb13: "",
                cbpb14: "",
                cbpb15: "",
                cala08: "",
                cbpa07:""
            },
            form5: {
                cbpf02:"",
                cbpf04:"",
                cbpf05:"",
                cbpf06:""
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
                 cbpb07: "",
                cbpb08: "",
                cbpb09: "",
                cbpb10: "",
                cbpb11: "",
                cbpb12: "",
                cbpb13: "",
                cbpb14: "",
                cbpb15: "",
                cala08: "",
                cbpa07:""
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
                url: process.env.VUE_APP_BASE_API + "/system/goods/importSwJsGoods"
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                brand: undefined,
                cbpb12: undefined,
                cbpa07: undefined,
                model: undefined,
            },
            // //列信息
            //  columns: [
            //    { key: 0, label: `品牌`, visible: true },
            //    { key: 1, label: `型号`, visible: true },
            //    { key: 2, label: `upc`, visible: true },
            //    { key: 3, label: `描述`, visible: true }
            // ],
            // 表单校验
            rules2: {
                cbpb08: [
                    { required: true, message: '商品名称不能为空', trigger: 'blur' },
                ],
                cbpb12: [
                    { required: true, message: '型号不能为空', trigger: 'blur' },
                ],
                upc: [
                    { required: true, message: 'upc不能为空', trigger: 'blur' },
                ],
                currency: [
                    { required: true, message: '结算货币不能为空', trigger: 'blur' },
                ],
                fprice: [
                    { required: true, message: '价格不能为空', trigger: 'blur' },
                ],
                tprice: [
                    { required: true, message: '价格不能为空', trigger: 'blur' },
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
       this.form.cbpb09 =  this.form.cbpb08; 

        this.getList();
        this.getTreeselect();

        // //输入框校验
        // this.modeltext();
        // this.getConfigKey("sys.user.initPassword").then(response => {
        //   this.initPassword = response.msg;
        // });
        // console.log(response.msg,777777);
        // this.form2.ifEnabled = this.ifEnabledoptions[0].label;
    },
    methods: {
         
        //修改树状列表
        shuzhuangliebiao(){
            this.open1 = true;
        },
         //创建树状列表
        shuzhuangliebiaocj(){
            this.open4 = true;
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
                .catch(_ => { })
        },
        // 点击【保存】按钮后，如果每行的表单验证成功则存储数据
       _ly_ok() {
            let count = this.formArr.length // 记录当前有多少个表单
            for (var index in this.formArr) {
                var form = this.formArr[index]
                console.log(form)
                // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
                this.$refs[form.formName][0].validate((valid, obj) => {
                    if (valid) {
                        // 如果检查通过，则对count减1。
                        // 当count为1时，表示是最后一个表单，则存储数据
                        GoodsAddss(JSON.stringify(this.formArr)).then(response => {
                            if(response.code=="200"){
                                // this.formArr=[]
                                // this.form2={
                                //     cbpc07: "",
                                //     cbpc08: "",
                                //     cbsa08: "",
                                //     cbwa09: "",
                                //     cala08: "",
                                //     cbpc100: "",
                                //     cbpc099: "",
                                //     cbpc166: "",
                                //     cbpc10: "",
                                //     cbpc09: "",
                                //     cbpd09: "",
                                //     cbpd11: "",
                                //     cbpd12: "",
                                //     cbpc16: "",
                                //     cbpc12: "",
                                //     cbpc14: "",
                                //     cbpd08: "",
                                //     cbph09:"",
                                //     cbph10: "",
                                //     cbph11: "",
                                //     cbpg161:"",
                                //     cbpc01:"",
                                //     cbpc000:"",
                                //     cbpd09:"",
                                //     cbpd11:"",
                                //     cbpd12:""
                                // }
                            }
                        if (count-- === 1) {
                            this._ly_save()
                        }
                        this._ly_addFrom()
                    //    this.formArr.cbpg01="1234567";
                    //    this.form.cbpg01=this.formArr.cbpg01;
                    //    console.log(this.form.cbpg01,85203);
                    });

                    } else {
                        console.log(obj)
                        return false
                    }
              })
            }
            console.log('_ly_ok:' + JSON.stringify(this.formArr))
        },

   



        // 存储表单数据
        _ly_save() {
            this.$message.success('添加成功')
            // 将数据传递给父组件。
            // 如果要将数据存储到后台，可在此处自行实现
            this.$emit('on-ok', this.formArr)
        },
        // 增加一行表单
        _ly_addFrom() {
            if (this.formArr.length >= 10) {
                this.$message.warning('最多只能添加10行')
                this.reset01();
                // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
                return
                
            }

            this.formArr.push({
                formName: 'myform' + (new Date()).getTime(), // myform1648431132399
                cbsc08: '',
                cbsc09: '',
                cbsc10: '',
                branch: '',
                cbpc01: this.form2.cbpg161,
                cbpd08: this.form2.cbpd08,
            })
        },
        // 删除一行表单
        _ly_delFrom(index) {
            console.log('index: ' + index)
            this.formArr.splice(index, 1)
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
            let formName = this.formArr[index].formName
            this.$refs[formName + '_select'][0].blur() // myform1648431132399_select
        },




      //列表表头设置
      headClassGDC() {
        return {
          'text-align': 'left',
          height: '30px',
          padding: '0'
        }
      },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            GoodsList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                console.log(response.rows, 123456);
                this.userList = response.data.rows;
                this.total = response.data.total;
                console.log(response, 3369);
                console.log(response.data.content, 339688);
                this.loading = false;
            }
            );
        },
        /** 查询部门下拉树结构 */
        getTreeselect() {
            ClassifyTreeselect().then(response => {
                response.data.forEach((res) => {
                    res.code = res.label ? res.label.substring(res.label.indexOf("~") + 1) : ""
                    res.label = res.label ? res.label.substring(0, res.label.indexOf("~")) : ""
                    if (res.children) {
                        res.children.forEach((i) => {
                            i.code = i.label ? i.label.substring(i.label.indexOf("~") + 1) : ""
                            i.label = i.label ? i.label.substring(0, i.label.indexOf("~")) : ""
                        })
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
            this.form.cbpa11 = "";
            for (let i = 0; i < (data.code.split("~")).length - 1; i++) {
                if (i != 0) {
                    this.form.cbpa11 += ("~" + (data.code.split("~"))[i])
                } else {
                    this.form.cbpa11 += (data.code.split("~"))[i]
                }
            }
            // this.form.classifyNum =  data.code ? data.code.substring(0,data.code.indexOf("-") ):""//data.label.substring(v1.length+1, data.label.length);
            this.form.cbpa07 = data.label
            this.form.cbpb14 = (data.code.split("~"))[data.code.split("~").length - 1]
            // console.log(data.code ? data.code.substring(data.code.indexOf("-") + 1) : "");
            this.open1 = false;
            this.handleQuery();
        },

        // 节点单击事件
     handleNodeClickcj(data) {
            this.form.cbpa11 = "";
            for (let i = 0; i < (data.code.split("~")).length - 1; i++) {
                if (i != 0) {
                    this.form.cbpa11 += ("~" + (data.code.split("~"))[i])
                } else {
                    this.form.cbpa11 += (data.code.split("~"))[i]
                }
            }
            // this.form.classifyNum =  data.code ? data.code.substring(0,data.code.indexOf("-") ):""//data.label.substring(v1.length+1, data.label.length);
            this.form2.cbpa07 = data.label
            this.form2.cbpb14 = (data.code.split("~"))[data.code.split("~").length - 1]
            // console.log(data.code ? data.code.substring(data.code.indexOf("-") + 1) : "");
             this.open4 = false;
            this.handleQuery();
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        cancells(){
            this.open2=false;
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
                cbpb07: undefined,
                cbpb08: undefined,
                cbpb09: undefined,
                cbpb10: undefined,
                cbpb11: undefined,
                cbpb12: undefined,
                cbpb13: undefined,
                cbpb14: undefined,
                cbpb15: undefined,
                currency:undefined,
                fprice:undefined,
                tprice:undefined
            };
            this.resetForm("form2");
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
            this.ids = selection;
            this.idss = selection.map(item => item.cbpb01);
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
        /** 新增按钮操作 GoodsAddss */
        handleAdd() {
            this.$refs["form2"].validate((item) => {
                if (item) {
                    GoodsAdd(this.form2).then(response => {
                        // console.log(this.from.parent_id, 123456789);
                        // this.classifyId = response.posts;
                        // console.log(response.posts,123456);
                        this.$message({ message: '添加成功', type: 'success', style: 'color:red;!important' });
                        // this.getTreeselect();
                        // this.submitShangpin();
                        this.getTreeselect();
                        this.open2 = false;
                        // this.submitShangpin();
                        this.getList();
                        this.reset01();
                        this.handleAdds();
                        // console.log(this.form2.ifEnabled, 123456);
                    });
                } else {
                    this.$message.error('请注意规范');
                }
            })
        },

         /** 新增按钮操作 GoodsAddss */
             handleAdds() {
                    GoodsAddss(this.form5).then(response => {
                        // console.log(this.from.parent_id, 123456789);
                        // this.classifyId = response.posts;
                        // console.log(response.posts,123456);
                        // this.$message({ message: '添加成功', type: 'success', style: 'color:red;!important' });
                        // this.getTreeselect();
                        // this.submitShangpin();
                        this.getTreeselect();
                        // this.submitShangpin();
                        this.getList();
                        this.reset01();
                        // console.log(this.form2.ifEnabled, 123456);
                    });
        },

        handlechuangjiang() {
            this.open2 = true;
        },
        /** 修改按钮操作 */
        handleUpdate() {
            this.open = true;           
                let row = {}
                row.cbpb01 = this.form.cbpb01;
                row.cbpa07 = this.form.cbpa07;
                row.cbpb08 = this.form.cbpb08;
                row.cala08 = this.form.cala08;
                row.cbpb14 = this.form.cbpb14;
                row.cbpb12 = this.form.cbpb12;
                row.cbpb13 = this.form.cbpb13;
                row.cbpb15 = this.form.cbpb15;
                row.cbpb07 = this.form.cbpb07;
                row.cbpb10 = this.form.cbpb10;
                console.log(this.form.cbpb01);
                GoodsEdit(JSON.stringify(row)).then(response => {

                    // this.form = response.data;
                    // this.classifyId = response.classify_id;
                    // this.brand = response.brand;
                    // this.model = response.model;
                    // this.upc = response.upc;
                    // this.description = response.description;
                    // this.if_enabled = response.if_enabled;
                    this.getTreeselect();
                    this.open = false;
                    // this.submitShangpin();
                    this.getList();
                    this.handleAdds();

                    this.$message({ message: '恭喜你，修改成功', type: 'success' });

                });

        },
        /** 修改详情按钮操作**/
        handlexiangqengSelect(row) {
           if(row.cbpb10=="1")
            {
                this.form.cbpb10="Epiphone";
                row.cbpb10= "1";
            }else if(row.cbpb10=="2")
            {
                this.form.cbpb10="Gibson"
                row.cbpb10= "2";
            }else if(row.cbpb10=="3")
            {
                this.form.cbpb10="Kramer"
                row.cbpb10= "3";
            }else if(row.cbpb10=="4"){
                this.form.cbpb10="Steinberger"
                row.cbpb10= "4";
            }
            else if(row.cbpb10=="5"){
                this.form.cbpb10="Mesa/Boogie"
                row.cbpb10= "5";
            } else if(row.cbpb10=="6"){
                this.form.cbpb10="Maestro"
                row.cbpb10= "6";
            }
            this.open = true;
            console.log(row, 7788521);
             this.form= row;
            // this.getList();
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
        handleDelete(row) {

            // row.classifyId = this.form.classifyId;
            // row.brand = this.form.brand;
            // row.model = this.form.model;
            // row.upc = this.form.upc;
            // row.description = this.form.description;
            // row.ifEnabled = this.form.ifEnabled;
            console.log(row.id,8523952);
            console.log(row,123852);
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
            this.$modal.confirm('是否确认删除ID为"' + JSON.stringify(this.idss) + '"的数据项？').then(() => {
                userIds.forEach((item) => {
                    req.GoodsRemove(JSON.stringify(item)).then((res) => {
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
        this.$modal.confirm('是否确认删除ID为"' + row.cbpb01 + '"的数据项？').then(function () {
          return GoodsRemove(JSON.stringify(row));
        }).then((response) => {
          this.submitShangpin();
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => { });
      },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/system/goods/SwJsGoodsexport', {
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
            this.download('/system/goods/importTemplate', {
            }, `user_${new Date().getTime()}.xlsx`)
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
    mounted() {
         // 初始化表单数据，至少有一行表单数据
        this.formArr = []
        this._ly_addFrom()
    },
    watch: {
        visible(newVal) {
            this.dialogVisible = newVal
            if (this.dialogVisible === false) {
                // 重新打开弹窗时，初始化表单数据，至少有一行表单数据
                this.formArr = []
                this._ly_addFrom()
            }
        }
    }
};
</script>
<style src="./GoodsCss/index.css">
</style>
