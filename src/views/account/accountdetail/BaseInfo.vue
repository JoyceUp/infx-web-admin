<template>
    <section>
        <el-form label-width="100px" :model="data">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="MT4账号wwww">
                        <label>{{datas.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="MT4账号">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="创建时间">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账户状态">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>


            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户姓名">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户性别">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="证件类型">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号码">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="国家">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="城市">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="国家">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="城市">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="居住地址">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮政编码">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="电子邮箱">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号码">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="代理账号">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代理姓名">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="销售编号">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="销售姓名">
                        <label>{{data.account}}</label>
                    </el-form-item>
                </el-col>

            </el-row>

        </el-form>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                data: {
                    account: "000000"
                }
            }
        }
    }
</script>

<style>
    .title {
        text-align: right;
        padding: 5px;
    }

    .value {
        text-align: left;
        padding: 5px;
    }
</style>