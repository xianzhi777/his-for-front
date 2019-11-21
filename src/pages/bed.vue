<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title"><span style="font-size: 25px">床位信息</span><m-button type="success"style="float: right" plain @click="dialogVisible = true,this.resetForm('ruleForm')">新增床位</m-button></h3>

    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设置楼层" prop="floor">
          <el-input v-model="ruleForm.floor"></el-input>
        </el-form-item>
        <el-form-item label="设置编号" prop="bedNum">
          <el-input v-model="ruleForm.bedNum"></el-input>
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
        <el-table-column label="ID" prop="bedId" width="80"></el-table-column>
        <el-table-column label="楼层" prop="floor"></el-table-column>
        <el-table-column label="床位号" prop="bedNum"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteuser(scope.row.bedId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
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
            bedId:'',
          floor: '',
          bedNum: '',
          status: '1'
        },
        rules: {
            floor: [
            { required: true, message: '楼层不能为空', trigger: 'blur' }
          ],
            bedNum: [
            {required: true, message: '请输入内容', trigger: 'blur'},
          ]
        }
      }
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
          this.judAuthority()
        axios.get('/back/bed/findAll').then((res) => {
          this.tableData = res
        })
      },
      handleClose (done) {
            this.resetForm('ruleForm')
            done()
      },
      submitForm (formName) {
        if(this.judAuthority()){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.put('/back/bed/insert',
                        {'floor': this.ruleForm.floor,
                            'bedNum': this.ruleForm.bedNum,
                            'status': this.ruleForm.status}).then((res) => {
                        if (res <= 0) {
                            this.$message.error('添加失败')
                        } else {
                            this.$message.success('添加成功')
                            this.dialogVisible = false
                            this.resetForm('ruleForm')
                            this.findAll()
                        }
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
      deleteuser (id) {
         if(this.judAuthority()){
             this.$confirm('确定删除？').then(_ => {
                 axios.delete('back/bed/delById/' + id).then((res) => {
                     if (res <= 0) {
                         this.$message.error('删除失败')
                     } else {
                         this.$message.success('删除成功')
                         this.findAll()
                     }
                 })
             }).catch(_ => {})
         }
      }
    },
    created () {
        if(sessionStorage.getItem('u') !=3 ){
            this.$message.warning('用户权限不足')
            return false
        }
      axios.get('/back/bed/findAll').then((res) => {
        this.tableData = res
      })
    }
  }
</script>
