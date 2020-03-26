import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { DonationsProvider } from '../../context/donations-context'
import ProgressBar from './ProgressBar'

const defaults = {}

const setup = (propArgs) => {
  const props = { ...defaults, ...propArgs }
  return render(<ProgressBar {...props} />)
}

describe('ProgressBar Component', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders', () => {
    const utils = setup()
    const component = utils.getByRole('progressbar')
    expect(component).toBeInTheDocument()
  })

  it('renders the correct initialwidth', () => {
    const component = setup({ percent: 50 }).getByRole('progressbar').firstChild
    expect(component).toHaveStyle('width: 50%')
  })
})
