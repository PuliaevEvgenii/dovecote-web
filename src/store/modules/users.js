import {
  FETCH_FRIENDS_ERROR,
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_STATISTICS_ERROR,
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_SUBSCRIBERS_ERROR,
  FETCH_SUBSCRIBERS_REQUEST,
  FETCH_SUBSCRIBERS_SUCCESS,
  FETCH_SUBSCRIPTIONS_ERROR,
  FETCH_SUBSCRIPTIONS_REQUEST,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FOR_NEW_CHAT_ERROR,
  FETCH_SUGGESTIONS_FOR_NEW_CHAT_REQUEST,
  FETCH_SUGGESTIONS_FOR_NEW_CHAT_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS
} from "@/store/action-types";
import { get } from "@/core/services/http-service";

const state = () => ({
  users: [],
  friends: [],
  subscribers: [],
  subscriptions: [],
  chatSuggestions: [],
  statistics: []
});

const getters = {
  getUsers: state => {
    return state.users;
  },
  getFriends: state => {
    return state.friends;
  },
  getSubscribers: state => {
    return state.subscribers;
  },
  getSubscriptions: state => {
    return state.subscriptions;
  },
  getUserSuggestionsForNewChat: state => {
    return state.chatSuggestions;
  },
  getStatistics: state => {
    return state.statistics;
  }
};

const mutations = {
  [FETCH_USERS_SUCCESS]: (state, payload) => {
    state.users = payload;
  },
  [FETCH_USERS_ERROR]: state => {
    state.users = [];
  },
  [FETCH_FRIENDS_SUCCESS]: (state, payload) => {
    state.friends = payload;
  },
  [FETCH_FRIENDS_ERROR]: state => {
    state.friends = [];
  },
  [FETCH_SUBSCRIPTIONS_SUCCESS]: (state, payload) => {
    state.subscriptions = payload;
  },
  [FETCH_SUBSCRIPTIONS_ERROR]: state => {
    state.subscriptions = [];
  },
  [FETCH_SUBSCRIBERS_SUCCESS]: (state, payload) => {
    state.subscribers = payload;
  },
  [FETCH_SUBSCRIBERS_ERROR]: state => {
    state.subscribers = [];
  },
  [FETCH_SUGGESTIONS_FOR_NEW_CHAT_SUCCESS]: (state, payload) => {
    state.chatSuggestions = payload;
  },
  [FETCH_SUGGESTIONS_FOR_NEW_CHAT_ERROR]: state => {
    state.chatSuggestions = [];
  },
  [FETCH_STATISTICS_SUCCESS]: (state, payload) => {
    state.statistics = payload;
  },
  [FETCH_STATISTICS_ERROR]: () => {}
};

const actions = {
  [FETCH_USERS_REQUEST]: async (context, params) => {
    return await get(`users`, {
      ...params
    })
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_USERS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_USERS_ERROR);
      });
  },
  [FETCH_FRIENDS_REQUEST]: async (context, payload) => {
    return await get(`users/${payload}/friends`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_FRIENDS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_FRIENDS_ERROR);
      });
  },
  [FETCH_SUBSCRIBERS_REQUEST]: async (context, payload) => {
    return await get(`users/${payload}/subscribers`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_SUBSCRIBERS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_SUBSCRIBERS_ERROR);
      });
  },
  [FETCH_SUBSCRIPTIONS_REQUEST]: async (context, payload) => {
    return await get(`users/${payload}/subscriptions`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_SUBSCRIPTIONS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_SUBSCRIPTIONS_ERROR);
      });
  },
  [FETCH_SUGGESTIONS_FOR_NEW_CHAT_REQUEST]: async (context, payload) => {
    return await get(`users/${payload}/suggestions-for-chat`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_SUGGESTIONS_FOR_NEW_CHAT_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_SUGGESTIONS_FOR_NEW_CHAT_ERROR);
      });
  },
  [FETCH_STATISTICS_REQUEST]: async context => {
    return await get(`users/statistics`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_STATISTICS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_SUGGESTIONS_FOR_NEW_CHAT_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
