import Vue from "vue";
import VueRouter from "vue-router";

import DashboardLayout from "../layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";

// Admin pages
import UserProfile from "src/pages/UserProfile.vue";
import TasksList from "src/pages/TasksList.vue";
import PapeleraList from "src/pages/Papelera.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/authentication/login.vue"),
    meta: {
      layout: "full",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/tasks-list",
    children: [
      {
        path: "tasks-list",
        name: "ListaTareas",
        component: TasksList,
      },
      {
        path: "user",
        name: "User",
        component: UserProfile,
      },
      {
        path: "papelera",
        name: "Papelera",
        component: PapeleraList,
      },
    ],
  },
  { path: "*", component: NotFound },
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes, // short for routes: routes
  mode: "history",
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(async (to, _, next) => {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn && to.name != "Login") next({ name: "Login" });
  if (!isLoggedIn && to.name === "Login") next();
  if (isLoggedIn && to.name === "Login") next({ name: "ListaTareas" });
  next();
});

export default router;
