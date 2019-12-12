<template>

    <el-col >
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="客户出金流量表" name="customerWithdraw">
                <withdraw_customer></withdraw_customer>
            </el-tab-pane>
            <el-tab-pane label="代理出金流量表" name="ibWithdraw">
                <withdraw_ib></withdraw_ib>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    import withdraw_customer from "./withdraw_customer";
    import withdraw_ib from "./withdraw_ib";
    export default {
        name: "withdraw",
        components: {
             withdraw_customer,
            withdraw_ib
        },
        data() {
            return {
                //当前tab的名称
                activeName: "customerWithdraw",
            };
        },
    }
</script>

<style scoped>

</style>