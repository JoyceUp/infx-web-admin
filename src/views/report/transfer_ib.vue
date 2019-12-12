<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="代理姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_from">
                    <el-input
                            placeholder="转出账号"
                            v-model.trim="filters.account_from">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_to">
                    <el-input
                            placeholder="转入账号"
                            v-model.trim="filters.account_to">
                    </el-input>
                </el-form-item>
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.createDate"  start-placeholder="提交时间(GMT)"
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
                    <el-button type="primary" size="small" @click="searchList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="resetSearch('filters')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="exportExcel">导出</el-button>
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
                    prop="fullname"
                    label="代理姓名">
            </el-table-column>
            <el-table-column
                    prop="withdraw_account"
                    label="转出账号">
            </el-table-column>
            <el-table-column
                    prop="deposit_account"
                    label="转入账号">
            </el-table-column>
            <el-table-column width="120"
                             prop="amount"
                             :formatter="cent2dollar"
                             label="转账金额(USD)">
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

    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {centToDollar} from "../../common/js/commons"

    export default {
        props: ["params", "request_type"],
        data() {
            return {
                defaultTime: ["00:00:00", "23:59:59"],
                clearable:false,
                listLoading: false,
                statistics: {},     //统计
                options: {
                    status: dict.transfer_status,
                    customer_ib_type: dict.customer_ib_type,
                    order_status: dict.order_status
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
                    full_name: '',
                    account_from: '',
                    account_to: '',
                    order_time_from: '',
                    order_time_to: '',
                    update_time_from: '',
                    update_time_to: '',
                    createDate: '',
                    updateDate: ''
                },
                dialog: {
                    title: "查看详情",
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth: '80px',

                    in_withdraw_data: [],
                    in_withdraw_data_total: 100,
                    transfer_data: [],
                    transfer_data_total: 110,
                    hold_record_data: [],
                    hold_record_data_total: 110,

                }
            }
        },
        methods: {
            //美分变美元
            cent2dollar(row, column) {
                if (column) {
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
                this.getTransferList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getTransferList();
            },
            //查询列表
            getTransferList() {
                this.listLoading = true;
                let condition = {
                    full_name: this.filters.full_name,
                    withdraw_accoun_no: this.filters.account_from,
                    deposit_account_no: this.filters.account_to,
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
                report_api.transferList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }

                    this.listLoading = false;
                });
            },
            exportExcel() {

                let condition = {
                    full_name: this.filters.full_name,
                    withdraw_accoun_no: this.filters.account_from,
                    deposit_account_no: this.filters.account_to,
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

                report_api.transferExport(params).then((res) => {
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
                this.dialog.dialogData = {};
                this.$refs['userFormRef'].resetFields();
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                this.filters.update_time_from = "";
                this.filters.update_time_to = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getTransferList();
            },
            tableStatusFormatter(row, column) {
                return dict.order_status[row[column.property]];
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getTransferList();
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