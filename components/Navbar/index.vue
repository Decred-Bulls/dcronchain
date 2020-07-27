<template>
  <div class="c-navbar">
    <nav class="c-navbar__content">
      <Logo class="c-logo" />

      <slot></slot>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from './decred-onchain-logo.svg?inline'

export default Vue.extend({
  components: {
    Logo,
  },
})
</script>

<style lang="scss" scoped>
.c-navbar {
  /* BG / White 4 - #F9FAFA */
  background-color: #f9fafa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;

  &__content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .c-logo {
    width: 206px;
    height: 64px;
  }
}
</style>
