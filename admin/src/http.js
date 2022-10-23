import axios from 'axios'
import Vue from 'vue'
import router from "./router";

const http = axios.create({
    baseURL:process.env.VUE_APP_API_URL||'/admin/api',
    // baseURL:"http://localhost:3000/admin/api"
})

// 加请求头
http.interceptors.request.use(function (config) {
    console.log('请求头')
    // Do something before request is sent
    console.log(localStorage.token,'token')
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 加拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    console.log('拦截err',err)
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
    }

    if(err.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(err);
})
export default http
