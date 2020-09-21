<template>
  <div
    class="c-tag"
    :class="{
      'is-blue': color === 'blue',
      'is-green': color === 'green',
      'is-purple': color === 'purple',
      'is-red': color === 'red',
      'is-yellow': color === 'yellow',
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

type Color = '' | 'blue' | 'green' | 'gray' | 'purple' | 'red'

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
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  display: inline-block;
  border-radius: 15px;
  padding: 2px 14px;
  color: #f9fafa;
  background-color: $color-gray-600;

  &.is-blue {
    background-color: $color-blue-500;
  }

  &.is-green {
    background-color: $color-green;
  }

  &.is-purple {
    background-color: $color-purple-300;
  }

  &.is-red {
    background-color: $color-red;
  }

  &.is-yellow {
    background-color: $color-yellow-300;
    color: $color-blue-100;
  }
}
</style>
