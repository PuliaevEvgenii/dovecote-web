<template>
  <v-container fluid>
    <DCUserRow
      v-for="item in users"
      :key="item.name"
      :user-row="item"
      class="mx-auto my-3"
    ></DCUserRow>
  </v-container>
</template>

<script>
import DCUserRow from "@/components/DCUserRow";
import { FETCH_FRIENDS_REQUEST } from "@/store/action-types";

export default {
  name: "Friends",
  props: {
    id: Number
  },
  components: { DCUserRow },
  data: () => ({}),
  computed: {
    users() {
      return this.$store.getters.getFriends;
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_FRIENDS_REQUEST, this.id);
  }
};
</script>

<style scoped></style>
