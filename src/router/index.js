import Vue from 'vue'
import Router from 'vue-router'

import Scan from '../components/Scan'
import Register from '../components/Register'
import Index from "../components/Index"
import Wms_manager_home from '../components/Wms_manager_home'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path:'/scan', component:Scan},     // 扫一扫登入
    {path:'/register', component:Register},         // 注册
    {path:'/wms_manager_home', component:Wms_manager_home},         // 注册
  ]
})
