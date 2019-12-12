<template>
    <section>
        <!--客户列表-->
        <el-table
                :header-row-style="headerRowStyle"
                :data="customerInfoData"
                stripe
                v-loading="listLoading"
                style="width: 100%;">

            <el-table-column
                    prop="register_date"
                    align="center"
                    :label="$t('lang.gmt_create') || '注册时间'">
            </el-table-column>
            <el-table-column
                    align="center"
                    :label="$t('lang.full_name') || '客户姓名'">
                <template slot-scope="scope">
                    <el-button
                            @click="showCustomerDetails(scope.row.id)"
                            type="text"
                            size="small">
                        {{ scope.row.full_name }}
                    </el-button>
                </template>
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
                    prop="balance"
                    align="center"
                    :formatter="exceptValue"
                    :label="$t('lang.balance') || '账户余额'">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="state"-->
                    <!--align="center"-->
                    <!--label="客户状态"-->
                    <!--:formatter="formatterState">-->
            <!--</el-table-column>-->
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
                    :current-page="pager.currentPage"
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>

        </el-col>

    </section>
</template>

<script>
//    import * as api from '../../api/sale'
    import * as api from '../../api/sale_api';
    import {outputValue} from "../../common/js/commons";

export default {
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
                    pageSize: 10,
                    currentPage: 1
                },
                //客户信息
                customerInfoData: [],

            }
        },
        methods: {
            formatterState(val){
                var str ='';
                if (val.state==1){
                    str = '正常'
                } else if (val.state==2){
                    str = '已删除'
                }
                return str;
            },

            exceptValue(row,column){
                if(column) {
                    let val = row[column.property]/100
                    return val.toFixed(2)
                }
            },
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.currentPage = 1;
                this.pager.pageSize = val;
                this.showCustomerInfo();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.currentPage = val;
                this.showCustomerInfo();
            },
            // 显示客户列表
            showCustomerInfo() {
                this.listLoading = true;
                let params = {
                    sale_id: this.sale_id,
                    pageSize: this.pager.pageSize,
                    currentPage: this.pager.currentPage
                };
                api.getCustomerList(params).then((res) => {
                    if (res.data.status == 200) {
                        this.listLoading = false;
                        let data = JSON.parse(res.data.datas);
                        this.customerInfoData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            //转向客户详情页
            showCustomerDetails(id){
                this.$router.push({name:'用户详情',params:{id: id}});
            },
            //页面初始化，显示当前销售的基本信息
            initData() {
                this.sale_id = this.$route.params.id;
                this.showCustomerInfo();
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