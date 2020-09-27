<template>
  <div>
    <div class="c-chart__navigation-buttons">
      <Button prependIcon="arrow-left">Previous chart</Button>
      <Button appendIcon="arrow-right" class="ml-auto">Next chart</Button>
    </div>

    <div class="mx-40 mt-50">
      <div class="c-chart__tags">
        <Tag>USD</Tag>
        <Tag color="green">Momentum Model</Tag>
        <Tag color="gray">Realised Valuation</Tag>
        <Tag color="purple">Oscillator</Tag>
      </div>

      <div class="c-chart__title-wrapper">
        <div>
          <h1 class="c-chart__title">
            Decred Market-Realised Gradient Oscillator
          </h1>
          <!-- <div class="c-chart__subtitle">
            {{ lastUpdate | formatDate }}
          </div> -->
          <div class="c-chart__last-update">
            Updated {{ lastUpdate | formatDate }}
          </div>
        </div>

        <!-- <div class="c-chart__indicator-wrapper">
+          <div class="c-chart__indicator">
            <div>
              <div class="c-chart__signal">STRONG BUY - BULLISH</div>
              <div class="c-chart__signal-value">MVRV Ratio = 0.50</div>
            </div>
            <SignalIcon type="up" class="ml-4" />
          </div>
        </div> -->
      </div>

      <!-- Switches -->
      <div class="c-chart__toggles-wrapper">
        <ChartToggles
          :chartData="chartData"
          class="c-chart__data-switches"
          @change="onChangeChartData"
        />
        <div class="c-chart__toggles-right">
          <Button
            :inverted="chartType === '28DAY'"
            @click="onChangeChartType('28DAY')"
            >28-day</Button
          >
          <Button
            :inverted="chartType === '142DAY'"
            @click="onChangeChartType('142DAY')"
            >142-day</Button
          >
          <!-- <Button class="ml-3">Share</Button> -->
        </div>
      </div>
    </div>

    <div class="c-chart__hint mt-40 text--align-center">
      <strong>Chart Hint</strong>: The Market-Realised Gradient Oscillator is a
      metric that aims to capture periods where the momentum and sentiment of
      spot markets begins to shift in advance of a slower reaction on-chain. It
      considers the rate of change (gradient) of the market cap (fast, noisy
      metric) over a 28-day or 142-day period, and compares it to the equivalent
      gradient of the realised cap (slow but higher conviction metric). Standard
      periods used are 28-day and 142-day, coincident with average and maximum
      vote periods of the Decred ticket pool.
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

    <div class="my-5 ml-100 mr-150">
      <img src="@/assets/dcr-gradient-character-explanation.png" width="100%" />
    </div>

    <div class="c-chart__brief-wrapper">
      <div class="c-chart__brief">
        <h2>Chart Brief</h2>
        <p>
          The Market-Realised Gradient Oscillator is a metric that aims to
          capture periods where the momentum and sentiment of spot markets
          begins to shift in advance of a slower reaction on-chain. It considers
          the rate of change (gradient) of the market cap (fast, noisy metric)
          over a 28-day or 142-day period, and compares it to the equivalent
          gradient of the realised cap (slow but higher conviction metric).
          Standard periods used are 28-day and 142-day, coincident with average
          and maximum vote periods of the Decred ticket pool.
        </p>
        <p>
          The Delta Gradient metric is calculated as the difference between the
          Market and Realised gradients. Where this metric breaks above zero
          from below, it signifies spot pricing is reversing trend to the upside
          faster than the on-chain realised response. Conversely, a break below
          zero signifies spot price trend reversal to the downside faster than
          the on-chain realised response.
        </p>
        <p>
          This metric can also provide market momentum and divergence signals,
          similar to those commonly used in technical analysis. The height and
          sequential change in height of oscillator peaks provides insight into
          the volume of coins moving within, or counter to the prevailing trend.
        </p>
        <p>
          Data Source:
          <a href="https://coinmetrics.io/" target="_blank">Coinmetrics.io</a>
          and
          <a href="https://explorer.dcrdata.org/" target="_blank"
            >explorer.dcrdata.org</a
          >.
        </p>
        <p></p>
      </div>

      <div class="c-chart__resources">
        <h2>Chart Resources</h2>
        <p>
          Research paper by
          <a href="https://twitter.com/_Checkmatey_" target="_blank"
            >_Checkmatey_</a
          >
          <br />
          <a
            href="https://medium.com/decred/decred-on-chain-realised-cap-mvrv-ratio-and-gradient-oscillators-a36ed2cc8182"
            target="_blank"
          >
            https://medium.com/decred/decred-on-chain-realised-cap-mvrv-ratio-and-gradient-oscillators-a36ed2cc8182
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

type ChartType = '28DAY' | '142DAY'

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
      chartType: '28DAY' as ChartType,
    }
  },

  mounted() {
    this.initChart()
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
    async initChart() {
      const chartUrl =
        this.chartType === '28DAY'
          ? 'https://raw.githubusercontent.com/dcronchain/data/master/data/mrktrealgrad_28_day_oscillator_usd.json'
          : 'https://raw.githubusercontent.com/dcronchain/data/master/data/mrktrealgrad_142_day_oscillator_usd.json'

      try {
        this.chartData = await this.$axios.$get(chartUrl)
      } catch (err) {
        console.error(err)
      }

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
    onChangeChartData(newChartData: Chart) {
      this.chartData = newChartData
    },
    onChangeChartType(chartType: ChartType) {
      this.chartType = chartType
      this.initChart()
    },
  },
})
</script>

<style lang="scss" scoped></style>
