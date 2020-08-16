<template>
  <div>
    <div class="m--flex mt-40">
      <Button prependIcon="arrow-left">Previous chart</Button>
      <Button appendIcon="arrow-right" class="ml-auto">Next chart</Button>
    </div>

    <div class="mx-40 mt-50">
      <div class="">
        <Tag color="green">Novice Friendly</Tag>
        <Tag color="gray">Stakeholders Hints</Tag>
      </div>

      <div class="m--flex">
        <div>
          <h1 class="c-chart__title mt-20">
            Decred Mayer Multiple Bands
          </h1>
          <div class="c-chart__subtitle">
            July, 1 2020 - Mayer Multiple = 0.9 / DCR Price = $100
          </div>
          <div class="c-chart__last-update">
            Updated 03 July 2020
          </div>
        </div>

        <div class="ml-auto">
          <div class="m--flex">
            <div>
              <div class="c-chart__signal">STRONG BUY - BULLISH</div>
              <div class="c-chart__signal-value">MVRV Ratio = 0.50</div>
            </div>
            <SignalIcon type="up" class="ml-4" />
          </div>
        </div>
      </div>

      <!-- Switches -->
      <div class="m--flex mt-40">
        <ChartToggles
          :chartData="chartData"
          class="c-chart__data-switches"
          @change="onChangeChartData"
        />
        <div class="m--flex justify-end" style="flex-grow: 1;">
          <Button inverted>USD</Button>
          <Button>BTC</Button>
          <Button class="ml-3">Share</Button>
        </div>
      </div>
    </div>

    <div class="c-chart__hint mt-40 text--align-center">
      <strong>Chart Hints</strong>: MVRV below 0,7 indicates a
      <strong>BUY ZONE</strong> as the Market Cap is
      <strong>undervalued</strong> compare with the Realised value.
    </div>

    <div class="my-4">
      <client-only>
        <Plotly
          :data="adjustedJsonData.data"
          :layout="chartLayout"
          :options="adjustedJsonData.options"
        ></Plotly>
      </client-only>
    </div>

    <div class="m--flex columns-two align-start mt-40 mb-150">
      <div>
        <h2 class="c-chart__brief">Chart Brief</h2>
        <p>
          The Mayer Multiple is a simple oscillator calculated by taking the
          ratio of the current DCR/USD Price to its 200-day moving average. The
          200-day moving average is a very common indicator in technical
          analysis and is often used to calibrate macro bull/bear bias. The
          Mayer Multiple is a metric that presents the deviation of price from
          this long term mean as an oscillator with historically relevant
          probabilities of occurence shown as follows:
        </p>
      </div>
      <div>
        <h2 class="c-chart__resources">Chart Resources</h2>
        <p>
          The Mayer Multiple -
          <a
            href="https://www.theinvestorspodcast.com/bitcoin-mayer-multiple/"
            target="_blank"
          >
            https://www.theinvestorspodcast.com/bitcoin-mayer-multiple/
          </a>
        </p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '@/components/Button/index.vue'
import ChartToggles from '@/components/ChartToggles/index.vue'
import SignalIcon from '@/components/SignalIcon/index.vue'
import Toggle from '@/components/Toggle.vue'
import Tag from '@/components/Tag.vue'
import JsonChartData from './mayermultiple_pricing_usd_light.js'
import { Plotly } from 'vue-plotly'

function rgbToHex(r: string | number, g: string | number, b: string | number) {
  return (
    '#' +
    ((1 << 24) + (Number(r) << 16) + (Number(g) << 8) + Number(b))
      .toString(16)
      .slice(1)
  )
}

function normalize(value: string) {
  return value.replace(' ', '-').replace('(', '').replace(')', '').toLowerCase()
}

function createKey(name: string, idx: string | number) {
  return `${idx}-${normalize(name)}`
}

export default Vue.extend({
  layout: 'chart',

  components: {
    Button,
    ChartToggles,
    // import { Plotly } from 'vue-plotly'
    // Plotly: () => import('vue-plotly').then((mod) => mod.Plotly),
    Plotly,
    SignalIcon,
    Tag,
    Toggle,
  },

  data() {
    return {
      showChartSeriesMap: {
        //
      } as any,
      chartData: JsonChartData as Chart,
    }
  },

  mounted() {
    this.chartData.data = this.chartData.data.map((d: any, idx: number) => {
      return {
        ...d,
        key: createKey(d.name, idx),
        show: true,
        showToggle: d.showlegend,
        showlegend: false,
      }
    })
  },

  computed: {
    adjustedJsonData(): any {
      return {
        ...this.chartData,
        data: this.chartData.data.filter((d) => d.show === true),
      }
    },
    chartLayout(): any {
      return {
        ...this.chartData.layout,
        height: 600,
      }
    },
  },

  methods: {
    onChangeChartData(newChartData: Chart) {
      this.chartData = newChartData
    },
  },
})
</script>

<style lang="scss" scoped></style>
