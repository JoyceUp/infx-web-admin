<template>
    <section>
        <el-table :data="relations" stripe style="width: 100%" size="small">
            <el-table-column :label="$t('lang.full_name') || '客户姓名'"><template slot-scope="scope"> <span>{{isNull(scope.row.full_name)}}</span></template></el-table-column>
            <!--<el-table-column label="客户账号"><template slot-scope="scope"> <span>{{isNull(scope.row.account_no)}}</span></template></el-table-column>-->
            <!--<el-table-column label="账户类型"><template slot-scope="scope"> <span>{{ changeStatus(scope.row.account_type, accountTypeOptions) }}</span></template></el-table-column>-->
            <!--<el-table-column label="账户状态"><template slot-scope="scope"> <span>{{ changeStatus(scope.row.state, stateOptions) }}</span></template></el-table-column>-->
            <!--<el-table-column label="上级账号"><template slot-scope="scope"> <span>{{isNull(scope.row.parnet_account_no)}}</span></template></el-table-column>-->
            <el-table-column :label="$t('lang.parent_name') || '上级姓名'"><template slot-scope="scope"> <span>{{isNull(scope.row.parent_full_name)}}</span></template></el-table-column>
            <el-table-column :label="$t('lang.sales_account_no') || '销售账号'"><template slot-scope="scope"> <span>{{isNull(scope.row.sales_account_no)}}</span></template></el-table-column>
            <el-table-column :label="$t('lang.sales_name') || '销售姓名'"><template slot-scope="scope"> <span>{{isNull(scope.row.sales_full_name)}}</span></template></el-table-column>
        </el-table>

    </section>
</template>
<script>
    import {relationCustomersList} from '../../../api/customers_api';
    import {isBirthDate, isNull} from '../../../common/js/commons';
    import dict from '../../../common/js/dict';

    export default {
        data() {
            return {
                total:0,
                page_no:1,
                page_size:10,
                order_column: "",
                order_by: "",
                relations: [{
                    id: '',
                    full_name: '',//客户姓名
                    account_no: '',//客户账号
                    account_type: '',//账户类型
                    state: '',//账户状态
                    parnet_account_no: '',//上级账号
                    parent_full_name: '',//上级姓名
                    sales_account_no: '',//销售账号
                    sales_full_name: '',//销售姓名
                }],
                //accountTypeOptions: dict.account_type,
                stateOptions: dict.account_state
            }
        },
        methods: {
            getUserInfoDetail() {
                let condition = {};
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "",
                    order_by: "",
                    page_size: this.page_size,
                    page_no: this.page_no
                };
                relationCustomersList(params).then((res) => {
                    if (res.data.status == 200) {
                        let result = JSON.parse(res.data.datas);
                        if(result != null){
                            this.relations = result.items;
                            this.page_size = result.page_size;
                            this.page_no = result.page_no;
                            this.total = result.total;
                        }
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            isNull(val){
                return isNull(val);
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
        },
        mounted()
        {
            this.$nextTick(function(){
                this.getUserInfoDetail();
            })
        }
    }
</script>
<style lang="scss" scoped>
    .el-row {
        text-align: right;
    }
    .el-row {
        margin-bottom: 2px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
