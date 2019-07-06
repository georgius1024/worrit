<template>
  <v-footer dark height="auto">
    <v-layout class="wrapper pa-3" wrap>
      <v-flex xs6 md4>
        <v-layout align-center justify-center>
          Share
          <a class="mt-1" href="https://www.facebook.com/sharer/sharer.php&url=https://worrit.app" target="_blank">
            <img :src="require('../assets/facebook-box.svg')" class="icon">
          </a>
          <a class="mt-1" href="#">
            <img :src="require('../assets/instagram.svg')" class="icon">
          </a>
          <a class="mt-1" href="#">
            <img :src="require('../assets/twitter-box.svg')" class="icon">
          </a>
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
          <a href="mailto://worrit.app@gmail.com" class="mt-1 white--text">Have a suggestion?</a>
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