import { Funnel, Menu, Plus } from "lucide-react";

const ToDoList = () => {
   return (
      <div className="relative flex flex-col gap-[1.3vw] w-[75%]">
         <div className="flex items-center justify-between">
            <h2 className="font-medium text-[1.5vw]">To-Do List</h2>
            <div className="flex items-center gap-[1vw]">
               <button className="">
                  <Funnel />
               </button>
               <button className="">
                  <Menu />
               </button>
            </div>
         </div>
         <hr className="border-[0.15vw] text-card " />
         <ul className="flex flex-col gap-[0.7vw] max-h-[35vw] pb-[12vw] overflow-y-scroll [mask-image:linear-gradient(to_top,transparent,black_69%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_69%)]">
            <li className="relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]">
               <h4 className="font-medium text-[1.25vw]">Refactor Cord</h4>
               <p className="text-[0.9vw] opacity-70">August 4, 2025</p>
               <span className="bg-red-600/20 py-[0.3vw] px-[1.2vw] font-medium text-[0.75vw] rounded-sm w-fit">
                  Work
               </span>
               <input
                  type="checkbox"
                  className="absolute bottom-[1vw] right-[1vw] size-[1.35vw]"
               />
            </li>
            <li className="relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]">
               <h4 className="font-medium text-[1.25vw]">Refactor Cord</h4>
               <p className="text-[0.9vw] opacity-70">August 4, 2025</p>
               <span className="bg-red-600/20 py-[0.3vw] px-[1.2vw] font-medium text-[0.75vw] rounded-sm w-fit">
                  Work
               </span>
               <input
                  type="checkbox"
                  className="absolute bottom-[1vw] right-[1vw] size-[1.35vw]"
               />
            </li>
            <li className="relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]">
               <h4 className="font-medium text-[1.25vw]">Refactor Cord</h4>
               <p className="text-[0.9vw] opacity-70">August 4, 2025</p>
               <span className="bg-red-600/20 py-[0.3vw] px-[1.2vw] font-medium text-[0.75vw] rounded-sm w-fit">
                  Work
               </span>
               <input
                  type="checkbox"
                  className="absolute bottom-[1vw] right-[1vw] size-[1.35vw]"
               />
            </li>
            <li className="relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]">
               <h4 className="font-medium text-[1.25vw]">Refactor Cord</h4>
               <p className="text-[0.9vw] opacity-70">August 4, 2025</p>
               <span className="bg-red-600/20 py-[0.3vw] px-[1.2vw] font-medium text-[0.75vw] rounded-sm w-fit">
                  Work
               </span>
               <input
                  type="checkbox"
                  className="absolute bottom-[1vw] right-[1vw] size-[1.35vw]"
               />
            </li>
            <li className="relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]">
               <h4 className="font-medium text-[1.25vw]">Refactor Cord</h4>
               <p className="text-[0.9vw] opacity-70">August 4, 2025</p>
               <span className="bg-red-600/20 py-[0.3vw] px-[1.2vw] font-medium text-[0.75vw] rounded-sm w-fit">
                  Work
               </span>
               <input
                  type="checkbox"
                  className="absolute bottom-[1vw] right-[1vw] size-[1.35vw]"
               />
            </li>
         </ul>
      </div>
   );
};

export default ToDoList;
