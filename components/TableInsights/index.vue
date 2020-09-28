<template>
  <div class="c-table-insights">
    <table v-if="data" class="c-table c-table--style-1">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Today</th>
          <th>Yesterday</th>
          <th>Week (7d)</th>
          <th>28-day MA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.data" :key="`tr-${row[0]}`">
          <template v-if="row.name !== 'Price_DCRBTC_Mid'">
            <td>{{ dataTitles[row.name] || row.name }}</td>
            <td>{{ row.today | roundTo2DP }}</td>
            <td>{{ row.yesterday | roundTo2DP }}</td>
            <td>{{ row.past_week | roundTo2DP }}</td>
            <td>{{ row['28dayMA'] | roundTo2DP }}</td>
          </template>
          <template v-if="row.name === 'Price_DCRBTC_Mid'">
            <td>{{ dataTitles[row.name] || row.name }}</td>
            <td>{{ row.today }}</td>
            <td>{{ row.yesterday }}</td>
            <td>{{ row.past_week }}</td>
            <td>{{ row['28dayMA'] }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const dataTitles = {
  Price_DCRBTC_Mid: 'Price (BTC)',
  CapMVRVCur: 'Market Cap (MVRV)',
  Mayer_Multiple: 'Mayer Multiple',
  // MrktGradient: '',
  UnrealisedPnL_Net: 'Unrealised PnL (net)',
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
.c-table-insights {
  max-width: 100%;
  overflow-x: auto;

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
