import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import User from "../views/User.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "", component: SignIn },
      { path: "sign-up", component: SignUp },
    ],
  },
  {
    path: "/",
    component: Home,
    children: [{ path: "user-info", component: User }],
  },
  // {
  //   path: "/userInfo",
  //   component: User,
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
