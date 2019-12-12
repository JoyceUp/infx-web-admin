<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-row>
            <el-col :span="24"  class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" size="" ref="filters" size="medium">
                    <el-form-item prop="account_no">
                        <el-input placeholder="代理账号" v-model.trim="filters.account_no"></el-input>
                    </el-form-item>
                    <el-form-item  prop="full_name">
                        <el-input placeholder="代理姓名" v-model.trim="filters.full_name"></el-input>
                    </el-form-item>
                    <el-form-item  prop="email">
                        <el-input placeholder="电子邮箱" v-model.trim="filters.email"></el-input>
                    </el-form-item>
                    <el-form-item  prop="mobile">
                        <el-input placeholder="手机号码" v-model.trim="filters.mobile"></el-input>
                    </el-form-item>
                    <el-form-item  prop="identity_no">
                        <el-input placeholder="证件号码" v-model.trim="filters.identity_no"></el-input>
                    </el-form-item>
                    <el-form-item  prop="sales_account_no">
                        <el-input placeholder="销售账号" v-model.trim="filters.sales_account_no"></el-input>
                    </el-form-item>
                    <el-form-item  prop="sales_name">
                        <el-input placeholder="销售姓名" v-model="filters.sales_name"></el-input>
                    </el-form-item>
                    <el-form-item  prop="account_type">
                        <el-select clearable placeholder="账户类型" v-model="filters.account_type">
                            <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in selectOptions.account_type" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="state">
                        <el-select clearable placeholder="账户状态" v-model="filters.state">
                            <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in selectOptions.agent_account_state" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="times">
                        <el-date-picker
                                clearable
                                v-model="filters.times"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="创建时间"
                                end-placeholder="创建时间" value-format="yyyy-MM-dd" @change="handleCreateDateChange">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="AccountsList(1)" size="small">查询</el-button>
                        <el-button  @click="resetForm('filtersFrom')"  size="small">清空</el-button>
                        <el-button type="primary" @click="exportAgent()" size="small">导出</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!-- table -->
        <el-table :data="accounts"
                  style="width: 100%"
                  stripe
                  v-loading="listLoading">
            <el-table-column prop="account_no" label="代理账号" width="100"></el-table-column>
            <el-table-column prop="account_type" label="账户类型"  :formatter="accountTypeFormatter" width="100"> </el-table-column>
            <el-table-column prop="full_name" label="代理姓名"> </el-table-column>
            <el-table-column prop="balance" label="账户余额" :formatter="balanceFormatter"> </el-table-column>
            <el-table-column prop="sales_account_no" label="销售账号"> </el-table-column>
            <el-table-column prop="sales_name" label="销售姓名"> </el-table-column>
            <el-table-column prop="state" label="账号状态"  :formatter="accountStateFormatter"> </el-table-column>
            <el-table-column prop="gmt_create" label="注册时间" width="100"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary"  @click="openDialog(scope.row)" size="mini">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.page_size"
                    :current-page="pager.page_no"
                    :page-sizes="pager.sizes"
                    background
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>
        </el-col>


        <!-- 弹框 -->
        <el-dialog title="查看账号信息" :visible.sync="dialogVisible" width="760px">
            <el-tabs v-model="activeName" ><!--@tab-click="handleClick"-->
                <el-tab-pane :label="$t('lang.basic_info') || '基本信息'" name="baseInfo">
                    <el-form :model="itemInfo" inline class="demo-table-expand">
                        <el-form-item label="代理账号:">        <span>{{ itemInfo.account_no }}</span>     </el-form-item>
                        <el-form-item label="账户类型:" >       <span>{{ options.account_type[itemInfo.account_type] }}</span>     </el-form-item>
                        <el-form-item label="注册时间:" >       <span>{{ itemInfo.gmt_create }}</span>           </el-form-item>
                        <el-form-item label="账户状态:" >       <span>{{ options.account_state[itemInfo.state] }}</span>          </el-form-item>
                        <el-form-item label="代理姓名:" >       <span>{{ itemInfo.full_name }}</span>  </el-form-item>
                        <el-form-item label="性别:" >           <span>{{ options.gender[itemInfo.gender] }}</span>    </el-form-item>
                        <el-form-item label="证件类型:" >       <span>{{ options.identity_type[itemInfo.identity_type] }}</span>      </el-form-item>
                        <el-form-item label="证件号码:" >       <span>{{ itemInfo.identity_no }}</span>    </el-form-item>
                        <el-form-item label="电子邮箱:" >       <span>{{ itemInfo.email }}</span>          </el-form-item>
                        <el-form-item label="手机号码:" >       <span>{{ itemInfo.mobile }}</span>           </el-form-item>
                        <el-form-item label="国家:" >           <span>{{ itemInfo.country }}</span>   </el-form-item>
                        <el-form-item label="城市:" >           <span>{{ itemInfo.city }}</span>      </el-form-item>
                        <el-form-item label="居住地址:" >       <span>{{ itemInfo.address }}</span>    </el-form-item>
                        <el-form-item label="邮政编码:" >       <span>{{ itemInfo.zip_code }}</span>          </el-form-item>
                        <el-form-item label="销售账号:" >       <span>{{ itemInfo.sales_account_no }}</span>           </el-form-item>
                        <el-form-item label="销售姓名:" >       <span>{{ itemInfo.sales_full_name }}</span>   </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="图片信息" name="imgInfo">
                    <el-form :model="itemInfo" inline class="demo-table-expand">
                        <el-form-item label="证件正面:">        <span><img width="60%" :src ="'/common/images/'+itemInfo.identity1_path" @click="showPicBig(itemInfo.identity1_path)"/></span>     </el-form-item>
                        <el-form-item label="证件反面:" >       <span><img width="60%" :src ="'/common/images/' + itemInfo.identity2_path" @click="showPicBig(itemInfo.identity2_path)"/></span>     </el-form-item>
                        <!--<el-form-item label="地址证明:" >       <span><img width="60%" :src ="'/common/images/' + itemInfo.path"/></span>  -->         </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

        </el-dialog>

        <el-dialog title="放大图" :visible.sync="imgDialogVisible" width="63%" center>
            <span><img @click="imgDialogVisible = false" v-if="img_big" class="avatar_big" width="33%" :src="'/common/images/'+ img_big"></span>
        </el-dialog>

    </section>
</template>
<script>
    import {agentAccountList,agentAccountDetail,exportAgent} from '../../api/accounts_api';
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    export default {
        components: {},
        data() {
            return {
                listLoading:false,
                page_size: 20,
                page_no: 1,
                total: 0,
                img_big: '',
                imgDialogVisible: false,
                filters: {
                    account_no:'',//代理账号
                    account_type:'',//账号类型
                    full_name:'',//代理姓名
                    email:'',//电子邮箱
                    mobile:'',//手机号码
                    identity_no:'',//证件号码
                    identity_type:'',//证件类型
                    sales_account_no:'',//销售账号
                    sales_name:'',//销售姓名
                    state:'',//状态
                    start_time:'',//时间范围
                    end_time:''
                },
                options: {//用户table中数据转换
                    gender:dict.gender_map,
                    account_type:dict.customer_ib_type,
                    account_state:dict.account_state_map,
                    identity_type:dict.identity_type_map,
                    account_state_items:dict.account_state
                },
                selectOptions: {//用于搜索区显示
                    account_type: dict.account_type,
                    account_state: dict.account_state,
                    agent_account_state:dict.agent_account_state
                },
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                accounts: [{
                    account_no:'',//代理账号
                    full_name:'',//客户姓名
                    gmt_create:'',//注册时间
                    mobile:'',//手机号码
                    email:'',//电子邮箱
                    identity_no:'',//证件号码
                    account_balance:'',//账户余额
                    state: ''//状态
                }],
                itemInfo:{
                    account_no:'',//代理账号
                    account_type:'',//账户类型
                    gmt_create:'',//创建时间
                    state:'',//账户状态
                    full_name:'',//代理姓名
                    gender:'',//性别
                    identity_type:'',//证件类型
                    identity_no:'',//证件号码
                    email:'',//电子邮箱
                    mobile:'',//手机号码
                    country:'',//国家
                    city:'',//城市
                    address : '',//居住地址
                    zip_code:'',//邮政编码
                    sales_account_no:'',//销售账号
                    sales_name:'',//销售姓名

                },
                activeName:'baseInfo',
                dialogVisible:false
            }
        },
        methods: {
            changePageNumber(val) {
                this.page_no = val;
                this.AccountsList();
            },
            handleCreateDateChange(val){
                this.filters.start_time = val[0]+" 00:00:00";
                this.filters.end_time = val[1]+" 23:59:59";
            },
            accountTypeFormatter(row,column){
                return dict.customer_ib_type[row.account_type];
                //return row.account_type;
            },
            accountStateFormatter(row,column) {
                return dict.account_state_map[row.state];
            },
            balanceFormatter(row,column){
                if(row.balance){
                    return row.balance / 100;
                }else{
                    return 0;
                }
            },
            //清空筛选表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange()
            {
                this.AccountsList();
            },
            AccountsList(num) {//获取代理账号列表
                //let user_id = window.cookies.user_id;
                this.listLoading=true
                if(num){
                    this.pager.page_no = 1;
                }
                let params = {
                    condition:{
                        account_no: this.filters.account_no,//代理账号
                        account_type:this.filters.account_type,
                        name: this.filters.full_name,//代理姓名
                        email: this.filters.email,//电子邮箱
                        mobile: this.filters.mobile,//手机号码
                        identity_no: this.filters.identity_no,//证件号码
                        identity_type: this.filters.identity_type,//证件类型
                        sales_account_no: this.filters.sales_account_no,//销售账号
                        sales_name: this.filters.sales_name,//销售姓名
                        state: this.filters.state,//状态
                        start_time: this.filters.start_time,//开始时间
                        end_time: this.filters.end_time,//结束时间*/
                    },
                    "page_size": this.pager.page_size,
                    "page_no": this.pager.page_no,
                    "agent_name": this.filters.agent_name
                };
                agentAccountList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);

                    if (res.data.status == 200) {
                        this.accounts = result.items;
                        this.listLoading=false
                        this.pager.total = result.total;
                    } else {
                        if (res.data.status === 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                });
            },
            openDialog(row){
                this.dialogVisible = true;
                this.activeName = 'baseInfo';
                agentAccountDetail({"account_no":row.account_no,"id":row.id}).then((res) =>{

                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        this.itemInfo = result;
                    } else {
                        if (res.data.status === 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                });
            },
            exportAgent(){
                let condition ={
                        account_no: this.filters.account_no,//代理账号
                        account_type:this.filters.account_type,
                        name: this.filters.full_name,//代理姓名
                        email: this.filters.email,//电子邮箱
                        mobile: this.filters.mobile,//手机号码
                        identity_no: this.filters.identity_no,//证件号码
                        identity_type: this.filters.identity_type,//证件类型
                        sales_account_no: this.filters.sales_account_no,//销售账号
                        sales_name: this.filters.sales_name,//销售姓名
                        state: this.filters.state,//状态
                        start_time: this.filters.start_time,//开始时间
                        end_time: this.filters.end_time,//结束时间*/
                };
                exportAgent(condition).then((res) => {
                    if(res.status == 200){
                        fileDownload(res, this);
                    }else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            resetForm(){
                this.filters.account_no ="",//代理账号
                this.filters.full_name="",//代理姓名
                this.filters.email= "",//电子邮箱
                this.filters.mobile= "",//手机号码
                this.filters.identity_no="",//证件号码
                this.filters.identity_type="",//证件类型
                this.filters.sales_account_no="",//销售账号
                this.filters.sales_name="",//销售姓名
                this.filters.state="",//状态
                this.filters.start_time ="",//时间范围
                this.filters.end_time ="",
                this.filters.account_type ="",
                    this.filters.times =""
            },
            showPicBig(val){
                this.imgDialogVisible = true;
                this.img_big = val;
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.AccountsList();
            })
        }
    }
</script>
<style>
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
    .div-padd{
        padding: 10px 180px;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 40%;
    }
    .avatar_big{
        width: 100%;
        height: auto;
        display: block;
    }
</style>