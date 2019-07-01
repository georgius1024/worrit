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
import Footer from './components/footer'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>

html {
  overflow-y: auto;
  scroll-behavior: smooth;
  background: linear-gradient(to bottom, #0eaba1, #0a7bb6);
}

body {
  background-image: url('./assets/waves.png');
  background-repeat: repeat;
}

.height-100 {
  min-height: 100vh;
}


.theme--dark.application {
  background: inherit;
}

.text--accent {
  color: #536dfe;
}
</style>
