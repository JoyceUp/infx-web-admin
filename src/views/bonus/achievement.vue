<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                v-model="filters.date"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            placeholder="销售账号"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="销售姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="cause">
                    <el-select clearable placeholder="销售类别" v-model="filters.type">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.deposit_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="account_type">
                    <el-select clearable placeholder="部门" v-model="filters.department">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable placeholder="组" v-model="filters.group">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.status"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchList" size="small">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetSearch('filters')" size="small">清空</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="exportExcel" size="small">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--数据列表-->
        <el-table
                :data="datas"
                stripe
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    width="100"
                    prop="year"
                    label="年月">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="account_no"
                    label="销售账号">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    label="销售姓名">
            </el-table-column>
            <el-table-column
                    prop="account_type"
                    :formatter="tableTypeFormatter"
                    label="销售类别">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="amount"
                    :formatter="cent2dollar"
                    label="职位名称">
            </el-table-column>
            <el-table-column
                    prop="cause"
                    :formatter="tableDepositTypeFormatter"
                    label="部门">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="rate"
                    label="组别">
            </el-table-column>
             <el-table-column
                     width="120"
                     :formatter="payAmountUSD"
                     prop="pay_amount"
                     label="余额返利(USD)">
             </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="payAmountUSD"
                    prop="pay_amount"
                    label="交易返佣(USD)">
            </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="payAmountUSD"
                    prop="pay_amount"
                    label="销售提成(USD)">
            </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="payAmountUSD"
                    prop="pay_amount"
                    label="总监提成(USD)">
            </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="payAmountUSD"
                    prop="pay_amount"
                    label="本月合计(USD)">
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="achievementDetails(scope.row.id, scope.row.cause)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--分页-->
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

        <!-- 业绩详情 -->
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" :before-close="resetDialogData"
                   class="text-from">
            <!--数据列表-->
            <el-table
                    :data="dialog.dialogData"
                    stripe
                    v-loading="dialog.listLoading"
                    style="width: 100%">
                <el-table-column
                        width="100"
                        prop="year"
                        label="日期">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="account_no"
                        label="销售账号">
                </el-table-column>
                <el-table-column
                        prop="full_name"
                        label="销售姓名">
                </el-table-column>
                <el-table-column
                        prop="account_type"
                        :formatter="tableTypeFormatter"
                        label="销售类别">
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="amount"
                        :formatter="cent2dollar"
                        label="职位名称">
                </el-table-column>
                <el-table-column
                        prop="cause"
                        :formatter="tableDepositTypeFormatter"
                        label="部门">
                </el-table-column>
                <el-table-column
                        width="60"
                        prop="rate"
                        label="组别">
                </el-table-column>
                <el-table-column
                        width="120"
                        :formatter="payAmountUSD"
                        prop="pay_amount"
                        label="余额返利(USD)">
                </el-table-column>
                <el-table-column
                        width="120"
                        :formatter="payAmountUSD"
                        prop="pay_amount"
                        label="交易返佣(USD)">
                </el-table-column>
                <el-table-column
                        width="120"
                        :formatter="payAmountUSD"
                        prop="pay_amount"
                        label="销售提成(USD)">
                </el-table-column>
                <el-table-column
                        width="120"
                        :formatter="payAmountUSD"
                        prop="pay_amount"
                        label="总监提成(USD)">
                </el-table-column>
                <el-table-column
                        width="120"
                        :formatter="payAmountUSD"
                        prop="pay_amount"
                        label="本日合计(USD)">
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <!--分页-->
                <el-pagination
                        style="text-align: center;"
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :page-size="dialog.pager.page_size"
                        :page-sizes="dialog.pager.sizes"
                        background
                        :current-page="dialog.pager.page_no"
                        layout="prev,pager,next,sizes,total"
                        :total="dialog.pager.total">
                </el-pagination>
            </el-col>
        </el-dialog>

    </section>

</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/bonus_api.js';
    import * as date from "../../common/js/date"
    import {centToDollar, computeRate,trimBlank} from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';

    export default {
        props: ["params"],
        data() {
            return {
                listLoading: false,
                statistics: {},     //统计
                options: {
                    type: dict.deposit_type,
                    deposit_type: dict.deposit_deposit_type,
                    status: dict.deposit_status,
                    order_status: dict.order_status,
                    balance_change_type: dict.balance_change_type
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                datas: [],
                filters: {
                    date: '',
                    account_no: '',
                    full_name: '',
                    type: '',
                    department: '',
                    group: ''
                },
                dialog: {
                    listLoading: false,
                    title: "查看明细",
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth: '80px',
                    //分页设置
                    pager: {
                        sizes: [10, 20, 30, 40, 50],
                        total: 0,
                        page_size: 10,
                        page_no: 1
                    }
                }
            }
        },
        methods: {
            //支付金额CNY
            payAmountCNY(row){
                if(row.cause === 4)
                {
                    return "";
                }
                return this.cent2dollar(row.pay_amount);
            },
            //支付金额USD
            payAmountUSD(row){
                if(row.cause === 4)
                {
                    return this.cent2dollar(row.pay_amount);
                }
                return "";
            },
            //美分变美元
            cent2dollar(row, column) {
                if (column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            //page_no
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getDepositList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getDepositList();
            },
            //查询列表
            getDepositList() {

                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: trimBlank(this.filters.cause),
                    account_type: trimBlank(this.filters.account_type),
                    order_status: trimBlank(this.filters.order_status),
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to)
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.achievementList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                    this.listLoading = false;
                });
            },
            exportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: trimBlank(this.filters.cause),
                    account_type: trimBlank(this.filters.account_type),
                    order_status: trimBlank(this.filters.order_status),
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to)
                };
                money_api.achievementExport(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.dialogData = {};
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getDepositList();
            },
            //分页page_size发生改变
            handleSizeChange1(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange1();
            },
            //page_no
            handleCurrentChange1(val) {
                this.pager.page_no = val;
                this.handlePagerChange1();
            },
            //分页引起的页面数据更改
            handlePagerChange1() {
                this.achievementDetails();
            },
            achievementDetails(id, cause) {
                let params = {
                    order_id: id,
                    cause: cause
                };
                money_api.achievementDetails(params).then((res) => {
                    if (res.data.status === 200) {
                        let row = JSON.parse(res.data.datas);

                        this.dialog.dialogFormVisible = true;
                        this.dialog.dialogData = row;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                });
            },
            tableTypeFormatter(row, column) {
                return dict.customer_ib_type[row.account_type];
            },
            tableDepositTypeFormatter(row, column) {
                return dict.balance_change_type[row.cause];
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getDepositList();
            })
        }
    }
</script>

<style lang="scss">
    .el-button {
        margin: 4px !important
    }
    .el-table .cell
    {
        padding-left:5px!important;
        padding-right:5px!important;
    }
</style>