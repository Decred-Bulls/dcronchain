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
