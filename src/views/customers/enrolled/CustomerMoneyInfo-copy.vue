<template>
    <section>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="出入金记录" name="1">

                <el-table
                        :data="table_out_in_record"
                        style="width: 100%" >
                    <el-table-column
                            prop="gmt_create"
                            label="创建时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="order_no"
                            label="订单编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="account_no"
                            label="MT4账号">
                    </el-table-column>
                    <el-table-column
                            prop="option_type"
                            label="出入金类型">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="申请金额(USD)">
                    </el-table-column>
                    <el-table-column
                            prop="channel_type"
                            label="渠道方式">
                    </el-table-column>

                    <el-table-column
                            prop="status"
                            label="订单状态">
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="处理备注">
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-col :span="24" class="toolbar">
                    <el-pagination
                            small
                            background
                            layout="prev, pager, next" :page-size="10"
                            :total="table_out_in_record_total" @current-change="changePageNumber('table_out_in_record')"
                            style="float:right;">
                    </el-pagination>
                </el-col>
            </el-collapse-item>
            <el-collapse-item title="转账记录" name="2" >
                <el-table
                        :data="table_transfer_record"
                        style="width: 100%" >
                    <el-table-column
                            prop="gmt_create"
                            label="创建时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="order_no"
                            label="订单编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="account"
                            label="转出账号">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="转入账号">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="转账金额">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="状态">
                    </el-table-column>

                    <el-table-column
                            prop="address"
                            label="处理备注">
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-col :span="24" class="toolbar">
                    <el-pagination
                            background
                            layout="prev, pager, next" :page-size="10"
                            :total="table_transfer_record_total" @current-change="changePageNumber('table_transfer')"
                            style="float:right;">
                    </el-pagination>
                </el-col>
            </el-collapse-item>

            <el-collapse-item title="余额清零记录" name="4" >
                <el-table
                        :data="table_balance_to_zero"
                        style="width: 100%" >
                    <el-table-column
                            prop="card_no"
                            label="银行账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="银行账户户名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="银行名称">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="银行国家">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地区(省)">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地区(市)">
                    </el-table-column>

                    <el-table-column
                            prop="address"
                            label="银行开户行">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="开户行地址">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="国际汇款代码">
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-col :span="24" class="toolbar">
                    <el-pagination
                            background
                            layout="prev, pager, next" :page-size="10"
                            :total="table_balance_to_zero_total" @current-change="changePageNumber('table_balance_to_zero')"
                            style="float:right;">
                    </el-pagination>
                </el-col>
            </el-collapse-item>


            <el-collapse-item title="交易记录" name="5" >
                <el-table
                        :data="table_deal_record"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="银行账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="银行账户户名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="银行名称">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="银行国家">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地区(省)">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地区(市)">
                    </el-table-column>

                    <el-table-column
                            prop="address"
                            label="银行开户行">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="开户行地址">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="国际汇款代码">
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-col :span="24" class="toolbar">
                    <el-pagination
                            background
                            layout="prev, pager, next" :page-size="10"
                            :total="table_deal_record_total" @current-change="changePageNumber('table_balance_to_zero')"
                            style="float:right;">
                    </el-pagination>
                </el-col>
            </el-collapse-item>
        </el-collapse>
    </section>
</template>
<script>
    import {getCustomerById} from '../../../api/customers_api.js';
    import ElInput from "element-ui/packages/input/src/input";

    export default {
        components: {ElInput},
        props: ["datas"],
        data() {
            return {
                activeNames: ['1'],
                cid:'',
                //出入金记录
                table_out_in_record:[{

                }],
                table_out_in_record_total:0,
                table_out_in_record_page_no:1,

                //转账记录
                table_transfer_record:[{

                }],
                table_transfer_record_total:0,
                table_transfer_record_page_no:1,

                //余额清零记录
                table_balance_to_zero:[{

                }],
                table_balance_to_zero_total:0,
                table_balance_to_zero_page_no:1,

                //交易记录
                table_deal_record:[{

                }],
                table_deal_record_total:0,
                table_deal_record_page_no:1,

                custInfo: {
                    customer_id: '',
                    customer_name: '',
                    create_date: '',//注册时间
                    mobile: '',//手机号码
                    email: '',//电子邮箱
                    identityNo: '',//证件号码
                    account_balance: '',//账户余额
                    status: ''//状态
                }
            }
        },
        methods: {
            changePageNumber(tag){

            },
            getUserInfoDetail() {
                getCustomerById({'customer_id': this.cid}).then((res) => {
                    if(res.data.status === 200) {
                        this.custInfo = res.data.datas[0];
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        mounted()
        {
            this.cid = this.datas;
            this.getUserInfoDetail();
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
