import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Calendar from '../components/Calendar'
import ThemeToggle from '../components/ThemeToggle'

export default function HomePage() {
  const navigate = useNavigate()
  const [nextWorkout, setNextWorkout] = useState<'A' | 'B'>('A')
  const [devMode, setDevMode] = useState(false)

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
    <section className="min-h-screen bg-base-200 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">
        
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-base-100 border-2 border-base-content rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold tracking-wider">TREINOS</h1>
          </div>
          <ThemeToggle />
        </div>

        <button
          onClick={handleStartWorkout}
          className="btn btn-lg w-full h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold">INICIAR TREINO</span>
            <span className="text-lg opacity-70">Hoje treino {nextWorkout}</span>
          </div>
        </button>

        {/* Modo Dev */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3 bg-base-100 border-2 border-base-content rounded-lg px-4">
            <input
              type="checkbox"
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span className="label-text font-semibold">Modo Dev (permitir múltiplos treinos/dia)</span>
          </label>
        </div>

        {/* Calendário Mensal */}
        <Calendar />
      </div>
    </section>
  )
}
