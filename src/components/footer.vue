<template>
  <v-footer dark height="auto">
    <v-layout class="wrapper pa-3" wrap>
      <v-flex xs6 md3>
        <v-layout align-center justify-center>
          <div class="sharethis-inline-share-buttons"></div>
        </v-layout>
      </v-flex>
      <v-flex xs6 md3 class="text-xs-center">
        <v-layout align-center justify-center>
          <router-link class="mt-1 white--text" :to="{ name: 'about' }">
            About Worrit
          </router-link>
        </v-layout>
      </v-flex>
      <v-flex xs6 md3 class="text-xs-center">
        <v-layout align-center justify-center>
          <a class="mt-1 white--text" href="https://paypal.me/worritteam" target="_blank">
            Support Us
          </a>
        </v-layout>
      </v-flex>
      <v-flex xs6 md3 class="text-xs-center">
        <v-layout align-center justify-center>
          <a class="mt-1 white--text" href="https://forms.gle/AmeP2KhFnYCWxKgNA" target="_blank">
            Leave a review
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script type="text/babel">
export default {
  name: 'Footer'
}
</script>
<style scoped>
.v-footer.theme--dark {
  background: rgba(10, 123, 182, 0.7);
}

.wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.icon {
  width: 24px;
  height: 24px;
  filter: invert(1);
  margin: 0 2px;
}
</style>
