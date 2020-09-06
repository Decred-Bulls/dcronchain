<template>
  <div>
    <div class="c-chart__navigation-buttons">
      <Button prependIcon="arrow-left">Previous chart</Button>
      <Button appendIcon="arrow-right" class="ml-auto">Next chart</Button>
    </div>

    <div class="mx-40 mt-50">
      <div class="c-chart__tags">
        <Tag color="green">Novice Friendly</Tag>
        <Tag color="gray">Stakeholders Hints</Tag>
      </div>

      <div class="c-chart__title-wrapper mt-20">
        <div>
          <h1 class="c-chart__title">
            Decred Mayer Multiple Bands
          </h1>
          <div class="c-chart__subtitle">
            {{ lastUpdate | formatDate }} - Mayer Multiple = 0.9 / DCR Price =
            $100
          </div>
          <div class="c-chart__last-update">
            Updated {{ lastUpdate | formatDate }}
          </div>
        </div>

        <div class="c-chart__indicator-wrapper">
          <div class="c-chart__indicator">
            <div>
              <div class="c-chart__signal">STRONG BUY - BULLISH</div>
              <div class="c-chart__signal-value">MVRV Ratio = 0.50</div>
            </div>
            <SignalIcon type="up" class="ml-4" />
          </div>
        </div>
      </div>

      <!-- Switches -->
      <div class="c-chart__toggles-wrapper">
        <ChartToggles
          :chartData="chartData"
          class="c-chart__data-switches"
          @change="onChangeChartData"
        />

        <div class="c-chart__toggles-right">
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

    <div class="c-chart__brief-wrapper">
      <div class="c-chart__brief">
        <h2>Chart Brief</h2>
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
      <div class="c-chart__resources">
        <h2>Chart Resources</h2>
        <p>
          The Mayer Multiple
          <br />
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
import { createKey } from '@/utils'
import Button from '@/components/Button/index.vue'
import ChartToggles from '@/components/ChartToggles/index.vue'
import SignalIcon from '@/components/SignalIcon/index.vue'
import Toggle from '@/components/Toggle.vue'
import Tag from '@/components/Tag.vue'
import { Plotly } from 'vue-plotly'

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
      chartData: null as Chart | null,
    }
  },

  async mounted() {
    const response = await fetch(
      'https://raw.githubusercontent.com/checkmatey/checkonchain/master/hosted_charts/dcronchain/mayermultiple_pricing_usd/mayermultiple_pricing_usd_light.json'
    )
    this.chartData = await response.json()

    if (this.chartData) {
      this.chartData.data = this.chartData.data.map((d: any, idx: number) => {
        return {
          ...d,
          key: createKey(d.name, idx),
          show: true,
          showToggle: d.showlegend,
          showlegend: false,
        }
      })
    }
  },

  computed: {
    adjustedJsonData(): any {
      if (!this.chartData) {
        return {}
      }

      return {
        ...((this.chartData as unknown) as Chart),
        data: ((this.chartData as unknown) as Chart).data.filter(
          (d) => d.show === true
        ),
      }
    },
    chartLayout(): any {
      if (!this.chartData) {
        return {}
      }

      return {
        ...((this.chartData as unknown) as Chart).layout,
        height: 600,
      }
    },
    lastUpdate(): Date {
      return new Date()
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
