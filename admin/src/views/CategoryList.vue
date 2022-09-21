<template>
  <div class="about">
    <h1>分类列表</h1>
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
          label="分类名称"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click = "$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
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
      const res = await this.$http.get('categories')
      this.items = res.data;
    }
  }
}
</script>

<style>

</style>
