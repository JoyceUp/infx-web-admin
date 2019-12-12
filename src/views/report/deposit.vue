<template>

    <el-col >
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="客户入金流量表" name="customerDeposit">
                <deposit_customer></deposit_customer>
            </el-tab-pane>
            <el-tab-pane label="代理入金流量表" name="ibDeposit">
                <deposit_ib></deposit_ib>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    import deposit_customer from "./deposit_customer";
    import deposit_ib from "./deposit_ib";
    export default {
        name: "deposit",
        components: {
            deposit_customer,
            deposit_ib
        },
        data() {
            return {
                //当前tab的名称
                activeName: "customerDeposit",
            };
        },
    }
</script>

<style scoped>

</style>