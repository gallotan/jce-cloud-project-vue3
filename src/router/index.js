import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Result from "../views/Result.vue";
import SaveResult from "../views/SaveResult.vue";
import PredictionsHistory from "../views/PredictionsHistory.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/", //default route on startup
    name: "login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
    meta: {
      title: "Result",
    },
  },
  {
    path: "/save_result",
    name: "SaveResult",
    component: SaveResult,
    meta: {
      title: "SaveResult",
    },
  },
  {
    path: "/predictions_history",
    name: "PredictionsHistory",
    component: PredictionsHistory,
    meta: {
      title: "PredictionsHistory",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export const isAuthenticated = () => {
  const authenticated = store.state.user !== null;
  return authenticated;
};

router.beforeEach((to, from, next) => {
  if (
    !isAuthenticated() &&
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "ForgotPassword"
  ) {
    next({ name: "Login" });
    return;
  } else if (
    isAuthenticated() &&
    (to.name === "Login" ||
      to.name === "Register" ||
      to.name === "ForgotPassword")
  ) {
    next({ name: "Home" });
    return;
  } else {
    document.title = `${to.meta.title} | Roni's Course Project `;
    next();
  }
});

export default router;
