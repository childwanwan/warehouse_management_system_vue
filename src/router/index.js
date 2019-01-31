import Vue from 'vue'
import Router from 'vue-router'

import Scan from '../components/Scan'
import Register from '../components/Register'
import Index from "../components/Index";
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path:'/scan', component:Scan},     // 扫一扫登入
    {path:'/register', component:Register},         // 注册
  ]
})
