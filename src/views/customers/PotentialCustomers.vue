<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" ref="filters" size="small">

                <el-form-item prop="dataRange">
                    <el-date-picker
                            v-model="filters.dataRange"
                            type="daterange"
                            :range-separator="$t('lang.full_name') || '至'"
                            :start-placeholder="$t('lang.full_name') || '创建时间'"
                            :end-placeholder="$t('lang.full_name') || '创建时间'" >
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item prop="state">
                    <el-select clearable placeholder="注册流程完成状态" v-model="filters.state" @change="getItems()">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in stateOptions" ></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="getItems()">查询</el-button>
                    <el-button @click="resetForm('filters')">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!-- table -->
        <el-table :data="items" style="width: 100%" stripe>
            <el-table-column fixed prop="create_date" label="客户姓名" align="center">
                <template slot-scope="scope">
                    <!-- 数组长度不为 0 时的判断，同样，要根据自己需求决定判断条件 -->
                    <el-button  type="text" @click="showDetail(scope.$index, scope.row)">
                        {{scope.row.given_name}}&nbsp;{{scope.row.family_name}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
            <el-table-column prop="invite_code" label="邀请码" align="center"></el-table-column>
            <el-table-column prop="parent_full_name" label="邀请人姓名" align="center"></el-table-column>
            <el-table-column prop="gmt_create" label="创建时间" align="center"></el-table-column>
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
    </section>
</template>
<script>
    import {potentialsList} from '../../api/customers_api.js';
    import {formatDate} from '../../common/js/date';
    // import dict from '../../common/js/dict';

    export default{
        data(){
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                filters:{
                    state:'',       //状态
                    dataRange:''    //时间范围
                },
                items:[{
                    id:'',
                    family_name:'', //姓
                    given_name:'',  //名
                    gmt_create:'',  //登记时间
                    email:'',       //电子邮箱
                    invite_code:'', //邀请码
                    invite_full_name:'',//邀请人姓名
                    state: '',       //状态
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                stateOptions:[{'key': '未完成', 'value': '10'},{'key': '已完成', 'value': '11'}],
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
            handlePagerChange() { this.getItems();},
            getItems(){
                this.listLoading=true;
                let condition = {};
                let flag = false;
                if(this.filters.dataRange == '' || this.filters.dataRange == null){
                    flag = true;
                }
                condition.state = "10";
                // condition.state = this.filters.state;
                condition.start_time = flag ?'': formatDate(this.filters.dataRange[0], "yyyy-MM-dd") + ' 00:00:00';
                condition.end_time = flag ?'': formatDate(this.filters.dataRange[1], "yyyy-MM-dd") + ' 23:59:59';

                let params = {
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize,
                    order_column: this.order_column,
                    order_by: this.order_by,
                    condition: condition
                };

                potentialsList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        if(result != null){
                            this.listLoading=false;
                            this.items = result.items;
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
            showDetail(index,row){
                this.$router.push({name:'潜在用户详情',params:{id:row.id}});
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
<style>

</style>