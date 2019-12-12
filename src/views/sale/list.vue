<template>
    <section>
        <!--搜索工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
            <el-form :inline="true" :model="filters" ref="filters" label-width="80px">
                <el-form-item :label="$t('lang.sale_account_no') || '销售账号'" prop="sales_account_no">
                    <el-input :placeholder="$t('lang.sale_account_no') || '销售账号'" v-model="filters.sales_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.name') || '姓名'" prop="sale_name">
                    <el-input :placeholder="$t('lang.name') || '姓名'" v-model="filters.sale_name">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.mobile') || '手机号码'" prop="sale_mobile">
                    <el-input :placeholder="$t('lang.mobile') || '手机号码'" v-model="filters.sale_mobile">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.e_email') || '电子邮箱'" prop="sale_email">
                    <el-input :placeholder="$t('lang.e_email') || '电子邮箱'" v-model="filters.sale_email">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.sale_status') || '状态'" prop="sale_status">
                    <el-select clearable v-model="filters.sale_status" size="18px">
                        <el-option :label="$t('lang.all_status') || '全部'" value=""></el-option>
                        <el-option :label="$t('lang.job_status') || '在职'" value="1"></el-option>
                        <el-option :label="$t('lang.leave_status') || '离职'" value="2"></el-option>
                        <el-option :label="$t('lang.part_time_status') || '兼职'" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getSales">{{$t('lang.find') || '查询'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('filters')">{{$t('lang.reset') || '重置'}}</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--搜索结果表格-->
        <el-table
                :header-row-style="headerRowStyle"
                :data="tableData"
                stripe
                v-loading="listLoading"
                style="width: 100%;">
            <el-table-column
                    :label="$t('lang.sales_account_no') || '销售账号'"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            @click="showSaleDetails(scope.row.sales_id)"
                            type="text"
                            size="small">
                        {{ scope.row.account_no }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    :label="$t('lang.name') || '姓名'"
                    align="center">
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
                    prop="create_date"
                    align="center"
                    :label="$t('lang.account_gmt_create') || '创建时间'">
            </el-table-column>
            <el-table-column
                    prop="update_date"
                    align="center"
                    :label="$t('lang.update_date') || '更新时间'">
            </el-table-column>
            <el-table-column
                    prop="sales_state"
                    align="center"
                    :label="$t('lang.sale_status') || '状态'"
                    :formatter="formatterState">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.pageSize"
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
//    import {getSaleList} from '../../api/sale'
    import * as api from '../../api/sale_api';
    import {outputValue} from "../../common/js/commons";

export default {
        data() {
            return {
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color:"#333",
                    textAlign: "center"
                },
                //搜索条件
                filters: {
                    sales_account_no: "",
                    sale_name: "",
                    sale_mobile: "",
                    sale_email: "",
                    sale_status: ""
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                //表格数据
                tableData: [],
                listLoading:false
            };
        },
        methods: {
            //显示状态
            formatterState(val){
                var str ='';
                 if (val.sales_state==1){
                     str = '在职'
                 } else if (val.sales_state==2){
                     str = '离职'
                 } else if(val.sales_state==3){
                     str = '兼职'
                 }
                 return str;
            },
            //转向销售详情页
            showSaleDetails(id) {
                this.$router.push('details/'+id)
                //alert(id);
            },
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
            handlePagerChange()
            {
                let params = {
                    pageSize: this.pager.pageSize,
                    currentPage: this.pager.currentPage,
                    sales_account_no: this.filters.sales_account_no,
                    sale_name: this.filters.sale_name,
                    sale_mobile: this.filters.sale_mobile,
                    sale_email: this.filters.sale_email,
                    sale_status: this.filters.sale_status
                };
                this.getSalesByFilter(params);
            },
            //根据条件搜索销售数据
            getSales() {
                this.listLoading = true  //显示loading
                this.pager.currentPage = 1;
                let params = {

                    pageSize: this.pager.pageSize,
                    currentPage: this.pager.currentPage,
                    sales_account_no: this.filters.sales_account_no,
                    sale_name: this.filters.sale_name,
                    sale_mobile: this.filters.sale_mobile,
                    sale_email: this.filters.sale_email,
                    sale_status: this.filters.sale_status
                };
                this.getSalesByFilter(params);
            },
            //根据条件搜索销售数据-实体方法
            getSalesByFilter(params) {
                api.getSaleList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        this.listLoading = false  //隐藏loading
                        this.tableData = result.items;
                        this.pager.total = result.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                });
            },
            //重置搜索表彰
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.initData();
            },
            //初始化页面
            initData() {
                let params = {
                    pageSize: this.pager.pageSize,
                    currentPage: this.pager.currentPage
                };
                //默认显示所有销售
                this.getSalesByFilter(params);
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