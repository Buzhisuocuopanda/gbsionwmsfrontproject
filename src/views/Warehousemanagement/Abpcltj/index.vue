<!-- <template>
    <el-container>
        <el-main>
            <el-row>
                <el-button type="primary" size="medium" @click="_ly_add">批量添加</el-button>
            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="180">
                    </el-table-column>
                    <el-table-column prop="code" label="编号" width="180">
                    </el-table-column>
                    <el-table-column prop="branch" label="部门">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-main>
        <bulk-add :visible="dialog.isOpenInfo" @on-ok="_ly_okInfo" @on-close="_ly_closeInfo"></bulk-add>
    </el-container>
</template>
<script>
import BulkAdd from './components/BulkAdd'

export default {
    components: {
        BulkAdd
    },
    data() {
        return {
            dialog: {
                isOpenInfo: false
            },
            tableData: [{
                index: 'myform0',
                name: '王小虎',
                nickname: 'wang',
                code: '001',
                branch: '一级 1'
            }]
        }
    },
    computed: {
    },
    methods: {
        _ly_add() {
            console.log('批量添加')
            this.dialog.isOpenInfo = true
        },
        _ly_closeInfo() {
            this.dialog.isOpenInfo = false
        },
        _ly_okInfo(data) {
            this._ly_closeInfo()
            this.tableData = this.tableData.concat(data)
        }
    },
    mounted() {
    },
    watch: {
    }
}
</script>
<style>

</style> -->


<template>
    <el-form ref="form" :model="form" label-width="30%" style="">
        <el-autocomplete placeholder="请输入studentID" v-model="form.cbsb07" :fetch-suggestions="querySearchAsync"
            @select="handleSelect(row)">

        </el-autocomplete>
    </el-form>
</template>

<script>
import {  PurchaseinboundList } from "@/api/Warehousemanagement/SalesShipment";
export default {
    name:'AutoComplete',
    data(){
        return {
            form: {},
            searchKey:null, // input框输入的值，用v-model双向绑定
            // dataList:['111','123','321','ab','ac','ad'], // 查询数据，一般由后端返回
            userList:[],
            completeData:[], // 查询到的数据
            // 日期范围
            dateRange: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                page: 1,
                size: 10,
                total: this.total,
                cbsb07: undefined,
                dateRange: undefined
            },
        }
    },
    watch:{ // 用watch去监听 input框里面的值的变化，然后做出相应操作
        // searchKey(){
        //     let searchRegex = new RegExp(this.searchKey, 'i')
        //     console.log(this.completeData,123);
        //     this.completeData = []  // 先把原有的数据清空，重新查询
        //     if(this.searchKey === '') return //如果什么都没有输入，则不用查找
        //     this.userList.forEach((item) => {
        //         if(searchRegex.test(item)){
        //             this.completeData.push(item)
        //         }
        //         // console.log(item,852369123);
        //         console.log(this.completeData,963258741);
        //     })
        // }
    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            PurchaseinboundList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
                // //供应商
                // this.postOptions = response.data.content;
                // console.log(this.userList, 3369);
                console.log(response, 339688);
                // this.deleteFlag = response.data.rows.deleteFlag;
                this.loading = false;
            }
            );
        },
        //queryString 为在框中输入的值

        //cb 回调函数，将处理好的数据推回

        querySearchAsync(queryString, cb) {

            var studentBasic = this.studentBasic;

            console.log(studentBasic)

            var results = queryString ? studentBasic.filter(this.createStateFilter(queryString)) : studentBasic;

            console.log('results ' + results)

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {

                cb(results);

            }, 0.5 * 1000);

        },

        //根据输入的字段进行筛选

        createStateFilter(queryString) {

            return (state) => {

                return (state.value.toString().toLowerCase().indexOf(queryString.toLowerCase()) === 0);

            };

        },



        //将其他数据自动补全，采用覆盖的方法

        handleSelect(row) {

            // this.form.name = item.name;

            this.form.cbsb07 = row.cbsb07;
            console.log(row,456);

            // this.form.birth = item.birthday;

            // this.form.region = item.city;

            // this.form.phone = item.phone;

        }
    }
}
</script>
