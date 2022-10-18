<template>
  <m-card :icon="icon" :title="title">
    <div class="card-body pt-3">
      <div class="nav jc-between">
        <div class="nav-item" :class="{active:active === i}"
             v-for="(category,i) in categories" :key="i"
              @click="$refs.list.swiper.slideTo(i)"
        >
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <div>
        <swiper ref="list" class="pt-2" :options="{autoHeight:true}"
          @slide-change="()=>active=$refs.list.swiper.realIndex"
        >
          <swiper-slide  v-for="(category,i) in categories" :key="i"
            @click="$refs.list.swiper.slideTo(i)"
          >
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </m-card>
</template>

<script>
export default {
  name: "ListCard",
  props:{
    title:{type: String, required:true},
    categories:{type: Array, required:true},
    icon:{type:String, required:true},
  },

  data(){
    return {
      active: 0,
    }
  }

}
</script>

<style scoped>

</style>
