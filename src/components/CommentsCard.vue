<template>
  <v-container>
    <v-card v-for="item in comments" :key="item.id" class="my-2">
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar size="24px" color="grey">
            <img
              v-if="item.author.picturePath"
              alt="Avatar"
              :src="item.author.picturePath"
            />
            <v-icon dark v-else>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.author.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.payload }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-row>
            <v-btn icon small @click="editComment(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small @click="deleteComment(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-card>

    <v-textarea
      v-model="commentPayload"
      label="Comment"
      auto-grow
      outlined
      rows="1"
      append-outer-icon="mdi-send"
      @click:append-outer="sendComment"
    ></v-textarea>
  </v-container>
</template>

<script>
import {
  CREATE_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST
} from "@/store/action-types";

export default {
  name: "CommentsCard",
  props: {
    postId: Number
  },
  data: () => ({
    commentPayload: "",
    isEditing: false,
    editedId: Number
  }),
  computed: {
    comments() {
      return this.$store.getters.getCommentsByPostId(this.postId);
    },
    currUserId() {
      return this.$store.getters.getCurrUserId;
    }
  },
  methods: {
    sendComment() {
      if (this.isEditing) {
        const comment = {
          id: this.editedId,
          payload: this.commentPayload
        };
        this.$store.dispatch(UPDATE_COMMENT_REQUEST, comment);
        this.isEditing = false;
      } else {
        const comment = {
          payload: this.commentPayload,
          author: { id: this.currUserId },
          post: { id: this.postId }
        };
        this.$store.dispatch(CREATE_COMMENT_REQUEST, comment);
      }
      this.commentPayload = "";
    },
    editComment(item) {
      this.isEditing = true;
      this.editedId = item.id;
      this.commentPayload = item.payload;
    },
    deleteComment(id) {
      this.$store.dispatch(DELETE_COMMENT_REQUEST, id);
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
