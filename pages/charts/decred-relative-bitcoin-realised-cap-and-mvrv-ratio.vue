<template>
  <div>
    <div class="c-chart__navigation-buttons">
      <Button
        prependIcon="arrow-left"
        @click="$router.push('/charts/decred-realised-cap-and-mvrv-ratio')"
      >
        Previous chart
      </Button>
      <Button
        appendIcon="arrow-right"
        class="ml-auto"
        @click="
          $router.push('/charts/decred-market-realised-gradient-oscillator')
        "
      >
        Next chart
      </Button>
    </div>

    <div class="mx-40 mt-50">
      <div class="c-chart__tags">
        <Tag color="green">Novice Friendly</Tag>
        <Tag color="gray">Stakeholders Hints</Tag>
      </div>

      <div class="c-chart__title-wrapper">
        <div>
          <h1 class="c-chart__title">
            Decred Relative BTC Realised Cap and MVRV Ratio
          </h1>
          <div class="c-chart__subtitle">
            {{ lastUpdate | formatDate }}
            MVRV Ratio = {{ lastMVRVRatio | roundTo2DP }}
          </div>
          <div class="c-chart__last-update">
            Updated {{ lastUpdate | formatDate }}
          </div>
        </div>

        <div v-if="lastValueSignal" class="c-chart__indicator-wrapper">
          <div class="c-chart__indicator">
            <div>
              <div class="c-chart__signal">{{ lastValueSignal }}</div>
              <div class="c-chart__signal-value">
                MVRV Ratio = {{ lastMVRVRatio | roundTo2DP }}
              </div>
            </div>
            <SignalIcon
              v-if="lastValueSignal.includes('BUY')"
              type="up"
              class="ml-4"
            />
            <SignalIcon
              v-if="lastValueSignal.includes('SELL')"
              type="down"
              class="ml-4"
            />
            <SignalIcon
              v-if="lastValueSignal === 'NEUTRAL'"
              type="neutral"
              class="ml-4"
            />
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
          <Button
            :inverted="chartType === 'PRICING'"
            @click="onChangeChartType('PRICING')"
            >Pricing</Button
          >
          <Button
            :inverted="chartType === 'VALUATION'"
            @click="onChangeChartType('VALUATION')"
            >Valuation</Button
          >
          <!-- <Button class="ml-3">Share</Button> -->
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
          The Relative Realised Caps present a series of pricing models derived
          from both spot prices and onchain signatures of the DCR/BTC exchange
          pair. The following realised valuation models are denominated in BTC
          and attempt to capture a range of methods for valuing across volatile
          assets of different size, scale and liquidity.
        </p>
        <p>
          <strong>Realised Cap (BTC)</strong> - Traditional method for realised
          cap, pricing each Decred UTXO at the BTC value when it was last spent.
        </p>
        <p>
          <strong>Relative On-chain Cap (BTC)</strong> - Ratio between DCR
          Realised Cap and Bitcoin Realised Cap giving a relative on-chain
          pricing model. This metric tends to act as a support level, or lower
          bound pricing band. When the Decred Realised Cap (numerator)
          appreciates in price or experiences increased transaction momentum
          compared to Bitcoin, the pricing metric will increase. Conversely,
          where the Bitcoin Realised Cap (denominator) appreciates, or where
          Decred sells off relative to Bitcoin, the metric will shed value.
        </p>
        <p>
          <strong>Relative MVRV Cap (BTC)</strong> - Presents the DCR/BTC value
          where the ratio of Decred is equal to the MVRV Ratio of BTC. This is
          the price at which both coins are trading an equal premium or discount
          relative to their respective Realised Cap. This model tends to act as
          an upper bound pricing band which on contact, can be interpreted as
          the point where Decred has amplified the returns of a BTC only
          position.
        </p>
        <p>
          <strong>Mid Relative Realised Cap</strong> - The midpoint between the
          Relative On-chain Cap and the Relative MVRV Cap. This metric, by
          design, captures a mean pricing level and can be used as a support or
          resistance signal in all market cycles.
        </p>
        <p>
          The Realtive MVRV Ratio Oscillator presents is a representation of the
          relative premium or discount between Decred and Bitcoin. High
          oscillator values signal that both coins are trading at a premium and
          Decred has provided amplified returns over a BTC only position and may
          singal overvaluation. Conversely, low values signify that DCR has lost
          value relative to BTC and may signal undervaluation.
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
          <a href="https://twitter.com/PermabullNino" target="_blank"
            >@permabullnino</a
          >
          <br />
          <a
            href="https://medium.com/@permabullnino/decred-on-chain-mini-pub-1-relative-mvrv-ratio-ea2564ca420f"
            target="_blank"
          >
            https://medium.com/@permabullnino/decred-on-chain-mini-pub-1-relative-mvrv-ratio-ea2564ca420f
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

type ChartType = 'PRICING' | 'VALUATION'
type SignalType = 'BUY' | 'STRONG BUY' | 'SELL' | 'STRONG SELL' | 'NEUTRAL'

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
      chartType: 'PRICING' as ChartType,
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
        height: 800,
      }
    },
    lastMVRVRatio(): number | null {
      if (this.chartData) {
        const data = this.chartData.data.find(
          (d) => d.name === 'Relative MVRV Ratio'
        )

        if (!data || !data.y) {
          return null
        }
        const lastValue = data.y[data.y.length - 1]
        return lastValue
      }
      return null
    },
    lastValueSignal(): SignalType | null {
      const value = this.lastMVRVRatio
      if (!value) {
        return null
      }

      if (value <= 0.7) {
        return 'BUY'
      }
      if (value <= 1.7) {
        return 'NEUTRAL'
      }
      return 'SELL'
    },
    lastUpdate(): Date {
      return new Date()
    },
  },

  methods: {
    async initChart() {
      const chartUrl =
        this.chartType === 'VALUATION'
          ? '/api/proxy/dcronchain/data/master/data/mvrv_valuation_btc.json'
          : '/api/proxy/dcronchain/data/master/data/mvrv_pricing_btc.json'

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
