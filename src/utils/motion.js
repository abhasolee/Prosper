export const fadeIn ={
    hidden : (direction) => ({opacity:0, 
        y:(direction=="down"? -500: 500)}),
    show: {
        opacity:1,
        y:0,
        transition:{
            type: 'spring',
            duration: 2,
        }
    }
}

export const fadeHorizontal = {
    hidden: (index)=>( {opacity: 0, rotate:360, x:(index < 0?-500: 500), scale:0}),
    show: (index) => ({
        opacity:1,
        x:0,
        rotate:0,
        scale:1,
        transition: {
            type: 'spring',
            duration: 2,
            delay: 0.5*Math.abs(index),
        }
    })
}

export const shrink = {
    grow: {
        opacity:1,
        scale:1,
    },
    shrink:{
        opacity:0,
        scale:0,
        transition:{
            type: 'spring',
            duration: 2,
        }
    }
}

export const slideIn = {
    rest: {
        opacity:0,
        y:10,
        x:100,
    },
    slide: (index)=>({
        opacity:1,
        y:0,
        x:0,
        transition:{
            type: "spring",
            duration:1,
            delay:index*0.1,
        }
    })
}

