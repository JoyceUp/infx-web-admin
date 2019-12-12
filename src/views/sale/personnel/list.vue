<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" ref="filters" :model="filters">
                <el-form-item prop="sales_account_no">
                    <el-input
                            :placeholder="$t('lang.sale_account_no') || '销售账号'"
                            v-model="filters.sales_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            :placeholder="$t('lang.sale_name') || '销售姓名'"
                            v-model="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                    <el-input
                            :placeholder="$t('lang.mobile_number') || '手机号码'"
                            v-model="filters.mobile">
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input
                            :placeholder="$t('lang.email') || '邮箱'"
                            v-model="filters.email">
                    </el-input>
                </el-form-item>
                <el-form-item prop="sales_state">
                    <el-select clearable :placeholder="$t('lang.sale_status') || '状态'" v-model="filters.sales_state">

                        <el-option :label="$t('lang.job_status') || '在职'" value="1"></el-option>
                        <el-option :label="$t('lang.leave_status') || '离职'" value="2"></el-option>
                        <el-option :label="$t('lang.part_time_status') || '兼职'" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item >
                    <el-select clearable :placeholder="$t('lang.company_name') || '公司'" v-if="companyTree !=''||companyTree.length > 0" @change="changeCompany" v-model="positionDic.company">
                        <el-option :key="item.id" :label="item.company_name" :value="item.id" v-for="item in companyTree" > </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" >
                    <el-select clearable :placeholder="$t('lang.department_name') || '部门'" v-if="departmentTree != ''||departmentTree.length>0" @change="changeDepartmenty" v-model="positionDic.department">
                        <el-option :key="item.id" :label="item.department_name" :value="item.id" v-for="item in departmentTree" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=""  >
                    <el-select clearable :placeholder="$t('lang.team_name') || '组别'" v-if="teamTree != ''||teamTree.length>0" v-model="positionDic.team">
                        <el-option :key="item.id" :label="item.team_name" :value="item.id" v-for="item in teamTree" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" >
                    <el-select clearable :placeholder="$t('lang.position') || '职位'" v-model="positionDic.position">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in options.position" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getPersonnelList">{{$t('lang.find') || '查询'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetSearch('filters')">{{$t('lang.reset') || '重置'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="$router.push('personnel/add')">{{$t('lang.add') || '新增'}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">-->
            <!--<el-form :inline="true">-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="resetSearch">删除</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="resetSearch">启/停用</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-col>-->


        <!--数据列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :data="datas"
                style="width: 100%">
            <el-table-column
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="account_no"
                    :label="$t('lang.sale_account_no')+':' || '销售账号'">
                <template slot-scope="scope">
                    <el-button type="text" @click="$router.push('info/'+scope.row.id)">{{scope.row.account_no}}</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    prop="full_name"
                    :label="$t('lang.sale_name')+':' || '销售姓名'">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    :label="$t('lang.mobile_number')+':' || '手机号码'" :formatter="mobileValue">
            </el-table-column>
            <el-table-column
                    prop="email"
                    :label="$t('lang.email')+':' || '邮箱'">
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    :label="$t('lang.account_gmt_create')+':' || '创建时间'">
            </el-table-column>
            <el-table-column
                    prop="gmt_modified"
                    :label="$t('lang.update_date')+':' || '更新时间'">
            </el-table-column>
            <el-table-column
                    prop="sales_state" :formatter="tableStatusFormatter"
                    :label="$t('lang.sale_status')+':' || '状态'">
            </el-table-column>
          <!--  <el-table-column
                    prop="option"
                    label=" 操作"
            >
                <template slot-scope="scope">
                    <el-button

                               type="danger"
                               @click="handleDownLine(scope.$index, scope.row,scope)">删除</el-button>
                </template>
            </el-table-column>-->
        </el-table>


        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.pageSize"
                    :page-sizes="pager.sizes"
                    background
                    :current-page="pager.page_no"
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>
        </el-col>

    </section>

</template>

<script>
    import * as sale_api from '../../../api/sale_api.js';

    import * as checkFields from "../../../common/js/checkFields"
    import dict from '../../../common/js/dict';
    import {outputValue} from "../../../common/js/commons";

    export default {
        props:["params"],
        data() {
            return {
                listLoading:false,
                statistics: {},     //统计
                options: {
                    position:dict.position,
                },
                companyTree:'',
                departmentTree:'',
                teamTree:'',
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    page_no: 1
                },
//                page_no:1,
//                pageSize:10,
//                total: 0,
                datas: [],
                positionDic: {
                    company:'',
                    department:'',
                    team:'',
                    position:''
                },
                //搜索条件
                filters: {
                    sales_account_no: "",
                    full_name: "",
                    mobile: "",
                    email: "",
                    sales_state: ""
                },
                dialog: {
                    title: this.$t('lang.view_reason') || '查看详情',
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth:'80px',

                    hold_record_data: [],
                    hold_record_data_total: 110,

                },
                tree_data:'',
            }
        },
        methods: {
            handleDownLine: function (index, row, scope) {

                this.$confirm(this.$t('lang.warning_1') || '此操作删除该销售, 是否继续?',this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText: this.$t('lang.confirm') || '确定',
                    cancelButtonText: this.$t('lang.abolish') || '取消',
                    type: 'warning'
                }).then(() => {
                    let dic = {
                        id: row.id,
                    };
                    sale_api.removeSalesHR(dic).then(res => {
                        if (res.data.status == 200) {

                            this.$message({
                                type: 'success',
                                message: this.$t('lang.delete_successfully') || '删除成功',
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                        //刷界面
                        this.getPersonnelList();
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('lang.cancel_successfully') || '已取消'
                    });
                });

            },
            handleCurrentChange(val) {

                this.pager.page_no = val;
                this.getPersonnelList();
            },
            handleSizeChange(val){
                this.pager.page_no = 1;
                this.pager.pageSize = val;
                this.getPersonnelList();
            },
            getPersonnelList() {
                //查询列表
                this.listLoading = true;
                let paras = Object.assign(this.positionDic, this.filters);
                paras.page_no = this.pager.page_no;
                paras.pageSize =this.pager.pageSize;
                sale_api.getSalesHRList(paras).then((res) => {
                    this.listLoading = false;
                    if(res.data.status === 200 && res.data.datas) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    }else{
                        if(res.data.status == 401){
                             this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }

                });
            },
            exportExcel() {

            },
            resetSearch(formName){
                this.$refs[formName].resetFields();
//                //清空查询条件，页面恢复显示两日内数据
//                this.filters = {};
                this.positionDic = {
                    company:'',
                    department:'',
                    team:'',
                    company_id:'',
                    department_id:'',
                    team_id:'',
                    position:''
                }
                this.getPersonnelList()
//                this.getPersonnelList();
            },
            tableStatusFormatter(row){
                switch (row.sales_state){
                    case 1:
                        return this.$t('lang.job_status') || '在职';
                    case 2:
                        return this.$t('lang.leave_status') || '离职';
                    case 3:
                        return this.$t('lang.part_time_status') || '兼职';
                    default:
                        return '';
                }
            },
            initTreeData() {     //从 服务器获取数据
                sale_api.getSalesHRList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);

                        if(raw_tree_list){
                            this.tree_data = raw_tree_list;
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },

            getCompanyList(){
                sale_api.getDepartmentList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);
                        if(raw_tree_list){
                            this.companyTree = raw_tree_list.children;
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            changeCompany(val){
                for(var j = 0,  len= this.companyTree.length; j < len; j++) {
                    let company = this.companyTree[j];
                    if(company.id==val){
                        if(company.children){
                            this.departmentTree = company.children;
                            this.positionDic.department = '';
                        }else {
                            this.departmentTree ='';
                        }
                        this.teamTree = '';

                    }

                }

            },
            changeDepartmenty(val){
                for(var j = 0,len= this.departmentTree.length; j < len; j++) {
                    let department = this.departmentTree[j];
                    if(department.id==val){
                        if(department.children){
                            this.teamTree = department.children;
                            this.positionDic.team = '';
                        }else {
                            this.teamTree ='';
                        }
                    }
                }
            },
            mobileValue(row, column) {
                return outputValue(row.country_code , row[column.property]);
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initTreeData();
                this.getPersonnelList();
                this.getCompanyList();
            })
        }

    }
</script>