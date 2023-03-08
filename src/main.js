import App from './App.vue'
import router from './router'
import store from './store'
import apiFun from "./http/api.js";

Vue.prototype.$apiFun = apiFun;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
