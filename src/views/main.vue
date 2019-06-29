<template>
  <v-content>
    <v-layout class="pa-4">
      <v-flex md6 offset-md3>
        <h1 class="display-1">Worrit.<br>The world's first worrysitter.</h1>
        <v-layout class="theme--dark mb-1 mt-5" row wrap>
          <v-flex class="text-xs-center" xs12 sm4>
            <div class="max-width-80 h-margin-auto">
              <img :src="require('../assets/5-years.png')" class="icon"/>
              <p class="caption">on average we spends of life worrying</p>
            </div>
          </v-flex>
          <v-flex class="text-xs-center" xs12 sm4>
            <div class="max-width-80 h-margin-auto">
              <img :src="require('../assets/every-day.png')" class="icon"/>
              <p class="caption">38% of people worry every day</p>
            </div>
          </v-flex>
          <v-flex class="text-xs-center" xs12 sm4>
            <div class="max-width-80 h-margin-auto">
              <img :src="require('../assets/never-happens.png')" class="icon"/>
              <p class="caption">85% of what we worry about never happens</p>
            </div>
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
          <v-btn @click="toMain">Drop my worries off now</v-btn>
        </div>

        <h1 class="display-1" id="main">Check-in your worries here</h1>
        <p>Enter your worries in the following form, one by one, as many as you want. Complete sentence "I worry about&hellip;" </p>
        <p v-for="(pair, index) in pairs" :key="pair.worry">
          <v-text-field
            background-color="#fff"
            light
            box
            :label="pair.prompt"
            v-model="pair.worry"
            :autofocus="index === lastEditedWorry"
            @input="updateItem(index, pair.worry)"
            append-icon="clear"
            @click:append-outer="removeItem(index)"
          />
        </p>
        <v-text-field
          background-color="#fff"
          light
          box
          label="I worry about..."
          v-model="worry"
          append-icon="add"
          @keyup.enter="addItem"
          @click:append-outer="addItem"
        />
        <div class="mt-3 mb-5 v-label theme--dark">For how many hours you want to drop them?</div>
        <v-slider
          dark
          always-dirty
          v-model="hours"
          color="#fff"
          max="24"
          min="1"
          height="48"
          ticks
          thumb-color="#777"
          tick-size="4"
          thumb-label="always"
          :rules="[validation.fieldIsRequired]"
          @input="store()"
        />
        <v-text-field
          background-color="#fff"
          light
          box
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
          <v-btn id="cta" @click="book()" :disabled="!(agreed && worriesIsOK && emailIsOk) ">Start my break</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import validation from '../utils/validation'
import axios from 'axios'
import config from '../config'

const API = axios.create({
  baseURL: config.apiEndPoint
})

export default {
  name: 'Main',
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
    toMain() {
      document.querySelector('#main').scrollIntoView({
        behavior: 'smooth'
      });
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
<style>
  #cta[disabled] {
    background-color: #777 !important;
  }
  .display-1 {
    font-weight: bold;
  }
  .v-messages__message {
    color: #fff !important;
  }
  #main {
    margin-top: 50%
  }
  .max-width-80 {
    max-width: 80px;
  }
  .h-margin-auto {
    margin: 0 auto
  }
</style>