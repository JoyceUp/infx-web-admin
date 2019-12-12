<template>
    <section>
        <!--余额清零记录-->
        <el-table stripe :data="clear_balance" style="width: 100%" >
            <el-table-column prop="order_no" label="订单编号"></el-table-column>
            <el-table-column prop="account_no" label="MT4账号"></el-table-column>
            <el-table-column label="金额(USD)"><template slot-scope="scope"> <span>{{ dividedBy100(scope.row.amount) }}</span></template></el-table-column>
            <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
            <el-table-column label="状态"><template slot-scope="scope"> <span>{{ changeStatus(scope.row.status, statusOptions) }}</span></template></el-table-column>
            <el-table-column prop="remark" label="处理备注"></el-table-column>
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
    import {clear_balanceCustomersList} from '../../../../api/customers_api';
    import {dividedBy100} from '../../../../common/js/commons';
    import dict from '../../../../common/js/dict';

    export default {
        data() {
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                //余额清零记录
                clear_balance: [{
                    order_no: '',   //订单编号
                    account_no: '', //MT4账号
                    amount: '',     //金额(USD)
                    gmt_create: '', //创建时间
                    status: '',     //状态
                    remark: '',     //处理备注
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
            dividedBy100(val){
                return dividedBy100(val);
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
            getUserInfoDetail() {
                this.listLoading=true;
                let condition = {};
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "",
                    order_by: "",
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                clear_balanceCustomersList(params).then((res) => {
                    this.listLoading=false
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.clear_balance = result.items;
                            this.pager.total = result.total;
                        }
                    } else{
                        this.$message.error(res.data.msg);
                    }
                })
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
