<template>
	<section>
		<!--工具条-->

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="showAddUser()">{{ $t('lang.btn_add_role') || "添加角色" }}</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table :data="tableData" v-loading="listLoading" stripe highlight-current-row >
			<el-table-column width="20px" > </el-table-column>
			<el-table-column prop="role"  :label="$t('lang.role_name') || '角色名称'"   width="300px" > </el-table-column>
			<el-table-column prop="desc" :label="$t('lang.role_info') || '角色描述'" width="300px"> </el-table-column>
			<el-table-column prop="resources" :formatter="ownResourceFormatter" :label="$t('lang.role_permission') || '拥有资源'"  > </el-table-column>
			<el-table-column :label="$t('lang.handle') || '操作'">
				<template slot-scope="scope">
					<el-button

							@click="showEditUser(scope.$index, scope.row)">{{ $t('lang.compile') || '编辑'}}</el-button>
					<el-button

							type="danger"
							@click="deleteUser(scope.$index, scope.row)">{{ $t('lang.delete') || '删除'}}</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagination.page_size"
						   :total="pagination.total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- Form -->
		<el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" :before-close="resetForm">
			<el-form :model="role_form" :rules="rules" ref="role_form_ref">
				<el-form-item :label="$t('lang.role_name') || '角色名称'"  prop="role" :label-width="formLabelWidth">
					<el-input v-model="role_form.role" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item :label="$t('lang.role_info') || '角色描述'" prop="desc" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="role_form.desc"></el-input>
				</el-form-item>
				<el-form-item :label="$t('lang.role_permission') || '拥有资源'" prop="permission" :label-width="formLabelWidth">
					<el-tree
							:data="tree_data"
							:props="defaultProps"
							:default-expand-all="false"
							:render-after-expand="false"
							:default-expanded-keys="tree_option.default_expanded_keys"
							node-key="id"
							show-checkbox
							ref="tree"
							:check-strictly="tree_option.check_strictly"
							:expand-on-click-node="true"
							:render-content="renderContent"
							@check-change="checkChange">
					</el-tree>
				</el-form-item>
				<el-form-item :label="$t('lang.state') || '状态'" :label-width="formLabelWidth">
					<el-switch
							v-model="role_form.status"
							:active-value=default_status_normal
							:inactive-value=default_status_error>
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm">{{ $t('lang.abolish') || '取  消'  }}</el-button>
				<el-button type="primary" @click="submit()">{{ $t('lang.confirm') || '确 定'  }}</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>

    import * as auth_api from '../../api/auth_api';	// node 接口
	const resources_name_map = new Object();		//resources 资源 [id-名称] 对应结构
    import * as checkFields from "../../common/js/checkFields"

    export default {
        data() {
            return {
                tree_option:{
                    default_expanded_keys:[],			//默认展开的节点的 key 的数组
                    check_strictly: false,				//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
				},
                type: 1,                    //1 新增，2 修改
                dialogFormVisible: false,   //显示/隐藏表单
				dialogFormTitle: this.$t('lang.btn_add_role') || '添加角色',
                current_row_data: {},      //修改的时候使用
                listLoading: false,			//分页加载时候的loading控制
                default_status_normal:0,    //正常状态
                default_status_error:1,     //异常状态
                role_form: {            //表单 数据绑定
                    id: '',
                    role: '',
                    desc: '',
					resources: [],
                    status: 0,				//0：正常, 1：异常

                },
                rules: {                //表单过滤
                    role: [
                        {validator:checkFields.name, required: true,trigger: 'blur'}

                    ],
					desc:[
                        {type: "string", required: false,  trigger: 'blur'},
                        {min: 0, max: 50, message:  this.$t('lang.tips_text_length_max') || "长度在 50个字符以内!", trigger: 'blur'}
					]
                },
                formLabelWidth: '120px',
                tableData: [],
                pagination: {
                    total: 0,
                    page: 1,
                    page_size:10
				},
                tree_data: [],		//树 数据
                defaultProps: {		//tree 自定义 属性名称
                    label: 'name',
                    disabled: 'status'
                }
            }
        },

        methods: {
            showAddUser(){          //添加新的节点，显示 表单并加载数据
                this.dialogFormVisible = true;
                this.dialogFormTitle =  this.$t('lang.btn_add_role') || "添加角色";
                this.type = 1;
            },
            showEditUser(index, data){     //修改节点，显示表单并加载数据
                this.dialogFormVisible = true;
                this.dialogFormTitle = this.$t('lang.btn_edit_role') || "编辑角色";
                this.type = 2;
                this.current_row_data = data;	//双向绑定
                this.role_form =  Object.assign({}, data);		//设置表单值
				if(data.resources && data.resources.length > 0){
                    this.$nextTick(() => {
                        if(this.$refs.tree){
						//	this.tree_option.default_expanded_keys = [];	//默认展开选中的选项
                         //   this.tree_option.default_expanded_keys = data.resources;	//默认展开选中的选项
                            this.$nextTick(() => {
								for(let i in data.resources){
									this.$refs.tree.setChecked(data.resources[i], true, false);	//选中当前节点
								}
                            })
                        }
                    });

                }
            },
            deleteUser(index, data){     //删除用户
				let that = this;
                this.$confirm( this.$t('lang.warning_5') || "此操作将永久删除该节点, 是否继续?", this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:  this.$t('lang.confirm') || "确定",
                    cancelButtonText: this.$t('lang.abolish') || "取消",
                    type: 'warning'
                }).then(() => {
                    auth_api.removeRole({'id': data.id,'role':data.role}).then((res) => {
                        let result = res.data

                        if (result.status == 200) {
                            that.tableData.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message:  this.$t('lang.delete_successfully') || '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'info',
                                message: result.msg
                            });
						}
                    });

                }).catch(() => {

                });
            },
			renderContent(h, { node, data, store }) {       //渲染 树
                return (
                    <span>
						<span>
							<span>{node.data.name} </span>
							<span style="margin-left: 11px;color: #CCCCCC;">{node.data.code}</span>
						</span>
					</span>);
            },
            submit() {           //修改/添加
                let that = this;

                if (that.type == 1) {             //新增
                    that.$refs["role_form_ref"].validate((valid) => {
                        if (valid) {
                            that.role_form.resources = this.$refs.tree.getCheckedKeys();
                            auth_api.addRole(that.role_form).then((res) => {
                                let result = res.data;
                                if (result.status == 200) {

                                    that.role_form.id = result.datas;
                                    // splice(索引位置, 要删除元素的数量, 元素)

                                    that.tableData.splice(0, 0, Object.assign({}, that.role_form));
                                    this.getRoles();
                                    that.resetForm();

                                    this.$message({
                                        type: 'success',
                                        message:this.$t('lang.btn_add_role_succeed') || '添加成功!'
                                    });
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            });
                        } else {
                            return false;
                        }
                    });
                } else if (that.type == 2) {       //修改
                    that.$refs["role_form_ref"].validate((valid) => {
                        if (valid) {
                            that.role_form.resources = this.$refs.tree.getCheckedKeys();

                            auth_api.editRole(that.role_form).then((res) => {
                                let result = res.data
                                if (result.status == 200) {

                                    this.$message({
                                        type: 'success',
                                        message:this.$t('lang.btn_upload_role_succeed') || '更新成功!'
                                    });

                                    that.current_row_data.role = that.role_form.role;
                                    that.current_row_data.desc = that.role_form.desc;
                                    that.current_row_data.resources = this.$refs.tree.getCheckedKeys();
                                    that.current_row_data.status = that.role_form.status;
                                    that.resetForm();
                                }else{
                                    this.$message.error(res.data.status+" "+res.data.msg);
                                }
                            });
                        } else {
                            return false;
                        }
                    });
                }
            },
            resetForm() {       //重置 表单
                this.dialogFormVisible = false;		//隐藏表单
				this.role_form = {            //表单 数据绑定
                    id: '',
                    role: '',
                    desc: '',
                    status: 0
                }
                this.$refs.tree.setCheckedKeys([]);
                this.$refs["role_form_ref"].resetFields();
            },
            initResourceTreeData(){     //从 服务器获取数据
                auth_api.getResourcesList().then((res) => {
                    if (res.data.status == 200) {
                        let tree_list = JSON.parse(res.data.datas);
                        this.tree_data = tree_list;
                        //创建id-name 映射结构
                        for (let i = 0; i < this.tree_data.length; i++) {
                            let a = this.tree_data[i];
                          /*  if(a.children){
                                if (a.children.length > 0) {
                                    for (let j = 0; j < a.children.length; j++) {
                                        let b = a.children[j];
                                      /!*  if(b.children){
                                            if (b.children.length > 0) {
                                                for (let h = 0; h < b.children.length; h++) {
                                                    let c = b.children[h];
                                                    resources_name_map[c.id] = c.name;
                                                }
                                            }
                                        }*!/
                                        resources_name_map[b.id] = b.name;
                                    }
                                }
                            }*/
                            resources_name_map[a.id] = a.name;
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            getRoles(){     //从 服务器获取数据
                let para = {
                    page_no: this.pagination.page,
					page_size: this.pagination.page_size
                };
                this.listLoading = true;
                auth_api.getRoleList(para).then((res) => {

					let result = JSON.parse(res.data.datas);

                    this.pagination.total = result.total;

                    if(result.items){
                        this.tableData = result.items;
                    }
                    this.listLoading = false;
                });
            },
			handleCurrentChange(val) {
                this.pagination.page = val;
                this.getRoles();
            },
            ownResourceFormatter(row, column) {
                let name = "";

                if(row.resources){
                    for (let i = 0; i < row.resources.length; i++) {
						if(resources_name_map[row.resources[i]]){
                            name += " ["+resources_name_map[row.resources[i]] + "] ";
						}

                    }
                }
                return name;
            }
			,
            checkChange(data, checked, childrenChecked){
                //如果子节点有选中状态，则选中当前节点
                if(!checked && childrenChecked){
                    this.$refs.tree.setChecked(data.id, true, false);	//选中当前节点
                }else if(checked && !childrenChecked){
                    this.$refs.tree.setChecked(data.id, true, false);	//选中当前节点
					if(data.lev == 1){
					}else if(data.lev == 2){
                        this.$refs.tree.setChecked(data.parent_id, true, false);	//选中当前节点
					}else{
                        this.$refs.tree.setChecked(data.parent_id, true, false);	//选中当前节点
					}
				}
			},
			getTreeChildrenId(childrenArray){
				for(let index in childrenArray){
                    this.$refs.tree.setChecked(childrenArray[index].id, true, false);
					if(childrenArray[index].children && childrenArray[index].children.length > 0){
                        this.getTreeChildrenId(childrenArray[index].children);
					}
				}
			},
            dialogOnOpen(){

                let that = this;
                this.$nextTick(function () {

                })
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initResourceTreeData();
                this.getRoles();
            })

        }
    };
</script>