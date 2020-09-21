<template>
  <div class="c-monetary-card">
    <!--  -->
    <div class="c-title">{{ title }}</div>

    <div class="c-content">
      <div class="c-icon">
        <IconUp v-if="change >= 1" class="c-icon" />
        <IconDown v-if="change <= -1" class="c-icon" />
        <IconNeutral v-if="change > -1 && change < 1" class="c-icon" />
      </div>
      <div class="ml-3">
        <div class="c-value">
          {{ value }}
        </div>
        <div class="c-change text--align-right">
          <span v-if="change >= 1" class="color-green"> +{{ change }}% </span>
          <span v-if="change <= -1" class="color-red"> {{ change }}% </span>
          <span v-if="change > -1 && change < 1">
            <!-- <span v-if="change < 0">-</span>  -->
            {{ change }}%
          </span>
          <span> {{ changeLabel }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconUp from './arrow-up.svg?inline'
import IconDown from './arrow-down.svg?inline'
import IconNeutral from './arrow-neutral.svg?inline'

export default Vue.extend({
  //
  components: {
    IconUp,
    IconDown,
    IconNeutral,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
    changeLabel: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
/*  */
.c-monetary-card {
  background: #edeff1;
  border-radius: 3px;
  padding: 4px 20px 8px;

  .c-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: #091440;
    width: 100%;
  }

  .c-content {
    width: 100%;
    display: flex;
    margin-top: 4px;
  }

  .c-icon {
    width: 50px;
    height: 50px;
  }

  .c-value {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    color: #091440;
  }

  .c-change {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    text-align: right;

    .color-green {
      color: $color-green;
    }
    .color-red {
      color: $color-red;
    }
  }

  /* .c-change-label {

  } */
}
</style>
