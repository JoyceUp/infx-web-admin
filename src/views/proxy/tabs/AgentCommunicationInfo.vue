<template>
    <section>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
            </el-col>
        </el-row>
        <el-table :data="items" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="record_time" label="沟通时间" width="180"> </el-table-column>
            <el-table-column prop="ib_full_name" label="代理姓名" width="180"> </el-table-column>
            <el-table-column prop="recorder_full_name" label="沟通人姓名"> </el-table-column>
            <el-table-column prop="recorder_type" label="沟通方式">
                <template slot-scope="scope">
                    <span>{{changeStatus(scope.row.recorder_type, typeOptions)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="沟通内容" show-overflow-tooltip> </el-table-column>
        </el-table>

        <el-dialog title="添加沟通记录" :visible.sync="dialogFormVisible" width="680px" @open="open('commForm')">
            <el-form :model="commForm" ref="commForm" :rules="formRules">
                <el-form-item label="沟通方式" style="width:200px" prop="recorder_type">
                    <el-select clearable placeholder="请选择" v-model="commForm.recorder_type">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in typeOptions" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="沟通内容" style="width:600px" prop="content">
                    <el-input type="textarea" :rows="10" placeholder="请记录与客户的每次沟通过程，具体沟通时间、内容，沟通结果，及是否预约再次沟通。"
                            v-model="commForm.content">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false" >取 消</el-button>
                    <el-button type="primary" @click.native="addItem('commForm')" >确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script>
    import {agentRecordList, addRecordList} from '../../../api/agent_api';
    import dict from '../../../common/js/dict';

    export default {
        props: ["agent_id"],
        data() {
            return {
                listLoading: false,
                dialogFormVisible:false,
                commForm:{
                    content:'',
                    recorder_type: 1
                },
                items:[],
                typeOptions: dict.recorder_type,
                formRules: {
                    recorder_type: [{ required: true, message: '请选择沟通方式', trigger: 'blur'}],
                    content:[{ required: true, message: '请输入沟通内容', trigger: 'blur'}]
                },
            }
        },
        methods: {
            getItems() {
                let condition = {};
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    page_size: this.page_size,
                    page_no: this.page_no
                };
                agentRecordList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.items = result.items;
                            this.page_size = result.page_size;
                            this.page_no = result.page_no;
                            this.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            addItem(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let user = Object.assign({},this.$store.getters.getUserInfo)
                        let params = {
                            id: this.$route.params.id,
                            recorder_id : user.id,
                            recorder_full_name : user.user_name,
                            recorder_type: this.commForm.recorder_type,
                            content: this.commForm.content
                        };

                        addRecordList(params).then((res) => {
                            let result = JSON.parse(res.data.datas);
                            if (res.data.status == 200) {
                                 if( this.listLoading==false){this.getItems();};
                                this.dialogFormVisible = false;
                            } else {
                                if (res.data.status == 401) {
                                    this.$router.push('/login');
                                }
                                this.$message.error(res.data.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });

            },
            open(formName){
                this.$nextTick(function () {
                    this.$refs[formName].resetFields();
                })
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                })
                return val;
            }
        },
        mounted()
        {
            this.$nextTick(function(){
                 if( this.listLoading==false){this.getItems();};
            })
        }
    }
</script>
<style lang="scss" scoped>
    .el-row {
        text-align: right;
    }
    .dialog-footer{
        text-align: center;
    }
    .el-dialog__body{
        margin-left:100px;
    }

</style>
