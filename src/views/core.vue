<template>
  <v-content>
    <v-layout class="pa-4 theme--dark fill-height">
      <v-flex md6 offset-md3 class="align-self-center theme--dark">
        <template v-if="booking.error">
          <v-card light>
            <v-card-title primary-title>
              <h1 class="display-1">
                Pffff....
              </h1>
            </v-card-title>
            <v-card-text class="body-2">
              <p>
                This worries not existent at moment. We can forget them, so you can too.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat to="/" block>
                Return to main page
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template v-else-if="booking.loading">
          <v-card light>
            <v-card-title primary-title>
              <h1 class="display-1">
                Wait a second!
              </h1>
            </v-card-title>
            <v-card-text class="body-2">
              <div class="text-xs-center my-4">
                <v-progress-circular :size="60" indeterminate />
              </div>
              <p>
                Loading.... Please wait few seconds or more...
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat to="/" block>
                Return to main page
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template v-else>
          <template v-if="booking.status === 'completed'">
            <v-card light>
              <v-card-title primary-title>
                <h1 class="display-1">
                  Time to pick your worries up!
                </h1>
              </v-card-title>
              <v-card-text>
                <p>
                  For the last {{ duration }}
                  I was taking care of your worries: biting nails, pacing from one corner of the Internet to another,
                  and stress-eating all the visitors’ cookies.
                </p>
                <p>
                  Now it’s time to handle them back to you.
                </p>
                <p class="body-2 mb-0">
                  That’s what you were worrying about:
                </p>
                <ul class="mt-0">
                  <li v-for="(item, index) in booking.worries" :key="index" class="title">
                    {{ item }}
                  </li>
                </ul>
                <p class="body-2 mb-0 mt-3">
                  Now, please take a careful look at them:
                </p>
                <ul class="mt-0">
                  <li>Are these worries really yours, not somebody else’s?</li>
                  <li>Can you really do something about them?</li>
                  <li>Do you still need them? Do these worries motivate you?</li>
                </ul>
                <p class="body-2">
                  If the answers are yes, take them.
                </p>
                <p class="body-2">
                  If not, you can leave them here, it’s just fine.
                </p>
                <p>
                  And if you need more time to focus on solutions, I’m here.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn flat to="/" block>
                  Return to main page
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <template v-else>
            <h1 class="display-1">
              Worrit is working...
            </h1>
            <p>
              Soften your forehead. Relax your sholders. Take a deep breath. Focus on what really matters.
            </p>
            <p>
              Worrit, the world’s first worrysitter, is taking care of your worries. You’ll get an email when it’s time
              to pick your cares up.
            </p>
            <p>
              Until then, don’t worry.
            </p>
            <div class="animation-wrapper">
              <div>...{{ currentWorry.worry }}...</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="60px" viewBox="5 0 80 60">
                <path id="wave" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
              </svg>
              <div>...{{ currentWorry.action }}...</div>
            </div>
            <div class="text-xs-center body-2 mt-2">
              {{ timeLeft }}
            </div>
          </template>
        </template>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script type="text/babel">
import axios from 'axios'
import config from '../config'
import ms from 'ms'
const currentWorry = require('../utils/worry')
const API = axios.create({
  baseURL: config.apiEndPoint
})

export default {
  name: 'Core',
  data() {
    return {
      booking: {
        loading: false,
        error: false
      },
      timeLeft: '',
      rest: 0,
      timer: null,
      currentWorry: {}
    }
  },
  computed: {
    duration() {
      return ms(ms(this.booking.duration), { long: true })
    }
  },
  mounted() {
    this.fetch(this.$route.query.id)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    fetch(id) {
      this.booking = {
        loading: true,
        error: false
      }
      API.get('api/queue/' + id)
        .then(({ data: body }) => {
          this.booking = body.data
          if (this.booking.status === 'processing') {
            this.timer = setInterval(() => {
              this.check()
            }, 1000)
            this.check()
            this.$nextTick().then(() => {
              this.initWave()
            })
          }
        })
        .catch(error => {
          this.booking = {
            loading: false,
            error: true
          }
          console.error(error)
        })
    },
    check() {
      const now = new Date().valueOf()
      const rest = this.booking.before - now
      if (rest <= 0 && this.booking.before) {
        clearInterval(this.timer)
        this.booking.status = 'completed'
      }
      // Format time left
      const seconds = rest > 0 ? Math.floor(rest / 1000) : 0
      const minutes = Math.floor(seconds / 60) % 60
      const hours = Math.floor(seconds / 3600)
      const portions = []
      if (hours) {
        if (hours === 1) {
          portions.push('1 hour')
        } else {
          portions.push(hours + ' hours')
        }
      }
      if (minutes) {
        if (minutes === 1) {
          portions.push('1 minute')
        } else {
          portions.push(minutes + ' minutes')
        }
      } else {
        portions.push('Less then 1 minute')
      }
      portions.push('left')
      this.$set(this, 'rest', rest)
      this.$set(this, 'timeLeft', portions.filter(e => Boolean(e)).join(' '))
      this.currentWorry = currentWorry(this.booking.before, this.booking.worries) || {}
    },
    initWave() {
      const path = document.querySelector('#wave')
      const m = 0.512286623256592433

      function buildWave(w, h) {
        const a = h / 4
        const y = h / 2

        const pathData = [
          'M',
          w * 0,
          y + a / 2,
          'c',
          a * m,
          0,
          -(1 - a) * m,
          -a,
          a,
          -a,
          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a,
          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a,

          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a,
          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a,
          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a,
          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a,
          's',
          -(1 - a) * m,
          a,
          a,
          a,
          's',
          -(1 - a) * m,
          -a,
          a,
          -a
        ].join(' ')

        path.setAttribute('d', pathData)
      }

      buildWave(90, 60)
    }
  }
}
</script>
<style>
.animation-wrapper {
  align-items: center;
  display: flex;
  margin: 0 auto;
  border: 2px solid #fff;
  padding: 6px;
  zoom: 300%;
  flex-direction: column;
}
.animation-wrapper > div {
  text-align: center;
  font-size: 6px;
}
.animation-wrapper > svg {
  margin: 0 auto;
  overflow: hidden;
}

#wave {
  stroke-dasharray: 0 16 101 16;
  animation: moveTheWave 2400ms linear infinite;
}

@keyframes moveTheWave {
  0% {
    stroke-dashoffset: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    stroke-dashoffset: -133;
    transform: translate3d(-90px, 0, 0);
  }
}
</style>
