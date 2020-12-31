import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth.js";
import profile from "@/store/modules/profile.js";
import posts from "@/store/modules/posts.js";
import users from "@/store/modules/users";
import messages from "@/store/modules/messages";
import chats from "@/store/modules/chats";
import comments from "@/store/modules/comments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    posts,
    users,
    messages,
    chats,
    comments
  },
  strict: true
});
