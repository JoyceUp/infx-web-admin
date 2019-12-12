<template>
<section>
        <!--转账记录-->
        <el-table stripe :data="transfer" style="width: 100%" size="small">
            <el-table-column prop="change_time" :label="$t('lang.change_time') || '返佣时间'"> </el-table-column>
            <el-table-column prop="account_no" :label="$t('lang.rebate_account_no') || '返佣账号'"> </el-table-column>
            <el-table-column prop="source_account_no" :label="$t('lang.source_account_no') || '下级账号'"> </el-table-column>
            <el-table-column prop="customer_name" :label="$t('lang.source_account_name') || '下级姓名'"> </el-table-column>
            <el-table-column prop="trading_symbol" :label="$t('lang.trading_symbol') || '交易品种'"> </el-table-column>
            <el-table-column
                prop="trading_volume"
                :label="$t('lang.volume') || '交易量'"
                :formatter="exceptValue"
            >
            </el-table-column>
            <el-table-column
                prop="commission_amount"
                :label="$t('lang.commission_amount') || '返佣比例'"
                :formatter="rebateFormat"
            >
            </el-table-column>
            <el-table-column
                prop="commission_amount"
                :label="$t('lang.commission_mo') || '返佣金额（USD)'"
                :formatter="exceptValue"
            >
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import { agentCommissionList } from '../../../../api/customers_api';
    import dict from '../../../../common/js/dict';
    import {dividedBy100} from '../../../../common/js/commons';

    export default {
        data() {
            return {
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
                statusOptions: dict.funds_status
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
                agentCommissionList(params).then((res) => {
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
                let val = row.commission_amount/row.trading_volume
                return val.toFixed(2) + this.$t('lang.usd_s')+':' || 'USD/手';
            }
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
