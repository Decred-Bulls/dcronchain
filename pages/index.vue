<template>
  <div class="p-homepage">
    <Section>
      <h1>List of charts</h1>
      <ul class="mt-3">
        <li>
          <nuxt-link to="/charts/decred-mayer-multiple-bands"
            >Mayer Multiple Bands</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/charts/decred-realised-cap-and-mvrv-ratio"
            >Realised cap and MVRV ratio</nuxt-link
          >
        </li>

        <li>
          <nuxt-link
            to="/charts/decred-relative-bitcoin-realised-cap-and-mvrv-ratio"
            >Decred Relative BTC Realised Cap and MVRV ratio</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/charts/decred-market-realised-gradient-oscillator"
            >Market-Realised Gradient Oscillator</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/charts/decred-unrealised-profit-and-loss"
            >Unrealised Profit and Loss</nuxt-link
          >
        </li>
      </ul>
    </Section>

    <Section>
      <div>
        <h2 class="c-title">Snapshots</h2>
        <span class="c-subtitle ml-2">
          Discover Decred Economics
        </span>
      </div>

      <el-row :gutter="20" class="mt-20">
        <el-col :span="8">
          <GaugeCard icon="safe" :value="featuredTreasuryGrowth.scale">
            <template v-slot:header> Treasury Growth </template>
            <template v-slot:content>
              <strong>
                {{ featuredTreasuryGrowth.pctChange | formatPct }}
              </strong>
              DCR THAN LAST MONTH
            </template>
            <template v-slot:text>
              Current treasury:
              {{ featuredTreasuryGrowth.currentValue | roundTo2DP }}
              DCR
            </template>
          </GaugeCard>
        </el-col>
        <el-col :span="8">
          <GaugeCard icon="hand" :value="featuredDecredPower.scale">
            <template v-slot:header> Decred Power </template>
            <template v-slot:content>
              <strong>{{ featuredDecredPower.pctChange | formatPct }}</strong>
              DCR THAN LAST MONTH
            </template>
            <template v-slot:text>
              Current DCR price:
              {{ featuredDecredPower.currentValue | formatPrice }}
            </template>
          </GaugeCard>
        </el-col>
        <el-col :span="8">
          <GaugeCard icon="cart" :value="featuredRealisedCap.scale">
            <template v-slot:header> Realised Cap (USD) </template>
            <template v-slot:content>
              <strong> {{ featuredRealisedCap.pctChange | formatPct }} </strong>
              USD THAN LAST MONTH
            </template>
            <template v-slot:text>
              Today's Realised Cap (USD):
              {{ featuredRealisedCap.currentValue | formatPrice }}
            </template>
          </GaugeCard>
        </el-col>
      </el-row>
    </Section>

    <Section color="alt-1">
      <div>
        <h2 class="c-title">Analyses &amp; Signals</h2>
        <span class="c-subtitle ml-2">
          Visualize the power of Decred
        </span>
      </div>

      <div class="c-tags-list mt-3">
        <Tag color="red">New</Tag>
        <Tag color="green">Novice Friendly</Tag>
        <Tag color="purple">Expert Insights</Tag>
        <Tag color="blue">Stakeholder Hints</Tag>
        <Tag color="yellow">Investors Snaps</Tag>
      </div>

      <!-- <el-row :gutter="20">
        <el-col lg=""
      </el-row> -->
      <div class="c-chart-cards mt-30">
        <ChartCard :colors="['green', 'blue']" icon="pie">
          Decred Mayer Multiple Bands
        </ChartCard>
        <ChartCard :colors="['red', 'purple']" icon="bar">
          Decred MVRV Ration Valuation
        </ChartCard>
        <ChartCard :colors="['purple', 'yellow']" icon="pie"
          >Stakholders Commitments
        </ChartCard>
        <ChartCard :colors="['green', 'purple']" icon="bar">
          Decred NVT and RVT Ratio
        </ChartCard>
        <ChartCard :colors="['green', 'blue']" icon="pie">
          142-day Ticket Sum
        </ChartCard>
      </div>

      <div class="c-chart__wrapper mt-5 py-5 px-5">
        <!--  -->
        <div class="m--flex">
          <div>
            <Tag color="green">Novice Friendly</Tag>
            <Tag color="blue">Stakeholder Hints</Tag>
            <h2 class="mt-3">Decred Mayer Multiple Bands</h2>
          </div>
        </div>

        <el-row :gutter="32" type="flex" class="mt-4">
          <el-col
            v-loading="isChartLoading"
            :span="16"
            element-loading-background="transparent"
            class="m--flex justify-center"
          >
            <!--  -->
            <!-- <img src="@/assets/images/chart-mayer-sample.png" width="100%" /> -->
            <!-- <div
              v-loading="isChartLoading"
              element-loading-background="transparent"
              class="m--flex justify-center"
              style="position: relative;"
            ></div> -->
            <client-only>
              <Plotly
                v-if="!isChartLoading && chartData"
                :data="chartData.data"
                :layout="chartLayout"
                :options="chartData.options"
              ></Plotly>
            </client-only>
          </el-col>
          <el-col :span="8">
            <!--  -->
            <h4>Abstract</h4>
            <p>
              The Mayer Multiple is a simple oscillator calculated by taking the
              ratio of the current DCR/USD Price to its 200-day moving average.
              The 200-day moving average is a very common indicator in technical
              analysis and is often used to calibrate macro bull/bear bias. The
              Mayer Multiple is a metric that presents the deviation of price
              from this long term mean as an oscillator with historically
              relevant probabilities of occurence.
            </p>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-5">
          <el-col :span="6">
            <MonetaryCard
              title="Market Cap Value"
              value="$ 162.45 M"
              :change="1.3"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col :span="6">
            <MonetaryCard
              title="Real Market Cap Value"
              value="$ 162.45 M"
              :change="-0.3"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col :span="6">
            <MonetaryCard
              title="Total Block Reward"
              value="$ 162.45 M"
              :change="-1.3"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col :span="6">
            <MonetaryCard
              title="Total Tickets Bound Cap"
              value="$ 162.45 M"
              :change="0.3"
              changeLabel="Change (7d)"
            />
          </el-col>
        </el-row>
      </div>
    </Section>

    <Section color="alt-2">
      <div class="c-section__content">
        <div>
          <h2 class="c-title">Expert data &amp; insights</h2>
          <span class="c-subtitle ml-2">
            Get the evolution of Decred economics
          </span>
        </div>

        <TableInsights :data="tableInsightsSorted" class="mt-5" />

        <TableMetrics :data="tableMetrics" class="mt-5" />
        <!-- <table class="c-table c-table--style-2 mt-5">
          <thead>
            <tr>
              <th>Data Name</th>
              <th>Current</th>
              <th>Yesterday</th>
              <th>Week (7d)</th>
              <th>28-day MA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableMetrics.data" :key="`tr-${row[0]}`">
              <td>{{ row.name }}</td>
              <td>{{ row.today | roundTo2DP }}</td>
              <td>{{ row.yesterday | roundTo2DP }}</td>
              <td>{{ row.past_week | roundTo2DP }}</td>
              <td>{{ row['28dayMA'] | roundTo2DP }}</td>
            </tr>
          </tbody>
        </table> -->

        <!-- <table class="c-table c-table--style-2 mt-5">
          <thead>
            <tr>
              <th>Ratio Name</th>
              <th>Current Ratio</th>
              <th>Previous Ratio (30d)</th>
              <th>Current Signal</th>
              <th>Previous Signal (30d)</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MVRV</td>
              <td>0.27</td>
              <td>0.57</td>
              <td>Undervalued</td>
              <td>Undervalued</td>
              <td><nuxt-link to="/">See details</nuxt-link></td>
            </tr>
            <tr>
              <td>MVRV</td>
              <td>0.27</td>
              <td>0.57</td>
              <td>Undervalued</td>
              <td>Undervalued</td>
              <td><nuxt-link to="/">See details</nuxt-link></td>
            </tr>
            <tr>
              <td>MVRV</td>
              <td>0.27</td>
              <td>0.57</td>
              <td>Undervalued</td>
              <td>Undervalued</td>
              <td><nuxt-link to="/">See details</nuxt-link></td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { createKey } from '@/utils'
import ChartCard from '~/components/ChartCard/index.vue'
import GaugeCard from '~/components/GaugeCard/index.vue'
import MonetaryCard from '~/components/MonetaryCard/index.vue'
import Logo from '~/components/Logo.vue'
import SignalIcon from '@/components/SignalIcon/index.vue'
import Section from '~/components/Section/index.vue'
import TableInsights from '~/components/TableInsights/index.vue'
import TableMetrics from '~/components/TableMetrics/index.vue'
import Tag from '~/components/Tag.vue'
import { Plotly } from 'vue-plotly'

const featuredInsightsSample = require('@/data/homepage-featured-insights.json')
const tableInsightsSample = require('@/data/homepage-insights-sample.json')
const tableMetricsSample = require('@/data/homepage-metrics-sample.json')

export default Vue.extend({
  components: {
    ChartCard,
    GaugeCard,
    Logo,
    MonetaryCard,
    Plotly,
    SignalIcon,
    Section,
    TableInsights,
    TableMetrics,
    Tag,
  },

  data() {
    return {
      //
      isChartLoading: true,
      chartData: null as Chart | null,
      featuredInsights: featuredInsightsSample,
      tableMetrics: tableMetricsSample,
      tableInsights: tableInsightsSample,
    }
  },

  async mounted() {
    try {
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
    } catch (err) {
      console.error(err)
    }

    this.isChartLoading = false
  },

  computed: {
    //
    chartLayout(): any {
      if (!this.chartData) {
        return {}
      }

      return {
        ...((this.chartData as unknown) as Chart).layout,
        height: 500,
      }
    },
    featuredTreasuryGrowth(): any {
      const data = this.featuredInsights.data[0]
      const pct = data.primary / data.secondary
      const pctChange = pct - 1
      return {
        pct,
        pctChange,
        currentValue: data.primary,
        scale: this.normalizeFeaturedValue(data.statusbar),
      }
    },
    featuredDecredPower(): any {
      const data = this.featuredInsights.data[1]
      const pct = data.primary / data.secondary
      const pctChange = pct - 1
      return {
        pct,
        pctChange,
        currentValue: data.primary,
        scale: this.normalizeFeaturedValue(data.statusbar),
      }
    },
    featuredRealisedCap(): any {
      const data = this.featuredInsights.data[2]
      const pct = data.primary / data.secondary
      const pctChange = pct - 1
      return {
        pct,
        pctChange,
        currentValue: data.primary,
        scale: this.normalizeFeaturedValue(data.statusbar),
      }
    },
    tableInsightsSorted(): any {
      return {
        ...this.tableInsights,
        data: this.tableInsights.data.sort((a: any, b: any) =>
          a.name === 'Price_DCRBTC_Mid' ? -1 : 1
        ),
      }
    },
  },

  methods: {
    //
    normalizeFeaturedValue(value: number, origScale = 100, newScale = 1) {
      const normalized = (value / origScale) * newScale
      if (normalized < 0.25) {
        return -2
      }
      if (normalized < 0.45) {
        return -1
      }
      // if (normalized < 0.55) {
      //   return 0
      // }
      if (normalized < 0.75) {
        return 1
      }
      return 2
    },
  },
})
</script>

<style lang="scss">
.p-homepage {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .c-title {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    display: inline-block;
    color: $color-blue-100;
    text-transform: uppercase;
  }

  .c-subtitle {
    font-size: 26px;
    font-weight: 600;
    color: $color-gray-600;
    text-transform: none;
  }

  .c-tags-list {
    & > * {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }

  .c-chart-cards {
    display: flex;

    & > * {
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }

  .c-chart__wrapper {
    background: #f3f5f6;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }

  .c-table {
    width: 100%;
    text-align: center;
    border-spacing: 0;

    thead {
      th {
        color: $color-blue-100;
        text-align: center;
        padding: 12px 0;
        margin: 0;
      }
    }

    tbody {
      /*  */
      td {
        /*  */
        text-align: center;
        padding: 12px 0;
      }
    }

    &--style-1 {
      thead {
        th {
          border-bottom: thin solid $color-blue-100;
        }
      }
    }

    &--style-2 {
      thead {
        th {
          background-color: #e6eaed;
        }
      }
    }
  }
}

ul {
  text-align: left;
}
</style>
