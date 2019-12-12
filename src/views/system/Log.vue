<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item label="">
                    <el-select clearable :placeholder="$t('lang.tips_select_behavior') || '选择行为'"  v-model="filters.checkType" @change="getLogs()">
                        <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in options" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div class="block">
                        <el-date-picker
                                v-model="filters.dataRange" type="daterange" :start-placeholder="$t('lang.start_times') || '提交日期'" :end-placeholder="$t('lang.end_times') || '结束日期'"
                                :placeholder="$t('lang.input_select_date') || '选择时间范围'" @change="getLogs()"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
        </el-col>

        <!--<el-table :data="listMe(tableData,filters.dataSear)" stripe highlight-current-row >-->
        <el-table :data="logs" stripe highlight-current-row >
            <el-table-column prop="user_name" :label="$t('lang.admin_name') || '用户名'" width="180px"> </el-table-column>
            <el-table-column prop="login_ip" :label="$t('lang.login_ip') || '登录地址'"  width="150px"> </el-table-column>
            <el-table-column :label="$t('lang.handle_type') || '操作类型'"   width="150px">
                <template slot-scope="scope">
                    <span>{{ changeType(scope.row.type) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" :label="$t('lang.handle_content') || '操作内容'"  > </el-table-column>
            <!--<el-table-column prop="mark" label="备注" > </el-table-column>-->
            <el-table-column :label="$t('lang.handle_time') || '时间'"  width="160px">
                <template slot-scope="scope">
                    <span>{{ fmtDate(scope.row.create_time) }}</span>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="page_size" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import {getSystemLogList} from  '../../api/auth_api';
    import {formatDate} from '../../common/js/date';
    import dict from '../../common/js/dict';

    export default {
        data() {
            return {
                page_no: 1,
                total: 0,
                page_size:10,
                filters:{
                    checkType:'',   //选择行为
                    dataRange:''    //时间范围
                },
                logs:[{
                    create_time:'',     //时间
                    login_ip:'',        //登录ip
                    type:'',            //操作类型
                    operation:'',       //操作内容
                    user_name:'',       //用户名
                    mark:''              //备注
                }],
                options: dict.log_type
            }
        },
        methods:{
            getLogs() {

                let condition = {};
                let flag = false;
                if(this.filters.dataRange == '' || this.filters.dataRange == null){
                    flag = true;
                }
                condition.type = this.filters.checkType;
                condition.start_time = flag ?'':this.filters.dataRange[0] + ' 00:00:00';
                condition.end_time= flag ?'':this.filters.dataRange[1] + ' 23:59:59';

                let paras = {
                    page_no: this.page_no,
                    condition: condition
                };

                getSystemLogList(paras).then((res) => {
                    if(res.data.status == 200){
                        let datas = JSON.parse(res.data.datas);
                        this.logs = datas.items;
                        this.total = datas.total;
                        this.page_size = datas.page_size;
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }

                });
            },
            changeType(row){
                let val = '';
                this.options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                })
                return val;
            },
            fmtDate(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm:ss");
            },
            handleCurrentChange(val){
              this.page_no = val;
              this.getLogs();
            }
        },
        mounted(){
            this.$nextTick(()=>this.getLogs())
        }
    }
</script>

