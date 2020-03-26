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

  it('moves the carat to the correct position', () => {
    const utils = setup(null, { progress: 50 })
    const component = utils.getByTestId('progress-carat')
    expect(component).toHaveStyle('left: 50%')
  })

  it('displays correct message when goal is exceeded', () => {
    const utils = setup(null, { goal: 10, gained: 20 })
    expect(utils.getByText(/exceeded/)).toBeInTheDocument()
    expect(utils.getByText(/\$10/)).toBeInTheDocument()
  })
  it('displays correct message when goal is met', () => {
    const utils = setup(null, { goal: 10, gained: 10 })
    expect(utils.getByText(/met/)).toBeInTheDocument()
  })
  it('displays correct message when goal is not met', () => {
    const utils = setup(null, { goal: 10, gained: 5 })
    expect(utils.getByText(/needed/)).toBeInTheDocument()
    expect(utils.getByText(/\$5/)).toBeInTheDocument()
  })
})
