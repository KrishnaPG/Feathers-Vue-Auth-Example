import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// Object.defineProperties(Vue.prototype, {
// 	$authClient: {
// 		get: function () {
// 			return authClient;
// 		}
// 	}
// });

new Vue({
	router,
	render: function (h) { return h(App); }
}).$mount('#app');
