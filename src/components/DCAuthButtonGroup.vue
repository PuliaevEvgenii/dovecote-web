<template>
  <v-container fluid class="mx-3">
    <v-row>
      <v-btn link :to="{ name: 'Login' }">
        Login
      </v-btn>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn color="deep-purple lighten-2" link :to="{ name: 'Registration' }">
        Register
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DCAuthButtonGroup"
};
</script>

<style scoped></style>
