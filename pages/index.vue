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
          <GaugeCard icon="safe" :value="1">
            <template v-slot:header> Treasury Growth </template>
            <template v-slot:content>
              <strong>-0,95%</strong> DCR THAN LAST MONTH
            </template>
            <template v-slot:text> Current treasury value: 11.2M USD </template>
          </GaugeCard>
        </el-col>
        <el-col :span="8">
          <GaugeCard icon="hand" :value="2">
            <template v-slot:header> Decred Power </template>
            <template v-slot:content>
              <strong>+0,95%</strong> DCR THAN YESTERDAY
            </template>
            <template v-slot:text> Current treasury value: 11.2M USD </template>
          </GaugeCard>
        </el-col>
        <el-col :span="8">
          <GaugeCard icon="cart" :value="-2">
            <template v-slot:header> Mayer Multiple Oscillator </template>
            <template v-slot:content>
              <strong>Bullish</strong> strong buy
            </template>
            <template v-slot:text> MVRV ratio: 0.50 </template>
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

        <el-row :gutter="32" class="mt-4">
          <el-col span="12">
            <!--  -->
            <img src="@/assets/images/chart-mayer-sample.png" width="100%" />
          </el-col>
          <el-col span="12">
            <!--  -->
            <h4>Abstract</h4>
            <p>
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas
              sit, aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores eos, qui ratione voluptatem sequi nesciunt, neque porro
              quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur,
              adipisci[ng] velit, sed quia non numquam [do] eius modi tempora
              inci[di]dunt, ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit, qui in ea
              voluptate velit esse, quam nihil molestiae consequatur, vel illum,
              qui dolorem eum fugiat, quo voluptas nulla pariatur?
            </p>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-5">
          <el-col span="6">
            <MonetaryCard
              title="Market Cap Value"
              value="$ 162.45 M"
              :change="1.3"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col span="6">
            <MonetaryCard
              title="Market Cap Value"
              value="$ 162.45 M"
              :change="-0.3"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col span="6">
            <MonetaryCard
              title="Market Cap Value"
              value="$ 162.45 M"
              :change="-1.3"
              changeLabel="Change (7d)"
            />
          </el-col>
          <el-col span="6">
            <MonetaryCard
              title="Market Cap Value"
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

        <table class="c-table c-table--style-1 mt-5">
          <thead>
            <tr>
              <th v-for="d in tableSignals.columns" :key="d">{{ d }}</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableSignals.data" :key="`tr-${row[0]}`">
              <td v-for="(d, idx) in row" :key="`td-${row[0]}-${idx}`">
                {{ d }}
              </td>
            </tr>
          </tbody>
        </table>

        <table class="c-table c-table--style-2 mt-5">
          <thead>
            <tr>
              <th v-for="d in tableSignals.columns" :key="d">{{ d }}</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableSignals.data" :key="`tr-${row[0]}`">
              <td v-for="(d, idx) in row" :key="`td-${row[0]}-${idx}`">
                {{ d }}
              </td>
            </tr>
          </tbody>
        </table>

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
import ChartCard from '~/components/ChartCard/index.vue'
import GaugeCard from '~/components/GaugeCard/index.vue'
import MonetaryCard from '~/components/MonetaryCard/index.vue'
import Logo from '~/components/Logo.vue'
import Section from '~/components/Section/index.vue'
import Tag from '~/components/Tag.vue'

const tableSignalsSample = require('@/data/homepage-signals-sample.json')
const tableInsightsSample = require('@/data/homepage-insights-sample.json')

export default Vue.extend({
  components: {
    ChartCard,
    GaugeCard,
    MonetaryCard,
    Logo,
    Section,
    Tag,
  },

  data() {
    return {
      //
      tableSignals: tableSignalsSample,
      tableInsights: tableInsightsSample,
    }
  },

  computed: {
    //
  },

  methods: {
    //
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
