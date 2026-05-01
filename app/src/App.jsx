import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : (
        <DashboardPage onNavigate={setCurrentPage} />
      )}
    </>
  )
}

export default App
