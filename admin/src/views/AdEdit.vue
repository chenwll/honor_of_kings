<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form  @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
      <el-row type="flex" sytle="flex-wrap：wrap" class="lineWrap">
        <el-col :md="12" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="名称">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="URL链接">
            <el-input v-model="item.url" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="图片" label-width="120px">
            <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item,'icon',res.url)"
                :before-upload="beforeAvatarUpload">
              <img v-if="item.image" :src="item.image" class="avatar" alt="">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="item.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="小提示">
            <el-input v-model="item.tips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="model.items.splice(0,1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdEdit",
  props:{
    id:{}
  },
  data(){
    return {
      model:{
        items:[]
      },
      parents:[],
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  },
  methods:{
    async save(){
      let res
      if(this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model)
      }else {
        res = await this.$http.post(`/rest/ads`,this.model)
      }
      console.log(res)
      this.$router.push('/ads/list')
      this.$message({
        type:'success',
        message:'保存成功',
      })
    },

    async fetch(){
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      this.model = Object.assign({},this.model, res.data)
    },

    async fetchParents(){
      const res = await this.$http.get(`/rest/ads`)
      this.parents = res.data
    }
  }
}
</script>

<style scoped>

</style>
