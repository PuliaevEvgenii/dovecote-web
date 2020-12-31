import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REGISTRATION_ERROR,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS
} from "../action-types";
import { auth, post } from "@/core/services/http-service";
import {
  destroyCurrUser,
  getCurrUser,
  saveCurrUser
} from "@/core/services/auth-service";

function getDefaultCurrUser() {
  return {
    authenticated: false,
    activated: false,
    currentUserInfo: {
      id: Number,
      login: "",
      role: null
    }
  };
}

const state = () => ({
  status: "",
  currentUser: getCurrUser()
});

const getters = {
  isAuthenticated(state) {
    return state.currentUser.authenticated;
  },
  getCurrUser(state) {
    return state.currentUser;
  },
  getCurrUserId(state) {
    return state.currentUser.currentUserInfo.id;
  },
  getInitials(state) {
    return state.currentUser.currentUserInfo.login.substring(0, 2);
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, payload) => {
    state.status = "success";
    state.currentUser = payload;
    saveCurrUser(payload);
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.currentUser = getDefaultCurrUser();
    destroyCurrUser();
  },
  [AUTH_LOGOUT]: state => {
    state.status = "";
    state.currentUser = getDefaultCurrUser();
    destroyCurrUser();
  },
  [REGISTRATION_SUCCESS]: (state, payload) => {
    state.status = "success";
    state.currentUser = payload;
    saveCurrUser(payload);
  },
  [REGISTRATION_ERROR]: state => {
    state.status = "error";
    state.currentUser = getDefaultCurrUser();
    destroyCurrUser();
  }
};

const actions = {
  [AUTH_REQUEST]: async (context, user) => {
    context.commit(AUTH_REQUEST);
    return await auth("auth/login", user)
      .then(response => {
        const payload = response && response.data;
        context.commit(AUTH_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(AUTH_ERROR);
      });
  },
  [AUTH_LOGOUT]: async context => {
    return await post("auth/logout").then(() => {
      context.commit(AUTH_LOGOUT);
    });
  },
  [REGISTRATION_REQUEST]: async (context, user) => {
    return await post("auth/registration", user)
      .then(response => {
        const payload = response && response.data;
        context.commit(REGISTRATION_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(REGISTRATION_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
