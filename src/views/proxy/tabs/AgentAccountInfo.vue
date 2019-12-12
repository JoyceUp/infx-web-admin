<template>
    <section>
        <el-table :data="items" stripe style="width: 100%" >
            <el-table-column prop="gmt_create" label="创建日期" width="180"> </el-table-column>
            <el-table-column prop="account_no" label="代理账号" width="180"> </el-table-column>
            <el-table-column label="账户类型" width="150">
                <template slot-scope="scope">
                    <span>{{ accountTypeOptions[scope.row.account_type]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="余额" width="150"><template slot-scope="scope"><span>{{centToDollar(scope.row.balance)}}</span></template></el-table-column>
            <el-table-column label="状态" width="150">
                <template slot-scope="scope">
                    <span>{{ changeStatus(scope.row.state,stateOptions) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  :disabled="scope.row.state == 1 || scope.row.state == 2" @click="handleEnable(scope.row.id)">启用</el-button>
                    <el-button  :disabled="scope.row.state == 51 || scope.row.state == 2" @click="handleDisable(scope.row.id)">禁用</el-button>
                    <el-button  :disabled="scope.row.state == 2" @click="handleDelete(scope.row.id)">删除</el-button>
                    <!--<el-button  :disabled="scope.row.state == 51 || scope.row.state == 2" @click="handleResend_email(scope.row.id)">重发开户邮件</el-button>-->
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
    import {agentAccountlist, updaEnableAccountInfo, updaDisableAccountInfo, updaDeleteAccountInfo, updaResend_emailAccountInfo} from '../../../api/agent_api';
    import dict from '../../../common/js/dict';
    import {centToDollar} from '../../../common/js/commons';

    export default {
        //父页面传来的数据
        props:['agent_id'],
        data() {
            return {
                listLoading: false,
                order_column: "",
                order_by: "",
                items:[{
                    id:'',
                    account_no:'',   //代理账号
                    account_type: '',//账户类型
                    balance: '',     //余额(单位美分)
                    state: '',       //状态
                    gmt_create: ''   //创建时间
                }],
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
                this.listLoading=true;
                let condition = {};
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                };
                agentAccountlist(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.listLoading=false;
                            this.items = result.items;
                            this.pager.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            handleEnable( iid ){
                this.$confirm('确认启用此账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: iid,
                    };
                    updaEnableAccountInfo(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message({message:'启用成功！', type: 'success'});
                            if (this.listLoading == false) {
                                this.getItems();
                            };
                        } else {
                            // this.$message.error(res.data.msg);
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.msg);
                        }
                    })
                })
            },
            handleDisable(iid){
                this.$confirm('确认禁用此账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        // id: this.$route.params.id,
                        id: iid,
                    };
                    updaDisableAccountInfo(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message({message:'禁用成功！' ,type: 'success'});
                            if (this.listLoading == false) {
                                this.getItems();
                            }
                            ;
                        } else {
                            // this.$message.error(res.data.msg);
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.msg);
                        }
                    })
                })
            },
            handleDelete(iid){
                this.$confirm('您确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        // id: this.$route.params.id,
                        id: iid,
                        ib_id: this.$route.params.id
                    };
                    updaDeleteAccountInfo(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if (res.data.status === 200) {
                            this.$message('删除成功！');
                            this.getItems();
                        } else {
                            // this.$message.error(res.data.msg);
                            if (res.data.status === 401) {
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            /*handleResend_email(iid){
                let params = {
                    // id: this.$route.params.id,
                    id: iid,
                };
                updaResend_emailAccountInfo(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status === 200) {
                        this.$message('邮件已重发，请查收！');
                         if( this.listLoading==false){this.getItems();};
                    } else {
                        // this.$message.error(res.data.msg);
                        if (res.data.status === 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },*/
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },
            centToDollar(val){
                return centToDollar(val);
            }
        },
        mounted()
        {
            this.$nextTick(function(){
                this.getItems();
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
    .d_f_l{
        float:left;margin-right: 10px;
    }
    .dis{
        disabled: disabled;
    }
    .ena{
        display: block;
    }
</style>
