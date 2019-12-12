<template>
    <section>
        <el-col :span="1" :push="22" style="margin-top: -1%">
            <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
        </el-col>
        <el-col>基本信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓:"><span>{{agentInfo.family_name}}</span></el-form-item>
                <el-form-item label="名:"><span>{{agentInfo.given_name}}</span></el-form-item>
                <el-form-item label="称呼:"><span>{{ changeStatus(agentInfo.gender, genderOptions) }}</span></el-form-item>
                <el-form-item label="出生日期:"><span>{{isBirthDate(agentInfo.date_of_birth)}}</span></el-form-item>
                <el-form-item label="电子邮箱:"><span>{{agentInfo.email}}</span></el-form-item>
                <el-form-item label="手机号码:"><span>{{agentInfo.mobile}}</span></el-form-item>
            </el-form>
        </div>

        <br><br><el-col>身份信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="证件类型:"><span>{{ changeStatus(agentInfo.identity_type, identityTypeOptions) }}</span></el-form-item>
                <el-form-item label="证件号码:"><span>{{agentInfo.identity_no}}</span></el-form-item>
                <el-form-item label="证件正面:">
                    <span><img @click="showPicBig(agentInfo.identity1_path)" v-if="agentInfo.identity1_path" class="avatar" :src="'/common/images/'+agentInfo.identity1_path"></span>
                </el-form-item>
                <el-form-item label="证件反面:">
                    <span><img @click="showPicBig(agentInfo.identity2_path)" v-if="agentInfo.identity2_path" class="avatar" :src="'/common/images/'+agentInfo.identity2_path"></span>
                </el-form-item>
            </el-form>
        </div>
        <br><br>
        <el-col>居住信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="国家:"><span>{{agentInfo.country}}</span></el-form-item>
                <el-form-item label="城市:"><span>{{agentInfo.city}}</span></el-form-item>
                <el-form-item label="居住地址:"><span>{{agentInfo.address}}</span></el-form-item>
                <el-form-item label="邮政编码:"><span>{{agentInfo.zip_code}}</span></el-form-item>
            </el-form>
        </div>
        <br><br>
        <el-col>邀请信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="邀请码:"><span>{{agentInfo.invite_code}}</span></el-form-item>
                <el-form-item label="邀请人姓名:"><span>{{agentInfo.invite_full_name}}</span></el-form-item>
            </el-form>
        </div>
        <br><br>
        <el-col>其他信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="更新时间:"><span>{{agentInfo.gmt_modified}}</span></el-form-item>
                <el-form-item label="注册流程完成状态:" label-width="130px"><span>{{ changeStatus(agentInfo.state, stateOptions) }}</span></el-form-item>
            </el-form>
        </div>

        <el-dialog title="放大图" :visible.sync="imgDialogVisible" width="63%" center>
            <span><img @click="imgDialogVisible = false" v-if="img_big" class="avatar_big" :src="'/common/images/'+ img_big"></span>
        </el-dialog>
    </section>
</template>
<script>
    import {agentPotentialInfo} from '../../api/agent_api';
    import dict from '../../common/js/dict';
    import {isBirthDate, isNull} from '../../common/js/commons';

    export default {
        data () {
            return {
                agentInfo:[{
                    id: '',
                    family_name: '',    //姓
                    given_name: '',     //名
                    gender:'',          //称呼
                    date_of_birth:'',   //出生日期
                    mobile:'',          //手机号码
                    email:'',           //电子邮箱
                    identity_type:'',   //证件类型
                    identity_no:'',     //证件号码
                    identity1_path:'',  //身份证正面
                    identity2_path:'',  //身份证反面
                    country:'',         //国家
                    city:'',            //城市
                    zip_code:'',        //邮政编码
                    address:'',         //居住地址
                    invite_code: '',    //邀请码
                    invite_full_name:'',//邀请人姓名
                    gmt_modified:'',     //更新时间
                    state:''             //注册流程完成状态
                }],
                img_big: '',
                imgDialogVisible: false,
                stateOptions: dict.potential_state,
                identityTypeOptions: dict.identity_type,
                genderOptions: dict.gender
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData();

        },
        methods: {
            fetchData(){
                this.agentInfo.id = this.$route.params.id;
            },
            getAgent(){
                agentPotentialInfo({ 'id': this.agentInfo.id }).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.agentInfo = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            isBirthDate(val){
                return isBirthDate(val);
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                })
                return val;
            },
            showPicBig(val){
               this.imgDialogVisible = true;
               this.img_big = val;
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$router': 'fetchData'
        },
        mounted(){
            this.$nextTick(function(){
                this.getAgent();
            });

        }
    }
</script>
<style lang="scss" scoped>
    .el-col .el-col-24{
        text-align:left;font-weight: bolder;font-size: 14px;margin-left: 30px;
    }
    .div-padd{
        padding: 10px 230px;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 40%;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .avatar_big{
        width: 100%;
        height: auto;
        display: block;
    }
</style>
