<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title">用户信息</h3>
    </div>
    <div class="box">
      <el-table
        :data="tableData"
      >
        <el-table-column label="ID" prop="deptId" width="80"></el-table-column>
        <el-table-column label="部门" prop="deptName"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="update(scope.row.deptId)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteuser(scope.row.deptId)" type="text" size="small">删除</el-button>
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
          deptId: '1',
          deptName: '骨科'
        }, {
          deptId: '2',
          deptName: '外科'
        }
        ]
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
