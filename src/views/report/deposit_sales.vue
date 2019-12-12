<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters"
                     :rules="filterRules" size="medium">
                <el-form-item prop="update_time">
                    <el-date-picker
                            v-model="filters.update_time"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :default-time="defaultTime"
                            range-separator="至"
                            start-placeholder="入金完成时间"
                            end-placeholder="入金完成时间" @change="handleUpdateDateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="exportExcel">报表导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>


    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as report_api from '../../api/report_api.js';
    import * as date from "../../common/js/date"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {centToDollar} from "../../common/js/commons"

    export default {
        props: ["params"],
        data() {
            return {
                defaultTime: ["00:00:00", "23:59:59"],
                clearable: false,
                filters: {
                    update_time_from: '',
                    update_time_to: '',
                    update_time: ''
                },
                filterRules: {
                    update_time: [
                        {required: true, message: '请选择出入金时间'},
                    ]
                }
            }
        },
        methods: {
            //更新时间发生改变
            handleUpdateDateChange(val) {
                if(val) {
                    this.filters.update_time_from = val[0];
                    this.filters.update_time_to = val[1];
                }
                else {
                    this.filters.update_time_from = '';
                    this.filters.update_time_to ='';
                }
            },
            exportExcel() {

                this.$refs['filters'].validate((valid) => {
                    if (valid) {
                        let condition = {
                            date_begin: this.filters.update_time_from,
                            date_end: this.filters.update_time_to,
                            export: "1"
                        };


                        let params = {
                            condition: condition
                        };
                        report_api.depositSalesExport(params).then((res) => {
                            if (res.status == 200) {
                                fileDownload(res, this);
                            } else {
                                if (res.data.status == 401) {
                                    // this.$router.push('/login');
                                }
                                console.log("res",res);
                                console.log("res.data",res.data);
                                console.log("res.data.status",res.data.status);
                                console.log("res.data.msg",res.data.msg);
                                this.$message.error(res.data.status + " " + res.data.msg);
                            }
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: e.message
                            });
                        });

                    }
                });
            },
        },
        mounted() {
            this.$nextTick(function () {
            })
        }

    }
</script>