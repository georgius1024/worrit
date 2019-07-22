<template>
  <v-footer dark height="auto">
    <v-layout class="wrapper pa-3" wrap>
      <v-flex xs6 md4>
        <v-layout align-center justify-center>
          <div class="sharethis-inline-share-buttons"></div>
        </v-layout>
      </v-flex>
      <v-flex xs6 md4 class="text-xs-center">
        <v-layout align-center justify-center>
          <a class="mt-1 white--text" href="#">
            Support the project
          </a>
        </v-layout>
      </v-flex>
      <v-flex xs12 md4>
        <v-layout align-center justify-center>
          <a href="https://forms.gle/AmeP2KhFnYCWxKgNA" target="_blank" class="mt-1 white--text">Have a suggestion?</a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script type="text/babel">
export default {
  name: "Footer"
};
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