<template>

    <el-col >
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="客户出入金汇总表" name="customerSum">
                <sum_customer></sum_customer>
            </el-tab-pane>
            <el-tab-pane label="代理出入金汇总表" name="ibSum">
                <sum_ib></sum_ib>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    import sum_customer from "./sum_customer";
    import sum_ib from "./sum_ib";
    export default {
        name: "sum",
        components: {
            sum_customer,
            sum_ib
        },
        data() {
            return {
                //当前tab的名称
                activeName: "customerSum",
            };
        },
    }
</script>

<style scoped>

</style>