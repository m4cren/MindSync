import { useState, useEffect } from "react";



const useTime= (): {
 
    seconds: string;
    minute: string;
    hours: number;
    amPm: string;
    day: number;
    yearNow: number;
    monthNow: number;
} => {
   
    const [currentTime, setCurrentTime] = useState(new Date());

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setCurrentDate(new Date());
    

     
    }, []);

    useEffect(() => {
        const intervalTime = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalTime);
    }, []);

    const day = currentTime.getDay();

    const yearNow = currentDate.getFullYear();
    const monthNow = currentDate.getMonth() + 1;

    const hours = currentTime.getHours() % 12 || 12;
    const minute = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const amPm = currentTime.getHours() >= 12 ? "pm" : "am";

    return {  seconds, minute, hours, amPm, day, yearNow, monthNow };
};

export default useTime;