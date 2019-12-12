<template>
    <section>
        <!--搜索工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item label="" prop="account_no">
                    <el-input :placeholder="$t('lang.customer_account_no') || '客户账号'" v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="full_name">
                    <el-input :placeholder="$t('lang.full_name') || '客户姓名'" v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="email">
                    <el-input :placeholder="$t('lang.e_email') || '电子邮箱'" v-model.trim="filters.email">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="mobile">
                    <el-input :placeholder="$t('lang.mobile') || '手机号码'" v-model.trim="filters.mobile">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="identity_no">
                    <el-input :placeholder="$t('lang.identity_no') || '证件号码'" v-model.trim="filters.identity_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="parent_account_no">
                    <el-input :placeholder="$t('lang.parent_account_no') || '上级账号'" v-model.trim="filters.parent_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="parent_full_name">
                    <el-input :placeholder="$t('lang.parent_name') || '上级姓名'" v-model.trim="filters.parent_full_name">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="sales_account_no">
                    <el-input :placeholder="$t('lang.sales_account_no') || '销售账号'" v-model.trim="filters.sales_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="sales_full_name">
                    <el-input :placeholder="$t('lang.sale_name') || '销售姓名'" v-model.trim="filters.sales_full_name">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="getCustomers">{{$t('lang.find') || '查询'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="resetForm('filters')">{{$t('lang.reset') || '重置'}}</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--主要功能按钮-->
        <el-col :span="24" class="toolbar">
           <!-- <el-button type="primary" size="small" @click="proxyChange">更换上级</el-button>-->
            <el-button type="primary" size="small" @click="saleChange">{{$t('lang.change_sales') || '更换销售'}}</el-button>
        </el-col>
        <!--客户列表-->
        <el-table
                :header-row-style="headerRowStyle"
                ref="multipleTable"
                :data="customerData"
                tooltip-effect="dark"
                stripe
                v-loading="listLoading"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    :label="$t('lang.full_name') || '客户姓名'"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    :label="$t('lang.mobile') || '手机号码'"
                    align="center" :formatter="mobileValue"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="email"
                    :label="$t('lang.e_email') || '电子邮箱'"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="identity_no"
                    :label="$t('lang.identity_number') || '证件号码'"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="parent_account_no"-->
                    <!--label="上级账号"-->
                    <!--align="center"-->
                    <!--show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="parent_full_name"
                    :label="$t('lang.parent_name') || '上级姓名'"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="sales_account_no"
                    :label="$t('lang.sale_account_no') || '销售账号'"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="sales_full_name"
                    :label="$t('lang.sales_name') || '销售姓名'"
                    align="center"
                    show-overflow-tooltip>
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

        <!--详细操作对话框-选择代理-->
        <el-dialog :title="$t('lang.select_superior') || '选择上级'" fullscreen :visible.sync="dialogProxyVisible" @open="dialogProxyOpen">
            <customerProxy :receiverCount="dialogProxyReceiverCount" :selectedCustomers="multipleSelection"
                           v-on:closeDialog="dialogProxyInvisible"></customerProxy>
        </el-dialog>
        <!--详细操作对话框-选择销售-->
        <el-dialog :title="$t('lang.select_sales') || '选择销售'" fullscreen :visible.sync="dialogSaleVisible" @open="dialogSaleOpen">
            <customerSale :receiverCount="dialogSaleReceiverCount" :selectedCustomers="multipleSelection"
                          v-on:closeDialog="dialogSaleInvisible"></customerSale>
        </el-dialog>
    </section>
</template>

<script>
    import * as api from '../../api/relation'
    import customerProxy from './customerProxy'
    import customerSale from './customerSale'
    import {outputValue} from "../../common/js/commons";

    export default {
        data() {
            return {
                listLoading: false,
                name: "account-list",
                //选择代理对话框显示
                dialogProxyVisible: false,
                dialogProxyReceiverCount: 0,
                //选择销售对话框显示
                dialogSaleVisible: false,
                dialogSaleReceiverCount: 0,
                //已选中的客户，即将被修改数据
                multipleSelection: [],
                //分页信息
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                //搜索客户条件
                filters: {
                    account_no: "",
                    full_name: "",
                    email: "",
                    mobile: "",
                    identity_no: "",
                    parent_account_no: "",
                    parent_full_name: "",
                    sales_account_no: "",
                    sales_full_name: ""
                },
                //客户列表数据
                customerData: []
            }
        },
        components: {
            customerProxy,
            customerSale
        },
        methods: {
            //选中某些客户
            handleSelectionChange(val) {
                this.multipleSelection = [];
                if (val.length > 0) {
                    for (let i = 0; i < val.length; i++) {
                        this.multipleSelection.push(val[i].id);
                    }
                }
            },
            //====主要操作====[修改被选中客户的代理信息]
            proxyChange() {
                if (this.multipleSelection.length === 0) {
                    this.$message({
                        type: 'error',
                        message: this.$t('lang.at_least_sale') || '请至少选择一个客户'
                    });
                }
                else {
                    this.dialogProxyVisible = true;
                }
            },
            //====主要操作====[修改被选中客户的销售信息]
            saleChange() {
                if (this.multipleSelection.length === 0) {
                    this.$message({
                        type: 'error',
                        message: this.$t('lang.at_least_sale') || '请至少选择一个客户'
                    });
                }
                else {
                    this.dialogSaleVisible = true;
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
                this.getCustomerListByFilter();
            },
            //监听子控件的操作，关掉修改代理对话框
            dialogProxyInvisible() {
                this.dialogProxyVisible = false;
                this.getCustomerListByFilter();
            },
            //监听子控件的操作，关掉修改销售对话框
            dialogSaleInvisible() {
                this.dialogSaleVisible = false;
                this.getCustomerListByFilter();
            },
            //根据条件搜索客户列表
            getCustomers() {
                this.pager.page_no = 1;
                this.getCustomerListByFilter();
            },
            //根据条件搜索客户列表-实体方法
            getCustomerListByFilter() {

                this.listLoading = true;
                let condition = {
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    email: this.filters.email,
                    mobile: this.filters.mobile,
                    identity_no: this.filters.identity_no,
                    parent_account_no: this.filters.parent_account_no,
                    parent_full_name: this.filters.parent_full_name,
                    sales_account_no: this.filters.sales_account_no,
                    sales_full_name: this.filters.sales_full_name
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                api.getCustomerList(params).then((res) => {

                    if (res.data.status == 200) {
                        let data = JSON.parse(res.data.datas);
                        this.customerData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                    this.listLoading = false;
                });
            },
            //重置搜索表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getCustomerListByFilter();
            },
            //弹出修改代理对话框时事件
            dialogProxyOpen() {
                this.dialogProxyReceiverCount++;
            },
            //弹出修改销售对话框时事件
            dialogSaleOpen() {
                this.dialogSaleReceiverCount++;
            },
            //初始化页面数据
            initData() {
                // 默认显示所有客户
                this.getCustomerListByFilter();
            },
            mobileValue(row, column) {
                return outputValue(row.country_code , row[column.property]);
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initData();  //初始化页面数据
            })

        }
    }
</script>

<style scoped>

</style>