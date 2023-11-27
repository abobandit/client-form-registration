import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Vuelidate} from "vuelidate";

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
