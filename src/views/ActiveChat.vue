<template>
  <v-container fluid>
    <v-card max-width="800">
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar size="36px" color="grey">
            <img
              v-if="chatData.picturePath"
              alt="Avatar"
              :src="chatData.picturePath"
            />
            <v-icon dark v-else>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ chatData.name }}
          </v-list-item-title>
          <!--<v-list-item-subtitle>
            Participants:
            {{ chatData.participants.length }}
          </v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-virtual-scroll
        :items="chatData.messages"
        height="600"
        item-height="120"
        bench="1"
      >
        <template v-slot:default="{ item }">
          <MessageCard :message="item" @action="editMessage"></MessageCard>
        </template>
      </v-virtual-scroll>

      <v-divider></v-divider>

      <v-card-actions>
        <v-container fluid>
          <v-textarea
            v-model="messagePayload"
            label="Message"
            auto-grow
            outlined
            rows="1"
            append-outer-icon="mdi-send"
            @click:append-outer="sendMessage"
          ></v-textarea>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {
  CREATE_CHAT_REQUEST,
  CREATE_MESSAGE_REQUEST,
  FETCH_CHAT_REQUEST,
  UPDATE_MESSAGE_REQUEST
} from "@/store/action-types";
import { MessageType } from "@/core/services/MessageType";
import MessageCard from "@/components/MessageCard";

export default {
  name: "ActiveChat",
  components: { MessageCard },
  props: {
    id: Number
  },
  data: () => ({
    messagePayload: "",
    editing: false,
    editedMsgId: Number
  }),
  computed: {
    chatData() {
      return this.$store.getters.getActiveChat;
    }
  },
  methods: {
    createChat() {
      const user = this.$store.getters.getProfile;
      this.$store.dispatch(CREATE_CHAT_REQUEST, {
        name: null,
        participants: [{ id: user.id }]
      });
    },
    editMessage(event) {
      this.editing = true;
      this.messagePayload = event.payload;
      this.editedMsgId = event.id;
    },
    sendMessage() {
      if (this.editing) {
        const msg = {
          id: this.editedMsgId,
          payload: this.messagePayload,
          type: MessageType.TEXT_MESSAGE
        };
        this.$store.dispatch(UPDATE_MESSAGE_REQUEST, msg);
        this.editing = false;
      } else {
        const msg = {
          chat: { id: this.chatData.id },
          author: { id: this.$store.getters.getCurrUserId },
          payload: this.messagePayload,
          type: MessageType.TEXT_MESSAGE
        };
        this.$store.dispatch(CREATE_MESSAGE_REQUEST, msg);
      }
      this.messagePayload = "";
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_CHAT_REQUEST, this.id);
  }
};
</script>

<style scoped></style>
