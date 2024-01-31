import { useState, useEffect } from "react";
import { FaPlay, FaPause} from "react-icons/fa"
import { GrPowerReset } from "react-icons/gr";
import { RiFocus3Fill } from "react-icons/ri";
import { PiConfettiBold } from "react-icons/pi";
import { GiTomato } from "react-icons/gi";

import { motion } from "framer-motion";

const Pomodoro = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    //Need it for the pomodoro animation
    const length = window.innerWidth -100 ;
    

    //Function to start the pomodoro timer
    const startTimer = () => {
        if (!isActive) setIsActive(true);
    }

    useEffect(() => {
        let timer;
      if (isActive){
        timer = setInterval(()=>{
            if (seconds > 0){
                setSeconds(prev=> prev-1);
            }else{
                if (minutes === 0){
                    clearInterval(timer);
                    setIsActive(false);
                }else{
                    setMinutes(prev=> prev-1);
                    setSeconds(59); 
                }
            }
        }, 1000);
      }
    
      return () => {
        clearInterval(timer);
      }
    }, [isActive, minutes,seconds])

    //Function to stop timer
    const stopTimer = ()=>{
        setIsActive(false);
    }

    //Function to reset timer
    const resetTimer = ()=>{
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    }
    

  return (
    <div className="relative w-full h-full pt-10 flex flex-col items-center gap-5 overflow-hidden">
        {/* Animating the pomodoro */}
        <div className="absolute top-1/3 w-full h-1 bg-slate-200 -z-5 px-5">
            <motion.div initial={{x:0}} animate={isActive ? {x:length}: {x:0}} transition={isActive ? {duration:2, type:"spring", repeatType:"reverse", repeat:Infinity } : {}} className="-mt-10 w-10">
                <GiTomato size={'2rem'}/>
            </motion.div>
        </div>
        <h1 className="text-4xl text-center font-semibold mb-5">Pomodoro Timer</h1>
        <div className="md:w-[300px] md:h-[300px] w-[250px] h-[250px] rounded-full bg-slate-700 border-slate-200 border-4 flex justify-center items-center shadow-xl z-10">
            <motion.h1 initial={{opacity:0, y:100}} whileInView={{opacity:1, y:0}} transition={{type:"spring", duration:1}} className="text-6xl">{minutes}:{(seconds< 10) ? `0${seconds}`: seconds}</motion.h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
            <button onClick={()=>!isActive ? setMinutes(25) : null} className="font-semibold w-[140px] shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-center gap-2"><RiFocus3Fill/> Focus Mode</button>
            <button onClick={()=>!isActive ? setMinutes(5): null} className="font-semibold w-[140px] shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-center gap-2"><PiConfettiBold/> Rest Mode</button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 sm:mt-5 md:mt-2">
            <button onClick={startTimer} className="font-semibold w-[140px] shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-center gap-2"><FaPlay /> Start</button>
            {isActive && <button onClick={stopTimer} className="font-semibold w-[140px] shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-center gap-2"><FaPause />Stop</button>}
            <button onClick={resetTimer} className="font-semibold w-[140px] shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-center gap-2"><GrPowerReset/>Reset</button>
        </div>
    </div>
  )
}

export default Pomodoro