<template>
  <div class="c-table-metrics">
    <table v-if="data" class="c-table c-table--style-2">
      <thead>
        <tr>
          <th>Data Name</th>
          <th>Today</th>
          <th>Yesterday</th>
          <th>Week (7d)</th>
          <th>28-day MA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.data" :key="`tr-${row[0]}`">
          <template v-if="row.name.includes('USD')">
            <td>{{ dataTitles[row.name] || row.name }}</td>
            <td>{{ row.today | formatPrice }}</td>
            <td>{{ row.yesterday | formatPrice }}</td>
            <td>{{ row.past_week | formatPrice }}</td>
            <td>{{ row['28dayMA'] | formatPrice }}</td>
          </template>
          <template v-else>
            <td>{{ dataTitles[row.name] || row.name }}</td>
            <td>{{ row.today | roundTo2DP }}</td>
            <td>{{ row.yesterday | roundTo2DP }}</td>
            <td>{{ row.past_week | roundTo2DP }}</td>
            <td>{{ row['28dayMA'] | roundTo2DP }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const dataTitles = {
  PriceUSD: 'Price (USD)',
  CapMrktCurUSD: 'Market Cap (USD)',
  tic_price_avg: 'Ticket Price (DCR)',
  tic_usd_cost: 'Ticket Price (USD)',
  pow_hashrate_THs_avg: 'PoW Hashrate (THs)',
  TxCnt: 'Transactions',
  TxTfrValMeanNtv: 'Daily Value Transferred',
  AdrActCnt: 'Active Addresses',
}

export default Vue.extend({
  //
  props: {
    data: {
      type: Object,
      required: true,
      default: () => null,
    },
  },

  data() {
    return {
      //
      dataTitles,
    }
  },
})
</script>

<style lang="scss" scoped>
.c-table-metrics {
  max-width: 100%;
  overflow-x: auto;

  @include media('<=sm') {
    /* margin-right: -40px; */
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
</style>
