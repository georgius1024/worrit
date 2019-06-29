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
  scroll-behavior: smooth;
  background: linear-gradient(to bottom, #089393, #0a7bb6);
}
body {
  background: url('./assets/waves.png');
}
.theme--dark.application {
  background: inherit;
}

.text--accent {
  color: #536dfe;
}
</style>
