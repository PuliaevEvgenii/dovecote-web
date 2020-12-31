//region auth
export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
//endregion

//region profile
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const FETCH_GENDERS_REQUEST = "FETCH_GENDERS_REQUEST";
export const FETCH_GENDERS_SUCCESS = "FETCH_GENDERS_SUCCESS";

export const FETCH_COUNTRIES_REQUEST = "FETCH_COUNTRIES_REQUEST";
export const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
//endregion

//region posts
export const FETCH_WALL_POSTS_REQUEST = "FETCH_WALL_POSTS_REQUEST";
export const FETCH_WALL_POSTS_SUCCESS = "FETCH_WALL_POSTS_SUCCESS";
export const FETCH_WALL_POSTS_ERROR = "FETCH_WALL_POSTS_ERROR";

export const CREATE_WALL_POSTS_REQUEST = "CREATE_WALL_POSTS_REQUEST";
export const CREATE_WALL_POSTS_SUCCESS = "CREATE_WALL_POSTS_SUCCESS";
export const CREATE_WALL_POSTS_ERROR = "CREATE_WALL_POSTS_ERROR";

export const UPDATE_WALL_POSTS_REQUEST = "UPDATE_WALL_POSTS_REQUEST";
export const UPDATE_WALL_POSTS_SUCCESS = "UPDATE_WALL_POSTS_SUCCESS";
export const UPDATE_WALL_POSTS_ERROR = "UPDATE_WALL_POSTS_ERROR";

export const DELETE_WALL_POSTS_REQUEST = "DELETE_WALL_POSTS_REQUEST";
export const DELETE_WALL_POSTS_SUCCESS = "DELETE_WALL_POSTS_SUCCESS";
export const DELETE_WALL_POSTS_ERROR = "DELETE_WALL_POSTS_ERROR";

export const LIKE_WALL_POSTS_REQUEST = "LIKE_WALL_POSTS_REQUEST";
export const LIKE_WALL_POSTS_SUCCESS = "LIKE_WALL_POSTS_SUCCESS";
export const LIKE_WALL_POSTS_ERROR = "LIKE_WALL_POSTS_ERROR";

export const DISLIKE_WALL_POSTS_REQUEST = "DISLIKE_WALL_POSTS_REQUEST";
export const DISLIKE_WALL_POSTS_SUCCESS = "DISLIKE_WALL_POSTS_SUCCESS";
export const DISLIKE_WALL_POSTS_ERROR = "DISLIKE_WALL_POSTS_ERROR";

export const REPOST_TO_WALL_REQUEST = "REPOST_TO_WALL_REQUEST";
export const REPOST_TO_WALL_SUCCESS = "REPOST_TO_WALL_SUCCESS";
export const REPOST_TO_WALL_ERROR = "REPOST_TO_WALL_ERROR";
//endregion

//region users
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export const FETCH_FRIENDS_REQUEST = "FETCH_FRIENDS_REQUEST";
export const FETCH_FRIENDS_SUCCESS = "FETCH_FRIENDS_SUCCESS";
export const FETCH_FRIENDS_ERROR = "FETCH_FRIENDS_ERROR";

export const FETCH_SUBSCRIBERS_REQUEST = "FETCH_SUBSCRIBERS_REQUEST";
export const FETCH_SUBSCRIBERS_SUCCESS = "FETCH_SUBSCRIBERS_SUCCESS";
export const FETCH_SUBSCRIBERS_ERROR = "FETCH_SUBSCRIBERS_ERROR";

export const FETCH_SUBSCRIPTIONS_REQUEST = "FETCH_SUBSCRIPTIONS_REQUEST";
export const FETCH_SUBSCRIPTIONS_SUCCESS = "FETCH_SUBSCRIPTIONS_SUCCESS";
export const FETCH_SUBSCRIPTIONS_ERROR = "FETCH_SUBSCRIPTIONS_ERROR";

export const SUBSCRIBE_TO_USER_REQUEST = "SUBSCRIBE_TO_USER_REQUEST";
export const SUBSCRIBE_TO_USER_SUCCESS = "SUBSCRIBE_TO_USER_SUCCESS";
export const SUBSCRIBE_TO_USER_ERROR = "SUBSCRIBE_TO_USER_ERROR";

export const UNSUBSCRIBE_FROM_USER_REQUEST = "UNSUBSCRIBE_FROM_USER_REQUEST";
export const UNSUBSCRIBE_FROM_USER_SUCCESS = "UNSUBSCRIBE_FROM_USER_SUCCESS";
export const UNSUBSCRIBE_FROM_USER_ERROR = "UNSUBSCRIBE_FROM_USER_ERROR";

export const FETCH_SUGGESTIONS_FOR_NEW_CHAT_REQUEST =
  "FETCH_SUGGESTIONS_FOR_NEW_CHAT_REQUEST";
export const FETCH_SUGGESTIONS_FOR_NEW_CHAT_SUCCESS =
  "FETCH_SUGGESTIONS_FOR_NEW_CHAT_SUCCESS";
export const FETCH_SUGGESTIONS_FOR_NEW_CHAT_ERROR =
  "FETCH_SUGGESTIONS_FOR_NEW_CHAT_ERROR";
//endregion

//region chats
export const FETCH_USER_CHATS_REQUEST = "FETCH_USER_CHATS_REQUEST";
export const FETCH_USER_CHATS_SUCCESS = "FETCH_USER_CHATS_SUCCESS";
export const FETCH_USER_CHATS_ERROR = "FETCH_USER_CHATS_ERROR";

export const CREATE_CHAT_REQUEST = "CREATE_CHAT_REQUEST";
export const CREATE_CHAT_SUCCESS = "CREATE_CHAT_SUCCESS";
export const CREATE_CHAT_ERROR = "CREATE_CHAT_ERROR";

export const UPDATE_CHAT_REQUEST = "UPDATE_CHAT_REQUEST";
export const UPDATE_CHAT_SUCCESS = "UPDATE_CHAT_SUCCESS";
export const UPDATE_CHAT_ERROR = "UPDATE_CHAT_ERROR";

export const DELETE_CHAT_REQUEST = "DELETE_CHAT_REQUEST";
export const DELETE_CHAT_SUCCESS = "DELETE_CHAT_SUCCESS";
export const DELETE_CHAT_ERROR = "DELETE_CHAT_ERROR";

export const FETCH_CHAT_REQUEST = "FETCH_CHAT_REQUEST";
export const FETCH_CHAT_SUCCESS = "FETCH_CHAT_SUCCESS";
export const FETCH_CHAT_ERROR = "FETCH_CHAT_ERROR";

export const FETCH_CHAT_WITH_USER_REQUEST = "FETCH_CHAT_WITH_USER_REQUEST";
export const FETCH_CHAT_WITH_USER_SUCCESS = "FETCH_CHAT_WITH_USER_SUCCESS";
export const FETCH_CHAT_WITH_USER_ERROR = "FETCH_CHAT_WITH_USER_ERROR";
//endregion

//region messages
export const CREATE_MESSAGE_REQUEST = "CREATE_MESSAGE_REQUEST";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
export const CREATE_MESSAGE_ERROR = "CREATE_MESSAGE_ERROR";

export const UPDATE_MESSAGE_REQUEST = "UPDATE_MESSAGE_REQUEST";
export const UPDATE_MESSAGE_SUCCESS = "UPDATE_MESSAGE_SUCCESS";
export const UPDATE_MESSAGE_ERROR = "UPDATE_MESSAGE_ERROR";

export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_ERROR = "DELETE_MESSAGE_ERROR";
//endregion

//region comments
export const FETCH_POST_COMMENTS_REQUEST = "FETCH_POST_COMMENTS_REQUEST";
export const FETCH_POST_COMMENTS_SUCCESS = "FETCH_POST_COMMENTS_SUCCESS";
export const FETCH_POST_COMMENTS_ERROR = "FETCH_POST_COMMENTS_ERROR";

export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_ERROR = "CREATE_COMMENT_ERROR";

export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_ERROR = "UPDATE_COMMENT_ERROR";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";
//endregion

//region communities
export const FETCH_COMMUNITIES_REQUEST = "FETCH_COMMUNITIES_REQUEST";
export const FETCH_COMMUNITIES_SUCCESS = "FETCH_COMMUNITIES_SUCCESS";
export const FETCH_COMMUNITIES_ERROR = "FETCH_COMMUNITIES_ERROR";

export const FETCH_COMMUNITY_SUBS_REQUEST = "FETCH_COMMUNITY_SUBS_REQUEST";
export const FETCH_COMMUNITY_SUBS_SUCCESS = "FETCH_COMMUNITY_SUBS_SUCCESS";
export const FETCH_COMMUNITY_SUBS_ERROR = "FETCH_COMMUNITY_SUBS_ERROR";
//endregion

export const FETCH_STATISTICS_REQUEST = "FETCH_STATISTICS_REQUEST";
export const FETCH_STATISTICS_SUCCESS = "FETCH_STATISTICS_SUCCESS";
export const FETCH_STATISTICS_ERROR = "FETCH_STATISTICS_ERROR";
