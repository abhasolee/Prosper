import { GoGoal } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png"

import { AnimatePresence, motion } from "framer-motion";
import { slideIn } from "../utils/motion";

import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Navbar = ({url, home, todoList, pomodoro, journal, meditate, scrollSection}) => {
    const [navOpen, setNavOpen] = useState(false);
    const [logOut, setLogOut] = useState(false);   
    const navigate= useNavigate(); 
    

    //Log Out Functionality
    const handleLogOut = async()=>{
        signOut(auth).then(() => {
            navigate('/');
          }).catch((error) => {
            console.log(error);
          });  
    }
    

  return (
    <nav className="h-16 fixed top-0 w-full z-20">
        <div className="relative w-full bg-slate-700 flex md:px-16 px-5 py-2 md:py-3 items-center justify-between">
            <div onClick={()=>scrollSection(home)} className="flex items-center justify-center flex-1 md:flex-none cursor-pointer">
                    <GoGoal size={"3rem"} />
            </div>

            {/*The Mobile Menu Button */}
            <RxHamburgerMenu className="cursor-pointer hover:text-slate-400 lg:hidden transition-all duration-100 ease-in-out" size={"2rem"} onClick={()=> setNavOpen(!navOpen)}/>
            <AnimatePresence>
                {navOpen && <motion.ul initial={{opacity:0, x:100}} animate={{opacity:1, x:0}} transition={{type:"spring", duration:2}} exit={{opacity:0, x:100}} className="sm:w-[350px] absolute right-0 top-0 h-screen bg-slate-700 w-[200px] flex flex-col items-center py-10 px-2 justify-evenly text-lg">
                    <ImCross className="cursor-pointer absolute top-0 right-0 mt-5 mr-5 hover:text-slate-400 transition-all duration-100 ease-in-out" onClick={()=>setNavOpen(!navOpen)}/>
                    <motion.img initial="rest" animate="slide" custom={1} variants={slideIn} src={url ? url : avatar} alt="Photo URL" className="w-16 h-16 rounded-full" />
                    <motion.li onClick={()=>scrollSection(home)} initial="rest" animate="slide" custom={2} variants={slideIn} className="hover:text-slate-200 cursor-pointer">Home</motion.li>
                    <motion.li onClick={()=>scrollSection(todoList)} initial="rest" animate="slide" custom={3} variants={slideIn} className="hover:text-slate-200 cursor-pointer">To Do List</motion.li>
                    <motion.li onClick={()=>scrollSection(pomodoro)} initial="rest" animate="slide" custom={4} variants={slideIn} className="hover:text-slate-200 cursor-pointer">Pomodoro</motion.li>
                    <motion.li onClick={()=>scrollSection(journal)} initial="rest" animate="slide" custom={5} variants={slideIn} className="hover:text-slate-200 cursor-pointer">Journal</motion.li>
                    <motion.li onClick={()=>scrollSection(meditate)} initial="rest" animate="slide" custom={6} variants={slideIn} className="hover:text-slate-200 cursor-pointer">Meditate</motion.li>
                    <motion.li onClick={handleLogOut} initial="rest" animate="slide" custom={7} variants={slideIn} className="w-[100px] shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out">Log Out</motion.li>
                </motion.ul>}
            </AnimatePresence>

            {/*Navbar for larger screens */}
            <ul className="hidden lg:flex justify-end items-center gap-10 lg:gap-16 w-3/4">
                <li onClick={()=>scrollSection(home)} className="cursor-pointer hover:text-slate-200 font-light">Home</li>
                <li onClick={()=>scrollSection(todoList)} className="cursor-pointer hover:text-slate-200 font-light">To Do List</li>
                <li onClick={()=>scrollSection(pomodoro)} className="cursor-pointer hover:text-slate-200 font-light">Pomodoro</li>
                <li onClick={()=>scrollSection(journal)} className="cursor-pointer hover:text-slate- font-light">Journal</li>
                <li onClick={()=>scrollSection(meditate)} className="cursor-pointer hover:text-slate-200 font-light">Meditate</li>
                <li className="relative">
                <img src={url ? url : avatar} alt="Photo URL" className="cursor-pointer w-10 h-10 rounded-full" onClick={()=>setLogOut(!logOut)} />
                {logOut && <motion.button onClick={handleLogOut} initial={{opacity:0, top:-50}} animate={{opacity:1, top:0}} transition={{type:"spring", duration:1}} className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] mt-12 shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out">Log out</motion.button>}
                </li>
               

            </ul>
        </div>
    

    </nav>

  )
}

export default Navbar