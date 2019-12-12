<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters"  size="medium">
                <el-form-item prop="order_no">
                    <el-input
                            :placeholder="$t('lang.input_order_number') || '订单号'"
                            v-model.trim="filters.order_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            :placeholder="$t('lang.card_no') || '账号'"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            :placeholder="$t('lang.name') || '姓名'"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="cause">
                    <el-select clearable  :placeholder="$t('lang.input_withdraw_type') || '出金类型'" v-model="filters.cause">
                        <el-option key="" :label="$t('lang.all_status') || '全部'" value=" "></el-option>
                        <el-option :key="value" :label="txt" :value="value"
                                   v-for="(txt, value) in options.cause_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="account_type">
                    <el-select clearable  :placeholder="$t('lang.account_type') || '账户类型'" v-model="filters.account_type">
                        <!--<el-option :key="value" :label="txt" :value="value"-->
                                   <!--v-for="(txt, value) in options.account_type"></el-option>-->
                        <el-option v-for="item in selectOptions.account_type"
                                   :key="item.value"
                                   :label="item.key"
                                   :value="item.value">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable  :placeholder="$t('lang.status') || '订单状态'" v-model="filters.order_status">
                        <el-option key="" :label="$t('lang.all_status') || '全部'" value=" "></el-option>
                        <el-option :key="value" :label="txt" :value="value"
                                   v-for="(txt, value) in options.status_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.createDate" type="daterange" :start-placeholder="$t('lang.input_submit_date') || '提交时间'"
                                :end-placeholder="$t('lang.input_submit_date') || '提交时间'"
                                :placeholder="$t('lang.input_submit_date') || '选择时间范围'" @change="handleCreateDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <!--<el-form-item prop="updateDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.updateDate" type="daterange" start-placeholder="更新时间"
                                end-placeholder="更新时间"
                                placeholder="选择时间范围" @change="handleUpdateDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" size="small"  @click="searchList">{{ $t('lang.find') || '查询' }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="resetSearch('filters')">{{ $t('lang.reset') || '重置' }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="exportExcel">{{ $t('lang.export') || '导出' }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="usdExportExcel"> {{ $t('lang.input_usd_withdraw_table') || '美金提款表' }} </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="idrExportExcel">{{ $t('lang.input_ind_withdraw_table') || '印尼盾提款表' }}</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--数据列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :data="datas"
                style="width: 100%">
            <el-table-column
                    width="100"
                    prop="order_no"
                    :label="$t('lang.input_order_number') || '订单号'">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="account_no"
                    :label="$t('lang.card_no') || '账号'">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    :label="$t('lang.name') || '姓名'">
            </el-table-column>
            <el-table-column
                    prop="account_type"
                    :formatter="tableAccountFormatter"
                    :label="$t('lang.account_type') || '账户类型'">
            </el-table-column>
            <el-table-column
                    prop="cause"
                    :formatter="tableCauseFormatter"
                    :label="$t('lang.table_withdraw_mode') || '出金方式'">
            </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="cent2dollar"
                    prop="amount"
                    :label="$t('lang.apply_amount') || '申请金额(USD)'">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="rate"
                    :formatter="getRate"
                    :label="$t('lang.customer_ib_rate') || '汇率'">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="pay_amount"
                    :formatter="payAmountIDR"
                    :label="$t('lang.table_pay_ind') || '支付金额(IDR)'">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="pay_amount"
                    :formatter="payAmountUSD"
                    :label="$t('lang.table_pay_usd') || '支付金额(USD)'">
            </el-table-column>
            <el-table-column
                    width="80"
                    prop="poundage"
                    :formatter="cent2dollar"
                    :label="$t('lang.table_pay_fee') || '手续费(USD)'">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="gmt_create"
                    :label="$t('lang.input_submit_date') || '提交时间'">
            </el-table-column>
            <el-table-column
                    prop="order_status"
                    :formatter="tableStatusFormatter"
                    :label="$t('lang.sale_status') || '状态'">
            </el-table-column>
            <el-table-column :label="$t('lang.handle') || '操作'" width="80">
                <template slot-scope="scope">
                    <el-button size="mini"
                            @click="withdrawDetails(scope.row.id, scope.row.cause)">{{ $t('lang.check') || '查看' }}
                    </el-button>
                    <el-button size="mini"
                            type="danger"
                            @click="withdrawDecrease(scope.row.id, scope.row.cause)" v-if="roleDisplay.decreaseDisplay && scope.row.decreaseDisplay">{{ $t('lang.withdrawing') || '扣款' }}
                    </el-button>
                    <el-button size="mini"
                            type="danger"
                            @click="withdrawManualDecrease(scope.row.id, scope.row.cause)" v-if="roleDisplay.manualDisplay&& scope.row.manualDisplay">{{ $t('lang.btn_handle') || '处理' }}
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                            @click="withdrawFinish(scope.row.id, scope.row.cause)" v-if="roleDisplay.completeDisplay && scope.row.completeDisplay">{{ $t('lang.btn_complete') || '完成' }}
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                            @click="withdrawBack(scope.row.id,scope.row.cause,scope.row.amount)" v-if="roleDisplay.backDisplay && scope.row.backDisplay">{{ $t('lang.btn_return') || '退回' }}
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="withdrawIgnore(scope.row.id, scope.row.cause)" v-if="roleDisplay.ignoreDisplay&& scope.row.ignoreDisplay"> {{ $t('lang.btn_ignore') || '忽略' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--分页-->
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


        <!-- 出金详情 -->
        <el-dialog :title="dialog.title"  :visible.sync="dialog.dialogFormVisible" :before-close="resetDialogData">
            <el-tabs v-model="dialog.activeName">
                <el-tab-pane name="1">
                    <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.dialog_withdraw_detail') || '出金详情' }}</span>
                    <el-form :model="dialog.dialogData" ref="userFormRef" :label-width="dialog.formLabelWidth">
                        <el-form-item :label="$t('lang.order_no') || '订单编号'">
                            <span>{{ dialog.dialogData.order_no }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.account_no') || '账号'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.name') || '姓名'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.full_name }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.input_withdraw_type') || '出金类型'" :label-width="dialog.formLabelWidth">
                            <span>{{ options.cause_type[dialog.dialogData.cause] }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.pay_amount_usd_out') || '出金金额(USD)'" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.amount) }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.table_pay_fee') || '手续费(USD)'" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.poundage) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause === 1020" :label="$t('lang.pay_amount_usd') || '支付金额(USD)'"  :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.pay_amount) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause != 1020" :label="$t('lang.customer_ib_rate') || '汇率'"  :label-width="dialog.formLabelWidth">
                            <span>{{ getRate(dialog.dialogData.rate) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause != 1020" :label="$t('lang.table_pay_ind') || '支付金额(IDR)'" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.pay_amount) }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.account_gmt_create') || '创建时间'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_create }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.update_date') || '更新时间'"  :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_modified }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.present_status') || '当前状态'" :label-width="dialog.formLabelWidth">
                            <span>{{options.status_type[dialog.dialogData.order_status ] }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.bank_account') || '银行账号'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.card_no }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.bank_account_name') || '银行账户户名'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.card_user_name }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.bank_name') || '银行名称'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.bank_name }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.bank_country') || '银行国家'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.country }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.bank_province') || '地区(省)'"  :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.province }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.bank_city') || '地区(市)'"  :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.city }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.bank_of_deposit') || '银行开户行'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.branch_name }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.bank_of_deposit_ad') || '开户行地址'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.branch_address }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.international_code') || '银行Swift Code'"  :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.branch_swift_code }}</span>
                        </el-form-item>
                        <el-form-item  :label="$t('lang.remark') || '处理备注'"  :label-width="dialog.formLabelWidth">
                            <span v-html="tableRemarkFormatter(dialog.dialogData.remark)"></span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.images_info') || '图片资料' }}</span>
                    <el-form :model="dialog.dialogData" :label-width="dialog.formLabelWidth">
                        <el-form-item :label="$t('lang.identity1_path') || '证件正面'" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.identity1_path)" width="60%" :src="'/common/images/' + dialog.dialogData.identity1_path" v-if="dialog.dialogData.identity1_path" />
                            </span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.identity2_path') || '证件反面'" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.identity2_path)" width="60%" :src="'/common/images/' + dialog.dialogData.identity2_path"  v-if="dialog.dialogData.identity2_path" />
                            </span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.path') || '地址证明'" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.path)" width="60%" :src="'/common/images/' + dialog.dialogData.path"  v-if="dialog.dialogData.path" />
                            </span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane name="3" :label="$t('lang.view_account_balance') || '查看账户余额'">
                    <span slot="label"><i class="el-icon-date"></i>{{ $t('lang.view_account_balance') || '查看账户余额' }}</span>
                    <el-form :model="dialog.dialogData" :label-width="dialog.formLabelWidth">
                        <el-form-item :label="$t('lang.account_no') || '账号'" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.balance_usd') || '余额(USD)'" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.balance) }}</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
            </div>
        </el-dialog>

        <!--显示大图-->
        <el-dialog :title="dialog.imgTitle" :visible.sync="dialog.dialogImgVisible" class="text-from" width="90%">
            <img width="100%" :src="dialog.imgSrc"/>
        </el-dialog>

        <!-- 统计列表 TODO -->
        <!--退回-->
        <el-dialog :title="backDialog.title"    :visible.sync="backDialog.dialogFormVisible" :before-close="resetBackDialogData">
            <el-form :model="backForm" :rules="rule" ref="backForm">
                <el-input type="hidden" name="order_id" v-model="backForm.order_id"></el-input>
                <el-input type="hidden" name="cause" v-model="backForm.cause"></el-input>

                <el-form-item prop="back_amount" :label="$t('lang.return_amount') || '退回金额'" :label-width="backDialog.formLabelWidth">
                    <el-input  v-model="backForm.back_amount" :input-width="backDialog.formInputWidth" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="back_remark" :label="$t('lang.return_reason') || '退回原因'"  :label-width="backForm.formLabelWidth">
                    <el-input  type="textarea" :rows="2" :input-width="backDialog.formInputWidth" v-model="backForm.back_remark" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backDialog.dialogFormVisible = false">{{ $t('lang.abolish') || '取 消' }}</el-button>
                <el-button type="primary" @click="withdrawBackSubmit">{{ $t('lang.confirm') || '确 定' }}</el-button>
            </div>
        </el-dialog>
    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/money_api.js';
    import * as date from "../../common/js/date"
    import {centToDollar,computeRate} from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';

    export default {
        props: ["params"],
        data() {
            return {
                clearable:false,
                roleDisplay:{
                    backDisplay:false,
                    decreaseDisplay:false,
                    completeDisplay:false,
                    ignoreDisplay:false,
                    manualDisplay:false,
                },
                listLoading :false,
                statistics: {},     //统计
                options: {
                    account_type: dict.customer_ib_type,
                    cause_type: dict.withdraw_cause_type,
                    status_type: dict.withdraw_status_type
                },
                selectOptions: {
                    account_type: dict.account_type
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                datas: [],
                filters: {
                    order_no: '',
                    account_no: '',
                    full_name: '',
                    cause: '',
                    account_type: '',
                    order_status: '',
                    order_time_from: '',
                    order_time_to: '',
                    createDate: '',
                    /*update_time_from: '',
                    update_time_to: '',
                    updateDate: ''*/
                },
                dialog: {
                    activeName:"1",
                    title: this.$t('lang.view_reason') || '查看详情',
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth: '80px',
                    imgTitle:this.$t('lang.show_big_photo') || '显示大图',
                    dialogImgVisible: false,
                    imgSrc: "",
                    in_withdraw_data: [],
                    in_withdraw_data_total: 100,
                    transfer_data: [],
                    transfer_data_total: 110,
                    balanceData: [{"account": '80875465', 'balance': '156.52'}]

                },
                backDialog:{
                    title:this.$t('lang.btn_return') || '退回',
                    dialogFormVisible:false,
                    formLabelWidth: '100px',
                    formInputWidth: '60px',
                    back_amount:'',
                    back_ramark:'',
                    order_id:'',
                    cause:'',
                    amount:''
                },
                backForm:{
                    back_amount:'',
                    back_ramark:'',
                    order_id:'',
                    cause:''
                },
                rule: {
                    back_amount: [
                        {required: true,validator:checkFields.backMoneyMustBeNumber,trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    back_remark: [
                        {required: true, message:this.$t('lang.return_reason') ||  '请输入退款原因'},
                        //{ validator: validaePass2 }
                    ]
                },
            }
        },
        methods: {
            //放大图片
            showBigImg(src) {
                this.dialog.imgSrc = src;
                this.dialog.dialogImgVisible = true;
            },
            //汇率
            getRate(row, column) {
                if (column) {
                    return computeRate(row[column.property]);
                }
                return computeRate(row);
            },
            //支付金额IDR
            payAmountIDR(row){
                if(row.cause === 1021)
                {
                    return this.cent2dollar(row.pay_amount);
                }
                return "";
            },
            //支付金额USD
            payAmountUSD(row){
                if(row.cause === 1020)
                {
                    return this.cent2dollar(row.pay_amount);
                }
                return "";
            },
            //美分变美元
            cent2dollar(row, column)
            {
                if(column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //提交时间发生改变
            handleCreateDateChange(val) {
                this.filters.order_time_from = val[0];
                this.filters.order_time_to = val[1];
            },
            //更新时间发生改变
            /*handleUpdateDateChange(val) {
                this.filters.update_time_from = val[0];
                this.filters.update_time_to = val[1];
            },*/
            //分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            //page_no
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getWithdrawList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getWithdrawList();
            },
            //查询列表
            getWithdrawList() {
                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    /*update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)*/
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.withdrawList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                    this.listLoading = false;
                });
            },
            usdExportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    /*update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)*/
                };

                money_api.withdrawExportUSD(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            idrExportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    /*update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)*/
                };

                money_api.withdrawExportIDR(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            exportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    /*update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)*/
                };
                /*let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };*/

                money_api.withdrawExport(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            withdrawDetails(id, cause) {
                let params = {
                    order_id: id,
                    cause: cause
                };
                money_api.withdrawDetails(params).then((res) => {
                    if (res.data.status === 200) {
                        let row = JSON.parse(res.data.datas);
                        this.dialog.dialogFormVisible = true;
                        this.dialog.dialogData = row;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                });
            },
            withdrawDecrease(id, cause) {
                this.$confirm(this.$t('lang.confirm_withhold') || '确认扣款？',  this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:  this.$t('lang.confirm') || '确定',
                    cancelButtonText:  this.$t('lang.abolish') || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        cause: cause,
                        order_id: id
                    };
                    money_api.withdrawDecrease(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '确认成功!'
                                message: this.$t('lang.operate_succ') || '操作成功',
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getWithdrawList();
                        }

                    });
                }).catch((e) => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawFinish(id, cause) {
                this.$confirm(this.$t('lang.confirm_withhold_succ') || '确认处理完成？',  this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:  this.$t('lang.confirm') || '确定',
                    cancelButtonText:  this.$t('lang.abolish') || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        cause: cause,
                        order_id: id
                    };
                    money_api.withdrawFinish(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '出金完成，邮件已发送客户、级联销售!'
                                message: this.$t('lang.operate_succ') || '操作成功',
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                            this.getWithdrawList();
                        }

                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawIgnore(id, cause) {
                this.$prompt(this.$t('lang.tips_text_info5') || '请输入忽略原因(必填)', this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:  this.$t('lang.confirm') || '确定',
                    cancelButtonText:  this.$t('lang.abolish') || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    inputValidator: function (value) {
                        if (value) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    inputErrorMessage: this.$t('lang.tips_text_info4') || '请输入忽略原因',
                }).then(({value}) => {

                    let params = {
                        order_id: id,
                        cause: cause,
                        remark: value
                    };
                    money_api.withdrawIgnore(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已成功忽略该条出金记录，邮件已发送!'
                                message: this.$t('lang.operate_succ') || '操作成功',
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getWithdrawList();
                        }
                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawManualDecrease(id, cause) {
                this.$prompt(this.$t('lang.tips_text_info3') || '请输入处理情况（必填）',  this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:  this.$t('lang.confirm') || '确定',
                    cancelButtonText:  this.$t('lang.abolish') || '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    inputValidator: function (value) {
                        if (value) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    inputErrorMessage: this.$t('lang.tips_text_info1') || '请输入处理情况',
                }).then(({value}) => {

                    let params = {
                        order_id: id,
                        cause: cause,
                        remark: value
                    };
                    money_api.withdrawManualDecrease(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已处理完成！'
                                message: this.$t('lang.operate_succ') || '操作成功',
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getWithdrawList();
                        }
                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawBack(id, cause,amount){
                this.backDialog.dialogFormVisible = true;
                this.backForm.order_id = id;
                this.backForm.cause = cause;
                this.backForm.amount = amount;
            },
            withdrawBackSubmit() {
                this.$refs.backForm.validate((valid) => {
                    if (valid) {
                        if(this.backDialog.amount < this.backForm.back_amount){
                            this.$message.error(this.$t('lang.return_amount_err_tips') || '操作成功');
                            return false;
                        }
                        var params = {
                            order_id: this.backForm.order_id,
                            cause: this.backForm.cause,
                            amount: accMul(this.backForm.back_amount,100),
                            remark: this.backForm.back_remark
                        }

                        money_api.withdrawBack(params).then((res) => {
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    //message: '已处理完成！'
                                    message: this.$t('lang.operate_succ') || '操作成功',
                                });
                                this.resetBackDialogData();
                                this.getWithdrawList();
                            } else {
                                this.$message.error(res.data.status + " " + res.data.msg);
                                this.getWithdrawList();
                            }
                        });
                    } else {
                        return false;
                    }
                })
            },

            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.activeName = "1";
            },
            resetBackDialogData() {       //重置 表单
                this.backDialog.dialogFormVisible = false;
                this.backDialog.back_amount='';
                this.backDialog.back_ramark='';
                this.backDialog.amount=0;
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                /*this.filters.update_time_from = "";
                this.filters.update_time_to = "";*/
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getWithdrawList();
            },
            tableAccountFormatter(row) {
                return this.options.account_type[row.account_type];
            },
            tableCauseFormatter(row) {
                return this.options.cause_type[row.cause];
            },
            tableRemarkFormatter(remark){
                if(remark)
                {
                    while(remark.indexOf('*') > -1)
                    {
                        remark = remark.replace("*", "<br />");
                    }
                    return remark;
                }
                return "";
            },
            tableStatusFormatter(row) {
                row.backDisplay=false;
                row.decreaseDisplay=false;
                row.completeDisplay=false;
                row.ignoreDisplay=false;
                row.manualDisplay=false;
                switch (row.order_status){
                    case 2:
                        row.decreaseDisplay=true;
                        row.ignoreDisplay = true;
                        break;
                    case 5:
                        row.completeDisplay=true;
                        row.backDisplay=true;
                        break;
                    case 101:
                        row.manualDisplay=true;
                        break;
                    case 204:
                        row.backDisplay=true;
                        break;
                }
                return this.options.status_type[row.order_status];
            },

            //切换table
            handleTabsClick(tab, event) {

            },
            setRoleDidsplay(){
                let user= this.$store.getters.getUserInfo;

                if(!user || !user.role_name){
                    let cuser=util.cookieMethod.getCookie('user')
                    user =  JSON.parse(cuser)
                }

                let role_name=user.role_name;

                if(!role_name)
                {
                    role_name = "";
                }
                if(role_name.indexOf("资金岗") >-1 || role_name.indexOf("admin") >-1 || role_name.indexOf("管理员") > -1){
                    this.roleDisplay.backDisplay=true;
                    this.roleDisplay.decreaseDisplay=true;
                    this.roleDisplay.ignoreDisplay=true;
                    this.roleDisplay.manualDisplay=true;
                    this.roleDisplay.completeDisplay=true;
                }

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getWithdrawList();
                this.setRoleDidsplay();
            })
        }

    }
</script>
<style>
    .el-table .cell
    {
        padding-left:5px!important;
        padding-right:5px!important;
    }
</style>