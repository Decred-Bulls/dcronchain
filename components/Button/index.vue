<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="c-button"
    :class="{ 'is-inverted': inverted === true }"
  >
    <span v-if="!!prependIcon" class="c-button__icon mr-3">
      <IconArrowLeft v-if="prependIcon === 'arrow-left'" />
      <IconArrowRight v-if="prependIcon === 'arrow-right'" />
    </span>

    <slot></slot>

    <span v-if="!!appendIcon" class="c-button__icon ml-3">
      <IconArrowLeft v-if="appendIcon === 'arrow-left'" />
      <IconArrowRight v-if="appendIcon === 'arrow-right'" />
    </span>
  </button>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import IconArrowLeft from './arrow-left.svg?inline'
import IconArrowRight from './arrow-right.svg?inline'

type IconType = 'arrow-left' | 'arrow-right'

export default Vue.extend({
  components: {
    IconArrowLeft,
    IconArrowRight,
  },

  props: {
    prependIcon: {
      type: [String, null],
      required: false,
      default: () => null,
    } as PropOptions<IconType>,
    appendIcon: {
      type: [String, null],
      required: false,
      default: () => null,
    } as PropOptions<IconType>,
    inverted: {
      type: Boolean,
      required: false,
      default: () => false,
    } as PropOptions<Boolean>,
  },
})
</script>

<style lang="scss" scoped>
.c-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  background-color: #fff;
  color: $color-blue-100;
  border: thin solid $color-blue-100;
  border-radius: 4px;
  padding: 10px 20px;

  &.is-inverted {
    color: #fff;
    background-color: $color-blue-100;
  }

  svg {
    width: 1em;
    height: auto;
  }
}
</style>
