import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import WorkoutDetailPage from './pages/WorkoutDetailPage'

function App() {
  const [selectedWorkout, setSelectedWorkout] = useState<'A' | 'B' | null>(null)

  const handleSelectWorkout = (workout: 'A' | 'B') => {
    setSelectedWorkout(workout)
  }

  const handleBack = () => {
    setSelectedWorkout(null)
  }

  if (selectedWorkout) {
    return <WorkoutDetailPage workout={selectedWorkout} onBack={handleBack} />
  }

  return <HomePage onSelectWorkout={handleSelectWorkout} />
}

export default App
