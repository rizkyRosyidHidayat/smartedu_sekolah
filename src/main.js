import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import CKEditor from './plugins/ckeditor'
// import VueTour from 'vue-tour'
// require('vue-tour/dist/vue-tour.css')
// Vue.use(VueTour)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  CKEditor,
  vuetify,
  render: h => h(App)
}).$mount('#app')
