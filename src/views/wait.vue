<template>
  <v-content>
    <v-layout class="pa-4 theme--dark">
      <v-flex md6 offset-md3>
        <h1 class="display-1 mb-5">Everything is ready</h1>
        <p>
          We send mesage to your email address {email}. Please, confirm your booking by clicking button in message.
        </p>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script type="text/babel">
export default {
  name: "Wait",
  data() {
    return {
      email: ""
    };
  },
  mounted() {
    try {
      this.email = JSON.parse(localStorage.getItem("email")) || "";
    } catch (error) {
      //
    }
  }
};
</script>
