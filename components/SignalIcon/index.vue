<template>
  <div
    class="c-signal-icon"
    :class="{
      'color--green': type === 'up',
      'color--red': type === 'down',
    }"
  >
    <IconArrowUp v-if="type === 'up'" />
    <IconArrowDown v-if="type === 'down'" />
    <IconArrowNeutral v-if="type === 'neutral'" />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import IconArrowDown from './arrow-down.svg?inline'
import IconArrowNeutral from './arrow-neutral.svg?inline'
import IconArrowUp from './arrow-up.svg?inline'

type SignalType = 'up' | 'down' | 'neutral'

export default Vue.extend({
  components: {
    IconArrowDown,
    IconArrowNeutral,
    IconArrowUp,
  },

  props: {
    type: {
      type: String,
      required: false,
      default: () => 'up',
    } as PropOptions<SignalType>,
  },
})
</script>

<style lang="scss" scoped>
$size: 54px;

.c-signal-icon {
  width: $size;
  min-width: $size;
  max-width: $size;
  height: $size;
  min-height: $size;
  max-height: $size;
  border-radius: 50%;

  &.color--green {
    background-color: #41be53;
  }

  svg {
    width: $size;
    height: $size;
  }
}
</style>
