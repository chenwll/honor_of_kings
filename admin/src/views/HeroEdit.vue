<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form  @submit.native.prevent="save">
      <el-tabs>
        <el-tab-pane label="基础信息" name="first">
          <el-form-item label="名称" label-width="120px">
            <!--        双向绑定到Model的name上去-->
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号" label-width="120px">
            <!--        双向绑定到Model的name上去-->
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="120px">
            <!--        双向绑定到Model的name上去-->
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像" label-width="120px">
            <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload"
                :before-upload="beforeAvatarUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar" alt="">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" sytle="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
      model:{
        avatar:'',
        name:'',
        items:[],
        skills:[],
        score:{
          difficult: 0,
        },
        items1:[],
        usageTips:"",
      },
      categories:[],
    }
  },
  created() {
    this.fetchParents()
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods:{
    async save(){
      let res
      if(this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      }else {
        res = await this.$http.post(`/rest/heroes`,this.model)
      }
      console.log(res)
      this.$router.push('/heroes/list')
      this.$message({
        type:'success',
        message:'保存成功',
      })
    },

    async fetch(){
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      // this.model = res.data
      //更推荐这种写法，覆盖的作用保证数据
      this.model = Object.assign({},this.model,res.data)
    },

    async fetchParents(){
      const res = await this.$http.get(`/rest/heroes`)
      this.parents = res.data
    },
    //element
    async fetchCategories(){
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    },
    async fetchItems(){
      const res = await this.$http.get(`/rest/items`)
      this.items = res.data
    },

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
      // this.$set(this.model,'avatar',res.url)
      this.model.avatar = res.url
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



<!--<el-form-item label="难度系数" label-width="120px">-->
<!--&lt;!&ndash;        双向绑定到Model的name上去&ndash;&gt;-->
<!--<el-rate :max="9" v-model="model.score.difficult" show-score></el-rate>-->
<!--</el-form-item>-->
<!--<el-form-item label="技能" label-width="120px">-->
<!--&lt;!&ndash;        双向绑定到Model的name上去&ndash;&gt;-->
<!--<el-rate :max="9" v-model="model.score.skills" show-score></el-rate>-->
<!--</el-form-item>-->
<!--<el-form-item label="攻击" label-width="120px">-->
<!--&lt;!&ndash;        双向绑定到Model的name上去&ndash;&gt;-->
<!--<el-rate :max="9" v-model="model.score.attack" show-score></el-rate>-->
<!--</el-form-item>-->
<!--<el-form-item label="生存" label-width="120px">-->
<!--&lt;!&ndash;        双向绑定到Model的name上去&ndash;&gt;-->
<!--<el-rate :max="9" v-model="model.score.survive" show-score></el-rate>-->
<!--</el-form-item>-->
<!--<el-form-item label="顺风出装" label-width="120px">-->
<!--<el-select v-model="model.items1" multiple>-->
<!--  <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--<el-form-item label="使用技巧" type="textarea" label-width="120px">-->
<!--<el-input v-model="model.usageTips"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="对抗技巧" type="textarea" label-width="120px">-->
<!--<el-input v-model="model.battleTips"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item label="团战思路" type="textarea" label-width="120px">-->
<!--<el-input v-model="model.teamsTips"></el-input>-->
<!--</el-form-item>-->
<!--<el-form-item>-->
<!--<el-button type="primary" native-type="submit">保存</el-button>-->
<!--<el-button>取消</el-button>-->
<!--</el-form-item>-->
