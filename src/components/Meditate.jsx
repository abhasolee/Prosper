import { useState, useRef} from "react";
import { FaChevronCircleRight, FaChevronCircleLeft, FaPlay } from "react-icons/fa";
import rain from '../assets/rain.jpeg';
import piano from '../assets/piano.jpeg';
import ocean from '../assets/ocean.jpeg';
import jungle from '../assets/jungle.jpeg';
import flowy from '../assets/flowy.jpeg';
import cricket from '../assets/cricket.jpeg';

import rainSound from '../assets/rainSound.wav'
import cricketSound from '../assets/cricketSound.wav'
import jungleSound from '../assets/jungleSound.wav'
import oceanSound from '../assets/oceanSound.flac'
import pianoSound from '../assets/pianoSound.wav'
import flowySound from '../assets/flowySound.wav'


import { motion } from "framer-motion";

const Meditate = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState(rainSound);
    const [audioTitle, setAudioTitle] = useState('Rain Tunes');
    const scrollDiv = useRef(null);
    const audioRef = useRef(null);

    //Function to scroll the music container
    const scroll = (offsetWidth)=>{
        scrollDiv.current.scrollLeft += offsetWidth;
    }

    //Function to play the music
    const playMusic = (e)=>{
        setAudioSrc(e.target.id);
        setAudioTitle(e.target.alt + ' Tunes');
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(false);
        }else{
            audioRef.current.play();
            setIsPlaying(true);
        }  
    }

    //Function to play pause according to the button
    const playPause = ()=>{
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(false);
        }else{
            audioRef.current.play();
            setIsPlaying(true);
        }  
    }

  return (
    <div className='w-full h-full pt-10 px-5 md:px-10 lg:px-20'>
        <h1 className='mb-6 lg:mb-15 text-center text-3xl font-semibold md:text-5xl'>Heal Your Soul</h1>
        <h2 className="text-center text-xl mb-5 font-light">Choose Your Music</h2>
        <div ref={scrollDiv} className="h-28 relative mx-auto rounded-lg flex gap-10 overflow-x-scroll mb-4 w-full scroll-smooth snap-x no-scrollbar sm:gap-20 lg:gap-32 md:w-3/4">
            <div onClick={playMusic} className="min-w-16 h-full rounded-full cursor-pointer flex flex-col items-center"><img className="w-full h-16 rounded-full object-cover" src={rain} id={rainSound} alt="Rain"/>Rain</div>
            <div onClick={playMusic} className="min-w-16 h-full rounded-full cursor-pointer flex flex-col items-center"><img className="w-full h-16 rounded-full object-cover" src={jungle} id={jungleSound} alt="Jungle"/>Jungle</div>
            <div onClick={playMusic} className="min-w-16 h-full rounded-full cursor-pointer flex flex-col items-center"><img className="w-full h-16 rounded-full object-cover" src={ocean} id={oceanSound} alt="Ocean" />Ocean</div>
            <div onClick={playMusic} className="min-w-16 h-full rounded-full cursor-pointer flex flex-col items-center"><img className="w-full h-16 rounded-full object-cover" src={piano} id={pianoSound} alt="Piano" />Piano</div>
            <div onClick={playMusic} className="min-w-16 h-full rounded-full cursor-pointer flex flex-col items-center"><img className="w-full h-16 rounded-full object-cover" src={cricket} id={cricketSound} alt="Cricket" />Cricket</div>
            <div onClick={playMusic} className="min-w-16 h-full rounded-full cursor-pointer flex flex-col items-center"><img className="w-full h-16 rounded-full object-cover" src={flowy} id={flowySound} alt="Flowy" />Flowy</div>
        </div>
        <div className="flex gap-4 mx-auto w-20">
                <button><FaChevronCircleLeft size={"2rem"} onClick={()=>scroll(-80)} className="cursor-pointer hover:scale-110" /></button>
                <button><FaChevronCircleRight size={"2rem"} onClick={()=>scroll(80)} className="cursor-pointer hover:scale-110"/></button>
        </div>

        <div onClick={playPause} className="flex items-center w-[250px] justify-center relative h-[250px] text-center cursor-pointer hover:scale-110 mx-auto">
            <FaPlay size={"3rem"}/>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:0, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-20 h-20 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:1, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-24 h-24 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:2, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-28 h-28 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:3, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-32 h-32 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:4, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-36 h-36 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:5, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-40 h-40 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:6, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-44 h-44 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:7, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-48 h-48 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:7, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-52 h-52 rounded-full border-slate-200 border-2"></motion.div>
            <motion.div initial={{scale:0}} animate={isPlaying? {scale:1}: {scale:0}} transition={isPlaying? {type:"spring", delay:7, repeat:Infinity, repeatType:"reverse"}: {}} className="absolute w-56 h-56 rounded-full border-slate-200 border-2"></motion.div>
        </div>
        <h1 className="text-center text-xl font-light md:text-2xl md:mt-2"><span className="font-light">{isPlaying? "Playing: " : "No Tunes Playing"}</span>{isPlaying ? audioTitle : ""}</h1>
        <audio src={audioSrc}  ref={audioRef} loop/>
        
    </div>
  )
}

export default Meditate