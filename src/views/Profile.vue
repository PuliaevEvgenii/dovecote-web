<template>
  <v-container fluid>
    <ProfileGroup :loading="loading"></ProfileGroup>
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post-data="post"
      class="mx-auto my-3"
    >
    </PostCard>
  </v-container>
</template>

<script>
import {
  FETCH_PROFILE_REQUEST,
  FETCH_WALL_POSTS_REQUEST
} from "@/store/action-types";
import ProfileGroup from "@/components/ProfileGroup";
import PostCard from "@/components/PostCard";

export default {
  name: "Profile",
  components: { PostCard, ProfileGroup },
  props: {
    id: Number
  },
  data: () => ({
    loading: true
  }),
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_WALL_POSTS_REQUEST, this.id);
    this.$store.dispatch(FETCH_PROFILE_REQUEST, this.id).then(() => {
      this.loading = false;
    });
  }
};
</script>

<style scoped></style>
