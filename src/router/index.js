import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login";
import Registration from "@/views/Registration";
import Profile from "@/views/Profile";
import Users from "@/views/Users";
import Friends from "@/views/Friends";
import Subscribers from "@/views/Subscribers";
import Subscriptions from "@/views/Subscriptions";
import AllUsers from "@/views/AllUsers";
import Chats from "@/views/Chats";
import ActiveChat from "@/views/ActiveChat";

Vue.use(VueRouter);

function castToInt(route) {
  return {
    id: Number(route.params.id)
  };
}

const routes = [
  {
    path: "/feed",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/users",
    component: Users,
    children: [
      {
        path: "/users/all",
        name: "AllUsers",
        component: AllUsers
      },
      {
        path: "/users/:id/friends",
        name: "Friends",
        component: Friends,
        props: castToInt
      },
      {
        path: "/users/:id/subscribers",
        name: "Subscribers",
        component: Subscribers,
        props: castToInt
      },
      {
        path: "/users/:id/subscriptions",
        name: "Subscriptions",
        component: Subscriptions,
        props: castToInt
      }
    ]
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    props: castToInt
  },
  {
    path: "/chats/:id",
    name: "ActiveChat",
    component: ActiveChat,
    props: castToInt
  },
  {
    path: "/chats",
    name: "Chats",
    component: Chats
  }
];

const router = new VueRouter({
  routes
});

export default router;
