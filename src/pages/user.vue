<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title">用户信息</h3>
    </div>
    <div class="box">
      <el-table
        :data="tableData"
      >
        <el-table-column label="ID" prop="userId" width="80"></el-table-column>
        <el-table-column label="账户" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="手机号码" prop="phoneNum"></el-table-column>
        <el-table-column label="身份证号" prop="creditNum"></el-table-column>
        <el-table-column label="民族" prop="nationName"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="update(scope.row.user_id)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteuser(scope.row.user_id)" type="text" size="small">删除</el-button>
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
  export default {
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      update (id) {
        alert(id)
      },
      deleteuser (id) {
        alert('删除' + id)
      }
    },
    created () {
      this.axios.get('/api/user/all')
        .then((data) => {
          console.log(data)
          this.tableData = data
        })
    }
  }

</script>
