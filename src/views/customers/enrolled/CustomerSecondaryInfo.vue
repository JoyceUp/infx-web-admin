<template>
    <section>
        <el-table
                :data="items"
                stripe
                style="width: 100%"
                tooltip-effect="dark"
        >
            <el-table-column prop="gmt_create" :label="$t('lang.gmt_create') || '注册时间'" width="180"> </el-table-column>
            <el-table-column prop="full_name" :label="$t('lang.full_name') || '客户姓名'" width="180">
                <template slot-scope="scope">
                    <el-button
                            @click="showCustomerDetails(scope.row.id)"
                            type="text"
                            size="small">
                        {{ scope.row.full_name }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" :label="$t('lang.mobile') || '手机号码'"  :formatter="mobileValue"> </el-table-column>
            <el-table-column prop="email" :label="$t('lang.e_email') || '电子邮箱'"> </el-table-column>
            <el-table-column prop="identity_no" :label="$t('lang.identity_no') || '证件号码'"> </el-table-column>
            <el-table-column prop="balance"
                             :label="$t('lang.balance') || '账户余额(合计)'"
                             :formatter="exceptValue"
            > </el-table-column>
        </el-table>
    </section>
</template>
<script>
    import {recordCustomersList, relationCustomersChildren} from '../../../api/customers_api';
    import {outputValue} from "../../../common/js/commons";

    export default {
        props: ["datas"],
        data() {
            return {
                listLoading:false,
                dialogFormVisible:false,
                page_size: 10,
                page_no: 1,
                total: 0,
                order_column: "",
                order_by: "",
                // activeNames: ['1'],
                commForm:{
                    content:'',
                    recorder_type: 1
                },
                items:[],
                uploadUser: {
                    // 角色类型：1：客户2：代理3：销售
                    roleType: "1",
                    roleId: ''
                },
            }
        },
        methods: {
            resetForm(formName){
               this.commForm = {
                   content:'',
                   recorder_type: 1
               };
               this.$refs[formName].resetFields();
           },
            created () {
                this.fetchData();
            },
            fetchData(){
                this.getItems();
            },
            getItems() {
                // let condition = {};
                // condition.customer_id = this.$route.params.id;
                let params = {
                    customer_id: this.$route.params.id,
                    order_column: "",
                    order_by: "",
                    page_size: this.page_size,
                    page_no: this.page_no
                };
                this.listLoading=true
                relationCustomersChildren(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.items = result.items;
                            this.listLoading=false
                            this.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            //跳转到当前客户的详情页
            showCustomerDetails(id){
                this.$router.push({name:this.$t('lang.user_del')+':' || '用户详情',params:{id:id}});
            },

            exceptValue(row,column){
                if(column) {
                    let val = row[column.property]/100
                    return val.toFixed(2)
                }
            },
            mobileValue(row, column) {
                return outputValue(row.country_code, row.mobile);
            }

        },
        mounted()
        {
            this.$nextTick(function(){
                 if( this.listLoading==false){this.getItems();};
            })
        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            }
        }
    }
</script>
<style lang="scss" scoped>


    .row-bg {
        text-align: right;
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
