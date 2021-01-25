import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy'

Vue.config.productionTip = false;
Vue.use(Buefy)

Vue.filter('title', function (value) {
  if (!value) return ''
  const allowedLength = 15
  if(value.length > allowedLength){
    return  value.substring(0,allowedLength - 3)+"..."
  } else {
    return value
  }
})

new Vue({
  render: (h) => h(App),
}).$mount('#app');
