<template>
  <div
    class="c-toggle"
    :class="{
      'color--purple': color === 'purple',
      'color--blue': color === 'blue',
      'color--red': color === 'red',
      'color--pink': color === 'pink',
      'color--neon-green': color === 'neon-green',
      'color--green': color === 'green',
    }"
  >
    <el-switch :value="value" @input="value = $event" />
    <label>
      <!--  -->
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

type TypeColor =
  | 'white'
  | 'purple'
  | 'neon-blue'
  | 'red'
  | 'pink'
  | 'neon-green'
  | 'green'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true,
      default: () => false,
    } as PropOptions<Boolean>,
    color: {
      type: String,
      required: false,
      default: () => 'white',
    } as PropOptions<TypeColor>,
  },

  methods: {
    onChange(enabled: boolean) {
      this.$emit('input', enabled)
      this.$emit('change', enabled)
    },
  },
})
</script>

<style lang="scss">
.c-toggle {
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: $color-blue-100;
    text-transform: uppercase;
    margin-left: 4px;
  }

  &.color--purple .el-switch.is-checked .el-switch__core {
    border-color: $color-purple;
    background-color: $color-purple;
  }
  &.color--blue .el-switch.is-checked .el-switch__core {
    border-color: $color-neon-blue;
    background-color: $color-neon-blue;
  }
  &.color--red .el-switch.is-checked .el-switch__core {
    border-color: $color-red;
    background-color: $color-red;
  }
  &.color--pink .el-switch.is-checked .el-switch__core {
    border-color: $color-pink;
    background-color: $color-pink;
  }
  &.color--neon-green .el-switch.is-checked .el-switch__core {
    border-color: $color-neon-green;
    background-color: $color-neon-green;
  }
  &.color--green .el-switch.is-checked .el-switch__core {
    border-color: $color-green;
    background-color: $color-green;
  }
}
</style>
