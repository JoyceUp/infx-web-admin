<template>

    <el-col >
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="客户账户余额表" name="customerBalance">
                <balance_customer></balance_customer>
            </el-tab-pane>
            <el-tab-pane label="代理账户余额表" name="ibBalance">
                <balance_ib></balance_ib>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    import balance_customer from "./balance_customer";
    import balance_ib from "./balance_ib";
    export default {
        name: "balance",
        components: {
            balance_customer,
            balance_ib
        },
        data() {
            return {
                //当前tab的名称
                activeName: "customerBalance",
            };
        },
    }
</script>

<style scoped>

</style>