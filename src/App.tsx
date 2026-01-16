import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-base-200 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">

        <div className="bg-base-100 border-2 border-base-content rounded-lg p-4 text-center">
          <h1 className="text-lg font-bold tracking-wider">TREINOS</h1>
        </div>

        {/* Botões Treino A e Treino B */}
        <div className="grid grid-cols-2 gap-4">
          <button className="btn btn-lg h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg">
            <span className="text-xl font-bold">TREINO A</span>
          </button>
          <button className="btn btn-lg h-32 bg-base-100 border-2 border-base-content hover:bg-base-300 rounded-lg">
            <span className="text-xl font-bold">TREINO B</span>
          </button>
        </div>

        {/* Header Frequência e Semana */}
        <div className="bg-base-100 border-2 border-base-content rounded-lg p-3 text-center">
          <h2 className="text-sm font-bold tracking-wider">SEMANA</h2>
        </div>
      </div>
    </div>
  )
}

export default App
