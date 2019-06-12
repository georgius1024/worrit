<template>
  <v-app>
    <v-fade-transition>
      <router-view/>
    </v-fade-transition>
    <Footer/>
  </v-app>
</template>
<script>
export default {
  name: "App"
};
</script>

<style>
html {
  overflow-y: auto;
}
.text--accent {
  color: #536dfe;
}
</style>
<script type="text/babel">
import Footer from "./components/footer";
export default {
  name: "App",
  components: {
    Footer
  }
};
</script>
