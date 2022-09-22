import Vue from 'vue'
import VueRouter from 'vue-router'
import MainVue from "@/views/MainVue";
import HelloWorld from "@/components/HelloWorld";

import CategoryEdit from "@/views/CategoryEdit";
import CategoryList from "@/views/CategoryList";

import ItemEdit from "@/views/ItemEdit";
import ItemList from "@/views/ItemList";

import HeroEdit from "@/views/HeroEdit";
import HeroList from "@/views/HeroList";


Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: MainVue,
            name:'mainVue',
            children:[
                {path:'/categories/create',component:CategoryEdit},
                {path: '/categories/edit/:id',component:CategoryEdit, props: true},
                {path: '/categories/list',component:CategoryList},

                {path:'/items/create',component:ItemEdit},
                {path: '/items/edit/:id',component:ItemEdit, props: true},
                {path: '/items/list',component:ItemList},

                {path:'/heroes/create',component:HeroEdit},
                {path: '/heroes/edit/:id',component:HeroEdit, props: true},
                {path: '/heroes/list',component:HeroList},



            ]
        },
        {
            path: '/hello',
            component: HelloWorld,
            name:'hello'
        },
    ]
})


