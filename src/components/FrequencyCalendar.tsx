export default function FrequencyCalendar() {
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

            return (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center
                  text-sm font-semibold transition-all
                  ${day === null 
                    ? 'bg-transparent' 
                    : 'bg-base-200 hover:bg-base-300 cursor-pointer border-2 border-base-content'
                  }
                  ${isToday ? 'ring-2 ring-primary' : ''}
                `}
              >
                {day !== null && (
                  <>
                    <span className="text-xs">{day}</span>
                    <span className={`
                      text-lg font-bold
                      ${workout === 'A' ? 'text-blue-500' : 'text-green-500'}
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
