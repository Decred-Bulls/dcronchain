<template>
  <div class="p-homepage">
    <Section>
      <div>
        <h2 class="c-title mr-2">Market Insights</h2>
        <span class="c-subtitle">
          Decred Economic Performance
        </span>
      </div>

      <el-row v-if="featuredInsights" :gutter="20" class="mt-20">
        <el-col :lg="8" :md="8" :sm="24">
          <GaugeCard
            icon="safe"
            :labels="['Overspend', 'Spend', 'Gain', 'Growth']"
            :value="featuredTreasuryGrowth.scale"
          >
            <template v-slot:header> Monthly Treasury Growth </template>
            <template v-slot:content>
              <strong>
                {{ featuredTreasuryGrowth.pctChange | formatPct }}
              </strong>
              DCR From Last Month
            </template>
            <template v-slot:text>
              Current treasury:
              {{ featuredTreasuryGrowth.currentValue | roundTo2DP }}
              DCR
            </template>
          </GaugeCard>
        </el-col>
        <el-col :lg="8" :md="8" :sm="24">
          <GaugeCard icon="hand" :value="featuredDecredPower.scale">
            <template v-slot:header> Decred Purchasing Power </template>
            <template v-slot:content>
              <strong>{{ featuredDecredPower.pctChange | formatPct }}</strong>
              DCR From Last Month
            </template>
            <template v-slot:text>
              Current DCR price:
              {{ featuredDecredPower.currentValue | formatPrice }}
            </template>
          </GaugeCard>
        </el-col>
        <el-col :lg="8" :md="8" :sm="24">
          <GaugeCard icon="cart" :value="featuredRealisedCap.scale">
            <template v-slot:header> Realised Cap (USD) </template>
            <template v-slot:content>
              <strong> {{ featuredRealisedCap.pctChange | formatPct }} </strong>
              USD From Last Month
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
        <h2 class="c-title mr-2">Analyses &amp; Signals</h2>
        <span class="c-subtitle">
          Decred On-chain Performance
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
        <nuxt-link to="/charts/decred-mayer-multiple-bands">
          <ChartCard :colors="['green', 'blue']" icon="pie">
            Decred Mayer Multiple Bands
          </ChartCard>
        </nuxt-link>
        <nuxt-link to="/charts/decred-realised-cap-and-mvrv-ratio">
          <ChartCard :colors="['red', 'purple']" icon="bar">
            Decred MVRV Ratio Valuation
          </ChartCard>
        </nuxt-link>
        <nuxt-link
          to="/charts/decred-relative-bitcoin-realised-cap-and-mvrv-ratio"
        >
          <ChartCard :colors="['purple', 'yellow']" icon="pie"
            >Relative BTC Realised Cap and MVRV ratio
          </ChartCard>
        </nuxt-link>
        <nuxt-link to="/charts/decred-market-realised-gradient-oscillator">
          <ChartCard :colors="['green', 'purple']" icon="bar">
            Market-Realised Gradient Oscillator
          </ChartCard>
        </nuxt-link>
        <nuxt-link to="/charts/decred-unrealised-profit-and-loss">
          <ChartCard :colors="['green', 'blue']" icon="pie">
            Unrealised PnL
          </ChartCard>
        </nuxt-link>
      </div>

      <div class="c-chart__wrapper mt-5">
        <el-row :gutter="32" class="mt-4">
          <el-col
            v-loading="isChartLoading"
            :lg="16"
            :md="24"
            :sm="24"
            element-loading-background="transparent"
          >
            <Tag color="green">Novice Friendly</Tag>
            <Tag color="blue">Stakeholder Hints</Tag>
            <h2 class="mt-3">Decred Mayer Multiple Bands</h2>

            <client-only>
              <div class="chart mt-4">
                <Plotly
                  v-if="!isChartLoading && chartData"
                  :data="chartData.data"
                  :layout="chartLayout"
                  :options="chartData.options"
                ></Plotly>
              </div>
            </client-only>
          </el-col>
          <el-col :lg="8" :md="24" :sm="24">
            <!--  -->
            <div class="m--flex justify-end">
              <nuxt-link to="/charts/decred-mayer-multiple-bands">
                <Button size="big" transparent>See details and research</Button>
              </nuxt-link>
            </div>
            <div class="mt-70">
              <h2>Abstract</h2>
              <p class="mt-3">
                The Mayer Multiple is a simple oscillator calculated by taking
                the ratio of the current DCR/USD Price to its 200-day moving
                average. The 200-day moving average is a very common indicator
                in technical analysis and is often used to calibrate macro
                bull/bear bias. The Mayer Multiple is a metric that presents the
                deviation of price from this long term mean as an oscillator
                with historically relevant probabilities of occurence.
              </p>
            </div>
          </el-col>
        </el-row>

        <el-row v-if="featuredChartInsights" :gutter="20" class="mt-5">
          <el-col :lg="6" :md="8" :xs="20">
            <MonetaryCard
              title="Mayer Multiple"
              :value="featuredChartMayerMultiple.currentValue | roundTo2DP"
              :change="featuredChartMayerMultiple.pctChange | roundTo2DP"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col :lg="6" :md="8" :xs="20">
            <MonetaryCard
              title="Price (USD)"
              :value="featuredChartPriceUSD.currentValue | roundTo2DP"
              :change="featuredChartPriceUSD.pctChange | roundTo2DP"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col :lg="6" :md="8" :xs="20">
            <MonetaryCard
              title="200-Day MA (USD)"
              :value="featuredChart200DMA.currentValue | roundTo2DP"
              :change="featuredChart200DMA.pctChange | roundTo2DP"
              changeLabel="Change (7d)"
            />
          </el-col>
          <!-- <el-col :span="6">
            <MonetaryCard
              title="Total Tickets Bound Cap"
              value="$ 162.45 M"
              :change="0.3"
              changeLabel="Change (7d)"
            />
          </el-col> -->
        </el-row>
      </div>
    </Section>

    <Section color="alt-2">
      <div class="c-section__content">
        <div>
          <h2 class="c-title mr-2">Snapshots</h2>
          <span class="c-subtitle">
            Decred Metrics Dashboard
          </span>
        </div>

        <TableInsights
          v-if="tableInsightsSorted"
          :data="tableInsightsSorted"
          class="mt-5"
        />

        <TableMetrics v-if="tableMetrics" :data="tableMetrics" class="mt-5" />
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { createKey } from '@/utils'
import Button from '~/components/Button/index.vue'
import ChartCard from '~/components/ChartCard/index.vue'
import GaugeCard from '~/components/GaugeCard/index.vue'
import MonetaryCard from '~/components/MonetaryCard/index.vue'
import Logo from '~/components/Logo.vue'
import SignalIcon from '@/components/SignalIcon/index.vue'
import Section from '~/components/Section/index.vue'
import TableInsights from '~/components/TableInsights/index.vue'
import TableMetrics from '~/components/TableMetrics/index.vue'
import Tag from '~/components/Tag.vue'

async function fetchFeaturedChartInsightsData($axios: NuxtAxiosInstance) {
  try {
    return await $axios.$get(
      '/api/proxy/dcronchain/data/master/data/homepage_featured_chart_insights.json'
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}
async function fetchFeaturedInsightsData($axios: NuxtAxiosInstance) {
  try {
    return await $axios.$get(
      '/api/proxy/dcronchain/data/master/data/homepage_insights.json'
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}
async function fetchTableInsights($axios: NuxtAxiosInstance) {
  try {
    return await $axios.$get(
      '/api/proxy/dcronchain/data/master/data/homepage_charts_table.json'
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}
async function fetchTableMetrics($axios: NuxtAxiosInstance) {
  try {
    return await $axios.$get(
      '/api/proxy/dcronchain/data/master/data/homepage_metric_table.json'
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default Vue.extend({
  components: {
    Button,
    ChartCard,
    GaugeCard,
    Logo,
    MonetaryCard,
    Plotly: () => import('vue-plotly').then((m) => m.Plotly),
    SignalIcon,
    Section,
    TableInsights,
    TableMetrics,
    Tag,
  },

  async asyncData({ $axios }) {
    const data: any = await Promise.allSettled([
      //
      fetchFeaturedChartInsightsData($axios),
      fetchFeaturedInsightsData($axios),
      fetchTableInsights($axios),
      fetchTableMetrics($axios),
    ])

    console.log(JSON.stringify(data))

    return {
      featuredChartInsights:
        data[0].status === 'fulfilled' ? data[0].value : null,
      featuredInsights: data[1].status === 'fulfilled' ? data[1].value : null,
      tableInsights: data[2].status === 'fulfilled' ? data[2].value : null,
      tableMetrics: data[3].status === 'fulfilled' ? data[3].value : null,
    }
  },

  data() {
    return {
      //
      isChartLoading: true,
      chartData: null as Chart | null,
      featuredInsights: undefined as any,
      featuredChartInsights: undefined as any,
      tableInsights: undefined as any,
      tableMetrics: undefined as any,
    }
  },

  async mounted() {
    this.fetchMayerMultipleData()
    // await Promise.all([
    //   //
    //   this.fetchMayerMultipleData(),
    //   this.fetchFeaturedChartInsightsData(),
    //   this.fetchFeaturedInsightsData(),
    //   this.fetchTableInsights(),
    //   this.fetchTableMetrics(),
    // ])
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
    featuredChart200DMA(): any {
      const data = this.featuredChartInsights.data[0]
      const pct = data.today / data.past_week
      const pctChange = pct - 1
      return {
        currentValue: data.today,
        pct,
        pctChange,
      }
    },
    featuredChartMayerMultiple(): any {
      const data = this.featuredChartInsights.data[1]
      const pct = data.today / data.past_week
      const pctChange = pct - 1
      return {
        currentValue: data.today,
        pct,
        pctChange,
      }
    },
    featuredChartPriceUSD(): any {
      const data = this.featuredChartInsights.data[2]
      const pct = data.today / data.past_week
      const pctChange = pct - 1
      return {
        currentValue: data.today,
        pct,
        pctChange,
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
      if (!this.tableInsights) {
        return null
      }

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

    async fetchMayerMultipleData() {
      try {
        this.chartData = await this.$axios.$get(
          '/api/proxy/dcronchain/data/master/data/mayermultiple_pricing_usd.json'
        )

        if (this.chartData) {
          this.chartData.data = this.chartData.data.map(
            (d: any, idx: number) => {
              return {
                ...d,
                key: createKey(d.name, idx),
                show: true,
                showToggle: d.showlegend,
                showlegend: false,
              }
            }
          )
        }
      } catch (err) {
        console.error(err)
      }

      this.isChartLoading = false
    },
    // async fetchFeaturedChartInsightsData() {
    //   try {
    //     this.featuredChartInsights = await this.$axios.$get(
    //       '/api/proxy/dcronchain/data/master/data/homepage_featured_chart_insights.json'
    //     )
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    // async fetchFeaturedInsightsData() {
    //   try {
    //     this.featuredInsights = await this.$axios.$get(
    //       '/api/proxy/dcronchain/data/master/data/homepage_insights.json'
    //     )
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    // async fetchTableInsights() {
    //   try {
    //     this.tableInsights = await this.$axios.$get(
    //       '/api/proxy/dcronchain/data/master/data/homepage_charts_table.json'
    //     )
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    // async fetchTableMetrics() {
    //   try {
    //     this.tableMetrics = await this.$axios.$get(
    //       '/api/proxy/dcronchain/data/master/data/homepage_metric_table.json'
    //     )
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    normalizeFeaturedValue(value: number) {
      if (value < -50) {
        return -2
      }
      if (value < 0) {
        return -1
      }
      // if (value < 0.55) {
      //   return 0
      // }
      if (value < 50) {
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

  a,
  a:hover,
  a:active,
  a:visited {
    text-decoration: none;
  }

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

    @include media('<=sm') {
      display: block;
    }
  }

  .c-tags-list {
    & > * {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }

    @include media('<=sm') {
      & > * {
        &:not(:last-child) {
          margin-right: 0;
          margin-bottom: 12px;
        }
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

    @include media('<=sm') {
      flex-direction: column;

      & > * {
        &:not(:last-child) {
          margin-right: 0;
          margin-bottom: 16px;
        }
      }
    }
  }

  .c-chart__wrapper {
    background: #f3f5f6;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    padding: 32px;

    @include media('<=sm') {
      margin-left: -40px;
      margin-right: -40px;
      /* padding: 0; */

      .chart {
        margin-left: -70px;
        margin-right: -80px;
      }
    }
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
