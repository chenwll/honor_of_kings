<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form  @submit.native.prevent="save">

      <el-form-item label="所属分类">
<!--        双向绑定到Model的name上去-->
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题" label-width="120px">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" label-width="120px">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {VueEditor} from 'vue2-editor'

export default {
  name: "CategoryEdit",
  components:{
    VueEditor
  },
  props:{
    id:{}
  },
  data(){
    return {
      model:{},
      categories:[],
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods:{
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    async save(){
      let res
      if(this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
      }else {
        res = await this.$http.post(`/rest/articles`,this.model)
      }
      console.log(res)
      this.$router.push('/articles/list')
      this.$message({
        type:'success',
        message:'保存成功',
      })
    },

    async fetch(){
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },

    async fetchCategories(){
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    }
  }
}
</script>

<style scoped>

</style>
