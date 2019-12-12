<template>
    <section>
        <!--代理信息-->
        <el-table
                :header-row-style="headerRowStyle"
                :data="proxyInfoData"
                v-loading="listLoading"
                stripe
                style="width: 100%;">
            <el-table-column
                    prop="register_date"
                    label="注册时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="代理姓名"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            @click="showProxyDetails(scope.row.id)"
                            type="text"
                            size="small">
                        {{ scope.row.full_name }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    align="center"
                    label="手机号码">
            </el-table-column>
            <el-table-column
                    prop="email"
                    align="center"
                    label="电子邮箱">
            </el-table-column>
            <el-table-column
                    prop="identity_no"
                    align="center"
                    label="证件号码">
            </el-table-column>
            <el-table-column
                    prop="balance"
                    align="center"
                    label="账户余额"
                    :formatter="formatterBalance">
            </el-table-column>
            <el-table-column
                    prop="state"
                    align="center"
                    label="代理状态"
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
                    :current-page="pager.currentPage"
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
        // props: ["sale_id"],
        data() {
            return {
                listLoading:false,
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
                //代理信息
                proxyInfoData: [],

            }
        },
        methods: {
            formatterBalance(val){
                return val.balance/100;
            },
            formatterState(val){
                var str ='';
                if (val.state==1){
                    str = '正常'
                } else if (val.state==2){
                    str = '已删除'
                }
                return str;
            },
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.currentPage = 1;
                this.pager.pageSize = val;
                this.showProxyInfo();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.currentPage = val;
                this.showProxyInfo();
            },
            // 显示代理列表
            showProxyInfo() {
                this.listLoading = true;
                let params = {
                    sale_id: this.sale_id,
                    pageSize: this.pager.pageSize,
                    currentPage: this.pager.currentPage
                };
                api.getSalerAgentList(params).then((res) => {

                    if (res.data.status == 200) {
                        this.listLoading = false;
                        let data = JSON.parse(res.data.datas);
                        this.proxyInfoData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            //转向代理详情页
            showProxyDetails(id){
                this.$router.push({name:'代理详情',params:{id: id}});
            },
            //页面初始化，显示当前销售的基本信息
            initData() {
                this.sale_id = this.$route.params.id;
                this.showProxyInfo();
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