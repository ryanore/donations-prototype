import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from './App'

const defaults = {}

const setup = (propArgs, re) => {
  const props = { ...defaults, ...propArgs }
  return render(<App {...props} />)
}

describe('App Component', () => {
  afterEach(cleanup)
  it('renders', () => {
    const utils = setup()
    expect(utils.getByTestId('app-root')).toBeInTheDocument()
  })
})
