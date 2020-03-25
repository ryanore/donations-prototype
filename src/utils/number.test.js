import { toCurrency } from './number.js'

describe('Util - toCurrencty', () => {
  it('formats with 2 decimals', () => {
    expect(toCurrency(20)).toEqual('20.00')
  })
  it('can use dollar sign', () => {
    expect(toCurrency(20, true)).toEqual('$20.00')
  })
  it('throws if called with NaN', () => {
    expect(() => {
      toCurrencty('octopus')
    }).toThrow()
  })
})
