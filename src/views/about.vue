<template>
  <v-content>
    <v-layout class="pa-4 fill-height">
      <v-flex md6 offset-md3>
        <h1 class="display-1 mb-5">About Worrit</h1>

        <p>Worrit is an experimental project. We decided to try and give one of the modern problems - ever rising
          levels of stress and anxiety - a modern solution. We wanted to see the limits of applying technology to a
          mysterious area of human emotions. And on top of that, we wanted to have fun designing a web service, and
          are curious to see what happens with it in the world.</p>
        <p>Worrit is launched in July 2019. Keep in touch to see how it goes!</p>
        <h3 class="body-2">Have something similar in mind? You can find us here:</h3>
        <p>
          Liubov Timofeeva - concept design, copywriting, graphic design<br>
          <a class="white--text" href="https://adddramabutton.com/" target="_blank">https://adddramabutton.com/</a><br>
          <a class="white--text" href="https://www.linkedin.com/in/lyubov-timofeeva/" target="_blank">https://www.linkedin.com/in/lyubov-timofeeva/</a><br>
        </p>
        <p>
          Yuri Timofeev - UX/UI, web development
          <a class="white--text" href="https://github.com/georgius1024" target="_blank">https://github.com/georgius1024</a>
        </p>
        <img src="/us.png"/>
        <v-divider class="my-4"/>
        <v-btn light large block href="https://forms.gle/AmeP2KhFnYCWxKgNA" target="_blank" class="mt-3">
          Leave a review
        </v-btn>
        <v-btn light large block href="https://paypal.me/worritteam" target="_blank" class="mt-3">
          Support us
        </v-btn>
        <v-btn light large block to="/" class="mt-3">
          Return to main page
        </v-btn>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script type="text/babel">
export default {
  name: 'About'
}
</script>
