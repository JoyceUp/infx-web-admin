<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-row :gutter="15">
            <el-col :span="24"  class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" size="small">
                    <el-form-item>
                        <el-input placeholder="代理ID" v-model="filters.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="代理姓名" v-model="filters.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                                v-model="filters.dataRange"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="创建日期"
                                end-placeholder="创建日期" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="getAgents()">查询</el-button>
                        <el-button type="primary" @click="getClear()">清空</el-button>

                        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-table :data="agents" style="width: 100%"  highlight-current-row stripe>
            <el-table-column prop="gmt_create" label="创建时间" width="180px" align="center"> </el-table-column>
            <el-table-column prop="agent_name" label="合同编号"> </el-table-column>
            <el-table-column prop="agent_id" label="代理ID"> </el-table-column>
            <el-table-column prop="agent_name" label="代理姓名"> </el-table-column>
            <el-table-column label="操作" width="180px" align="center">
                <template slot-scope="scope">
                    <!--<el-button type="danger"  :id="'da'+ scope.$index" @click="downloadPdf(scope,'/upload/jianjie.pdf')">下载</el-button>-->
                    <a href="/upload/简历-冯玉-2018硕士-英语.pdf" download="">下载</a>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination background layout="prev, pager, next" :page-size="page_size"
                           :total="total" @current-change="changePageNumber" style="float:right;">
            </el-pagination>
        </el-col>

        <!-- 弹框 -->
        <el-dialog title="新增" :visible.sync="dialogVisible" width="480px" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px">
                <el-form-item label="代理编号:" prop="agent_id">
                    <el-input  v-model.number="addForm.agent_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="代理姓名:" >
                    <template slot-scope="scope">
                        <span>{{ addForm.agent_name }}</span>
                    </template>
                </el-form-item>
                <el-form-item label="合同上传:" prop="upload_contract">
                    <el-upload
                            class="upload-demo"
                            :action="123"
                            :before-upload="beforeAvatarUpload"
                            :on-success="setPdfInfo"
                            :http-request="httpRequest"
                            :file-list="fileLists">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传本地PDF文件，且不超过2M</div>-->
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button><!--contractForm.agent_id,contractForm.agent_name,-->
                <el-button type="primary" @click.native="handleAdd" :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import {pendAgentsList} from '../../api/agent_api';
    import {formatDate} from '../../common/js/date';

    export default{
        props:["params"],
        components:{},
        data(){
            return {
                page_size:10,
                page_no:1,
                total:0,
                filters:{
                    name:'',//代理姓名
                    mobile:'',//手机号码
                    email:'',//电子邮箱  精确查询
                    identityNo:'',//证件号码    精确查询
                    state:'',//状态 选项：待审核、已同意、已拒绝、默认全部
                    dataRange:''    //时间范围
                },
                agents:[{
                    gmt_create:'',//登记时间
                    agent_name:'',//姓名
                    mobile:'',//手机号码
                    email:'',//电子邮箱
                    identity_no:'',//证件号码
                    invite_id:'',//邀请人ID
                    invite_name:'',//邀请人姓名
                    gmt_modified:'',//更新时间
                    state:'',//状态
                }],
                addForm: {
                    agent_id: '',             //代理编号
                    agent_name: '',      //代理姓名
                    fileAction : '',         //上传文件地址
                    upload_contract: [],       //上传合同
                },
                dialogVisible:false,
                addLoading:false,
                fileLists: [],
                rules: {
                    agent_id:[{required:true,message:'请输入代理编号',trigger:'blur'}],
                    upload_contract:[{required:true,message:'请上传合同',trigger:'blur'}]
                }
            }
        },
        methods:{
            changePageNumber(val) {
                this.page_no = val;
                this.getAgents();
            },
            getAgents(){
                let params = {
                    page_no:this.page_no,
                    page_size:this.page_size,
                    name:this.filters.name,
                    start_time : this.filters.dataRange == null?'':this.filters.dataRange[0],
                    end_time : this.filters.dataRange == null?'':this.filters.dataRange[1]
                }

                pendAgentsList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.agents = result.items;
                        this.total = result.total;
                        this.page_size = result.page_size;
                        this.page_no = result.page_no;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            fmtDate(time) {
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            },
            getClear(){
                this.filters.name = '';
                this.filters.mobile = '';
                this.filters.email = '';
                this.filters.identityNo = '';
                this.filters.state = '';
                this.filters.dataRange = '';
            },
            /* ---- 下载 ----- */
            // downloadPdf(obj,url){
            //     let da = 'da' + obj.$index;
            //     let elemIF = document.createElement("iframe");
            //     elemIF.src = url
            //     elemIF.style.display = "none";
            //     let a= document.getElementById(da);
            //     a.innerHTML="正在下载...";
            //     a.disabled=true;
            //     document.body.appendChild(elemIF);
            //
            // },
            //此处弹框所用
            resetForm() {       //重置 表单
                this.dialogVisible = false;
                this.addForm = {
                    agent_id: '',
                    agent_name: '',
                    fileAction: '/manage/agents_pendlist/listpage#/',
                    upload_contract: ''
                }
                this.$refs['addForm'].resetFields();
            },
            //添加合同
            handleAdd(form){
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            /*addUser(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.dialogVisible = false;
                                this.getAgents();
                            });*/
                        });
                    // } else {
                    //     this.$message("数据不符合规则");
                    //     this.dialogVisible = false;
                    //     return false;
                    }
                })
                // this.dialogVisible = false;

            },
            // 上传前对文件的大小的判断
            beforeAvatarUpload (file) {
                const extension = file.name.split('.')[1] === 'pdf'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!extension) {
                    this.$message.error('上传模板只能是本地 pdf 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传模板大小不能超过 2MB!');
                }
                return extension && isLt2M;
            },

            setPdfInfo(response, file, fileLists) {
                // 通过异步上传成功后，依据返回的参数组装 `upload_contract` 图片路径等信息；
                // 点击`提交`按钮是保存包括图片信息的表单信息；
                this.upload_contract = fileLists;

            },
            httpRequest(){

            }

        },
        mounted(){
            this.$nextTick(function(){

                this.getAgents();
            })
        }
    }
</script>
<style>
    .form .form-left {
        width:10%; padding-left:1rem; padding-right:1rem; padding-top:1rem;
    }
</style>