<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title"><span style="font-size: 25px">疾病信息</span><m-button type="success"style="float: right" plain @click="dialogVisible = true">新增病例</m-button></h3>

    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="疾病名称" prop="diseaseName">
          <el-input v-model="ruleForm.diseaseName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
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
        :data="tableData"
      >
        <el-table-column label="ID" prop="medicineId" width="80"></el-table-column>
        <el-table-column label="疾病名称" prop="medicineName"></el-table-column>
      </el-table>
    </div>
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
        dialogVisible: false,
        tableData: [],
        ruleForm: {
            diseaseId:'',
          diseaseName: '',
        },
        rules: {
            diseaseName: [
            { required: true, message: '请输入疾病名称', trigger: 'blur' }
          ],
        }

      }
    },
    methods: {
      findAll () {
        axios.get('/back/disease/findAll').then((res) => {
            console.log(res)
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
              this.$confirm('确认添加？').then(_ =>{
                  axios.put('/back/disease/insert',
                      {'diseaseName': this.ruleForm.diseaseName}).then((res) => {
                      if (res <= 0) {
                          this.$message.error('添加失败')
                      } else {
                          this.$message.success('添加成功')
                          this.dialogVisible = false
                          this.findAll()
                          this.reset()
                      }
                  })
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
        reset(){
            this.ruleForm={
                diseaseId:'',
                diseaseName: '',
            }
        },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
    created () {
          alert("aaa")
      axios.get('/back/disease/findAll').then((res) => {
          alert('jjj')
        this.tableData = res
      })
    }
  }
  }
</script>
