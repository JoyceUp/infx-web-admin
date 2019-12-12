<template>
    <section>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="出金记录" name="moneyDepDraw"><div><money-dep-draw :agent_id="agent_id"></money-dep-draw></div></el-tab-pane>
            <el-tab-pane label="转账记录" name="moneyTransfer"><div><money-transfer :agent_id="agent_id"></money-transfer></div></el-tab-pane>
            <el-tab-pane label="返利转余额记录" name="moneyRebateBalance"><div><money-rebate-balance :agent_id="agent_id"></money-rebate-balance></div></el-tab-pane>
            <el-tab-pane label="交易返佣列表" name="moneyCommission"><div><money-commission :agent_id="agent_id"></money-commission></div></el-tab-pane>
            <el-tab-pane label="余额返利列表" name="moneyRebate"><div><money-rebate :datas="agent_id"></money-rebate></div></el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
    import {getCustomerById} from '../../../api/customers_api.js';
    import moneyDepDraw from './AgentMoney_depDraw'
    import moneyTransfer from './AgentMoney_transfer'
    import moneyRebateBalance from './AgentMoney_rebateBalance'
    import moneyCommission from './AgentMoney_commission'
    import moneyRebate from './AgentMoney_rebate'

    export default {
        //父级组件传过来的数据
        props: ["agent_id"],
        components: {
            'money-dep-draw': moneyDepDraw,
            'money-transfer': moneyTransfer,
            'money-rebate-balance': moneyRebateBalance,
            'money-commission': moneyCommission,
            'money-rebate': moneyRebate,
        },
        data() {
            return {
                //当前tab的名称
                activeName: 'moneyDepDraw',
            }
        },
        methods: {
            handleClick(){}
        },
        mounted() {}
    }
</script>

