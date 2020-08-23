<template>
  <div class="container">
    <h1>List of charts</h1>
    <ul class="mt-3">
      <li>
        <nuxt-link to="/charts/decred-mayer-multiple-bands"
          >Mayer Multiple Bands</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/charts/decred-realised-cap-and-mvrv-ratio"
          >Realised cap and MVRV ratio</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo,
  },

  data() {
    //
  },

  computed: {
    //
  },

  methods: {
    //
  },
})
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

ul {
  text-align: left;
}
</style>
