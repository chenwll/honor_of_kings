<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table
        :data="items"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="Id"
          width="220">
      </el-table-column>
      <el-table-column
          prop="name"
          label="英雄名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="avatar"
          label="头像"
          width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"  style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column
          prop="title"
          label="称号"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click = "$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click = "remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  props:{
  },
  data(){
    return {
      items:[]
    }
  },
  created(){
    this.fetch()
  },

  methods:{
    async fetch(){
      const res = await this.$http.get('/rest/heroes')
      this.items = res.data;
    },
    async remove(row){
      this.$confirm(`是否要删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          const res = await this.$http.delete(`/rest/heroes/${row._id}`)
          console.log(res,'delete');
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }

  }
}
</script>

<style>

</style>
