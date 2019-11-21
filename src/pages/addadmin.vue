<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title"><span style="font-size: 25px">管理员管理</span><m-button type="success"style="float: right" plain @click="dialogVisible = true,dialogType = 1,this.resetForm('ruleForm')">新增管理员</m-button></h3>

    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    @close="findAll">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">



        <el-form-item label="管理员账户" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="adminName">
          <el-input v-model="ruleForm.adminName"></el-input>
        </el-form-item>
        <el-form-item label="管理员地址" prop="address">
          <el-input v-model="ruleForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="deptId">
          <el-select v-model="ruleForm.deptId"   placeholder="请选择部门"  >
            <el-option v-for="n in deptList" :label="n.deptName" :value="n.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" :label-width="formLabelWidth" prop="levelId">
          <el-select v-model="ruleForm.levelId"   placeholder="请选择职称"  >
            <el-option v-for="n in levelList" :label="n.levelName" :value="n.levelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" :label-width="formLabelWidth" prop="nationId">
          <el-select v-model="ruleForm.nationId"   placeholder="请选择民族"  >
            <el-option v-for="n in nationList" :label="n.nationName" :value="n.nationId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员手机" prop="phoneNum">
          <el-input v-model="ruleForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio-group v-model="ruleForm.sex" >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="dialogType == 1">确认添加</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="dialogType == 0">确认修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
    <div class="box">
      <el-table
        :data="
tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column label="id" prop="adminId"></el-table-column>
        <el-table-column label="管理员账户" prop="account"></el-table-column>
        <el-table-column label="管理员姓名" prop="adminName"></el-table-column>
        <el-table-column label="管理员地址" prop="address"></el-table-column>
        <el-table-column label="管理员部门" prop="deptName"></el-table-column>
        <el-table-column label="管理员职称" prop="levelName"></el-table-column>
        <el-table-column label="管理员民族" prop="nationName"></el-table-column>
        <el-table-column label="管理员手机" prop="phoneNum"></el-table-column>
        <el-table-column label="管理员性别" prop="sex"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="update(scope.row.adminId)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteuser(scope.row.medicineId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row style="background-color: white" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length" style="float:right;">
      </el-pagination>
    </el-row>
  </div>


</template>
<style>
  .box-body {
    width: 100%;
    overflow: auto;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        dialogVisible: false,
        dialogType: '1',
        tableData: [],
        ruleForm: {},
        rules: {
          account:[
            { required: true, message: '请输入管理员姓名', trigger: 'blur' }
          ],
          adminName: [
            { required: true, message: '请输入管理员姓名', trigger: 'blur' }
          ],
          deptId:[
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          address:[
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          levelId:[
            { required: true, message: '请选择职称', trigger: 'blur' }
          ],
          NationId:[
            { required: true, message: '请输入民族', trigger: 'blur' }
          ],
          phoneNum:[
            { required: true, message: '请输入手机', trigger: 'blur' }
          ],
          sex:[
            { required: true, message: '请输入性别', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },

      findAll () {
        axios.get('/back/admin/findadmin3').then((res) => {
          this.tableData = res
        })
      },
      handleClose (done) {
        this.reset();
        done()

      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.dialogType==1){
              axios.post('/back/admin/insert3',this.ruleForm).then((res) => {
                if (res <= 0) {
                  this.$message.error('添加失败')
                } else {
                  this.$message.success('添加成功')
                  this.dialogVisible = false
                  this.findAll()
                  this.reset()
                }
              })
            }
            if(this.dialogType==0){
              axios.post('/back/admin/updateById3',this.ruleForm).then((res) => {
                if(res>0){
                  this.$message.success('修改成功')
                  this.dialogVisible = false
                  this.reset()
                  this.findAll()
                }else{
                  this.$message.error('修改失败')
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      reset(){
        this.ruleForm={

        }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      update (id) {
        this.dialogVisible = true
        this.dialogType=0
        let data=this.tableData;
        for( let i in data){
          if(data[i].adminId==id){
            this.ruleForm=data[i];
          }
        }
        this.$refs['form'].resetFields();
      },
      deleteuser (id) {
        this.$confirm('确定删除？').then(_ => {
          axios.post('back/medicine/delById/' + id).then((res) => {
            if (res <= 0) {
              this.$message.error('删除失败')
            } else {
              this.$message.success('删除成功')
              this.findAll()
            }
          })
        }).catch(_ => {})
      }
    },
    created () {
      this.findAll();
      this.axios.get('/back/nation/all')
        .then((data) => {
          console.log(data)
          this.nationList = data
        })
      this.axios.get('/back/dept/all')
        .then((data) => {
          console.log(data)
          this.deptList = data
        })
      this.axios.get('/back/level/all')
        .then((data) => {
          console.log(data)
          this.levelList = data
        })
    }
  }
</script>
