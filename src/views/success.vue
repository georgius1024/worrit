<template>
  <v-card class="mx-auto my-auto" raised max-width="400">
    <v-card-title>
      <span class="title">Your break had started!</span>
    </v-card-title>
    <v-card-text class="text-xs-center text-accent">
      <p>Soften your forehead. Relax your sholders. Take a deep breath with your belly.</p>
      <p>
        You have successfully checked your worries in
        for {{hours}} hours. We will send them back to you at {{email}} when the time comes.
      </p>
      <p>Until then, don’t worry.</p>
    </v-card-text>
    <AboutButton/>
  </v-card>
</template>
<script type="text/babel">
import AboutButton from "../components/about";
export default {
  name: "Success",
  components: {
    AboutButton
  },
  data() {
    return {
      worries: [],
      hours: 3,
      email: ""
    };
  },
  mounted() {
    try {
      this.worries = JSON.parse(localStorage.getItem("worries")) || [];
      this.hours = JSON.parse(localStorage.getItem("hours")) || 3;
      this.email = JSON.parse(localStorage.getItem("email")) || "";
    } catch (error) {
      //
    }
  }
};
</script>
