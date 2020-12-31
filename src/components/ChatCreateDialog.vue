<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Pick users to chat with!</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="32"
          label="Chat name"
          readonly
        ></v-text-field>

        <v-combobox
          v-model="selectedUsers"
          label="Chat participants"
          :items="userSuggestions"
          :item-text="item => item.name"
          prepend-inner-icon="mdi-account-circle"
          chips
          clearable
          multiple
          solo
          @change="changeName"
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              pill
              outlined
              close
              color="deep-purple lighten-2"
              @click="select"
              @click:close="remove(item)"
            >
              <v-avatar left color="grey">
                <img
                  v-if="item.picturePath"
                  alt="Avatar"
                  :src="item.picturePath"
                />
                <v-icon dark v-else>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              {{ item.name }}
            </v-chip>
          </template>
        </v-combobox>
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
import { CREATE_CHAT_REQUEST } from "@/store/action-types";

export default {
  name: "ChatCreateDialog",
  props: {
    dialog: Boolean
  },
  data: () => ({
    name: "",
    nameRules: [
      v => !!v || "Chat name is required",
      v => v.length <= 32 || "Name must be less than 32 characters"
    ],
    selectedUsers: [],
    userSuggestions: []
  }),
  methods: {
    submit() {
      const createdChat = {
        name: this.selectedUsers.length > 1 ? this.name : null,
        participants: this.selectedUsers
      };
      this.$store.dispatch(CREATE_CHAT_REQUEST, createdChat);
      this.$emit("action");
    },
    remove(item) {
      this.selectedUsers.splice(this.selectedUsers.indexOf(item), 1);
      this.selectedUsers = [...this.selectedUsers];
    },
    changeName() {
      this.name = this.selectedUsers.map(i => i.name).join(", ");
    }
  },
  mounted() {},
  updated() {
    this.userSuggestions = this.$store.getters.getUserSuggestionsForNewChat;
  }
};
</script>

<style scoped></style>
