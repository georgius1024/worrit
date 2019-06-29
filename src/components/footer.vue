<template>
  <v-footer dark class="mt-5">
    <v-layout class="wrapper" wrap>
      <v-flex xs12 md4>
        <v-layout align-center justify-center>
          Share
          <img :src="require('../assets/facebook-box.svg')" class="icon">
          <img :src="require('../assets/instagram.svg')" class="icon">
          <img :src="require('../assets/twitter-box.svg')" class="icon">
        </v-layout>
      </v-flex>
      <v-flex xs12 md4 class="text-xs-center">
        <v-layout align-center justify-center>
          Support the project
        </v-layout>
      </v-flex>
      <v-flex xs12 md4>
        <v-layout align-center justify-center>
          <a href="mailto://worrit.app@gmail.com" class="white--text">Have a suggestion?</a>
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
  background: rgba(10, 123, 182, 0.8);
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