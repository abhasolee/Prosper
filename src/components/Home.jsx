import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"
import { auth } from "../utils/firebase";
import Navbar from "./Navbar";
import ToDoList from "./ToDoList";
import Pomodoro from "./Pomodoro";
import Journal from "./Journal";
import Meditate from "./Meditate";

import { CiBoxList } from "react-icons/ci";
import { GiTomato, GiMeditation } from "react-icons/gi";
import { IoIosJournal } from "react-icons/io";

import { fadeIn } from "../utils/motion";
import { motion } from "framer-motion";

const Home = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [time, setTimeMain] = useState("");
    const [greeting, setGreetingMain] = useState("");

    const home= useRef();
    const todoList = useRef();
    const pomodoro = useRef();
    const journal = useRef();
    const meditate = useRef();

     //Getting the current time
    setInterval(()=>{let today = new Date()
        let timeMain = ((today.getHours() % 12) == 0 ? 12 : today.getHours() % 12) + ":" + ((today.getMinutes() <=9) ? ("0" + today.getMinutes()): today.getMinutes());
        setTimeMain(timeMain);
        let greetingMain = (today.getHours()>=12) ? "Good Evening," : "Good Morning,";
        setGreetingMain(greetingMain);
    },1000);
    
    //Getting the current user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(prev=>({...prev, ...user}));
            } else {
              console.log('no user');
            }
          });
    
    
    }, [])

    //Scrolling to the section when button is clicked
    const scrollSection = (ref)=>{
        window.scrollTo({
            //Height of the fixed navbar is 64px 
            top: ref.current.offsetTop-64,
            behavior: "smooth",
        });
    }

    

  return (
    <div className="h-screen w-screen text-white">
        <Navbar url={user.photoURL} home={home} todoList={todoList} pomodoro={pomodoro} journal={journal} meditate={meditate} scrollSection={scrollSection}/>

        {/*Landing Page After Login Section */}
        <motion.section ref={home} className="relative bg-hero-bg bg-cover bg-no-repeat bg-center w-full h-full flex flex-col md:items-center md:pb-10">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <motion.div variants={fadeIn} custom={"down"} initial="hidden" animate="show" className="z-10 w-full h-1/2 flex flex-col gap-5 items-center justify-center mt-8 sm:h-3/4">
                <h1 className="text-7xl tracking-wide md:text-8xl xl:text-9xl">{time}</h1>
                <h2 className="text-2xl md:text-3xl text-center">{greeting} <br /> <span className="mt-4 text-4xl md:text-5xl font-semibold xl:text-6xl">{user.displayName}</span></h2>
            </motion.div>

            <motion.div variants={fadeIn} custom={"up"} initial="hidden" animate="show" className="z-10 bg-slate-500 w-full h-1/2 rounded-t-3xl py-5 px-5 flex flex-col sm:justify-center md:h-24 md:w-3/4 md:rounded-2xl lg:w-2/3 xl:w-1/2">
                <h1 className="text-center text-2xl mb-5 sm:mb-10 md:hidden">Your Plans for Today?</h1>
                <div className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8 sm:gap-x-12 md:gap-x-5 xl:gap-x-10">
                    <div className="flex flex-col gap-2 min-w-28 justify-center items-center md:gap-0">
                        <motion.div initial={{rotate:0}} whileHover={{
                            rotate:360,
                            transition: {duration:1, type:"spring"}
                        }} 
                            className="w-16 h-16 bg-slate-100 rounded-full cursor-pointer flex justify-center items-center md:w-12 md:h-12"
                            onClick={()=>scrollSection(todoList)}>
                            <CiBoxList size={"3rem"} color="#0f172a" className="md:p-1.5"/>
                        </motion.div>
                        <h3 className="text-lg"> To Do List</h3>
                    </div>
                    <div className="flex flex-col gap-2 min-w-28 justify-center items-center md:gap-0">
                        <motion.div initial={{rotate:0}} whileHover={{
                            rotate:360,
                            transition: {duration:1, type:"spring"}
                        }} className="w-16 h-16 bg-slate-100 rounded-full cursor-pointer flex justify-center items-center md:w-12 md:h-12"
                        onClick={()=>scrollSection(pomodoro)}
                        >
                            <GiTomato size={"3rem"} color="#0f172a" className="md:p-1.5" />
                        </motion.div>
                        <h3 className="text-lg">Pomodoro</h3>
                    </div>
                    <div className="flex flex-col gap-2 min-w-28 justify-center items-center md:gap-0">
                        <motion.div initial={{rotate:0}} whileHover={{
                            rotate:360,
                            transition: {duration:1, type:"spring"}
                        }} className="w-16 h-16 bg-slate-100 rounded-full cursor-pointer flex justify-center items-center md:w-12 md:h-12"
                        onClick={()=>scrollSection(journal)}>
                            <IoIosJournal size={"3rem"} color="#0f172a" className="md:p-1.5" />
                        </motion.div>
                        <h3 className="text-lg"> Journal</h3>
                    </div>
                    <div className="flex flex-col gap-2 min-w-28 justify-center items-center md:gap-0">
                        <motion.div initial={{rotate:0}} whileHover={{
                            rotate:360,
                            transition: {duration:1, type:"spring"}
                        }} className="w-16 h-16 bg-slate-100 rounded-full cursor-pointer flex justify-center items-center md:w-12 md:h-12">
                            <GiMeditation onClick={()=>scrollSection(meditate)} size={"3rem"} color="#0f172a" className="md:p-1.5" />
                        </motion.div>
                        <h3 className="text-lg">Meditate</h3>
                    </div>
                    
                    
                </div>
            </motion.div>
            </motion.section>

            {/*The To Do List Section */}
            <section className="w-full h-full bg-slate-500 text-white" ref={todoList}>
                <ToDoList id={user.uid}/>
            </section>

            {/* Pomodoro Timer Section */}
            <section className="w-full h-full bg-slate-500 text-white" ref={pomodoro}>
                <Pomodoro/>
            </section>

            {/* Journal Section */}
            <section className="w-full h-full bg-slate-500 text-white" ref={journal}>
                <Journal id={user.uid}/>
            </section>

            {/*Gym Section */}
            <section className="w-full h-full bg-slate-500 text-white" ref={meditate}>
                <Meditate />
            </section>
            
        
    </div>
  )
}

export default Home