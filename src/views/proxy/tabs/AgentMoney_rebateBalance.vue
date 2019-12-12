<template>
    <section>
        <el-table :data="items" stripe style="width: 100%" >
            <el-table-column label="申请日期"><template slot-scope="scope"> <span>{{isNull(scope.row.gmt_create)}}</span></template> </el-table-column>
            <el-table-column label="代理账号"><template slot-scope="scope"> <span>{{isNull(scope.row.account_no)}}</span></template> </el-table-column>
            <el-table-column label="代理姓名"><template slot-scope="scope"> <span>{{isNull(scope.row.full_name)}}</span></template></el-table-column>
            <el-table-column label="转账金额(USD)"><template slot-scope="scope"> <span>{{centToDollar(scope.row.amount)}}</span></template> </el-table-column>
            <el-table-column label="状态"><template slot-scope="scope"> <span>{{ changeStatus(scope.row.status, statusOptions) }}</span> </template></el-table-column>
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
    import {agentBalaRebateList} from '../../../api/agent_api';
    import {isBirthDate, isNull, centToDollar} from '../../../common/js/commons';
    import dict from '../../../common/js/dict';

    export default {
        //父页面传来的数据
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
                    gmt_create: '', //申请日期
                    account_no: '', //代理账号
                    full_name: '',  //代理姓名
                    amount: '',     //转账金额(USD)
                    status: '',     //状态
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
                agentBalaRebateList(params).then((res) => {
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
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
            centToDollar(val){
                return centToDollar(val);
            }
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
