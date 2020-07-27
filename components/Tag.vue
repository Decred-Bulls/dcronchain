<template>
  <div class="c-tag" :class="{ 'is-green': color === 'green' }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

type Color = '' | 'green' | 'gray'

export default Vue.extend({
  props: {
    color: {
      type: String,
      required: false,
      default: () => 'gray',
    } as PropOptions<Color>,
  },
})
</script>

<style lang="scss" scoped>
.c-tag {
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  display: inline-block;
  border-radius: 15px;
  padding: 2px 14px;
  /* BG / White 4 - #F9FAFA */
  color: #f9fafa;
  background-color: $color-gray-600;

  & + & {
    margin-left: 12px;
  }

  &.is-green {
    background-color: $color-green-300;
  }
}
</style>
