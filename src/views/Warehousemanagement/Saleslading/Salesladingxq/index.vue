<template>
  <!-- 提货单列表详情 -->
  <div>
    <div class="Purchase_caigou">销售提货单</div>
    <div class="Purchase_sum">
      <span class="Purchase_bianhao">销售订单号：{{ userList.saleOrderNo || "" }}</span>
      <span class="Purchase_bianhao">编号：{{ userList.orderNo || "" }}</span>
      <span class="Purchase_bianhao">客户订单号：{{ userList.customerNo || "" }}</span>
      <span class="Purchase_riqii">日期：{{ userList.orderDate || "" }}</span>
    </div>
    <div style="width: 90%; margin-left: 5%; margin-top: 1%; padding-bottom: 5%">
      <!-- 横向 -->
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">客户</template>{{ userList.customerName || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">仓库</template>{{ userList.whName || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">销售人员</template>{{ userList.userName || "" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">联系人</template>{{ userList.phone || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">电话</template>{{ userList.phone || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">客户等级</template>{{ userList.customerLevel || "" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">结算货币</template>{{ userList.currencyMsg || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">收货人</template>{{ userList.receiver || "" }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="my-labell01">
          <template slot="label">收货电话</template>{{ userList.receivPhone || "" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" title="" :column="3" border>
        <el-descriptions-item label-class-name="my-labell02">
          <template slot="label">收货地址</template>{{ userList.receiveAdress || "" }}
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="edit == 0 || edit == 3">

        <el-table :data="userLists" border :default-sort="{ prop: 'name', order: 'descending' }"
          @selection-change="handleSelectionChange">
          <el-table-column prop="supplierId" key="supplierId" label="供应商">
          </el-table-column>
          <el-table-column prop="orderClass" key="orderClass" label="订单分类">
          </el-table-column>
          <el-table-column prop="brand" key="brand" label="品牌">
          </el-table-column>
          <el-table-column prop="model" key="model" label="型号">
          </el-table-column>
          <el-table-column prop="description" key="description" label="描述">
          </el-table-column>
          <!-- goodsNum -->
          <!--          <el-table-column  prop="goodsNum" label="良品数量" v-if="edit == 1 || edit == 0">-->
          <!--            <template scope="scope">-->
          <!--              <el-input v-model="scope.row.goodsNum" v-if="status == 2 || status == 0?false:true"-->
          <!--                :readonly="status == 2 || status == 0 || checkstatus!=2?true:false"></el-input>-->
          <!--              <div v-text="rounding2(scope.row.goodsNum)" v-if="status == 2 || status == 0?true:false"></div>-->
          <!--            </template>-->

          <!--          </el-table-column>-->
          <el-table-column prop="goodsNum" label="良品数量">
            <template scope="scope">
              <!-- <el-input v-model="scope.row.goodsNum" v-if="checkstatus != 2 && status ==3 ? true : false"
                oninput="value=value.replace(/[^\d]/g,'')" :readonly="edit == 3 ? true : false"></el-input> -->
              <el-input v-model="scope.row.goodsNum" disabled v-if="checkstatus != 2 && status == 3 ? true : false"
                oninput="value=value.replace(/[^\d]/g,'')" readonly></el-input>
              <div v-text="rounding2(scope.row.goodsNum)" v-else></div>
            </template>

          </el-table-column>
          <el-table-column prop="qty" key="qty" label="数量" :formatter="rounding"> </el-table-column>
          <el-table-column prop="scanQty" key="scanQty" :formatter="rounding" label="已扫数量">
          </el-table-column>
          <el-table-column prop="price" key="price" :formatter="rounding" label="单价">
          </el-table-column>
          <el-table-column prop="totalPrice" key="totalPrice" :formatter="rounding" label="金额">
          </el-table-column>
          <el-table-column prop="remark" key="remark" label="备注">
          </el-table-column>
        </el-table>
        <div class="saomiaojlu" style="margin-top:3%">出库建议表</div>
        <el-descriptions class="margin-top" style="width: 100%; margin-top: 1%" title="" :column="3" border>
          <el-descriptions-item label-class-name="my-labell012">
            <template slot="label">客户</template>{{ userList.customerName }}
          </el-descriptions-item>
        </el-descriptions>


        <el-table border :data="userListsss" style="width: 100%;" :default-sort="{ prop: 'name', order: 'descending' }"
          @selection-change="handleSelectionChange">
          <el-table-column type="index" :index="table_index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="brand" key="brand" label="品牌">
          </el-table-column>
          <el-table-column prop="goodClass" key="goodClass" label="类型">
          </el-table-column>
          <el-table-column prop="model" key="model" label="型号">
          </el-table-column>
          <el-table-column prop="description" key="description" label="描述">
          </el-table-column>
          <el-table-column prop="sn" key="sn" align="" label="SN">
          </el-table-column>
          <el-table-column prop="bfSn" key="sn" align="" label="替换前SN">
          </el-table-column>
          <el-table-column prop="sku" key="sku" align="" label="库位">
          </el-table-column>
          <el-table-column prop="scanStatus" key="scanStatuss" label="扫描状态">

          </el-table-column>
        </el-table>

        <div class="saomiaojlu" style="margin-top:3%">扫描记录</div>
        <el-table style="margin-top: 1%; width: 100%;" border :data="userList1"
          :default-sort="{ prop: 'name', order: 'descending' }" :span-method="arraySpanMethod">
          <el-table-column type="index" :index="table_index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="brand" key="brand" label="品牌">
          </el-table-column>
          <el-table-column prop="goodClass" key="goodClass" label="类型">
          </el-table-column>
          <el-table-column prop="model" key="model" align="" label="型号">
          </el-table-column>
          <el-table-column id="miaos" prop="description" key="description" align="" label="描述" width="300">
          </el-table-column>
          <el-table-column prop="sn" key="sn" align="" label="SN">
          </el-table-column>
          <el-table-column prop="sku" key="sku" align="" label="库位">
          </el-table-column>
        </el-table>

        <!-- 横向 -->
        <div style="margin-top: 3%">
          <el-descriptions class="margin-top" title="" :column="2" border style="margin-top: 3%">
            <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
              <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                slot="label">本页数量小记</template>{{
                    isNaN(parseFloat(totalnumber).toFixed(2)) ? '0.00' : parseFloat(totalnumber).toFixed(2)
                }}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
              <template :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }"
                slot="label">本页金额小记</template>{{
                    isNaN(parseFloat(totalPrice).toFixed(2)) ? '0.00' : parseFloat(totalPrice).toFixed(2)
                }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 横向 -->
        <el-descriptions class="margin-top" title="" :column="2" border>
          <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
            <template slot="label">合计数量</template>{{ isNaN(parseFloat(totalnumber).toFixed(2)) ? '0.00' :
                parseFloat(totalnumber).toFixed(2)
            }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ 'text-align': 'right' }" :labelStyle="{ 'text-align': 'center' }">
            <template slot="label">合计金额</template>{{
                isNaN(parseFloat(totalPrice).toFixed(2)) ? '0.00' : parseFloat(totalPrice).toFixed(2)
            }}
          </el-descriptions-item>
        </el-descriptions>

        <!-- 横向 -->
        <el-descriptions class="margin-top" title="" border>
          <el-descriptions-item label-class-name="my-label" :contentStyle="{ 'text-align': 'left' }"
            :labelStyle="{ 'text-align': 'center' }">
            <template slot="label">大写</template>人民币:{{
                smallToBig(totalPrice)
            }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div v-else style="margin-top:1%">
        <el-table v-loading="loading" border :data="userListsss" style="width: 100%;"
          :default-sort="{ prop: 'name', order: 'descending' }" @selection-change="handleSelectionChange"
          :span-method="arraySpanMethods">
          <el-table-column prop="sn" key="sn" align="" label="SN">
            <template slot-scope="scope" style="width: 200%">
              <!-- @change="getSnList(scope.row,value)" :remote-method="getSnList(query,scope.row)" -->
              <!--v-el-select-loadmore="getLoadmoreSnList" reserve-keyword -->
              <el-select filterable remote
                :disabled="scope.row.scanStatus == '已扫码'" :remote-method="(query) => getSnList(query, scope.row,scope.$index)" v-model="scope.row.sn" style="width: 100%"
                         reserve-keyword placeholder="请输入关键词">
                <el-option v-for="(item,index) in snList[scope.$index]" @click.native="updsteSn(scope.row, item,scope.$index)"
                  :key="index" :label="item.goodsMsg" :value="item.sn"></el-option>
              </el-select>
              <!--<el-popover placement="bottom-start" trigger="click" @show="filterIcons">
                <TakeSuggests
                  ref="TakeSuggests"
                  @selected="selected08($event, scope.row)"
                  style="width: 630px !important"
                  :iconList = iconList
                  :check = checks
                />
                <el-input
                  slot="reference"
                  v-model="scope.row.sn"
                  placeholder=""
                  style="width: 100%"
                >
                </el-input>
              </el-popover>-->
            </template>
          </el-table-column>
          <el-table-column label="库位">
          </el-table-column>
          <el-table-column label="品牌">
          </el-table-column>
          <el-table-column label="型号">
          </el-table-column>
          <el-table-column label="描述">
          </el-table-column>
          <el-table-column prop="scanStatus" key="scanStatus1" label="扫描状态">
          </el-table-column>
          <el-table-column prop="scanStatus" key="scanStatus2" label="备注">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="height: 20px"></div>
    <div style="margin-left: 5%" v-if="edit == 0">
      <el-button v-if="status == 1" type="primary" @click="PrintRows">审 核</el-button>
      <el-button v-else-if="status == 2" type="primary" @click="PrintRowss">反 审</el-button>
      <el-button v-else type="primary" @click="PrintRow">质 检</el-button>
      <el-button type="primary" @click="handlefanhui">返 回</el-button>
    </div>
    <div v-else-if="edit == 1" style="margin-left: 5%">
      <el-button type="primary" @click="mdfTakeSuggest">保 存</el-button>
      <el-button type="primary" @click="handlefanhui">返 回</el-button>
    </div>
    <div v-else style="margin-left: 5%">
      <el-button type="primary" @click="exportDetail">导出</el-button>
      <el-button type="primary" @click="printTakeOrderOrder">销售订单打印</el-button>
      <el-button type="primary" @click="printTakeOrderScanLog">扫码记录打印</el-button>
      <el-button type="primary" @click="printTakeOrderSuggest">出库建议打印</el-button>
      <el-button type="primary" @click="handlefanhui">返 回</el-button>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>
<script>
import {
  Purchaseinbounddingdanxq,
  auditTakeOrder,
  auditTakeOrders,
  CustomerLists,
  mdfTakeSuggest,
  selectGoodsSnByStatus,
} from "@/api/Warehousemanagement/Saleslading";
import TakeSuggests from "@/components/TakeSuggests"

import Vue from 'vue';
Vue.directive('loadmore', {
  bind(el, binding) {

    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

    SELECTWRAP_DOM.addEventListener('scroll', function () {

      /*
      * scrollHeight 获取元素内容高度(只读)
      * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
      * clientHeight 读取元素的可见高度(只读)
      * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
      * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      */
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

      if (CONDITION) {
        binding.value();
      }
    });
  }
})
export default {
  components: {
    TakeSuggests,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: {},
      userLists: [],
      userList1: [],
      userList2:[],
      userListsss: [],
      msgList: [],
      userId: undefined,
      //下拉列表sn数据
      snList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        page: 1,
        size: 10,
        total: this.total,
        name: undefined,
        address: undefined,
        userId: undefined,
      },
      // sn查询参数
      snQueryParams: {
        pageNum: 1,
        pageSize: 200,
        page: 1,
        size: 10,
        goodsId: undefined,
        sn: undefined,
        cbpb08: undefined,
      },

      CBPC01: "",
      paramss: {
        goods: [],
        opType: "",
        takeOrderId: "",
        userId: "",
      },
      // 订单状态
      status: '',
      // 质检状态
      checkstatus: '',
      // 是否是编辑过来的
      edit: 1,
      whid: '',
      goodsId: '',
      iconList: {
        whid: '',
        goodsId: '',
      },
      checks: false,
    };
  },
  watch: {},
  created() {
    this.getList();

  },
  methods: {
    //列表价格数值
    rounding(row, column) {
      if (parseFloat(row[column.property]).toFixed(2) == null || isNaN(parseFloat(row[column.property]).toFixed(2))) {
        return '0.00';
      }
      return parseFloat(row[column.property]).toFixed(2)
    },
    rounding2(value) {
      if (value == null || isNaN(parseFloat(value).toFixed(2))) {
        return '0.00';
      }
      return parseFloat(value).toFixed(2)
    },
    mdfTakeSuggest() {
      console.log(this.userListsss, 1014);
      for (let i = 0; i < this.userListsss.length; i++) {
        this.userListsss[i].cbpm09 = this.userListsss[i].sn2;
        this.userListsss[i].cbpm08 = this.userListsss[i].goodsId;
        this.userListsss[i].cbpk01 = this.userId;
        this.userListsss[i].cbpm10 = this.userListsss[i].locationId;
      }


      let dtat = {
        userId: this.userId,
        list: this.userListsss
      }
      mdfTakeSuggest(dtat).then(response => {
        if (response.code == 200) {
          this.$store.dispatch("tagsView/delView", this.$route)
          this.$router.go(-1)
          // this.$router.push("/Warehousemanagement/Saleslading/");
          this.$message.success("修改成功")
        } else {
          // this.snList = [];
          // this.$message.error(response.message)
        }
      }, error => {
        this.$message.error("修改失败")
      });
    },
    updsteSn(row, item,index) {
      for (let i = 0; i < this.userListsss.length; i++) {
        if (this.userListsss[i].sn2 == item.sn &&i!=index) {
          this.$message.warning("您已选择该sn号，请勿重复选择")
          // row.sn = "";
          // row.goodsMsg = "";
          row.sn = this.msgList[index];
          row.sn2 =null;
          return
        }
      }
      row.sn2 = item.sn;
      row.goodsId = item.goodsId;
      row.locationId = item.locationId;
      console.log(row.goodsId, 10142);
    },
    // 输入框内容改变时触发
    getSnList(query, row,i) {
      this.snQueryParams.pageNum = 1;
      this.snQueryParams.sn = query
      this.snQueryParams.cbpb08 = query
      this.snQueryParams.goodsId = row.goodsId
      // console.log(this.snQueryParams, 11111)
      selectGoodsSnByStatus(this.snQueryParams).then(response => {
        if (response.code == 200) {
          this.snQueryParams.pageNum += 1;
          // this.snList = response.data;
          this.snList[i] = response.data;
          this.$set(this.snList,i,response.data)
          console.log(this.snList, 2222)
        } else {
          // this.snList = [];
        }
      }, error => {
      });
    },
    // 下拉触底时触发
    getLoadmoreSnList(value) {
      // console.log(this.snQueryParams)
      this.snQueryParams.sn = value
      this.snQueryParams.cbpb08 = value

      selectGoodsSnByStatus(this.snQueryParams).then(response => {
        if (response.code == 200) {
          this.snQueryParams.pageNum += 1;
          this.snList.push(...response.data);
        } else {
          // this.snList = [];
        }
      }, error => {
      });
    },
/*
    filterIcons() {
      this.checks = true
      this.iconList.whid = this.whid
      this.iconList.goodsId = this.goodsId
      console.log(112121)
      return
      CustomerLists(this.whid, this.goodsId).then(response => {
        this.iconList = []
        if (response.data <= 0) {
          this.iconList = []
        } else {
          if (response.data.length > 0) {
            response.data.forEach((item) => {
              this.iconList.push(item.sn + "-" + item.cbla09 + "-" + item.cbpb10 + "-" + item.cbpb12 + "-" + item.cbpb08)
            })
          }
        }
        console.log(response.data, 339688);
      })
    },*/
    //查询商品信息维护
    selected08(e, row) {
      // row.cbpc000=e
      console.log([e, row], 'ceshihhh')
      row.sn = e
      // this.$set(row, "cbsc08", e.substring(e.indexOf(".") + 1), 8523642);
    },
    // 导出
    exportDetail() {
      const userId = this.$route.params && this.$route.params.cbpc01;
      this.download(
        "/whmanagement/exportDetail?id=" +
        userId,
        {},
        `销售提货表—_${new Date().toLocaleDateString()}.xls`
      );
    },
    // 销售订单打印
    printTakeOrderOrder() {
      const userId = this.$route.params && this.$route.params.cbpc01;
      this.printing("/whmanagement/printTakeOrderOrder", { id: userId }, 'pdf')
      // this.download(
      //   "/whmanagement/printTakeOrderOrder?id=" +
      //   userId,
      //   {},
      //   `销售提货订单表—_${new Date().toLocaleDateString()}.xls`
      // );
    },
    // 出库建议表
    printTakeOrderSuggest() {
      const userId = this.$route.params && this.$route.params.cbpc01;
      this.printing("/whmanagement/printTakeOrderSuggest", { id: userId }, 'pdf')
      // this.download(
      //   "/whmanagement/printTakeOrderSuggest?id=" +
      //   userId,
      //   {},
      //   `出库建议表—_${new Date().toLocaleDateString()}.pdf`
      // );
    },
    // 扫描记录表
    printTakeOrderScanLog() {
      const userId = this.$route.params && this.$route.params.cbpc01;
      this.printing("/whmanagement/printTakeOrderScanLog", { id: userId }, 'pdf')
      // this.download(
      //   "/whmanagement/printTakeOrderScanLog?id=" +
      //   userId,
      //   {},
      //   `扫描记录表—_${new Date().toLocaleDateString()}.pdf`
      // );
    },

    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return { rowspan: 1, colspan: 3 }
      } else if (columnIndex > 2 && columnIndex < 5) {
        return { rowspan: 0, colspan: 0 }
      } else if (columnIndex < 2) {
        return { rowspan: 1, colspan: 1 }
      }
    },
    // 合并单元格 出库建议表
    arraySpanMethods({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return { rowspan: 1, colspan: 5 }
      } else if (columnIndex < 5) {
        return { rowspan: 0, colspan: 0 }
      } else if (columnIndex > 6) {
        return { rowspan: 1, colspan: 1 }
      }
    },
    //序号
    table_index(index) {
      return (
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
      );
    },
    //返回按钮
    handlefanhui: function (row) {
      // this.$router.push("/system/user-auth/role/");
      this.$store.dispatch("tagsView/delView", this.$route)
      this.$tab.closePage();
      this.$router.go(-1)
      // this.$router.push("/Warehousemanagement/Saleslading/");
    },
    // 审核
    PrintRows(row) {
      this.paramss.opType = 1;
      this.changeMoreArrary()
      auditTakeOrder(this.paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "审批成功", type: "success" });
          // this.$router.push("/Warehousemanagement/Saleslading/");
          this.$tab.closePage();
          this.$router.go(-1);
        }
      });
    },
    // 反审
    PrintRowss(row) {
      this.paramss.opType = 3;
      this.changeMoreArrary();
      auditTakeOrder(this.paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "反审成功", type: "success" });
          // this.$router.push("/Warehousemanagement/Saleslading/");
          this.$tab.closePage();
          this.$router.go(-1);
        }
      });
    },
    // 质检
    PrintRow(index, row) {
      /*   if(row.goodsNum!=null&&row.goodsNum>row.qty){
           this.$message({ message: "良品数量不能大于总数量", type: "error" });
           return
         }*/
      this.paramss.opType = 6;
      this.changeMoreArrary()
      auditTakeOrder(this.paramss).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "质检完成成功", type: "success" });
          // this.$router.push("/Warehousemanagement/Saleslading/");
          this.$tab.closePage();
          this.$router.go(-1);
        }
      });
    },
    // 处理多条数据
    changeMoreArrary() {
      // let obj = {
      //   "goodQty": 0,
      //   "plId": 0
      // }
      // console.log(this.userLists, "this.userLists------------------------------this.userLists")
      for (let i = 0; i < this.userLists.length; i++) {
        let obj = {}
        obj.goodQty = this.userLists[i].goodsNum
        obj.plId = this.userLists[i].cbplId
        this.paramss.goods.push(obj)
      }
      // this.paramss.goods = this.userLists.map(item => {
      //   obj.goodQty = Number(item.goodsNum);
      //   obj.plId = item.cbplId;
      //   return obj
      // })
      console.log(this.paramss.goods, '4444')
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection;
      this.idss = selection.map((item) => item.cbpc01);
      this.shenpiids = selection;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    //父子页面传值
    getParams() {
      let routerParams = this.$route.query;
      this.cbpc01 = routerParams.data;
      console.log(routerParams.data, 1013);
    },

    //详情列表
    getList() {
      this.loading = true;
      const userId = this.$route.params && this.$route.params.cbpc01;
      this.userId = userId;
      this.status = this.$route.params && this.$route.params.status;
      this.checkstatus = this.$route.params && this.$route.params.checkStatus;
      this.edit = this.$route.params && this.$route.params.edit;
      console.log(this.$route.params, '路由');
      this.paramss.takeOrderId = Number(userId);
      if (userId) {
        // 获取表详细信息
        Purchaseinbounddingdanxq(
          userId,
          this.addDateRange(this.queryParams, this.dateRange)
        ).then((res) => {
          this.userList = res.data;
          this.userLists = res.data.goods;
          console.log(this.userLists, 'zgl1')
          this.whid = res.data.whId
          this.goodsId = res.data.goods[0].goodsId
          // this.getSnList();
          this.userList1 = res.data.scans.map(item => {
            item.goodClass = item.goodClass + '-' + item.model + '-' + item.description
            return item
          });
          /*this.userLists = res.data.goods.map(item =>{
            item.goodsNum = item.qty
          })*/
          // this.userListsss = res.data.sugests.map(item => {
          //   item.goodClass = item.goodClass + '-' + item.model + '-' + item.description
          //   return item
          // });
          let i=0;
          this.userListsss = res.data.sugests
          console.log(this.userListsss, "this.userListsss---------this.userListsss")
          if (this.edit == 1) {
            this.userList2 = res.data.sugests.map(item => {
              // item.snList = this.snList;
              this.getSnList(null, item,i);
              i++;
              item.sn2 = item.sn
              /*+ ' - ' + item.goodClass+ ' - '*/
              item.sn = item.sn + ' - ' + item.cbla09 + ' - ' + item.brand + ' - ' + item.model + ' - ' + item.description
              this.msgList.push(item.sn);
              return item
            });
          }

          this.paramss.userId = res.data.userId;
          // this.total = res.data.total;
          console.log( this.msgList, 888999);
          this.loading = false;
          console.log(res.data, this.userList);
        });
      }
    },

    //时间的转换
    smallToBig(money) {
      var cnMoney = "零元整";
      var strOutput = "";
      var strUnit = "仟佰拾亿仟佰拾万仟佰拾元角分";
      money += "00";
      var intPos = money.indexOf(".");
      if (intPos >= 0) {
        money = money.substring(0, intPos) + money.substr(intPos + 1, 2);
      }
      strUnit = strUnit.substr(strUnit.length - money.length);
      for (var i = 0; i < money.length; i++) {
        strOutput +=
          "零壹贰叁肆伍陆柒捌玖".substr(money.substr(i, 1), 1) +
          strUnit.substr(i, 1);
      }
      cnMoney = strOutput
        .replace(/零角零分$/, "整")
        .replace(/零[仟佰拾]/g, "零")
        .replace(/零{2,}/g, "零")
        .replace(/零([亿|万])/g, "$1")
        .replace(/零+元/, "元")
        .replace(/亿零{0,3}万/, "亿")
        .replace(/^元/, "零元");
      return cnMoney;
    },
  },
  mounted() {
    console.log(111, "zgl")
    this.getParams();
    // this.getSnList();
  },
  computed: {
    totalnumber: function () {
      var totalnumber = 0
      for (let i = 0; i < this.userLists.length; i++) {
        totalnumber += this.userLists[i].qty;
      }
      console.log(totalnumber, 777777)
      return totalnumber
    },
    totalCount: function () {
      var totalCount = 0;
      for (let i = 0; i < this.userList.length; i++) {
        totalCount += this.userList[i].cbpd09;
      }
      return totalCount;
    },
    totalPrice: function () {
      var totalPrice = 0;
      for (let i = 0; i < this.userLists.length; i++) {
        totalPrice += this.userLists[i].totalPrice;
      }
      return totalPrice;

    },
  },
};
</script>
<style src="./Salesladingxqcss/index.css">

</style>
