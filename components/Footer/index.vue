<template>
  <div class="c-footer mt-50">
    <div class="c-footer__content">
      <div>
        <div class="c-footer__social-links">
          <IconDiscord />
          <IconMatrix />
          <IconMedium />
          <IconTwitter />
        </div>
      </div>

      <div class="c-footer__links ml-40">
        <label>Popular Entries</label>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
        <a href="#">Link 5</a>
      </div>
      <div class="c-footer__links ml-40">
        <label>Most Recent Entries</label>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
        <a href="#">Link 5</a>
      </div>
    </div>
    <div class="m--flex column mt-20">
      <Logo style="width: 230px; height: 30px;" />

      <p class="c-footer__copyright mt-1">
        © 2020 Decred On Chain. Built by Decred community for people of the
        Internet.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconDiscord from './icon-discord.svg?inline'
import IconMatrix from './icon-matrix.svg?inline'
import IconMedium from './icon-medium.svg?inline'
import IconTwitter from './icon-twitter.svg?inline'
import Logo from './decred-onchain-logo.svg?inline'

export default Vue.extend({
  components: {
    IconDiscord,
    IconMatrix,
    IconMedium,
    IconTwitter,
    Logo,
  },
})
</script>

<style lang="scss" scoped>
.c-footer {
  background-color: $color-blue-100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  &__links {
    display: flex;
    flex-direction: column;

    label {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      color: $color-gray-400;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    & > a {
      &,
      &:active,
      &:hover,
      &:visited {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 30px;
        /* BG / White 4 - #F9FAFA */
        color: #f9fafa;
        text-decoration: none;
      }
    }
  }

  &__social-links {
    display: flex;

    & > svg {
      width: 22px;
      height: 22px;
      margin-right: 12px;
    }
  }

  &__copyright {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-600;
  }
}
</style>
