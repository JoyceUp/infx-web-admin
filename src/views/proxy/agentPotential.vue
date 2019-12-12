<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" size="small">
                <el-form-item>
                    <el-date-picker
                            v-model="filters.dataRange"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="创建日期"
                            end-placeholder="创建日期" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select clearable placeholder="状态" v-model="filters.state" @change="getItems()">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in stateOptions" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="getItems()">查询</el-button>
                    <el-button type="primary" @click="getClear()">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table stripe :data="items" style="width: 100%" tooltip-effect="dark">
            <el-table-column label="代理姓名" align="center"show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button  type="text" @click="showDetail(scope.row.id)">
                        <!--{{scope.row.full_name}}--> {{scope.row.family_name}}{{scope.row.given_name}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column label="邀请码" align="center"show-overflow-tooltip>
                <template slot-scope="scope"> <span>{{isNull(scope.row.invite_code)}}</span></template>
            </el-table-column>
            <el-table-column label="邀请人姓名" align="center"show-overflow-tooltip>
                <template slot-scope="scope"> <span>{{isNull(scope.row.invite_full_name)}}</span></template>
            </el-table-column>
            <el-table-column prop="gmt_create" label="创建时间" align="center"show-overflow-tooltip> </el-table-column>
            <el-table-column label="注册流程完成状态" width="160px" header-align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 36px">{{changeStatus(scope.row.state, stateOptions)}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import {agentPotentialList} from '../../api/agent_api';
    import dict from '../../common/js/dict';
    import {formatDate} from '../../common/js/date';

    export default{
        data(){
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                filters:{
                    state: '',       //状态
                    dataRange: ''    //时间范围
                },
                items:[{
                    id:'',
                    gmt_create:'',          //登记时间
                    full_name:'',            //姓名
                    family_name: '',
                    given_name: '',
                    email:'',               //电子邮箱
                    invite_code:'',         //邀请码
                    invite_full_name:'',    //邀请人姓名
                    state:'',               //状态
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                dialogVisible:false,
                fileLists: [{name: '', url: ''}],
                stateOptions: dict.potential_state,
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
                condition.state = this.filters.state;
                condition.start_time = flag ?'':formatDate(this.filters.dataRange[0], "yyyy-MM-dd") + ' 00:00:00';
                condition.end_time= flag ?'':formatDate(this.filters.dataRange[1], "yyyy-MM-dd") + ' 23:59:59';
                let params = {
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                    condition: condition
                };

                agentPotentialList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.listLoading=false
                        this.items = result.items;
                        this.pager.total = result.total;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            getClear(){
                this.filters.state = '';
                this.filters.dataRange = '';
            },
            showDetail(iid){
                this.$router.push({name:'潜在代理详情',params:{id: iid}});

            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },
            isNull(val){
                return (val == "" || val == undefined || val == null) ? "-" : val;
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