import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function HabitList({ habits, onIncreaseStreak, onDeleteHabit, onTaskCompleted }) {
  const STREAK_GOAL = 10 // Change this to your desired goal

  const calculatePercentage = (streak) => {
    return Math.min((streak / STREAK_GOAL) * 100, 100)
  }

  return (
    <div className="habits-list flex flex-col gap-3">
      {habits.map((habit) => {
        const percentage = calculatePercentage(habit.streak)
        
        return (
          <div
            key={habit.id}
            className={`habit flex flex-col gap-2.5 p-3 border-gray-500 border rounded-md ${
              habit.completed ? 'blur-sm' : ''
            }`}
          >
            {/* Header: Name and Category */}
            <div className="flex flex-wrap gap-2 items-center">
              <h3 className="text-xl text-white">{habit.name}</h3>
              <span className="text-[#1ebd50] border-[#206736] border px-2 py-0.5 bg-[#206736] rounded-xl text-sm">
                {habit.category}
              </span>
            </div>

            {/* Description */}
            <span className="text-gray-500 self-start text-sm">{habit.text}</span>

            {/* Circular Progress Bar */}
            <div className="w-24 h-24 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${habit.streak}/${STREAK_GOAL}`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: 'round',
                  textSize: '14px',
                  pathTransitionDuration: 0.5,
                  pathColor: habit.streak >= STREAK_GOAL ? '#10b981' : '#8b5cf6',
                  textColor: '#fff',
                  trailColor: '#374151',
                  backgroundColor: 'green',
                })}
              />
            </div>

            {/* Controls */}
            <div className="list-controls flex gap-2 justify-center items-center flex-wrap">
              <button
                onClick={() => onIncreaseStreak(habit.id)}
                className="text-white min-w-10 border-gray-500 border px-3 py-2 rounded-md hover:bg-gray-700 transition"
                title="Increase streak"
              >
                ✓
              </button>

              <button
                onClick={() => onTaskCompleted(habit.id)}
                className="text-white border-gray-500 border px-3 py-2 rounded-md hover:bg-gray-700 transition"
                title="Mark task completed"
              >
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
              </button>

              <button
                onClick={() => onDeleteHabit(habit.id)}
                className="text-white border-gray-500 border px-3 py-2 rounded-md hover:bg-red-700 transition"
                title="Delete habit"
              >
                <span className="material-symbols-outlined text-base">
                  delete_forever
                </span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}