﻿<template>
	<div>
		<!--工具条-->
		<!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form>
				<el-form-item>
					<el-button type="primary" @click="showSysParamPop('add')">添加系统参数</el-button>
				</el-form-item>
			</el-form>
		</el-col>-->
		<el-dialog :title="sysFormTitle" :visible.sync="sysFormVisible">
			<el-form :model="sysForm" :rules="rules" ref="sysForm" label-width="100px" class="demo-ruleForm">
				<el-form-item :label="$t('lang.system_name') || '参数名'"  prop="system_key">
					<el-input v-model="sysForm.system_key" :disabled="keyDisable"></el-input>
				</el-form-item>
				<el-form-item :label="$t('lang.system_value') || '参数值'" prop="system_value">
					<el-input v-model="sysForm.system_value"></el-input>
				</el-form-item>
				<!--<el-form-item label="状态">-->
				<!--<el-switch v-model="sysForm.status"-->
				<!--:active-value="0"-->
				<!--:inactive-value="1"></el-switch>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="备注" prop="mark">-->
				<!--<el-input type="textarea" v-model="sysForm.mark"></el-input>-->
				<!--</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('sysForm')">{{ $t('lang.abolish') || '取  消'  }}</el-button>
				<el-button type="primary" @click="sysParamSubmit">{{ $t('lang.confirm') || '确 定'  }}</el-button>
			</div>
		</el-dialog>

		<!--列表-->
		<el-table :data="sysParamData" stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="system_key" :label="$t('lang.system_name') || '参数名'" ></el-table-column>
			<el-table-column prop="system_value":label="$t('lang.system_value') || '参数值'" ></el-table-column>
			<!--<el-table-column label="状态" width="120">-->
			<!--<template slot-scope="scope">-->
			<!--<span v-if="scope.row.status === 0" style="color: green;">{{ formatState(scope.row.status) }}</span>-->
			<!--<span v-else-if="scope.row.status === 1" style="color: #ccc">{{ formatState(scope.row.status) }}</span>-->
			<!--<span v-else>{{ formatState(scope.row.status) }}</span>-->
			<!--</template>-->
			<!--</el-table-column>-->
			<!--<el-table-column prop="create_time" label="生效时间" width="180"></el-table-column>-->
			<el-table-column prop="cn_name" :label="$t('lang.btn_remark') || '备注'" ></el-table-column>
			<el-table-column  :label="$t('lang.handle') || '操作'" >

				<template slot-scope="scope">
					<el-button size="small" @click="showSysParamPop('edit',scope.row)">{{ $t('lang.compile') || '编辑' }}</el-button>
					<!--<el-button type="danger" size="small" @click="shwoDelSysParam(scope.row)">删除</el-button>-->
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>


<script>
    import util from '../../common/js/util'
    import * as api from '../../api/auth_api'
    import * as checkFields from "../../common/js/checkFields"
    export default {
        data() {
            let keyReg=/^^[0-9]{1,20}$/;
            let keyReg2=/^^[1-9][0-9]{8}$/;
            let emailReg=/^[A-z0-9]+([._\\-]*[A-z0-9])*@([A-z0-9]+[-A-z0-9]*[A-z0-9]+.){1,63}[A-z0-9]+$/;
            var validateValue = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("this.$t('lang.tips_system_value') || '请填写参数值'"));
                }
                if ((this.sysForm.system_key === 'deposit_exchange_rate' || this.sysForm.system_key === 'withdraw_exchange_rate') && !keyReg2.test(value)){
                    callback(new Error("this.$t('lang.tips_deposit_exchange_rate') || '汇率要求是9位'"));
                }else if(this.sysForm.system_key === 'large_amount_deposit_email' && !emailReg.test(value)){
                    callback(new Error("this.$t('lang.tips_deposit_exchange_rate') || '请输入正确的邮箱'"));
                }else if(this.sysForm.system_key !== 'large_amount_deposit_email' && !keyReg.test(value)){
                    callback(new Error("this.$t('lang.tips_deposit_exchange_rate') || '要求长度1-20位的数字'"));
                }else{
                    callback();
                }
            };
            return {
                keyDisable:false,
                listLoading: false,
                sysParamData: [],
                sysFormTitle: '',
                sysFormVisible: false,
                selectOptions: [
                    {value: 0,label: "this.$t('lang.tips_deposit_exchange_rate') || '字符型'"}
                ],
                sysForm: {
                    // id: '',
                    system_key: '',
                    system_value: '',
                    // status: 0,
                    // mark: ''
                },
                rules: {
                    system_key: [{validator: checkFields.key, required: true, trigger: 'blur' }],
                    system_value: [{validator: validateValue, required: true, trigger: 'blur' }],
                    // mark: [{pattern: /^.{0,255}$/, message: '请输入内容不大于255个字符', trigger: 'blur' }]
                }
            }
        },
        methods: {
            //状态显示转换
            formatState (row) {
                return row == 0 ? this.$t('lang.start') || '启用' : row == 1 ? this.$t('lang.forbidden') || '禁用' : this.$t('lang.unknown') || '未知';
            },
            //获取系统参数列表
            getSysParam () {
                this.listLoading = true;
                api.getSysParamList().then((res) => {
                    if(res.data.status == 200){
                        let datas = JSON.parse(res.data.datas);

                        this.sysParamData = datas;
                        this.listLoading = false;
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            // //删除系统参数
            // shwoDelSysParam (index) {
            //     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         let para = {
            //             id: index.id,
            //             key: index.key
            //         };
            //         api.removeSysParam(para).then(res => {
            //             if(res.data.status == 200){
            //                 this.$message({
            //                     type: 'success',
            //                     message: '删除成功!'
            //                 });
            //                 this.getSysParam();
            //             }else{
            //                 this.$message(res.data.msg);
            //             }
            //         })
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         });
            //     });
            // },
            //新增、编辑提交
            sysParamSubmit () {

            },
            // //新增系统参数
            // addSysParam () {
            //     this.$refs['sysForm'].validate((valid) => {
            //         if (valid) {
            //             let para = {
            //                 key: this.sysForm.key,
            //                 value: this.sysForm.value,
            //                 status: this.sysForm.status,
            //                 mark: this.sysForm.mark
            //             };
            //             api.addSysParam(para).then(res => {
            //                 if(res.data.status == 200){
            //                     this.$message({
            //                         type: 'success',
            //                         message: '添加成功!'
            //                     });
            //                     this.getSysParam();
            //                     this.$refs['sysForm'].resetFields();
            //                 }else{
            //                     this.$message(res.data.msg);
            //                 }
            //                 this.sysFormVisible = false;
            //             })
            //         } else {
            //
            //             return false
            //         }
            //     })
            // },
            //编辑系统参数
            editSysParam () {
                this.$refs['sysForm'].validate((valid) => {
                    if (valid) {
                        let para = {
                            // id: this.sysForm.id,
                            system_key: this.sysForm.system_key,
                            system_value: this.sysForm.system_value,
                            // status: this.sysForm.status,
                            // mark: this.sysForm.mark
                        };
                        api.editSysParam(para).then(res => {
                            if(res.data.status == 200){
                                this.$message({
                                    type: 'success',
                                    message: this.$t('lang.modify_successfully') || '修改成功!'
                                });
                                this.getSysParam();
//                location.reload();
                                this.sysForm = {
                                    system_key: '',
                                    system_value: '',
                                    // data_type: '',
                                    // status: 0,
                                    // mark: ''
                                };
                                this.$refs['sysForm'].resetFields();
                            }else{
                                this.$message(res.data.msg);
                            }
                            this.sysFormVisible = false;
                        })
                    } else {

                        return false
                    }
                })
            },
            //显示弹窗
            showSysParamPop (...val) {
                this.keyDisable = true
                this.sysFormTitle = this.$t('lang.edit_system') || '修改参数';
                this.sysForm = {
                    // id: val[1].id,
                    system_key: val[1].system_key,
                    system_value: val[1].system_value,
                    // status: val[1].status,
                    // mark: val[1].mark
                };
                this.sysParamSubmit = this.editSysParam;
                this.sysFormVisible = true;
            },
            resetForm (form) {
                this.$refs[form].resetFields();
                this.sysFormVisible = false;
            }
        },
        mounted() {
            this.$nextTick(function(){
                this.getSysParam();
            })
        }
    }
</script>
<style>
	.el-select{width:100%;}
	.el-dialog--small{width:40%;}
</style>