<template>
    <section>
        <el-col :span="1" :push="22" style="margin-top: -1%">
            <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
        </el-col>
        <el-col>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="用户信息" name="userInfo"><div><agent-user-info :agent_id="agent_id"></agent-user-info></div></el-tab-pane>
                <el-tab-pane label="账户信息" name="accountInfo"><div><agent-account-info :agent_id="agent_id"></agent-account-info></div></el-tab-pane>
                <el-tab-pane label="客户信息" name="baseInfo"><div><agent-base-info :agent_id="agent_id"></agent-base-info></div></el-tab-pane>
                <el-tab-pane label="资金信息" name="moneyInfo"><div><agent-money-info :agent_id="agent_id"></agent-money-info></div></el-tab-pane>
                <el-tab-pane label="沟通信息" name="communicationInfo"><div><agent-communication-info :agent_id="agent_id"></agent-communication-info></div></el-tab-pane>
                <br/><br/><br/><br/><br/><br/><br/>
            </el-tabs>
        </el-col>
    </section>


</template>
<style>

</style>
<script>
    import {getAgentInfo} from '../../api/agent_api';
    import {formatDate} from '../../common/js/date';
    import dict from '../../common/js/dict';

    import agentUserInfo from './tabs/AgentUserInfo'
    import agentBaseInfo from './tabs/AgentBaseInfo'
    import agentAccountInfo from './tabs/AgentAccountInfo';
    import agentMoneyInfo from './tabs/AgentMoneyInfo';
    import agentCommunicationInfo from './tabs/AgentCommunicationInfo';

    export default {
        components:{
            'agent-user-info':agentUserInfo,
            'agent-base-info': agentBaseInfo,
            'agent-account-info':agentAccountInfo,
            'agent-money-info':agentMoneyInfo,
            'agent-communication-info':agentCommunicationInfo
        },
        //父页面传来的数据
        props:['agent_id'],
        data() {
            return {
                activeName: 'userInfo',
            }
        },
        methods:{
            handleClick(){}
        },
        mounted(){}
    }
</script>
<style lang="scss" scoped>
</style>
