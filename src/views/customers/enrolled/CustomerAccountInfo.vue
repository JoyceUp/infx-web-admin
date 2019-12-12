<template>
    <section>
        <el-table :data="custInfo" stripe style="width: 100%"  size="small">
            <el-table-column prop="gmt_create" :label="$t('lang.gmt_create_date') || '创建日期'"></el-table-column>
            <el-table-column prop="account_no" :label="$t('lang.mt_account') || 'Mt4账号'"></el-table-column>
            <el-table-column :label="$t('lang.account_type') || '账户类型'">
                <template slot-scope="scope">
                    <span>{{ accountTypeOptions[scope.row.account_type] }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="leverage" :label="$t('lang.account_leverage') || '杠杆'">
                <template slot-scope="scope">
                    <span>{{ isNull(scope.row.leverage) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('lang.balance_outstanding') || '余额'"><template slot-scope="scope"> <span>{{centToDollar(scope.row.balance)}}</span></template></el-table-column>
            <el-table-column :label="$t('lang.sale_status') || '状态'">
                <template slot-scope="scope">
                    <span>{{ changeStatus(scope.row.state,stateOptions) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('lang.handle') || '操作'" width="580px">
                <template slot-scope="scope">
                    <el-button  :disabled="scope.row.state == 1" @click="handleEnable(scope.row.id)">{{$t('lang.activate') || '激活'}}</el-button>
                    <el-button  :disabled="scope.row.state == 50" @click="setOnlyRead(scope.row.id)">{{$t('lang.read_only') || '只读'}}</el-button>
                    <el-button  :disabled="scope.row.state == 51" @click="handleDisable(scope.row.id)">{{$t('lang.forbidden') || '禁用'}}</el-button>
                    <el-button  :disabled="scope.row.state == 2" @click="handleDelete(scope.row.id)">{{$t('lang.delete') || '删除'}}</el-button>
                    <el-button  :disabled="scope.row.state == 51 || scope.row.state == 2" @click="handleResend_email(scope.row.id)">{{$t('lang.handleResend_email') || '重发开户邮件'}}</el-button>
                    <!--<el-button  :disabled="scope.row.state == 51 || scope.row.state == 2" @click="reSetDealPassword(scope.row.id)">{{$t('lang.reSetDealPassword') || '重置交易密码'}}</el-button>-->

                </template>
            </el-table-column>

        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import {customerAccountList, updateEnableCustomer, updateDisableCustomer, updateDeleteCustomer, updateResend_emailCustomer, updateSet_read_onlyCustomer, update_passwordCustomer} from '../../../api/customers_api';
    import dict from '../../../common/js/dict';
    import {isNull} from '../../../common/js/commons';
    import {centToDollar} from '../../../common/js/commons';

    export default {
        data() {
            return {
                listLoading:false,
                activeNames: ['2'],
                cid:'',
                order_column: "",
                order_by: "",
                custInfo: [],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                stateOptions: dict.account_state,
                accountTypeOptions: dict.customer_ib_type
            }
        },
        methods: {
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.currentPage = 1;
                this.pager.pageSize = val;
                this.handlePagerChange();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.currentPage = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange(){ this.getItems();},
            getItems() {
                let condition = {};
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "",
                    order_by: "",
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };

                this.listLoading=true;
                customerAccountList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.listLoading=false;
                            this.custInfo = result.items;
                            this.pager.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            //激活
            handleEnable( iid ){
                this.$confirm(this.$t('lang.warning_3')+':' || '确定修改为激活状态？', this.$t('lang.confirm_account_prompt')+':' || '提示', {
                    confirmButtonText: this.$t('lang.confirm')+':' || '确定',
                    cancelButtonText: this.$t('lang.abolish')+':' || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    let params = {
                        id: iid,
                    };
                    updateEnableCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if(res.data.status === 200) {
                            this.$message(this.$t('lang.activate_suc')+':' || '激活成功');
                             if( this.listLoading==false){this.getItems();};
                        }else{
                            if(res.data.status === 401){
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.status+" "+res.data.msg);
                        }
                    })
                }).catch((e) => {

                });
            },

            //禁用
            handleDisable(iid){
                this.$confirm(this.$t('lang.warning_4')+':' || '确定修改为禁用状态？', this.$t('lang.confirm_account_prompt')+':' || '提示', {
                    confirmButtonText:this.$t('lang.confirm')+':' || '确定',
                    cancelButtonText: this.$t('lang.abolish')+':' || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    let params = {
                        // id: this.$route.params.id,
                        id: iid,
                    };
                    updateDisableCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if(res.data.status === 200) {
                            this.$message( this.$t('lang.forbidden_w')+':' || '禁用成功');
                             if( this.listLoading==false){this.getItems();};
                        }else{
                            if(res.data.status === 401){
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.status+" "+res.data.msg);
                        }
                    })
                }).catch((e) => {

                });
            },
            //删除
            handleDelete(iid){
                this.$confirm(this.$t('lang.delete_ok')+':' || '确定删除?', this.$t('lang.confirm_account_prompt')+':' || '提示', {
                    confirmButtonText: this.$t('lang.confirm')+':' || '确定',
                    cancelButtonText: this.$t('lang.abolish')+':' || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    let params = {
                        id: iid,
                        customer_id: this.$route.params.id
                    };
                    updateDeleteCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message(this.$t('lang.deleted_ok')+':' || '删除完成');
                             if( this.listLoading==false){this.getItems();};
                        } else {
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    })
                }).catch((e) => {

                });
            },

            //重发开户邮件
            handleResend_email(iid){
                this.$confirm( this.$t('lang.repetition_email')+':' || '确定要重发开户邮件', this.$t('lang.confirm_account_prompt')+':' || '提示', {
                    confirmButtonText: this.$t('lang.confirm')+':' || '确定',
                    cancelButtonText: this.$t('lang.abolish')+':' || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    let params = {
                        // id: this.$route.params.id,
                        id: iid,
                    };
                    updateResend_emailCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message(this.$t('lang.post_email')+':' || '邮件已重发，请查收');
                             if( this.listLoading==false){this.getItems();};
                        } else {
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    })
                }).catch((e) => {

                });
            },
            //设置 只读
            setOnlyRead(iid){
                this.$confirm(this.$t('lang.read_nly')+':' || '确定修改为只读状态', this.$t('lang.confirm_account_prompt')+':' || '提示', {
                    confirmButtonText: this.$t('lang.confirm')+':' || '确定',
                    cancelButtonText: this.$t('lang.abolish')+':' || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    let params = {
                        // id: this.$route.params.id,
                        id: iid,
                    };
                    updateSet_read_onlyCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message(this.$t('lang.read_nly_ok')+':' || '只读设置成功');
                             if( this.listLoading==false){this.getItems();};
                        } else {
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    })
                }).catch((e) => {

                });
            },
            //重置密码
            reSetDealPassword(iid){
                this.$confirm( this.$t('lang.repetition_pass')+':' || '确定重置交易密码', this.$t('lang.confirm_account_prompt')+':' || '提示', {
                    confirmButtonText: this.$t('lang.confirm')+':' || '确定',
                    cancelButtonText: this.$t('lang.abolish')+':' || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    let params = {
                        // id: this.$route.params.id,
                        id: iid,
                    };
                    update_passwordCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message(this.$t('lang.repetition_pass_ok')+':' || '重置密码成功并已发送邮件，请查收！');
                            if( this.listLoading==false){this.getItems();};

                        } else {
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    })
                })

            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },
            isNull(val){
                var v = isNull(val);
                return v == ' - - ' ? v : "1:" + v;
            },
            centToDollar(val){
                return centToDollar(val);
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
    .el-row {
        text-align: right;
    }
    .el-row {
        margin-bottom: 2px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
