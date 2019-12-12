<template>

    <el-col >
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="客户转账流量表" name="customerTransfer">
                <transfer_customer></transfer_customer>
            </el-tab-pane>
            <el-tab-pane label="代理转账流量表" name="ibTransfer">
                <transfer_ib></transfer_ib>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    import transfer_customer from "./transfer_customer";
    import transfer_ib from "./transfer_ib";
    export default {
        name: "transfer",
        components: {
            transfer_customer,
            transfer_ib
        },
        data() {
            return {
                //当前tab的名称
                activeName: "customerTransfer",
            };
        },
    }
</script>

<style scoped>

</style>