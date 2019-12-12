<template>
    <section>
        <el-table stripe :data="deposit_withdraw" style="width: 100%" size="small">
            <el-table-column prop="gmt_create" :label="$t('lang.account_gmt_create') || '创建时间'"></el-table-column>
            <el-table-column prop="order_no" :label="$t('lang.order_no') || '订单编号'"></el-table-column>
            <el-table-column prop="account_no" :label="$t('lang.mt_account') || 'MT4账号'"></el-table-column>
            <el-table-column :label="$t('lang.channel_type') || '资金类型'">
                <template slot-scope="scope"><span>{{ changeStatus(scope.row.channel_type, channelTypeOptions) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('lang.apply_amount') || '申请金额(USD)'">
                <template slot-scope="scope"><span>{{ dividedBy100(scope.row.amount) }}</span></template>
            </el-table-column>
            <el-table-column :label="$t('lang.status') || '订单状态'">
                <template slot-scope="scope"><span>{{ changeStatus(scope.row.status, statusOptions) }}</span></template>
            </el-table-column>
            <el-table-column prop="remark" :label="$t('lang.remark') || '处理备注'"></el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background
                           layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import {deposit_withdrawCustomersList} from '../../../../api/customers_api';
    import dict from '../../../../common/js/dict';
    import {dividedBy100} from '../../../../common/js/commons';

    export default {
        data() {
            return {
                listLoading: false,
                activeNames: ['1'],
                order_column: "",
                order_by: "",
                //出入金记录
                deposit_withdraw: [],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                statusOptions: dict.funds_status,
                channelTypeOptions: dict.funds_channel_type,
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
            handlePagerChange() {this.getUserInfoDetail();},
            getUserInfoDetail() {
                let condition = {};
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "",
                    order_by: "",
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                this.listLoading = true;
                deposit_withdrawCustomersList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if (result != null) {
                            this.listLoading = false;
                            this.deposit_withdraw = result.items;
                            this.pager.total = result.total;
                        }
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            changeStatus(row, options) {
                let val = '';
                options.forEach((item) => {
                    if (item.value == row) {
                        val = item.key;
                    }
                });
                return val;
            },
            dividedBy100(val) {
                return dividedBy100(val);
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getUserInfoDetail();
            });
        }
    }
</script>
<style lang="scss" scoped>
    .container .main .content-container {
        background-color: #F7F7F7;
        font-size: 12px;
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
