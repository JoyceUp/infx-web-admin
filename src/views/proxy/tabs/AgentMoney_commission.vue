<template>
    <section>
        <el-table :data="items" stripe style="width: 100%"  :header-row-style="headerRowStyle">
            <el-table-column prop="change_time" label="返佣时间"> </el-table-column>
            <el-table-column prop="account_no" label="返佣代理账号"></el-table-column>
            <el-table-column prop="source_account_no" label="客户账号"> </el-table-column>
            <el-table-column label="客户姓名"><template slot-scope="scope"> <span>{{isNull(scope.row.customer_name)}}</span></template> </el-table-column>
            <el-table-column prop="trading_symbol" label="交易品种"> </el-table-column>
            <el-table-column label="交易量"><template slot-scope="scope"> <span>{{centToDollar(scope.row.trading_volume)}}</span></template></el-table-column>
            <el-table-column label="返佣比例"  prop="trading_volume"  :formatter="isCalculatezlp"> </el-table-column>

            <el-table-column label="返佣金额"><template slot-scope="scope"> <span>{{centToDollar(scope.row.commission_amount)}}</span></template> </el-table-column>
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
    import {agentCommissionList} from '../../../api/agent_api';
    import {isCalculate, isNull, centToDollar} from '../../../common/js/commons';
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
                    color: "#999",
                    textAlign: "center"
                },
                items:[{    //返佣比例计算commission_amount/trading_volume/100
                    change_time: '',     //返佣时间
                    account_no: '',   //返佣代理账号
                    source_account_no: '',     //客户账号
                    customer_name: '',//客户姓名
                    trading_symbol: '', //交易品种
                    trading_volume: '', //交易量
                    commission_amount: '',     //返佣金额
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
            }
        },
        methods: {
            isCalculatezlp(row,column){

                var rate = row.commission_amount / row.trading_volume;
                var rateStr = rate.toString();
                if (rateStr.indexOf('.') > -1) {
                    rate = rate.toFixed(2);
                }
                return rate + " (USD/手)";
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
            handlePagerChange(){this.showItems();},
            //根据代理id 数据
            showItems() {
                this.listLoading=true;
                let condition = {};
                condition.ib_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                    order_column: '',
                    order_by: '',
                };
                agentCommissionList(params).then((res) => {
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
            isCalculate(v,d1,d2){
                return isCalculate(v/d1/d2);
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
