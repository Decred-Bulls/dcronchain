<template>
  <div>
    <div class="c-chart__navigation-buttons">
      <Button
        prependIcon="arrow-left"
        @click="$router.push('/charts/decred-mayer-multiple-bands')"
      >
        Previous chart
      </Button>
      <Button
        appendIcon="arrow-right"
        class="ml-auto"
        @click="
          $router.push(
            '/charts/decred-relative-bitcoin-realised-cap-and-mvrv-ratio'
          )
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
            Realised Cap and MVRV Ratio
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
          The Realised Cap is the aggregate USD value of all UNSPENT UTXOs,
          priced at the time they were last transacted. Due to the constant flow
          of DCR on-chain in Proof-of-Stake tickets, the Decred Realised Cap
          tends to follow the Market Cap more closely than its Bitcoin
          equivalent. Realised value is 'attracted' to the spot price during
          periods of high transaction demand as more DCR gets 'repriced'. This
          metric tends to create a psychological level of support in bull
          markets and resistance in bear markets, representing the last time the
          aggregate market 'interacted' with their coins.
        </p>
        <p>
          The MVRV Ratio measures the relative distance between the market cap
          and the realised cap. For Decred, this behaves as an oscillator and is
          ideal identifying periods of extreme under/overvaluation (tops and
          bottoms) and for support/resistance signals. An MVRV ratio of 1.0
          indicates price is at psychological support in bull markets and,
          conversely, a resistance in bear markets.
        </p>
        <p>
          Data Source:
          <a href="https://coinmetrics.io/" target="_blank">Coinmetrics.io</a>
        </p>
        <p></p>
      </div>

      <div class="c-chart__resources">
        <h2>Chart Resources</h2>
        <p>
          Research paper by
          <a href="https://twitter.com/_Checkmatey_" target="_blank"
            >_Checkmate_</a
          >
          <br />
          <a
            href="https://medium.com/decred/decred-on-chain-realised-cap-mvrv-ratio-and-gradient-oscillators-a36ed2cc8182"
            target="_blank"
          >
            https://medium.com/decred/decred-on-chain-realised-cap-mvrv-ratio-and-gradient-oscillators-a36ed2cc8182
          </a>
        </p>
        <p>
          Research by CoinMetrics on the Realised Cap
          <br />
          <a
            href="https://coinmetrics.io/realized-capitalization/"
            target="_blank"
          >
            https://coinmetrics.io/realized-capitalization/
          </a>
        </p>
        <p>
          Research by David Puell on Bitcoin MVRV Ratio
          <br />
          <a
            href="https://medium.com/adaptivecapital/bitcoin-market-value-to-realized-value-mvrv-ratio-3ebc914dbaee"
            target="_blank"
          >
            https://medium.com/adaptivecapital/bitcoin-market-value-to-realized-value-mvrv-ratio-3ebc914dbaee
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

type ChartType = 'PRICING' | 'VALUATION'
type SignalType = 'BUY' | 'STRONG BUY' | 'SELL' | 'STRONG SELL' | 'NEUTRAL'

export default Vue.extend({
  layout: 'chart',

  components: {
    Button,
    ChartToggles,
    Plotly: () => import('vue-plotly').then((m) => m.Plotly),
    SignalIcon,
    Tag,
    Toggle,
  },

  data() {
    return {
      chartData: null as Chart | null,
      chartType: 'VALUATION' as ChartType,
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
        const data = this.chartData.data.find((d) => d.name === 'MVRV Ratio')

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
          ? '/api/proxy/dcronchain/data/master/data/mvrv_valuation_usd.json'
          : '/api/proxy/dcronchain/data/master/data/mvrv_pricing_usd.json'

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
