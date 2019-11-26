import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import NowUiKit from './plugins/now-ui-kit';

Vue.config.productionTip = false
Vue.use(NowUiKit); 

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
