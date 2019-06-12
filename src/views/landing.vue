<template>
  <v-content>
    <v-layout>
      <v-flex md6 offset-md3>
        <h1 class="display-1">Worrit.The world's first worrysitter.</h1>
        <v-layout class="text--accent my-5" row wrap>
          <v-flex class="text-xs-center" xs12 sm4>
            <h3 class="title">5 years</h3>
            <p class="caption">an average person spends worrying in a lifetime</p>
          </v-flex>
          <v-flex class="text-xs-center" xs12 sm4>
            <h3 class="title">38%</h3>
            <p class="caption">of people worry every day</p>
          </v-flex>
          <v-flex class="text-xs-center" xs12 sm4>
            <h3 class="title">85%</h3>
            <p class="caption">of what we worry about never happens</p>
          </v-flex>
        </v-layout>
        <p>
          Your worries are unique and deserve maximum attention. Nobody can attend to them better than you do.
          But sometimes you need a break.
        </p>
        <p>
          Worrit is the world’s first fully automated worrysitter. It keeps your cares under a watchful robot eye for as long as you want, and returns them to you when you’re ready.
          Now you can unblock your mind, focus, or have some carefree time - for free!
        </p>
        <p>Whenever you need to stop worrying, drop it all off right here.</p>
        <div class="text-xs-center mt-4">
          <v-btn :to="{ name: 'main' }">Drop my worries off now</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<style>
.title {
  font-size: 32px !important;
}
.caption {
  font-size: 12px !important;
}
</style>