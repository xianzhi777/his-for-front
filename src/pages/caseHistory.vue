<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title">病历信息</h3>
    </div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
      >
        <el-table-column label="ID" prop="chId" width="80" sortable></el-table-column>
        <el-table-column label="病人姓名" prop="userName" sortable></el-table-column>
        <el-table-column label="主治医生" prop="adminName" sortable></el-table-column>
        <el-table-column label="诊治时间" prop="createTime" sortable :formatter="dateFormat"></el-table-column>
        <el-table-column label="疾病名称" prop="diseaseName" sortable></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row.chId)" type="text" size="small">详情</el-button>
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
    <el-dialog title="详情" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form"  ref="form">
          <el-form-item label="使用药品:" v-if="form.medicineName">
            <span>{{ form.medicineName }}x{{ form.useCount }}</span>
          </el-form-item>
          <el-form-item label="手术:" v-if="form.oprName">
            <span>{{ form.oprName }}</span>
          </el-form-item>
          <el-form-item label="描述:">
            <span>{{ form.description }}</span>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">关闭</el-button>
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
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        dialogFormVisible:false
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
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },
      showDetail (id) {
        this.dialogFormVisible = true
        let data=this.tableData;
        for( let i in data) {
          if (data[i].chId == id) {
            this.form = data[i];
          }
        }
      },
      showList(){
        this.axios.get("/back/ch/all").
        then((data) => {
          console.log(data)
          this.tableData = data})
      },
    },
    created () {
      this.axios.get("/back/ch/all").
      then((data) => {
        console.log(data)
        this.tableData = data})
    }
  }

</script>
