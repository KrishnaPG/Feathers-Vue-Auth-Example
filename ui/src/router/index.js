import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
});

function getMatch(location, key) {
  const regex = new RegExp(`(?:\&?)${key}=([^&]*)`);
  const match = location.hash ? location.hash.match(regex) : null;
  if (match !== null) {
    const [, value] = match;
    return [value, regex];
  }
  return [null, regex];
};

import Store from '@/store';
import authClient from '@/auth';

// main();
router.beforeEach((to, from, next) => {
  console.log("routing: ", from, " -> ", to);

  if (to.name === null) { // if native paths, check if we received any oAuth responses
    const [accessToken, tokenRegex] = getMatch(window.location, "access_token");
    if (accessToken != null) {
      console.log("received access token: ", accessToken);
      authClient.authentication.setAccessToken(accessToken);
      const destination = window.location.pathname.substring(1);
      console.log("destination: ", destination);
      window.history.replaceState(null, null, "/");
      next({ path: destination }); // redirect to the target, if any
      return;
    }
    else next();
  }
  else { // the to path is a vue component (it has name)
    authClient.reAuthenticate(true).then(res => {
      console.log("auth response: ", res);
      Store.setUser(res); // watched by secure.vue to show/hide the Login ui
    }).catch(ex => {
      console.log("client not authenticated: ", ex);
      Store.clearUser();
    }).finally(() => next());
  }
});

export default router;
