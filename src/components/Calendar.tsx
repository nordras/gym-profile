export default function Calendar() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

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
    return day % 2 === 1 ? 'A' : 'B'
  }

  // Verifica se o dia teve treino completado
  const isWorkoutCompleted = (day: number | null): boolean => {
    if (day === null) return false
    
    const dateStr = new Date(year, month, day).toDateString()
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]')
    return completedWorkouts.includes(dateStr)
  }

  return (
    <>
      <div className="bg-base-100 border-2 border-base-content rounded-lg p-3 text-center">
        <h2 className="text-sm font-bold tracking-wider">
          {monthNames[month].toUpperCase()} {year}
        </h2>
      </div>

      <div className="bg-base-100 border-2 border-base-content rounded-lg p-4">
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
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center
                  text-sm font-semibold transition-all
                  ${day === null 
                    ? 'bg-transparent' 
                    : isCompleted
                      ? 'cursor-pointer border-2 border-base-content'
                      : 'bg-base-200 hover:bg-base-300 cursor-pointer border-2 border-base-content'
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
    </>
  )
}
