import React from 'react'
import { DonationsProvider, initialState } from '../../context/donations-context'
import DonationWidget from '../DonationWidget'
import InfoBubble from '../InfoBubble'
import './App.scss'

const App = () => (
  <div className="App" data-testid="app-root">
    <DonationsProvider value={initialState}>
      <InfoBubble />
      <DonationWidget />
    </DonationsProvider>
  </div>
)

export default App
