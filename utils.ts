export function rgbToHex(
  r: string | number,
  g: string | number,
  b: string | number
) {
  return (
    '#' +
    ((1 << 24) + (Number(r) << 16) + (Number(g) << 8) + Number(b))
      .toString(16)
      .slice(1)
  )
}

export function normalize(value: string) {
  return value.replace(' ', '-').replace('(', '').replace(')', '').toLowerCase()
}

export function createKey(name: string, idx: string | number) {
  return `${idx}-${normalize(name)}`
}
