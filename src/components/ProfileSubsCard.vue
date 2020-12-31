<template>
  <v-card class="my-6">
    <v-card-actions>
      <v-row>
        <v-btn
          color="deep-purple lighten-2"
          text
          :to="{ name: 'Friends', params: { id: profile.id } }"
        >
          Friends {{ profile.friends }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          color="deep-purple lighten-2"
          text
          :to="{ name: 'Subscribers', params: { id: profile.id } }"
        >
          Subscribers {{ profile.subscribers }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          color="deep-purple lighten-2"
          text
          :to="{ name: 'Subscriptions', params: { id: profile.id } }"
        >
          Subscriptions {{ profile.subscriptions }}
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProfileSubsCard",
  computed: {
    profile() {
      return this.$store.getters.getProfile;
    }
  }
};
</script>

<style scoped></style>
