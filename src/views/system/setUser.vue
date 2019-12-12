<template>
    <section>
        <el-form :label-position="labelPosition" :rules="formRules" label-width="80px" ref="userInfo"
                 :model="userInfo">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="userInfo.user_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="userInfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="nickname">
                <el-button  @click="dialogFormVisible = true">修改密码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userInfo')">保存</el-button>
            </el-form-item>
        </el-form>

        <!-- Form -->

        <el-dialog title="修改密码" width="340px" :visible.sync="dialogFormVisible" @open="open">
            <el-form :rules="formRules" label-width="80px" ref="userPassword"
                     :model="userPassword">
                <el-form-item label="旧密码" prop="old_password">
                    <el-input type="password" v-model="userPassword.old_password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_password">
                    <el-input type="password" v-model="userPassword.new_password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="con_password">
                    <el-input type="password" v-model="userPassword.con_password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPassword('userPassword')">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>


<script>
    import * as auth_api from '../../api/auth_api';
    import util from '../../common/js/util'

    export default {
        data() {
            var validNickname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入昵称'));
                } else {
                    callback();
                }
            };
            var validOPassword = (rule, value, callback) => {

                // 旧密码值为空时，提示输入旧密码
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    callback();
                }
            };
            var validPassword = (rule, value, callback) => {

                // 新密码值为空时，提示输入新密码
                if (value === '') {
                    callback(new Error('请输入新密码'));
                }
                // 新密码与旧密码相同时，新密码不得与旧密码相同
                else if (value === this.userPassword.old_password) {
                    callback(new Error('新密码不得与旧密码相同!'));
                } else {
                    callback();
                }
            };
            var validCPassword = (rule, value, callback) => {

                // 确认密码值为空时，提示输入确认密码
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                }
                // 新密码与确认密码不一致时，提示两次输入密码不一致
                else if (value !== this.userPassword.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'right',
                dialogFormVisible: false,
                formRules: {
                    nickname: [{validator: validNickname, trigger: 'blur'}],
                    new_password: [{validator: validPassword, trigger: 'blur'}],
                    old_password: [{validator: validOPassword, trigger: 'blur'}],
                    con_password: [{validator: validCPassword, trigger: 'blur'}]
                },
                userPassword: {
                    id: "",
                    new_password: "",
                    old_password: "",
                    con_password: "",
                },
                userInfo: {
                    id: "",
                    user_name: "",
                    nickname: ""
                }
            };
        },
        // 修改个人信息
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            auth_api.editCurrentUser(this.userInfo).then(res => {
                                if (res.data.status == 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '提交成功!'
                                    });
                                    let user_info = JSON.parse(sessionStorage.getItem("user"))
                                    user_info.nickname = this.userInfo.nickname
                                    this.$store.dispatch("save_user_info", user_info)
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.msg
                                    });
                                }
                            });

                        }).catch(() => {
                        });


                    } else {
                        return false;
                    }
                });
            },
            // 修改密码
            resetPassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            auth_api.editCurrentPassword(this.userPassword).then(res => {
                                if (res.data.status == 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '密码修改成功，请重新登录!'
                                    });
                                    this.logout();
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.msg
                                    });
                                }
                            });

                        }).catch(() => {
                        });


                    } else {
                        return false;
                    }
                });
            },
            // 初始化数据
            initData() {
                //let user = this.$store.getters.getUserInfo;

                let user = JSON.parse(sessionStorage.getItem("user"))
                Object.assign(this.userInfo, user);
                this.userPassword.id = user.id;
            },
            //退出登录
            logout: function () {
                var _this = this;

                sessionStorage.removeItem('user');
                util.cookieMethod.delCookie('token');
                _this.$router.push('/login');
            },
            open(){
                this.$nextTick(function () {
                    this.$refs["userPassword"].resetFields();
                })
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initData();  //初始化页面数据
            })

        }
    }
</script>

<style lang="scss" scoped>
    section {
        margin: 50px;
        width: 300px;
    }
</style>
