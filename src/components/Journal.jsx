import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import {collection, query, where, getDocs, updateDoc, setDoc, addDoc, deleteDoc, doc} from 'firebase/firestore';
import {v4 as uuid} from "uuid";

import { motion, AnimatePresence } from "framer-motion";

const Journal = ({id}) => {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [entries, setEntries] = useState([]);
    const [entryId, setEntryId] = useState(0);
    
    //Function to get all the entries of the user
    useEffect(() => {
        const getEntries = async()=>{
            const journalRef = collection(db, "journal");
            
            // Create a query to get the documents of the user
            const q = query(journalRef, where("userId", "==", id));
            const querySnapshot = await getDocs(q);
            const newEntries = [];
            querySnapshot.forEach((doc) => {
                newEntries.push(doc.data());
            }); 
             //Updating the state
             setEntries([...newEntries]); 
        }
        getEntries();
    }, [entryId])


    //Function to save the entries
    const saveEntries = async()=>{
        const journalRef = collection(db, "journal");
        const q = query(journalRef, where("id", "==", entryId));
        const querySnapshot = await getDocs(q);
        //For each document with that id update the data inside it
        querySnapshot.forEach(async(doc)=>{
            await updateDoc(doc.ref, {
                title: title,
                entry: entry,
            })
        }); 
        
        //Reset the entry id, title, and entry
        setEntryId(0);
        setTitle("");
        setEntry("");
    }

    //Function to add new entries
    const addEntries = async()=>{
        //Generate an unique id
        const unique_id = uuid().slice(0,8);
        await addDoc(collection(db, "journal"), {
            id: unique_id,
            title: "",
            entry: "",
            userId: id,
        });
        setEntryId(unique_id);
    }

    //Function to delete entries
    const deleteEntries = async()=>{
        const journalRef = collection(db, "journal");
        const q = query(journalRef, where("id", "==", entryId));
        const querySnapshot = await getDocs(q);
        //For each document with that id update the data inside it
        querySnapshot.forEach(async(entry)=>{
            await deleteDoc(doc(db, "journal", entry.id));
        }); 
        
        //Reset the entry id, title, and entry
        setEntryId(0);
        setTitle("");
        setEntry("");
    }


  return (
    <div className='w-full h-full pt-10 flex flex-col items-center gap-5'>
        <h1 className='text-3xl font-semibold'>Your Journal</h1>
        <div className='w-full h-3/4 px-5 flex text-black'>
            <div className='w-1/4 h-full bg-slate-100 border-r-slate-300 border-2 shadow-md rounded-l-lg flex items-center flex-col py-2'>
                <h2 className='mb-5 font-semibold'>Entries</h2>
                <div className='flex flex-col w-full h-full pb-5'>
                    <AnimatePresence>
                    {entries.map((entry, index)=>(
                        <motion.div initial={{opacity:0, rotate:45, y:-45}} animate={{opacity:1, rotate:0, y:0}} exit={{opacity:0, rotate:45, y:45}} transition={{type:"spring", duration:1}} key={index} className='w-full h-10 items-center flex justify-center bg-slate-200 cursor-pointer border-2 border-slate-100 hover:bg-slate-300 transition-all duration-100 ease-out' onClick={()=>{setEntry(entry.entry); 
                        setTitle(entry.title);
                        setEntryId(entry.id)}}>
                            <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{type:"spring", duration:1, delay:0.75}} className="truncate capitalize">{entry.title}</motion.h1>
                        </motion.div>
                    ))}   
                    </AnimatePresence>
                </div>
                <button onClick={addEntries} className="mt-auto font-semibold w-full shadow-md px-2 py-2 bg-slate-800 text-white cursor-pointer rounded-lg border-2 border-slate-100 text-center hover:bg-slate-950 transition-all duration-100 ease-in-out mb-2">Add</button>
                
            </div>
            <div className='w-3/4 h-full bg-white rounded-r-lg flex flex-col px-2'>
                <input value={title} type="text" name="title" placeholder='Enter your title here...' className='capitalize mt-5 focus:outline-none border-b-2 shadow-none border-slate-200 px-2 py-2 rounded-lg font-semibold placeholder:font-light' onChange={(e)=>setTitle(e.target.value)}/>
                <textarea value={entry} className='w-full h-4/5 mt-5 px-2 focus:outline-none rounded-r-lg placeholder:font-light' placeholder='Empty Your Thoughts Here...' onChange={(e)=>setEntry(e.target.value)}></textarea>
                <div className="flex w-3/4 gap-5 ml-auto sm:w-1/2 md:w-1/4">
                    <button onClick={saveEntries} className="ml-auto font-semibold w-[80px] shadow-md px-2 py-2 bg-slate-800 text-white cursor-pointer rounded-lg text-center hover:bg-slate-950 transition-all duration-100 ease-in-out mb-2">Save</button>
                    {entryId != 0 && <button onClick={deleteEntries} className="ml-auto font-semibold w-[80px] shadow-md px-2 py-2 bg-red-500 text-white cursor-pointer rounded-lg text-center hover:bg-red-700 transition-all duration-100 ease-in-out mb-2">Delete</button>}
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default Journal