<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
    disable-pagination
    hide-default-footer
  ></v-data-table>
</template>

<script>
import { FETCH_STATISTICS_REQUEST } from "@/store/action-types";

export default {
  name: "About",
  data: () => ({
    headers: [
      {
        text: "Full name",
        align: "start",
        sortable: false,
        value: "0"
      },
      { text: "Posts amount", value: "1" },
      { text: "Most unpopular post", value: "2" },
      { text: "Most popular post", value: "3" },
      { text: "Average likes per post", value: "4" },
      { text: "Total likes", value: "5" }
    ]
  }),
  computed: {
    users() {
      return this.$store.getters.getStatistics;
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_STATISTICS_REQUEST);
  }
};
</script>
