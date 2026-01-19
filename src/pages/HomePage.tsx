import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Calendar from '../components/Calendar'
import ThemeToggle from '../components/ThemeToggle'

export default function HomePage() {
  const navigate = useNavigate()
  const [nextWorkout, setNextWorkout] = useState<'A' | 'B'>('A')
  const [devMode, setDevMode] = useState(true)

  useEffect(() => {
    const lastWorkout = localStorage.getItem('lastWorkout') as 'A' | 'B' | null
    const lastWorkoutDate = localStorage.getItem('lastWorkoutDate')
    const today = new Date().toDateString()
        
    if (lastWorkoutDate === today) {
      setNextWorkout(lastWorkout || 'A')
      return
    }
    
    if (lastWorkout === 'A') {
      setNextWorkout('B')
    } else if (lastWorkout === 'B') {
      setNextWorkout('A')
    } else {
      const dayOfMonth = new Date().getDate()
      setNextWorkout(dayOfMonth % 2 === 1 ? 'A' : 'B')
    }
  }, [])

  const handleStartWorkout = () => {
    const lastWorkoutDate = localStorage.getItem('lastWorkoutDate')
    const today = new Date().toDateString()
    
    // TODO REMOVE
    if (!devMode && lastWorkoutDate === today) {
      alert('Você já treinou hoje! Descanse e volte amanhã.')
      return
    }
    
    localStorage.setItem('lastWorkout', nextWorkout)
    localStorage.setItem('lastWorkoutDate', today)
    
    // No final tem que adicionar o dia atual na lista de dias como treino completo TODO pensar melhor nessa solução
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]')
    if (!completedWorkouts.includes(today)) {
      completedWorkouts.push(today)
      localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts))
    }
    
    navigate(`/treino/${nextWorkout}`)
  }

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="page-container">
        
        <div className="flex items-center gap-3">
          <div className="page-header">
            <h1 className="page-title">TREINOS</h1>
          </div>
          <ThemeToggle />
        </div>

        <button
          onClick={handleStartWorkout}
          className="btn btn-lg w-full h-32 card-box hover:bg-base-300"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold">INICIAR TREINO</span>
            <span className="text-lg opacity-70">Hoje treino {nextWorkout}</span>
          </div>
        </button>

        {/* Modo Dev */}
        <section className="form-control fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
          <label className="label cursor-pointer justify-start gap-3 card-box px-3 py-2">
            <input
              type="checkbox"
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="label-text text-xs font-semibold">Modo Dev (múltiplos treinos/dia)</span>
          </label>
        </section>

        {/* Calendário Mensal */}
        <Calendar />
      </div>
    </motion.section>
  )
}
