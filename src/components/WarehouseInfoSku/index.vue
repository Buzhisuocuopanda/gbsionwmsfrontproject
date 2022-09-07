<!-- @author zhengjie -->
<template>
    <div class="icon-body" style="width:190px;">
        <el-input v-model="name" style="position: relative;" clearable placeholder=""
            @clear="filterIcons" @input.native="filterIcons">
            <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
        <div>
            <div height="20" style="width: 100%" v-for="(item, index) in iconList" :key="index"
                @click="selectedIcon(item)">
                <!-- <svg-icon :icon-class="item" style="height: 30px;width: 16px;" /> -->
                <!-- <span>{{ item }}</span> -->
                <el-row style="margin-top: 5%;">
                    <el-col :span="24"> <span>{{ item.match(/(\S*)\-/)[1] }}</span></el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// import icons from './requireIcons'
// import { addUserSysStoreku, listUserStoreku, updateUserStoreku, removeSysStoreku } from "@/api/WareSys/Kuweixxweihu";
// import { addUserSysStore, listUserStore, updateUserStore, removeSysStore } from "@/api/WareSys/Cangkuxxguanli";
import {  StoreSkuList } from "@/api/Basicinformationmaintenance/WarehouseInfoSku/index";
export default {
    name: 'kuweixxweihu',
    data() {
        return {
            name: '',
            userList: null,
            params: null,
            top: null,
            // iconList: ['EpiG400TO', 'EpiL400TO', 'EpiR400TO', 'EpiP400TO', 'EpiU400TO']
            iconList: [],
        }
    },
    created() {
        // console.log(JSON.stringify(icons),123);
        // icons=[]
        this.filterIcons();

    },
    methods: {
        filterIcons() {
            // this.iconList = ['EpiG400TO', 'EpiL400TO', 'EpiR400TO', 'EpiP400TO', 'EpiU400TO']
            StoreSkuList().then(response => {
                // this.userList = response.data.rows;
                //this.top = JSON.stringify(this.userList)
                // console.log(response.data.rows, 3369);
                // console.log(this.top,888888);
                // this.icons =[]
                this.iconList = []
                if (response.data.rows <= 0) {
                    this.iconList = []
                } else {
                    response.data.rows.forEach((item) => {
                        this.iconList.push(item.cbwa09 +"-"+item.cbwa01);
                    })
                }
                if (this.name) {
                    this.iconList = this.iconList.filter(item => item.includes(this.name))
                }
                console.log(response.data.rows, 339688);
            }
            );

        },
        selectedIcon(name) {
            this.$emit('selected', name)
            document.body.click()
        },
        reset01() {
            this.name = ''
            this.iconList = ['EpiG400TO', 'EpiL400TO', 'EpiR400TO', 'EpiP400TO', 'EpiU400TO']
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
    width: 100%;
    padding: 10px;

    .icon-list {
        height: 200px;
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
