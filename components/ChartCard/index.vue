<template>
  <div class="c-chart-card">
    <!--  -->
    <div class="icon">
      <IconBarChart v-if="icon === 'bar'" />
      <IconPieChart v-if="icon === 'pie'" />
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
import IconBarChart from './bar-chart.svg?inline'
import IconPieChart from './pie-chart.svg?inline'

type ColorType = 'blue' | 'green' | 'yellow' | 'purple' | 'red'
type IconType = 'bar' | 'pie'

export default Vue.extend({
  //
  components: {
    IconBarChart,
    IconPieChart,
  },

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
  cursor: pointer;
  color: $color-blue-100;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: $color-blue-100;
    color: #fff;
  }

  .icon {
    margin-top: 10px;

    svg {
      height: 45px;
      width: auto;
    }
  }

  .text {
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;
    /* text-align: center; */
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
