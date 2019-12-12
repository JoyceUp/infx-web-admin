<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" size="small">
                <el-form-item>
                    <el-input placeholder="代理姓名" v-model="filters.full_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="电子邮箱" v-model="filters.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="手机号码" v-model="filters.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="证件号码" v-model="filters.identity_no"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select clearable placeholder="状态" v-model="filters.state" @change="getItems()">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in stateOptions" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="filters.dataRange" type="daterange" range-separator="-"
                            start-placeholder="注册时间" end-placeholder="注册时间" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="getItems()">查询</el-button>
                    <el-button type="primary" @click="getClear()">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table stripe :data="items" style="width: 100%" highlight-current-row @sort-change="sortChange" tooltip-effect="dark">
            <el-table-column prop="gmt_create" label="注册时间" sortable="custom" show-overflow-tooltip> </el-table-column>
            <el-table-column label="代理姓名" header-align="center"show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button  type="text" @click="showDetail(scope.row.id)">
                        <span>{{ scope.row.full_name}}</span>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号码"show-overflow-tooltip> </el-table-column>
            <el-table-column prop="email" label="电子邮箱" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="identity_no" label="证件号码" show-overflow-tooltip> </el-table-column>
            <el-table-column label="邀请码" align="center"show-overflow-tooltip>
                <template slot-scope="scope"> <span>{{isNull(scope.row.invite_code)}}</span></template>
            </el-table-column>
            <el-table-column label="邀请人姓名" align="center"show-overflow-tooltip>
                <template slot-scope="scope"> <span>{{isNull(scope.row.invite_full_name)}}</span></template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="80px">
                <template slot-scope="scope">
                    <span>{{ changeStatus(scope.row.state, stateOptions) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160px" header-align="center">
                <template slot-scope="scope" v-if="scope.row.state == 31">
                    <el-button type="danger"  @click="handleClick(scope.row.id)">同意</el-button>
                    <el-button type="danger"  @click="handleCancel(scope.row.id)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>


        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
            <span>确定审核通过并开户吗 ? </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import {pendAgentsList,pendAgentsAgree,pendAgentsRefuses} from '../../api/agent_api';
    import dict from '../../common/js/dict';
    import {formatDate} from '../../common/js/date';
    import {trimBlank} from '../../common/js/commons';

    export default{
        props:["params"],
        components:{},
        data(){
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                filters:{
                    full_name:'',   //代理姓名
                    mobile:'',      //手机号码
                    email:'',       //电子邮箱  精确查询
                    identity_no:'', //证件号码    精确查询
                    state:'',       //状态
                    dataRange:''    //时间范围
                },
                items:[{
                    id: '',
                    gmt_create:'',//登记时间
                    full_name:'',//姓名
                    mobile:'',//手机号码
                    email:'',//电子邮箱
                    identity_no:'',//证件号码
                    invite_code:'',//邀请码
                    invite_full_name:'',//邀请人姓名
                    gmt_modified:'',//更新时间
                    state:'',//状态
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                stateOptions: dict.status,
                dialogVisible:false,
            }
        },
        watch: {

        },
        methods:{
            sortChange(col){
                this.order_column = col.prop == null ? 'gmt_create' : col.prop;
                if(col.order == 'descending'){
                    this.order_by = "desc";
                }else{
                    this.order_by = "asc";
                }
                 if( this.listLoading==false){this.getItems();};
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
            handlePagerChange(){ this.getItems();},
            getItems(){
                let condition = {};
                let flag = false;
                if(this.filters.dataRange == '' || this.filters.dataRange == null){
                    flag = true;
                }
                this.listLoading=true;
                condition.full_name = trimBlank(this.filters.full_name);
                condition.mobile = trimBlank(this.filters.mobile);
                condition.email = trimBlank(this.filters.email);
                condition.identity_no = trimBlank(this.filters.identity_no);
                condition.state = this.filters.state;
                condition.start_time = flag ?'':formatDate(this.filters.dataRange[0], "yyyy-MM-dd") + ' 00:00:00';
                condition.end_time= flag ?'':formatDate(this.filters.dataRange[1], "yyyy-MM-dd") + ' 23:59:59';
                let params = {
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                    order_column: this.order_column,
                    order_by: this.order_by,
                    condition: condition
                };

                pendAgentsList(params).then((res)=>{

                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.listLoading=false;
                        this.items = result.items;
                        this.pager.total = result.total;
                        this.pager.pageSize = result.page_size;
                        this.pager.currentPage = result.page_no;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            getClear(){     //重置
                this.filters.full_name = '';
                this.filters.mobile = '';
                this.filters.email = '';
                this.filters.identity_no = '';
                this.filters.state = '';
                this.filters.dataRange = '';
            },
            handleClick(iid) {
                //同意操作：待审核状态的信息，允许做此操作。二次确认同意后，系统给登记邮箱发一封“代理注册邀请”的邮件，邮件内需附注册链接地址。信息状态由“待审核”变更为“已同意”；
                this.dialogVisible = false;
                this.$confirm('确认审核通过并发送注册邮件吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return this.agreeForm(iid);
                }).catch(() => {});
            },
            handleCancel( iid ) {
                //拒绝操作：待审核状态的信息，允许做此操作。若拒绝，需要给出拒绝的理由说明，提交后，系统给登记邮箱发一封“代理注册拒绝”的邮件，邮件内需附拒绝原因说明。信息状态由“待审核”变更为“已拒绝”；
                this.dialogVisible = false;
                this.$prompt('请输入拒绝原因：', '审核拒绝', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType:'textarea',
                    inputPattern: /([A-Za-z0-9_]|[\u4e00-\u9fa5]|[^\x00-\xff])+/,
                    inputErrorMessage: '不能为空！'
                }).then(({ value }) => {
                    pendAgentsRefuses({"id": iid,"remark":value}).then((res) => {
                        if (res.data.status === 200) {
                            this.$message("已拒绝，并发邮件通知!");
                             if( this.listLoading==false){this.getItems();};
                            //重置表单
                            //this.resetForm();
                        } else {
                            this.$message.error(res.data.status+" "+res.data.msg);
                        }
                    });
                }).catch(() => {});
            },
            agreeForm(iid){
                let params = {
                    "id": iid
                };
                pendAgentsAgree(params).then((res) => {
                    if (res.data.status === 200) {
                        this.$message("注册邮件已发送!");
                         if( this.listLoading==false){this.getItems();};
                    } else {
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeStatus(row, options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                })
                return val;
            },
            fmtDate(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            },

            showDetail( iid ){
                this.$router.push({name:'代理注册信息',params:{id: iid}});
            },
            isNull(val){
                return (val == "" || val == undefined || val == null) ? "- " : val;
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

</style>