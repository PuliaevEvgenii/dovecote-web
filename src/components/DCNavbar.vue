<template>
  <v-navigation-drawer app permanent>
    <v-list-item v-if="isAuth">
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-avatar color="deep-purple lighten-2" size="36">
            <span>{{ initials }}</span>
          </v-avatar>
          {{ currUser.currentUserInfo.login }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-list-item-icon>
    </v-list-item>

    <DCAuthButtonGroup v-else class="authButtons"></DCAuthButtonGroup>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in menu" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="isAuth"
        link
        :to="{
          name: 'Profile',
          params: { id: currUser.currentUserInfo.id }
        }"
      >
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="isAuth"
        link
        :to="{ name: 'Friends', params: { id: currUser.currentUserInfo.id } }"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Friends</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="isAuth" link :to="{ name: 'Chats' }">
        <v-list-item-icon>
          <v-icon>mdi-chat</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Messages</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/action-types";
import DCAuthButtonGroup from "@/components/DCAuthButtonGroup";

export default {
  name: "DCNavbar",
  components: {
    DCAuthButtonGroup
  },
  data: () => ({
    menu: [
      { title: "Feed", icon: "mdi-view-dashboard", link: { name: "Home" } },
      { title: "About", icon: "mdi-help-box", link: { name: "About" } }
    ]
  }),
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    currUser() {
      return this.$store.getters.getCurrUser;
    },
    initials() {
      return this.$store.getters.getInitials;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>

<style scoped></style>
