<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Text something!</v-card-title>

      <v-card-text>
        <v-textarea
          name="input-7-1"
          label="Post text"
          hint="Write here"
          clearable
          clear-icon="mdi-close-circle"
          auto-grow
          counter
          v-model="payload"
          :rules="[
            v => v.length <= 255 || 'Max 255 characters',
            v => v.length > 0 || 'Write something!'
          ]"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('action')">
          Cancel
        </v-btn>
        <v-btn text @click="submit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  CREATE_WALL_POSTS_REQUEST,
  UPDATE_WALL_POSTS_REQUEST
} from "@/store/action-types";
import { PostActionType } from "@/core/PostActionType";

export default {
  name: "DCPostCreateEditDialog",
  props: {
    postData: {},
    dialog: Boolean,
    actionType: PostActionType
  },
  data: () => ({
    payload: ""
  }),
  methods: {
    submit() {
      switch (this.actionType) {
        case PostActionType.CREATE:
          this.$store.dispatch(CREATE_WALL_POSTS_REQUEST, {
            authorId: this.postData.authorId,
            payload: this.payload
          });
          break;
        case PostActionType.UPDATE:
          this.$store.dispatch(UPDATE_WALL_POSTS_REQUEST, {
            id: this.postData.id,
            payload: this.payload
          });
          break;
      }
      this.$emit("action");
    }
  },
  mounted() {
    this.payload = this.postData.payload;
  }
};
</script>

<style scoped></style>
