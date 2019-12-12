<template>
    <section>
      <!--交易记录-->
        <!--转账记录-->
        <el-table stripe :data="trade" style="width: 100%" size="small" tooltip-effect="dark">
            <el-table-column prop="order_no" :label="$t('lang.order_no') || '订单编号'"> </el-table-column>
            <el-table-column prop="account_no" :label="$t('lang.mt_account') || 'MT4账号'"> </el-table-column>
            <el-table-column prop="open_time" :label="$t('lang.open_time') || '开仓时间'" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="type" :label="$t('lang.type') || '交易类型'"><template slot-scope="scope"> <span>{{ typeMapOptions[scope.row.type] }}</span></template></el-table-column>
            <el-table-column prop="symbol" :label="$t('lang.symbol') || '交易品种'"> </el-table-column>
            <el-table-column prop="volume" :label="$t('lang.volume') || '交易量'">
                <template slot-scope="scope">{{keepDigits(scope.row.volume)}}</template>
            </el-table-column>
            <el-table-column prop="open_price" :label="$t('lang.open_price') || '开仓价格'"> </el-table-column>
            <el-table-column prop="close_price" :label="$t('lang.close_price') || '平仓价格'"> </el-table-column>
            <el-table-column prop="sl" :label="$t('lang.sl') || 'S/L'"> </el-table-column>
            <el-table-column prop="tp" :label="$t('lang.tp') || 'T/P'"> </el-table-column>
            <!--<el-table-column prop="fee" label="手续费"></el-table-column>-->
            <el-table-column
                    prop="swaps"
                    :label="$t('lang.night_interest') || '隔夜利息'"
                   :formatter="exceptValue"
            >
            </el-table-column>
            <el-table-column :label="$t('lang.profit') || '交易盈亏'"><template slot-scope="scope">{{keepDigits(scope.row.profit)}}</template></el-table-column>
            <el-table-column :label="$t('lang.sale_status') || '状态'"><template slot-scope="scope"> <span>{{ orderStatusMapOptions[scope.row.order_status] }}</span></template></el-table-column>
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
    import {tradeCustomersList} from '../../../../api/customers_api.js';
    import dict from '../../../../common/js/dict';
    import {isNull} from '../../../../common/js/commons';

    export default {
        data() {
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                //交易记录
                trade:[{
                    order_no: '',    //订单编号
                    account_no: '',  //MT4账号
                    open_time: '',   //开仓时间
                    type: '',        //交易类型
                    symbol: '',      //交易品种
                    volume: '',      //交易量
                    open_price: '',  //开仓价格
                    close_price: '', //平仓价格
                    sl: '',          //S/L
                    tp: '',          //T/P
                    fee: '',         //手续费
                    swaps: '',       //隔夜利息
                    profit: '',      //交易盈亏
                    status: '',       //状态
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                orderStatusMapOptions: dict.funds_order_status_map,
                typeMapOptions: dict.funds_type_map
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
            handlePagerChange(){this.getUserInfoDetail();},
            getUserInfoDetail() {
                let condition = {};
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "",
                    order_by: "",
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                this.listLoading=true
                tradeCustomersList(params).then((res) => {
                    this.listLoading=false
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.trade = result.items;
                            this.pager.total = result.total;
                        }
                    } else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            keepDigits(val){
                if(' - - ' == isNull(val)){
                    return 0;
                }else{
                    var v = val/100;
                    return v.toFixed(2);
                }
            },
            exceptValue(row,column){
                if(column) {
                    let val = row[column.property]/100
                    return val.toFixed(2)
                }
            },
        },
        mounted()
        {
            this.$nextTick(function(){
                this.getUserInfoDetail();
            });
        }
    }
</script>
<style lang="scss" scoped>
    .container .main .content-container{
        background-color:#F7F7F7;
        font-size:12px;
    }

    .el-row {
        text-align: right;
    }
    .el-row {
        margin-bottom: 2px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
