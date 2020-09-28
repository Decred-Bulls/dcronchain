<template>
  <div class="c-gauge-card">
    <!--  -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="text">
      <slot name="text"></slot>
    </div>
    <div class="indicator-wrapper">
      <!--  -->
      <div class="labels">
        <label> {{ labels[0] }} </label>
        <label> {{ labels[1] }} </label>
        <label>&nbsp;</label>
        <label> {{ labels[2] }} </label>
        <label> {{ labels[3] }} </label>
      </div>
      <div class="indicator">
        <div class="icon">
          <IconCart v-if="icon === 'cart'" />
          <IconHand v-if="icon === 'hand'" />
          <IconSafe v-if="icon === 'safe'" />
        </div>
        <div class="lines">
          <div class="line" :class="{ 'color--red': value === -2 }"></div>
          <div class="line" :class="{ 'color--red': value <= -1 }"></div>
          <div class="line"></div>
          <div class="line" :class="{ 'color--green': value >= 1 }"></div>
          <div class="line" :class="{ 'color--green': value === 2 }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import IconCart from './cart.svg?inline'
import IconHand from './hand.svg?inline'
import IconSafe from './safe.svg?inline'

type IconType = 'cart' | 'hand' | 'safe'
type ValueType = -2 | -1 | 0 | 1 | 2

const defaultLabels = ['Large Loss', 'Loss', 'Gain', 'Large Gain']

export default Vue.extend({
  //
  components: {
    IconCart,
    IconHand,
    IconSafe,
  },

  props: {
    icon: {
      type: String,
      required: false,
      default: () => 'hand',
    } as PropOptions<IconType>,
    labels: {
      type: Array,
      required: false,
      default: () => defaultLabels,
    },
    value: {
      type: Number,
      required: false,
      default: () => 0,
    } as PropOptions<ValueType>,
  },
})
</script>

<style lang="scss" scoped>
/*  */
.c-gauge-card {
  background-color: #f3f5f6;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  text-align: center;
  padding-bottom: 15px;

  @include media('<=sm') {
    margin-bottom: 16px;
  }

  .header {
    background-color: $color-blue-100;
    font-weight: bold;
    font-size: 22px;
    line-height: 1em;
    padding: 8px 0;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
  }

  .content {
    /* font-weight: bold; */
    font-size: 22px;
    letter-spacing: -0.02em;
    line-height: 30px;
    color: #091440;
    padding: 0 12px;
    margin-top: 5px;
    /* text-transform: uppercase; */
  }

  .text {
    font-size: 18px;
    letter-spacing: -0.02em;
    line-height: 25px;
    color: $color-gray-400;
    padding: 0 12px;
    text-transform: uppercase;
  }

  .indicator-wrapper {
    padding: 0 32px;
    margin-top: 12px;

    .labels {
      display: flex;
      justify-content: space-between;
      padding: 0 8px;

      label {
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        color: $color-gray-600;
        flex-basis: 25%;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }
    }

    .lines {
      display: flex;
      justify-content: space-between;
      padding: 0 8px;
      margin-top: 4px;

      .line {
        margin: 0 4px;
        height: 6px;
        /* flex: 1; */
        flex-basis: 25%;

        &.color--green {
          background-color: $color-green;
        }
        &.color--red {
          background-color: $color-red;
        }
      }
    }

    .indicator {
      position: relative;
      background-color: #e6eaed;
      border: thin solid $color-blue-100;
      border-radius: 10px;
      height: 16px;

      .icon {
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;

        svg {
          height: 40px;
          margin-top: -15px;
        }
      }
    }
  }
}
</style>
