import Vue from 'vue'
import Router from 'vue-router'

import Scan from '../components/Scan'
import Register from '../components/Register'
import Index from "../components/Index"
import Wms_manager_home from '../components/Wms_manager_home'
import Houseware_manager_login_success from '../components/Houseware_manager_login_success'
import HousewareMessage from '../components/HousewareMessage'
import InstoreDetail from '../components/InstoreDetail'
import AddInstore from  '../components/AddInstore'
import AddOutstore from '../components/AddOutstore'
import AddDamage from '../components/AddDamage'
import DamageDetail from '../components/DamageDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path:'/scan', component:Scan},     // 扫一扫登入
    {path:'/register', component:Register},         // 注册
    {path:'/wms_manager_home', component:Wms_manager_home},         // 注册
    {path: '/houseware_manager_login_success', name: 'Houseware_manager_login_success', component: Houseware_manager_login_success},
    {path: '/HousewareMessage', name: 'HosewareMessage', component: HousewareMessage},

    {path: '/InstoreDetail', name: 'InstoreDetail', component: InstoreDetail},
    {path: '/AddInstore', name: 'AddInstore', component: AddInstore},
    {path: '/AddOutstore', name: 'AddOutstore', component: AddOutstore},
    {path: '/AddDamage', name: 'AddDamage', component: AddDamage},
    {path: '/DamageDetail', name: 'DamageDetail', component: DamageDetail},
  ]
})
