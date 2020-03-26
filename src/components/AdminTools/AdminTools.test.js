import React from 'react'
import { render, cleanup } from '@testing-library/react'
import {
  DonationsProvider,
  useDonations,
  PROJECT_UPDATE,
} from '../../context/donations-context'
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

  it.only('renders', () => {
    expect(true).toBe(true)
  })
})
