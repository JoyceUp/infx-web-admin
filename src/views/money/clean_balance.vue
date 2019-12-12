<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters"  size="medium">
                <el-form-item prop="order_no">
                    <el-input
                            placeholder="订单号"
                            v-model.trim="filters.order_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            placeholder="mt4账号"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable placeholder="订单状态"  v-model="filters.order_status">
                        <el-option :key="value" :label="txt" :value="value" v-for="(txt, value) in options.status_type" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.createDate" type="daterange" start-placeholder="提交时间" end-placeholder="提交时间"
                                placeholder="选择时间范围" @change="handleCreateDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <!--<el-form-item prop="updateDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.updateDate" type="daterange" start-placeholder="更新时间" end-placeholder="更新时间"
                                placeholder="选择时间范围" @change="handleUpdateDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>-->

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
            <!--<el-table-column
                    type="index"
                    width="50" label=" ">
            </el-table-column>
            <el-table-column
                    prop="order_no"
                    label="订单号">
            </el-table-column>-->
            <el-table-column
                    prop="account_no"
                    label="MT4账号">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    :formatter="cent2dollar"
                    prop="amount"
                    label="申请金额$">
            </el-table-column>
            <el-table-column width="160"
                    prop="gmt_create"
                    label="提交时间">
            </el-table-column>
  <!--          <el-table-column
                    prop="gmt_modified"
                    label="更新时间">
            </el-table-column>-->
            <el-table-column
                    prop="order_status"
                    :formatter="tableStatusFormatter"
                    label="状态">
            </el-table-column>
            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <el-button size="mini"
                            @click="clearBalanceDetails(scope.row.id)">查看
                    </el-button>
                    <el-button size="mini"
                            type="danger"
                            @click="clearBalanceClear(scope.row.id)" v-if="roleDisplay.completeDisplay && scope.row.completeDisplay">完成
                    </el-button>
                    <el-button size="mini"
                            type="danger"
                            @click="clearBalanceManualClear(scope.row.id)"  v-if="roleDisplay.manualDisplay&& scope.row.manualDisplay">处理
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="clearBalanceIgnore(scope.row.id)" v-if="roleDisplay.ignoreDisplay&& scope.row.ignoreDisplay">忽略
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


        <!-- 出金详情 -->
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" :before-close="resetDialogData">
            <el-tabs >
                <el-tab-pane label="余额清零详情">
                    <span slot="label"><i class="el-icon-date"></i> 余额清零详情</span>
                    <el-form :model="dialog.dialogData"  ref="userFormRef" :label-width="dialog.formLabelWidth" >
                        <el-form-item label="订单号：">
                            <span>{{ dialog.dialogData.order_no }}</span>
                        </el-form-item>
                        <el-form-item label="姓名：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.full_name }}</span>
                        </el-form-item>
                        <el-form-item label="MT4账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item label="账户类型：" :label-width="dialog.formLabelWidth">
                            <span>{{ options.account_type[dialog.dialogData.account_type] }}</span>
                        </el-form-item>
                       <!-- <el-form-item label="MT4分组" :label-width="dialog.formLabelWidth">
                            <el-input v-model="dialog.dialogData.mt4_group" auto-complete="off"></el-input>
                        </el-form-item>-->

                        <el-form-item label="账户余额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.account_balance) }}</span>
                        </el-form-item>

                        <el-form-item label="申请金额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.amount) }}</span>
                        </el-form-item>
                        <el-form-item label="当前状态：" :label-width="dialog.formLabelWidth">
                            <span>{{ options.status_type[dialog.dialogData.order_status] }}</span>
                        </el-form-item>
                        <el-form-item label="提交时间：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_create }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_modified }}</span>
                        </el-form-item>
                        <el-form-item label="处理备注：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.remark }}</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <!--<el-button @click="resetDialogData">取 消</el-button>-->
            </div>
        </el-dialog>


        <!-- 统计列表 TODO -->

    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/money_api.js';
    import * as date from "../../common/js/date"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {centToDollar} from "../../common/js/commons"

    export default {
        props:["params"],
        data() {
            return {
                roleDisplay:{
                    completeDisplay:false,
                    ignoreDisplay:false,
                    manualDisplay:false,
                },
                listLoading :false,
                statistics: {},     //统计
                options: {
                    status_type: dict.clear_balance_status_type,
                    account_type:dict.customer_ib_type
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                datas: [],
                clearable:false,
                filters: {
                    order_no: '',
                    account_no: '',
                    full_name: '',
                    order_status: '',
                    order_time_from: '',
                    order_time_to: '',
                    createDate: '',
                    /*update_time_from: '',
                    update_time_to: '',
                    updateDate: ''*/
                },
                dialog: {
                    title: "查看详情",
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth:'80px',

                    hold_record_data: [],
                    hold_record_data_total: 110,

                }
            }
        },
        methods: {
            //美分变美元
            cent2dollar(row, column)
            {
                if(column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //负数
            minusCent2dollar(row, column) {
                return 0 - this.cent2dollar(row, column);
            },
            //提交时间发生改变
            handleCreateDateChange(val) {
                this.filters.order_time_from = val[0];
                this.filters.order_time_to = val[1];
            },
            //更新时间发生改变
           /*handleUpdateDateChange(val) {
                this.filters.update_time_from = val[0];
                this.filters.update_time_to = val[1];
            },*/
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
                this.getClearBalanceList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getClearBalanceList();
            },
            //查询列表
            getClearBalanceList() {
                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    /*update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)*/
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };
                money_api.clearBalanceList(params).then((res) => {
                    if(res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    }else{
                        if(res.data.status == 401){
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }

                    this.listLoading = false;
                });
            },
            exportExcel() {

                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    /*update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)*/
                };

                money_api.clearBalanceExport(condition).then((res) => {
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
            clearBalanceDetails(id){
                let params = {order_id: id};
                money_api.clearBalanceDetails(params).then((res) => {
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
            clearBalanceClear(id) {
                this.$confirm('确定余额清零？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        order_id: id
                    };
                    money_api.clearBalanceClear(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '余额清零成功！邮件发送成功！'
                                message: "操作成功"
                            });
                            this.getClearBalanceList();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                            this.getClearBalanceList();
                        }

                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });


            },
            clearBalanceIgnore(id) {
                this.$prompt('请输入忽略原因（必填）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    inputValidator: function (value) {
                        if(value){
                            return true;
                        }else {
                            return false;
                        }
                    },
                    inputErrorMessage: '请输入原因'
                }).then(({value}) => {
                    let params = {
                        order_id: id,
                        remark:value
                    };
                    money_api.clearBalanceIgnore(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '忽略成功！邮件已发!'
                                message: "操作成功"
                            });
                            this.getClearBalanceList();
                        }else{
                            this.$message.error(res.data.status+" "+res.data.msg);
                            this.getClearBalanceList();
                        }

                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },

            clearBalanceManualClear(id) {
                this.$prompt('请输入处理情况（必填）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    inputValidator: function (value) {
                        if(value){
                            return true;
                        }else {
                            return false;
                        }
                    },
                    inputErrorMessage: '请输入处理情况'
                }).then(({value}) => {

                    let params = {
                        order_id: id,
                        remark:value
                    };
                    money_api.clearBalanceManualClear(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已处理完成！'
                                message: "操作成功"
                            });
                            this.getClearBalanceList();
                        }else{
                            this.$message.error(res.data.status+" "+res.data.msg);
                            this.getClearBalanceList();
                        }
                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });
            },
            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.dialogData = {};
                this.$refs['userFormRef'].resetFields();
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from="";
                this.filters.order_time_to="";
                /*this.filters.update_time_from="";
                this.filters.update_time_to="";*/
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getClearBalanceList();
            },
            tableStatusFormatter(row){
                row.completeDisplay=false;
                row.ignoreDisplay=false;
                row.manualDisplay=false;
                switch (row.order_status){
                    case 2:
                        row.completeDisplay=true;
                        row.ignoreDisplay=true;
                        break;
                    case 101:
                        row.manualDisplay=true;
                        row.ignoreDisplay=true;
                        break;
                }
                return this.options.status_type[row.order_status];
            },
            setRoleDidsplay(){
                let user= this.$store.getters.getUserInfo;
                if(!user || !user.role_name){
                    let cuser=util.cookieMethod.getCookie('user')
                    user =  JSON.parse(cuser)
                }
                let role_name=user.role_name;
                if(!role_name)
                {
                    role_name = "";
                }
                if(role_name.indexOf("资金岗") >-1 || role_name.indexOf("admin") >-1 || role_name.indexOf("管理员") > -1){
                    this.roleDisplay.completeDisplay=true;
                    this.roleDisplay.ignoreDisplay=true;
                    this.roleDisplay.manualDisplay=true;
                }

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getClearBalanceList();
                this.setRoleDidsplay();
            })
        }

    }
</script>