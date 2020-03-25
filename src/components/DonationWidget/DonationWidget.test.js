import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { DonationsProvider } from '../../context/donations-context'
import DonationWidget from './DonationWidget'

const defaults = {}

const setup = (propArgs, re) => {
  const props = { ...defaults, ...propArgs }
  return render(
    <DonationsProvider>
      <DonationWidget {...props} />
    </DonationsProvider>
  )
}

describe('DonationWidget Component', () => {
  afterEach(cleanup)

  it('renders', () => {
    const utils = setup()
    expect(utils.getByTestId('widget')).toBeInTheDocument()
  })
})
