<template>
    <div>
        <el-form ref="form2" :model="form2" label-width="30%" :rules="rules" style="">
            <div class="chuangjiancaigous">仓库盘点明细表</div>

            <el-row>
                <el-col style="margin-left: 2%;" :span="7">
                    <el-form-item label="编号:" style="margin-left:10%;">
                        <el-input type="text" v-model="form2.cbpc07" style="width: 50%;" />
                    </el-form-item>
                </el-col>
                <el-col style="" :span="7">
                    <el-form-item label="仓库:" prop="cbpc100">
                        <el-popover placement="bottom-start" trigger="click">
                            <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width:260px!important;" />
                            <el-input slot="reference" v-model="form2.cbpc100" placeholder="" readonly
                                style="border:solid #eee thin; width:87%;">
                            </el-input>
                        </el-popover>
                    </el-form-item>
                </el-col>

                <el-col style="" :span="7">
                    <el-form-item label="日期:">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="" v-model="form2.cbpc08" style="width: 110%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
                    <el-col style="margin-top:-0.4%;margin-left: 2%;" :span="7">
                        <el-form-item label="联系人:" prop="cbsa08">
                            <el-input v-model="form.cbsa08" maxlength="30" style="width:80%;border:solid #eee thin" />
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:-0.4%;margin-left: -3%;" :span="7">
                        <el-form-item label="电话:" prop="cbsa08">
                            <el-input v-model="form.cbsa08" placeholder="" maxlength="30"
                                style="width:80%;border:solid #eee thin" />
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:-0.4%;margin-left: -3%;" :span="7">
                        <el-form-item label="客户等级:" prop="cbsa08">
                            <el-select v-model="form.cbsa08" placeholder="" style="width:80%;border: solid #eee thin;">
                                <el-option v-for="item in ponpaixenghaomiaoshu" :key="item.brand" :label="item.brand"
                                    :value="item.brand">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="margin-top:-0.4%;margin-left: 2%;" :span="7">
                        <el-form-item label="结算货币:" prop="cbsa08">
                            <el-select v-model="form.cbsa08" placeholder="" style="width:80%;border: solid #eee thin;">
                                <el-option v-for="item in ponpaixenghaomiaoshu" :key="item.brand" :label="item.brand"
                                    :value="item.brand">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:-0.4%;margin-left: -3%;" :span="7">
                        <el-form-item label="收货人:" prop="cbsa08">
                            <el-input v-model="form.cbsa08" placeholder="" maxlength="30"
                                style="width:80%;border:solid #eee thin" />
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:-0.4%;margin-left: -3%;" :span="7">
                        <el-form-item label="关联订单:" prop="cbsa08">
                            <el-input v-model="form.cbsa08" placeholder="" maxlength="30"
                                style="width:80%;border:solid #eee thin" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="margin-top:-0.4%;margin-left: 2%;" :span="7">
                        <el-form-item label="收货电话:" prop="cbsa08">
                            <el-input v-model="form.cbsa08" maxlength="30" style="width:80%;border:solid #eee thin" />
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-top:-0.4%;margin-left: -3%;" :span="7">
                        <el-form-item label="收货地址:" prop="cbsa08">
                            <el-input v-model="form.cbsa08" placeholder="" maxlength="30"
                                style="width:80%;border:solid #eee thin" />
                        </el-form-item>
                    </el-col> -->
            <!-- </el-row> -->
            <el-table :data="tableData" border :row-style="{ height: '10px' }"
            :cell-style="{ padding: '5px' }" style="width: 99%; margin-top: 10px; margin-left: 0.5%">
                <el-table-column
                    type="index"
                    width="50"
                    label="编号">
                </el-table-column>
                <el-table-column prop="cala08" label="品牌">
                    <template slot-scope="scope">
                    <el-input readonly v-model="scope.row.cala08" placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="cbpb15" label="UPC">
                    <template slot-scope="scope">
                    <el-input readonly v-model="scope.row.cbpb15" v-only-number="{ precision: 0.0 }" placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="cbpb12" label="型号">
                    <template slot-scope="scope">
                    <el-input readonly v-model="scope.row.cbpb12" v-only-number="{ precision: 0.0 }" placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="cbpb08" label="描述">
                    <template slot-scope="scope">
                        <el-input readonly v-model="scope.row.cbpb08" placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="sn" label="商品SN">
                    <template slot-scope="scope">
                    <el-input readonly v-model="scope.row.sn"  placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="statuss" label="状态">
                    <template slot-scope="scope">
                    <el-input readonly v-model="scope.row.statuss" placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="cbpc14" label="备注">
                    <template slot-scope="scope">
                    <el-input v-model="scope.row.cbpc14" placeholder=""
                        class="shuzicaoyou" style=""></el-input>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="scope">
                    <span @click="_ly_delFrom(scope.row)">
                        <i class="el-icon-delete" style="color: red"></i>
                    </span>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- 不用 -->
            <div class="hellos" style="margin-top: 0.5%;margin-left: 1%;" v-show="false">
                <div class="box1s">
                    <table border="1" style=" border: solid #eee thin;" cellspacing="0" cellpadding="1"
                        class="tablebiankuans table-heads" width="98%" height="40px">
                        <thead style=" border: solid #eee thin;">
                            <tr style="height:40px; border: solid #eee thin;">
                                <th style="width: 40px; border: solid #eee thin;text-align: left;">序号</th>
                                <th style="width:153px; border: solid #eee thin;text-align: left;">品牌</th>
                                <th style="width:162px; border: solid #eee thin;text-align: left;">UPC</th>
                                <th style=" width:163px; border: solid #eee thin;text-align: left;">型号</th>
                                <th style=" border: solid #eee thin;width:120px;text-align: left;">描述</th>
                                <th style=" border: solid #eee thin;width:128px;text-align: left;">商品SN</th>
                                <th style=" border: solid #eee thin;width:110px;text-align: left;">库位</th>
                                <th style=" border: solid #eee thin;width:110px;text-align: left;">状态</th>
                                <th style=" border: solid #eee thin;width: 130px;text-align: left;">备注</th>
                                <!-- <th style=" border: solid #eee thin;width: 64px;text-align: left;">操作</th> -->
                            </tr>
                        </thead>
                    </table>
                    <div class="table-bodys" style="">
                        <table border="1" style=" border: solid #ffffff thin; width:1610px;height:42px;" cellspacing="0"
                            class="tablebiankuans">
                            <tr style="">
                                <td style="width: 45px;border:solid #eee thin;">1</td>
                                <td style="width: 172px;  border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpc07" style="" />
                                </td>
                                <td style="width: 182px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpc12" style="" />
                                </td>
                                <td style="width: 182px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpd08" id="input1" style="" />
                                </td>
                                <td style="width: 135px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpd09" style="" />
                                </td>
                                <td style=" width: 143px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpd11" id="input3" style="" />
                                </td>
                                <td style="width: 123px;border:solid #eee thin;">
                                    <el-input v-model="form2.cbpd12" style="width:81px;"></el-input>
                                </td>
                                <td style="width: 123px;border:solid #eee thin;">
                                    <el-input v-model="form2.cbpd12" style="width:81px;"></el-input>
                                </td>

                                <td style="width: 143px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpc14" style="" />
                                </td>
                                <!-- <td style="width: 68px;border:solid #eee thin;">
                                    <el-button size="mini" type="text" style=" border: 0 !important;margin-left: 10px;"
                                        icon="el-icon-plus" @click="addData">添加
                                    </el-button>
                                </td> -->
                            </tr>
                            <tr v-for="(item, index) in tianjiahang" :key="index">
                                <td style="width: 45px;border:solid #eee thin;">{{ (index + 1) + 1 }}</td>
                                <td style="width: 172px;  border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpc07" style="" />
                                </td>
                                <td style="width: 182px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpc12" style="" />
                                </td>
                                <td style="width: 182px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpd08" id="input1" style="" />
                                </td>
                                <td style="width: 135px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpd09" @blur="chen()" style="" />
                                </td>
                                <td style=" width: 146px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpd11" id="input3" style="" />
                                </td>
                                <td style="width: 124px;border:solid #eee thin;">
                                    <el-input-number v-model="form2.cbpd12" :min="0" :controls="false" :precision="2"
                                        style="width:81px;"></el-input-number>
                                </td>

                                <td style="width: 146px;border:solid #eee thin;">
                                    <el-input type="text" v-model="form2.cbpc14" style="" />
                                </td>
                                <td style="width: 68px;border:solid #eee thin;">
                                    <el-button size="mini" type="text" style=" border: 0 !important;margin-left: 10px;"
                                        icon="el-icon-delete" @click="deletData(index)">删除
                                    </el-button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </el-form>
        <div>
            <div style="height:80px;"></div>
            <el-button type="primary" class="buttonbaocuens" @click="handleAdd">保存</el-button>
            <el-button @click="handleChuangJiangone" style="margin-left:1%">取 消</el-button>
        </div>
    </div>
</template>

<script>
import { SwJsStoreadd,swJsStoreaddss } from "@/api/Warehousemanagement/PurchaseWarehousing";
import { getToken } from "@/utils/auth";
//仓库
import kuweixxweihu from "@/components/WarehouseInfoSku";
//供应商
import supplierMaintenance from "@/components/SupplierMaintenance";

//供应商
import ListLists from "@/components/ListMaintenance";
// 仓库查询
import { Inventorysummaryquerys } from "@/api/statisticAnalysis/index";

export default {
    name: "AuthUser",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
    components: { kuweixxweihu, supplierMaintenance, ListLists },
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
                cbpc16: ""

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
                cbsh10: "",
                cbsh09: 0,
                cbpd09: "",
                cbpd11: "",
                cbpd12: "",
                cbpc16: "",
                cbpc12: "",
                cbpc14: "",
                cbpd08: ""
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
                cbpc099: [
                    { required: true, message: "供料单位不能为空!", trigger: "blur" }
                ],
                cbpc100: [
                    { required: true, message: "仓库不能为空!", trigger: "change" }
                ],
                cbpc16: [
                    { required: true, message: "结算货币不能为空!", trigger: "blur" }
                ],
                cbpc07: [
                    { required: true, message: "编号不能为空!", trigger: "blur" }
                ]
            },
            tableData:[],


        };
    },
    watch: {
        // 根据名称筛选部门树
        deptName(val) {
            this.$refs.tree.filter(val);
        },
    },
    created() {

        this.getConfigKey("sys.user.initPassword").then(response => {
            // this.initPassword = response.msg;
        });
        this.getDicts("sw_js_store_type").then(response => {
            this.form.type = response.rows;
        });
        // this.form.type = this.dict[0].label;
        // this.userList.housingTime.substring(0, this.userList.housingTime.indexOf("T"));
        // console.log(this.userList,123456789);


        console.log(this.form.cbpc16, 123456);

    },
    methods: {

        show() {
            this.showSearch = !this.showSearch;
        },

        chen() {
            this.form2.cbpd11 = "20"
            this.form2.cbpd12 = this.form2.cbpd11 * this.form2.cbpd09;
        },
        //添加模块-仓库
        selected01(name) {
            // this.$set(this.form2,"cbpc100",name.substring(0, name.indexOf("-")))
            this.form2.cbpc100 = name.substring(0, name.indexOf("-"))
            this.form2.cbsh10 = name.substring(name.indexOf("-") + 1)
            // this.form2.icon = name;
            this.onSearch(this.form2.cbpc100)
            
        },
        onSearch(whName) {
            this.loading = true;
            let obj = {
                // pageNum:1,
                pageSize:999999,
                cbwa09s:[whName],
            }
            Inventorysummaryquerys(obj).then(response => {
                this.loading = false;
                console.log(response)
                if (response.data != null && response.data.rows != null) {
                    this.tableData = response.data.rows
                    this.tableData.map((item) =>{
                        if(item.status == 1){
                            item.statuss = '已入库'
                        }else if(item.status == 2){
                            item.statuss = '出库中'
                        }else{
                            item.statuss = '已出库'
                        }
                    })
                    // this.total = response.data.total
                }
            },error => {
                this.loading = false;
            })
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
                    SwJsStoreadd(this.form2).then(response => {
                        // console.log(response.posts, 12345678);
                        if(response.code == 200){
                            // this.$message({ message: '恭喜你，添加成功', type: 'success', style: 'color:red;!important' });
                            // this.getTreeselect();
                            // this.submitShangpin();
                            this.handleAdds(response.data.id)
                            console.log(this.item, 123456);
                        }
                    });
                } else {
                    this.$message.error('请注意规范');
                }
            })

        },
        handleAdds(zhuid){
            let arr = []
            for(let i = 0;i<this.tableData.length;i++){
                arr.push({
                    "cbsh01": zhuid,
                    // "cbsj01": 0,
                    // "cbsj08": this.tableData[i].id,
                    "cbsj09": this.tableData[i].sn,
                    "cbsj10": this.tableData[i].id,
                    // "cbsj11": 0,
                    // "cbsj12": "string",
                })
            }
            swJsStoreaddss(arr).then((res) =>{
                if(res.code == 200){
                    this.$message({ message: '恭喜你，添加成功', type: 'success', style: 'color:red;!important' });
                    this.$tab.closePage();
                    this.$router.go(-1);
                    this.submitShangpin();
                    this.open2 = false;
                    this.reset01(); 
                }
            })
        },

        /** 创建操作 */
        handleChuangJiangone: function (row) {
            // this.$router.push("/system/user-auth/role/");
            // this.$router.push("/system/user-ckpdmxbfh/role/");
            this.$tab.closePage();
            this.$router.go(-1)
        },





    },
    computed: {

    },
    mounted() {

    }
};
</script>
<style src="./WarehouseInventorycjcss/index.css">

</style>