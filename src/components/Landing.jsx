import landingImg from '../assets/landing-page.jpeg';
import { motion } from 'framer-motion';
import { fadeIn, fadeHorizontal } from '../utils/motion';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

  return (
    <div className='h-screen w-screen flex flex-col gap-10 px-10 justify-center items-center'>
        {/* Landing Page Image */}
        <div className="relative min-h-[200px]">
            <motion.img variants={fadeIn} custom={"up"} initial="hidden" animate="show" src={landingImg} className="lg:w-[350px] lg:h-[350px] sm:w-[300px] sm:h-[300px] shadow-lg w-[250px] h-[250px] rounded-full object-cover" alt="landing-page" />
            <motion.div variants={fadeHorizontal} custom={-1} initial="hidden" animate="show" className="sm:w-[200px] absolute w-[175px] bg-slate-700 h-[50px] bottom-0 -right-5 z-2 rounded-full text-white flex justify-center items-center">
                <h3 className='text-center'>The Best App Ever!</h3>
            </motion.div>
            <motion.div variants={fadeHorizontal} custom={2} initial="hidden" animate="show" className="sm:w-[200px] absolute w-[175px] bg-slate-700 h-[50px] -top-2 -left-5 z-2 rounded-full text-white flex justify-center items-center">
                <h3 className='text-center'>5 Stars out of 5!</h3>
            </motion.div>
        </div>

        {/* Landing Page Text */}
        <div>
            <h1 className='xl:text-[50px] sm:text-[42px] text-[32px] text-center leading-small mb-3 text-slate-700 font-bold'>Be Productive <br className='sm:hidden'/>All Year Round!</h1>
            <p className='lg:text-lg lg:px-3 md:text-center md:text-md sm:px-8 font-light leading-6 align-left'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste cum in, a nihil tempora sequi eveniet tempore deleniti quidem. Velit.</p>
        </div>

        <div className='flex gap-5 lg:gap-10'>
            <button onClick={()=> navigate('/login')} className='sm:w-[200px] lg:w-[400px] shadow-md px-2 py-2 w-[125px] bg-slate-700 text-white cursor-pointer rounded-full text-center hover:bg-slate-900 transition-all duration-100 ease-in-out'>Log In</button>
            <button onClick={()=> navigate('/signin')} className='sm:w-[200px] lg:w-[400px] shadow-md px-2 py-2 w-[125px] bg-slate-700 text-white cursor-pointer rounded-full text-center hover:bg-slate-900 transition-all duration-100 ease-in-out'>Sign Up</button>
        </div>

    </div>
  )
}

export default Login