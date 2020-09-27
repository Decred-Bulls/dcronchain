import Vue from 'vue'

Vue.filter('formatDate', function (value?: string) {
  if (!value || value === '') {
    return ''
  }
  const formatter = new Intl.DateTimeFormat('en-EN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return formatter.format(new Date(value))
})

Vue.filter('formatDateShort', function (value?: string) {
  if (!value || value === '') {
    return ''
  }
  const formatter = new Intl.DateTimeFormat('en-EN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
  return formatter.format(new Date(value))
})

Vue.filter('formatMonth', function (value?: string) {
  if (!value || value === '') {
    return ''
  }
  const formatter = new Intl.DateTimeFormat('en-EN', {
    month: 'long',
    year: 'numeric',
  })
  return formatter.format(new Date(value))
})

Vue.filter('formatYear', function (value?: string) {
  if (!value || value === '') {
    return ''
  }
  const formatter = new Intl.DateTimeFormat('en-EN', { year: 'numeric' })
  return formatter.format(new Date(value))
})

Vue.filter('roundTo2DP', function (value?: string) {
  // if (!value || value === '') {
  //   return ''
  // }
  return Number(value).toFixed(2)
})

Vue.filter('formatPrice', function (value: string | number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })
  return formatter.format(Number(value))
})

Vue.filter('formatPct', function (value: string | number) {
  const pct = Number(value) * 100
  return `${pct.toFixed(2)}%`
})
