<template>
  <v-content>
    <v-flex md6 offset-md3 class="pa-4 theme--dark">
      <template v-if="booking.error">
        <v-flex md6 offset-md3>
          <h1>Pffff....</h1>
          <p>This worries not existent at moment. We can forget forget them, so You can too.</p>
        </v-flex>
      </template>
      <template v-else>
        <template v-if="booking.loading">
          <h1>Wait a second...</h1>
          <p>Loading.... Please wait few seconds or more...</p>
        </template>
        <template v-else>
          <template v-if="booking.status === 'completed'">
            <h1>COMPLETED!!!</h1>
            {{booking}}
          </template>
          <template v-else>
            <h1>PROCESSING: {{rest}}!!!</h1>
            {{booking}}
          </template>
        </template>
      </template>
      <template v-if="!booking.loading">
        <v-divider class="my-4"/>
        <v-btn to="/" block>
          Return to main page
        </v-btn>
      </template>
    </v-flex>
  </v-content>
</template>
<script type="text/babel">
import axios from 'axios'
import config from '../config'
const API = axios.create({
  baseURL: config.apiEndPoint
})

export default {
  name: "Wait",
  data() {
    return {
      booking: {
        loading: false,
        error: false,
      },
      rest: 0,
      timer: null
    };
  },
  mounted() {
    this.fetch(this.$route.params.id)
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
        loading: false,
        error: false,
      }
      this.loading = true
      API.get('api/queue/' + id)
      .then(({ data: body }) => {
        this.booking = body.data
        if (this.booking.status === 'processing') {
          this.timer = setInterval(() => {
            this.check()
          }, 1000)
          this.check()
        }
      })
      .catch(error => {
        this.booking = {
          loading: false,
          error: true,
        }
        console.error(error)
      })
    },
    check() {
      const now = (new Date()).valueOf()
      const rest = this.booking.before - now
      this.$set(this, 'rest', rest)
      if (rest <= 0 && this.booking.before) {
        clearInterval(this.timer)
        this.fetch(this.$route.params.id)
      }
    }
  }
};
</script>
