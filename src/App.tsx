import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import WorkoutPage from './pages/WorkoutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/treino/:workout" element={<WorkoutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
