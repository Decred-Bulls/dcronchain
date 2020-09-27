<template>
  <div class="c-monetary-card">
    <!--  -->
    <div class="title">{{ title }}</div>

    <div class="c-content">
      <div class="icon">
        <IconUp v-if="changeAsNumber >= 1" class="icon" />
        <IconDown v-if="changeAsNumber <= -1" class="icon" />
        <IconNeutral
          v-if="changeAsNumber > -1 && changeAsNumber < 1"
          class="icon"
        />
      </div>
      <div class="ml-3">
        <div class="c-value">
          {{ value }}
        </div>
        <div class="c-change text--align-right">
          <span v-if="changeAsNumber >= 1" class="color-green">
            +{{ changeAsNumber }}%
          </span>
          <span v-if="changeAsNumber <= -1" class="color-red">
            {{ changeAsNumber }}%
          </span>
          <span v-if="changeAsNumber > -1 && changeAsNumber < 1">
            <!-- <span v-if="changeAsNumber < 0">-</span>  -->
            {{ changeAsNumber }}%
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
      type: [String, Number],
      required: true,
    },
    changeLabel: {
      type: String,
      required: true,
    },
  },

  computed: {
    changeAsNumber(): number {
      return Number(this.change)
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

  @include media('<=sm') {
    margin-bottom: 16px;
  }

  .title {
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

  .icon {
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
