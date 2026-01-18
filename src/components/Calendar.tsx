import { useState } from 'react'

export default function Calendar() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedWorkout, setSelectedWorkout] = useState<'A' | 'B' | null>(null)

  // Nomes dos meses e dias da semana
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays = []
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const getWorkoutType = (day: number | null): 'A' | 'B' | null => {
    if (day === null) return null
    
    // Verificar se existe customização
    const dateStr = new Date(year, month, day).toDateString()
    const customWorkouts = JSON.parse(localStorage.getItem('customWorkouts') || '{}')
    
    if (customWorkouts[dateStr]) {
      return customWorkouts[dateStr]
    }
    
    return day % 2 === 1 ? 'A' : 'B'
  }

  // Verifica se o dia teve treino completado
  const isWorkoutCompleted = (day: number | null): boolean => {
    if (day === null) return false
    
    const dateStr = new Date(year, month, day).toDateString()
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]')
    return completedWorkouts.includes(dateStr)
  }

  const handleDayClick = (day: number | null) => {
    if (day === null) return
    setSelectedDay(day)
    setSelectedWorkout(getWorkoutType(day))
    const modal = document.getElementById('workout_modal') as HTMLDialogElement
    modal?.showModal()
  }

  const handleChangeWorkout = () => {
    if (selectedDay === null || selectedWorkout === null) return
    
    const newWorkout = selectedWorkout === 'A' ? 'B' : 'A'
    const dateStr = new Date(year, month, selectedDay).toDateString()
    
    // Salvar mudança no localStorage (criar estrutura de customWorkouts)
    const customWorkouts = JSON.parse(localStorage.getItem('customWorkouts') || '{}')
    customWorkouts[dateStr] = newWorkout
    localStorage.setItem('customWorkouts', JSON.stringify(customWorkouts))
    
    setSelectedWorkout(newWorkout)
  }

  const closeModal = () => {
    const modal = document.getElementById('workout_modal') as HTMLDialogElement
    modal?.close()
    setSelectedDay(null)
    setSelectedWorkout(null)
  }

  return (
    <>
      <div className="card-box p-3 text-center">
        <h2 className="text-sm font-bold tracking-wider">
          {monthNames[month].toUpperCase()} {year}
        </h2>
      </div>

      <div className="card-box p-4">
        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const workout = getWorkoutType(day)
            const isToday = day === today.getDate()
            const isCompleted = isWorkoutCompleted(day)

            return (
              <div
                key={index}
                onClick={() => handleDayClick(day)}
                className={`
                  calendar-day
                  ${day === null 
                    ? 'bg-transparent' 
                    : isCompleted
                      ? 'calendar-day-completed'
                      : 'calendar-day-active'
                  }
                  ${isToday ? 'ring-2 ring-primary' : ''}
                `}
                style={isCompleted ? { backgroundColor: '#56d364' } : {}}
              >
                {day !== null && (
                  <>
                    <span className={`text-xs ${isCompleted ? 'text-white' : ''}`}>{day}</span>
                    <span className={`
                      text-lg font-bold
                      ${isCompleted 
                        ? 'text-white' 
                        : workout === 'A' ? 'text-blue-500' : 'text-green-500'
                      }
                    `}>
                      {workout}
                    </span>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal DaisyUI */}
      <dialog id="workout_modal" className="modal">
        <div className="modal-box border-2 border-base-content">
          <h3 className="font-bold text-lg mb-4">
            Treino do dia {selectedDay}/{month + 1}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-base-200 p-4 rounded-lg text-center">
              <p className="text-sm opacity-70 mb-2">Tipo de treino atual:</p>
              <p className="text-4xl font-bold">
                Treino {selectedWorkout}
              </p>
              <p className="text-xs opacity-60 mt-1">
                {selectedWorkout === 'A' ? 'Membros Superiores' : 'Pernas e Core'}
              </p>
            </div>

            <button
              onClick={handleChangeWorkout}
              className="btn btn-primary w-full"
            >
              Trocar para Treino {selectedWorkout === 'A' ? 'B' : 'A'}
            </button>
          </div>

          <div className="modal-action">
            <button onClick={closeModal} className="btn">
              Fechar
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </>
  )
}
