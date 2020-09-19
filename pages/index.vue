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
              <th>Ration Name</th>
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
        </table>

        <table class="c-table c-table--style-2 mt-5">
          <thead>
            <tr>
              <th>Ration Name</th>
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
        </table>
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import GaugeCard from '~/components/GaugeCard/index.vue'
import Logo from '~/components/Logo.vue'
import Section from '~/components/Section/index.vue'
import Tag from '~/components/Tag.vue'

export default Vue.extend({
  components: {
    GaugeCard,
    Logo,
    Section,
    Tag,
  },

  data() {
    return {
      //
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
