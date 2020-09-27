<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="c-button"
    :class="{
      'is--inverted': inverted === true,
      'is--size-normal': size === 'normal',
      'is--size-big': size === 'big',
      'is--transparent': transparent === true,
    }"
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
type SizeType = 'normal' | 'big'

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
    size: {
      type: String,
      required: false,
      default: () => 'normal',
    } as PropOptions<SizeType>,
    transparent: {
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

  &.is--size-big {
    padding: 15px 30px;
  }

  &.is--inverted {
    color: #fff;
    background-color: $color-blue-100;
  }

  &.is--transparent {
    background-color: transparent;
  }

  svg {
    width: 1em;
    height: auto;
  }
}
</style>
