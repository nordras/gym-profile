import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import HomePage from './pages/HomePage'
import WorkoutPage from './pages/WorkoutPage'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import PWAUpdatePrompt from './components/PWAUpdatePrompt'
import OfflineIndicator from './components/OfflineIndicator'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/treino/:workout" element={<WorkoutPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <PWAInstallPrompt />
      <OfflineIndicator />
      <PWAUpdatePrompt />
    </BrowserRouter>
  )
}

export default App
