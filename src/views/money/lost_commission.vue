<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters" :rules="filters_rules">
                <el-form-item prop="start_end_date">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.start_end_date"  start-placeholder="提交时间"
                                end-placeholder="提交时间"
                                placeholder="选择时间范围" @change="handleCreateDateChange"
                                type="datetimerange"
                                :default-time="defaultTime"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"  @click="calculate">重新计算</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </section>
</template>
<script>
    import * as money_api from '../../api/money_api.js';

    import * as date from "../../common/js/date"

    export default {
        props:["params"],
        data() {
            return {
                defaultTime: ["00:00:00", "23:59:59"],
                clearable: false,
                filters: {
                    order_time_from: '',
                    order_time_to: '',
                    start_end_date: ''
                },
                filters_rules: {
                    start_end_date: [{required: true, message: '请选择日期', trigger: 'change'}]
                }
            }
        },
        methods: {
            //提交时间发生改变
            handleCreateDateChange(val) {
                this.filters.order_time_from = val[0];
                this.filters.order_time_to = val[1];
            },
            calculate() {
                this.$refs["filters"].validate((valid) => {
                    if (valid) {
                        let params = {
                            start_time: this.filters.order_time_from,
                            end_time: this.filters.order_time_to
                        };
                        money_api.rebateLostCommission(params).then((res) => {
                            if(res.data.status == 200) {
                                this.$message.success("提交成功");
                            }else{
                                if(res.data.status == 401){
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
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
        }

    }
</script>