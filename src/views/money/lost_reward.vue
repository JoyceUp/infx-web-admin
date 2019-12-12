<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters" :rules="filters_rules">
                <el-form-item prop="date">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.date"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
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
                clearable: false,
                filters: {
                    date: ''
                },
                filters_rules: {
                    date: [{required: true, message: '请选择日期', trigger: 'change'}]
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
                            date: date.dateStart(this.filters.date)
                        };
                        money_api.rebateLostReward(params).then((res) => {
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