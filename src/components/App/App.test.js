import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import App from './App'
import { LS_NAMESPACE } from '../../context/donations-context'

const defaults = {}

const setup = (propArgs, re) => {
  const props = { ...defaults, ...propArgs }
  return render(<App {...props} />)
}

describe('INTEGRATION', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('uses localStorage to hydrate', () => {
    const stub = JSON.stringify({
      projectName: 'TESTPROJECT',
      goal: 100,
      gained: 50,
      minDonation: 10,
      donors: 3,
    })
    localStorage.setItem(LS_NAMESPACE, stub)
    const utils = setup()
    expect(utils.getByText('TESTPROJECT')).toBeInTheDocument()
    expect(utils.getByText('$50.00')).toBeInTheDocument()
    expect(utils.getByText('3')).toBeInTheDocument()
  })

  it('persists to localstorage on update', () => {
    const utils = setup()
    const donateForm = utils.getByTestId('donationForm')
    fireEvent.submit(donateForm)
    expect(localStorage.setItem).toHaveBeenCalled()
  })
})

describe('App Component', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })
  it('renders', () => {
    const utils = setup()
    expect(utils.getByTestId('app-root')).toBeInTheDocument()
  })
})
