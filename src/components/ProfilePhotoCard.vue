<template>
  <v-card class="my-6">
    <v-img v-if="!!picturePath" :aspect-ratio="1" :src="picturePath"></v-img>
    <v-avatar v-else size="100%" height="200px" color="grey">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <v-card-actions v-if="isMyProfile">
      <v-btn block outlined>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProfilePhotoCard",
  computed: {
    isMyProfile() {
      return this.$store.getters.isMyProfile;
    },
    picturePath() {
      return this.$store.getters.getProfile.picturePath;
    }
  }
};
</script>

<style scoped></style>
