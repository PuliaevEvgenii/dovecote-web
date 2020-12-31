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
import { FETCH_SUBSCRIBERS_REQUEST } from "@/store/action-types";

export default {
  name: "Subscribers",
  props: {
    id: Number
  },
  components: { DCUserRow },
  data: () => ({}),
  computed: {
    users() {
      return this.$store.getters.getSubscribers;
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_SUBSCRIBERS_REQUEST, this.id);
  }
};
</script>

<style scoped></style>
