import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  render: h => h(App),
});
