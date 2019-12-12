<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <div>
            <el-row>
                <el-col :span="24">
                    <el-button @click="removeSale" type="danger" class="fr" v-if="user_id != ''">{{$t('lang.delete') || '删除'}}</el-button>
                    <el-button @click="comfire" type="warning" class="fr" v-if="user_id != ''">{{$t('lang.reset_pas') || '重置密码'}}</el-button>

                </el-col>
            </el-row>

            <el-form :model="userForm" :inline="true" :rules="userFormRules" ref="userFormRef"   label-position="left" label-width="95px" >
                <el-col>    <h4>{{$t('lang.basic_info') || '基本信息'}}</h4>

                </el-col>
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">


                        <!--<el-form-item label="姓" prop="family_name" style="margin-top: 10px">
                            <el-input placeholder="请输入姓" v-model="userForm.family_name" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="名字" prop="given_name" style="margin-top: 10px">
                            <el-input placeholder="请输入名" v-model="userForm.given_name" auto-complete="off"></el-input>
                        </el-form-item>-->
                    <el-form-item :label="$t('lang.name')+':' || '姓名'" prop="full_name" style="margin-top: 10px">
                        <el-input :placeholder="$t('lang.s_name') || '请输入姓名'" v-model="userForm.full_name" auto-complete="off"></el-input>
                    </el-form-item>


                    <el-form-item :label="$t('lang.gender')+':' || '性别'" prop="gender" style="margin-top: 10px">
                        <el-select clearable :placeholder="$t('lang.sale_name') || '请选择'" v-model="userForm.gender">
                            <el-option key="1" :label="$t('lang.woman') || '女'" :value="2"></el-option>
                            <el-option key="2" :label="$t('lang.man') || '男'" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('lang.mobile_number')+':' || '手机号码'" prop="mobile" style="margin-top: 10px">
                        <el-input :placeholder="$t('lang.s_mobile_number') || '请输入手机号'" v-model="userForm.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('lang.e_email')+':' || '电子邮箱'" prop="email" style="margin-top: 10px">
                        <el-input :placeholder="$t('lang.s_e_email') || '请输入电子邮箱'" v-model="userForm.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('lang.identity_type')+':' || '证件类型'" prop="identity_type" style="margin-top: 10px">
                        <el-select clearable :placeholder="$t('lang.identity_type') || '证件类型'" v-model="userForm.identity_type">
                            <el-option key="1" :label="$t('lang.id_card') || '身份证'" :value="1"></el-option>
                            <!--<el-option key="2" label="驾照" :value="2"></el-option>-->
                            <el-option key="3" :label="$t('lang.passport') || '护照'" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('lang.identity_no')+':' || '证件号码'" prop="identity_no" style="margin-top: 10px">
                        <el-input :placeholder="$t('lang.s_identity_number') || '请输入证件号'" v-model="userForm.identity_no" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('lang.birthday')+':' || '出生日期'" prop="date_of_birth" style="margin-top: 10px">
                        <el-date-picker
                                v-model="userForm.date_of_birth"
                                type="date"
                                :placeholder="$t('lang.option_date') || '选择日期'"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('lang.sales_state')+':' || '销售状态'" prop="sales_state" style="margin-top: 10px">
                        <el-select clearable :placeholder="$t('lang.sales_state') || '销售状态'" v-model="userForm.sales_state">
                            <el-option key="1" :label="$t('lang.job_status') || '在职'" :value="1"></el-option>
                            <el-option key="2" :label="$t('lang.leave_status') || '离职'" :value="2"></el-option>
                            <el-option key="3" :label="$t('lang.part_time_status') || '兼职'" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="密码" prop="password" v-if="user_id == 'add'" style="margin-top: 10px">-->
                        <!--<el-input placeholder="请输入密码" v-model="userForm.password" auto-complete="off"></el-input>-->
                    <!--</el-form-item>-->
                </el-col>
            </el-form>
                <el-col v-if="userForm.sales_state!=3" :span="24" class="" style="padding-bottom: 0px;">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="6" style="font-size: 14px;font-weight: bold;">{{$t('lang.position_info') || '职位信息'}}</el-col>
                        <el-col :span="2" >
                          <!--  <el-button type="primary" @click="addPositionDom" >增加职位</el-button>-->
                        </el-col>
                    </el-row>
                    <el-col v-for="(position, index) in userForm.sales_organization" :key="index" :span="24" class="toolbar" style="padding-bottom: 0px;" :inline="true">
                        <el-form :inline="true" class="demo-form-inline">
                        <el-form-item :label="$t('lang.company_name')+':' || '* 公司'">
                            <el-select clearable :placeholder="$t('lang.name_of_company') || '公司名称'"  @change="changeCompany(position.company,index)" v-model="position.company">
                                <el-option :key="item.id" :label="item.company_name" :value="item.id" v-for="item in tree[index].companyTree" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('lang.department_name')+':' || '* 部门'">
                            <el-select clearable :placeholder="$t('lang.department_name_m') || '部门名称'"  @change="changeDepartmenty(position.department,index)" v-model="position.department">
                                <el-option :key="item.id" :label="item.department_name" :value="item.id" v-for="item in tree[index].departmentTree" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('lang.team_name')+':' || '组别'" >
                            <el-select clearable :placeholder="$t('lang.team_name_m') || '组名称'"  v-model="position.team">
                                <el-option :key="item.id" :label="item.team_name" :value="item.id" v-for="item in tree[index].teamTree" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('lang.position')+':' || '* 职位'">
                            <el-select clearable :placeholder="$t('lang.position_m') || '职位名称'" v-model="position.name">
                                <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in options.position" ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click.prevent="removePositionDom(position)" v-if="index != 0">{{$t('lang.delete') || '删除'}}</el-button>
                        </el-form-item>
                        </el-form>
                    </el-col>
                </el-col>
        <el-col class="dialog-footer">
      <!--      <div slot="footer" class=" el-col">-->
                <el-button @click="cancle">{{$t('lang.abolish') || '取消'}}</el-button>

                <el-button type="primary" @click="submitForm()">{{$t('lang.confirm') || '确定'}}</el-button>
       <!--     </div>-->
        </el-col>


            <!--<el-dialog title="修改密码" :visible.sync="dialogFormVisible"  v-if="user_id != 'add'">-->
                <!--<el-form :model="passWprd_form" :rules="rules" ref="resource_form_ref">-->

                    <!--<el-form-item label="新密码" prop="newPassWord"  :label-width="formLabelWidth">-->
                        <!--<el-input v-model="passWprd_form.newPassWord" type="password" auto-complete="off"></el-input>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item label="确认密码" prop="repeatPassWord" :label-width="formLabelWidth" style="margin-top: 25px">-->
                        <!--<el-input v-model="passWprd_form.repeatPassWord" type="password" auto-complete="off"></el-input>-->
                    <!--</el-form-item>-->

                <!--</el-form>-->
                <!--<div slot="footer" class="dialog-footer" >-->
                    <!--<el-button @click="restForm('resource_form_ref')">取 消</el-button>-->
                    <!--<el-button type="primary" @click="comfire('resource_form_ref')">确 定</el-button>-->
                <!--</div>-->
            <!--</el-dialog>-->

        </div>
    </section>


</template>

<script>
    import * as sale_api from '../../../api/sale_api.js';
    import * as checkFields from "../../../common/js/checkFields"
    import dict from '../../../common/js/dict';
    import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";
    import ElCol from "element-ui/packages/col/src/col";

    export default {
        components: {
            ElCol,
            ElForm
        },
        props:["params"],
        data() {
            var newPass = (rule, value, callback) => {
                let passwordReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//正则：密码 //长度 6 -20，必须字母与数字组合
                if(rule.required){
                    if(!value){
                        callback(new Error(this.$t('lang.reconfirm_new_password') || '请填写新密码'));
                    }

                    if(!passwordReg.test(value)){
                        callback(new Error(this.$t('lang.require_password') || '密码要求长度6-20位的字母与数字组合'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            };
            var repeat = (rule, value, callback) => {
                if(rule.required){
                    if(!value){
                        callback(new Error(this.$t('lang.confirm_password') || '请确认密码'));
                    }

                    if(this.passWprd_form.newPassWord !== value){
                        callback(new Error(this.$t('lang.different_password') || '两次输入的密码不一致'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            };
            var  identity_no= (rule, value, callback) => {
                if (rule.required) {

                    if (!value) {
                        callback(new Error(this.$t('lang.write_number_id') || '请填写证件号码'));
                    }
                    if (value.length > 30) {
                        callback(new Error(this.$t('lang.long_number_id') || '证件号码过长'));
                    } else {
                        callback();
                    }
                }
            }
            var  phone = (rule, value, callback) => {
                if (rule.required) {

                    if (!value) {
                        callback(new Error(this.$t('lang.write_phone') || '请输入电话号码'));
                    }
                    if (value.length > 20) {
                        callback(new Error(this.$t('lang.write_phone_long') || '电话号码过长'));
                    } else {
                        callback();
                    }
                }
            }
            return {

                user_id: "",
                options: {
                    position:'',
                },
                type: 1,    //1添加 2修改
                dialogFormVisible:false,
                passWprd_form:{
                    newPassWord:'',
                    repeatPassWord:'',
                },

                tree:[{
                    companyTree:'',
                    departmentTree:'',
                    teamTree:'',
                }],

                formLabelWidth:'100px',
                userForm: {
                    full_name:'',
                    gender:'',
                    mobile:'',
                    email:'',
                    identity_type:'',
                    identity_no:'',
                    date_of_birth:'',
                    sales_state:'',
                    sales_organization: [
                        {
                            company:'',
                            department:'',
                            team:'',
                            name:''
                        }
                    ]
                },
                userFormRules:{
                    // family_name: [
                    //     { required: true,message:"请输入姓!", trigger: 'blur'}
                    // ],
                    full_name:[
                        { required: true,message:this.$t('lang.s_name') || '请输入姓名',trigger: 'blur'}
                    ],
                    gender: [
                        { required: true,message:this.$t('lang.s_gender') || '请选择性别',trigger: 'change'}
                    ],
                    mobile:[
                        {validator:phone, required: true,trigger: 'blur'}
                    ],
                    email: [
                        {validator:checkFields.email, required: true,trigger: 'blur'}
                    ],
                    identity_type:[
                        { required: true,message:this.$t('lang.s_identity_type') || '请选择证件类型',trigger: 'change' }
                    ],
                    date_of_birth:[
                        { required: true,message:this.$t('lang.s_birthday') || '请选择出生日期',trigger: 'change'}
                    ],
                    identity_no:[
                        {validator:identity_no, required: true,trigger: 'blur'}
                    ],
                    sales_state:[
                         { required: true,message:this.$t('lang.s_sale_state') || '请选择销售状态',trigger: 'change'}
                    ],
//                    password:[
//                        { required: true,message:"请设置销售密码!",trigger: 'blur'}
//                    ]
                },
//                rules: {                //表单过滤
//                    repeatPassWord: [
//                        {validator:repeat, required: true,trigger: 'blur'}
//                    ],
//                    newPassWord:[
//                        {validator:newPass, required: true,trigger: 'blur'}
//                    ],
//                },

            }
        },
        methods: {
            //获取基本信息
            getPersonnelInfo(user_id) {
                sale_api.getSalesHRInfo({"id": user_id}).then((res) => {

                    if(res.data.status == 200){
                        this.userForm = JSON.parse(res.data.datas);
                        for(let i=0;i<this.userForm.sales_organization.length-1; i++){
                            this.tree.push({
                                companyTree:this.tree[0].companyTree,
                                departmentTree:'',
                                teamTree:'',
                            })
                        }

                    }else{
                        this.$message.error(res.data.msg);
                    }
                });
            },
            //提交表单
            submitForm() {
                this.$refs["userFormRef"].validate((valid) => {
                    if (valid) {
                        this.addOrUpdate();
                    } else {

                        return false;
                    }
                });
            },
            //新增或更新销售
            addOrUpdate: function () {
                let positionList = this.userForm.sales_organization;

                for (let  index in  positionList){

                    if (positionList[index].company!=null&&positionList[index].company.length==32) {
                        positionList[index].company_id = positionList[index].company;
                    }
                    if (positionList[index].department!=null&&positionList[index].department.length==32) {
                        positionList[index].department_id = positionList[index].department;
                    }
                    if (positionList[index].team!=null&&positionList[index].team.length==32) {
                        positionList[index].team_id = positionList[index].team;
                    }
                    if (positionList[index].name!=null&&positionList[index].name.length<2) {
                        positionList[index].position = positionList[index].name;
                    }
                    if(this.userForm.sales_state!=3){
                        if(!positionList[index].company_id){
                            this.$message.error(this.$t('lang.s_choice_rank') || '请选择第' +(index*1+1)+ this.$t('lang.s_company_name') || '组职位信息的公司名称');
                            return;
                        }else  if(!positionList[index].department_id){
                            this.$message.error(this.$t('lang.s_choice_rank') || '请选择第' +(index*1+1)+ this.$t('lang.s_department_name') || '组职位信息的部门名称');

                            return;
                        }else  if(!positionList[index].position){
                            this.$message.error(this.$t('lang.s_choice_rank') || '请选择第' +(index*1+1)+ this.$t('lang.s_group_name') || '组职位信息的职位名称');

                            return;
                        }
                    }


                }
                this.userForm.sales_organization = positionList;
                //生日日期格式补齐
                this.userForm.date_of_birth += " 00:00:00";
                if(this.type == 1){
                    sale_api.addSalesHR(this.userForm).then((res) => {
                        if (res.data.status === 200) {
                            this.$message( this.$t('lang.add_successfully') || '修改成功' );
                            this.$router.push('/personnel');
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    });
                }else{
                    sale_api.updateSalesHR(this.userForm).then((res) => {
                        if (res.data.status === 200) {
                            this.$message( this.$t('lang.modify_successfully') || '修改成功' );
                            this.$router.push('/personnel');
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    });
                }
            },
            //增加职位
            addPositionDom(){
                this.userForm.sales_organization.push({
                    company:'',
                    department:'',
                    team:'',
                    name:''
                });

                this.tree.push({
                        companyTree:this.tree[0].companyTree,
                        departmentTree:'',
                        teamTree:'',
                    })

            },
            removePositionDom(item){
                if(this.userForm.sales_organization.length > 1){
                    var index = this.userForm.sales_organization.indexOf(item);
                    if (index !== -1) {
                        this.userForm.sales_organization.splice(index, 1);
                    }
                }
            },
            //返回上级
            cancle(){
               this.$router.push('/personnel');
            },
            restForm(formName){
                this.passWprd_form.newPassWord = '';
                this.passWprd_form.repeatPassWord='';
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            },
//            //更新密码
//            updatePassWord(){
//                this.dialogFormVisible = true;
//            },
            //修改密码
            comfire(formName){
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                this.$confirm(this.$t('lang.warning_2') || '此操作将重置该销售密码, 是否继续?', this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:this.$t('lang.confirm') || '确定',
                    cancelButtonText:  this.$t('lang.abolish') || '取消',
                    type: 'warning'
                }).then(() => {
                    sale_api.updatePasswordSalesHR({"id":this.$route.params.id}).then((res) =>{
                        if (res.data.status === 200) {
                            this.$message(this.$t('lang.modify_successfully') || '修改成功!');
//                            this.passWprd_form.newPassWord = '';
//                            this.passWprd_form.repeatPassWord='';
//                            this.$refs[formName].resetFields();
//                            this.dialogFormVisible = false;
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('lang.cancel_successfully') || '已取消!'
                    });
                });

//                    }
//                });

            },
            removeSale(){

                this.$confirm(this.$t('lang.warning_1') || '此操作删除该销售, 是否继续?',  this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText: this.$t('lang.confirm') || '确定',
                    cancelButtonText: this.$t('lang.abolish') || '取消',
                    type: 'warning'
                }).then(() => {
                        let dic = {
                            id: this.user_id,
                        };
                        sale_api.removeSalesHR(dic).then(res => {
                            if (res.data.status == 200) {

                                this.$message({
                                    type: 'success',
                                    message: this.$t('lang.delete_successfully') || '删除成功!',
                                });
                                this.$router.push("/list")
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                });
                            }
                            //刷界面

                        });})
            },
            //获取公司树
            initTreeData(){     //从 服务器获取数据
                sale_api.getDepartmentList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);

                        if(raw_tree_list){
                            this.tree[0].tree_data = raw_tree_list;
                            this.tree[0].companyTree = raw_tree_list.children;

                            if(this.$route.params.id){
                                this.user_id = this.$route.params.id;
                                this.type = 2;
                                this.getPersonnelInfo(this.user_id);
                            }
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeCompany(val,index){
                for(var j = 0,  len= this.tree[index].companyTree.length; j < len; j++) {
                    let company = this.tree[index].companyTree[j];
                    if(company.id == val){

                        if(company.children){
                            this.tree[index].departmentTree = company.children

                        }else {

                            this.tree[index].departmentTree =""
                        }
                        //this.teamTree = '';

                    }

                }

            },
            changeDepartmenty(val,index){
                for(var j = 0,len= this.tree[index].departmentTree.length; j < len; j++) {
                    let department = this.tree[index].departmentTree[j];

                    if(department.id==val){
                        if(department.children){
                            this.tree[index].teamTree = department.children;
                        }else {
                            this.tree[index].teamTree = ""
                        }
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.options.position = dict.position;
                this.initTreeData();

            })
        }

    }
</script>

<style>
    .dialog-footer{padding-top:50px;text-align: center}
    .demo-form-inline {
        width: auto;
    }
    .demo-form-inline .el-input {
        width: 150px;
    }
    .fr{float:right}
</style>