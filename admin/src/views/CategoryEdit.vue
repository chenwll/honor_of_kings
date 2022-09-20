<template>
  <div class="about">
    <h1>新建分类</h1>
    <el-form  @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
<!--        双向绑定到Model的name上去-->
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  data(){
    return {
      model:{}
    }
  },
  methods:{
    async save(){
      const res = await this.$http.post('categories',this.model)
      console.log('res',res,'res')
      this.$router.push('/categories/list')
      this.$message({
        type:'success',
        message:'保存成功',
      })
    }
  }
}
</script>

<style scoped>

</style>
