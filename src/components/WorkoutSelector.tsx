export default function WorkoutSelector() {
  const handleSelectWorkout = (workout: 'A' | 'B') => {
    console.log(`Treino ${workout} selecionado`)
    // TODO: Implementar lógica de seleção de treino
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => handleSelectWorkout('A')}
        className="btn btn-lg h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg"
      >
        <span className="text-xl font-bold">TREINO A</span>
        <div>Upper body e core</div>
      </button>
      <button
        onClick={() => handleSelectWorkout('B')}
        className="btn btn-lg h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg"
      >
        <span className="text-xl font-bold">TREINO B</span>
        <div>Core e lower body</div>
      </button>
    </div>
  )
}
