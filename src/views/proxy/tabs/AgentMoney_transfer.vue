<template>
    <section>
        <el-table stripe :data="items" style="width: 100%"  :header-row-style="headerRowStyle">
            <el-table-column label="创建时间"><template slot-scope="scope"> <span>{{isNull(scope.row.gmt_create)}}</span></template> </el-table-column>
            <el-table-column label="订单编号"><template slot-scope="scope"> <span>{{isNull(scope.row.order_no)}}</span></template> </el-table-column>
            <el-table-column label="转出账号"><template slot-scope="scope"> <span>{{isNull(scope.row.account_no)}}</span></template></el-table-column>
            <el-table-column label="转入账号"><template slot-scope="scope"> <span>{{isNull(scope.row.target_account_no)}}</span></template> </el-table-column>
            <el-table-column label="转账金额"><template slot-scope="scope"> <span>{{dividedBy100(scope.row.amount)}}</span></template> </el-table-column>
            <el-table-column label="状态"> <template slot-scope="scope"> <span>{{ changeStatus(scope.row.status, statusOptions) }}</span></template> </el-table-column>
            <el-table-column label="处理备注"><template slot-scope="scope"> <span>{{isNull(scope.row.remark)}}</span></template></el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import {agentTransferList} from '../../../api/agent_api';
    import {isBirthDate, isNull, dividedBy100} from '../../../common/js/commons';
    import dict from '../../../common/js/dict';

    export default {
        props: ["agent_id"],
        data() {
            return {
                order_column: "",
                order_by: "",
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                items:[{
                    gmt_create: '',//创建时间
                    order_no: '',//订单编号
                    account_no: '',//转出账号
                    target_account_no: '',//转入账号
                    amount: '',//转账金额
                    status: '',//状态
                    remark: '',//处理备注
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                statusOptions: dict.funds_status,
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
            handlePagerChange(){this.showItems();},
            //根据代理id 数据
            showItems() {
                this.listLoading=true;
                let condition = {};
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: '',
                    order_by: '',
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                agentTransferList(params).then((res) => {
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
                        //this.$message(res.data.msg);
                    }
                });
            },
            isNull(val){
                return isNull(val);
            },
            dividedBy100(val){
                return dividedBy100(val);
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
        },
        mounted()
        {
            this.$nextTick(function(){
                this.showItems();
            })
        }
    }
</script>
<style lang="scss" scoped>

</style>
