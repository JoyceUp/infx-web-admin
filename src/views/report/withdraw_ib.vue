<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters"  size="medium">
                <el-form-item prop="order_no">
                    <el-input
                            placeholder="订单编号"
                            v-model.trim="filters.order_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            placeholder="代理账号"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="代理姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="cause">
                    <el-select clearable  placeholder="资金类型" v-model="filters.cause">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.withdraw_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable  placeholder="订单状态" v-model="filters.order_status">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.status"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.createDate" start-placeholder="提交时间(GMT)"
                                end-placeholder="提交时间(GMT)"
                                placeholder="选择时间范围" @change="handleCreateDateChange"
                                type="datetimerange"
                                :default-time="defaultTime"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="updateDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.updateDate" start-placeholder="MT4操作时间(GMT)"
                                end-placeholder="MT4操作时间(GMT)"
                                placeholder="选择时间范围" @change="handleUpdateDateChange"
                                type="datetimerange"
                                :default-time="defaultTime"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small"  @click="searchList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="resetSearch('filters')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="exportExcel">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--数据列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :data="datas"
                style="width: 100%">
            <el-table-column
                    width="100"
                    prop="order_no"
                    label="订单编号">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="account_no"
                    label="代理账号">
            </el-table-column>
            <el-table-column
                    prop="fullname"
                    label="代理姓名">
            </el-table-column>
            <el-table-column
                    prop="cause_type"
                    :formatter="tableWithdrawTypeFormatter"
                    label="资金类型">
            </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="cent2dollar"
                    prop="amount"
                    label="申请金额(USD)">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="withdraw_count"
                    label="本月出金次数">
            </el-table-column>
            <el-table-column
                    width="80"
                    prop="poundage"
                    :formatter="cent2dollar"
                    label="手续费">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="rate"
                    :formatter="getRate"
                    label="汇率">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="cny_pay_amount"
                    :formatter="payAmountCNY"
                    label="支付金额(CNY)">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="usd_pay_amount"
                    :formatter="payAmountUSD"
                    label="支付金额(USD)">
            </el-table-column>
            <el-table-column
                    prop="status"
                    :formatter="tableStatusFormatter"
                    label="状态">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="sale_account_no"
                    label="销售账号">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="sale_name"
                    label="销售姓名">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="dept_name"
                    label="部门">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="create_date"
                    label="提交时间(GMT)">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="mt4_time"
                    label="MT4操作时间(GMT)">
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


    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as report_api from '../../api/report_api.js';
    import * as date from "../../common/js/date"
    import {centToDollar,computeRate} from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';

    export default {
        props: ["params"],
        data() {
            return {
                defaultTime: ["00:00:00", "23:59:59"],
                clearable:false,
                listLoading :false,
                statistics: {},     //统计
                options: {
                    type: dict.withdraw_type,
                    withdraw_type: dict.withdraw_withdraw_type,
                    status: dict.withdraw_status,
                    order_status: dict.order_status,
                    balance_change_type:dict.balance_change_type
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
                    order_no: '',
                    account_no: '',
                    full_name: '',
                    cause: '',
                    order_status: '',
                    order_time_from: '',
                    order_time_to: '',
                    update_time_from: '',
                    update_time_to: '',
                    createDate: '',
                    updateDate: ''
                },
            }
        },
        methods: {
            //放大图片
            showBigImg(src) {
                this.dialog.imgSrc = src;
                this.dialog.dialogImgVisible = true;
            },
            //汇率
            getRate(row, column) {
                if (column) {
                    return computeRate(row[column.property]);
                }
                return computeRate(row);
            },
            //支付金额CNY
            payAmountCNY(row, column){
                let val = row[column.property];
                if(val) {
                    return this.cent2dollar(val);
                }
                return '';
            },
            //支付金额USD
            payAmountUSD(row, column){
                let val = row[column.property];
                if(val) {
                    return this.cent2dollar(val);
                }
                return '';
            },
            //美分变美元
            cent2dollar(row, column)
            {
                if(column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //提交时间发生改变
            handleCreateDateChange(val) {
                if (val) {
                    this.filters.order_time_from = val[0];
                    this.filters.order_time_to = val[1];
                } else {
                    this.filters.order_time_from = '';
                    this.filters.order_time_to = '';
                }
            },
            //提交时间发生改变
            handleUpdateDateChange(val) {
                if (val) {
                    this.filters.update_time_from = val[0];
                    this.filters.update_time_to = val[1];
                } else {
                    this.filters.update_time_from = '';
                    this.filters.update_time_to = '';
                }
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
                this.getWithdrawList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getWithdrawList();
            },
            //查询列表
            getWithdrawList() {
                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    create_begin: this.filters.order_time_from,
                    create_end: this.filters.order_time_to,
                    mt4_begin: this.filters.update_time_from,
                    mt4_end: this.filters.update_time_to,
                    user_type: '2' // 代理
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                report_api.withdrawList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        console.log()
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
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    create_begin: this.filters.order_time_from,
                    create_end: this.filters.order_time_to,
                    mt4_begin: this.filters.update_time_from,
                    mt4_end: this.filters.update_time_to,
                    export: "1",
                    user_type: '2' // 代理
                };
                let params = {
                    condition: condition
                };

                report_api.withdrawExport(params).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        console.log("res",res);
                        console.log("res.data",res.data);
                        console.log("res.data.status",res.data.status);
                        console.log("res.data.msg",res.data.msg);
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
                this.dialog.activeName = "1";
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                this.filters.update_time_from = "";
                this.filters.update_time_to = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getWithdrawList();
            },
            tableTypeFormatter(row, column) {
                return dict.customer_ib_type[row[column.property]];
            },
            tableWithdrawTypeFormatter(row, column) {
                return dict.balance_change_type[row[column.property]];
            },
            tableStatusFormatter(row, column) {
                return dict.order_status[row[column.property]];
            },

        },
        mounted() {
            this.$nextTick(function () {
                this.getWithdrawList();
            })
        }

    }
</script>
<style>
    .el-table .cell
    {
        padding-left:5px!important;
        padding-right:5px!important;
    }
</style>