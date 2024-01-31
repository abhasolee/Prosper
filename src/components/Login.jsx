import { useState } from "react"
import { TiTick } from "react-icons/ti";
import { GoGoal } from "react-icons/go";
import { ImCross } from "react-icons/im";
import { easeInOut, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { shrink } from "../utils/motion";

import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setInvalid] = useState(false);
    const [userName, setUserName] = useState("");

    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    //Function to handle login
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUserName(userCredential.user.displayName);
            setLoggedIn(true);
            setTimeout(()=>{navigate('/home')}, 2000);
        }catch(e){
            //Invalid login
            console.log(e.code);
            setInvalid(true);
            setTimeout(()=>{setInvalid(false)},2000);
        }
    }

    //Function to handle google login
    const handleGoogleLogin = async(e)=>{
        e.preventDefault();
        try{
            const result = await signInWithPopup(auth, provider);
            setLoggedIn(true);
            setTimeout(()=>{navigate('/home')}, 2000);
        }catch(e){
            console.log(e);
        }

    }

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-slate-500 text-white">

        <motion.div animate={loggedIn ? {y:200} : {y:0}} 
        className='flex justify-center items-center gap-5'>
            <motion.div animate={{rotate:360}} 
            transition={{type:"spring", duration:5, stiffness:50}}>{loggedIn ? <TiTick className="w-16 h-16" color="#90EE90" /> : <GoGoal className="w-16 h-16"/>}
        </motion.div>
            <motion.h1 initial={{y:-500}} animate={{y:0}} transition={{type:"spring", duration:5, stiffness:50}} className='text-2xl sm:text-4xl font-bold'>Welcome {loggedIn ? ", " + userName : "!"}</motion.h1>
        </motion.div>

        <motion.form variants={shrink} animate={loggedIn ? 'shrink': 'grow'} className="relative xl:w-[1000px] lg:w-[800px] md:w-[550px] xl:px-14 lg:px-12 md:px-10 sm:w-[500px] w-[300px] px-5 py-10 border-white border-2 rounded-lg">
            {/*Invalid login */}
            {isInvalid && <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{duration:2, type:"spring"}} className="text-center mb-5 bg-red-500 px-2 py-2 rounded-lg">Invalid username or password</motion.div>}
            <div onClick={()=> navigate("/")} className='shadow-md flex justify-center items-center absolute -top-5 -right-5 w-14 h-14 rounded-full bg-red-500 cursor-pointer hover:bg-red-600'>
                <ImCross size={"1.5rem"} />
            </div>
            <div>
                <label className="font-semibold" htmlFor="email">Email:</label>
                <input onChange={(e)=>setEmail(e.target.value)}className="w-full mb-5 mt-2 rounded-md py-2 px-2 text-slate-900" type="text" name="email" />
            </div>
            <div>
                <label className="font-semibold" htmlFor="password">Password:</label>
                <input onChange={(e)=>setPassword(e.target.value)}className="w-full mb-5 mt-2 rounded-md py-2 px-2 text-slate-900" type="password" name="password" />
            </div>            

            <button className='w-full mt-5 shadow-md px-2 py-2 bg-slate-700 text-white cursor-pointer rounded-full text-center hover:bg-slate-900 transition-all duration-100 ease-in-out' type="submit" onClick={handleLogin}>Log In</button>
            <button className='w-full mt-5 shadow-md px-2 py-2 bg-slate-700 text-white cursor-pointer rounded-full text-center hover:bg-slate-900 transition-all duration-100 ease-in-out flex justify-center items-center gap-5' type="submit" onClick={handleGoogleLogin}><FcGoogle className="w-6 h-6" /> Log In With Google</button>
            <p className="text-center mt-5">Don't have an account?</p>
            <button className='w-full mt-2 shadow-md px-2 py-2 bg-slate-700 text-white cursor-pointer rounded-full text-center hover:bg-slate-900 transition-all duration-100 ease-in-out' type="submit" onClick={()=>navigate("/signin")}>Sign Up</button>

        </motion.form>

        
    </div>
  )
}

export default Login