<template>
<section>
    <!--余额返利信息-->
    <el-table stripe :data="transfer" style="width: 100%" size="small">
        <el-table-column prop="rebate_date" :label="$t('lang.change_time_day') || '返利日期'">
            <template slot-scope="scope">
                <span>{{isBirthDate(scope.row.rebate_date)}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('lang.daily_amount') || '返利金额（USD)'">
            <template slot-scope="scope">
                <el-button  type="text" @click="alertDetail(scope.row)">
                    <span>{{ dividedBy100(scope.row.daily_amount) }}</span>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">
        <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                       :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
        </el-pagination>
    </el-col>
    <!-- 弹框 -->
    <el-dialog :title="$t('lang.balance_detail') || '余额返利明细'" :visible.sync="dialogTableVisible">
        <el-table stripe :data="dialogList">
            <el-table-column prop="gmt_create" :label="$t('lang.balance_date') || '日期'">
                <template slot-scope="scope">
                    <span>{{isBirthDate(scope.row.gmt_create)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="source_account_no" :label="$t('lang.source_account_no') || '下级账号'"> </el-table-column>
            <el-table-column prop="source_account_full_name" :label="$t('lang.source_account_name') || '下级姓名'"> </el-table-column>
            <el-table-column
                    prop="source_account_balance"
                    :label="$t('lang.balance') || '账户余额'"
                    :formatter="exceptValue"
            >
            </el-table-column>
            <el-table-column
                    :label="$t('lang.balance_rate') || '返利率'"
                    prop="rate"
            >
                <template slot-scope="scope">
                    <span>
                        {{computeRate(scope.row.rate)}}%
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    :label="$t('lang.balance_amount') || '余额返利'"
                    prop="amount"
                    :formatter="exceptValue"
            >
            </el-table-column>
        </el-table>
    </el-dialog>
    </section>
</template>
<script>
    import {balanceRebate ,rebateDetail } from '../../../../api/customers_api';
    import { agentRebateList, agentRebateDialogList} from '../../../../api/agent_api';
    import dict from '../../../../common/js/dict';
    import {computeRate,dividedBy100,isBirthDate} from '../../../../common/js/commons';

    export default {
        data() {
            return {
                dialogTableVisible: false,
                listLoading:false,
                order_column: "",
                order_by: "",
                //转账记录
                transfer:[{
                    gmt_create: '',  //创建时间
                    order_no: '',    //订单编号
                    account_no: '',  //转出账号
                    target_account_no: '', //转入账号
                    amount: '',      //转账金额
                    status: '',  //状态
                    remark: '',  //处理备注
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                statusOptions: dict.funds_status,
                dialogList: [],
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
            handlePagerChange(){this.getUserInfoDetail();},
            //返利明细
            getUserInfoDetail() {
                this.listLoading=true;
                let condition = {};
                    condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "gmt_create",
                    order_by: "desc",
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                balanceRebate(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.listLoading=false;
                            this.transfer = result.items;
                            this.pager.total = result.total;
                        }
                    } else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            exceptValue(row,column){
                if(column) {
                    let val = row[column.property]/100
                    return val.toFixed(2)
                }
            },
            rebateFormat(row,column){
                let val = row.amount/row.source_account_balance
                return val.toFixed(2) + this.$t('lang.usd_s')+':' || 'USD/手';
            },
            computeRate(val){
                return computeRate(val);
            },
            dividedBy100(val){
                return dividedBy100(val);
            },
            isBirthDate(val){
                return isBirthDate(val);
            },
            alertDetail(rebate_date){
                this.dialogTableVisible = true;
                let condition = {};
                condition.start_time = rebate_date.rebate_date;
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: '',
                    order_by: '',
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no
                };
                rebateDetail(params).then((res)=>{
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
        },
        mounted()
        {
            this.$nextTick(function(){
                this.getUserInfoDetail();
            });
        }
    }
</script>
<style lang="scss" scoped>
    .container .main .content-container{
        background-color:#F7F7F7;
        font-size:12px;
    }

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
