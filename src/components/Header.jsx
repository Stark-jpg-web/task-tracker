import React from 'react'
import HabitList from './HabitList'
export default function Header() {


const [habits,setHabits]=React.useState([ ])


  //Get date 
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  let date = dd + '/' + mm + '/' + yyyy;




  //Form control
function getNewHabit(e){
  e.preventDefault();  
  const formData = new FormData(e.target);  // Extract FormData from the event
  const habitName = formData.get("new-habit-name");
  const habitText=formData.get("new-habit-text")
   if (habitName==="") {
    alert("Please enter a habit name");
    return;
  }
const newHabit= {
    id: Date.now(),  
    name: habitName,
    completed: false,
    streak: 0,
    text:habitText,
    category: "General"
}
setHabits([...habits,newHabit])
console.log(habits)
e.target.reset()
}

function increaseStreak(id) {
  const updatedHabits = habits.map((habit) => {
    if (habit.id === id) {
      return { ...habit, streak: habit.streak + 1};
    }
    return habit;
  });
  setHabits(updatedHabits);
}

function deleteHabit(id) {
  const updatedHabits = habits.filter((habit) => habit.id !== id);
  setHabits(updatedHabits);
}

function taskCompleted(id) {
  const updatedHabits = habits.map((habit) => {
    if (habit.id === id) {
      return { ...habit, completed: !habit.completed };
    }
    return habit;
  });
  setHabits(updatedHabits);
}


  return (
   <header className="flex flex-col gap-6 w-[95%] mx-auto  bg-[#141412] h-[100vh]">
  <div className="header-text p-3">
    <h1 className="text-2xl text-white text-gray-900">Daily Habbit Tracker</h1>
    <span className="text-gray-500">Be in the loop.</span>
  </div>
  <div className="habit-control bg-[#30302e] p-3 border-gray-500 border w-[90%] mx-auto rounded-md flex flex-col gap-3 ">
    <div className="p-0 m-0">
    <h3 className="text-white text-xl">Your Habbits</h3>
    <span className="text-gray-500">{date}</span>
    </div>
    <form onSubmit={getNewHabit} className="flex flex-col">
    <label htmlFor="new-habit-name" className="text-sm">Habit Name</label>
    <input type="text" name="new-habit-name" id="new-habit" placeholder="eg: train" className="border-gray-500 border px-3 py-2 rounded-md mb-5"  />
    <label htmlFor="new-habit-text" className="text-sm">Habit text</label>
    <input type="text" name="new-habit-text" id="new-habit" placeholder="eg: 5km jog before breakfast" className="border-gray-500 border px-3 py-2 rounded-md mb-5"  />
    <button className="text-white border-gray-500 border px-3 py-2 rounded-md hover:cursor-grab">+ Add habit</button>
    </form>
  </div>

  <div className="habits text-white p-3  w-[90%] mx-auto rounded-md flex flex-col gap-5">
   <HabitList 
     habits={habits}
     onIncreaseStreak={increaseStreak}
     onDeleteHabit={deleteHabit}
     onTaskCompleted={taskCompleted}
   />
  </div>
</header >

  )
}
