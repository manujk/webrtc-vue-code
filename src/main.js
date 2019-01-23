import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io-extended';
import {routes} from './routes'
import $socket from './socket-instance';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

Vue.use(VueSocketIO, $socket);


const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App :socket="$socket"/>'
});
