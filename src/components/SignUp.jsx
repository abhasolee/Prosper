import {GoGoal} from 'react-icons/go';
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import { useState } from 'react';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { shrink } from '../utils/motion';



const SignUp = () => {
    const navigate = useNavigate();

    //All States
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUser, setIsUser] = useState(false);

    const userName = fname + " " + lname;

    //Create the user with their given email and password
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //Update the profile of the user with the current userName
            updateProfile(auth.currentUser, {
                displayName: userName,
            })
            setIsUser(true);
            setTimeout(()=>{navigate('/home')}, 2000);
        }catch(error){
            console.log(error);
        }
    }
    

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center gap-5 items-center bg-slate-500 text-white">
        <motion.div animate={isUser ? {y:200} : {y:0}} 
        className='flex justify-center items-center gap-5'>
            <motion.div animate={{rotate:360}}
            transition={{type:"spring", duration:5, stiffness:50}}>{isUser ? <TiTick className="w-16 h-16" color="#90EE90" /> : <GoGoal className="w-16 h-16"/>}
        </motion.div>
            <motion.h1 initial={{y:-500}} animate={{y:0}} transition={{type:"spring", duration:5, stiffness:50}} className='text-2xl sm:text-4xl font-bold'>Welcome,  {isUser ? userName: "New Users!"}</motion.h1>
        </motion.div>
        
        <motion.form variants={shrink} animate={isUser ? 'shrink': 'grow'}
        className="relative xl:w-[1000px] lg:w-[800px] md:w-[550px] xl:px-14 lg:px-12 md:px-10 sm:w-[500px] w-[300px] px-5 py-10 border-white border-2 rounded-lg group" 
        noValidate
        onSubmit={handleSubmit}>
            <div onClick={()=> navigate("/")} className='shadow-md flex justify-center items-center absolute -top-5 -right-5 w-14 h-14 rounded-full bg-red-500 cursor-pointer hover:bg-red-600'>
                <ImCross size={"1.5rem"} />
            </div>
            <label className='font-semibold' htmlFor="fname">First Name:
            <input placeholder="Enter your name" required className="placeholder:text-gray-400 w-full mb-5 mt-2 rounded-md py-2 px-2 text-slate-900 focus:outline-none focus:border-slate-900 border-2 focus:shadow-md invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" type="text" name="fname" pattern='[A-Za-z]+'
            onChange={(e)=> setFname(e.target.value)} />
            <span className='hidden -mt-4 mb-5 text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>Please enter valid first name</span>
            </label>

            <label className='font-semibold' htmlFor="lname">Last Name:
            <input required placeholder="Enter your last name" className="placeholder:text-gray-400 w-full mb-5 mt-2 rounded-md py-2 px-2 text-slate-900 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" type="text" name="lname" pattern='[A-Za-z]+'
            onChange={(e)=> setLname(e.target.value)} />
            <span className='hidden -mt-4 mb-5 text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>Please enter valid last name</span>
            </label>

            <label className='font-semibold' htmlFor="email">Email:
            <input required placeholder="Enter your email" className="placeholder:text-gray-400 w-full mb-5 mt-2 rounded-md py-2 px-2 text-slate-900 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" type="email" name="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" 
            onChange={(e)=> setEmail(e.target.value)}/>
            <span className='hidden -mt-4 mb-5 text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>Please enter valid email address</span>
            </label>

            <label className='font-semibold' htmlFor="password">Password:
            <input required placeholder="Enter your password" className="placeholder:text-gray-400 w-full mb-5 mt-2 rounded-md py-2 px-2 text-slate-900  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" type="password" name="password" pattern=".{5,}" 
            onChange={(e)=> setPassword(e.target.value)}/>
            <span className='hidden -mt-4 mb-5 text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>Longer than 4 characters</span>
            </label>

            <button className='w-full mt-5 shadow-md px-2 py-2 bg-slate-700 text-white cursor-pointer rounded-full text-center hover:bg-slate-900 transition-all duration-100 ease-in-out group-invalid:pointer-events-none group-invalid:opacity-30' type="submit">Sign Up</button>

            {isUser && <p className='text-green-500 text-lg'>Congo!!!!!</p> }
        </motion.form>
    </div>
  )
}

export default SignUp