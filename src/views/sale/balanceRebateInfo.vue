<template>
    <section>
        <!--客户余额返利数据-->
        <el-table
                :header-row-style="headerRowStyle"
                :data="rebateInfoData"
                border
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    align="center"
                    :label="$t('lang.rebate_date') || '返利日期'">
                <template slot-scope="scope">
                    {{isBirthDate(scope.row.rebate_date)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="daily_amount"
                    align="center"
                    :label="$t('lang.rebate_date') || '返利金额(USD)'">
                <template slot-scope="scope">
                    <el-button type="text" @click="pushDetail(scope.row.rebate_date,1)">{{dailyAmount(scope.row.daily_amount)}}</el-button>
                </template>
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
        <!-- 弹框 -->
        <el-dialog :title="$t('lang.balance_detail') || '余额返利明细'" :visible.sync="dialogTableVisible">
            <el-table stripe :data="rebateInfoDetail">
                <el-table-column prop="gmt_create" :label="$t('lang.balance_date') || '日期'" width="150">
                    <template slot-scope="scope">
                        <span>{{ isBirthDate(scope.row.gmt_create) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="source_account_no" :label="$t('lang.customer_account_no') || '客户账号'" ></el-table-column>
                <el-table-column prop="source_account_full_name" :label="$t('lang.full_name') || '客户姓名'"></el-table-column>
                <el-table-column :label="$t('lang.balance') || '账户余额'"><template slot-scope="scope"> <span>{{centToDollar(scope.row.source_account_balance)}}</span></template></el-table-column>
                <el-table-column :label="$t('lang.balance_rate_b') || '返利率(%)'"><template slot-scope="scope"> <span>{{isCalculate(scope.row.rate)}}%</span></template></el-table-column>
                <el-table-column prop="amount" label="余额返利":label="$t('lang.rebate_date') || '返利日期'"><template slot-scope="scope"><span>{{amount(scope.row.amount)}}</span></template></el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination
                        style="text-align: center;"
                        @size-change="dighandleSizeChange"
                        @current-change="dighandleCurrentChange"
                        :page-size="digpager.page_size"
                        :page-sizes="digpager.sizes"
                         background
                        :current-page="digpager.page_no"
                        layout="prev,pager,next,sizes,total"
                        :total="digpager.total">
                </el-pagination>
            </el-col>
            <br><br><br>
        </el-dialog>
    </section>
</template>

<script>
//    import * as api from '../../api/sale'

    import * as api from '../../api/sale_api';
    import {isBirthDate} from '../../common/js/commons';

    export default {
        //父级组件传过来的数据
        // props: ["sale_id"],
        data() {
            return {
                dialogTableVisible :false,
                listLoading:false,
                start_time:'',
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
                    page_size: 10,
                    page_no: 1
                },
                //分页设置
                digpager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },

                //客户余额表格返佣数据
                rebateInfoData: [],
                //详情
                rebateInfoDetail: [],
            };
        },
        methods: {
            dailyAmount(val){
                return val/100;
            },
            isCalculate(val){
                return val/10000;
            },
            centToDollar(val){
                return val/100;
            },
            amount(val){
              return val/100;
            },
            isBirthDate(val){
                return isBirthDate(val);
            },
            //分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.showRebateInfo();
            },
            //分页page_no发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.showRebateInfo();
            },
            //分页page_size发生改变
            dighandleSizeChange(val) {
                this.digpager.page_no = 1;
                this.digpager.page_size = val;
                this.pushDetail(this.start_time);
            },
            //分页page_no发生改变
            dighandleCurrentChange(val) {
                this.digpager.page_no = val;
                this.pushDetail(this.start_time);
            },
            //根据销售id搜索数据
            showRebateInfo() {
                this.listLoading = true;
                let params = {
                    sale_id: this.sale_id,
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no
                };
                api.getBackEarnList(params).then((res) => {

                    if (res.data.status == 200) {
                        this.listLoading = false;
                        let data = JSON.parse(res.data.datas);
                        this.rebateInfoData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            //显示详情
            pushDetail(start_time,num){
                if(num){
                    this.digpager.page_no = 1;
                }
                this.start_time = start_time;
                this.dialogTableVisible = true;
                let params = {
                    start_time:this.start_time,
                    page_size: this.digpager.page_size,
                    page_no: this.digpager.page_no,
                    sales_id:this.sale_id,
                }

                api.getBackEarnDetail(params).then(res =>{
                    if (res.data.status == 200) {
                        this.listLoading = false;
                        let data = JSON.parse(res.data.datas);
                        this.rebateInfoDetail = data.items;
                        this.digpager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            //初始化页面数据
            initData() {
                this.sale_id = this.$route.params.id;
                this.showRebateInfo();
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initData();  //初始化页面数据
            })

        }
    };
</script>


<style scoped>

</style>