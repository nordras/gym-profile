import { useParams, useNavigate } from 'react-router-dom'

export default function WorkoutPage() {
  const { workout } = useParams<{ workout: string }>()
  const navigate = useNavigate()

  return (
    <section className="min-h-screen bg-base-200 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="btn btn-circle btn-ghost border-2 border-base-content"
          >
            ←
          </button>
          <div className="flex-1 bg-base-100 border-2 border-base-content rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold tracking-wider">TREINO {workout}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
