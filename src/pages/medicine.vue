<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title"><span style="font-size: 25px">药品信息</span><m-button type="success"style="float: right" plain @click="dialogVisible = true,dialogType = 1,this.resetForm('ruleForm')">添加新药</m-button></h3>

    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="药品名称" prop="medicineName">
          <el-input v-model="ruleForm.medicineName"></el-input>
        </el-form-item>
        <el-form-item label="设置库存" prop="medicineCount">
          <el-input v-model.number="ruleForm.medicineCount"></el-input>
        </el-form-item>
        <el-form-item label="设置价格" prop="medicinePrice">
          <el-input v-model.number="ruleForm.medicinePrice"></el-input>
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
        :data="tableData"
      >
        <el-table-column label="ID" prop="medicineId" width="80"></el-table-column>
        <el-table-column label="药品名称" prop="medicineName"></el-table-column>
        <el-table-column label="库存" prop="medicineCount"></el-table-column>
        <el-table-column label="价格" prop="medicinePrice"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="update(scope.row.medicineId)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteuser(scope.row.medicineId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
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
          dialogType: '1',
        tableData: [],
        ruleForm: {
            medicineId:'',
          medicineName: '',
          medicineCount: '',
          medicinePrice: '',
          flag: '1',
          status: '1'
        },
        rules: {
          medicineName: [
            { required: true, message: '请输入药品名称', trigger: 'blur' }
          ],
          medicineCount: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {type: 'number', message: '库存必须为数字值'}
          ],
          medicinePrice: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {type: 'number', message: '价格必须为数字值'}
          ]
        }

      }
    },
    methods: {
      findAll () {
        axios.get('/back/medicine/findAll').then((res) => {
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
                  axios.post('/back/medicine/insert',
                      {'medicineName': this.ruleForm.medicineName,
                          'medicineCount': this.ruleForm.medicineCount,
                          'medicinePrice': this.ruleForm.medicinePrice,
                          'flag': this.ruleForm.flag,
                          'status': this.ruleForm.status}).then((res) => {
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
                  axios.post('/back/medicine/updateById',{
                      'medicineId': this.ruleForm.medicineId,
                      'medicineName': this.ruleForm.medicineName,
                      'medicineCount': this.ruleForm.medicineCount,
                      'medicinePrice': this.ruleForm.medicinePrice,
                      'flag': this.ruleForm.flag,
                      'status': this.ruleForm.status
                  }).then((res) => {
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
                medicineId:'',
                medicineName: '',
                medicineCount: '',
                medicinePrice: '',
                flag: '1',
                status: '1'
            }
        },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      update (id) {
          this.dialogType=0
        axios.post('back/medicine/findById/' + id).then((res) => {
          this.dialogVisible = true
            this.ruleForm.medicineId =res.medicineId
            this.ruleForm.medicineName = res.medicineName
            this.ruleForm.medicineCount = res.medicineCount
            this.ruleForm.medicinePrice = res.medicinePrice
        })
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
      axios.get('/back/medicine/findAll').then((res) => {
        this.tableData = res
      })
    }
  }
</script>
