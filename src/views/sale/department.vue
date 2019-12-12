<template>
    <section>
        <el-tree

                :data="tree_data"
                accordion
                node-key="id"
                :default-expand-all="false"
                ref="tree"
                :render-content="renderContent">
        </el-tree>

        <div class="el-row"><div class="el-col el-col-24"><div class="add-content bg-purple-dark" @click="showAddResource(null, $event)">{{$t('lang.add_resource') || '添加一级机构'}}</div></div></div>

        <!-- Form -->

        <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" :before-close="resetForm">
            <el-form :model="resource_form" :rules="rules" ref="resource_form_ref">
                <el-form-item :label="$t('lang.resource_form_ref')+':' || '机构名称'" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="resource_form.name" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="机构类型" :label-width="formLabelWidth" style="margin-top: 30px">-->
                <!--<el-select clearable placeholder="机构类型" v-model="resource_form.paperwork_type">-->
                <!--<el-option key="0" label="公司" value="0"></el-option>-->
                <!--<el-option key="1" label="部门" value="1"></el-option>-->
                <!--<el-option key="2" label="组别" value="2"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">{{$t('lang.abolish') || '取消'}}</el-button>
                <el-button type="primary" @click="submit()">{{$t('lang.confirm') || '确定'}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>

    import * as sale_api from '../../api/sale_api';	// node 接口
    import * as checkFields from "../../common/js/checkFields"

    export default {
        data() {
            return {
                type: 1,                    //1 新增，2 修改
                dialogFormVisible: false,   //显示/隐藏表单
                dialogFormTitle: this.$t('lang.add_resource_e') || '添加机构',
                parent_node_data: {},       //添加节点的时候使用
                current_node_data: {},      //修改的时候使用
                default_status_normal: 0,    //正常状态
                default_status_error: 1,     //异常状态
                resource_form: {},            //表单 数据绑定
                rules: {                //表单过滤
                    name: [
                        {validator:checkFields.name, required: true,trigger: 'blur'}
                    ],
                    uri: [
                        {validator:checkFields.uri, required: true,trigger: 'blur'}
                    ],
                    /*permission: [
                        {type: "string", required: true, message: '请选择权限值', trigger: 'blur'}
                    ],*/
                    /*
                    code: [
                        {required: true, type: "number", message: '请填写排序编号', trigger: 'blur'}
                    ]*/
                },
                request_types:[{
                    value: 'GET',
                    label: this.$t('lang.find') || '查询'
                },{
                    value: 'POST',
                    label: this.$t('lang.addition') || '添加'
                },{
                    value: 'PUT',
                    label: this.$t('lang.modification') || '修改'
                },{
                    value: 'DELETE',
                    label: this.$t('lang.delete') || '删除'
                }],
                permissions:[{
                    value: 'add',
                    label: this.$t('lang.addition') || '添加'
                },{
                    value: 'update',
                    label: this.$t('lang.update') || '更新'
                },{
                    value: 'delete',
                    label: this.$t('lang.delete') || '删除'
                },{
                    value: 'get',
                    label: this.$t('lang.search_list') || '查询列表'
                },{
                    value: 'find',
                    label: this.$t('lang.search_list_id') || '查询通过ID'
                },{
                    value: 'password',
                    label: this.$t('lang.change_password') || '修改密码'
                }],
                formLabelWidth: '120px',
                tree_data: [        //树 数据
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },

        methods: {
            removeNode(node, data, event) {        //删除节点

                event.cancelBubble = true;      //阻止事件冒泡
                this.$confirm(this.$t('lang.warning_5') || '此操作将永久删除该节点, 是否继续?', this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText: this.$t('lang.confirm') || '确定',
                    cancelButtonText: this.$t('lang.abolish') || '取消',
                    type: 'warning'
                }).then(() => {
                    if(data.level==1){
                        sale_api.removeCompany({'id': data.id}).then((res) => {
                            if (res.data.status == 200) {
                                const parent = node.parent;
                                const children = parent.data.children || parent.data;
                                const index = children.findIndex(d => d.id === data.id);
                                children.splice(index, 1);

                                this.$message({
                                    type: 'success',
                                    message: this.$t('lang.delete_successfully') || '删除成功'
                                });
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        });
                    }else if(data.level==2){
                        sale_api.removeDepartment({'id': data.id,}).then((res) => {
                            if (res.data.status == 200) {
                                const parent = node.parent;
                                const children = parent.data.children || parent.data;
                                const index = children.findIndex(d => d.id === data.id);
                                children.splice(index, 1);

                                this.$message({
                                    type: 'success',
                                    message: this.$t('lang.delete_successfully') || '删除成功'
                                });
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        });
                    }else  if(data.level ==3){
                        sale_api.removeTeam({'id': data.id,}).then((res) => {
                            if (res.data.status == 200) {
                                const parent = node.parent;
                                const children = parent.data.children || parent.data;
                                const index = children.findIndex(d => d.id === data.id);
                                children.splice(index, 1);

                                this.$message({
                                    type: 'success',
                                    message:this.$t('lang.delete_successfully') || '删除成功'
                                });
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        });
                    }


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('lang.delete_cancel') || '已取消删除'
                    });
                });

            },

            renderContent(h, { node, data, store  } , event) {       //渲染 树

                let jsx = (
                    <span style="flex: 1; display: flex; align-items: center; /*justify-content: space-between;*/ font-size: 14px; padding-right: 8px; " v-show="false" >
                    </span>
            );

                if(data.state == 2){
                    jsx.children.push(
                    <span>
                    <span>{node.data.company_name}</span>
                    <span style="margin-left: 11px;color: #CCCCCC;">{node.data.code}</span>
                    <span style="margin-left: 11px;color: #CCCCCC;">禁用</span>
                        </span>
                )
                }else{
                    if(data.level==1){
                        jsx.children.push(
                        <span>
                        <span>{node.data.company_name}</span>
                        <span style="margin-left: 11px;color: #CCCCCC;">{node.data.code}</span>
                        </span>
                    )
                    }else if (data.level==2){
                        jsx.children.push(
                        <span>
                        <span>{node.data.department_name}</span>
                        <span style="margin-left: 11px;color: #CCCCCC;">{node.data.code}</span>
                        </span>
                    )
                    }else {
                        jsx.children.push(
                        <span>
                        <span>{node.data.team_name}</span>
                        <span style="margin-left: 11px;color: #CCCCCC;">{node.data.code}</span>
                        </span>
                    )
                    }

                }

                if(node.data.level == 1){
                    jsx.children.push(
                    <span class="btn">
                        <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.showAddResource(data, event) }>{this.$t('lang.add_subordinate') || '添加下级'}</el-button>
                    <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.showEditResource(data, event) }>{this.$t('lang.compile') || '编辑'}</el-button>
                    <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.removeNode(node, data, event) }>{this.$t('lang.delete') || '删除'}</el-button>
                    </span>
                )
                }else if(node.data.level == 2){
                    jsx.children.push(
                    <span class="btn">
                        <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.showAddResource(data, event) }>{this.$t('lang.add_subordinate') || '添加下级'}</el-button>
                    <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.showEditResource(data, event) }>{this.$t('lang.compile') || '编辑'}</el-button>
                    <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.removeNode(node, data, event) }>{this.$t('lang.delete') || '删除'}</el-button>
                    </span>
                )
                }else if(node.data.level == 3){
                    jsx.children.push(
                    <span class="btn">
                        <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.showEditResource(data, event) }>{this.$t('lang.compile') || '编辑'}</el-button>
                    <el-button style="font-size: 12px;" type="text" on-click={ (event) => this.removeNode(node, data, event) }>{this.$t('lang.delete') || '删除'}</el-button>
                    </span>
                )
                }

                return (jsx)
            },
            showAddResource(data, event) {          //添加新的节点，显示 表单并加载数据
                this.dialogFormTitle = this.$t('lang.add_resource_e') || '添加机构';
                if (data == null) {
                    this.resource_form.level = 0;
                    data = Object.assign({}, this.resource_form);
                }else{
                    event.cancelBubble = true;      //阻止事件冒泡
                }
                this.dialogFormVisible = true;
                this.type = 1;
                this.parent_node_data = data;

                switch (data.level + 1) {
                    case 1:
                        if (!this.tree_data || this.tree_data.length == 0) {
                            this.resource_form.company_no = 10010;
                        } else {
                            this.resource_form.company_no = 10000 + (this.tree_data.length + 1) * 10;
                        }

                        this.resource_form.level = 1;
                        this.resource_form.parent_id = "0";
                        break;
                    case 2:
                        if (!data.children || data.children.length == 0) {
                            this.resource_form.department_no = 30010;
                        } else {
                            this.resource_form.department_no = 30000 + (data.children.length + 1) * 10;
                        }
                        this.resource_form.level = data.level + 1;
                        this.resource_form.company_id = data.id;
                        break;
                    case 3:
                        if (!data.children || data.children.length == 0) {
                            this.resource_form.team_no = 50010;
                        } else {
                            this.resource_form.team_no = 50000 + (data.children.length + 1) * 10;
                        }
                        this.resource_form.level = data.level + 1;
                        this.resource_form.company_id = data.company_id;
                        this.resource_form.department_id = data.id;
                        break;
                    default:
                        break;
                }
            },
            showEditResource(data, event) {     //修改节点，显示表单并加载数据
                event.cancelBubble = true;      //阻止事件冒泡
                this.dialogFormVisible = true;
                this.dialogFormTitle = this.$t('lang.compile_institution') || '添加机构';
                this.type = 2;
                this.current_node_data = data;
                this.resource_form = Object.assign({}, data);
                if(data.level==1){
                    this.resource_form.name = data.company_name
                }else if(data.level == 2){
                    this.resource_form.name = data.department_name
                }else  if(data.level == 3){
                    this.resource_form.name = data.team_name
                }

            },
            submit() {           //修改/添加
                let that = this;
                if (that.type == 1) {             //新增
                    that.$refs["resource_form_ref"].validate((valid) => {
                        if (valid) {
                            that.resource_form.level = that.parent_node_data.level + 1;
                            if(that.resource_form.level==1){
                                sale_api.addCompany(that.resource_form).then(res => {
                                    if (res.data.status == 200) {

                                        const newChild = Object.assign({}, that.resource_form);
                                        newChild.id = JSON.parse(res.data.datas).id;
                                        newChild.level = that.parent_node_data.level + 1;
                                        newChild.children = [];
                                        newChild.company_name = newChild.name;
                                        that.tree_data.push(newChild);
                                        that.resetForm();
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });
                            }else if(that.resource_form.level==2){
                                sale_api.addDepartment(that.resource_form).then(res => {
                                    if (res.data.status == 200) {

                                        const newChild = Object.assign({}, that.resource_form);
                                        newChild.id = JSON.parse(res.data.datas).id;
                                        newChild.level = that.parent_node_data.level + 1;
                                        newChild.children = [];
                                        newChild.department_name = newChild.name;

                                        if (!that.parent_node_data.children) {
                                            that.$set(that.parent_node_data, 'children', []);
                                        }

                                        that.parent_node_data.children.push(newChild);

                                        that.resetForm();
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });
                            }else if(that.resource_form.level==3){
                                sale_api.addTeam(that.resource_form).then(res => {
                                    if (res.data.status == 200) {

                                        const newChild = Object.assign({}, that.resource_form);
                                        newChild.id = JSON.parse(res.data.datas).id;
                                        newChild.level = that.parent_node_data.level + 1;
                                        newChild.children = [];

                                        newChild.team_name = newChild.name;

                                        if (!that.parent_node_data.children) {
                                            that.$set(that.parent_node_data, 'children', []);
                                        }

                                        that.parent_node_data.children.push(newChild);

                                        that.resetForm();
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });
                            }
                        } else {
                            return false;
                        }
                    });
                } else if (that.type == 2) {       //修改
                    that.$refs["resource_form_ref"].validate((valid) => {
                        if (valid) {
                            if (that.resource_form.level==1){
                                that.resource_form.company_name = that.resource_form.name;
                                sale_api.editCompany(that.resource_form).then((res) => {
                                    if (res.data.status == 200) {
                                        that.current_node_data.company_name = that.resource_form.company_name;
                                        that.current_node_data.paperwork_type = that.resource_form.paperwork_type;
                                        that.current_node_data.company_no = that.resource_form.company_no;
                                        that.current_node_data.state = that.resource_form.state;
                                        that.resetForm();
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });

                            }else if(that.resource_form.level==2){
                                that.resource_form.department_name = that.resource_form.name;
                                sale_api.editDepartment(that.resource_form).then((res) => {
                                    if (res.data.status == 200) {
                                        that.current_node_data.department_name = that.resource_form.name;
                                        that.current_node_data.state = that.resource_form.state;
                                        that.current_node_data.department_no= that.resource_form.team_no;
                                        that.resetForm();
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });

                            }else if(that.resource_form.level==3){
                                that.resource_form.team_name = that.resource_form.name;
                                sale_api.editTeam(that.resource_form).then((res) => {
                                    if (res.data.status == 200) {
                                        that.current_node_data.team_name = that.resource_form.team_name;
                                        that.current_node_data.state = that.resource_form.state;
                                        that.current_node_data.team_no = that.resource_form.team_no;
                                        that.resetForm();
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });

                            }
                        } else {
                            return false;
                        }
                    });

                    that.initTreeData();
                }
            },
            resetForm() {       //重置 表单
                this.dialogFormVisible = false;
                this.resource_form = {};
                this.$refs["resource_form_ref"].resetFields();
            },

            initTreeData() {     //从 服务器获取数据
                sale_api.getDepartmentList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);
                        if(raw_tree_list){
                            this.tree_data = raw_tree_list.children;
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initTreeData();
            })

        }
    };
</script>

<style>
    .el-tree-node__content {height:40px;position:relative;}
    .el-tree-node__content .btn{display:none;position:absolute;left:450px;top:0px;}
    .el-tree-node__content:hover .btn{display:block}


    .el-col{border-radius:4px}
    .bg-purple-dark{background:#f6f6f6}
    .bg-purple-dark:hover{background:#eee}
    .add-content{margin-top:20px;color:#666;text-align:center;line-height:36px;cursor:pointer;border-radius:4px;min-height:36px}
</style>