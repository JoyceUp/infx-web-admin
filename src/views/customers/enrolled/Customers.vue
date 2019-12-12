<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" ref="filters" size="small">
                <el-form-item prop="account_no">
                    <el-input :placeholder="$t('lang.mt_account') || 'MT4账号'" v-model="filters.account_no"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input :placeholder="$t('lang.full_name') || '客户姓名'" v-model="filters.name"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input :placeholder="$t('lang.e_email') || '电子邮箱'" v-model="filters.email"></el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                    <el-input :placeholder="$t('lang.mobile') || '手机号'" v-model="filters.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="identity_no">
                    <el-input :placeholder="$t('lang.identity_no') || '证件号码'" v-model="filters.identity_no"></el-input>
                </el-form-item>

                <el-form-item prop="ib_account_no">
                    <el-input :placeholder="$t('lang.parent_account_no') || '上级邮箱'" v-model="filters.ib_account_no"></el-input>
                </el-form-item>

                <el-form-item prop="ib_name">
                    <el-input :placeholder="$t('lang.parent_email') || '上级姓名'" v-model="filters.ib_name"></el-input>
                </el-form-item>
                <el-form-item prop="sales_account_no">
                    <el-input :placeholder="$t('lang.sales_account_no') || '销售账号'" v-model="filters.sales_account_no"></el-input>
                </el-form-item>
                <el-form-item prop="sales_name">
                    <el-input :placeholder="$t('lang.sales_name') || '销售姓名'" v-model="filters.sales_name"></el-input>
                </el-form-item>
                <el-form-item prop="dataRange">
                    <el-date-picker v-model="filters.dataRange" type="daterange" :range-separator="$t('lang.times_to') || '至'" :start-placeholder="$t('lang.gmt_create') || '注册时间'"
                                    :end-placeholder="$t('lang.gmt_create') || '注册时间'"></el-date-picker>
                </el-form-item>
                <el-form-item prop="opening_state_list">
                    <el-select clearable placeholder="状态" :placeholder="$t('lang.sale_status') || '状态'" v-model="filters.opening_state_list">

                        <el-option :label="$t('lang.opened_account') || '已开户'" value="4"></el-option>
                        <el-option :label="$t('lang.no_opened_account') || '未开户'" value="0,1,2,3,5,6"></el-option>
                        <!--<el-option :key="value" :label="txt" :value="value" v-for="(txt, value) in option_customer_state"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getItems(1)">{{$t('lang.find') || '查询'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('filters')">{{$t('lang.empty') || '清空'}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- table -->
        <el-table :data="items"  stripe
                  v-loading="listLoading"
                  style="width: 100%">
            <el-table-column prop="gmt_create" :label="$t('lang.gmt_create') || '注册时间'"></el-table-column>
            <el-table-column :label="$t('lang.full_name') || '客户姓名'">
                <template slot-scope="scope">
                    <el-button  type="text" @click="showDetail(scope.row.id)">
                        {{isNull(scope.row.full_name)}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="$t('lang.mobile') || '手机号'">    <template slot-scope="scope"> <span>{{mobileValue(scope.row.country_code, scope.row.mobile)}}</span></template>     </el-table-column>
            <el-table-column :label="$t('lang.e_email') || '电子邮箱'">  <template slot-scope="scope"> <span>{{isNull(scope.row.email)}}</span></template>      </el-table-column>
            <el-table-column :label="$t('lang.identity_no') || '证件号码'">  <template slot-scope="scope"> <span>{{isNull(scope.row.identity_no)}}</span></template></el-table-column>
            <el-table-column :label="$t('lang.account_balance') || '账户余额(合计)'">  <template slot-scope="scope"> <span>{{dividedBy100(scope.row.balance)}}</span></template></el-table-column>
            <el-table-column :label="$t('lang.sale_status') || '状态'">    <template slot-scope="scope"> <span>{{option_customer_state[scope.row.opening_state]}}</span></template>     </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                    :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import {customersList} from '../../../api/customers_api';
    import {formatDate} from '../../../common/js/date';
    import dict from '../../../common/js/dict';
    import {centToDollar, trimBlank, dividedBy100, outputValue} from '../../../common/js/commons';

    export default {
        data() {
            return {
                listLoading:false,
                items: [{
                    id: '',//客户ID
                    full_name: '',  //客户姓名
                    family_name: '',    //姓
                    given_name: '',     //名
                    gmt_create: '',//注册时间
                    mobile: '', //手机号码
                    email: '',  //电子邮箱
                    identity_no: '',    //证件号码
                    balance: '',//账户余额
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                filters: {
                    account_no: '',//mt4号
                    name: '',//客户姓名
                    email: '',//点子邮箱
                    mobile: '',//手机号码
                    identity_no: '',//证件号码
                    ib_account_no: '',//代理账号
                    ib_name: '',//代理姓名
                    sales_account_no: '',//销售ID
                    sales_name: '',//销售姓名
                    opening_state_list: [0,1,2,3,4,5,6],//状态
                    dataRange:''    //时间范围
                },
                option_customer_state: dict.customer_opening_state_map
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
            handlePagerChange() {this.getItems();},
            getItems(num) {//获取客户列表
                this.listLoading=true;
                if(num){
                    this.pager.currentPage = 1;
                }
                let condition = {};
                let flag = false;
                if(this.filters.dataRange == '' || this.filters.dataRange == null){
                    flag = true;
                }
                var state_list = this.filters.opening_state_list;
                var dataStrArr = state_list.split(",");//分割成字符串数组
                console.log(dataStrArr)
                var dataIntArr = [];//保存转换后的整型字符串
             /*   dataStrArr.forEach(function(data,index,arr){
                    dataIntArr.push( +data );
                });*/
                dataIntArr= dataStrArr
                condition.account_no = trimBlank(this.filters.account_no);
                condition.name = trimBlank(this.filters.name);
                condition.email = trimBlank(this.filters.email);
                condition.mobile = trimBlank(this.filters.mobile);
                condition.identity_no = trimBlank(this.filters.identity_no);
                condition.ib_account_no = trimBlank(this.filters.ib_account_no);
                condition.ib_name = trimBlank(this.filters.ib_name);
                condition.sales_account_no = trimBlank(this.filters.sales_account_no);
                condition.sales_name = trimBlank(this.filters.sales_name);
                condition.opening_state_list = dataIntArr;
                condition.start_time = flag ?'':formatDate(this.filters.dataRange[0], "yyyy-MM-dd") + ' 00:00:00';
                condition.end_time= flag ?'':formatDate(this.filters.dataRange[1], "yyyy-MM-dd") + ' 23:59:59';

                let params = {
                    "page_size": this.pager.pageSize,
                    "page_no": this.pager.currentPage,
                    condition: condition
                };

                customersList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        this.listLoading=false;
                        this.items = result.items;
                        this.listLoading = false;
                        this.pager.total = result.total;
                    } else {
                        if (res.data.status === 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                });
            },

            //清空筛选表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getItems();
            },
            isNull(val){
                return (val == "" || val == undefined || val == null) ? "-" : val;
            },
            centToDollar(val){
                return centToDollar(val);
            },
            dividedBy100(val){
                return dividedBy100(val);
            },
            showDetail(iid){
                this.$router.push({name:'用户详情',params:{id: iid}});
            },
            mobileValue(val, phone) {
                return outputValue(val, phone);
            }
        },
        mounted() {
            this.$nextTick(function () {
                 if( this.listLoading==false){this.getItems();};
            })
        }
    }
</script>
<style scoped>
    .container .main .content-container{
        background:#f7f7f7;
    }
    .form .form-left {
        width: 10%;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1rem;
        margin-bottom: 2px;
    }

    .el-form-item {
        margin-bottom: 2px;
    }
</style>