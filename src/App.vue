<template>
  <div classs="app-wrapper">
    <v-app dark>
      <v-fade-transition>
        <router-view/>
      </v-fade-transition>
      <Footer/>
    </v-app>
  </div>
</template>
<script type="text/babel">
import Footer from "./components/footer";
export default {
  name: "App",
  components: {
    Footer
  }
};
</script>

<style>

html {
  overflow-y: auto;
  background: linear-gradient(to bottom, #0eaba1, #0a7bb6);
}
.theme--dark.application {
  background: inherit;
}

.text--accent {
  color: #536dfe;
}
</style>
