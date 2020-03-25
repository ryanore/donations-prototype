export function toCurrency(num, dollar = false) {
  if (isNaN(num)) {
    throw new Error('function toCurrency must be given a number')
  }
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  const out = Number(num).toLocaleString('en', options)

  console.log('out ', out)

  return dollar ? `$${out}` : out
}
