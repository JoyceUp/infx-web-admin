<template>
    <section>
        <!--<el-row :gutter="20">
            <el-col :span="24">
                <el-button type="primary" size="mini" @click="updateInfo('custInfo')">更新</el-button>
                <el-button type="primary" size="mini" @click="deleteInfo('custInfo')">删除</el-button>
                <br>
                <br>
            </el-col>
        </el-row>-->
        <el-collapse v-model="activeNames">
            <el-collapse-item :title="$t('lang.basic_info') || '基本信息'" name="1">
                <div class="div-padd">
                    <el-form label-position="left" inline class="demo-table-expand" :model="custInfo" ref="custInfo" :rules="info_rules">
                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">{{$t('lang.personal_data') || '个人资料'}}</div></el-col>
                        </el-row>
                        <el-input type="hidden" v-model="custInfo.customer_id"></el-input>
                        <el-form-item :label="$t('lang.per_full_name')+':' || '姓名'" class="highlights"><span>{{custInfo.full_name}}</span></el-form-item>
                        <el-form-item :label="$t('lang.mother_maiden_name')+':' || '母亲姓名'" class="highlights"><span>{{open_account_info.mother_maiden_name}}</span></el-form-item>
                        <el-form-item :label="$t('lang.gender')+':' || '性别'" class="highlights"><span>{{ options.genderMap[custInfo.gender] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.place')+':' || '出生地点'" class="highlights"><span>{{open_account_info.place}}</span></el-form-item>
                        <el-form-item :label="$t('lang.home_address')+':' || '家庭住址'" class="highlights"><span>{{address_info.address}}</span></el-form-item>
                        <el-form-item :label="$t('lang.birthday')+':' || '出生日期'" class="highlights"><span>{{ BirthDateSplit(custInfo.date_of_birth) }}</span></el-form-item>
                        <el-form-item :label="$t('lang.identity_type')+':' || '证件类型'" class="highlights"><span>{{options.identityTypeMap[custInfo.identity_type]}}</span></el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{address_info.zip_code}}</span></el-form-item>
                        <el-form-item :label="$t('lang.identity_number')+':' || '证件号码'" class="highlights"><span>{{ custInfo.identity_no }}</span></el-form-item>
                        <el-form-item :label="$t('lang.house_ownership')+':' || '房屋产权情况'" label-width="100px">
                            <span v-if="open_account_info.house_ownership != 3">{{ options.houseOwnershipMap[open_account_info.house_ownership] }}</span>
                            <span v-else>{{ open_account_info.house_ownership_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.investment_experience')+':' || '投资经验'" class="highlights">
                            <span v-if="open_account_info.investment_experience == 1">无</span>
                            <span v-else>{{ open_account_info.investment_experience }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.house_facsimile_number')+':' || '家庭号码'"><span>{{mobileValue(open_account_info.house_number_country_code, open_account_info.house_facsimile_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.purpose_of_account_opening')+':' || '开户目的'" class="highlights">
                            <span v-if="open_account_info.purpose_of_account_opening != 3">{{ options.purposeOfAccountOpeningMap[open_account_info.purpose_of_account_opening] }}</span>
                            <span v-else>{{ open_account_info.purpose_of_account_opening_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.mobile_number')+':' || '手机号码'" class="highlights"><span>{{mobileValue(open_account_info.mobile_country_code, custInfo.mobile)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.personal_tax_number') || '个人税号'" class="highlights"><span>{{ open_account_info.personal_tax_number }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.marital_status')+':' || '婚姻状况'"><span>{{ options.maritalStatusMap[open_account_info.marital_status] }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.spouse_name')+':' || '配偶的名字'"><span>{{open_account_info.spouse_name}}</span></el-form-item>

                        <!-- TODO：字段不明确 -->
                        <br/><el-form-item label-width="368px" :label="$t('lang.exchange_work')+':' || '是否家庭成员在BAPPEBTI/外汇交易/票据交换所 工作过'">
                            <span>{{ options.investmentExperienceMap[open_account_info.have_family_in] }}</span>
                        </el-form-item>
                        <br/><el-form-item label-width="180px" :label="$t('lang.go_broke')+':' || '你是否被法院宣告过破产'">
                            <span>{{ options.investmentExperienceMap[open_account_info.bankruptcy] }}</span>
                        </el-form-item>



                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">{{$t('lang.emergency_man') || '紧急联系人信息'}}</div></el-col>
                        </el-row>
                        <el-form-item :label="$t('lang.per_full_name')+':' || '姓名'" class="highlights"><span>{{emergency_contact.full_name}}</span></el-form-item>
                        <el-form-item :label="$t('lang.home_address')+':' || '家庭住址'" class="highlights"><span>{{emergency_contact.home_address}}</span></el-form-item>
                        <el-form-item :label="$t('lang.phone_number')+':' || '电话号码'" class="highlights"><span>{{mobileValue(emergency_contact.country_code, emergency_contact.phone_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.relation_ship')+':' || '关系'" class="highlights"><span>{{emergency_contact.relation_ship}}</span></el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{emergency_contact.postal_code}}</span></el-form-item>



                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">{{$t('lang.job_info') || '工作信息'}}</div></el-col>
                        </el-row>
                        <el-form-item :label="$t('lang.occupation')+':' || '职业'" class="highlights">
                            <span v-if="open_account_job.occupation != 6">{{ options.occupationMap[open_account_job.occupation] }}</span>
                            <span v-else>{{ open_account_job.occupation_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.company_address')+':' || '公司地址'"><span>{{open_account_job.company_address}}</span></el-form-item>
                        <el-form-item :label="$t('lang.name_of_company')+':' || '公司名称'"><span>{{open_account_job.name_of_company}}</span></el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{open_account_job.postal_code}}</span></el-form-item>
                        <el-form-item :label="$t('lang.business_field')+':' || '业务领域'"><span>{{open_account_job.business_field}}</span></el-form-item>
                        <el-form-item :label="$t('lang.office_phone_number')+':' || '办公室电话'"><span>{{mobileValue(open_account_job.phone_country_code, open_account_job.office_phone_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.office_fax_number')+':' || '办公室传真'"><span>{{mobileValue(open_account_job.fax_country_code, open_account_job.office_fax_number)}}</span></el-form-item>
                        <el-form-item :label="$t('lang.title')+':' || '职位'"><span>{{open_account_job.title}}</span></el-form-item>
                        <el-form-item :label="$t('lang.length_of_services')+':' || '服务时长（年）'" label-width="116px"><span>{{open_account_job.length_of_services}}</span></el-form-item>
                        <el-form-item :label="$t('lang.length_of_services_in_previous_office')+':' || '前公司服务时长（年）'" label-width="156px">
                            <span>{{open_account_job.length_of_services_in_previous_office}}</span>
                        </el-form-item>
                 <!--   </el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item title="资产清单" name="6">
                <div class="div-padd">
                    <el-form label-position="left" inline class="demo-table-expand" :model="custInfo">-->
                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">{{$t('lang.property') || '资产清单'}}</div></el-col>
                        </el-row>
                        <el-form-item  label-width="110px" :label="$t('lang.annual')+':' || '年收入（IDR）:'" class="highlights"><span>{{ options.annualIncomeMap[open_account_wealth_list.annual] }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.location_of_house')+':' || '房子位置'" class="highlights"><span>{{open_account_wealth_list.location_of_house}}</span></el-form-item>
                        <el-form-item label-width="110px" :label="$t('lang.total')+':' || '合计（IDR）'" class="highlights"><span>{{open_account_wealth_list.total}}</span></el-form-item>
                        <el-form-item label-width="140px" :label="$t('lang.house_tax_value')+':' || '房屋税价值（IDR）'" class="highlights"><span>{{open_account_wealth_list.house_tax_value}}</span></el-form-item>
                        <el-form-item label-width="110px" :label="$t('lang.others')+':' || '其他（IDR）'" class="highlights"><span>{{open_account_wealth_list.others}}</span></el-form-item>
                        <el-form-item label-width="130px" :label="$t('lang.time_deposit')+':' || '定期存款（IDR）'" class="highlights"><span>{{open_account_wealth_list.time_deposit}}</span></el-form-item>
                    <!--</el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item title="附件详情" name="7">
                <div class="div-padd">
                    <el-form label-position="left" inline class="demo-table-expand" :model="custInfo" label-width="160px">-->
                        <el-row>
                            <el-col :span="24"><div class="grid-content bg-purple-dark">{{$t('lang.accessory') || '附件详情'}}</div></el-col>
                        </el-row>
                        <el-form-item :label="$t('lang.identity_photos_path')+':' || '照片'" class="highlights">
                            <img v-if="open_account_info.identity_photos_path" :src="'/common/images/'+open_account_info.identity_photos_path" class="avatar">
                            <!--<el-upload class="avatar-uploader" action="ss" :show-file-list="false" :http-request="httpRequest"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="open_account_info.identity_photos_path" :src="'/common/images/'+open_account_info.identity_photos_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>-->
                            <el-button v-if="open_account_info.identity_photos_path" size="mini" @click="showPicBig(open_account_info.identity_photos_path)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.identity_photos_path2')+':' || '其他文件'">
                            <img v-if="open_account_info.identity_photos_path2" :src="'/common/images/'+open_account_info.identity_photos_path2" class="avatar">
                            <el-button v-if="open_account_info.identity_photos_path2" size="mini" @click="showPicBig(open_account_info.identity_photos_path2)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.recent_photos_path')+':' || 'KTP/SIM/PASSPORT'" class="highlights" label-width="146px">
                            <img v-if="open_account_info.recent_photos_path2" :src="'/common/images/'+open_account_info.recent_photos_path2" class="avatar">
                            <el-button v-if="open_account_info.recent_photos_path2" size="mini" @click="showPicBig(open_account_info.recent_photos_path2)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.identity_photos_path2')+':' || '其他文件'">
                            <img v-if="open_account_info.recent_photos_path" :src="'/common/images/'+open_account_info.recent_photos_path" class="avatar">
                            <el-button v-if="open_account_info.recent_photos_path" size="mini" @click="showPicBig(open_account_info.recent_photos_path)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                        <el-form-item :label="$t('lang.three_month_bill')+':' || '银行账户对账单（最近3个月）/信用卡账单/电力/电话账户'" class="highlights" label-width="166px">
                            <img v-if="open_account_info.bill_photo_path" :src="'/common/images/'+open_account_info.bill_photo_path" class="avatar">
                            <el-button v-if="open_account_info.bill_photo_path" size="mini" @click="showPicBig(open_account_info.bill_photo_path)">{{$t('lang.photos_big') || '查看大图'}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item :title="$t('lang.wire_transfer_info') || '电汇信息'" name="2">
                <el-table stripe :data="ttsList" style="width: 100%" >
                    <el-table-column prop="bank_name" :label="$t('lang.bank_name') || '银行名称'"></el-table-column>
                    <el-table-column prop="card_user_name" :label="$t('lang.card_user_name') || '账户'"></el-table-column>
                    <el-table-column prop="card_no" :label="$t('lang.card_no') || '账号'">
                        <template slot-scope="scope">
                            <el-button  type="text" @click="getTtInfo(scope.row)">
                                {{ scope.row.card_no }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="currency" :label="$t('lang.currency') || '币种'">
                        <template slot-scope="scope">
                            {{currency[scope.row.currency]}}
                        </template>
                    </el-table-column>
                 </el-table>
            </el-collapse-item>
            <el-dialog
                    :title="$t('lang.check_wire_transfer_info') || '查看电汇资料'"
                    :visible.sync="ttsDialogVisible"
            >
                <el-row>
                    <el-col :span="12"><div class="bg-purple-light grid-content">{{$t('lang.bank_account')+':' || '银行账号'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.card_no)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.accessory')+':' || '附件详情'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.card_user_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.currency')+':' || '币种'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{currency[tts.currency]}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.bank_name')+':' || '银行名称'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.bank_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.bank_country')+':' || '银行国家'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.country)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.bank_province')+':' || '地区(省)'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.province)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.bank_city')+':' || '地区(市)'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.city)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.bank_of_deposit')+':' || '银行开户行'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.branch_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{$t('lang.bank_of_deposit_ad')+':' || '开户行地址'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.branch_address)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light bg-purple-bottom">{{$t('lang.international_code')+':' || '国际汇款代码'}}</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right bg-purple-bottom">{{isNull(tts.branch_swift_code)}}</div></el-col>
                </el-row>
            </el-dialog>

            <!--<el-collapse-item title="投资者信息" name="3">
                <el-row>
                    <el-col :span="12"><div class="bg-purple-light grid-content">就业情况</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(jobOptions[custInfo.job])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">资金来源</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(capital_sourceOptions[custInfo.capital_source])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">年收入</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(annual_incomeOptions[custInfo.annual_income])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">总资产</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(total_assetOptions[custInfo.total_asset])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">外汇，差价合约（CFDs）以及其他金融衍生品经验 。</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(experienceOptions[custInfo.experience])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">我了解金融衍生品是我投资目标和风险投资的一部分，因此我能评估交易所涉及的风险，包括我所有投资资金的损失。</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(assess_riskOptions[custInfo.assess_risk])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light bg-purple-bottom">我了解金融衍生品是我投资目标和风险投资的一部分，因此我能评估交易所涉及的风险，包括我所有投资资金的损失。</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right bg-purple-bottom ">{{isNull(professionalOptions[custInfo.professional])}}</div></el-col>
                </el-row>
            </el-collapse-item>-->
        </el-collapse>
        <el-dialog :title="$t('lang.avatar_big') || '放大图'" :visible.sync="imgDialogVisible" width="50%" center>
            <span><img @click="imgDialogVisible = false" style="text-align: center" v-if="img_big" class="avatar_big" :src="'/common/images/'+ img_big"></span>
        </el-dialog>
    </section>
</template>
<script>
    import {customersInfo, customersAddressInfo, updateCustomer, removeCustomer, customerTel_transferInfo, customerTel_transferList} from '../../../api/customers_api';
    import {update_img} from '../../../api/common';
    import dict from '../../../common/js/dict';
    import {isNull,isBirthDate,outputValue} from '../../../common/js/commons';
    import * as checkFields from '../../../common/js/checkFields';

    export default {
        data() {
            return {
                checkFields:checkFields,
                cid:'',
                isNull:isNull,
                activeNames:['1','2'],
                custInfo: {
                    // customer_id: '',
                    // customer_name: '',
                    // create_date: '',//注册时间
                    // mobile: '',//手机号码
                    // email: '',//电子邮箱
                    // account_balance: '',//账户余额
                    // state: '',//状态
                    // family_name:'',//姓
                    // given_name:'',//名
                    // gender:'',//性别
                    // date_of_birth:'',//出生日期
                    // identity_type:'',//证件类型
                    // identity_no:'',//证件号码



                    job:'',             //就业情况
                    capital_source:'',   //资金来源
                    annual_income:'',   //年收入
                    total_asset:'',     //总资产
                    experience:'',      //是否有交易经验
                    assess_risk:'',     //是否有评估风险能力
                    professional:'',    //是否是专业人士
                },
                //开户基本信息
                open_account_info: {
                    place: '',
                    birthday: '',
                    gender: '',
                    full_name: '',
                    identity_type: '',
                    identity_number: '',
                    investment_experience: '',
                    purpose_of_account_opening: '',
                    purpose_of_account_opening_other: '',
                    personal_tax_number: '',
                    marital_status: '',
                    spouse_name: '',
                    mother_maiden_name: '',
                    home_address: '',
                    postal_code: '',
                    house_ownership: '',
                    house_ownership_other: '',
                    house_number_country_code: '',  //家庭号码国家代号
                    house_facsimile_number: '',
                    mobile_country_code: '',    //手机号国家代号
                    mobile_number: '',
                    identity_photos_path:'',    //身份证正面
                    identity_photos_path2:'',   //身份证反面
                    bill_photo_path: '',        //银行账户对账单（最近3个月）/信用卡账单/电力/电话账户
                    recent_photos_path:'',      //最新照
                    recent_photos_path2:'',     //KTP/SIM/PASSPORT
                },
                //紧急联系人信息
                emergency_contact: {
                    full_name: '',
                    home_address: '',
                    phone_number: '',
                    relation_ship: '',
                    postal_code: '',
                },
                //工作信息
                open_account_job: {
                    occupation: '',
                    company_address: '',
                    name_of_company: '',
                    postal_code: '',
                    business_field: '',
                    office_phone_number: '',
                    office_fax_number: '',
                    title: '',
                    length_of_services: '',
                    length_of_services_in_previous_office: '',
                },
                //资产清单
                open_account_wealth_list: {
                    annual: '',
                    location_of_house: '',
                    total: '',
                    house_tax_value: '',
                    others: '',
                    time_deposit: '',
                },
                info_rules: {},
                address_info: {
                    country: '', //国家
                    province: '',//省
                    zip_code: '',//邮政编码
                    address: '', //地址
                    path: ''     //地址证明
                },
                //brand_cards:[],
                ttsList:[],
                //电汇
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
                    currency_type: ''

                },
                uploadUser: {
                    // 角色类型：1：客户2：代理3：销售
                    roleType: "1",
                    roleId: ''
                },
                options: {
                    identityTypeMap: dict.identity_type_map,
                    genderMap: dict.gender_map,
                    maritalStatusMap: dict.marital_status_map,
                    occupationMap: dict.occupation_map,
                    annualIncomeMap: dict.customer_annual_income_map,
                    investmentExperienceMap: dict.experience_map,
                    purposeOfAccountOpeningMap: dict.purpose_of_account_opening_map,
                    houseOwnershipMap : dict.house_ownership_map
                },
                //投资者
                investor_info: [],
                img_big: '',
                imgDialogVisible: false,
                stateOptions: dict.potential_state_map,

                jobOptions: dict.job_map,             //就业情况
                capital_sourceOptions: dict.capital_source_map,   //资金来源
                annual_incomeOptions: dict.annual_income_map,   //年收入
                total_assetOptions: dict.total_asset_map,     //总资产
                experienceOptions:dict.experience_map,      //是否有交易经验
                assess_riskOptions:dict.assess_risk_map,     //是否有评估风险能力
                professionalOptions: dict.professional_map,    //是否是专业人士
                brandStateOptions: dict.band_state,  //银行状态
                currency: dict.currency_type,  //币种
                ttsDialogVisible:false,
                BirthDateSplit: isBirthDate //出生日期截取

            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.uploadUser.roleId = this.$route.params.id;
            },
            getUserInfoDetail() {
                let params = {
                    id: this.$route.params.id,
                };
                customersInfo(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        if(result == null){
                            this.$router.push({name:this.$t('lang.menu_register_customer') || this.$t('lang.menu_register_customer') || '注册客户'});
                        }
                        var openInfo = result.open_account_info;
                        if(openInfo){
                            this.open_account_info = openInfo;
                            if(openInfo.emergency_contact){this.emergency_contact = openInfo.emergency_contact};
                            if(openInfo.open_account_job){this.open_account_job = openInfo.open_account_job};
                            if(openInfo.open_account_wealth_list){this.open_account_wealth_list = openInfo.open_account_wealth_list};
                        }

                        this.custInfo = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
                customersAddressInfo(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.address_info = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
            /*updateInfo(formName){//更新信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.custInfo.id,
                            family_name: this.custInfo.family_name,
                            given_name: this.custInfo.given_name,
                            gender: this.custInfo.gender,
                            date_of_birth: this.custInfo.date_of_birth + ' 00:00:00',
                            email: this.custInfo.email,
                            identity_type: this.custInfo.identity_type,
                            identity_no: this.custInfo.identity_no,
                            identity1_path: this.custInfo.identity1_path,
                            identity2_path: this.custInfo.identity2_path
                        };
                        updateCustomer(params).then((res)=>{
                            let result = JSON.parse(res.data.datas);
                            if(res.data.status === 200) {
                                this.$message("更新成功！");
                                this.getUserInfoDetail();
                            }else{
                                if(res.data.status === 401){
                                    this.$router.push('/login');
                                }
                                this.$message.error(res.data.msg);
                            }
                        });
                    }
                });
            },
            deleteInfo() {
                let params = {
                    id: this.$route.params.id,
                };
                this.$confirm('确定删除该用户？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then((res)=>{
                    removeCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if(res.data.status === 200) {
                            this.$message("删除成功！");
                            this.$router.push({name:'注册客户'});
                        }else{
                            if(res.data.status === 401){
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.msg);
                        }
                    })

                })

            },*/
            getTtList() {
                let params = {
                    customer_id: this.$route.params.id,
                };
                customerTel_transferList(params).then((res) => {
                    if(res.data.status === 200) {
                        let result = JSON.parse(res.data.datas);
                        if(result != null){
                            this.ttsList = result;
                        }
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getTtInfo(row) {
                this.ttsDialogVisible = true;
                this.tts = row;
            },
            /*httpRequest(item){      //证件正面
                let formData = new FormData();
                formData.append('file', item.file);
                formData.append('roleType', this.uploadUser.roleType);
                formData.append('roleId', this.uploadUser.roleId);
                update_img(formData).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.custInfo.identity1_path = result.id;
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
                formData.append('roleId', this.uploadUser.roleId);
                update_img(formData).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.custInfo.identity2_path = result.id;
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
            },*/
            showPicBig(val){
                this.imgDialogVisible = true;
                this.img_big = val;
            },
            handleClose(){
                this.ttsDialogVisible = false;
            },
            mobileValue(val, phone) {
                return outputValue(val, phone);
            }

        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'fetchData',
        },
        mounted(){
            this.$nextTick(function(){
                this.getUserInfoDetail();
                this.getTtList();
            });
        }
    }
</script>
<style lang="scss" scoped>
    .el-row {
        text-align: left;
    }
    .el-col {
        font-size: 18px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        padding-bottom: 20px;
    }

    /*.demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 20px;
        width: 45%;
    }*/
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 20px;
        width: 45%;
    }
    /*.el-form-item .el-form-item__content {
        width: 50%;
        background-color: #3a8ee6;
    }
    .demo-table-expand .el-form-item label {
        width: 125px;
        background-color: #8cc5ff;
    }*/

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

    /*电汇 ，投资样式*/
    .bg-purple-bottom{
        border-bottom:0.1px solid #DCDCDC;
    }
    .bg-purple-light {
        background: #f0f0f0;
        border-left:0.1px solid #DCDCDC;
        border-top:0.1px solid #DCDCDC;
    }
    .grid-content {
        line-height: 20px;
        padding: 15px;
        text-align: center;
    }
    .bg-purple-right {
        border-left:0.1px solid #DCDCDC;
        border-right:0.1px solid #DCDCDC;
        border-top:0.1px solid #DCDCDC;
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
