interface WorkoutDetailPageProps {
  workout: 'A' | 'B'
  onBack: () => void
}

export default function WorkoutDetailPage({ workout, onBack }: WorkoutDetailPageProps) {
  console.log('workout selecionado:', workout, onBack)
  return (
    <section className="min-h-screen bg-base-200 p-4 pb-20">
    </section>
  )
}
