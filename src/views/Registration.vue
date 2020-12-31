<template>
  <v-card elevation="8" width="320" class="card">
    <v-card-title>Register</v-card-title>
    <v-form class="form">
      <v-text-field v-model="firstName" label="First Name" required />
      <v-text-field v-model="lastName" label="Last Name" required />
      <v-text-field v-model="login" label="Login" required />
      <v-text-field v-model="password" label="Password" required />
    </v-form>
    <v-card-actions>
      <v-btn @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { REGISTRATION_REQUEST } from "@/store/action-types";

export default {
  name: "Registration",
  data() {
    return {
      firstName: "",
      lastName: "",
      login: "",
      password: ""
    };
  },
  methods: {
    register: function() {
      const { firstName, lastName, login, password } = this;
      this.$store
        .dispatch(REGISTRATION_REQUEST, {
          firstName,
          lastName,
          login,
          password
        })
        .then(() => {
          this.$router.push({ name: "Profile" });
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
