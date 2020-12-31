<template>
  <v-app>
    <DCNavbar></DCNavbar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DCNavbar from "@/components/DCNavbar";

export default {
  name: "App",
  components: {
    DCNavbar
  }
};
</script>
