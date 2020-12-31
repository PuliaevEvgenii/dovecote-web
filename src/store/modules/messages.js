import {
  CREATE_MESSAGE_ERROR,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_ERROR,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  FETCH_CHAT_ERROR,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_WITH_USER_ERROR,
  FETCH_CHAT_WITH_USER_REQUEST,
  FETCH_CHAT_WITH_USER_SUCCESS,
  UPDATE_MESSAGE_ERROR,
  UPDATE_MESSAGE_REQUEST,
  UPDATE_MESSAGE_SUCCESS
} from "@/store/action-types";
import { del, get, post, put } from "@/core/services/http-service";

const state = () => ({
  activeChat: {}
});

const getters = {
  getActiveChat: state => {
    return state.activeChat;
  },
  getMessages: state => {
    return state.activeChat
      ? state.activeChat.messages
          .slice()
          .sort((a, b) => b.creationDateTime - a.creationDateTime)
      : [];
  }
};

const mutations = {
  [FETCH_CHAT_SUCCESS]: (state, payload) => {
    state.activeChat = payload;
  },
  [FETCH_CHAT_ERROR]: state => {
    state.activeChat = [];
  },
  [FETCH_CHAT_WITH_USER_SUCCESS]: (state, payload) => {
    state.activeChat = payload;
  },
  [FETCH_CHAT_WITH_USER_ERROR]: state => {
    state.activeChat = [];
  },
  [CREATE_MESSAGE_SUCCESS]: (state, payload) => {
    state.activeChat.messages.push(payload);
  },
  [CREATE_MESSAGE_ERROR]: () => {},
  [UPDATE_MESSAGE_SUCCESS]: (state, payload) => {
    const i = state.activeChat.messages.findIndex(p => p.id === payload.id);
    state.activeChat.messages = [
      ...state.activeChat.messages.slice(0, i),
      payload,
      ...state.activeChat.messages.slice(i + 1)
    ];
  },
  [UPDATE_MESSAGE_ERROR]: () => {},
  [DELETE_MESSAGE_SUCCESS]: (state, payload) => {
    const i = state.activeChat.messages.findIndex(p => p.id === payload);
    state.activeChat.messages = [
      ...state.activeChat.messages.slice(0, i),
      ...state.activeChat.messages.slice(i + 1)
    ];
  },
  [DELETE_MESSAGE_ERROR]: () => {}
};

const actions = {
  [FETCH_CHAT_REQUEST]: async (context, id) => {
    return await get(`/chats/${id}`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_CHAT_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_CHAT_ERROR);
      });
  },
  [FETCH_CHAT_WITH_USER_REQUEST]: async (context, id) => {
    return await get(`/chats/with/${id}`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_CHAT_WITH_USER_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_CHAT_WITH_USER_ERROR);
      });
  },
  [CREATE_MESSAGE_REQUEST]: async (context, messageData) => {
    return await post("/messages", messageData)
      .then(response => {
        const payload = response && response.data;
        context.commit(CREATE_MESSAGE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(CREATE_MESSAGE_ERROR);
      });
  },
  [UPDATE_MESSAGE_REQUEST]: async (context, messageData) => {
    return await put(`/messages/${messageData.id}`, messageData)
      .then(response => {
        const payload = response && response.data;
        context.commit(UPDATE_MESSAGE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(UPDATE_MESSAGE_ERROR);
      });
  },
  [DELETE_MESSAGE_REQUEST]: async (context, messageId) => {
    return await del(`/messages/${messageId}`)
      .then(() => {
        context.commit(DELETE_MESSAGE_SUCCESS, messageId);
      })
      .catch(() => {
        context.commit(DELETE_MESSAGE_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
