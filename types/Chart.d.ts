type ChartSeries = {
  fill: string
  fillcolor: string
  line: { color: string; dash: string; width: number }
  name: string
  opacity: number
  showlegend: boolean
  type: string
  x: string[]
  xaxis: string
  y: (number | null)[]
  yaxis: string
  // Custom fields
  key?: string
  show?: boolean
  showToggle?: boolean
}

type Chart = {
  data: ChartSeries[]
  layout: any
}
