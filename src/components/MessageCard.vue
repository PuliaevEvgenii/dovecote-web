<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-avatar size="36px" color="grey">
        <img
          v-if="message.author.picturePath"
          alt="Avatar"
          :src="message.author.picturePath"
        />
        <v-icon dark v-else>
          mdi-account-circle
        </v-icon>
      </v-avatar>
    </v-list-item-avatar>

    <v-card min-width="200px" max-width="400px" shaped>
      <v-card-text>
        <div class="subtitle-1 black--text">
          {{ message.payload }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" icon small @click="editMsg">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="grey" icon small @click="deleteMsg">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-list-item>
</template>

<script>
import { DELETE_MESSAGE_REQUEST } from "@/store/action-types";

export default {
  name: "MessageCard",
  props: {
    message: {}
  },
  methods: {
    editMsg() {
      this.$emit("action", this.message);
    },
    deleteMsg() {
      this.$store.dispatch(DELETE_MESSAGE_REQUEST, this.message.id);
    }
  }
};
</script>

<style scoped></style>
