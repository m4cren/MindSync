import Calendar from "./component/Calendar/Calendar";
import Clock from "./component/Clock/Clock";
import HabitStreak from "./component/HabitStreak/HabitStreak";
import Quote from "./component/Quote";
import ToDoList from "./component/ToDoList/ToDoList";
import layout from "./styles/home_layout.module.css";

export default function Home() {
   return (
      <main className={`${layout.homeLayout} w-full`}>
         <div className={`${layout.clock} flex mx-auto pt-[3.5vw]`}>
            <Clock />
         </div>
         <div
            className={`${layout["to-do-list"]} flex justify-center pt-[6vw]`}
         >
            <ToDoList />
         </div>
         <div className={`${layout.calendar} px-[2vw] pt-[6vw]`}>
            <Calendar />
         </div>
         <div className={`${layout["habit-streak"]} flex justify-center`}>
            <HabitStreak />
         </div>
         <div
            className={`${layout.quote} flex items-center gap-[1vw] ml-[5vw]`}
         >
            <Quote />
         </div>
      </main>
   );
}
