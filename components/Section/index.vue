<template>
  <div
    class="c-section"
    :class="{
      'background--alt-1': color === 'alt-1',
      'background--alt-2': color === 'alt-2',
    }"
  >
    <div class="c-section__content">
      <!--  -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  //
  props: {
    color: {
      type: String,
      required: false,
      default: () => 'normal',
    },
  },
})
</script>

<style lang="scss" scoped>
.c-section {
  width: 100%;
  padding: 20px 40px;
  text-align: left;
  /* display: flex;
    flex-direction: column;
    align-items: flex-start; */

  &.background--alt-1 {
    background-color: #f9fafa;
  }

  &.background--alt-2 {
    background-color: #f3f5f6;
  }

  &__content {
    max-width: $content-width;
    margin: 0 auto;
  }
}
</style>
