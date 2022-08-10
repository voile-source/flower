import App from './App.vue'
import router from './router'
import store from './store'
import apiFun from "@/http/api.js";

Vue.config.productionTip = false
Vue.prototype.$apiFun = apiFun;
Vue.prototype.$ELEMENT = { size: 'media', zIndex: 3000 };

const setFontSize= () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 75}px`
};
window.onresize = setFontSize;
setFontSize()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
