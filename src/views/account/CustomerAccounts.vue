<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-row>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
                <el-form :inline="true" :model="filters" ref="filtersFrom" size="medium">
                    <el-form-item prop="account_no">
                        <el-input :placeholder="$t('lang.mt_account') || 'MT4账号' " v-model.trim="filters.account_no"></el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input :placeholder="$t('lang.full_name') || '客户姓名' " v-model.trim="filters.name" ></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input :placeholder="$t('lang.email') || '邮箱' " v-model.trim="filters.email" ></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <el-input :placeholder="$t('lang.mobile') || '手机号' " v-model.trim="filters.mobile" ></el-input>
                    </el-form-item>
                    <el-form-item prop="identity_no">
                        <el-input :placeholder="$t('lang.identity_no') || '证件号码' " v-model.trim= "filters.identity_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="parent_account_no">
                        <el-input :placeholder="$t('lang.parent_account_no') || '上级账号' "  v-model.trim="filters.parent_account_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="parent_name">
                        <el-input :placeholder="$t('lang.parent_name') || '上级姓名' "  v-model.trim="filters.parent_name"></el-input>
                    </el-form-item>

                    <el-form-item prop="sales_account_no">
                        <el-input :placeholder="$t('lang.sales_account_no') || '销售账号' " v-model.trim="filters.sales_account_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="sales_name">
                        <el-input :placeholder="$t('lang.sales_name') || '销售姓名' "  v-model.trim="filters.sales_name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select clearable :placeholder="$t('lang.account_state') || '账户状态' " clearable  prop="state" v-model="filters.state">
                            <el-option v-for="item in selectOptions.account_state"
                                       :key="item.value"
                                       :label="item.key"
                                       :value="item.value">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select clearable v-model="filters.account_type" :placeholder="$t('lang.account_type') || '账户类型' ">
                            <el-option v-for="item in selectOptions.account_type"
                                       :key="item.value"
                                       :label="item.key"
                                       :value="item.value">

                            </el-option>
                            <!--<el-option :key="value" :label="txt" :value="value" v-for="(txt, value) in options.account_type" ></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="start_time">
                        <el-date-picker
                                v-model="filters.times"
                                type="daterange"
                                :range-separator="$t('lang.times_to') || '至' "
                                :start-placeholder="$t('lang.start_times') || '开始日期' "
                                :end-placeholder="$t('lang.end_times') || '结束日期' " value-format="yyyy-MM-dd" @change="handleCreateDateChange">
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
        <el-table
                :data="accounts"
                stripe
                v-loading="listLoading"
                style="width: 100%">

            <el-table-column
                    prop="account_no"
                    :label="$t('lang.mt_account') || 'MT4账号' "
            >
                <template slot-scope="scope">
                    <el-button
                            @click="showDetail(scope.$index, scope.row) "
                            type="text"
                            size="small">
                        {{ scope.row.account_no }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="account_type"
                    :label="$t('lang.account_type') || '账户类型' "
                    :formatter="accountTypeFormatter"
            >
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    :label="$t('lang.full_name') || '客户姓名' ">
            </el-table-column>

            <el-table-column
                    prop="balance"
                    :label="$t('lang.balance') || '账户余额' " :formatter="balanceFormatter">
            </el-table-column>
            <el-table-column
                    prop="parent_account_no"
                    :label="$t('lang.parent_account_no') || '上级账号' ">
            </el-table-column>
            <el-table-column
                    prop="parent_name"
                    :label="$t('lang.parent_name') || '上级姓名' ">
            </el-table-column>
            <el-table-column
                    prop="sales_account_no"
                    :label="$t('lang.sales_account_no') || '销售账号' ">
            </el-table-column>
            <el-table-column
                    prop="sales_name"
                    :label="$t('lang.sales_name') || '销售姓名' ">
            </el-table-column>
            <el-table-column
                    :formatter="accountStatueFormatter"
                    :label="$t('lang.account_state') || '账号状态' ">
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    :label="$t('lang.gmt_create') || '注册时间' ">
            </el-table-column>
            <!--<el-table-column :label="$t('lang.handle') || '操作' ">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button type="primary" @click="showDetail(scope.$index, scope.row) " size="mini">-->
                        <!--{{$t('lang.check') || '查看'}}-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.page_size"
                    :current-page="pager.page_no"
                    :page-sizes="pager.sizes"
                    background
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
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
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand">
                        <el-form-item :label="$t('lang.per_full_name')+':' || '姓名'"><span>{{ itemInfo.full_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.mother_maiden_name')+':' || '母亲姓名'"><span>{{ open_account_info.mother_maiden_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.gender')+':' || '性别'"><span>{{ options.gender[itemInfo.gender] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.place')+':' || '出生地点'"><span>{{ open_account_info.place }}</span></el-form-item>
                        <el-form-item :label="$t('lang.address')+':' || '家庭住址'"><span>{{ itemInfo.address }}</span></el-form-item>
                        <el-form-item :label="$t('lang.date_of_birth')+':' || '出生日期'"><span>{{ BirthDateSplit(itemInfo.date_of_birth) }}</span></el-form-item>
                        <el-form-item :label="$t('lang.identity_type')+':' || '证件类型'"><span>{{ options.identity_type[itemInfo.identity_type] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.postal_code')+':' || '邮编'"><span>{{ itemInfo.zip_code }}</span></el-form-item>
                        <el-form-item :label="$t('lang.identity_no')+':' || '证件号码'"><span>{{ itemInfo.identity_no }}</span></el-form-item>

                        <el-form-item :label="$t('lang.house_ownership')+':' || '房屋产权情况'" label-width="100px">
                            <span v-if="open_account_info.house_ownership != 3">{{ options.houseOwnershipMap[open_account_info.house_ownership] }}</span>
                            <span v-else>{{ open_account_info.house_ownership_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.investment_experience')+':' || '投资经验'">
                            <span v-if="open_account_info.investment_experience == 1">无</span>
                            <span v-else>{{ open_account_info.investment_experience }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.house_facsimile_number')+':' || '家庭号码'">
                            <span> {{mobileValue(open_account_info.house_number_country_code, open_account_info.house_facsimile_number)}} </span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.purpose_of_account_opening')+':' || '开户目的'">
                            <span v-if="open_account_info.purpose_of_account_opening != 3">{{ options.purposeOfAccountOpeningMap[open_account_info.purpose_of_account_opening] }}</span>
                            <span v-else>{{ open_account_info.purpose_of_account_opening_other }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.mobile')+':' || '手机号码'">
                            <span> {{mobileValue(open_account_info.mobile_country_code, itemInfo.mobile)}}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.personal_tax_number')+':' || '个人税号'"><span>{{ open_account_info.personal_tax_number }}</span></el-form-item>
                        <el-form-item :label="$t('lang.marital_status')+':' || '婚姻状况'"><span>{{ options.maritalStatusMap[open_account_info.marital_status] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.spouse_name')+':' || '配偶的名字'"><span>{{ open_account_info.spouse_name }}</span></el-form-item>
                        <!-- TODO：字段不明确 -->
                        <el-row :gutter="10">
                            <el-col :xs="8" :sm="6" :md="8" :lg="9" :xl="12">
                                <div class="leng-contain-change-line">
                                    {{$t('lang.exchange_work') || '是否家庭成员在BAPPEBTI/外汇交易/票据交换所 工作过'}}
                                </div>
                            </el-col>
                            <el-col :span="1">
                                <div class="grid-content bg-purple">
                                    {{ options.experienceMap[open_account_info.have_family_in] }}
                                </div>
                            </el-col>
                        </el-row>
                        <el-form-item label-width="200px" :label="$t('lang.go_broke')+':' || '你是否被法院宣告过破产'">
                            <span>{{ options.experienceMap[open_account_info.bankruptcy] }}</span>
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
                        <el-form-item :label="$t('lang.per_title')+':' || '职位'"><span>{{ open_account_job.title }}</span></el-form-item>
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
                <!--<el-tab-pane :label="$t('lang.basic_info') || '基本信息'" name="first">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand">
                        <input type="hidden" id="account_id" :value='itemInfo.id'/>
                        <el-form-item :label="$t('lang.per_mt_account') || 'MT4账号'"><span>{{ itemInfo.account }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_account_type') || '账户类型'"><span>{{ options.account_type[itemInfo.account_type] }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.per_account_gmt_create') || '创建时间'"><span>{{ itemInfo.account_gmt_create }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_account_state') || '账户状态'"><span>{{ options.account_state[itemInfo.account_state] }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.per_name') || '客户姓名'"><span>{{ itemInfo.full_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_customer_gender') || '客户性别'"><span>{{ options.gender[itemInfo.gender] }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_identity_type') || '证件类型'"><span>{{ options.identity_type[itemInfo.identity_type] }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.per_identity_number') || '证件号码'"><span>{{ itemInfo.identity_no }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_e_email') || '电子邮箱'"><span>{{ itemInfo.email }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_mobile_number') || '手机号码'"><span>{{ itemInfo.mobile }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_country') || '国家'"><span>{{ itemInfo.country }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_city') || '城市'"><span>{{ itemInfo.city }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_address') || '居住地址'"><span>{{ itemInfo.address }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_zip_code') || '邮政编码'"><span>{{ itemInfo.zip_code }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_parent_account_no') || '上级账号'"><span>{{ itemInfo.parent_account }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_parent_name') || '上级姓名'"><span>{{ itemInfo.parent_full_name }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_sales_account_no') || '销售账号'"><span>{{ itemInfo.sales_account_no }}</span></el-form-item>
                        <el-form-item :label="$t('lang.per_sales_name') || '销售姓名'"><span>{{ itemInfo.sales_full_name }}</span></el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$t('lang.img_info') || '图片信息'" name="second">
                    <el-form :model="itemInfo" inline class="demo-table-expand">
                        <el-form-item :label="$t('lang.per_identity1_path') || '证件正面'"><span><img width="60%" v-if="itemInfo.identity1_path"
                                                               :src="'/common/images/'+itemInfo.identity1_path" @click="showPicBig(itemInfo.identity1_path)"/></span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.per_identity2_path') || '证件反面'"><span><img width="60%" v-if="itemInfo.identity2_path"
                                                               :src="'/common/images/' + itemInfo.identity2_path" @click="showPicBig(itemInfo.identity2_path)"/></span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.per_path') || '地址证明'"><span><img v-if="itemInfo.path" width="60%"
                                                               :src="'/common/images/' + itemInfo.path" @click="showPicBig(itemInfo.path)"/></span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>-->

                <el-tab-pane :label="$t('lang.gold_record') || '入金记录'" name="third">
                    <el-table
                            :data="deposits"
                            stripe
                            show-summary
                            :summary-method="getSummaries"
                            v-loading="listLoadingDialog"
                            style="width: 100%">

                        <el-table-column
                                prop="gmt_create"
                                :label="$t('lang.gold_in_time') || '入金时间'"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="account_no"
                                :label="$t('lang.account_no') || '账号'">
                        </el-table-column>
                        <el-table-column
                                prop="channel_type"
                                :formatter="fundTypeFormatter"
                                :label="$t('lang.channel_type') || '资金类型'">
                        </el-table-column>

                        <el-table-column
                                prop="amount"
                                :label="$t('lang.amount') || '入金金额(USD)'" :formatter="amountFormtter">
                        </el-table-column>

                    </el-table>

                    <el-col :span="24" class="toolbar">
                        <el-pagination
                                style="text-align: center;"
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :page-size="pager2.page_size"
                                :current-page="pager2.page_no"
                                :page-sizes="pager2.sizes"
                                background
                                layout="prev,pager,next,sizes,total"
                                :total="pager2.total">
                        </el-pagination>
                    </el-col>
                </el-tab-pane>
            </el-tabs>

            <!--当账户状态 是禁用时，显示-->
            <!--<div slot="footer" v-if="itemInfo.account_state == 51 || itemInfo.account_state == 50" class="dialog-footer">-->
                <!--<el-button type="primary" @click="enableAccount(itemInfo.id,itemInfo.account_no)" size="medium ">激活</el-button>-->
            <!--</div>-->


        </el-dialog>

        <el-dialog :title="$t('lang.avatar_big') || '放大图'" :visible.sync="imgDialogVisible" width="63%" center>
            <span><img @click="imgDialogVisible = false" v-if="img_big" class="avatar_big" width="33%" :src="'/common/images/'+ img_big"></span>
        </el-dialog>


    </section>
</template>
<script>

    import {accountsList, accountDetail, enableAccount, exportCustomer,getDepositList} from '../../api/accounts_api.js';
    import ElInput from "element-ui/packages/input/src/input";
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import baseInfo from "./accountdetail/BaseInfo"
    import imagePath from "./accountdetail/AccountImage"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {isBirthDate, outputValue} from "../../common/js/commons";

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
                page_size: 20,
                page_no: 1,
                total: 0,
                activeName: 'first',
                dialogFormVisible: false,
                centerDialogVisible: true,
                img_big: '',
                imgDialogVisible: false,
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                //详情页 --- 分页
                pager2: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                options: {
                    gender: dict.gender_map,
                    account_type: dict.customer_ib_type,
                    account_state: dict.account_state_map,
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
                    account_state: dict.account_state
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
                itemInfo: { },
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
                    name: '',//客户姓名
                    state: '',//账号状态
                    account_no: '',//mt4号
                    account_type: '',
                    email: '',//邮箱
                    mobile: '',//手机号码
                    identity_no: '',//证件号码
                    parent_account_no: '',//上级账号
                    parent_name: '',//上级姓名
                    sales_account_no: '',//销售账号
                    sales_name: '',//销售姓名
                    start_time: '',//注册开始时间
                    end_time: ''//注册结束时间
                },
                BirthDateSplit: isBirthDate, //出生日期截取
                deposit_account_no: ''      //用于详情的入金记录数据
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
            //详情页 --- 分页pageSize发生改变
            handleSizeChange2(val) {
                this.pager2.page_no = 1;
                this.pager2.page_size = val;
                this.handlePagerChange2();
            },
            //详情页 ---  分页currentPage发生改变
            handleCurrentChange2(val) {
                this.pager2.page_no = val;
                this.handlePagerChange2();
            },
            //详情页 --- 分页引起的页面数据更改
            handlePagerChange2() {
                this.getDepositList();
            },
            handleCreateDateChange(val) {
                this.filters.start_time = val[0]+" 00:00:00";
                this.filters.end_time = val[1]+" 23:59:59";
            },
            accountTypeFormatter(row, column) {
                return dict.customer_ib_type[row.account_type];
            },
            accountStatueFormatter(row, column) {
                return dict.account_state_map[row.state];
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
            changePageNumber(val) {
                this.page_no = val;
                this.getAccounts();
            },

            //清空查询条件
            resetSearch(formName) {
                this.filters.account_no = "";
                this.filters.name = "";
                this.filters.email = "";
                this.filters.mobile = "";
                this.filters.parent_account_no = "";
                this.filters.parent_name = '';
                this.filters.sales_account_no = '';
                this.filters.sales_name = '';
                this.filters.state = '';
                this.filters.start_time = '';
                this.filters.end_time = '';
                this.filters.times = '';
                this.filters.account_type = '';
                this.filters.identity_no = '';
                this.filters.identity_type = '';
                this.getAccounts();
            },
            getAccounts(num) {//获取客户列表
                this.listLoading = true
                if (num) {
                    this.pager.page_no = 1;
                }
                let params = {
                    "condition": {
                        account_no: this.filters.account_no,//mt4号
                        name: this.filters.name,//客户姓名
                        account_type: this.filters.account_type, // 账号类型
                        email: this.filters.email,//邮箱
                        mobile: this.filters.mobile,//手机号码
                        identity_no: this.filters.identity_no,//证件号码
                        parent_account_no: this.filters.parent_account_no,//上级账号
                        parent_name: this.filters.parent_name,//上级姓名
                        sales_account_no: this.filters.sales_account_no,//销售账号
                        sales_name: this.filters.sales_name,//销售姓名
                        state: this.filters.state,//状态
                        start_time: this.filters.start_time,//注册开始时间
                        end_time: this.filters.end_time//注册结束时间
                    },
                    "page_size": this.pager.page_size,
                    "page_no": this.pager.page_no,
                    "order_column": "",
                    "order_by": ""
                };
                accountsList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.listLoading = false
                        this.accounts = datas.items;
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
                accountDetail({"account_no": row.account_no}).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        var openInfo = result.open_account_info;
                        if(openInfo){
                            this.open_account_info = openInfo;
                            if(openInfo.emergency_contact){this.emergency_contact = openInfo.emergency_contact};
                            if(openInfo.open_account_job){this.open_account_job = openInfo.open_account_job};
                            if(openInfo.open_account_wealth_list){this.open_account_wealth_list = openInfo.open_account_wealth_list};
                        }

                        // this.custInfo = result;
                        this.itemInfo = result;
                        // var openInfo = result.open_account_info;
                        // if(openInfo){
                        //     this.itemInfo = result.open_account_info;
                        //     if(openInfo.emergency_contact){this.emergency_contact = openInfo.emergency_contact};
                        //     if(openInfo.open_account_job){this.open_account_job = openInfo.open_account_job};
                        //     if(openInfo.open_account_wealth_list){this.open_account_wealth_list = openInfo.open_account_wealth_list};
                        // }
                        //
                        // this.itemInfo.id = result.id;
                        // this.itemInfo.state = result.state;
                        this.itemInfo.customer_ib_rate = this.options.customer_ib_rate[result.account_type];
                        this.itemInfo.account_type = this.options.account_type[result.account_type];
                        // this.itemInfo.account_leverage = result.account_leverage;



                        this.deposit_account_no = result.account; //此处用于获取入金记录
                        this.getDepositList(1);
                      } else {
                          if (res.data.status === 401) {
                               this.$router.push('/login');
                           }
                           this.$message.error(res.data.status + " " + res.data.msg);
                      }

                });
            },
            getDepositList(num,account_no){
                //入金记录
                this.listLoadingDialog = true;
                if (num) {
                    this.pager2.page_no = 1;
                }
                let params2 = {
                    "condition": {
                        account_no: this.deposit_account_no
                    },
                    "page_size": this.pager2.page_size,
                    "page_no": this.pager2.page_no,
                    "order_column": "",
                    "order_by": ""
                };
                getDepositList(params2).then((res) =>{
                    this.listLoadingDialog = false;
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        this.deposits = result.items;
                        this.pager2.total = result.total;

                        var statistics = result.statistics.sum_deposit_amount;
                        if(statistics) {
                            this.statistics = statistics / 100 ;
                        }

                    } else {
                        if (res.data.status === 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                });

            },
            getSummaries(param){
                const { columns } = param;
                const sums = [];
                sums[0] = '合计';
                sums[columns.length - 1] = this.statistics;
                return sums;
            },
            //激活账号
            enableAccount(id,account_no) {
                enableAccount({"account_id": id}).then((res) => {
                    if(res.data.status == 200){

                       this.$message({
                              type: 'success',
                              message: "操作成功"
                          });

                        this.dialogFormVisible = false;
                        this.getAccounts();
                    }

            });
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
    .avatar_big{
        width: 100%;
        height: auto;
        display: block;
    }
    .leng-contain-change-line {
        color: #99a9bf;
        font-size: 14px;
        line-height: 30px;
    }
</style>