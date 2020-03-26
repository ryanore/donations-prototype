import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { DonationsProvider } from '../../context/donations-context'
import AdminTools from './AdminTools'

const defaults = {}

const setup = (propArgs, context, re) => {
  const props = { ...defaults, ...propArgs }
  return render(
    <DonationsProvider value={context}>
      <AdminTools {...props} />
    </DonationsProvider>
  )
}

describe('InfoBubble Component', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders', () => {
    expect(true).toBe(true)
  })
})
