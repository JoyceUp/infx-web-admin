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
				<el-form-item label="参数名" prop="key">
					<el-input v-model="sysForm.key" :disabled="keyDisable"></el-input>
				</el-form-item>
				<el-form-item label="值" prop="value">
					<el-input v-model="sysForm.value"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-switch v-model="sysForm.status"
							   :active-value="0"
							   :inactive-value="1"></el-switch>
				</el-form-item>
				<el-form-item label="备注" prop="mark">
					<el-input type="textarea" v-model="sysForm.mark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('sysForm')">取 消</el-button>
				<el-button type="primary" @click="sysParamSubmit">确 定</el-button>
			</div>
		</el-dialog>

		<!--列表-->
		<el-table :data="sysParamData" stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="key" label="参数名" width="120"></el-table-column>
			<el-table-column prop="value" label="值" width="120"></el-table-column>
			<el-table-column label="状态" width="120">
				<template slot-scope="scope">
					<span v-if="scope.row.status === 0" style="color: green;">{{ formatState(scope.row.status) }}</span>
					<span v-else-if="scope.row.status === 1" style="color: #ccc">{{ formatState(scope.row.status) }}</span>
					<span v-else>{{ formatState(scope.row.status) }}</span>
				</template>
			</el-table-column>
			<!--<el-table-column prop="create_time" label="生效时间" width="180"></el-table-column>-->
			<el-table-column prop="mark" label="备注"></el-table-column>
			<el-table-column label="操作" width="150">

				<template slot-scope="scope">
					<el-button size="small" @click="showSysParamPop('edit',scope.row)">编辑</el-button>
					<!--<el-button type="danger" size="small" @click="shwoDelSysParam(scope.row)">删除</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination
					background
					layout="prev, pager, next" :page-size="page_size"
					:total="total" @current-change="handleCurrentChange"
					style="float:right;">
			</el-pagination>
		</el-col>

	</div>
</template>


<script>
  import util from '../../common/js/util'
  import * as api from '../../api/auth_api'
  import * as checkFields from "../../common/js/checkFields"
  export default {
    data() {
      return {
          keyDisable:false,
        listLoading: false,
        page_no: 1,
        page_size: 10,
        total: 0,
        sysParamData: [],
        sysFormTitle: '',
        sysFormVisible: false,
        selectOptions: [
          {value: 0,label: '字符型'}
        ],
        sysForm: {
          id: '',
          key: '',
          value: '',
          status: 0,
          mark: ''
        },
        rules: {
          key: [{validator: checkFields.key, required: true, trigger: 'blur' }],
          value: [{validator: checkFields.value, required: true, trigger: 'blur' }],
          mark: [{pattern: /^.{0,255}$/, message: '请输入内容不大于255个字符', trigger: 'blur' }]
        }
      }
    },
    methods: {
      //状态显示转换
      formatState (row) {
        return row == 0 ? '启用' : row == 1 ? '禁用' : '未知';
      },
      handleCurrentChange(val) {
        this.page_no = val;
        this.getSysParam();
      },
      //获取系统参数列表
      getSysParam () {
        let para = {
          page_no: this.page_no
        };
        this.listLoading = true;
        api.getSysParamList(para).then((res) => {
          if(res.data.status == 200){
            let datas = JSON.parse(res.data.datas);

            this.total = datas.total;
            this.sysParamData = datas.items;
            this.listLoading = false;
          }else{
              if(res.data.status == 401){
                  this.$router.push('/login');
              }
            this.$message(res.data.msg);
          }
        });
      },
      //删除系统参数
      shwoDelSysParam (index) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = {
            id: index.id,
            key: index.key
          };
          api.removeSysParam(para).then(res => {
            if(res.data.status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getSysParam();
            }else{
              this.$message(res.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新增、编辑提交
      sysParamSubmit () {

      },
      //新增系统参数
      addSysParam () {
        this.$refs['sysForm'].validate((valid) => {
          if (valid) {
            let para = {
              key: this.sysForm.key,
              value: this.sysForm.value,
              status: this.sysForm.status,
              mark: this.sysForm.mark
            };
            api.addSysParam(para).then(res => {
              if(res.data.status == 200){
                  this.$message({
                      type: 'success',
                      message: '添加成功!'
                  });
                this.getSysParam();
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
      //编辑系统参数
      editSysParam () {
        this.$refs['sysForm'].validate((valid) => {
          if (valid) {
            let para = {
              id: this.sysForm.id,
              key: this.sysForm.key,
              value: this.sysForm.value,
              status: this.sysForm.status,
              mark: this.sysForm.mark
            };
            api.editSysParam(para).then(res => {
              if(res.data.status == 200){
                  this.$message({
                      type: 'success',
                      message: '修改成功!'
                  });
                this.getSysParam();
//                location.reload();
                  this.sysForm = {
                      key: '',
                      value: '',
                      data_type: '',
                      status: 0,
                      mark: ''
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
        if(val[0] == 'add'){
            this.keyDisable = false
          this.sysFormTitle = '添加参数';
          this.sysForm = {
            key: '',
            value: '',
            data_type: '',
            status: 0,
            mark: ''
          };
          this.sysParamSubmit = this.addSysParam;
        }else{
            this.keyDisable = true
          this.sysFormTitle = '修改参数';
          this.sysForm = {
            id: val[1].id,
            key: val[1].key,
            value: val[1].value,
            status: val[1].status,
            mark: val[1].mark
          };
          this.sysParamSubmit = this.editSysParam;
        }
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