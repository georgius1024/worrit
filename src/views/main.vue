<template>
  <v-content>
    <v-layout>
      <v-flex md6 offset-md3>
        <h1 class="display-1">Check-in your worries here</h1>
        <p>Enter your worries in the following form, one by one, as many as you want.</p>
        <v-text-field
          label="I worry about"
          v-model="worry"
          append-outer-icon="add"
          @keyup.enter="addItem"
          @click:append-outer="addItem"
        />
        <p v-for="(pair, index) in pairs" :key="pair.worry">
          <v-text-field
            :label="pair.prompt"
            v-model="pair.worry"
            :autofocus="index === lastEditedWorry"
            @input="updateItem(index, pair.worry)"
            append-outer-icon="clear"
            @click:append-outer="removeItem(index)"
          />
        </p>
        <div class="mt-3 v-label theme--light">For how many hours you want to drop them?</div>
        <v-slider
          v-model="hours"
          max="24"
          min="1"
          ticks
          thumb-color="#777"
          tick-size="2"
          :tick-labels="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"
          :rules="[validation.fieldIsRequired]"
          @input="store()"
        />
        <v-text-field
          v-model="email"
          @input="store()"
          :rules="[validation.emailIsRequired, validation.emailMustBeValid]"
          type="email"
          label="An email where we'll return your worries after the time period ends"
        />
        <v-checkbox v-model="agreed" label="Accept the Privacy Policy"></v-checkbox>
        <p
          class="text--accent"
        >We don’t need your personal info. We keep your email just until your booked period ends, and cancel it afterwards. We don’t share your data with third parties. We might keep the worries you entered for the service development purposes, so please don’t insert any contact or identifying information there.</p>
        <div class="text-xs-center mt-4">
          <v-btn :to="{ name: 'success' }" :disabled="!agreed">Start my break</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <AboutButton/>
  </v-content>
</template>
<script>
import AboutButton from "../components/about";
import validation from "../utils/validation";
export default {
  name: "Main",
  components: {
    AboutButton
  },
  data() {
    return {
      worries: [],
      worry: "",
      hours: 3,
      email: "",
      agreed: false,
      lastEditedWorry: -1,
      validation
    };
  },
  computed: {
    pairs() {
      return this.worries.map((worry, index) => {
        return {
          prompt: this.worryVerb(index),
          worry
        };
      });
    }
  },
  created() {
    this.restore();
  },
  mounted() {
    const landingHasBeenSeen = localStorage.getItem("landingHasBeenSeen");
    if (!landingHasBeenSeen) {
      this.$router.push("landing");
      localStorage.setItem("landingHasBeenSeen", true);
    }
  },
  beforeDestroy() {
    this.store();
  },
  methods: {
    addItem() {
      if (this.worries.indexOf(this.worry) === -1) {
        this.worries = this.worries.concat([this.worry]);
        this.worry = "";
      }
      this.store();
    },
    updateItem(index, worry) {
      this.worries = this.worries.map((oldWorry, worryIndex) => {
        return worryIndex === index ? worry : oldWorry;
      });
      this.lastEditedWorry = index;
      this.store();
    },
    removeItem(index) {
      this.worries = this.worries.filter(
        (worry, worryIndex) => worryIndex !== index
      );
      this.store();
    },
    restore() {
      try {
        this.worries = JSON.parse(localStorage.getItem("worries")) || [];
        this.hours = JSON.parse(localStorage.getItem("hours")) || 3;
        this.email = JSON.parse(localStorage.getItem("email")) || "";
      } catch (error) {
        this.worries = [];
        this.hours = 3;
      }
    },
    store() {
      localStorage.setItem("worries", JSON.stringify(this.worries));
      localStorage.setItem("hours", JSON.stringify(this.hours));
      localStorage.setItem("email", JSON.stringify(this.email));
    },
    worryVerb(index) {
      switch (index) {
        case 0:
          return "What worries me is that...";
        case 1:
          return "and that...";
        case 2:
          return "and if all of this wasn't enough...";
        case 3:
          return "and...";
      }
    }
  }
};
</script>
