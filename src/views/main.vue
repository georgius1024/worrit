<template>
  <v-content id="top">
    <v-fade-transition>
      <v-layout class="pa-4" v-show="step===0">
        <v-flex md6 offset-md3>
          <h1 class="display-1 mb-5">Worrit.<br>The world's first worrysitter.</h1>
          <v-layout class="theme--dark mb-1 mt-5 hidden-sm-and-down" row wrap>
            <v-flex class="text-xs-center" sm4>
              <div class="max-width-80 h-margin-auto">
                <img :src="require('../assets/5-years.png')" class="icon"/>
                <p class="caption">on average we spends 5 years of life worrying</p>
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
          <v-layout class="theme--dark mb-1 mt-5 hidden-md-and-up" column>
            <p class="caption my-2">
              <img :src="require('../assets/5-years.png')" class="small-icon v-middle mr-2"/>
              on average we spends 5 years of life worrying
            </p>
            <p class="caption my-2">
              <img :src="require('../assets/every-day.png')" class="small-icon v-middle mr-2"/>
              38% of people worry every day
            </p>
            <p class="caption my-2">
              <img :src="require('../assets/never-happens.png')" class="small-icon v-middle mr-2"/>
              85% of what we worry about never happens
            </p>
          </v-layout>
          <p>
            Your worries are unique and deserve maximum attention. Nobody can attend to them better than you do.
            But sometimes you need a break.
          </p>
          <p>
            Worrit is the world’s first fully automated worrysitter. It keeps your cares under a watchful robot eye
            for
            as long as you want, and returns them to you when you’re ready.
            Now you can unblock your mind, focus, or have some carefree time - for free!
          </p>
          <p>Whenever you need to stop worrying, drop it all off right here.</p>
          <div class="text-xs-center mt-4">
            <v-btn light large block @click="toMain">
              Drop my worries off now
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-fade-transition>
    <v-fade-transition>
      <v-layout class="pa-4" id="main" v-show="step===1">
        <v-flex md6 offset-md3>
          <h1 class="display-1 mb-4">Check-in your worries here</h1>
          <div class="mb-3 v-label white--text">
            Enter your worries in the following form, one by one, as many as you want. Complete sentence "I worry
            about&hellip;"
          </div>
          <div v-for="(pair, index) in pairs" :key="pair.worry">
            <v-text-field
              background-color="#fff"
              light
              solo
              :label="pair.prompt"
              v-model="pair.worry"
              :autofocus="index === lastEditedWorry"
              @input="updateItem(index, pair.worry)"
              append-icon="clear"
              @click:append="removeItem(index)"
            />
          </div>
          <v-text-field
            background-color="#fff"
            light
            solo
            label="I worry about..."
            v-model="worry"
            append-icon="add"
            @keyup.enter="addItem"
            @click:append="addItem"
          />
          <div class="mt-3 mb-5 v-label white--text">For how many hours you want to drop them?</div>
          <v-slider
            dark
            always-dirty
            class="px-2"
            v-model="hours"
            color="#fff"
            max="24"
            min="1"
            height="48"
            ticks="always"
            thumb-color="#333"
            tick-size="6"
            thumb-label="always"
            :step="smallDevice ? 2 : 1"
            :rules="[validation.fieldIsRequired]"
            @input="store()"
          />
          <v-text-field
            background-color="#fff"
            light
            solo
            v-model="email"
            @input="store()"
            :rules="[validation.emailIsRequired, validation.emailMustBeValid]"
            type="email"
            label="An email where we'll return your worries after the time period ends"
          />
          <v-checkbox v-model="agreed" label="Accept the Privacy Policy"></v-checkbox>
          <div class="v-label white--text" style="line-height: 21px">
            We don’t need your personal info. We keep your email just until your booked period ends, and cancel it
            afterwards. We don’t share your data with third parties. We might keep the worries you entered for the
            service
            development purposes, so please don’t insert any contact or identifying information there.
          </div>
          <div class="text-xs-center mt-4">
            <v-btn light large block id="cta" @click="book()" :disabled="!(agreed && worriesIsOK && emailIsOk) ">
              Start my break
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-fade-transition>
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
      step: 0,
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
    },
    smallDevice() {
      return ['xs', 'sm'].includes(this.$vuetify.breakpoint.name)
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
      if (this.worry && this.worries.indexOf(this.worry) === -1) {
        this.worries = this.worries.concat([this.worry])
        this.worry = ''
      }
      this.store()
    },
    updateItem(index, worry) {
      this.worries = this.worries.map((oldWorry, worryIndex) => {
        return worryIndex === index ? worry : oldWorry
      }).filter(worry => Boolean(worry))
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
      this.step = 1
    },
    book() {
      const data = {
        email: this.email,
        duration: this.hours + 'h',
        worries: this.effectiveWorries
      }
      API.post('api/queue', data)
        .then(() => {
          this.$router.push({ name: 'wait' })
        })
        .catch(console.error)
    }
  }
}
</script>
<style>

.small-icon {
  width: 24px;
}

.v-middle {
  vertical-align: middle;
}

.display-1 {
  font-weight: 800;
}

.v-messages__message {
  color: #fff !important;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.5);
}

.max-width-80 {
  max-width: 80px;
}

.h-margin-auto {
  margin: 0 auto
}
</style>