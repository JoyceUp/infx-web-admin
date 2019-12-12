<template>
    <section>
        <el-table :data="items" stripe style="width: 100%" >
            <el-table-column prop="gmt_create" label="注册时间"> </el-table-column>
            <el-table-column label="客户姓名" width="150">
                <template slot-scope="scope" v-if="scope.row.full_name">
                    <el-button  type="text" @click="showDetail(scope.row.id)">
                        {{isNull(scope.row.full_name)}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="手机号码"><template slot-scope="scope" v-if="scope.row.mobile"> <span>{{isNull(scope.row.mobile)}}</span></template></el-table-column>
            <el-table-column label="电子邮件"><template slot-scope="scope" v-if="scope.row.email"> <span>{{isNull(scope.row.email)}}</span></template></el-table-column>
            <el-table-column label="证件号码"><template slot-scope="scope" v-if="scope.row.identity_no"> <span>{{isNull(scope.row.identity_no)}}</span></template></el-table-column>
            <el-table-column label="账户余额"><template slot-scope="scope"> <span>{{centToDollar(scope.row.balance)}}</span></template></el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import {agentCustomerList} from '../../../api/agent_api';
    import {isBirthDate, isNull, centToDollar} from '../../../common/js/commons';

    export default {
        props: ["agent_id"],
        data() {
            return {
                listLoading: false,
                order_column: "",
                order_by: "",
                items:[],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
            }
        },
        methods: {
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
            handlePagerChange(){ this.getItems();},

            getItems() {
                this.listLoading=true;
                let condition = {};
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: this.order_column,
                    order_by: this.order_by,
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };

                agentCustomerList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.items = result.items;
                            this.pager.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            isNull(val){
                return isNull(val);
            },
            showDetail(iid){
                this.$router.push({name:'用户详情',params:{id: iid}});
            },
            centToDollar(val){
                return centToDollar(val);
            }
        },
        mounted()
        {
            this.$nextTick(function(){
                this.getItems();
            })
        }
    }
</script>
<style lang="scss" scoped>

</style>
