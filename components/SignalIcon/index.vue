<template>
  <div class="c-signal-icon" :class="{ 'color--green': type === 'up' }">
    <IconArrowUp v-if="type === 'up'" />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import IconArrowUp from './arrow-up.svg?inline'

type SignalType = 'up' | 'down'

export default Vue.extend({
  components: {
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
$size: '54px';

.c-signal-icon {
  width: $size;
  min-width: $size;
  max-width: $size;
  height: $size;
  min-height: $size;
  max-height: $size;
  padding: 10px;
  border-radius: 50%;

  &.color--green {
    background-color: #41be53;
  }

  svg {
    width: 32px;
    height: 31px;
  }
}
</style>
