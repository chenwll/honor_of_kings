import Vue from 'vue'
import VueRouter from 'vue-router'
import MainVue from "@/views/MainVue";
import HelloWorld from "@/components/HelloWorld";
import CategoryEdit from "@/views/CategoryEdit";
import CategoryList from "@/views/CategoryList";


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
            ]
        },
        {
            path: '/hello',
            component: HelloWorld,
            name:'hello'
        },
    ]
})


