<template>
    <section>
        <!--搜索工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
            <el-form :inline="true" :model="filters" ref="filters"   size="medium">
                <el-form-item label="" prop="sales_account_no">
                    <el-input :placeholder="$t('lang.sales_account_no') || '销售账号'"  v-model.trim="filters.sales_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="sales_full_name">
                    <el-input :placeholder="$t('lang.sale_name') || '销售姓名'" v-model.trim="filters.sales_full_name">
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
                <el-form-item>
                    <el-button type="primary" size="small" @click="getSale">{{$t('lang.find') || '查询'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="resetForm('filters')">{{$t('lang.reset') || '重置'}}</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--销售列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :header-row-style="headerRowStyle"
                :data="saleData"
                border
                style="width: 100%; text-align: center;">
            <el-table-column align="center" :label="$t('lang.radio') || '单选'" width="50px">
                <template slot-scope="scope">
                    <el-radio v-model="target" class="radioNone" :label="scope.row.id"></el-radio>
                </template>
            </el-table-column>
            <el-table-column
                    prop="account_no"
                    align="center"
                    :label="$t('lang.sale_account_no') || '销售账号'">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    align="center"
                    :label="$t('lang.sales_name') || '销售姓名'">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    align="center"
                    :label="$t('lang.mobile') || '手机号码'" :formatter="mobileValue">
            </el-table-column>
            <el-table-column
                    prop="email"
                    align="center"
                    :label="$t('lang.e_email') || '电子邮箱'">
            </el-table-column>
            <el-table-column
                    prop="identity_no"
                    align="center"
                    :label="$t('lang.identity_no') || '证件号码'">
            </el-table-column>
            <el-table-column
                    prop="department_name"
                    align="center"
                    :label="$t('lang.department_name') || '部门'">
            </el-table-column>
            <el-table-column
                    prop="team_name"
                    align="center"
                    :label="$t('lang.team_name') || '组别'">
            </el-table-column>
            <el-table-column
                    prop="state"
                    align="center"
                    :label="$t('lang.sales_state') || '销售状态'"
                    :formatter="tableStateFormatter"
            >
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

        <!--确认提交按钮-->
        <el-col :span="24" class="toolbar" style="text-align: center; ">
            <el-button type="primary" size="small" @click="saleSubmit">{{$t('lang.refer') || '提交'}}</el-button>
            <el-button size="small" @click="cancelSubmit">{{$t('lang.abolish') || '取消'}}</el-button>
        </el-col>
    </section>
</template>

<script>

    import * as api from '../../api/relation'
    import dict from '../../common/js/dict';
    import {outputValue} from "../../common/js/commons";

    export default {
        // 由父页面传来的数据-要被修改的客户
        props: ["selectedCustomers", "receiverCount"],
        data() {
            return {
                listLoading: false,
                // 分页信息
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                // 选中的销售
                target: [],
                //列表header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                options: {
                    state_type: dict.sales_state
                },
                // 搜索条件
                filters: {
                    sales_account_no: "",
                    sales_full_name: "",
                    email: "",
                    mobile: "",
                    identity_no: ""
                },
                //销售列表数据
                saleData: []
            };
        },
        methods: {
            // 分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            // 分页page_no发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //清空选中
            clearSelected() {
                this.target = '';
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getSaleByFilter();
            },
            // ====主要操作====[提交修改销售的数据]
            saleSubmit() {
                if (this.target.length === 0) {
                    this.$message({
                        type: 'error',
                        message: this.$t('lang.select_one_sales') || '请选择一个销售'
                    });
                }
                else {

                    this.listLoading = true;
                    let params = {
                        customer_id: this.selectedCustomers,
                        sales_id: this.target
                    };
                    api.setCustomerSales(params).then((res) => {

                        if (res.data.status == 200) {

                            this.$message({
                                type: 'success',
                                message: this.$t('lang.operate_succ') || '操作成功'
                            });
                            this.listLoading = false;
                            this.cancelSubmit();

                        } else {
                            if (res.data.status == 401) {
                                this.$router.push('/login');
                            }
                            this.listLoading = false;
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                    });
                }
            },
            // 取消修改，关闭对话框
            cancelSubmit() {
                this.$emit("closeDialog");
            },
            // 根据条件搜索销售数据
            getSale() {
                this.pager.page_no = 1;
                this.getSaleByFilter();
            },
            // 根据条件搜索销售数据-实体方法
            getSaleByFilter() {

                this.clearSelected();
                this.listLoading = true;
                let condition = {
                    account_no: this.filters.sales_account_no,
                    full_name: this.filters.sales_full_name,
                    email: this.filters.email,
                    mobile: this.filters.mobile,
                    identity_no: this.filters.identity_no
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                api.getCustomerSaleList(params).then((res) => {

                    if (res.data.status == 200) {
                        let data = JSON.parse(res.data.datas);
                        this.saleData = data.items;
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
            // 重置搜索表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.clearSelected();
                this.getSale();
            },
            // 初始化页面数据
            initData() {
                // 默认显示所有销售
                this.getSaleByFilter();
            },
            tableStateFormatter(row, column) {
                return this.options.state_type[row[column.property]];
            },
            mobileValue(row, column) {
                return outputValue(row.country_code , row[column.property]);
            }
        },
        watch: {
            receiverCount(cur) {
                this.resetForm('filters');
            },
        },
        mounted() {
            this.$nextTick(function () {
                this.initData();  //初始化页面数据
            })

        }
    }
</script>

<style>

    .radioNone .el-radio__label
    {
        display: none;
    }
</style>