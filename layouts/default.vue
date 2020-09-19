<template>
  <div class="l-default">
    <Navbar />

    <div class="l-default__content">
      <nuxt />
    </div>

    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Footer from '@/components/Footer/index.vue'
import Navbar from '@/components/Navbar/index.vue'

export default Vue.extend({
  components: {
    Footer,
    Navbar,
  },
})
</script>

<style lang="scss" scoped>
/*  */
.l-default {
  &__content {
    width: 100%;
    /* max-width: 1200px; */
    margin: 0 auto;
  }
}
</style>
