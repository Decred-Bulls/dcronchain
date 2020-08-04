<template>
  <div>
    <div class="m--flex mt-40">
      <Button prependIcon="arrow-left">Previous chart</Button>
      <Button appendIcon="arrow-right" class="ml-auto">Next chart</Button>
    </div>

    <div class="mx-40 mt-50">
      <div class="">
        <Tag color="green">Novice Friendly</Tag>
        <Tag color="gray">Stakeholders Hints</Tag>
      </div>

      <div class="m--flex">
        <div>
          <h1 class="c-chart__title mt-20">
            Decred Mayer Multiple Bands
          </h1>
          <div class="c-chart__subtitle">
            July, 1 2020 - Mayer Multiple = 0.9 / DCR Price = $100
          </div>
          <div class="c-chart__last-update">
            Updated 03 July 2020
          </div>
        </div>

        <div class="ml-auto">
          <div class="m--flex">
            <div>
              <div class="c-chart__signal">STRONG BUY - BULLISH</div>
              <div class="c-chart__signal-value">MVRV Ratio = 0.50</div>
            </div>
            <SignalIcon type="up" class="ml-4" />
          </div>
        </div>
      </div>

      <!-- Switches -->
      <div class="m--flex mt-40">
        <div class="c-chart__data-switches">
          <Toggle v-model="showUSDPrice"> DCR Price (USD) </Toggle>
          <Toggle v-model="showMayerMultiple" color="purple">
            Show Mayer Multiple
          </Toggle>
          <Toggle v-model="show200DMA" color="blue"> 200DMA </Toggle>
          <Toggle v-model="showStrongSell" color="red"> Strong Sell </Toggle>
          <Toggle v-model="showSell" color="pink"> Sell </Toggle>
          <Toggle v-model="showBuy" color="neon-green"> Buy </Toggle>
          <Toggle v-model="showStrongSell" color="green"> Strong Buy </Toggle>
        </div>
        <div class="m--flex justify-end" style="flex-grow: 1;">
          <Button inverted>USD</Button>
          <Button>BTC</Button>
          <Button class="ml-3">Share</Button>
        </div>
      </div>
    </div>

    <div class="c-chart__hint mt-40 text--align-center">
      <strong>Chart Hints</strong>: MVRV below 0,7 indicates a
      <strong>BUY ZONE</strong> as the Market Cap is
      <strong>undervalued</strong> compare with the Realised value.
    </div>

    <div class="my-4">
      <Plotly
        v-if="isClientSide"
        :data="chartData.data"
        :layout="chartData.layout"
        :display-mode-bar="false"
      ></Plotly>
    </div>

    <div class="m--flex columns-two mt-40">
      <div>
        <h2 class="c-chart__brief">Chart Brief</h2>
        <p>
          The Mayer Multiple is a simple oscillator calculated by taking the
          ratio of the DCR/USD Price to the 200-day moving average. This metric
          provides a measure of deviation of price from a long term mean which
          is commonly utilised in technical analysis as a bull/bear
          support/resistance level.
        </p>
      </div>
      <div>
        <h2 class="c-chart__resources">Chart Resources</h2>
        <p>
          Link name
        </p>
        <p>
          Link name
        </p>
        <p>
          Link name
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '@/components/Button/index.vue'
import SignalIcon from '@/components/SignalIcon/index.vue'
import Toggle from '@/components/Toggle.vue'
import Tag from '@/components/Tag.vue'
import JsonChartData from './mayer_multiple_light.json'

export default Vue.extend({
  layout: 'chart',

  components: {
    Button,
    // import { Plotly } from 'vue-plotly'
    Plotly: () => import('vue-plotly').then(mod => mod.Plotly),
    SignalIcon,
    Tag,
    Toggle,
  },

  data() {
    return {
      showUSDPrice: false,
      showMayerMultiple: true,
      show200DMA: true,
      showStrongSell: true,
      showSell: true,
      showBuy: true,
      showStrongBuy: true,
      chartData: JsonChartData,
    }
  },

  computed: {
    isClientSide(): boolean {
      // @ts-ignore
      return !!global.document && !!global.window
    },
  },
})
</script>

<style lang="scss" scoped></style>
