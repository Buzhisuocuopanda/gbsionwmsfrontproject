<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="1050px" center
            :before-close="_ly_beforeClose" @close="_ly_closeDialog">
            <div class="dialog-content">
                <el-row v-for="(form, index) in formArr" :key="index">
                    <el-form label-position="right" label-width="50px" :model="form" :ref="form.formName"
                        :inline="true">
                        <el-form-item label="商品id" size="small" prop="name">
                            <el-input v-model="form.cbsc08"></el-input>
                        </el-form-item>
                        <el-form-item label="数量" size="small" prop="nickname">
                            <el-input type="number" v-model="form.cbsc09"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" size="small" prop="code">
                            <el-input v-model="form.cbsc10"></el-input>
                        </el-form-item>
                        <el-form-item label="单价" size="small" prop="code">
                            <el-input v-model="form.cbsc11"></el-input>
                        </el-form-item>
                        <el-form-item label="金额" size="small" prop="code">
                            <el-input v-model="form.cbsc12"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" size="small" prop="code">
                            <el-input v-model="form.cbsc13"></el-input>
                        </el-form-item>
                        <el-form-item label="销售主表id" size="small" prop="code">
                            <el-input v-model="form.cbsb01"></el-input>
                        </el-form-item>
                        <el-form-item label="销售订单明细表id" size="small" prop="code">
                            <el-input v-model="form.cbsc14"></el-input>
                        </el-form-item>
                        <el-form-item label="供应商" size="small" prop="code">
                            <el-input v-model="form.cbsc15"></el-input>
                        </el-form-item>
                        <el-button v-if="index != 0" type="danger" size="small" icon="el-icon-delete" circle
                            @click="_ly_delFrom(index)"></el-button>
                        <el-form-item>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
            <div style="height: 200px;"></div>
            <span slot="footer" class="dialog-footer">
                <el-button plain type="primary" @click="_ly_addFrom">新增一行</el-button>
                <el-button type="primary" @click="_ly_ok">保 存</el-button>
                <el-button @click="_ly_cancelDialog">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { PurchaseinboundAdds } from "@/api/Warehousemanagement/SalesShipment";
export default {
    name: 'BulkAdd',
    props: {
        visible: { type: Boolean, default() { return false } }
    },
    data() {
        return {
            dialogVisible: this.visible,
            formArr: [], // 表单结构数组
            infoRules: { // 表单规则
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { max: 20, message: '请输入1-20位的字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { max: 20, message: '请输入1-20位的字符', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { max: 20, message: '请输入1-20位的字符', trigger: 'blur' }
                ],
                branch: [
                    { required: true, message: '请选择部门', trigger: 'blur' },
                    { message: '请选择部门', trigger: 'blur' }
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
            temp: '占位'
        }
    },
    computed: {
        dialogTitle() {
            return '添加'
        }
    },
    methods: {
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
                console.log(JSON.stringify(form))
                // 通过refs和表单名找到表单对象，通过自带的validate检查表单内容
                this.$refs[form.formName][0].validate((valid, obj) => {
                    if (valid) {
                        // 如果检查通过，则对count减1。
                        // 当count为1时，表示是最后一个表单，则存储数据
                        PurchaseinboundAdds(JSON.stringify(this.formArr)).then(response => {
                        if (count-- === 1) {
                            this._ly_save()
                        }
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
            if (this.formArr.length >= 5) {
                this.$message.warning('最多只能添加5行')
                // 如果需要更多行，可以调整[dialog-content]的高度，或者将界面调整为允许滚动
                return
            }

            this.formArr.push({
                formName: 'myform' + (new Date()).getTime(), // myform1648431132399
                cbsc08: '',
                cbsc09: '',
                cbsc10: '',
                branch: ''
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
        }

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
}
</script>

<style >
</style>
