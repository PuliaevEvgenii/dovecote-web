import {
  CREATE_CHAT_ERROR,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  DELETE_CHAT_ERROR,
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  FETCH_USER_CHATS_ERROR,
  FETCH_USER_CHATS_REQUEST,
  FETCH_USER_CHATS_SUCCESS,
  UPDATE_CHAT_ERROR,
  UPDATE_CHAT_REQUEST,
  UPDATE_CHAT_SUCCESS
} from "@/store/action-types";
import { del, get, post, put } from "@/core/services/http-service";

const state = () => ({
  userChats: []
});

const getters = {
  getUserChats: state => {
    return state.userChats;
    /*.slice()
      .sort((a, b) => b.lastTimeModified - a.lastTimeModified)*/
  }
};

const mutations = {
  [FETCH_USER_CHATS_SUCCESS]: (state, payload) => {
    state.userChats = payload;
  },
  [FETCH_USER_CHATS_ERROR]: state => {
    state.userChats = {};
  },
  [CREATE_CHAT_SUCCESS]: (state, payload) => {
    state.userChats.push(payload);
  },
  [CREATE_CHAT_ERROR]: () => {},
  [UPDATE_CHAT_SUCCESS]: (state, payload) => {
    const i = state.userChats.messages.findIndex(p => p.id === payload.id);
    state.userChats = [
      ...state.userChats.slice(0, i),
      payload,
      ...state.userChats.slice(i + 1)
    ];
  },
  [UPDATE_CHAT_ERROR]: () => {},
  [DELETE_CHAT_SUCCESS]: (state, payload) => {
    const i = state.userChats.messages.findIndex(p => p.id === payload);
    state.userChats = [
      ...state.userChats.slice(0, i),
      ...state.userChats.slice(i + 1)
    ];
  },
  [DELETE_CHAT_ERROR]: () => {}
};

const actions = {
  [FETCH_USER_CHATS_REQUEST]: async context => {
    return await get(`/chats`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_USER_CHATS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_USER_CHATS_ERROR);
      });
  },
  [CREATE_CHAT_REQUEST]: async (context, chatData) => {
    return await post("/chats", chatData)
      .then(response => {
        const payload = response && response.data;
        context.commit(CREATE_CHAT_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(CREATE_CHAT_ERROR);
      });
  },
  [UPDATE_CHAT_REQUEST]: async (context, chatData) => {
    return await put(`/chats/${chatData.id}`, chatData)
      .then(response => {
        const payload = response && response.data;
        context.commit(UPDATE_CHAT_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(UPDATE_CHAT_ERROR);
      });
  },
  [DELETE_CHAT_REQUEST]: async (context, chatId) => {
    return await del(`/chats/${chatId}`)
      .then(() => {
        context.commit(DELETE_CHAT_SUCCESS, chatId);
      })
      .catch(() => {
        context.commit(DELETE_CHAT_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
