<template>
    <section>
        <el-row class="row-bg" type="flex">
            <el-col>
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">{{$t('lang.addition') || '添加'}}</el-button>
            </el-col>
        </el-row>
        <el-table :data="items" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="record_time" :label="$t('lang.record_time') || '沟通时间'" width="180"> </el-table-column>
            <el-table-column prop="customer_name" :label="$t('lang.full_name') || '客户姓名'" width="180"> </el-table-column>
            <el-table-column prop="recorder_full_name" :label="$t('lang.recorder_full_name') || '沟通人姓名'"> </el-table-column>
            <el-table-column prop="recorder_type" :label="$t('lang.recorder_type') || '沟通方式'">
                <template slot-scope="scope">
                    <span>{{changeStatus(scope.row.recorder_type, typeOptions)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="content" :label="$t('lang.content') || '沟通内容'" show-overflow-tooltip> </el-table-column>
        </el-table>

        <el-dialog :title="$t('lang.record_of_com') || '添加沟通记录'" :visible.sync="dialogFormVisible" width="650px" @open="open('commForm')">
            <el-form :model="commForm" ref="commForm" :rules="formRules">
                <el-form-item :label="$t('lang.recorder_type')+':' || '沟通方式'" style="width:200px" prop="recorder_type">
                    <el-select clearable :placeholder="$t('lang.choose') || '请选择'" v-model="commForm.recorder_type">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in typeOptions" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('lang.content')+':' || '沟通内容'" prop="content">
                    <el-input type="textarea" :rows="10"
                              :placeholder="$t('lang.recording_process') || '请记录与客户的每次沟通过程，具体沟通时间、内容，沟通结果，及是否预约再次沟通。'"
                            v-model="commForm.content" >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('commForm')" >{{$t('lang.abolish') || '取消'}}</el-button>
                    <el-button type="primary" @click.native="addItem('commForm')" >{{$t('lang.confirm') || '确定'}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script>
    import {recordCustomersList, addRecordCustomers} from '../../../api/customers_api';
    import dict from '../../../common/js/dict';

    export default {
        props: ["datas"],
        data() {
            return {
                listLoading:false,
                dialogFormVisible:false,
                page_size: 10,
                page_no: 1,
                total: 0,
                order_column: "",
                order_by: "",
                // activeNames: ['1'],
                commForm:{
                    content:'',
                    recorder_type: 1
                },
                formRules: {
                    recorder_type: [{ required: true, message: this.$t('lang.communication')+':' || '请选择沟通方式', trigger: 'blur'}],
                    content:[{ required: true, message: this.$t('lang.communication_n')+':' || '请输入沟通内容', trigger: 'blur'}]
                },
                items:[],
                typeOptions: dict.recorder_type,
            }
        },
        methods: {
            resetForm(formName){
               this.commForm = {
                   content:'',
                   recorder_type: 1
               };
               this.$refs[formName].resetFields();
           },
            getItems() {
                // let condition = {};
                // condition.customer_id = this.$route.params.id;
                let params = {
                    // condition: condition,
                    customer_id: this.$route.params.id,
                    order_column: "",
                    order_by: "",
                    page_size: this.page_size,
                    page_no: this.page_no
                };
                this.listLoading=true
                recordCustomersList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            //this.items = result.items;
                            this.items = result;
                          /*  this.page_size = result.page_size;
                            this.page_no = result.page_no;*/
                            this.listLoading=false
                            this.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            addItem(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let user =  Object.assign({},this.$store.getters.getUserInfo);
                        let params = {
                            id: this.$route.params.id,
                            recorder_id : user.id,
                            recorder_full_name : user.user_name,
                            recorder_type: this.commForm.recorder_type,
                            content: this.commForm.content
                        };

                        addRecordCustomers(params).then((res) => {
                            let result = JSON.parse(res.data.datas);

                            if (res.data.status == 200) {
                                 this.getItems();
                                 this.dialogFormVisible = false;
                            } else {
                                if (res.data.status == 401) {
                                    this.$router.push('/login');
                                }
                                this.$message.error(res.data.status+" "+res.data.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                })
                return val;
            },
            open(formName){
                this.$nextTick(function () {
                    this.$refs[formName].resetFields();
                })
            },
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


    .row-bg {
        text-align: right;
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
