import { useNavigate } from 'react-router-dom'
import Calendar from '../components/Calendar'
import ThemeToggle from '../components/ThemeToggle'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen bg-base-200 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">
        
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-base-100 border-2 border-base-content rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold tracking-wider">TREINOS</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/treino/A')}
            className="btn btn-lg h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg"
          >
            <span className="text-xl font-bold">TREINO A</span>
          </button>
          <button
            onClick={() => navigate('/treino/B')}
            className="btn btn-lg h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg"
          >
            <span className="text-xl font-bold">TREINO B</span>
          </button>
        </div>
        {/* Calendário Mensal */}
        <Calendar />
      </div>
    </section>
  )
}
