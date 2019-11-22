<template>
  <div class="page-body">
    <div class="page-header">
      <h3 class="page-title"><span style="font-size: 25px">预约信息</span></h3>
    </div>
    <div class="box">
      <div class="block">
        <span class="demonstration">选择时间段查询</span>
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right">
        </el-date-picker>
        <m-button size="small" type="success" @click="searchByDate()" plain>查询</m-button>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="ID" prop="appoId" width="80"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="医生姓名" prop="adminName"></el-table-column>
        <el-table-column label="预约时间" prop="appoTime" :formatter="dateFormat"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" :formatter="dateFormat"></el-table-column>
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
        data() {
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value4: '',
                tableData: [],
                currentPage:1,
                pagesize:5,
            }
        },
        methods: {
            //权限判断
            judAuthority() {
                if (sessionStorage.getItem('u') != 3) {
                    this.$message.warning('用户权限不足')
                    return false
                } else {
                    return true
                }
            },
            //时间格式化
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
            //分页
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },
            //根据时间段查询
            searchByDate(){
                this.axios.get('back/appointment/findAllNoBedByDatetime?startTime='+this.value4[0]+'&endTime='+this.value4[1]
                    ).then((res) =>{
                        console.log(res)
                        console.log(this.value4)
                        this.tableData=res
                })
            },

            findAll() {
                if (this.judAuthority()) {
                    axios.get('/back/appointment/findAllNoBed').then((res) => {
                        this.tableData = res
                    })
                }
            },
        },
        mounted:{

        },
        created() {
            if (sessionStorage.getItem('u') != 3) {
                this.$message.warning('用户权限不足')
                return false
            }
            axios.get('/back/appointment/findAllNoBed').then((res) => {
                this.tableData = res
            })
        }
    }
</script>
