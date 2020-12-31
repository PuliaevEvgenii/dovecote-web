<template>
  <v-container fluid>
    <v-tabs>
      <v-tab :to="{ name: 'AllUsers' }">All users</v-tab>
      <v-tab :to="{ name: 'Friends', params: { id: this.currUserId } }"
        >Friends
      </v-tab>
      <v-tab :to="{ name: 'Subscribers', params: { id: this.currUserId } }"
        >Subscribers
      </v-tab>
      <v-tab :to="{ name: 'Subscriptions', params: { id: this.currUserId } }"
        >Subscriptions
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "Users",
  computed: {
    currUserId() {
      return this.$store.getters.getCurrUserId;
    }
  }
};
</script>

<style scoped></style>
