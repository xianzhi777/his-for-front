<template>
  <div class="page-body">
    <div class="page-header" >
      <h3 class="page-title">用户信息<m-button type="success" @click="addDialog"  round style="float: right;font-size: small">添加用户</m-button></h3>
    </div>
    <div class="box">
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="ID" prop="userId" width="80"></el-table-column>
        <el-table-column label="账户" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="手机号码" prop="phoneNum"></el-table-column>
        <el-table-column label="身份证号" prop="creditNum"></el-table-column>
        <el-table-column label="民族" prop="nationName"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="余额" prop="balance"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" :formatter="dateFormat"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="showinfo(scope.row.userId)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteuser(scope.row.userId)" type="text" size="small">删除</el-button>
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
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" @close="showList">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="creditNum">
          <el-input v-model="form.creditNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="民族" :label-width="formLabelWidth" prop="nationId">
          <el-select v-model="form.nationId"   placeholder="请选择民族"  @change="changeName">
            <el-option v-for="n in nationList" :label="n.nationName" :value="n.nationId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="余额" :label-width="formLabelWidth" prop="balance">
          <el-input v-model.number="form.balance" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth" v-if="!saveOrUpd">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.createTime" style="width: 100%;" disabled></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button type="primary" @click="addUser('form')" v-if="saveOrUpd">添加</el-button>
        <el-button type="primary" @click="updUser('form')" v-else>修改</el-button>
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
      const validateAcquaintance = (rule, value, callback) => {
          if (!value) {
            callback(new Error('必须输入数字'))
          }
          value = Number(value)
          if (typeof value === 'number' && !isNaN(value)) {
            if (value < 0 ) {
              callback(new Error('必须大于0'))
            } else {
              callback()
            }
          } else {
            callback(new Error('必须为数字'))
          }
        }
      return {
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        tableData: [],
        nationList:[],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form:{},
        saveOrUpd:false,
        rules: {
          account: [
            { required: true, message: '请输入账户', trigger: 'blur' },
          ],
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { type: 'number', message: '年龄必须为数字值',trigger: 'blur'}
          ],
          creditNum: [
            {  required: true, message: '请输入身份证号', trigger: 'blur' }
          ],
          sex: [
            {  required: true, message: '请选择性别', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          balance: [
            { type: 'number', message: '余额必须为数字值', trigger: 'blur'},
            {validator: validateAcquaintance,trigger: 'blur'}
          ],
          nationId: [
            { required: true, message: '请选择民族', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      dateFormat:function(row,column){
        var t=new Date(row.createTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        var year=t.getFullYear(),
          month=t.getMonth()+1,
          day=t.getDate(),
          hour=t.getHours(),
          min=t.getMinutes(),
          sec=t.getSeconds();
        var newTime=year+'-'+
          (month<10?'0'+month:month)+'-'+
          (day<10?'0'+day:day)+' '+
          (hour<10?'0'+hour:hour)+':'+
          (min<10?'0'+min:min)+':'+
          (sec<10?'0'+sec:sec);
        return newTime;
      },handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },
      addDialog(){
        this.dialogFormVisible = true
        this.saveOrUpd=true;
        this.form={};
        this.$refs['form'].resetFields();
      },
      showinfo (id) {
        this.dialogFormVisible = true
        this.saveOrUpd=false
        let data=this.tableData;
       for( let i in data){
         if(data[i].userId==id){
           this.form=data[i];
         }
       }
        this.$refs['form'].resetFields();
      },
      showList(){
        this.axios.get('/back/user/all')
          .then((data) => {
            console.log(data)
            this.tableData = data
          })
      },
      changeName(id){
        let data=this.nationList;
        for( let i in data) {
          if (data[i].nationId == id) {
            this.form.nationName = data[i].nationName;
          }
        }
      },
      deleteuser (id) {

        if(confirm("确定要删除嘛？")){
          this.axios.delete('/back/user/del/'+id)
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
      updUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.put('/back/user/upd',this.form)
              .then((data) => {
                this.dialogFormVisible = false
                if(data==1){
                  this.$message.success('修改成功')
                }else{
                  this.$message.error('修改失败')
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/back/user/add',this.form)
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created () {
      this.axios.get('/back/user/all')
        .then((data) => {
          console.log(data)
          this.tableData = data
        })
      this.axios.get('/back/nation/all')
        .then((data) => {
          console.log(data)
          this.nationList = data
        })
    }
  }

</script>
