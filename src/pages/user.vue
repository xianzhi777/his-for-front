<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title">用户信息</h3>
    </div>
    <div class="box">
      <el-table
        :data="tableData"
      >
        <el-table-column label="ID" prop="user_id" width="80"></el-table-column>
        <el-table-column label="账户" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="手机号码" prop="phone_num"></el-table-column>
        <el-table-column label="身份证号" prop="id_num"></el-table-column>
        <el-table-column label="民族" prop="nation"></el-table-column>
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
        tableData: [{
          user_id: '1',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          user_id: '2',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          user_id: '3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          user_id: '4',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      update (id) {
        alert(id)
      },
      deleteuser (id) {
        alert('删除' + id)
      }
    }
  }

</script>
