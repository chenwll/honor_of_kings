<template>
  <div class="home">
    <swiper>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>


    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <div>
    </div>
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
            tag="div"
            :to="`articles/${news._id}`"
            class="py-2 fs-lg d-flex"
            v-for="(news,i) in category.newsList"
            :key="i"
        >
          <span>[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-ellipsis text-dark-1">{{news.title}}</span>
          <span>{{news.createdAt|date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
              tag="div"
              :to="`/heroes/${hero._id}`"
              class="p-2 text-center"
              style="width: 20%;"
              v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100" alt="">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  name: 'HomeView',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats:[],
      heroCats: [],
    };
  },

  methods:{
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data;
    },
    async fetchHeroesCats(){
      const res = await this.$http.get('heroes/list')
      console.log(res.data,'hero')
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroesCats()
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons{
  .nav-item{
    width:25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
