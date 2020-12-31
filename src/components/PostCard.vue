<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar size="36px" color="grey">
          <img
            v-if="postData.author.picturePath"
            alt="Avatar"
            :src="postData.author.picturePath"
          />
          <v-icon dark v-else>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ postData.author.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{
          new Date(postData.creationTime).toDateString()
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      {{ postData.payload }}
    </v-card-text>

    <v-card-actions>
      <PostCardActions :post-data="postData"></PostCardActions>
    </v-card-actions>
  </v-card>
</template>

<script>
import PostCardActions from "@/components/PostCardActions";

export default {
  name: "PostCard",
  components: { PostCardActions },
  props: {
    postData: {}
  }
};
</script>

<style scoped></style>
