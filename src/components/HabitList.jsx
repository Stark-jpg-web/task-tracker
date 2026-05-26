import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function HabitList({ habits, onIncreaseStreak, onDeleteHabit, onTaskCompleted }) {

const percentage = 0;

function calculatePercentage(streak) {
  const percentage = (streak * 100) / 10;
  return <CircularProgressbar value={percentage} text={`${percentage}%`} />;
}


return (
  <div className={"habits-list flex flex-col gap-3 "}>
    {habits.map((habit) => (  
      <div 
        key={habit.id}  
          className={`habit flex flex-col gap-2.5 p-3 border-gray-500 border rounded-md ${habit.completed?"blur-sm":""}`}
        >
          <div className="flex flex-wrap gap-1">
            <h3 className="text-xl text-white">{habit.name}</h3>
            <span className="text-[#1ebd50] border-[#206736] border px-2 py-0.5 bg-[#206736] rounded-xl">
              {habit.category}
            </span>
          </div>
          
          <span className="text-gray-500 self-start">{habit.text}</span>
          
          <div>
            {calculatePercentage(habit.streak)}
          </div>
          
          <div className="list-controls flex gap-2 justify-center items-baseline">    
          <button onClick={() => onIncreaseStreak(habit.id)} className="text-white min-w-10.5 border-gray-500 border px-3 py-2 rounded-md hover:bg-gray-700 transition">
            ✓
          </button>
          <button onClick={() => onTaskCompleted(habit.id)} className="text-white border-gray-500 border px-3 py-2 rounded-md hover:bg-gray-700 transition">
              <span className="auto-delete material-symbols-outlined text-base">
                auto_delete
              </span> 
          </button>
          <button onClick={() => onDeleteHabit(habit.id)} className="text-white border-gray-500 border px-3 py-2 rounded-md hover:bg-gray-700 transition">
              <span className="auto-delete material-symbols-outlined text-base">
                delete_forever
              </span> 
          </button>
          </div>
        </div>
      ))}
    </div>
  )
}
