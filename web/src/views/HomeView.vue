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
    <!-- end of swiper -->

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
    <!-- end of nav icons -->

    <div>
<!--      <div class="nav d-flex">-->
<!--        <div class="card-header d-flex ai-center">-->
<!--          <i class="iconfont icon-menu1"></i>-->
<!--          <div class="fs-xxl flex-1 px-2">新闻资讯</div>-->
<!--          <i class="iconfont icon-menu"></i>-->
<!--        </div>-->
<!--      </div>-->
      <m-card icon="menu1" title="新闻资讯">
        <div class="card-body pt-3">
          <div class="nav jc-between">
            <div class="nav-item active">
              <div class="nav-link">热门</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">新闻</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">新闻</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">新闻</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">新闻</div>
            </div>
          </div>
        </div>
        <swiper class="pt-2">
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>夏日新版本“禾下星之对”</span>
              <span>06/02</span>
            </div>
          </swiper-slide>
        </swiper>
      </m-card>
    </div>
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
      newsCats: [],
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
