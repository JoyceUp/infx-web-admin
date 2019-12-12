<template>
    <section>
        <!--客户交易返佣数据-->
        <el-table
                :header-row-style="headerRowStyle"
                :data="rebateInfoData"
                stripe
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    prop="gmt_create"
                    align="center"
                    :label="$t('lang.change_time') || '返佣时间'">
            </el-table-column>
            <el-table-column
                    prop="sales_account_no"
                    align="center"
                    :label="$t('lang.sale_account_no') || '销售账号'">
            </el-table-column>
            <el-table-column
                    prop="source_account_no"
                    align="center"
                    :label="$t('lang.customer_account_no') || '客户账号'">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    align="center"
                    :label="$t('lang.full_name') || '客户姓名'">
            </el-table-column>
            <el-table-column
                    prop="trading_symbol"
                    align="center"
                    :label="$t('lang.trading_symbol') || '交易品种'">
            </el-table-column>
            <el-table-column
                    prop="trading_volume"
                    align="center"
                    :formatter="exceptValue"
                    :label="$t('lang.trading_volume') || '交易量'">
            </el-table-column>
            <el-table-column
                    prop="commission"
                    align="center"
                    :formatter="rebateFormat"
                    :label="$t('lang.commission') || '返佣比例'">
            </el-table-column>
            <el-table-column
                    prop="amount"
                    align="center"
                    :formatter="exceptValue"
                    :label="$t('lang.re_amount') || '返佣金额(USD)'">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.page_size"
                    :page-sizes="pager.sizes"
                    background
                    :current-page="pager.page_no"
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
//    import * as api from '../../api/sale'
    import * as api from '../../api/sale_api'
    export default {
        //父页面传来的数据
        // props: ["sale_id"],
        data() {
            return {
                listLoading :false,
                sale_id: '',
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                // rebateData: {
                //     rebate_date: "",
                //     customer_id: "",
                //     customer_name: "",
                //     transaction_type: "",
                //     transaction_count: "",
                //     rebate_rate: "",
                //     rebate_amount: ""
                // },
                //客户交易表格返佣数据
                rebateInfoData: []
            };
        },
        methods: {
            exceptValue(row,column){
                if(column) {
                    let val = row[column.property]/100
                    return val.toFixed(2)
                }
            },
            rebateFormat(row,column){
                    let val = row.amount/row.trading_volume
                    return val.toFixed(2) +"USD/手";
            },
            //分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.showRebateInfo();
            },
            //分页page_no发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.showRebateInfo();
            },
            //根据销售id搜索数据
            showRebateInfo() {
                this.listLoading = true;
                let params = {
                    sale_id: this.sale_id,
                    order_column: 'order_time',
                    order_by: 'desc',
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no
                };
                api.getBrokerageList(params).then((res) => {

                    if (res.data.status == 200) {
                        this.listLoading = false;
                        let data = JSON.parse(res.data.datas);
                        this.rebateInfoData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            //初始化页面数据
            initData() {
                this.sale_id = this.$route.params.id;
                this.showRebateInfo();
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initData();  //初始化页面数据
            })

        }
    };
</script>


<style scoped>

</style>