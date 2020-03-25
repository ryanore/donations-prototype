import React from 'react'
import { DonationsProvider } from '../../context/donations-context'
import DonationWidget from '../DonationWidget'
import InfoBubble from '../InfoBubble'
import './App.scss'

const App = () => {
  return (
    <div className="App" data-testid="app-root">
      <DonationsProvider>
        <InfoBubble />
        <DonationWidget />
      </DonationsProvider>
    </div>
  )
}

export default App
