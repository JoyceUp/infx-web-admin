<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-row>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
                <el-form :inline="true" :model="filters" ref="filtersFrom" size="medium">
                    <!--<el-form-item prop="account_no">
                        <el-input placeholder="MT4账号" v-model.trim="filters.account_no"></el-input>
                    </el-form-item>-->
                    <el-form-item prop="account_type">
                        <el-select clearable v-model="filters.account_type" :placeholder="$t('lang.account_type') || '账户类型'">
                            <el-option v-for="item in selectOptions.account_type" :key="item.value" :label="item.key"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="account_name">
                        <el-input :placeholder="$t('lang.full_name') || '客户姓名'" v-model.trim="filters.account_name" ></el-input>
                    </el-form-item>
                    <el-form-item prop="account_email">
                        <el-input :placeholder="$t('lang.email') || '邮箱'" v-model.trim="filters.account_email" ></el-input>
                    </el-form-item>
                    <el-form-item prop="account_mobile_number">
                        <el-input :placeholder="$t('lang.mobile') || '手机号'" v-model.trim="filters.account_mobile_number" ></el-input>
                    </el-form-item>
                    <el-form-item prop="account_identity_number">
                        <el-input :placeholder="$t('lang.identity_no') || '证件号码'" v-model.trim= "filters.account_identity_number"></el-input>
                    </el-form-item>

                    <el-form-item prop="parent_email">
                        <el-input :placeholder="$t('lang.parent_email') || '上级邮箱'"  v-model.trim="filters.parent_email"></el-input>
                    </el-form-item>

                    <el-form-item prop="parent_name">
                        <el-input :placeholder="$t('lang.parent_name') || '上级姓名'"  v-model.trim="filters.parent_name"></el-input>
                    </el-form-item>

                    <el-form-item prop="sale_account_no">
                        <el-input :placeholder="$t('lang.sales_account_no') || '销售账号'" v-model.trim="filters.sale_account_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="sale_name">
                        <el-input :placeholder="$t('lang.sales_name') || '销售姓名'"  v-model.trim="filters.sale_name"></el-input>
                    </el-form-item>
                    <el-form-item prop="state">
                        <el-select clearable :placeholder="$t('lang.check_status') || '审核状态'" clearable v-model="filters.state">
                            <el-option v-for="item in selectOptions.account_state"
                                       :key="item.value"
                                       :label="item.key"
                                       :value="item.value">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="start_time">
                        <el-date-picker
                                v-model="filters.times"
                                type="daterange"
                                :range-separator="$t('lang.times_to') || '至'"
                                :start-placeholder="$t('lang.application_times') || '申请时间'"
                                :end-placeholder="$t('lang.application_times') || '申请时间'" value-format="yyyy-MM-dd" @change="handleCreateDateChange">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getAccounts(1)" size="small">{{$t('lang.find') || '查询'}}</el-button>
                        <el-button @click="resetSearch('filtersFrom')" size="small">{{$t('lang.empty') || '清空'}}</el-button>
                        <el-button type="primary" @click="exportCustomer()" size="small">{{$t('lang.export') || '导出'}}</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- table -->
        <el-table :data="accounts" stripe v-loading="listLoading" style="width: 100%" tooltip-effect="dark">

            <el-table-column prop="account_type" :label="$t('lang.account_type') || '账户类型'" :formatter="accountTypeFormatter"></el-table-column>
            <el-table-column :label="$t('lang.full_name') || '客户姓名'">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.$index, scope.row) " type="text" size="small">
                        {{ scope.row.full_name }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="account_email" :label="$t('lang.email') || '邮箱'"></el-table-column>
            <el-table-column prop="parent_email" :label="$t('lang.parent_email') || '上级邮箱'"></el-table-column>
            <el-table-column prop="parent_name" :label="$t('lang.parent_name') || '上级姓名'" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sale_account_no" :label="$t('lang.sale_account_no') || '销售账号'"></el-table-column>
            <el-table-column prop="sale_name" :label="$t('lang.sale_name') || '销售姓名'"></el-table-column>
            <el-table-column prop="state" :formatter="accountStatueFormatter" :label="$t('lang.check_status') || '审核状态'"></el-table-column>
            <el-table-column prop="gmt_create" :label="$t('lang.application_times') || '申请时间'" show-overflow-tooltip></el-table-column>
            <el-table-column prop="gmt_modified" :label="$t('lang.check_times') || '审核时间'" show-overflow-tooltip></el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                    :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

        <el-dialog :title="$t('lang.account_info') || '账户信息'" :visible.sync="dialogFormVisible" width="800px">

            <el-tabs v-model="activeName"><!--@tab-click="handleClick"-->
                <el-tab-pane :label="$t('lang.account_info') || '账户信息'" name="first">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand" >
                        <input type="hidden" id="account_id" :value='itemInfo.id'/>
                        <el-form-item :label="$t('lang.account_type')+':' || '账户类型'"><span>{{ itemInfo.account_type }}</span></el-form-item>
                        <el-form-item :label="$t('lang.customer_ib_rate')+':' || '汇率'"><span>{{ itemInfo.customer_ib_rate }}</span></el-form-item>
                        <el-form-item :label="$t('lang.account_leverage')+':' || '杠杆'"><span>{{ itemInfo.account_leverage }}</span></el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('lang.personal_data') || '个人资料'" name="six">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand" :label-position="labelPosition">
                        <el-form-item :label="$t('lang.per_full_name')+':' || '姓名'"><span>{{ itemInfo.full_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.mother_maiden_name')+':' || '母亲姓名'"><span>{{ itemInfo.mother_maiden_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.gender')+':' || '性别'"><span>{{ options.gender[itemInfo.gender] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.place')+':' || '出生地点'"><span>{{ itemInfo.place }}</span></el-form-item>
                        <el-form-item :label="$t('lang.home_address')+':' || '家庭住址'"><span>{{ itemInfo.home_address }}</span></el-form-item>
                        <el-form-item :label="$t('lang.birthday')+':' || '出生日期'"><span>{{ BirthDateSplit(itemInfo.birthday) }}</span></el-form-item>
                        <el-form-item :label="$t('lang.identity_type')+':' || '证件类型'"><span>{{ options.identity_type[itemInfo.identity_type] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{ itemInfo.postal_code }}</span></el-form-item>
                        <el-form-item :label="$t('lang.identity_number')+':' || '证件号码'"><span>{{ itemInfo.identity_number }}</span></el-form-item>

                        <el-form-item :label="$t('lang.house_ownership')+':' || '房屋产权情况'" label-width="100px">
                            <span v-if="itemInfo.house_ownership != 3">{{ options.houseOwnershipMap[itemInfo.house_ownership] }}</span>
                            <span v-else>{{ itemInfo.house_ownership_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.investment_experience')+':' || '投资经验'">
                            <span v-if="itemInfo.investment_experience == 1">无</span>
                            <span v-else>{{ itemInfo.investment_experience }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.house_facsimile_number')+':' || '家庭号码'">
                            <span> {{mobileValue(itemInfo.house_number_country_code, itemInfo.house_facsimile_number)}} </span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.purpose_of_account_opening')+':' || '开户目的'">
                            <span v-if="itemInfo.purpose_of_account_opening != 3">{{ options.purposeOfAccountOpeningMap[itemInfo.purpose_of_account_opening] }}</span>
                            <span v-else>{{ itemInfo.purpose_of_account_opening_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.mobile_number')+':' || '手机号码'">
                            <span> {{mobileValue(itemInfo.mobile_country_code, itemInfo.mobile_number)}}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.personal_tax_number')+':' || '个人税号'"><span>{{ itemInfo.personal_tax_number }}</span></el-form-item>
                        <el-form-item :label="$t('lang.marital_status')+':' || '婚姻状况'"><span>{{ options.maritalStatusMap[itemInfo.marital_status] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.spouse_name')+':' || '配偶的名字'"><span>{{ itemInfo.spouse_name }}</span></el-form-item>
                            <!-- TODO：字段不明确 -->
                        <el-row :gutter="10">
                            <el-col :xs="8" :sm="6" :md="8" :lg="9" :xl="12">
                                <div class="leng-contain-change-line">
                                    {{$t('lang.exchange_work')+':' || '是否家庭成员在BAPPEBTI/外汇交易/票据交换所 工作过：'}}
                                </div>
                            </el-col>
                            <el-col :span="1">
                                <div class="grid-content bg-purple">
                                    {{ options.experienceMap[itemInfo.have_family_in] }}
                                </div>
                            </el-col>
                        </el-row>
                        <el-form-item label-width="200px" :label="$t('lang.go_broke')+':' || '你是否被法院宣告过破产'">
                            <span>{{ options.experienceMap[itemInfo.bankruptcy] }}</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('lang.emergency_man') || '紧急联系人信息'" name="second">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand">
                        <el-form-item :label="$t('lang.per_full_name')+':' || '姓名'"><span>{{ emergency_contact.full_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.home_address')+':' || '家庭住址'"><span>{{ emergency_contact.home_address }}</span></el-form-item>
                        <el-form-item :label="$t('lang.phone_number')+':' || '电话号码'"><span>{{mobileValue(emergency_contact.country_code, emergency_contact.phone_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.relation_ship')+':' || '关系'"><span>{{ emergency_contact.relation_ship }}</span></el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{ emergency_contact.postal_code }}</span></el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('lang.job_info') || '工作信息'" name="three">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand" label-width="120px">
                        <el-form-item :label="$t('lang.occupation')+':' || '职业'">
                            <span v-if="open_account_job.occupation != 6">{{ options.occupation_map[open_account_job.occupation] }}</span>
                            <span v-else>{{ open_account_job.occupation_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{ open_account_job.postal_code }}</span></el-form-item>
                        <el-form-item :label="$t('lang.name_of_company')+':' || '公司名称'"><span>{{ open_account_job.name_of_company }}</span></el-form-item>
                        <el-form-item :label="$t('lang.company_address')+':' || '公司地址'"><span>{{ open_account_job.company_address }}</span></el-form-item>
                        <el-form-item :label="$t('lang.office_phone_number')+':' || '办公室电话'"><span>{{mobileValue(open_account_job.phone_country_code, open_account_job.office_phone_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.office_fax_number')+':' || '办公室传真'"><span>{{mobileValue(open_account_job.fax_country_code, open_account_job.office_fax_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.position')+':' || '职位'"><span>{{ open_account_job.title }}</span></el-form-item>
                        <el-form-item :label="$t('lang.business_field')+':' || '业务领域'"><span>{{ open_account_job.business_field }}</span></el-form-item>
                        <el-form-item :label="$t('lang.length_of_services')+':' || '服务时长（年）'"><span>{{ open_account_job.length_of_services }}</span></el-form-item>
                        <el-form-item :label="$t('lang.length_of_services_in_previous_office')+':' || '前公司服务时长（年）'" label-width="156px"><span>{{ open_account_job.length_of_services_in_previous_office }}</span></el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('lang.property') || '资产清单'" name="four">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand" label-width="156px">
                        <el-form-item :label="$t('lang.annual')+':' || '年收入（IDR）'"><span>{{ options.annualIncomeMap[open_account_wealth_list.annual] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.location_of_house')+':' || '房子位置'"><span>{{ open_account_wealth_list.location_of_house }}</span></el-form-item>
                        <el-form-item :label="$t('lang.total')+':' || '合计（IDR）'"><span>{{ open_account_wealth_list.total }}</span></el-form-item>
                        <el-form-item :label="$t('lang.house_tax_value')+':' || '房屋税价值（IDR）'"><span>{{ open_account_wealth_list.house_tax_value }}</span></el-form-item>
                        <el-form-item :label="$t('lang.others')+':' || '其他（IDR）'"><span>{{ open_account_wealth_list.others }}</span></el-form-item>
                        <el-form-item :label="$t('lang.time_deposit')+':' || '定期存款（IDR）'"><span>{{ open_account_wealth_list.time_deposit }}</span></el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('lang.accessory') || '附件详情'" name="five">
                    <el-form :model="itemInfo" inline class="demo-table-expand">
                        <el-form-item :label="$t('lang.identity_photos_path')+':' || '照片'">
                            <img v-if="itemInfo.identity_photos_path" :src="'/common/images/'+itemInfo.identity_photos_path" class="avatar">
                            <el-button v-if="itemInfo.identity_photos_path" size="mini" @click="showPicBig(itemInfo.identity_photos_path)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.identity_photos_path2')+':' || '其他文件'">
                            <img v-if="itemInfo.identity_photos_path2" :src="'/common/images/'+itemInfo.identity_photos_path2" class="avatar">
                            <el-button v-if="itemInfo.identity_photos_path2" size="mini" @click="showPicBig(itemInfo.identity_photos_path2)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.recent_photos_path')+':' || 'KTP/SIM/PASSPORT'">
                            <img v-if="itemInfo.recent_photos_path2" :src="'/common/images/'+itemInfo.recent_photos_path2" class="avatar">
                            <el-button v-if="itemInfo.recent_photos_path2" size="mini" @click="showPicBig(itemInfo.recent_photos_path2)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.identity_photos_path2')+':' || '其他文件'">
                            <img v-if="itemInfo.recent_photos_path" :src="'/common/images/'+itemInfo.recent_photos_path" class="avatar">
                            <el-button v-if="itemInfo.recent_photos_path" size="mini" @click="showPicBig(itemInfo.recent_photos_path)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.three_month_bill')+':' || '银行账户对账单（最近3个月）/信用卡账单/电力/电话账户'" label-width="126%">
                            <img v-if="itemInfo.bill_photo_path" :src="'/common/images/'+itemInfo.bill_photo_path" class="avatar">
                            <el-button v-if="itemInfo.bill_photo_path" size="mini" @click="showPicBig(itemInfo.bill_photo_path)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

            <!--当账户状态 是禁用时，显示-->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openAccountSteps(itemInfo.id,2)" v-if="itemInfo.state == 2" size="medium ">{{$t('lang.open_file_verify') || '文件审核'}}</el-button>
                <el-button type="primary" @click="openAccountSteps(itemInfo.id,3)" v-if="itemInfo.state == 3" size="medium ">{{$t('lang.openAccount') || '开通'}}</el-button>
                <el-button type="primary" v-if="itemInfo.state == 2 || itemInfo.state == 3" @click="rejectAccount(itemInfo.id)" size="medium ">{{$t('lang.rejectAccount') || '拒绝'}}</el-button>
            </div>


        </el-dialog>

        <el-dialog :title="$t('lang.avatar_big') || '放大图'" :visible.sync="imgDialogVisible" width="63%" center>
            <span><img @click="imgDialogVisible = false" v-if="img_big" class="avatar_big" width="33%" :src="'/common/images/'+ img_big"></span>
        </el-dialog>


    </section>
</template>
<script>

    import {reviewsList, reviewDetail, openAccountByFile, openAccount, rejectAccount, exportCustomer,getDepositList} from '../../api/accounts_api.js';
    import ElInput from "element-ui/packages/input/src/input";
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import baseInfo from "./accountdetail/BaseInfo"
    import imagePath from "./accountdetail/AccountImage"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {isBirthDate, outputValue} from '../../common/js/commons';

    export default {
        components: {
            ElFormItem,
            ElForm,
            ElInput,
            baseInfo,
            imagePath
        },
        data() {
            return {
                listLoading: false,
                listLoadingDialog: false,
                activeName: 'first',
                dialogFormVisible: false,
                centerDialogVisible: true,
                img_big: '',
                imgDialogVisible: false,
                labelPosition: 'left',
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                options: {
                    gender: dict.gender_map,
                    account_type: dict.customer_ib_type,
                    account_state: dict.open_account_state_map,
                    identity_type: dict.identity_type_map,
                    customer_ib_rate: dict.customer_ib_rate_map,
                    occupation_map: dict.occupation_map,
                    houseOwnershipMap : dict.house_ownership_map,
                    purposeOfAccountOpeningMap: dict.purpose_of_account_opening_map,
                    maritalStatusMap: dict.marital_status_map,
                    annualIncomeMap: dict.customer_annual_income_map,
                    experienceMap: dict.experience_map
                },
                selectOptions: {
                    account_type: dict.account_type,
                    account_state: dict.open_account_state
                },
                accounts: [{
                    account_no: '',//MT4账号
                    account_type: '',//账户类型
                    full_name: '',//客户姓名
                    balance: '',//账户余额
                    parent_account_no: '',//上级账号
                    sales_account_no: '',//销售账号
                    sales_name: '',//销售姓名
                    state: '',//账号状态
                    gmt_create: '',//注册时间
                }],
                deposits:[{
                    gmt_create:'',//时间
                    account_no:'',//账号
                    channel_type:'',//资金类型
                    amount:'',//入金金额
                }],
                statistics:0,
                itemInfo: {
                    // id: '',
                    // account: '',
                    // account_type: '',
                    // account_gmt_create: '',
                    // account_state: '',
                    // full_name: '',
                    // gender: '',
                    // identity_type: '',
                    // identity_no: '',
                    // email: '',
                    // mobile: '',
                    // country: '',
                    // city: '',
                    // address: '',
                    // zip_code: '',
                    // parent_account: '',
                    // parent_full_name: '',
                    // sales_account_no: '',
                    // sales_full_name: ''
                },
                emergency_contact: {
                    full_name: '',
                    home_address: '',
                    phone_number: '',
                    country_code: '',
                    relation_ship: '',
                    postal_code: '',
                },
                open_account_job: {
                    occupation: '',
                    company_address: '',
                    name_of_company: '',
                    postal_code: '',
                    business_field: '',
                    office_phone_number: '',
                    phone_country_code: '',
                    fax_country_code: '',
                    title: '',
                    length_of_services: '',
                    length_of_services_in_previous_office: '',
                },
                open_account_wealth_list: {
                    annual: '',
                    location_of_house: '',
                    total: '',
                    house_tax_value: '',
                    others: '',
                    time_deposit: '',
                },
                filters: {
                    account_name: '',           //客户姓名
                    state: '',                  //审核状态
                    // account_no: '',//mt4号
                    account_type: '',           //账户类型
                    account_email: '',          //邮箱
                    account_mobile_number: '',  //手机号码
                    account_identity_number: '', //证件号码
                    parent_email: '',           //上级邮箱
                    parent_name: '',            //上级姓名
                    sale_account_no: '',        //销售账号
                    sale_name: '',              //销售姓名
                    times: '',
                    start_time: '', //注册开始时间
                    end_time: ''    //注册结束时间
                },
                BirthDateSplit: isBirthDate //出生日期截取
            }
        },
        methods: {
            //清空筛选表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getAccounts();
            },
            handleCreateDateChange(val) {
                this.filters.start_time = val[0]+" 00:00:00";
                this.filters.end_time = val[1]+" 23:59:59";
            },
            accountTypeFormatter(row, column) {
                return dict.customer_ib_type[row.account_type];
            },
            accountStatueFormatter(row, column) {
                return dict.open_account_state_map[row[column.property]];
            },
            fundTypeFormatter(row,column){

                return dict.funds_type[row.channel_type]
            },
            balanceFormatter(row,column){
                if(row.balance){
                    return row.balance / 100;
                }else{
                    return 0;
                }
            },
            amountFormtter(row,colum){
                if(row.amount){
                    return row.amount / 100;
                }else{
                    return 0;
                }
            },

            //清空查询条件
            resetSearch(formName) {
                this.$refs[formName].resetFields();
                this.filters.start_time = '';
                this.filters.end_time = '';
                this.filters.times = '';
                this.pager.page_no = 1;
                this.getAccounts();
            },
            getAccounts(num) {//获取客户列表
                this.listLoading = true
                if (num) {
                    this.pager.page_no = 1;
                }
                let params = {
                    "condition": {
                        account_name: this.filters.account_name,    //客户姓名
                        account_type: this.filters.account_type,    // 账号类型
                        account_email: this.filters.account_email,  //邮箱
                        account_mobile_number: this.filters.account_mobile_number,//手机号码
                        account_identity_number: this.filters.account_identity_number,//证件号码
                        parent_email: this.filters.parent_email,//上级账号
                        parent_name: this.filters.parent_name,//上级姓名
                        sale_account_no: this.filters.sale_account_no,//销售账号
                        sale_name: this.filters.sale_name,//销售姓名
                        state: this.filters.state,//状态
                        start_time: this.filters.start_time,//注册开始时间
                        end_time: this.filters.end_time//注册结束时间
                    },
                    "page_size": this.pager.page_size,
                    "page_no": this.pager.page_no,
                    "order_column": "",
                    "order_by": ""
                };
                reviewsList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.listLoading = false;
                        this.accounts = datas.items;
                        if(datas.items){
                            this.accounts.forEach(function(item){
                                item.full_name = item.open_account_info == null ? "" : item.open_account_info.full_name;
                            });
                        }
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                });
            },
            showDetail(index, row) {//弹出详情页
                this.dialogFormVisible = true;
                this.activeName= 'first';
                reviewDetail({"id": row.id}).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        var openInfo = result.open_account_info;
                        if(openInfo){
                            this.itemInfo = result.open_account_info;
                            if(openInfo.emergency_contact){this.emergency_contact = openInfo.emergency_contact};
                            if(openInfo.open_account_job){this.open_account_job = openInfo.open_account_job};
                            if(openInfo.open_account_wealth_list){this.open_account_wealth_list = openInfo.open_account_wealth_list};
                        }

                        this.itemInfo.id = result.id;
                        this.itemInfo.state = result.state;
                        this.itemInfo.account_type = this.options.account_type[result.account_type];
                        this.itemInfo.account_leverage = result.account_leverage;
                        this.itemInfo.customer_ib_rate = this.options.customer_ib_rate[result.account_type];

                        /*this.getDepositList(1);*/
                      } else {
                          if (res.data.status === 401) {
                               this.$router.push('/login');
                           }
                           this.$message.error(res.data.status + " " + res.data.msg);
                      }

                });
            },
            /*getSummaries(param){
                const { columns } = param;
                const sums = [];
                sums[0] = '合计';
                sums[columns.length - 1] = this.statistics;
                return sums;
            },*/
            openAccountSteps(iid,ind) {
                var tit = "";
                var tit2 = this.$t('lang.confirm_account_step1') || '第一步：开通MT4账户是否文件审核通过吗?';
                var tit3 = this.$t('lang.confirm_account_step2') || '第二步：确认开通MT4账户吗?';
                tit = ind == 2 ? tit2 : tit3;
                //开通操作: 将MT4账号、密码、服务器发送邮件给客户，MT4账号状态自动置为正常
                this.dialogVisible = false;
                this.$confirm(tit, this.$t('lang.confirm_account_prompt') || this.$t('lang.confirm_account_prompt') || '提示', {
                    confirmButtonText:  this.$t('lang.confirm')|| "确定",
                    cancelButtonText: this.$t('lang.abolish') || "取消",
                    type: 'warning'
                }).then(() => {
                    let params = {
                        "id": iid
                    };
                    ind == 2 ? this.openAccountFirst(params) : this.openAccountLast(params);
                }).catch(() => {});
            },
            openAccountFirst(params) {
                openAccountByFile(params).then((res) => {
                    this.dialogFormVisible = false
                    if (res.data.status === 200) {

                        this.$message(this.$t('lang.confirm_account_step1_succ') || "第一步：MT4账户 文件 审核已通过!");
                        if( this.listLoading==false){this.getAccounts()};
                    }else if(res.data.status === 514) {
                        this.$message.error(this.$t('lang.confirm_account_step1_err') ||"开户时用户状态错误");
                    } else {
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            openAccountLast(params) {
                openAccount(params).then((res) => {
                    this.dialogFormVisible = false
                    if (res.data.status === 200) {

                        this.$message(this.$t('lang.confirm_account_open_succ') || "MT4账户已开通!");
                        if( this.listLoading==false){this.getAccounts()};
                    }else if(res.data.status === 514) {
                        this.$message.error(this.$t('lang.confirm_account_open_err') || "开户时用户状态错误");
                    } else {
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            rejectAccount( iid ) {
                //拒绝操作：拒绝原因在备注里展示,并将拒绝原因，发送邮件给客户
                this.dialogVisible = false;
                this.$prompt(this.$t('lang.confirm_account_rejection') || '拒绝原因：', this.$t('lang.confirm_account_prompt') ||'提示', {
                    confirmButtonText: this.$t('lang.confirm') || '确定',
                    cancelButtonText:  this.$t('lang.abolish') || '取消',
                    inputType:'textarea',
                    inputPattern: /([A-Za-z0-9_]|[\u4e00-\u9fa5]|[^\x00-\xff])+/,
                    inputErrorMessage: this.$t('lang.confirm_account_empty') || '不能为空！'
                }).then(({ value }) => {
                    rejectAccount({"id": iid,"remark":value}).then((res) => {
                        this.dialogFormVisible = false
                        if (res.data.status === 200) {
                            this.$message(this.$t('lang.confirm_account_rejected') ||  "已拒绝!");
                            if( this.listLoading==false){this.getAccounts()};
                            //重置表单
                            //this.resetForm();
                        } else {
                            this.$message.error(res.data.status+" "+res.data.msg);
                        }
                    });
                }).catch(() => {});
            },
            //导出客户账号
            exportCustomer() {
                let condition = {
                    account_no: this.filters.account_no,//mt4号
                    name: this.filters.name,//客户姓名
                    account_type: this.filters.account_type,
                    email: this.filters.email,//点子邮箱
                    mobile: this.filters.mobile,//手机号码
                    identity_no: this.filters.identity_no,//证件号码
                    parent_account_no: this.filters.parent_account_no,//上级账号
                    parent_aname: this.filters.parent_aname,//上级姓名
                    sales_account_no: this.filters.sales_account_no,//销售账号
                    sales_name: this.filters.sales_name,//销售姓名
                    state: this.filters.state,//状态
                    start_time: this.filters.start_time,//注册开始时间
                    end_time: this.filters.end_time//注册结束时间
                };
                this.listLoading = true;
                exportCustomer(condition).then((res) => {
                    this.listLoading = false;
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            showPicBig(val){
                this.imgDialogVisible = true;
                this.img_big = val;
            },
            mobileValue(val, phone) {
                return outputValue(val, phone);
            }

        },
        mounted() {
            this.$nextTick(function () {
                this.getAccounts();
            })
        }
    }
</script>
<style scoped>
    .container .main .content-container {
        background: #f7f7f7;
    }

    .form .form-left {
        width: 10%;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1rem;
        margin-bottom: 2px;
    }

    .el-form-item {
        margin-bottom: 2px;
    }

    .el-dialog__body {
        padding: 10px 20px;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
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
    .el-form-item.highlights::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
        float: left;
        margin-top: 9px;
    }
    .leng-contain-change-line {
        color: #99a9bf;
        font-size: 14px;
        line-height: 30px;
    }
</style>