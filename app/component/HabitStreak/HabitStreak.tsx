import { Flame } from "lucide-react";

const HabitStreak = () => {
   return (
      <div className="mt-[1.5vw] flex flex-col gap-[1.3vw] items-center bg-card rounded-[0.8vw] w-[26vw] h-[18vw] p-[2.5vw]">
         <div className="relative flex items-center justify-center border-4 border-flame rounded-full w-[7vw] h-[7vw] ">
            <span className="absolute top-0 p-[0.2vw] left-1/2 -translate-y-1/2 -translate-x-1/2 text-flame bg-card">
               <Flame />
            </span>
            <h3 className="text-[2.25vw] font-bold"> 4</h3>
         </div>
         <h3 className="text-flame! font-bold text-[1.45vw]  text-center">
            Current Habit Streak
         </h3>
         <p className="text-[0.9vw] opacity-60">Jun 3 - Jun 17</p>
      </div>
   );
};

export default HabitStreak;
