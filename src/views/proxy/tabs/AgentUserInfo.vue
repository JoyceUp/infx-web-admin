<template>
    <section>
        <el-row :gutter="20">
            <el-col :span="20">

                <el-button type="primary" size="mini" @click="updateAgentInfo('agentInfo')" v-if="!isdel">更新</el-button>
                <el-button type="primary" size="mini" @click="removeAgentInfo('agentInfo')" v-if="!isdel">删除</el-button>
            </el-col>
        </el-row>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本信息" name="1">
                <div class="div-padd">
                    <el-form label-position="left" inline class="demo-table-expand" :model="agentInfo" ref="agentInfo" :rules="info_rules">
                        <el-input type="hidden" v-model="agentInfo.id" ></el-input>
                        <el-form-item label="姓:" prop="family_name"><el-input v-model="agentInfo.family_name" autofocus></el-input></el-form-item>
                        <el-form-item label="名:" prop="given_name"><el-input v-model="agentInfo.given_name" ></el-input></el-form-item>
                        <el-form-item label="称呼:">
                            <el-select clearable placeholder="称呼:" v-model="agentInfo.gender">
                                <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in genderOptions" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期:">
                            <div class="block">
                                <el-date-picker v-model="agentInfo.date_of_birth" type="date" placeholder="选择日期"
                                                :clearable='false' :editable="false" default-value></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="电子邮箱:" prop="email"><el-input v-model="agentInfo.email" ></el-input></el-form-item>
                        <el-form-item label="手机号码:"><span>{{agentInfo.mobile}}</span></el-form-item>
                        <el-form-item label="证件类型:" prop="identity_type">
                            <el-select clearable placeholder="证件类型:" v-model="agentInfo.identity_type">
                                <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in identityTypeOptions" ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="证件号码:" v-if="agentInfo.identity_type != 1"  prop="identity_no"
                                      :rules="{ required: true, message: '证件号码不能为空', trigger: 'blur' }">
                            <el-input v-model="agentInfo.identity_no" ></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码:" prop="identity_no" v-if="agentInfo.identity_type == 1"
                                      :rules="[{ required: true, message: '证件号码不能为空', trigger: 'blur' },
                                            { validator: checkFields.identity_no, message: '身份证号格式错误', trigger: 'blur' }]">
                            <el-input v-model="agentInfo.identity_no" ></el-input>
                        </el-form-item>

                        <el-form-item label="证件正面:">
                            <el-upload class="avatar-uploader" action="ss" :show-file-list="false" :http-request="httpRequest"
                                       :before-upload="beforeAvatarUpload">
                                <img v-if="agentInfo.identity1_path" :src="'/common/images/'+agentInfo.identity1_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-button size="mini" @click="showPicBig(agentInfo.identity1_path)">查看大图</el-button>
                        </el-form-item>
                        <el-form-item label="证件反面:">
                            <el-upload class="avatar-uploader" action="ss" :show-file-list="false" :http-request="httpRequest2"
                                       :before-upload="beforeAvatarUpload">
                                <img v-if="agentInfo.identity2_path" :src="'/common/images/'+agentInfo.identity2_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-button size="mini" @click="showPicBig(agentInfo.identity2_path)">查看大图</el-button>
                        </el-form-item>

                        <el-form-item label="国家:"> <span>{{agentInfo.country}}</span> </el-form-item>
                        <el-form-item label="城市:"> <span>{{agentInfo.city}}</span> </el-form-item>
                        <el-form-item label="居住地址:"> <span>{{agentInfo.address}}</span> </el-form-item>
                        <el-form-item label="邮政编码:"> <span>{{agentInfo.zip_code}}</span> </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>
            <el-collapse-item title="归属信息" name="2">
                <div class="div-padd">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="销售账号:"><span>{{agentInfo.sales_account_no}}</span></el-form-item>
                        <el-form-item label="销售姓名:"><span>{{agentInfo.sales_full_name}}</span></el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item title="银行信息" name="3">
                <el-table stripe :data="brand_cards" style="width: 100%" >
                    <el-table-column prop="country" label="银行国家" align="center"> </el-table-column>
                    <el-table-column prop="province" label="银行省" align="center"> </el-table-column>
                    <el-table-column prop="city" label="银行城市"></el-table-column>
                    <el-table-column prop="bank_name" label="银行名称" ></el-table-column>
                    <el-table-column prop="branch_name" label="支行名称"></el-table-column>
                    <el-table-column prop="card_no" label="银行账号"></el-table-column>
                    <el-table-column label="银行卡图片" align="center">
                        <template slot-scope="scope"><img @click="showPicBig(scope.row.path)" v-if="scope.row.path" :src="'/common/images/'+scope.row.path" class="avatar" style="width: 36px;height: 36px;"/></template>
                    </el-table-column>
                    <!--<el-table-column label="状态">-->
                        <!--<template slot-scope="scope"> <span>{{changeStatus(scope.row.state, brandStateOptions)}}</span></template>-->
                    <!--</el-table-column>-->
                </el-table>
            </el-collapse-item>

            <el-collapse-item title="电汇信息" name="4">
                <el-row>
                    <el-col :span="12"><div class="bg-purple-light grid-content">银行账号</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.card_no)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行账户户名</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.card_user_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行名称</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.bank_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行国家</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.country)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">地区(省)</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.province)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">地区(市)</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.city)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行开户行</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.branch_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">开户行地址</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.branch_address)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light bg-purple-bottom">国际汇款代码</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right bg-purple-bottom">{{isNull(tts.branch_swift_code)}}</div></el-col>
                </el-row>
                <!--<el-table stripe :data="tts" border style="width: 100%" :show-header="false">-->
                    <!--<el-table-column prop="k" align="center"> </el-table-column>-->
                    <!--<el-table-column prop="v" align="center"> </el-table-column>-->
                <!--</el-table>-->
            </el-collapse-item>
        </el-collapse>
        <el-dialog title="放大图" :visible.sync="imgDialogVisible" width="63%" center>
            <span><img @click="imgDialogVisible = false" v-if="img_big" class="avatar_big" :src="'/common/images/'+ img_big"></span>
        </el-dialog>
    </section>
</template>
<script>
    import {getAgentInfo, updateAgentInfo, removeAgentInfo, agentBankcardList, agentTtList} from '../../../api/agent_api';
    import dict from '../../../common/js/dict';
    import {update_img} from '../../../api/common';
    import {isNull} from '../../../common/js/commons';
    import {formatDate} from '../../../common/js/date';
    import * as checkFields from '../../../common/js/checkFields';

    export default {
        //父页面传来的数据
        props:['agent_id'],
        data() {
            return {
                isdel:false,
                checkFields:checkFields,
                isNull:isNull,
                activeNames: ['1','2'],
                agentInfo: {
                    id: '',
                    gmt_create: '',//注册时间
                    mobile: '',//手机号码
                    email: '',//电子邮箱
                    identity_no: '',//证件号码
                    account_balance: '',//账户余额
                    state: '',//状态
                    family_name:'',//姓
                    given_name:'',//名
                    gender:'',//性别
                    date_of_birth:'',//出生日期
                    identity_type:'',//证件类型
                    identity1_path:'',//身份证正面
                    identity2_path:'',//身份证反面
                    country:'',//国家
                    province:'',//省
                    zip_code:'',//邮政编码
                    address:'',//地址
                    sales_full_name: '',//销售姓名
                    sales_account_no: ''//销售账号
                },
                info_rules: {
                    family_name: [{ required: true, message: '姓不能为空', trigger: 'blur' }],
                    given_name: [{ required: true, message: '名不能为空', trigger: 'blur' }],
                    identity_type: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
                    email: [
                        { required: true, message: '电子邮箱不能为空', trigger: 'blur' },
                        { validator: checkFields.email, message: '电子邮箱格式错误', trigger: 'blur,change' }
                    ]
                },
                tts: {
                    card_no: '',
                    card_user_name: '',
                    bank_name: '',
                    country: '',
                    province: '',
                    city: '',
                    branch_name: '',
                    branch_address: '',
                    branch_swift_code: '',
                },
                brand_cards:[],
                uploadUser: {   //上传图片
                    // 角色类型：1：客户2：代理3：销售
                    roleType: "2",
                    roleId: ''
                },
                img_big: '',
                imgDialogVisible: false,
                stateOptions: dict.potential_state,
                identityTypeOptions: dict.identity_type,
                genderOptions: dict.gender,

                brandStateOptions: dict.band_state  //银行状态

            }
        },
        methods: {
            getUserInfoDetail() {
                let params = {
                    id: this.$route.params.id,
                };
                getAgentInfo(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        if(result == null){
                            this.isdel = true;this.$router.push({name:'代理列表'});
                        }
                        this.agentInfo = result;
                    }else{
                        // this.$message.error(res.data.msg);
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },
            updateAgentInfo(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: that.agentInfo.id,
                            family_name: that.agentInfo.family_name,
                            given_name: that.agentInfo.given_name,
                            gender: that.agentInfo.gender,
                            date_of_birth: that.agentInfo.date_of_birth,
                            // date_of_birth: formatDate(new Date(that.agentInfo.date_of_birth), "yyyy-MM-dd"),
                            email: that.agentInfo.email,
                            identity_type: that.agentInfo.identity_type,
                            identity_no: that.agentInfo.identity_no,
                            identity1_path: that.agentInfo.identity1_path,
                            identity2_path: that.agentInfo.identity2_path
                        };

                        updateAgentInfo(params).then((res) => {

                            if(res.data.status === 200) {
                                this.getUserInfoDetail();
                                that.$message("更新成功！");
                            }else{
                                if(res.data.status === 401){
                                    that.$router.push('/login');
                                }
                                that.$message.error(res.data.status+" "+res.data.msg);
                            }
                        })
                    }
                });
            },
            removeAgentInfo() {
                this.$confirm('您确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: this.$route.params.id,
                    };
                    removeAgentInfo(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if(res.data.status === 200) {
                            this.$message("删除成功!");
                            this.$router.push({name:'代理列表'});
                        }else{
                            // this.$message.error(res.data.msg);
                            if(res.data.status === 401){
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            getbankCardList() {
                let params = {
                    id: this.$route.params.id,
                };
                agentBankcardList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        if(result != null){
                            this.brand_cards = result;
                            this.page_size = result.page_size;
                            this.page_no = result.page_no;
                            this.total = result.total;
                        }
                    }else{
                        // this.$message.error(res.data.msg);
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getTtList() {
                let params = {
                    id: this.$route.params.id,
                };

                agentTtList(params).then((res) => {
                    if(res.data.status === 200) {
                        let result = JSON.parse(res.data.datas);
                        if(result != null){
                            this.tts = result;
                        }
                        // var obj = {}; obj.k = '银行账号';obj.v = result!=null ? result.card_no : ' - - ';this.tts[0] = obj;
                        // var obj = {}; obj.k = '银行账户户名';obj.v = result!=null ? result.card_user_name : ' - - ';this.tts[1] = obj;
                        // var obj = {}; obj.k = '银行名称';obj.v = result!=null ? result.bank_name : ' - - ';this.tts[2] = obj;
                        // var obj = {}; obj.k = '银行国家';obj.v = result!=null ? result.country : ' - - ';this.tts[3] = obj;
                        // var obj = {}; obj.k = '地区(省)';obj.v = result!=null ? result.province : ' - - ';this.tts[4] = obj;
                        // var obj = {}; obj.k = '地区(市)';obj.v = result!=null ? result.city : ' - - ';this.tts[5] = obj;
                        // var obj = {}; obj.k = '银行开户行';obj.v = result!=null ? result.branch_name : ' - - ';this.tts[6] = obj;
                        // var obj = {}; obj.k = '开户行地址';obj.v = result!=null ? result.branch_address : ' - - ';this.tts[7] = obj;
                        // var obj = {}; obj.k = '国际汇款代码';obj.v = result!=null ? result.branch_swift_code : ' - - ';this.tts[8] = obj;
                    }else{
                        // this.$message.error(res.data.msg);
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },
            handleChange(val) {},
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){
                        val = item.key;
                    }
                });
                return val;
            },

            httpRequest(item){      //证件正面
                let formData = new FormData();
                formData.append('file', item.file);
                formData.append('roleType', this.uploadUser.roleType);
                formData.append('roleId', this.$route.params.id);
                update_img(formData).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.agentInfo.identity1_path = result.id;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            httpRequest2(item){      //证件反面
                let formData = new FormData();
                formData.append('file', item.file);
                formData.append('roleType', this.uploadUser.roleType);
                formData.append('roleId', this.$route.params.id);
                update_img(formData).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.agentInfo.identity2_path = result.id;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },
            showPicBig(val){
                this.imgDialogVisible = true;
                this.img_big = val;
            }
        },

        mounted()
        {
            this.$nextTick(()=>{
                this.getUserInfoDetail();
                this.getbankCardList();
                this.getTtList();

            })
        }
    }
</script>
<style lang="scss" scoped>
    .el-row {
        text-align: right;
    }
    .div-padd{
        padding: 10px 180px;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        margin-top: 18px;
        width: 50%;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 40%;
    }
    .el-form-item{
        /*border: 1px solid #ebeef5;*/
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
    }
    .avatar_big{
        width: 100%;
        height: auto;
        display: block;
    }
    /*电汇 样式*/
    .bg-purple-bottom{
        border-bottom:0.1px solid #DCDCDC;
    }
    .bg-purple-light {
        background: #f0f0f0;
        border-left:0.1px solid #DCDCDC;
        border-top:0.1px solid #DCDCDC;
    }
    .grid-content {
        min-height: 36px;
        line-height: 46px;
        text-align: center;
    }
    .bg-purple-right {
        border-left:0.1px solid #DCDCDC;
        border-right:0.1px solid #DCDCDC;
        border-top:0.1px solid #DCDCDC;
    }
</style>
