import {
  CREATE_WALL_POSTS_ERROR,
  CREATE_WALL_POSTS_REQUEST,
  CREATE_WALL_POSTS_SUCCESS,
  DELETE_WALL_POSTS_ERROR,
  DELETE_WALL_POSTS_REQUEST,
  DELETE_WALL_POSTS_SUCCESS,
  DISLIKE_WALL_POSTS_ERROR,
  DISLIKE_WALL_POSTS_REQUEST,
  DISLIKE_WALL_POSTS_SUCCESS,
  FETCH_WALL_POSTS_ERROR,
  FETCH_WALL_POSTS_REQUEST,
  FETCH_WALL_POSTS_SUCCESS,
  LIKE_WALL_POSTS_ERROR,
  LIKE_WALL_POSTS_REQUEST,
  LIKE_WALL_POSTS_SUCCESS,
  REPOST_TO_WALL_ERROR,
  REPOST_TO_WALL_REQUEST,
  REPOST_TO_WALL_SUCCESS,
  UPDATE_WALL_POSTS_ERROR,
  UPDATE_WALL_POSTS_REQUEST,
  UPDATE_WALL_POSTS_SUCCESS
} from "@/store/action-types";
import { get, post, put, del } from "@/core/services/http-service";

const state = () => ({
  posts: []
});

const getters = {
  getPosts: state => {
    return state.posts.slice().sort((a, b) => b.id - a.id);
  }
};

const mutations = {
  [FETCH_WALL_POSTS_SUCCESS]: (state, payload) => {
    state.posts = payload;
  },
  [FETCH_WALL_POSTS_ERROR]: state => {
    state.posts = [];
  },
  [CREATE_WALL_POSTS_SUCCESS]: (state, payload) => {
    state.posts.push(payload);
  },
  [CREATE_WALL_POSTS_ERROR]: () => {},
  [UPDATE_WALL_POSTS_SUCCESS]: (state, payload) => {
    const i = state.posts.findIndex(p => p.id === payload.id);
    state.posts = [
      ...state.posts.slice(0, i),
      payload,
      ...state.posts.slice(i + 1)
    ];
  },
  [UPDATE_WALL_POSTS_ERROR]: () => {},
  [DELETE_WALL_POSTS_SUCCESS]: (state, payload) => {
    const i = state.posts.findIndex(p => p.id === payload);
    state.posts = [...state.posts.slice(0, i), ...state.posts.slice(i + 1)];
  },
  [DELETE_WALL_POSTS_ERROR]: () => {},
  [LIKE_WALL_POSTS_SUCCESS]: (state, payload) => {
    const i = state.posts.findIndex(p => p.id === payload);
    const liked = state.posts[i];
    liked.liked = true;
    liked.likes += 1;
    state.posts = [
      ...state.posts.slice(0, i),
      liked,
      ...state.posts.slice(i + 1)
    ];
  },
  [LIKE_WALL_POSTS_ERROR]: () => {},
  [DISLIKE_WALL_POSTS_SUCCESS]: (state, payload) => {
    const i = state.posts.findIndex(p => p.id === payload);
    const disliked = state.posts[i];
    disliked.liked = false;
    disliked.likes -= 1;
    state.posts = [
      ...state.posts.slice(0, i),
      disliked,
      ...state.posts.slice(i + 1)
    ];
  },
  [DISLIKE_WALL_POSTS_ERROR]: () => {},
  [REPOST_TO_WALL_SUCCESS]: () => {},
  [REPOST_TO_WALL_ERROR]: () => {}
};

const actions = {
  [FETCH_WALL_POSTS_REQUEST]: async (context, id) => {
    return await get(`posts/${id}`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_WALL_POSTS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_WALL_POSTS_ERROR);
      });
  },
  [CREATE_WALL_POSTS_REQUEST]: async (context, postData) => {
    return await post("posts", postData)
      .then(response => {
        const payload = response && response.data;
        context.commit(CREATE_WALL_POSTS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(CREATE_WALL_POSTS_ERROR);
      });
  },
  [UPDATE_WALL_POSTS_REQUEST]: async (context, postData) => {
    return await put(`posts/${postData.id}`, postData)
      .then(response => {
        const payload = response && response.data;
        context.commit(UPDATE_WALL_POSTS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(UPDATE_WALL_POSTS_ERROR);
      });
  },
  [DELETE_WALL_POSTS_REQUEST]: async (context, postId) => {
    return await del(`posts/${postId}`)
      .then(() => {
        context.commit(DELETE_WALL_POSTS_SUCCESS, postId);
      })
      .catch(() => {
        context.commit(DELETE_WALL_POSTS_ERROR);
      });
  },
  [LIKE_WALL_POSTS_REQUEST]: async (context, id) => {
    return await put(`posts/${id}/like`)
      .then(() => {
        context.commit(LIKE_WALL_POSTS_SUCCESS, id);
      })
      .catch(() => {
        context.commit(LIKE_WALL_POSTS_ERROR);
      });
  },
  [DISLIKE_WALL_POSTS_REQUEST]: async (context, id) => {
    return await put(`posts/${id}/dislike`)
      .then(() => {
        context.commit(DISLIKE_WALL_POSTS_SUCCESS, id);
      })
      .catch(() => {
        context.commit(DISLIKE_WALL_POSTS_ERROR);
      });
  },
  [REPOST_TO_WALL_REQUEST]: async (context, id) => {
    return await put(`posts/${id}/repost`)
      .then(() => {
        context.commit(REPOST_TO_WALL_SUCCESS, id);
      })
      .catch(() => {
        context.commit(REPOST_TO_WALL_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
