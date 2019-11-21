<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title">订单信息</h3>
    </div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
      >
        <el-table-column label="ID" prop="orderId" width="80" sortable></el-table-column>
        <el-table-column label="病人姓名" prop="userName" sortable></el-table-column>
        <el-table-column label="药品名称" prop="medicineName" sortable></el-table-column>
        <el-table-column label="药品数量" prop="count" sortable></el-table-column>
        <el-table-column label="药品单价" prop="medicinePrice" sortable></el-table-column>
        <el-table-column label="手术名称" prop="oprName" sortable></el-table-column>
        <el-table-column label="手术金额" prop="oprPrice" sortable></el-table-column>
        <el-table-column label="总金额" prop="totalPrice" sortable></el-table-column>
        <el-table-column label="创建时间" prop="createTime" sortable :formatter="dateFormat"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="delById(scope.row.orderId)" type="text" size="small">删除</el-button>
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
            findAll(){
                this.axios.get("/back/order/findAll").
                then((data) => {
                    console.log(data)
                    this.tableData = data})
            },
            delById (id) {
                this.$confirm('确认删除？').then(_ =>{
                    this.axios.delete("/back/order/delById/"+id).then(res=>{
                        console.log(res)
                        if(res>0){
                            this.$message.success("删除成功")
                            this.findAll()
                        }else{
                            this.$message.error("删除失败")
                        }
                    })
                })
            },

        },
        created () {
            this.axios.get("/back/order/findAll").
            then((data) => {
                console.log(data)
                this.tableData = data})
        }
    }

</script>
