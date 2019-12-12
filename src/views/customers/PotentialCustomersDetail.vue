<template>
    <section>
        <el-col :span="1" :push="22" style="margin-top: -1%">
            <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
        </el-col>
        <el-col>基本信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓:"><span>{{custItem.family_name}}</span></el-form-item>
                <el-form-item label="名:"><span>{{custItem.given_name}}</span></el-form-item>
                <el-form-item label="称呼:"><span>{{ changeStatus(custItem.gender, genderOptions) }}</span></el-form-item>
                <el-form-item label="出生日期:"><span>{{isBirthDate(custItem.date_of_birth)}}</span></el-form-item>
                <el-form-item label="电子邮箱:"><span>{{custItem.email}}</span></el-form-item>
                <el-form-item label="手机号码:"><span>{{custItem.mobile}}</span></el-form-item>
            </el-form>
        </div>

        <br><br><el-col>身份信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="证件类型:"><span>{{ changeStatus(custItem.identity_type, identityTypeOptions) }}</span></el-form-item>
                <el-form-item label="证件号码:"><span>{{custItem.identity_no}}</span></el-form-item>
            </el-form>
        </div>

        <br><br> <el-col>居住信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="国家:"><span>{{custItem.country}}</span></el-form-item>
                <el-form-item label="城市:"><span>{{custItem.city}}</span></el-form-item>
                <el-form-item label="居住地址:"><span>{{custItem.address}}</span></el-form-item>
                <el-form-item label="邮政编码:"><span>{{custItem.zip_code}}</span></el-form-item>
            </el-form>
        </div>
        <br><br>
        <el-col>邀请信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="邀请码:"><span>{{custItem.invite_code}}</span></el-form-item>
                <el-form-item label="邀请人姓名:"><span>{{custItem.parent_full_name}}</span></el-form-item>
            </el-form>
        </div>
        <br><br>
        <el-col>其他信息</el-col><br><br>
        <div class="div-padd">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="更新时间:"><span>{{custItem.gmt_modified}}</span></el-form-item>
                <!--TODO 二期 <el-form-item label="分配状态:"><span>{{custItem.gmt_modified}}</span></el-form-item>-->
            </el-form>
        </div>

    </section>
</template>
<script>
    import {potentialsInfo} from '../../api/customers_api';
    import dict from '../../common/js/dict';
    import {isBirthDate, isNull} from '../../common/js/commons';

    export default {
        data () {
            return {
                custItem:[{
                    id: '',
                    family_name: '',    //姓
                    given_name: '',     //名
                    gender:'',            //称呼
                    date_of_birth:'',   //出生日期
                    mobile:'',          //手机号码
                    email:'',           //电子邮箱
                    identity_type:'',   //证件类型
                    identity_no:'',      //证件号码
                    country:'',         //国家
                    city:'',            //城市
                    zip_code:'',        //邮政编码
                    address:'',         //居住地址
                    address_imageId:'', //地址证明
                }],

                stateOptions: dict.potential_state,
                identityTypeOptions: dict.identity_type,
                genderOptions: dict.gender
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        methods: {
            fetchData(){
                this.custItem.id = this.$route.params.id;
            },
            isBirthDate(val){
                return isBirthDate(val);
            },
            getItem(){

                potentialsInfo({"id":this.custItem.id}).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.custItem = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$router': 'getParams'
        },
        mounted(){
            this.$nextTick(function(){
                this.getItem();
            });

        }
    }
</script>
<style lang="scss" scoped>
    .el-col .el-col-24{
        text-align:left;font-weight: bolder;font-size: 14px;
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

</style>
