import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { DonationsProvider } from '../../context/donations-context'
import InfoBubble from './InfoBubble'

const defaults = {}

const setup = (propArgs, context, re) => {
  const props = { ...defaults, ...propArgs }
  return render(
    <DonationsProvider value={context}>
      <InfoBubble {...props} />
    </DonationsProvider>
  )
}

describe('InfoBubble Component', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders', () => {
    const utils = setup()
    const component = utils.getByTestId('info')
    expect(component).toBeInTheDocument()
  })

  it('renders remaining value from context', () => {
    const utils = setup(null, { remaining: 200 })
    expect(utils.getByText(/200/)).toBeInTheDocument()
  })
})
