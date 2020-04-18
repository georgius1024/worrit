<template>
  <v-content id="top">
    <v-fade-transition>
      <v-layout class="pa-4" v-show="step === 0">
        <v-flex md6 offset-md3>
          <h1 class="display-1 mb-5">Worrit.<br />The world's first worrysitter.</h1>
          <p>
            In average,
            <a
              href="https://www.counselheal.com/articles/3609/20130128/average-person-spends-5-years-life-worrying.htm"
              class="white-link"
              target="_blank"
            >
              we spend 5 years of our lives worrying </a
            >, even if
            <a
              href="https://www.huffpost.com/entry/85-of-what-we-worry-about_b_8028368"
              class="white-link"
              target="_blank"
            >
              85% of what we worry about never happens </a
            >.
            <a
              href="https://www.webmd.com/balance/guide/how-worrying-affects-your-body"
              class="white-link"
              target="_blank"
            >
              Constant worrying takes a toll on your emotional and physical health </a
            >, it prevents you from living in the moment, acting boldly, and working towards reaching your dreams.
          </p>
          <p>
            The Internet has many tips to stop worrying - breathe, meditate, exercise, call a therapist, take off to a
            buddhist monastery. But sometimes what you need a is just a quick fix, a pause, a breath of fresh air. This
            is what Worrit is for.
          </p>
          <p>
            <b>
              Worrit is the world’s first fully automated worrysitter. Here’s how it works:
            </b>
          </p>
          <ol>
            <li>You submit a list of worries that you want to pause.</li>
            <li>Worrit keeps them under a watchful robot eye and returns to you when you’re ready.</li>
            <li>Immediately after, your data is automatically deleted to ensure that your experience is private.</li>
          </ol>
          <p class="mt-4">
            Worrit allows you to unblock your mind, regain your strength, and focus on solutions instead of problems,
            <b>for free</b>.
          </p>
          <div class="text-xs-center mt-4">
            <v-btn light large block @click="toMain">
              Drop my worries off now
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-fade-transition>
    <v-fade-transition>
      <v-layout class="pa-4" id="main" v-show="step === 1">
        <v-flex md6 offset-md3>
          <h1 class="display-1 mb-4">Pause your worries, book a worrysitter</h1>
          <div class="mb-3 v-label white--text">
            What bugs you, disturbs you, terrifies you, keeps you up at night? Enter your worries in the following form,
            one by one, as many as you want.
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
          <div class="mt-3 mb-5 v-label white--text">For how many hours you want to pause them?</div>
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
          <div class="v-label white--text mb-3" style="line-height: 21px">
            Your email. We need it to send your worries back when your booked period is over.
          </div>
          <v-text-field
            background-color="#fff"
            light
            solo
            v-model="email"
            @input="store()"
            :rules="[validation.emailIsRequired, validation.emailMustBeValid]"
            type="email"
            placeholder="Your awesome email"
          />
          <v-checkbox v-model="agreed" label="Accept the Privacy Policy." />
          <div class="v-label white--text mb-3" style="line-height: 21px">
            <v-icon class="mr-2">
              picture_as_pdf
            </v-icon>
            <a class="white--text" href="/worrit_privacy_policy.pdf" target="_blank">See Worrit privacy policy</a>
          </div>
          <div class="v-label white--text mb-3" style="line-height: 21px">
            We only use your data to deliver the service, delete it shortly afterwards and don’t share it for any
            commercial purposes.
          </div>
          <div class="text-xs-center mt-4">
            <v-btn light large block id="cta" @click="book()" :disabled="!(agreed && worriesIsOK && emailIsOk)">
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
      this.worries = this.worries
        .map((oldWorry, worryIndex) => {
          return worryIndex === index ? worry : oldWorry
        })
        .filter(worry => Boolean(worry))
      this.lastEditedWorry = index
      this.store()
    },
    removeItem(index) {
      this.worries = this.worries.filter((worry, worryIndex) => worryIndex !== index)
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
          /*eslint-disable */
          return `and if all of this wasn't enough...`
          /*eslint-enable */
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

#cta[disabled] {
  background-color: #ccc !important;
  color: #333 !important;
  cursor: not-allowed !important;
  filter: blur(1px);
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
  margin: 0 auto;
}

.quote {
  font-size: 18px;
  letter-spacing: 1px;
  font-style: italic;
}

.white-link,
white-link:visited {
  text-decoration: none;
  color: #eee;
}

.white-link:hover {
  text-decoration: underline;
}
</style>
