// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import axios from 'axios';
Vue.prototype.$axios = axios

let token = 'user';
axios.defaults.headers.common['token'] = token;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import { Button, Select, Form, FormItem,Menu, Submenu, MenuItem, Card} from 'element-ui';


Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)

Vue.config.productionTip = false

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
