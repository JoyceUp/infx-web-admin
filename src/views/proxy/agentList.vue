<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" size="small" ref="filters">
                <el-form-item prop="account_no"><el-input placeholder="代理账号" v-model="filters.account_no"></el-input>       </el-form-item>
                <el-form-item prop="name"><el-input placeholder="代理姓名" v-model="filters.name"></el-input>                   </el-form-item>
                <el-form-item prop="email"><el-input placeholder="电子邮箱" v-model="filters.email"></el-input>                 </el-form-item>
                <el-form-item prop="mobile"><el-input placeholder="手机号码" v-model="filters.mobile"></el-input>               </el-form-item>
                <el-form-item prop="identity_no"><el-input placeholder="证件号码" v-model="filters.identity_no"></el-input>     </el-form-item>
                <el-form-item prop="sales_account_no"><el-input placeholder="销售账号" v-model="filters.sales_account_no"></el-input>           </el-form-item>
                <el-form-item prop="sales_name"><el-input placeholder="销售姓名" v-model="filters.sales_name"></el-input>       </el-form-item>
                <el-form-item prop="dataRange">
                    <el-date-picker v-model="filters.dataRange" type="daterange" range-separator="-"
                            start-placeholder="注册日期" end-placeholder="注册日期" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="getItems()">查询</el-button>
                </el-form-item>
                <el-form-item >
                    <el-button @click="resetForm('filters')">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table stripe :data="items" style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="gmt_create" label="注册时间" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column label="代理姓名" align="center"show-overflow-tooltip>
                <template slot-scope="scope"><el-button  type="text" @click="showDetail( scope.row.id )">{{scope.row.full_name}}</el-button></template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号码" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column prop="email" label="电子邮箱" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column prop="identity_no" label="证件号码" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column label="账户余额" align="center"show-overflow-tooltip><template slot-scope="scope"><span>{{centToDollar(scope.row.balance)}}</span></template> </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import {agentList} from '../../api/agent_api';
    import {formatDate} from '../../common/js/date';
    import {trimBlank, centToDollar} from '../../common/js/commons';

    export default{
        data(){
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                filters:{
                    account_no: '', //代理账号
                    name:'',    //代理姓名
                    mobile:'',  //手机号码
                    email:'',   //电子邮箱  精确查询
                    identity_no:'', //证件号码    精确查询
                    sales_account_no: '',   //销售账号
                    sales_name: '', //销售姓名
                    dataRange: ''    //时间范围
                },
                items:[],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
            }
        },
        methods:{
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

            getItems(){
                this.listLoading=true;
                let condition = {};
                let flag = false;
                if(this.filters.dataRange == '' || this.filters.dataRange == null){
                    flag = true;
                }
                condition.account_no = trimBlank(this.filters.account_no);
                condition.name = trimBlank(this.filters.name);
                condition.mobile = trimBlank(this.filters.mobile);
                condition.email = trimBlank(this.filters.email);
                condition.identity_no = trimBlank(this.filters.identity_no);
                condition.sales_account_no = trimBlank(this.filters.sales_account_no);
                condition.sales_name = trimBlank(this.filters.sales_name);
                condition.start_time = flag ?'':formatDate(this.filters.dataRange[0], "yyyy-MM-dd") + ' 00:00:00';
                condition.end_time= flag ?'':formatDate(this.filters.dataRange[1], "yyyy-MM-dd") + ' 23:59:59';
                let params = {
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                    condition: condition
                };

                agentList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.listLoading=false;
                        if(result != null){
                            this.items = result.items;
                            this.pager.pageSize = result.page_size;
                            this.pager.currentPage = result.page_no;
                            this.pager.total = result.total;
                        }
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeStatus(row){
                let val = '';
                this.options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            showDetail(iid){
                this.$router.push({name:'代理详情',params:{id: iid}});
            },
            centToDollar(val){
                return centToDollar(val);
            }

        },
        mounted(){
            this.$nextTick(function(){
                this.getItems();
            })
        }
    }
</script>
<style>
    .form .form-left {
        width:10%; padding-left:1rem; padding-right:1rem; padding-top:1rem;
    }
</style>