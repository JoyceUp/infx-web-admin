<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true"
                     :rules="filterRules" :model="filters" ref="filters" size="medium">
                <el-form-item prop="date">
                    <div class="block">
                        <el-date-picker
                                v-model="filters.date" start-placeholder="出入金时间"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
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
                clearable: false,
                filters: {
                    date: ''
                },
                filterRules: {
                    date: [
                        {required: true, message: '请选择出入金时间'},
                    ]
                }
            }
        },
        methods: {
            exportExcel() {

                this.$refs['filters'].validate((valid) => {
                    if (valid) {
                        let condition = {
                            date: this.filters.date,
                            export: "1"
                        };
                        let params = {
                            condition: condition
                        };
                        report_api.depositTeamExport(params).then((res) => {
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