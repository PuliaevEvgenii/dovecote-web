<template>
  <v-card>
    <v-list-item
      three-line
      link
      :to="{ name: 'Profile', params: { id: userRow.id } }"
    >
      <v-list-item-avatar>
        <v-avatar size="36px" color="grey">
          <img
            v-if="userRow.picturePath"
            alt="Avatar"
            :src="userRow.picturePath"
          />
          <v-icon dark v-else>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ userRow.name }}
        </v-list-item-title>
        <v-list-item-subtitle>subtitle</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <!--<v-btn outlined rounded text @click="unsubscribe" v-if="isFriend">
        Unsubscribe
      </v-btn>
      <v-btn outlined rounded text @click="subscribe" v-else>
        Subscribe
      </v-btn>

      <v-btn outlined rounded text>
        Message
      </v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  SUBSCRIBE_TO_USER_REQUEST,
  UNSUBSCRIBE_FROM_USER_REQUEST
} from "@/store/action-types";

export default {
  name: "DCUserRow",
  props: {
    userRow: {}
  },
  data: () => ({
    isFriend: true
  }),
  methods: {
    subscribe() {
      this.$store.dispatch(SUBSCRIBE_TO_USER_REQUEST, this.userRow.id);
      this.isFriend = !this.isFriend;
    },
    unsubscribe() {
      this.$store.dispatch(UNSUBSCRIBE_FROM_USER_REQUEST, this.userRow.id);
      this.isFriend = !this.isFriend;
    }
  }
};
</script>

<style scoped></style>
