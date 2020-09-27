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
            Decred Unrealised Profit and Loss
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
          <!-- <Button
            :inverted="chartType === '28DAY'"
            @click="onChangeChartType('28DAY')"
            >28-day</Button
          >
          <Button
            :inverted="chartType === '142DAY'"
            @click="onChangeChartType('142DAY')"
            >142-day</Button
          > -->
          <!-- <Button class="ml-3">Share</Button> -->
        </div>
      </div>
    </div>

    <div class="c-chart__hint mt-40 text--align-center">
      <strong>Chart Hint</strong>: The Unrealised Profit and Loss metric
      calculates the net Profit of Loss of the aggregate market by taking the
      difference between the Market Cap and the Realised cost basis (normalised
      by Market Cap to form an oscillator). For Decred, coins are constantly on
      the move in tickets and in CoinShuffle++ mix transactions. Each time DCR
      is moved on chain, there is an explicit decision and opportunity cost to
      sell the coins, or not. Therefore, this metric should be interpreted to
      capture the profit and loss incurred since the last time DCR holders, on
      aggregate, interacted with their coins.
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
          The Unrealised Profit and Loss metric calculates the net Profit of
          Loss of the aggregate market by taking the difference between the
          Market Cap and the Realised cost basis (normalised by Market Cap to
          form an oscillator). For Decred, coins are constantly on the move in
          tickets and in CoinShuffle++ mix transactions. Each time DCR is moved
          on chain, there is an explicit decision and opportunity cost to sell
          the coins, or not. Therefore, this metric should be interpreted to
          capture the profit and loss incurred since the last time DCR holders,
          on aggregate, interacted with their coins.
        </p>
        <p>
          Where the metric is positive, it indicates that market pricing is
          above the aggregate 'recency bias' level of the Realised Cap and
          conversely, when the metric is negative, market pricing is below the
          aggregate 'recency bias' level. Periods of extreme diversion from the
          Realised Cap mean (+- 50% PnL) are highlighted as Euphoria and
          Capitulation respectively.
        </p>
        <p></p>
        <p>
          Data Source:
          <a href="https://coinmetrics.io/" target="_blank">Coinmetrics.io</a>.
        </p>
        <p></p>
      </div>

      <div class="c-chart__resources">
        <h2>Chart Resources</h2>
        <p>
          <strong>Adamant Capital</strong> introducing the
          <a
            href="https://medium.com/@adamant_capital/a-primer-on-bitcoin-investor-sentiment-and-changes-in-saving-behavior-a5fb70109d32"
            target="_blank"
            >Unrealised PnL for Bitcoin (Medium.com)</a
          >
        </p>
        <p>
          <strong>Glassnode Revisiting</strong> the
          <a
            href="https://medium.com/glassnode-insights/dissecting-bitcoins-unrealised-on-chain-profit-loss-73e735020c8d"
            target="_blank"
            >Unrealised PnL for Bitcoin (Medium.com)</a
          >
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
        'https://raw.githubusercontent.com/dcronchain/data/master/data/unrealisedpnl_oscillator_usd.json'

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
