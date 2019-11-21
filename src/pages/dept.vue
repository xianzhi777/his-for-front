<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title">部门信息<m-button type="success" @click="addDialog"  round style="float: right;font-size: small">添加部门</m-button></h3>
    </div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column label="ID" prop="deptId" width="80"></el-table-column>
        <el-table-column label="部门" prop="deptName"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteDept(scope.row.deptId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row style="background-color: white" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length" style="float:right;">
      </el-pagination>
    </el-row>
    <el-dialog title="部门信息" :visible.sync="dialogFormVisible" @close="showList">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
          <el-input v-model="form.deptName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button type="primary" @click="addDept('form')" >添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
  .box-body {
    width: 100%;
    overflow: auto;
  }
</style>
<script>
  export default {
    data () {
      return {
        tableData: [],
        form:{},
        dialogFormVisible:false,
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        rules: {
          deptName: [
            {required: true, message: '请输入部门信息', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      addDialog(){
        this.dialogFormVisible = true
        this.form={};
        this.$refs['form'].resetFields();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },
      deleteDept (id) {
        if(confirm("确定要删除嘛？")){
          this.axios.delete('/back/dept/del/'+id)
            .then((data) => {
              if(data==1){
                this.$message.success('删除成功')
                this.showList()
              }else{
                this.$message.error('删除失败')
              }
            })
        }
      },
      showList(){
        this.axios.get("/back/dept/all").
        then((data) => {
          console.log(data)
          this.tableData = data})
      },
      addDept(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/back/dept/add',this.form)
              .then((data) => {
                this.dialogFormVisible = false
                if(data==1){
                  this.$message.success('添加成功')
                }else{
                  this.$message.error('添加失败')
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created () {
      this.axios.get("/back/dept/all").
      then((data) => {
        console.log(data)
        this.tableData = data})
    }
  }

</script>
