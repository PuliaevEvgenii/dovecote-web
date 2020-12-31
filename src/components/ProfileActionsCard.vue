<template>
  <v-card class="my-6 px-3">
    <v-card-actions>
      <v-row v-if="isMyProfile">
        <v-spacer></v-spacer>

        <v-btn
          color="deep-purple lighten-2"
          text
          @click.stop="postCreateDialog = true"
        >
          Post
        </v-btn>
        <DCPostCreateEditDialog
          @action="postCreateDialog = !postCreateDialog"
          :dialog="postCreateDialog"
          :post-data="{ authorId: profile.id, payload: '' }"
          :action-type="actionType"
        >
        </DCPostCreateEditDialog>

        <v-spacer></v-spacer>

        <v-btn
          color="deep-purple lighten-2"
          icon
          @click.stop="profileEditDialog = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <DCProfileEditDialog
          @action="profileEditDialog = !profileEditDialog"
          :dialog="profileEditDialog"
          :profile-data="profile"
        ></DCProfileEditDialog>
      </v-row>
      <v-row v-else>
        <!--<v-btn
          color="deep-purple lighten-2"
          text
          block
          link
          :to="{ name: 'ActiveChat', params: id }"
        >
          Message
        </v-btn>-->

        <v-btn
          color="deep-purple lighten-2"
          text
          block
          @click="unsubscribe"
          v-if="profile.friend"
        >
          Unsubscribe
        </v-btn>
        <v-btn
          color="deep-purple lighten-2"
          text
          block
          @click="subscribe"
          v-else
        >
          Subscribe
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import DCProfileEditDialog from "@/components/DCProfileEditDialog";
import DCPostCreateEditDialog from "@/components/DCPostCreateEditDialog";
import { PostActionType } from "@/core/PostActionType";
import {
  SUBSCRIBE_TO_USER_REQUEST,
  UNSUBSCRIBE_FROM_USER_REQUEST
} from "@/store/action-types";
export default {
  name: "ProfileActionsCard",
  components: {
    DCPostCreateEditDialog,
    DCProfileEditDialog
  },
  data: () => ({
    profileEditDialog: false,
    postCreateDialog: false,
    actionType: PostActionType.CREATE
  }),
  computed: {
    isMyProfile() {
      return this.$store.getters.isMyProfile;
    },
    profile() {
      return this.$store.getters.getProfile;
    }
  },
  methods: {
    subscribe() {
      this.$store.dispatch(SUBSCRIBE_TO_USER_REQUEST, this.profile.id);
    },
    unsubscribe() {
      this.$store.dispatch(UNSUBSCRIBE_FROM_USER_REQUEST, this.profile.id);
    }
  }
};
</script>

<style scoped></style>
