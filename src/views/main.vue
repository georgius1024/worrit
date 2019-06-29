<template>
  <v-content>
    <v-layout>
      <v-flex md6 offset-md3>
        <h1 class="display-1">Check-in your worries here</h1>
        <p>Enter your worries in the following form, one by one, as many as you want.</p>
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
        <v-text-field
          label="I worry about..."
          v-model="worry"
          append-outer-icon="add"
          @keyup.enter="addItem"
          @click:append-outer="addItem"
        />
        <div class="mt-3 mb-5 v-label theme--light">For how many hours you want to drop them?</div>
        <v-slider
          always-dirty
          v-model="hours"
          max="24"
          min="1"
          ticks
          thumb-color="#777"
          tick-size="4"
          thumb-label="always"
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
        <p>
          We don’t need your personal info. We keep your email just until your booked period ends, and cancel it
          afterwards. We don’t share your data with third parties. We might keep the worries you entered for the service
          development purposes, so please don’t insert any contact or identifying information there.
        </p>
        <div class="text-xs-center mt-4">
          <v-btn @click="book()" :disabled="!(agreed && worriesIsOK && emailIsOk) ">Start my break</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <AboutButton/>
  </v-content>
</template>
<script>
import AboutButton from '../components/about'
import validation from '../utils/validation'
import axios from 'axios'
import config from '../config'

const API = axios.create({
  baseURL: config.apiEndPoint
})

export default {
  name: 'Main',
  components: {
    AboutButton
  },
  data() {
    return {
      worries: [],
      worry: '',
      hours: 3,
      email: '',
      agreed: false,
      lastEditedWorry: -1,
      validation
    }
  },
  computed: {
    pairs() {
      return this.worries.map((worry, index) => {
        return {
          prompt: this.worryVerb(index),
          worry
        }
      })
    },
    filteredWorries() {
      return this.worries.filter(worry => Boolean(worry))
    },
    effectiveWorries() {
      return [...this.worries, this.worry].filter(worry => Boolean(worry))
    },
    worriesIsOK() {
      return this.effectiveWorries.length > 0
    },
    emailIsOk() {
      return this.email && validation.emailMustBeValid(this.email) === true
    }
  },
  created() {
    this.restore()
  },
  mounted() {
    const landingHasBeenSeen = localStorage.getItem('landingHasBeenSeen')
    if (!landingHasBeenSeen) {
      this.$router.push('landing')
      localStorage.setItem('landingHasBeenSeen', true)
    }
  },
  beforeDestroy() {
    this.store()
  },
  methods: {
    addItem() {
      if (this.worries.indexOf(this.worry) === -1) {
        this.worries = this.worries.concat([this.worry])
        this.worry = ''
      }
      this.store()
    },
    updateItem(index, worry) {
      this.worries = this.worries.map((oldWorry, worryIndex) => {
        return worryIndex === index ? worry : oldWorry
      })
      this.lastEditedWorry = index
      this.store()
    },
    removeItem(index) {
      this.worries = this.worries.filter(
        (worry, worryIndex) => worryIndex !== index
      )
      this.store()
    },
    restore() {
      try {
        this.worries = JSON.parse(localStorage.getItem('worries')) || []
        this.hours = JSON.parse(localStorage.getItem('hours')) || 3
        this.email = JSON.parse(localStorage.getItem('email')) || ''
      } catch (error) {
        this.worries = []
        this.hours = 3
      }
    },
    store() {
      localStorage.setItem('worries', JSON.stringify(this.worries))
      localStorage.setItem('hours', JSON.stringify(this.hours))
      localStorage.setItem('email', JSON.stringify(this.email))
    },
    worryVerb(index) {
      switch (index) {
        case 0:
          return 'What worries me is that...'
        case 1:
          return 'and...'
        case 2:
          return 'and if all of this wasn\'t enough...'
        case 3:
          return 'and...'
        case 4:
          return 'but that too...'
        default:
          return 'and...'
      }
    },
    book() {
      const data = {
        email: this.email,
        duration: this.hours,
        worries: this.effectiveWorries
      }
      API.post('api/queue', data)
        .then(() => {
          this.$router.push({ name: 'success' })
        })
        .catch(console.error)
    }
  }
}
</script>
