 { "order_column":"","order_by":"desc"}

   this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {})


列表页面 （参考 views/account/CustomerAccounts.vue）

筛选框

示例代码

            <el-col :span="24"  class="toolbar" style="padding-bottom: 0px; ">
                <el-form :inline="true" :model="filters" ref="filtersFrom" size="medium">
                    <el-form-item prop="account_no">
                        <el-input placeholder="MT4账号" v-model="filters.account_no"></el-input>
                    </el-form-item >
                    <el-form-item prop="name">
                        <el-input placeholder="客户姓名" v-model="filters.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getAccounts(1)" size="small">查询</el-button>
                        <el-button  @click="resetForm('filtersFrom')" size="small">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-col>


  注意：
  筛选框必须有清空按钮
   @click="getAccounts(1)" // 这里传1是重置 page_no
  el-col 必须有 class="toolbar"
  el-form  必须有 ref="filtersFrom"
  el-form-item  必须有 prop="字段名字" //作用是重置表单


  表格

  示例代码

   <el-table
                  :data="accounts"
                  stripe
                  v-loading="listLoading"
                  style="width: 100%">
    说明
    v-loading 是表格的加载样式
    data(){
      return {
        listLoading =false
        }
    }
    methods{
        getList(){
            listLoading = true  //显示loading
            ajax().then(){
                if (data.status == 200){
                    listLoading = false //隐藏loading
                }
            }
        }
    }


   翻页


    示例代码

   <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.page_size"
                    :current-page="pager.page_no"
                    :page-sizes="pager.sizes"
                    background
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>
    </el-col>

    对应数据
    data(){
        return{
              pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
        }
    }

     methods{
          //清空筛选表单
          resetForm(formName) {
              this.$refs[formName].resetFields();
          },

          //分页pageSize发生改变
          handleSizeChange(val) {
              this.pager.page_no = 1;
              this.pager.page_size = val;
              this.handlePagerChange();
          },

          //分页currentPage发生改变
          handleCurrentChange(val) {
              this.pager.page_no = val;
              this.handlePagerChange();
          },

          //分页引起的页面数据更改
          handlePagerChange()
          {
              this.getAccounts();
          }
    }