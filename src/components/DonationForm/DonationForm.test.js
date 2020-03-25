import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import {
  DonationsProvider,
  useDonationsDispatch,
  DonationsDispatch,
  defaultState,
} from '../../context/donations-context'
import DonationForm from './DonationForm'

const defaults = {}

const setup = (ctx) => {
  const context = Object.assign({}, defaultState, ctx)

  return render(
    <DonationsProvider value={context}>
      <DonationForm />
    </DonationsProvider>
  )
}

describe('DonationForm Component', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders', () => {
    const input = setup().getByTitle('donation')
    expect(input).toBeInTheDocument()
  })

  it('has the correct initial value', () => {
    const input = setup({ minDonation: 200 }).getByTitle('donation')
    expect(input.value).toBe('200')
  })

  it('shows error on invalid amount, disables', () => {
    const component = setup({ minDonation: 5 })
    fireEvent.change(component.getByTitle('donation'), {
      target: { value: '1' },
    })
    expect(component.getByText(/minimum/i)).toBeInTheDocument()
    expect(component.getByText(/give now/i)).toBeDisabled()
  })
})
