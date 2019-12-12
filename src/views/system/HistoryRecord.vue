<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="system_key">
                    <el-select clearable :placeholder="$t('lang.parameter_type') || '参数类型'" v-model="filters.system_key">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in options" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="opt_id">
                    <el-input :placeholder="$t('lang.mobile') || '手机号'" v-model.trim="filters.opt_id"></el-input>
                </el-form-item>
                <el-form-item prop="opt_user_name">
                    <el-input :placeholder="$t('lang.name') || '姓名'" v-model.trim="filters.opt_user_name"></el-input>
                </el-form-item>
                <el-form-item prop="dataRange">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.dataRange" type="daterange" :start-placeholder="$t('lang.submit_date') || '提交日期'" :end-placeholder="$t('lang.end_times') || '结束日期'"
                                :placeholder="$t('lang.input_select_date') || '选择时间范围'" @change="handleDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchList">{{ $t('lang.find') || '查询' }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetSearch('filters')">{{ $t('lang.reset') || '重置' }}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--<el-table :data="listMe(tableData,filters.dataSear)" stripe highlight-current-row >-->
        <el-table :data="items" stripe highlight-current-row >
            <el-table-column type="index" :label="$t('lang.numeration') || '编号'" width="180px"> </el-table-column>
            <el-table-column prop="opt_id" :label="$t('lang.mobile') || '手机号'"> </el-table-column>
            <el-table-column prop="opt_user_name" :label="$t('lang.name') || '姓名'"> </el-table-column>
            <el-table-column prop="gmt_create" :label="$t('lang.input_submit_date') || '提交时间'" >
                <template slot-scope="scope">
                    <span>{{ fmtDate(scope.row.gmt_create) }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column prop="mark" label="备注" > </el-table-column>-->
            <el-table-column prop="system_key" :label="$t('lang.parameter_type') || '参数类型'" :formatter="getSystemKey"> </el-table-column>
            <el-table-column prop="system_value" :label="$t('lang.system_value') || '参数值'" > </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                        :page-sizes="pager.sizes" background :current-page="pager.page_no" layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import {getHistoryRecordList} from  '../../api/auth_api';
    import * as dat from '../../common/js/date';
    import dict from '../../common/js/dict';

    export default {
        data() {
            return {
                listLoading: false,
                clearable: false,
                filters:{
                    system_key: '',   //选择行为
                    dataRange: '',    //时间范围
                    opt_id: '',  //手机号
                    opt_user_name: '',  //姓名
                    start_time: '',
                    end_time: ''
                },
                /* 分页设置 */
                pager:{
                  page_no: 1,
                  page_size: 10,
                  total: 0,
                  sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                },
                items: [],
                options: dict.history_record
            }
        },
        methods:{
            handleCurrentChange(val){
                this.pager.page_no = val;
                this.getItems();
            },
            handleSizeChange(val){
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.getItems();
            },
            getItems() {
                this.listLoading = true;
                let condition = {};
                condition.system_key = this.filters.system_key;
                condition.opt_id = this.filters.opt_id;
                condition.opt_user_name = this.filters.opt_user_name;
                condition.start_time = this.filters.start_time;
                condition.end_time= this.filters.end_time;

                let paras = {
                    page_no: this.pager.page_no,
                    page_size: this.pager.page_size,
                    condition: condition
                };

                getHistoryRecordList(paras).then((res) => {
                    if(res.data.status == 200){
                        let datas = JSON.parse(res.data.datas);
                        this.items = datas.items;
                        this.pager.total = datas.total;
                        this.listLoading = false;
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }

                });
            },
            handleDateChange(val){
                this.filters.start_time = dat.dateStart(val[0]);
                this.filters.end_time = dat.dateEnd(val[1]);
            },
            changeType(row){
                let val = '';
                this.options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },
            fmtDate(time) {
                let date = new Date(time);
                return dat.formatDate(date, "yyyy-MM-dd hh:mm:ss");
            },
            searchList(){
                this.pager.page_no = 1;
                console.log(this.filters);
                this.getItems();
            },
            resetSearch(formName){
                this.$refs[formName].resetFields();
                this.pager.page_no = 1;
                this.filters.start_time = '';
                this.filters.end_time = '';
                this.getItems();
            },
            getSystemKey(row,column){
                return this.changeType(row[column.property]);
            }
        },
        mounted(){
            this.$nextTick(()=>this.getItems())
        }
    }
</script>

