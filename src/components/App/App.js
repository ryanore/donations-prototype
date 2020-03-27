import React from 'react'
import { DonationsProvider } from '../../context/donations-context'
import AdminTools from '../AdminTools'
import DonationWidget from '../DonationWidget'
import InfoBubble from '../InfoBubble'
import './App.scss'

// assuming there is some authentication and role based managment
const isAdmin = true

const App = () => {
  return (
    <div className="App" data-testid="app-root">
      <DonationsProvider>
        <InfoBubble />
        <DonationWidget />
        <AdminTools isAdmin={isAdmin} />
      </DonationsProvider>
    </div>
  )
}

export default App
