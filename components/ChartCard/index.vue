<template>
  <div class="c-chart-card">
    <!--  -->
    <div class="icon">
      <img v-if="icon === 'bar'" src="./bar-chart.png" height="45" />
      <img v-if="icon === 'pie'" src="./pie-chart.png" height="45" />
    </div>
    <div class="text">
      <slot></slot>
    </div>
    <div class="colors">
      <div
        v-for="color in colors"
        :key="`color-${color}`"
        :class="`color-${color}`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

type ColorType = 'blue' | 'green' | 'yellow' | 'purple' | 'red'
type IconType = 'bar' | 'pie'

export default Vue.extend({
  //
  props: {
    icon: {
      type: String,
      required: false,
      default: () => 'bar',
    } as PropOptions<IconType>,
    colors: {
      type: Array,
      required: true,
      default: () => ['green'],
    } as PropOptions<ColorType[]>,
  },
})
</script>

<style lang="scss" scoped>
/*  */
.c-chart-card {
  background: #f9fafa;
  border: 1px solid #091440;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    margin-top: 10px;
  }

  .text {
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;
    /* text-align: center; */
    color: $color-blue-100;
    padding: 4px 20px 12px;
    text-align: center;
  }

  .colors {
    display: flex;
    width: 100%;

    & > * {
      height: 15px;
      flex: 1 0 auto;
    }

    .color-blue {
      background-color: $color-blue-500;
    }

    .color-green {
      background-color: $color-green;
    }

    .color-purple {
      background-color: $color-purple-300;
    }

    .color-red {
      background-color: $color-red;
    }

    .color-yellow {
      background-color: $color-yellow-300;
      color: $color-blue-100;
    }
  }
}
</style>
