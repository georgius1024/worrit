<template>
  <v-content>
    <v-layout class="pa-4 theme--dark">
      <v-flex md6 offset-md3>
        <h1 class="display-1 mb-5">Everything is ready</h1>
        <p>
          We send mesage to your email address {{email}}. Check your mail box very soon.
          Please, confirm your booking by clicking button in message.
        </p>
        <v-fade-transition>
          <div v-if="timePassed">
            <v-divider class="my-4"/>
            <v-btn to="/" block>
              Return to main page
            </v-btn>
          </div>
        </v-fade-transition>

      </v-flex>
    </v-layout>
  </v-content>
</template>
<script type="text/babel">
export default {
  name: "Wait",
  data() {
    return {
      email: "",
      timePassed: false,
      timer: null
    };
  },
  mounted() {
    try {
      this.email = JSON.parse(localStorage.getItem("email")) || "";
    } catch (error) {
      //
    }
    this.timer = setTimeout(() => {
      this.$set(this, 'timePassed', true)
    }, 2 * 1000)
  }
};
</script>
