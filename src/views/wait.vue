<template>
  <v-content>
    <v-layout class="pa-4 fill-height">
      <v-flex md4 offset-md4 class="theme--dark align-self-center">
        <v-card light>
          <v-card-title primary-title>
            <h1 class="display-1">Almost here!</h1>
          </v-card-title>
          <v-card-text class="body-2">
            <p>
              Check your inbox!
            </p>
            <p>
              We sent you a message to make sure this email is yours. Please open it to start your booking.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn flat to="/" block>
              Return to main page
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-content>
</template>
<script type="text/babel">
export default {
  name: 'Wait',
  data() {
    return {
      email: '',
      timePassed: false
    }
  },
  mounted() {
    try {
      this.email = JSON.parse(localStorage.getItem('email')) || ''
    } catch (error) {
      //
    }
  }
}
</script>
