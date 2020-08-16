<template>
  <div>
    <Toggle
      v-for="t in toggles"
      :key="t.key"
      :active-color="t.colorHex"
      :value="showChartSeriesMap[t.key]"
      @input="(value) => onChangeChartSeriesMap(t.key, value)"
    >
      {{ t.name }}
    </Toggle>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Toggle from '@/components/Toggle.vue'
import { rgbToHex, normalize, createKey } from '@/utils'

export default Vue.extend({
  components: {
    Toggle,
  },

  props: {
    chartData: {
      type: [Object],
      required: false,
      default: () => null,
    } as PropOptions<Chart>,
  },

  data() {
    return {
      showChartSeriesMap: {
        //
      } as any,
    }
  },

  mounted() {
    this.initChartSeriesMap()
  },

  watch: {
    chartData() {
      this.initChartSeriesMap()
    },
  },

  computed: {
    toggles(): any {
      if (!this.chartData) {
        return []
      }

      return this.chartData.data
        .filter((d) => d.showToggle === true)
        .map((d, idx) => {
          // Parse RGB string
          const rgb = d.line.color.match(/rgb\((\d+),(\d+),(\d+)\)/i) as any
          // console.log({ rgb })
          return {
            name: d.name,
            key: createKey(d.name, idx),
            colorRgb: d.line.color,
            colorHex: rgb ? rgbToHex(rgb[1], rgb[2], rgb[3]) : undefined,
          }
        })
    },
  },

  methods: {
    initChartSeriesMap() {
      if (this.chartData && Object.keys(this.showChartSeriesMap).length === 0) {
        this.chartData.data.forEach((d, idx) => {
          const key = createKey(d.name, idx)
          this.showChartSeriesMap[key] = true
        })
      }
    },
    onChangeChartSeriesMap(key: string, value: boolean) {
      this.showChartSeriesMap = {
        ...this.showChartSeriesMap,
        [key]: value,
      }

      const updatedChartData = {
        ...this.chartData,
        data: this.chartData.data.map((d) => {
          if (d.key === key) {
            return {
              ...d,
              show: value,
            }
          }
          return d
        }),
      }

      this.$emit('change', updatedChartData)
    },
  },
})
</script>
