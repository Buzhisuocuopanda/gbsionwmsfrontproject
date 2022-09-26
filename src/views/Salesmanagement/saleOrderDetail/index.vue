<template>
  <div class="app-container">
    <el-form ref="form2" :model="form2" label-width="130px" :rules="rules" style="">
      <div class="chuangjiancaigous">销售订单</div>

      <!-- 编号:56221589223 -->

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-form-item label="编号:" prop="orderNo">
<!--            <el-input type="text" v-model="form2.cbpc07" style="width: 60%;" />-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户单号:" prop="customerNo">
            <el-input type="text" v-model="formData.customerNo" style="width: 70%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期:" prop="orderDate">
            <el-date-picker type="date" placeholder="" v-model="formData.orderDate" style="width: 70%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-row :gutter="20">-->
<!--        <el-col v-if="false" style="margin-top:-0.4%;margin-left: -3%;" :span="7">-->
<!--          <el-form-item label="主副表id:" prop="cbpg161">-->
<!--            <el-input v-model="form2.cbpg161" placeholder="" maxlength="30" style="width:80%;" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col style="" :span="8">-->
<!--          <el-form-item label="供料单位:" prop="cbpc099">-->
<!--            <el-popover placement="bottom-start" trigger="click">-->
<!--              <supplierMaintenance ref="supplierMaintenance" @selected="selected02" style="width:220px!important;" />-->
<!--              <el-input slot="reference" v-model="form2.cbpc099" placeholder="" readonly style="width:80%;">-->
<!--              </el-input>-->
<!--            </el-popover>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col style="" :span="8">-->
<!--          <el-form-item label="仓库:" prop="cbpc100">-->
<!--            <el-popover placement="bottom-start" trigger="click">-->
<!--              <kuweixxweihu ref="kuweixxweihu" @selected="selected01" style="width:260px!important;" />-->
<!--              <el-input slot="reference" v-model="form2.cbpc100" placeholder="" readonly style="width:80%;">-->
<!--              </el-input>-->
<!--            </el-popover>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col style="" :span="8">-->
<!--          <el-form-item label="结算货币:" prop="cbpc16">-->
<!--            <el-select v-model="form2.cbpc16" placeholder="" style="width:80%;">-->
<!--              <el-option v-for="item in jiageLeixeng" :key="item.value" :label="item.label" :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash; <el-form-item label="结算货币:" prop="cbpc166">-->
<!--                  <el-popover placement="bottom-start" trigger="click">-->
<!--                      <ListLists ref="ListLists" @selected="selected004" />-->
<!--                      <el-select slot="reference" v-model="form2.cbpc166" placeholder="" readonly-->
<!--                          style="border:solid #eee thin; width:77%;">-->
<!--                      </el-select>-->
<!--                  </el-popover>-->
<!--              </el-form-item> &ndash;&gt;-->
<!--        </el-col>-->
<!--        &lt;!&ndash;商品信息维护&ndash;&gt;-->
<!--        <el-col v-if="false">-->
<!--          <el-form-item label="" prop="cbpd08" style="margin-left:0.8%;">-->
<!--            <el-input v-model="form2.cbpd08" style="border:solid #eee thin;width:70%;"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row :gutter="20" style="margin-top: 1px;">
        <el-col :span="8">
          <el-form-item label="客户:" prop="customerId">
            <el-select @change="customerOnChange" v-loadmore="customerloadMore" v-model="formData.customerId" filterable clearable :filter-method="customerdataFilter" placeholder="请选择" style="width: 70%;">
              <el-option
                v-for="item in customeroptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="销售人员:" prop="saleUserId">
            <el-select v-loadmore="saleUserloadMore" v-model="formData.saleUserId" filterable clearable :filter-method="saleUserdataFilter" placeholder="请选择" style="width: 70%;">
              <el-option
                v-for="item in saleUseroptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算货币:" prop="currency">
            <el-select  v-model="formData.currency"  clearable  placeholder="请选择" style="width: 70%;">
              <el-option
                v-for="item in currencyoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="收货人:" prop="receiveName">
            <el-input type="text" v-model="formData.receiveName" style="width: 70%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话:" prop="receivePhone">
            <el-input type="text" v-model="formData.receivePhone" style="width: 70%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票类型:" prop="invoiceType">

            <el-select  v-model="formData.invoiceType"  clearable  placeholder="请选择" style="width: 70%;">
              <el-option
                v-for="item in invoiceoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="订单类型:" prop="orderTypeMsg">
            <el-input type="text" v-model="formData.orderTypeMsg" style="width: 70%;" disabled/>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="工厂账号:" prop="fcNumber">
            <el-input type="text" v-model="formData.fcNumber" style="width: 70%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单分类:" prop="orderClassMsg">
            <el-input type="text" v-model="formData.orderClassMsg" style="width: 70%;"  disabled/>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="地址:" prop="address">
            <el-input type="text" v-model="formData.address" style="width: 120%;" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注:" prop="remark">
            <el-input type="text" v-model="formData.remark" style="width: 120%;" />
          </el-form-item>
        </el-col>
      </el-row>

<!--      <el-row v-if="false">-->
<!--        <el-col style="margin-top:-0.4%;margin-left: 2%;" :span="7">-->
<!--          <el-form-item label="供应商id:" prop="cbpc09">-->
<!--            <el-input v-model="form2.cbpc09" maxlength="30" style="width:80%;border:solid #eee thin" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col style="margin-top:-0.4%;margin-left: -3%;" :span="7">-->
<!--          <el-form-item label="仓库id:" prop="cbpc10">-->
<!--            <el-input v-model="form2.cbpc10" placeholder="" maxlength="30" style="width:80%;border:solid #eee thin" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        &lt;!&ndash; 商品信息维护 &ndash;&gt;-->
<!--        <el-col>-->
<!--          <el-form-item label="" v-if="false" prop="cbpd08" style="margin-left:0.8%;">-->
<!--            <el-input v-model="form2.cbpd08" style="border:solid #eee thin;width:70%;"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <div>
        <el-row>
          <el-col :span="24">
            <el-button plain style="float: right;" type="primary" @click="_ly_addFrom">新增一行</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border :span-method="arraySpanMethod" style="width: 100%;margin-top: 10px;">
          <el-table-column prop="goodsId" label="品牌" width="">
            <template slot-scope="scope">
              <sapn>
                <el-select @change="goodsOnChange(scope.row)" v-loadmore="loadMore" v-model="scope.row.goodsId" filterable clearable :filter-method="dataFilter" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column label="型号" width="" />
          <el-table-column label="描述" width="" />
          <el-table-column prop="qty" label="数量" width="150" >
            <template slot-scope="scope">
              <sapn>
                <el-input  @change="goodsQtyChange(scope.row)" v-model="scope.row.qty"  placeholder="数量"  @input="sum(scope.row)" oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
<!--                <el-input :id="scope.row.goodsId"  :class="this.qtyclass" v-model="scope.row.qty"  placeholder="数量" style="" @input="sum(scope.row)"  ></el-input>-->
              </sapn>
            </template>
          </el-table-column>
          <el-table-column prop="normalPrice" label="标准单价" width="150">
            <template slot-scope="scope">
              <sapn>
                <el-input v-model="scope.row.normalPrice" placeholder="标准单价" style="" readonly></el-input>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column prop="currentPrice" label="本次单价" width="150">
            <template slot-scope="scope">
              <sapn>
                <el-input v-model="scope.row.currentPrice" placeholder="本次单价" style="" @input="sum(scope.row)" oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
              </sapn>
            </template>
          </el-table-column>

          <el-table-column prop="totalPrice" label="金额" width="150">
            <template slot-scope="scope">
              <sapn>
                <el-input  v-model="scope.row.totalPrice" placeholder="金额" style="" readonly></el-input>
              </sapn>
            </template>
          </el-table-column>

          <el-table-column prop="canUseSku" label="可用库存" width="150">
            <template slot-scope="scope">
              <sapn>
                <el-input v-model="scope.row.canUseSku" placeholder="可用库存" style="" readonly></el-input>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="">
            <template slot-scope="scope">
              <sapn>
                <el-input v-model="scope.row.remark" type="textarea" placeholder="备注"></el-input>
              </sapn>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <span @click="_ly_delFrom(scope.row)">
                <i class="el-icon-error" style="color: red;"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div width="1050px" center :before-close="_ly_beforeClose" @close="_ly_closeDialog">
          <div class="hello" style="margin-top: 0.5%;margin-left: 3%;">
            <div class="box1">
              <table border="1" style="border:solid #eee thin;" cellspacing="0" cellpadding="1"
                class="tablebiankuan table-heads" width="95%" height="20px">
                <thead style="">
                  <tr style="height:30px; ">
                    <th style="width: 130px;height: 30px;">品牌</th>
                    <th style="width: 130px;height: 30px;">型号</th>
                    <th style="width: 130px;height: 30px;">描述</th>
                    <th style="width: 140px;height: 30px;">数量</th>
                    <th style="width: 140px;height: 30px;">单价</th>
                    <th style="width: 140px;height: 30px;">金额</th>
                    <th style="width: 350px;height: 30px;">备注</th>
                    <th style="width: 50px;height: 30px;">操作</th>
                  </tr>
                </thead>
              </table>
              <div class="table-bodys">
                <table border="1" style=" border: solid #ffffff thin; width:1040px;height:42px; margin-top: 0.5%;"
                  cellspacing="0" class="tablebiankuan">
                  <el-row v-for="(form, index) in formArr" style="width:110%;margin-bottom: -1.1%;" :key="index">
                    <el-form label-position="right" label-width="50px" style="margin-top:1%;" :model="form"
                      :ref="form.formName" :inline="true">
                      <el-form-item label="" v-if="false" prop="cbpc01" style="margin-left:0.8%;">
                        <el-input v-model="form.cbpc01" style="width:70%;"></el-input>
                      </el-form-item>
                      <el-col style="margin-left: 0%;" :span="7">
                        <el-form-item label="" prop="cbpc000">
                          <el-popover placement="bottom-start" trigger="click">
                            <Goodsone01 ref="Goodsone01" @selected="selected08($event,index)"
                              style="width:370px!important;" />
                            <el-input slot="reference" v-model="form.cbpc000" placeholder="" readonly
                              style="width:205.6%;">
                            </el-input>
                          </el-popover>
                        </el-form-item>
                      </el-col>
                      <el-form-item label="" size="small" prop="nickname" style="margin-left:5.1%;">
                        <el-input type="text" v-model="form.cbpd09" @blur="chen(form)" style="width:73.2%;"></el-input>
                      </el-form-item>
                      <el-form-item label="" size="small" prop="cbpd11" style="margin-left:-5.3%;">
                        <el-input-number v-model="form.cbpd11" @blur="chen(form)" :min="0" :controls="false"
                          :precision="2" style="width:74%;"></el-input-number>
                      </el-form-item>
                      <el-form-item label="" size="small" prop="cbpd12" style="margin-left:-5.3%;">
                        <el-input-number v-model="form.cbpd12" :min="0" :controls="false" :precision="2"
                          style="width:74%;"></el-input-number>
                      </el-form-item>
                      <el-form-item label="" size="small" prop="cbpd13" style="margin-left:-5.2%;">
                        <el-input v-model="form.cbpd13" style="width:184.1%;"></el-input>
                      </el-form-item>

                      <el-form-item v-if="false" label="" size="small" prop="cbpd13" style="margin-left:-4%;">
                        <el-input v-model="form.cbpd13" style="width:70%;"></el-input>
                      </el-form-item>
                      <el-form-item label="" v-if="false" prop="name" style="margin-left:0.8%;">
                        <el-input v-model="form.cbpd08" style="border:solid #eee thin;width:70%;"></el-input>
                      </el-form-item>
                      <el-button v-if="index != 0" type="danger" style="position: absolute; left: 103%;" size="small"
                        icon="el-icon-delete" circle @click="_ly_delFrom(index)"></el-button>
                    </el-form>
                  </el-row>
                </table>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </el-form>
    <div class="tinajia_dingwei">
      <!-- <span slot="footer" class="dialog-footer" style="margin-left:2%; padding-top:-2%;"> -->
      <el-button type="primary" @click="handleAdd">保 存</el-button>
      <el-button @click="_ly_cancelDialog">取 消</el-button>
      <!-- </span> -->
    </div>
  </div>
</template>

<script>
  // import { PurchaseinboundAdds } from "@/api/Warehousemanagement/SalesShipment";


  import {
    PurchaseinboundAdd,
    PurchaseinboundAdds,GoodsList01
  } from "@/api/Warehousemanagement/PurchaseWarehousing";
  import { swJsGoodslistBySelect ,SwJsCustomerlistSelect,systemUserSelect,goodsPriceAndSku,customerDetail,addSaleOrder } from '@/api/saleordermanage'

  import {
    getToken
  } from "@/utils/auth";
  //仓库
  import kuweixxweihu from "@/components/WarehouseInfoSku";
  //供应商
  import supplierMaintenance from "@/components/SupplierMaintenance";

  //商品信息维护
  import Goodsone01 from "@/components/Goodsone";

  //供应商
  import ListLists from "@/components/ListMaintenance";

  // //客户
  // import CustomerMainten from "@/components/CustomerMaintenance";

  import Vue from 'vue';
  Vue.directive('loadmore', {
    bind(el, binding) {

      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

      SELECTWRAP_DOM.addEventListener('scroll', function() {

        /*
        * scrollHeight 获取元素内容高度(只读)
        * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
        * clientHeight 读取元素的可见高度(只读)
        * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
        * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
        */
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

        if(CONDITION) {
          binding.value();
        }
      });
    }
  })
  export default {
    name: "index",
    dicts: ['sys_normal_disable', 'sw_js_store_type', 'sys_user_sex', 'sw_js_store_type_manage_mode'],
    props: {
      visible: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    components: {
      kuweixxweihu,
      supplierMaintenance,
      ListLists,
      Goodsone01
    },
    data() {
      return {
        dialogVisible: this.visible,
        formArr: [], // 表单结构数组
        goodsMsg: "",
        customerId: "",
        slaeUserId:"",
        qtyclass: "normQtyclass",
        infoRules: { // 表单规则
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
            {
              max: 20,
              message: '请输入1-20位的字符',
              trigger: 'blur'
            }
          ],
          nickname: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          },
            {
              max: 20,
              message: '请输入1-20位的字符',
              trigger: 'blur'
            }
          ],
          code: [{
            required: true,
            message: '请输入编号',
            trigger: 'blur'
          },
            {
              max: 20,
              message: '请输入1-20位的字符',
              trigger: 'blur'
            }
          ],
          branch: [{
            required: true,
            message: '请选择部门',
            trigger: 'blur'
          },
            {
              message: '请选择部门',
              trigger: 'blur'
            }
          ]
        },
        treeData: [{ // 树状数据
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentSelectIndex: -1, // 缓存当前操作第几行的select
        temp: '占位',

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

        //主副表id
        zfb: [],
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
        //发票类型
        invoiceoptions: [{
          value: '增值税专用发票',
          label: '增值税专用发票'
        }, {
          value: '增值税普通发票',
          label: '增值税普通发票'
        },{
          value: '个人普通发票',
          label: '个人普通发票'
        },{
          value: '不开发票',
          label: '不开发票'
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
          cbpc16: "",
          cbpc01: ""
        },
        formData: {
          orderType: 10,
          orderTypeMsg: "销售订单",
          orderClass: 2,
          orderClassMsg: '国内订单',
          receiveName:'',
          receivePhone: '',
          address: ''
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
          cbpc10: "",
          cbpc09: "",
          cbpd09: "",
          cbpd11: "",
          cbpd12: "",
          cbpc16: "",
          cbpc12: "",
          cbpc14: "",
          cbpd08: "",
          cbph09: "",
          cbph10: "",
          cbph11: "",
          cbpg161: "",
          cbpc01: "",
          cbpc000: "",
          cbpd09: "",
          cbpd11: "",
          cbpd12: ""
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
          headers: {
            Authorization: "Bearer " + getToken()
          },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/system/barcode/importSwJsSkuBarcode"
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        customerListQuery: {
          pageNum: 1,
          pageSize: 10
        },
        saleUserListQuery: {
          pageNum: 1,
          pageSize: 10
        },
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,

          total: this.total,
          cbpc07: undefined,
          cbsa08: undefined,
          cbwa09: undefined,
          dateRange: undefined
        },


        rules: {
          orderDate: [
            { required: true, message: '请输入日期', trigger: 'blur' },
            // { type: 'number', message: '优先级必须为数字'}
          ],
          saleUserId: [
            { required: true, message: '请输入销售人员', trigger: 'blur' },
          ],
          // goods: [
          //   { required: true, message: '请选择商品', trigger: 'blur' },
          // ],
          customerId: [
            { required: true, message: '请输入客户', trigger: 'blur' },
            // { type: 'number', message: '数量必须为数字'}
          ],
        },
        //表格参数
        tableData: [],
        dataId: 0,
        options: [],
        saleUseroptions: [],
        customeroptions: [],
        saleUseroptions: [],

        //选择集合
        currencyoptions:[
          {
            value: '6',
            label: 'CNY'
          }, {
            value: '7',
            label: 'USD'
          }
        ],

        options3: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        },
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        options2: [{
          value: '选项1',
          label: '黄金糕2'
        }, {
          value: '选项2',
          label: '双皮奶2'
        }, {
          value: '选项3',
          label: '蚵仔煎2'
        }, {
          value: '选项4',
          label: '龙须面2'
        }, {
          value: '选项5',
          label: '北京烤鸭2'
        }],
      };
    },
    computed: {
      dialogTitle() {
        return '添加'
      }
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
      this.chen();
      this.form2.cbph10 = "20"

      console.log(this.form.cbpc16, 123456);

    },
    methods: {
      // 合并单元格
      arraySpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0) {
          return [1, 3];
        } else if (columnIndex < 3) {
          return [0, 0];
        }
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
          .catch(_ => {})
      },
      // 点击【保存】按钮后，如果每行的表单验证成功则存储数据
      _ly_ok() {
        let count = this.formArr.length // 记录当前有多少个表单
        for (var index in this.formArr) {
          var form = this.formArr[index]
          console.log(form)
          console.log(JSON.stringify(form))
          // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
          this.$refs[form.formName][0].validate((valid, obj) => {
            if (valid) {
              // 如果检查通过，则对count减1。
              // 当count为1时，表示是最后一个表单，则存储数据
              PurchaseinboundAdds(JSON.stringify(this.formArr)).then(response => {
                if (response.code == "200") {
                  this.formArr = []
                  this.form2 = {
                    cbpc07: "",
                    cbpc08: "",
                    cbsa08: "",
                    cbwa09: "",
                    cala08: "",
                    cbpc100: "",
                    cbpc099: "",
                    cbpc166: "",
                    cbpc10: "",
                    cbpc09: "",
                    cbpd09: "",
                    cbpd11: "",
                    cbpd12: "",
                    cbpc16: "",
                    cbpc12: "",
                    cbpc14: "",
                    cbpd08: "",
                    cbph09: "",
                    cbph10: "",
                    cbph11: "",
                    cbpg161: "",
                    cbpc01: "",
                    cbpc000: "",
                    cbpd09: "",
                    cbpd11: "",
                    cbpd12: ""
                  }
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
        // if (this.formArr.length >= 10) {
        //   this.$message.warning('最多只能添加10行')
        //   this.reset01();
        //   // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
        //   return

        // }

        // this.formArr.push({
        //   formName: 'myform' + (new Date()).getTime(), // myform1648431132399
        //   cbsc08: '',
        //   cbsc09: '',
        //   cbsc10: '',
        //   branch: '',
        //   cbpc01: this.form2.cbpg161,
        //   cbpd08: this.form2.cbpd08,
        // })
        this.tableData.push({
          goodsId: '',
          // normalPrice: '',
          qty: '',
          canUseSku: 0,
          moner: '',
          province: '',
        })
        this.dataId++
        console.log(this.tableData);
      },
      // 删除一行表单
      _ly_delFrom(row) {
        // console.log('index: ' + index)
        // this.formArr.splice(index, 1)
        this.tableData.splice(this.tableData.indexOf(row), 1)
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






      show() {
        this.showSearch = !this.showSearch;
      },

      chen(item) {
        if (item.cbpd09 > 0 && item.cbpd11 > 0) {
          this.$set(item, 'cbpd12', (parseFloat(item.cbpd09) * parseFloat(item.cbpd11)))
        }
        // this.form2.cbpd12 = this.form2.cbpd09 * this.form2.cbpd11;
      },
      //添加模块-仓库
      selected01(name) {
        console.log(name, 123)
        console.log(name.substring(name.indexOf("-") + 1), 963);
        this.form2.cbpc100 = name.substring(0, name.indexOf("-"))
        this.form2.cbpc10 = name.substring(name.indexOf("-") + 1)
        // this.form2.icon = name;
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

      //查询商品信息维护
      selected08(e, index) {
        console.log(e, 111)
        console.log(index, 222)
        this.$set(this.formArr[index], "cbpc000", e)

        // this.formArr[index].cbpc000=''
        // this.formArr[index].cbpc000=e
        // console.log(this.formArr)
        // console.log(name.substring(name.indexOf("-") + 1), 963);
        // this.form2.cbpc099 = name.substring(0, name.indexOf("-"));
        // this.form2.cbpc09 = name.substring(name.indexOf("-") + 1);
        // this.form.cbsa08 = name.substring(0, name.indexOf("-"));
        // this.form.cbpc000 = name;
        // this.form.cbpd08  =  name.substring(name.indexOf(".") +1);
        // console.log(this.form2.cbpd08,852369421);
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
        // this.form2 = {
        //     brand: undefined,
        //     description: undefined,
        //     model: undefined,
        //     remark: undefined,
        //     skuName: undefined,
        //     sn: undefined,
        //     spuplierName: undefined,
        //     type: undefined
        // };
        // this.resetForm("form2");
        this.$refs["form2"].resetFields();
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
      saleUserloadMore(){
        const param={
          selectMsg: this.saleUserId,
          pageNum: this.saleUserListQuery.pageNum,
          pageSize: this.saleUserListQuery.pageSize
        }


        SwJsCustomerlistSelect(param).then(response => {
          if (response.code == "200") {
            this.saleUserListQuery.pageNum=this.saleUserListQuery.pageNum+1
            this.saleUseroptions.push.apply(this.saleUserListQuery,response.data.rows)
          }else {
            this.$message.error(response.msg)
          }
        });
      },
      customerloadMore(){
        const param={
          selectMsg: this.customerId,
          pageNum: this.customerListQuery.pageNum,
          pageSize: this.customerListQuery.pageSize
        }


        SwJsCustomerlistSelect(param).then(response => {
          if (response.code == "200") {
            this.customerListQuery.pageNum=this.customerListQuery.pageNum+1
            this.customeroptions.push.apply(this.customeroptions,response.data.rows)
          }else {
            this.$message.error(response.msg)
          }
        });
      },
      loadMore() {
//         console.log("滚动到底部了")
// // 这里可以做你想做的任何事 到底执行
//        this.options=this.options2
        const param={
          goodsMsg: this.goodsMsg,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize
        }


        swJsGoodslistBySelect(param).then(response => {
          if (response.code == "200") {
            this.listQuery.pageNum=this.listQuery.pageNum+1
            // this.options.push.apply(this.options,response.data.rows)
            this.options.push(...response.data.rows)
          }else {
            this.$message.error(response.msg)
          }
        });
      },
      dataFilter(val){
        this.listQuery.pageNum=1
        this.goodsMsg=val
        const param={
          goodsMsg: this.goodsMsg,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize
        }

        swJsGoodslistBySelect(param).then(response => {
          if (response.code == "200") {

            this.listQuery.pageNum=this.listQuery.pageNum+1
            this.options=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });

      },
      saleUserdataFilter(val){
        this.saleUserListQuery.pageNum=1
        this.saleUserId=val
        const param={
          selectMsg: this.saleUserId,
          pageNum: this.saleUserListQuery.pageNum,
          pageSize: this.saleUserListQuery.pageSize
        }

        systemUserSelect(param).then(response => {
          if (response.code == "200") {
            this.saleUserListQuery.pageNum=this.saleUserListQuery.pageNum+1
            this.saleUseroptions=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });

      },
      customerdataFilter(val){
        this.customerListQuery.pageNum=1
        this.customerId=val
        const param={
          selectMsg: this.customerId,
          pageNum: this.customerListQuery.pageNum,
          pageSize: this.customerListQuery.pageSize
        }

        SwJsCustomerlistSelect(param).then(response => {
          if (response.code == "200") {
            this.customerListQuery.pageNum=this.customerListQuery.pageNum+1
            this.customeroptions=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });

      },
      selected022(name) {
        console.log(name, 123)
        console.log(name.substring(name.indexOf("-") + 1), 963);
        this.form2.cbpc0999 = name.substring(0, name.indexOf("-"));
        this.form2.customerId = name.substring(name.indexOf("-") + 1);
        this.form.cbsa08 = name.substring(0, name.indexOf("-"));
        // this.form2.icon = name;
      },
      initCustomerSelect(){
        const param={}

        SwJsCustomerlistSelect(param).then(response => {
          if (response.code == "200") {
            this.customeroptions=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });
      },
      goodsQtyChange(row){
        if(row.qty>row.canUseSku){
          row.qty=0
          row.totalPrice=0

          this.$message.error("数量不能超过可用库存数量")
        }
      },

      goodsOnChange(row){
        // console.log(this.formData.customer)
        // console.log("val",val)
        console.log("val",row)
        // row.qty=0.5

        if(this.formData.customerId==null){
            this.$message.error("请先选择客户")
          return;
          }

        //检查goodsid是否存在
        if(this.checkRepeat(this.tableData,row.goodsId)){
          row.goodsId=null
          row.normalPrice=0
          row.canUseSku=0
          this.$message.error("不能添加重复商品")

          return
        }
        const param={
          goodsId: row.goodsId,
          customerId: this.formData.customerId,
          orderClass: 2

        }

        //
        goodsPriceAndSku(param).then(response => {
          if (response.code == "200") {
            row.normalPrice=response.data.normalPrice
            row.canUseSku=response.data.canUseSku

          }else {
            row.normalPrice=0.0
            row.canUseSku=0.0

            this.$message.error(response.msg)

          }
        });

      },
      getQtyStyle(row){
        return "color: red"

      },
      checkRepeat(arr,goodsId) {
    console.log('arr',arr)
    console.log('goodsId',goodsId)
     var dupNum=0
    arr.forEach((item) => {
      if (item.goodsId == goodsId) {
        console.log("重复了")
        dupNum=dupNum+1;

        }

    });
        console.log("重复了2")
    if(dupNum == 1 || dupNum == 0){
      return false
    }else {
      return true;

    }
  },

      customerOnChange(val){
        // console.log(this.formData.customer)
        // console.log("val",val)
        // console.log("val",row)
        // row.qty=0.5
        if(val=='' ){
          return
        }
        const param={
          cbca01: val,

        }

        //
        customerDetail(param).then(response => {
          if (response.code == "200") {
            this.formData.receivePhone=response.data.cbca16
            this.formData.receiveName=response.data.cbca14
            this.formData.address=response.data.cbca15


          }else {
            this.formData.receivePhone=''
            this.formData.receiveName=''
            this.formData.address=''
            this.$message.error(response.msg)

          }
        });

      },

      initSaleUserSelect(){
        const param={}

        systemUserSelect(param).then(response => {
          if (response.code == "200") {
            this.saleUseroptions=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });
      },
      initSelect(){
        const param={

        }

        swJsGoodslistBySelect(param).then(response => {
          if (response.code == "200") {
                this.options=response.data.rows
          }else {
            this.$message.error(response.msg)
          }
        });
      },



      /** 新增按钮操作 */
      handleAdd() {

          this.formData.goods=this.tableData
        addSaleOrder(this.formData).then(response => {
          if (response.code == "200") {
            this.$message.success("添加成功")
            this.$store.dispatch("tagsView/delView", this.$route)
            this.$router.push({path: "/Salesmanagement/SaleOrderGn", query: {id: 1}})

          }else {

            this.$message.error(response.msg)

            // this.$router.go(-1)

          }
        }
        )



        // this.$refs["form2"].validate((item) => {
        //   if (item) {
        //     PurchaseinboundAdd(this.form2).then(response => {
        //       if (response.code == "200") {
        //         this.$message({
        //           message: '添加成功',
        //           type: 'success',
        //           style: 'color:red;!important'
        //         });
        //         this.submitShangpin();
        //         this.open2 = false;
        //         this.reset01()
        //         this.form2.cbpg161 = response.data.id;
        //         this.form.cbpc01 = response.data.id;
        //         // console.log(this.form2.cbpg161,111);
        //         // console.log(this.form.cbpg01,222);
        //         console.log(response.data.id, 333);
        //         this.formArr.forEach((item) => {
        //           item.cbpc01 = response.data.id
        //           // item.cbpd08= this.form2.cbpd08;
        //           // item.cbpd09= this.form.cbpd09;
        //           // item.cbpd11= this.form.cbpd11;
        //           // item.cbpd12= this.form.cbpd12;
        //           let t = item.cbpc000;
        //           item.cbpd08 = t.substring(t.indexOf(".") + 1);
        //           console.log(t.substring(t.indexOf(".") + 1), 33333);
        //         })
        //         console.log(this.formArr, 888)
        //         this._ly_ok()
        //       }
        //     });
        //   } else {
        //     this.$message.error('请注意规范');
        //   }
        // })
        //    this._ly_ok();
      },

      /** 返回操作 */
      handleChuangJiangone: function(row) {
        // this.$router.push("/system/user-auth/role/");
        this.$router.push("/system/user-cktkfh/role/");
      },
    sum(row){
        if(row.qty!=null && row.currentPrice!=null){
          row.totalPrice=row.qty*row.currentPrice;
        }
    },

    },
    mounted() {
      // 初始化表单数据，至少有一行表单数据
      this.formArr = []
      this._ly_addFrom()
      this.initSelect()
      this.initCustomerSelect()
      this.initSaleUserSelect()
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
<style src="./PurchaseWarehousingcjcss/index.css">
  .normQtyclass {
    background-color: #00afff;
  }
</style>
