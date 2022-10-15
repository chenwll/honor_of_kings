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
        <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats:[
        {
          name:"热门",
          newsList:new Array(5).fill(1).map(() => ({
            categoryName:'公告',
            title:'全服不停机更新公告',
            data:'06/01'
          }))
        },
        {
          name:'新闻',
          newsList:new Array(5).fill(1).map(() => ({
            categoryName:'公告',
            title:'全服不停机更新公告',
            data:'06/01'
          }))
        },
        {
          name:'公告',
          newsList:new Array(5).fill(1).map(() => ({
            categoryName:'公告',
            title:'全服不停机更新公告',
            data:'06/01'
          }))
        },
        {
          name:'活动',
          newsList:new Array(5).fill(1).map(() => ({
            categoryName:'公告',
            title:'全服不停机更新公告',
            data:'06/01'
          }))
        }

      ],
      heroCats: []
    };
  },
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
