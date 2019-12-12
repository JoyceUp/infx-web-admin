<template>
    <div class="login_bg">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">{{$t("lang.title")}} <i>v0.5.3</i></h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">{{$t("lang.forget")}}</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{$t("lang.login")}}
                </el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {requestLogin} from '../api/api';
    import * as auth_api from '../api/auth_api';
    import dict from '../common/js/dict';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();

                        var loginParams = {user_name: this.ruleForm2.account, password: this.ruleForm2.checkPass};

                        requestLogin(loginParams).then(data => {
                            this.logining = false;
                            //NProgress.done();


                            let {msg, status, datas} = data;
                            if (status !== 200) {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                            } else {
                                let token = JSON.parse(datas).token;

                                this.$store.dispatch("set_token", {token}).then(() => {

                                    return this.$store.dispatch("setting_Sync", {token})
                                }).then((res) => {
                                    if (res.data.status == 200) {
                                        this.$router.push({path: '/'});
                                    } else {
                                        this.$message(res.data.msg);
                                    }
                                })

                                /*  var user = this.$store.getters.getUserInfo;
                                  console.log("user",user)
                                  params.user_id = user.id
                                  params.user_name = user.user.user_name
                                  params.nickname = user.user.nickname

                                  let params = {
                                      "operation":dict.operation.login.label,
                                      "type":dict.operation.login.type

                                  }

                                  auth_api.setLogOperation(params).then(res =>{
                                      console.log(res)
                                  })
                              */

                            }
                        });
                    } else {

                        return false;
                    }
                });
            }
        },
        created: function () {
            var _this = this;
            window.onkeydown = function (e) {

                if (e.keyCode == 13) {
                    _this.handleSubmit2()
                }

            }
        }
    }

</script>

<style>
    body {
        background: #333
    }
</style>
<style lang="scss" scoped>
    body{
        position: relative;
    }
    .title i {
        font-size: 10px;
        color: #ccc;
        font-style: normal
    }
    .login_bg{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background:url("/assets/images/login_bg.jpg") center;
        background-size:cover;
    }
    .login-container {

        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 8px;
        border-radius: 8px;
        -moz-border-radius: 8px;
        background-clip: padding-box;
        width: 260px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        position: absolute;
        top: 50%;
        margin: -180px 0 0 -165px;
        left: 50%;
        z-index: 5;
        // box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>