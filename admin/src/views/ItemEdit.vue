<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form  @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
<!--        双向绑定到Model的name上去-->
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标" label-width="120px">
        <!--        双向绑定到Model的name上去-->
        <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
            :headers="getAuthHeaders()"
            :before-upload="beforeAvatarUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  name: "ItemEdit",
  props:{
    id:{}
  },
  data(){
    return {
      model:{},
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
        res = await this.$http.put(`/rest/items/${this.id}`, this.model)
      }else {
        res = await this.$http.post(`/rest/items`,this.model)
      }
      console.log(res)
      this.$router.push('/items/list')
      this.$message({
        type:'success',
        message:'保存成功',
      })
    },

    async fetch(){
      const res = await this.$http.get(`/rest/items/${this.id}`)
      this.model = res.data
    },

    async fetchParents(){
      const res = await this.$http.get(`/rest/items/`)
      this.parents = res.data
    },
    //element

    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M;
    },

    async afterUpload(res){
      console.log(res.url,'res')
      this.$set(this.model,'icon',res.url)
      // this.model.icon = res.url
    },
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
