<template>
  <v-container fluid>
    <v-row>
      <v-btn color="deep-purple lighten-2" icon @click="likePost">
        <v-icon>{{
          postData.liked ? "mdi-heart" : "mdi-heart-outline"
        }}</v-icon>
        {{ postData.likes }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="deep-purple lighten-2" icon @click="showComments">
        <v-icon>{{
          showCommentsFlag ? "mdi-comment" : "mdi-comment-outline"
        }}</v-icon>
        {{ postData.comments }}
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="isMyProfile">
        <v-btn
          color="deep-purple lighten-2"
          icon
          @click.stop="postEditDialog = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <DCPostCreateEditDialog
          @action="postEditDialog = !postEditDialog"
          :dialog="postEditDialog"
          :post-data="postData"
          :action-type="actionType"
        >
        </DCPostCreateEditDialog>

        <v-btn color="deep-purple lighten-2" icon @click="deletePost">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn color="deep-purple lighten-2" icon @click="repost">
          <v-icon>mdi-reply</v-icon>
        </v-btn>
      </div>
    </v-row>

    <v-expand-transition>
      <div v-show="showCommentsFlag">
        <v-divider></v-divider>
        <CommentsCard :post-id="postData.id"></CommentsCard>
      </div>
    </v-expand-transition>
  </v-container>
</template>

<script>
import { PostActionType } from "@/core/PostActionType";
import DCPostCreateEditDialog from "@/components/DCPostCreateEditDialog";
import {
  DELETE_WALL_POSTS_REQUEST,
  DISLIKE_WALL_POSTS_REQUEST,
  FETCH_POST_COMMENTS_REQUEST,
  LIKE_WALL_POSTS_REQUEST,
  REPOST_TO_WALL_REQUEST
} from "@/store/action-types";
import CommentsCard from "@/components/CommentsCard";

export default {
  name: "PostCardActions",
  components: {
    CommentsCard,
    DCPostCreateEditDialog
  },
  props: {
    postData: {}
  },
  data: () => ({
    showCommentsFlag: false,
    actionType: PostActionType.UPDATE,
    postEditDialog: false
  }),
  methods: {
    likePost() {
      if (this.postData.liked) {
        this.$store.dispatch(DISLIKE_WALL_POSTS_REQUEST, this.postData.id);
      } else {
        this.$store.dispatch(LIKE_WALL_POSTS_REQUEST, this.postData.id);
      }
    },
    showComments() {
      this.showCommentsFlag = !this.showCommentsFlag;
      this.$store.dispatch(FETCH_POST_COMMENTS_REQUEST, this.postData.id);
    },
    deletePost() {
      this.$store.dispatch(DELETE_WALL_POSTS_REQUEST, this.postData.id);
    },
    repost() {
      this.$store.dispatch(REPOST_TO_WALL_REQUEST, this.postData.id);
    }
  },
  computed: {
    isMyProfile() {
      return this.$store.getters.isMyProfile;
    }
  }
};
</script>

<style scoped></style>
