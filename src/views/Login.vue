<template>
  <v-card elevation="8" width="320" class="card">
    <v-card-title>Sign in</v-card-title>
    <v-form class="form">
      <v-text-field v-model="username" label="Login" required />
      <v-text-field v-model="password" label="Password" required />
    </v-form>
    <v-card-actions>
      <v-btn @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { AUTH_REQUEST } from "@/store/action-types";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>

<style scoped>
.form {
  margin: 20px;
}
.card {
  margin: 40px auto auto;
}
</style>
