import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false
Vue.use(vueDebounce);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
