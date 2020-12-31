<template>
  <div class="home">
    <div>{{ getAuth }}</div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  computed: {
    getAuth() {
      return this.$store.state.auth.isAuthenticated;
    }
  }
};
</script>
