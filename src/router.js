import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Menu from "./components/Menu.vue";
import Profile from "./components/Profile.vue";
import { components, AmplifyEventBus } from "aws-amplify-vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import AmplifyStore from "./store";

Vue.use(Router);
Vue.use(AmplifyPlugin, AmplifyModules);

let user;

getUser()
  .then((user, error) => {
    if (user) {
      router.push({ path: "/" });
    }
  })
  .catch(error => {
    console.log("error in getUser: ", error);
  });

AmplifyEventBus.$on("authState", async state => {
  if (state === "signedOut") {
    user = null;
    AmplifyStore.commit("setUser", null);
    router.push({ path: "/auth" });
  } else if (state === "signedIn") {
    user = await getUser();
    router.push({ path: "/" });
  }
});

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
    .then(data => {
      if (data && data.signInUserSession) {
        AmplifyStore.commit("setUser", data);
        return data;
      }
    })
    .catch(e => {
      AmplifyStore.commit("setUser", null);

      console.log("getUser error: ", e);

      return null;
    });
}

const router = new Router({
  routes: [
    {
      path: "/",
      icon: 'home',
      name: "Home",
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: "/dashboard",
      icon: 'dashboard',
      name: "Dashboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Dashboard.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/settings",
      icon: 'settings',
      name: "Settings",
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: "/auth",
      icon: "account_box",
      name: "Sign In",
      component: components.Authenticator,
      meta: { requiresAuth: false }
    }
  ]
});

// check if route requires auth
router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser();
    if (!user) {
      return next({
        path: "/auth",
        query: {
          redirect: to.fullPath
        }
      });
    }
    return next();
  }
  return next();
});

export default router;
