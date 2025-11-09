import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface Event {
  id: string
  name: string
  date: Date
  type: 'hackathon' | 'workshop' | 'deadline' | 'winner-announcement'
  color: string
}

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Web3 Innovation Hackathon',
    date: new Date(2024, 10, 15),
    type: 'hackathon',
    color: 'bg-purple-500',
  },
  {
    id: '2',
    name: 'AI/ML Workshop',
    date: new Date(2024, 10, 18),
    type: 'workshop',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    name: 'Blockchain Summit Registration Deadline',
    date: new Date(2024, 10, 20),
    type: 'deadline',
    color: 'bg-red-500',
  },
  {
    id: '4',
    name: 'DeFi Hackathon Winner Announcement',
    date: new Date(2024, 10, 22),
    type: 'winner-announcement',
    color: 'bg-yellow-500',
  },
  {
    id: '5',
    name: 'Smart Contract Security Hackathon',
    date: new Date(2024, 10, 25),
    type: 'hackathon',
    color: 'bg-purple-500',
  },
  {
    id: '6',
    name: 'NFT Development Workshop',
    date: new Date(2024, 10, 28),
    type: 'workshop',
    color: 'bg-blue-500',
  },
  {
    id: '7',
    name: 'GameFi Hackathon',
    date: new Date(2024, 11, 5),
    type: 'hackathon',
    color: 'bg-purple-500',
  },
  {
    id: '8',
    name: 'Metaverse Project Deadline',
    date: new Date(2024, 11, 10),
    type: 'deadline',
    color: 'bg-red-500',
  },
]

const eventTypeLabels = {
  hackathon: 'Hackathon',
  workshop: 'Workshop',
  deadline: 'Deadline',
  'winner-announcement': 'Winner Announcement',
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const getEventsForDate = (day: number): Event[] => {
    return mockEvents.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    )
  }

  const isToday = (day: number): boolean => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    )
  }

  const getSelectedDateEvents = (): Event[] => {
    if (!selectedDate) return []
    return mockEvents.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          Event Calendar
        </h2>
        <Button onClick={goToToday} variant="outline">
          Today
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="p-6 lg:col-span-2">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button onClick={previousMonth} variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button onClick={nextMonth} variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1
              const events = getEventsForDate(day)
              const today = isToday(day)
              const selected = isSelected(day)

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDateClick(day)}
                  className={`
                    aspect-square p-2 rounded-lg cursor-pointer transition-all
                    ${today ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' : ''}
                    ${selected ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500' : ''}
                    ${!today && !selected ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : ''}
                  `}
                >
                  <div className="text-center text-sm mb-1">{day}</div>
                  <div className="flex flex-col gap-0.5">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`h-1 rounded-full ${event.color}`}
                        title={event.name}
                      />
                    ))}
                    {events.length > 2 && (
                      <div className="text-[10px] text-center text-gray-500">
                        +{events.length - 2}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm mb-3">
              <strong>Event Types:</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-purple-500 text-white">Hackathon</Badge>
              <Badge className="bg-blue-500 text-white">Workshop</Badge>
              <Badge className="bg-red-500 text-white">Deadline</Badge>
              <Badge className="bg-yellow-500 text-white">
                Winner Announcement
              </Badge>
            </div>
          </div>
        </Card>

        {/* Selected Date Events */}
        <Card className="p-6 lg:col-span-1">
          <h3 className="text-lg mb-4">
            {selectedDate
              ? `Events on ${selectedDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}`
              : 'Select a date'}
          </h3>

          <AnimatePresence mode="wait">
            {selectedDate && getSelectedDateEvents().length > 0 ? (
              <motion.div
                key={selectedDate.toISOString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {getSelectedDateEvents().map((event) => (
                  <Card
                    key={event.id}
                    className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full ${event.color}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{event.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {eventTypeLabels[event.type]}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            ) : selectedDate ? (
              <motion.div
                key="no-events"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 text-gray-500"
              >
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No events on this date</p>
              </motion.div>
            ) : (
              <motion.div
                key="select-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500"
              >
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Click on a date to view events</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upcoming Events */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm mb-3">
              <strong>Upcoming Events</strong>
            </h4>
            <div className="space-y-2">
              {mockEvents
                .filter((event) => event.date >= new Date())
                .slice(0, 3)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className={`w-2 h-2 rounded-full ${event.color}`} />
                    <span className="text-xs text-gray-500">
                      {event.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex-1 truncate">{event.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
