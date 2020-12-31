<template>
  <v-container fluid>
    <v-card>
      <v-card-actions class="my-6">
        <v-spacer></v-spacer>
        <v-btn icon color="deep-purple lighten-2" @click.stop="createChat">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <ChatCreateDialog
          @action="chatCreateDialog = !chatCreateDialog"
          :dialog="chatCreateDialog"
        >
        </ChatCreateDialog>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>Chats</v-card-title>
      <v-card-subtitle v-if="chats.length === 0"
        >You don't have any chats yet. Start a new one!</v-card-subtitle
      >
      <v-card-text>
        <v-list three-line>
          <v-list-item
            v-for="item in chats"
            :key="item.id"
            link
            :to="{ name: 'ActiveChat', params: { id: item.id } }"
          >
            <v-list-item-avatar>
              <v-avatar size="36px" color="grey">
                <img
                  v-if="item.picturePath"
                  alt="Avatar"
                  :src="item.picturePath"
                />
                <v-icon dark v-else>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.lastMessage
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  FETCH_SUGGESTIONS_FOR_NEW_CHAT_REQUEST,
  FETCH_USER_CHATS_REQUEST
} from "@/store/action-types";
import ChatCreateDialog from "@/components/ChatCreateDialog";

export default {
  name: "Chats",
  components: { ChatCreateDialog },
  data: () => ({
    chatCreateDialog: false
  }),
  computed: {
    chats() {
      return this.$store.getters.getUserChats;
    },
    currUserId() {
      return this.$store.getters.getCurrUserId;
    }
  },
  methods: {
    createChat() {
      this.chatCreateDialog = !this.chatCreateDialog;
      this.$store.dispatch(
        FETCH_SUGGESTIONS_FOR_NEW_CHAT_REQUEST,
        this.currUserId
      );
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_USER_CHATS_REQUEST);
  }
};
</script>

<style scoped></style>
