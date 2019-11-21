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
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column label="ID" prop="diseaseId" width="80"></el-table-column>
        <el-table-column label="疾病名称" prop="diseaseName"></el-table-column>
      </el-table>
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
          currentPage:1,
          pagesize:5,
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
      mounted(){
        this.findAll()
      },
      watch:{
          '$route':'findAll'
      },
    methods: {
        //权限判断
        judAuthority(){
            if(sessionStorage.getItem('u') !=3 ){
                this.$message.warning('用户权限不足')
                return false
            }else{
                return true
            }
        },
        //分页
        handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
        },

      findAll () {
            if(this.judAuthority()){
                axios.get('/back/disease/findAll').then((res) => {
                    console.log(res)
                    this.tableData = res
                })
            }
      },
      handleClose (done) {
          this.resetForm('ruleForm');
            done()

      },
      submitForm (formName) {
            if(this.judAuthority()){
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
                                    this.resetForm('ruleForm')
                                }
                            })
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
    /*created () {
          alert("aaa")
      axios.get('/back/disease/findAll').then((res) => {
          alert('jjj')
        this.tableData = res
      })
    }*/
  }
  }
</script>
