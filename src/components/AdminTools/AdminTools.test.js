import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
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

describe('Admin Component', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders an admin link when use is Admin', () => {
    const utils = setup({ isAdmin: true })
    expect(utils.getByText('Open admin panel')).toBeInTheDocument()
  })
  it('does not render an admin panel by default', () => {
    const utils = setup()
    expect(utils.queryByText(/edit the project/i)).not.toBeInTheDocument()
  })
  it('does not render an admin link when use is not Admin', () => {
    const utils = setup({ isAdmin: false })
    expect(utils.queryByText(/open admin panel/i)).not.toBeInTheDocument()
  })
  it('opens an admin link when clicked link', () => {
    const utils = setup({ isAdmin: true })
    fireEvent.click(utils.getByText('Open admin panel'))
    expect(utils.getByText(/Edit the Project/i)).toBeInTheDocument()
  })
})
