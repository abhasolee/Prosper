import { useState, useEffect } from "react";
import { IoAddCircleOutline, IoTrashBin, IoCheckmarkCircle } from "react-icons/io5";
import { PiConfettiBold } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

import { db } from "../utils/firebase";
import { collection, getDoc, setDoc, updateDoc, doc, arrayRemove, deleteDoc } from "firebase/firestore";


const ToDoList = ({id}) => {
    //States
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [noTask, setNoTask] = useState(false);


    //Function to add tasks to a list
    const addTask = async(e)=>{
        if (task == ""){
            setNoTask(true);
        }else{
            setNoTask(false);
            setTasks([...tasks, task]);
            //Push the task to the database
            await setDoc(doc(db, "tasks", id), {
                task: [...tasks, task],
            });    
            setTask('');          
        }
    }

    //Function to delete the task 
    const deleteTask = async(e)=>{
        //Delete from database
        let dataToRemove = e.target.id;
        const taskRef = await doc(db, "tasks", id);
        if (dataToRemove !== null) {
            await updateDoc(taskRef, {
                task: arrayRemove(dataToRemove)
            });
            //Delete from local state
            setTasks((prev) => prev.filter(item => item !== dataToRemove));
        }
    }

    //Function to delete all tasks
    const deleteAllTasks = async() =>{
        await deleteDoc(doc(db, 'tasks', id));
        //Delete from local state
        setTasks([]);
    }
    
    //Get thet tasks from the firebase database
    useEffect(()=>{
        try{
            const getTasks = async()=> {
                const taskRef = await getDoc(doc(db, "tasks", id));
                if (taskRef.exists()){
                    setTasks(taskRef.data().task)
                }
            }
            getTasks();
        }catch(e){
            console.log(error)
        } 
    }, [id, tasks]);

   

  return (
    <div className="pt-16 w-full h-full">
        <div className="flex flex-col items-center justify-center gap-5 w-full mb-10">
            <h1 className="text-center text-4xl">Your Next Task?</h1>
            <div className="relative w-full px-5 sm:px-10 lg:px-16 xl:px-24">
                <input type="text" placeholder="Enter your task" className="py-2 px-5 rounded-lg w-full text-slate-950 focus:outline-none" value={task} onChange={(e)=>setTask(e.target.value)}/>
                <button className="absolute bg-slate-800 top-0 right-4 sm:right-10 lg:right-18 xl:right-24 cursor-pointer h-full w-28 rounded-r-lg px-5 shadow-lg hover:bg-slate-950" onClick={addTask}>Add Task</button>
            </div>
            {noTask && <p className="text-red-500 font-light text-lg">No Task Entered!</p>}
        </div>

        
         <div className="flex flex-col justify-center items-center gap-5 min-h-40">
            <AnimatePresence>
            {tasks.map((list, index)=> (
            <motion.div initial={{opacity:0, x:-100, rotate:-45}} animate={{opacity:1, x:0, rotate:0}} exit={{opacity:0, rotate:45, x:100}} transition={{type:"spring", duration:1}} key={index} className="flex px-5 justify-between items-center w-3/4 lg:w-1/2 h-12 bg-white rounded-xl text-slate-950 shadow-xl capitalize">
                <h2 className="text-lg font-semibold w-4/5 text-center">{list}</h2>   
                <div id={list} className="cursor-pointer hover:scale-110" onClick={deleteTask}>
                        <IoCheckmarkCircle color="#0f172a" size={"2.5rem"} className="pointer-events-none"  />
                </div>
            </motion.div>
            ))}
            </AnimatePresence>
            {tasks.length == 0 && <h1 className="text-2xl">Enjoy Your Free Day<PiConfettiBold className="ml-2 inline"/></h1>}
            {tasks.length > 0 && <motion.button initial={{opacity:0, rotate:45, y:100}} animate={{opacity:1, rotate:0, y:0}} transition={{type:"spring", duration:1, delay:0.5}} onClick={deleteAllTasks} className="font-semibold w-[140px] mt-12 shadow-md px-2 py-2 bg-slate-50 text-slate-950 cursor-pointer rounded-lg text-center hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-center gap-2"><IoTrashBin size={"1.5rem"} color="#0f172a"/>Delete All</motion.button>}
        </div> 
    </div>
  )
}

export default ToDoList