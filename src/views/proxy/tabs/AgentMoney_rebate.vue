<template>
    <section>
        <el-table :data="items" stripe style="width: 100%"  :header-row-style="headerRowStyle">
            <el-table-column label="返利时间"><template slot-scope="scope"> <span>{{isNull(scope.row.rebate_date)}}</span></template> </el-table-column>
            <!--<el-table-column label="返利代理账号"><template slot-scope="scope"> <span>{{isNull(scope.row.account_no)}}</span></template></el-table-column>-->
            <!--<el-table-column label="客户账号"><template slot-scope="scope"> <span>{{isNull(scope.row.source_account_no)}}</span></template> </el-table-column>-->
            <!--<el-table-column label="客户姓名"><template slot-scope="scope"> <span>{{isNull(scope.row.source_account_user_name)}}</span></template> </el-table-column>-->
            <!--<el-table-column label="账户余额"><template slot-scope="scope"> <span>{{centToDollar(scope.row.source_account_balance)}}</span></template> </el-table-column>-->
            <!--<el-table-column label="返利率"><template slot-scope="scope"> <span>{{isCalculate(scope.row.balance_rebate,scope.row.account_balance,1)}}</span></template></el-table-column>-->
            <el-table-column label="返利金额（USD)">
                <template slot-scope="scope"> <el-button type="text" @click="alertDetail(scope.row.rebate_date)">{{centToDollar(scope.row.daily_amount)}}</el-button></template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

        <!-- 弹框 -->
        <el-dialog title="余额返利明细" :visible.sync="dialogTableVisible">
            <el-table stripe :data="dialogList">
                <el-table-column prop="gmt_create" label="日期" width="150"></el-table-column>
                <el-table-column prop="source_account_no" label="客户账号" width="200"></el-table-column>
                <el-table-column prop="source_account_full_name" label="客户姓名"></el-table-column>
                <el-table-column label="账户余额"><template slot-scope="scope"> <span>{{centToDollar(scope.row.source_account_balance)}}</span></template></el-table-column>
                <el-table-column label="返利率"><template slot-scope="scope"> <span>{{isCalculate(scope.row.rate)}}</span></template></el-table-column>
                <el-table-column label="余额返利"><template slot-scope="scope"> <span>{{centToDollar(scope.row.amount)}}</span></template></el-table-column>
            </el-table>
        </el-dialog>
    </section>
</template>
<script>
    import {agentRebateList, agentRebateDialogList} from '../../../api/agent_api';
    import {isCalculate, isNull, centToDollar} from '../../../common/js/commons';
    import dict from '../../../common/js/dict';

    export default {
        //components: {ElInput},
        //父页面传来的数据
        props: ["agent_id"],
        data() {
            return {
                dialogTableVisible: false,
                order_column: "",
                order_by: "",
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                items:[{    //返利率 balance_rebate/account_balance
                    change_time: '',//返利时间
                    account_no: '',//返利代理账号
                    source_account_no: '',//客户账号
                    source_account_user_name: '',//客户姓名
                    source_account_balance: '',//账户余额
                    account_balance: '',
                    balance_rebate: '',//返利金额
                }],
                dialogList: [],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
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
            handlePagerChange(){this.showItems();},
            //根据代理id 数据
            showItems() {
                this.listLoading=true;
                let condition = {};
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: '',
                    order_by: '',
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                agentRebateList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.items = result.items;
                            this.pager.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                        //this.$message(res.data.msg);
                    }
                });
            },
            //弹框
            alertDetail(rebate_date){
                this.dialogTableVisible = true;
                let condition = {};
                condition.start_time = rebate_date;
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: '',
                    order_by: '',
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no
                };
                agentRebateDialogList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        if(result){
                            this.dialogList = result.items;
                        }

                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            isNull(val){
                return isNull(val);
            },
            isCalculate(v){
                return v/10000+"%";
            },
            centToDollar(val){
                return centToDollar(val);
            }
        },
        mounted()
        {
            this.$nextTick(function(){
                this.showItems();
            })
        }
    }
</script>
<style lang="scss" scoped>

</style>
