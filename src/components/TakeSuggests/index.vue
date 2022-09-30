<!-- @author zhengjie -->
<template>
    <div class="icon-body" style="width:190px; height: 200px !important;" :iconList="iconList" :check="check">
        <el-input v-model="name" style="position: relative;" clearable placeholder=""
            @clear="filterIcons" @input.native="filterIcons">
            <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
          <div>
            <div height="20" style="width: 100%" v-for="(item, index) in iconList" :key="index"
                @click="selectedIcon(item)">
                <el-row style="margin-top: 5%;">
                    <el-col :span="24"> <span>{{ item.match(/(\S*)\-/)[1] }}</span></el-col>
                </el-row>
            </div>
          </div>
       </el-form>
    </div>
</template>

<script>
import { CustomerLists } from "@/api/Basicinformationmaintenance/CustomerMaintenance/index";
export default {
    name: 'CustomerLists',
    data() {
        return {
            name: '',
            userList: null,
            params: null,
            top: null,
            total:0,
            iconList: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 999999,
                page: 1,
                size: 999999,
                total: this.total,
                dateRange:undefined
            },
        }
    },
    props:["iconList","check"],
    watch:{
        'check': {
            handler(newName, oldName) {
                console.log(newName,oldName)
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        filterIcons() {
            console.log(this.props,'444444555555')
            let whid = 6
            let goodsId = 1603
            CustomerLists(whid,goodsId).then(response => {
                // this.total =  response.data.total;
                this.iconList = []
                if (response.data <= 0) {
                    this.iconList = []
                } else {
                  if(response.data.length > 0){
                    response.data.forEach((item) => {
                        this.iconList.push(item.sn + "-" + item.cbla09+ "-" + item.cbpb10+ "-" + item.cbpb12+ "-" + item.cbpb08)
                    })
                   }
                }
                if (this.name) {
                    this.iconList = this.iconList.filter(item => item.includes(this.name))
                }
                console.log(response.data, 339688);
            }
            );
        },
        selectedIcon(name) {
            this.$emit('selected', name)
            document.body.click()
        },
        // reset01() {
        //     this.name = ''
        //     this.iconList = ['EpiG400TO', 'EpiL400TO', 'EpiR400TO', 'EpiP400TO', 'EpiU400TO']
        // }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
    width: 100%;
    padding: 10px;

    .icon-list {
        height: 20px;
        overflow-y: scroll;

        div {
            height: 30px;
            line-height: 30px;
            margin-bottom: -5px;
            cursor: pointer;
            width: 33%;
            float: left;
        }

        span {
            display: inline-block;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
    }
}
</style>
