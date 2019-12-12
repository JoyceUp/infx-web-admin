<template>
    <section>
        <el-col :span="24" style="margin-top:-20px;text-align: right">
            <el-button  size="mini" @click="$router.back(-1)">{{$t('lang.return') || '返回'}}</el-button>
        </el-col>
        <el-col>
            <el-tabs v-model="activeNames" type="card" style="height:110px;">
                <el-tab-pane :label="$t('lang.customer_base_info') || '用户信息'" name="1"><div><customer-base-info></customer-base-info></div></el-tab-pane>
                <el-tab-pane :label="$t('lang.customer_account_info') || '账户信息'" name="2"><div><customer-account-info></customer-account-info></div></el-tab-pane>
                <el-tab-pane :label="$t('lang.customer_money_info') || '资金信息'" name="3"><div><customer-money-info></customer-money-info></div></el-tab-pane>
                <el-tab-pane :label="$t('lang.customer_relation_info') || '关系信息'" name="4"><div><customer-relation-info></customer-relation-info></div></el-tab-pane>
                <el-tab-pane :label="$t('lang.customer_secondary_info') || '下级信息'" name="5"><div><customer-secondary-info></customer-secondary-info></div></el-tab-pane>
                <el-tab-pane :label="$t('lang.customer_communication_info') || '沟通记录'" name="6"><div><customer-communication-info></customer-communication-info></div></el-tab-pane>
                <br/><br/><br/><br/><br/><br/><br/>
            </el-tabs>
        </el-col>
    </section>
</template>
<script>
    import {getCustomerById} from '../../../api/customers_api.js';
    import customerBaseInfo from './CustomerBaseInfo'
    import customerAccountInfo from './CustomerAccountInfo';
    import customerMoneyInfo from './CustomerMoneyInfo';
    import customerRelationInfo from './CustomerRelationInfo';
    import customerCommunicationInfo from './CustomerCommunicationInfo';
    import customerSecondaryInfo from './CustomerSecondaryInfo';


    export default {
        data () {
            return {
                activeNames:'1',//tabs 第一个tab展开
                customer_id: '',
            }
        },
        components:{
            'customer-base-info': customerBaseInfo,
           'customer-account-info':customerAccountInfo,
            'customer-money-info':customerMoneyInfo,
            'customer-relation-info':customerRelationInfo,
            'customer-communication-info':customerCommunicationInfo,
            'customer-secondary-info':customerSecondaryInfo
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        methods: {
            fetchData(){
               this.customer_id = this.$route.params.id;
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
             '$route': 'fetchData',
        },
        mounted(){}
    }
</script>
<style lang="scss" scoped>

</style>
