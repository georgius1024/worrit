<template>
  <v-footer app dark>
    <v-layout>
      <v-flex xs12 md4>
        <v-layout align-center justify-center>
          <img :src="require('../assets/facebook-box.svg')" class="icon">
          <img :src="require('../assets/instagram.svg')" class="icon">
          <img :src="require('../assets/twitter-box.svg')" class="icon">
          Share
        </v-layout>
      </v-flex>
      <v-flex xs12 md4 class="text-xs-center">
        <v-layout align-center justify-center>
          <img :src="require('../assets/paypal.svg')" class="icon">
          Buy us a coffe
        </v-layout>
      </v-flex>
      <v-flex xs12 md4>
        <v-layout align-center justify-center>
          <img :src="require('../assets/message-alert.svg')" class="icon">
          Have a suggestion? Get in touch
        </v-layout>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script type="text/babel">
import fbIcon from "../assets/facebook-box.svg";
export default {
  name: "Footer"
};
</script>
<style scoped>
.icon {
  width: 24px;
  height: 24px;
  filter: invert(1);
  margin: 0 2px;
}
</style>