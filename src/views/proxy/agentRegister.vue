<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" size="small">
                <el-form-item>
                    <el-input placeholder="姓名" v-model="filters.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="电子邮箱" v-model="filters.email"></el-input>
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
                    <el-date-picker v-model="filters.dataRange" type="daterange" range-separator="-" start-placeholder="登记日期"
                                    end-placeholder="登记日期" size="small" ></el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="getItems()">查询</el-button>
                    <el-button type="primary" @click="getClear()">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table stripe :data="items" style="width: 100%" show-header tooltip-effect="dark">
            <el-table-column prop="full_name" label="姓名" align="center" width="130px"show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button  type="text" @click="alertDetail(scope.row.id)">
                        {{ scope.row.family_name }}{{ scope.row.given_name }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="称呼" align="center">
                <template slot-scope="scope">
                    <span>{{ changeStatus(scope.row.gender, genderOptions) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" align="center" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="identity_type" label="证件类型" align="center"show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{changeStatus(scope.row.identity_type, identityTypeOptions)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="identity_no" label="证件号码" align="center" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="invite_code" label="邀请码" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column prop="invite_full_name" label="邀请人姓名"show-overflow-tooltip> </el-table-column>
            <el-table-column label="状态" align="center"show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ changeStatus(scope.row.state,stateOptions) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmt_create" label="登记时间" align="center"show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

        <!-- 弹框 -->
        <el-dialog title="代理登记详情" :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false">
            <el-form label-width="90px" size="small">
                <el-form-item label="登记时间:">        <span>{{ agentInfo.gmt_create }}</span>         </el-form-item>
                <el-form-item label="姓名:" >           <span>{{ agentInfo.full_name }}</span>     </el-form-item>
                <el-form-item label="称呼:" >           <span>{{ changeStatus(agentInfo.gender, genderOptions) }}</span>       </el-form-item>
                <el-form-item label="电子邮箱:" >       <span>{{ agentInfo.email }}</span>              </el-form-item>
                <el-form-item label="证件类型:" >       <span>{{ changeStatus(agentInfo.identity_type, identityTypeOptions) }}</span>  </el-form-item>
                <el-form-item label="证件号码:" >       <span>{{ agentInfo.identity_no }}</span>        </el-form-item>
                <el-form-item label="邀请码:" >         <span>{{ agentInfo.invite_code}}</span>         </el-form-item>
                <el-form-item label="邀请人姓名:" >     <span>{{ agentInfo.invite_full_name }}</span>   </el-form-item>
                <el-form-item label="状态:" >           <span>{{ changeStatus(agentInfo.state,stateOptions) }}</span>          </el-form-item>
                <el-form-item label="处理备注:" >       <span>{{ agentInfo.remark }}</span>             </el-form-item>
                <el-form-item label="更新时间:" >       <span>{{ agentInfo.gmt_modified }}</span>       </el-form-item>

                <el-form-item v-if="changeStatus(agentInfo.state,stateOptions) == '待审核' ">
                    <el-button type="primary" @click.native="handleClick(agentInfo.id)" :loading="addLoading">同 意</el-button>
                    <el-button @click.native="handleCancel(agentInfo.id)" :loading="addLoading">拒 绝</el-button>
                </el-form-item>
                <el-form-item v-if="changeStatus(agentInfo.state,stateOptions) == '已同意' ">
                    <el-button @click.native="handleClick(agentInfo.id)" :loading="addLoading">重发</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script>
    import {agentRegisterList, agentRegisterInfo, agentRegisterAgree, agentRegisterRefuses} from '../../api/agent_api';
    import {formatDate} from '../../common/js/date';
    import dict from '../../common/js/dict';
    import {trimBlank} from '../../common/js/commons';

    export default{
        data(){
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                filters:{
                    name:'',//姓名
                    email:'',//电子邮箱  精确查询
                    identity_no:'',//证件号码    精确查询
                    state:'',//状态 选项：待审核、已同意、已拒绝、默认全部
                    dataRange:''    //时间范围
                },
                items:[],
                agentInfo:[{                    //弹框
                    id: '',
                    gmt_create:'',//登记时间
                    full_name:'', //姓名
                    gender:'',//称呼
                    email:'',//电子邮箱
                    identity_type:'',//证件类型
                    identity_no:'',//证件号码
                    invite_code:'',//邀请码
                    invite_full_name:'',//邀请人姓名
                    gmt_modified:'',//更新时间
                    remark : '',//备注
                    state:'',//状态
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                stateOptions:[{'key': '待审核', 'value': '20'},{'key': '已同意', 'value': '22'},{'key': '已拒绝', 'value': '21'}],
                identityTypeOptions: dict.identity_type,
                genderOptions: dict.gender,
                addLoading:false,
                dialogVisible:false
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
                let condition = {};
                let flag = false;
                if(this.filters.dataRange == '' || this.filters.dataRange == null){
                    flag = true;
                }
                this.listLoading=true;
                condition.name = trimBlank(this.filters.name);
                condition.email = trimBlank(this.filters.email);
                condition.identity_no = trimBlank(this.filters.identity_no);
                condition.state = this.filters.state;
                condition.start_time = flag ?'':formatDate(this.filters.dataRange[0], "yyyy-MM-dd") + ' 00:00:00';
                condition.end_time= flag ?'':formatDate(this.filters.dataRange[1], "yyyy-MM-dd") + ' 23:59:59';
                let params = {
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                    condition: condition
                };
                agentRegisterList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        if(result != null){
                            this.listLoading=false
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
            alertDetail(iid){
                this.dialogVisible = true;
                agentRegisterInfo({ 'id': iid }).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.agentInfo = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            getClear(){     //重置
                this.filters.name = '';
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
                    agentRegisterRefuses({"id": iid,"remark":value}).then((res) => {
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
                agentRegisterAgree(params).then((res) => {
                    if (res.data.status === 200) {
                        this.$message("注册邮件已发送!");
                         if( this.listLoading==false){this.getItems();};
                    } else {
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                })
                return val;
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.getItems();
            })
        }
    }
</script>
<style scoped>
    .el-form-item{
        line-height: 2px;
        margin: 0px;
        padding: 0px;
    }
</style>