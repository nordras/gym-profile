import WorkoutSelector from '../components/WorkoutSelector'
import FrequencyCalendar from '../components/FrequencyCalendar'

export default function WorkoutPage() {
  return (
    <div className="min-h-screen bg-base-200 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">
        <div className="bg-base-100 border-2 border-base-content rounded-lg p-4 text-center">
          <h1 className="text-lg font-bold tracking-wider">TREINOS</h1>
        </div>
        <WorkoutSelector />
        <FrequencyCalendar />
      </div>
    </div>
  )
}
