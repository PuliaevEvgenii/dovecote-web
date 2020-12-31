import {
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  FETCH_POST_COMMENTS_ERROR,
  FETCH_POST_COMMENTS_REQUEST,
  FETCH_POST_COMMENTS_SUCCESS,
  UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS
} from "@/store/action-types";
import { del, get, post, put } from "@/core/services/http-service";

const state = () => ({
  openedComments: []
});

const getters = {
  getCommentsByPostId: state => id => {
    return state.openedComments
      .filter(c => c.post.id === id)
      .sort((a, b) => a.id - b.id);
  }
};

const mutations = {
  [FETCH_POST_COMMENTS_SUCCESS]: (state, payload) => {
    state.openedComments = payload;
  },
  [FETCH_POST_COMMENTS_ERROR]: () => {},
  [CREATE_COMMENT_SUCCESS]: (state, payload) => {
    state.openedComments.push(payload);
  },
  [CREATE_COMMENT_ERROR]: () => {},
  [UPDATE_COMMENT_SUCCESS]: (state, payload) => {
    const i = state.openedComments.findIndex(p => p.id === payload.id);
    state.openedComments = [
      ...state.openedComments.slice(0, i),
      payload,
      ...state.openedComments.slice(i + 1)
    ];
  },
  [UPDATE_COMMENT_ERROR]: () => {},
  [DELETE_COMMENT_SUCCESS]: (state, payload) => {
    const i = state.openedComments.findIndex(p => p.id === payload);
    state.openedComments = [
      ...state.openedComments.slice(0, i),
      ...state.openedComments.slice(i + 1)
    ];
  },
  [DELETE_COMMENT_ERROR]: () => {}
};

const actions = {
  [FETCH_POST_COMMENTS_REQUEST]: async (context, id) => {
    return await get(`/comments`, {
      postId: id
    })
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_POST_COMMENTS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_POST_COMMENTS_ERROR);
      });
  },
  [CREATE_COMMENT_REQUEST]: async (context, commentData) => {
    return await post("/comments", commentData)
      .then(response => {
        const payload = response && response.data;
        context.commit(CREATE_COMMENT_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(CREATE_COMMENT_ERROR);
      });
  },
  [UPDATE_COMMENT_REQUEST]: async (context, commentData) => {
    return await put(`/comments/${commentData.id}`, commentData)
      .then(response => {
        const payload = response && response.data;
        context.commit(UPDATE_COMMENT_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(UPDATE_COMMENT_ERROR);
      });
  },
  [DELETE_COMMENT_REQUEST]: async (context, commentId) => {
    return await del(`/comments/${commentId}`)
      .then(() => {
        context.commit(DELETE_COMMENT_SUCCESS, commentId);
      })
      .catch(() => {
        context.commit(DELETE_COMMENT_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
