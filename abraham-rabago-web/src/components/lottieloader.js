import {useRef, useEffect} from 'react'
import Lottie from "lottie-react";
import loadinganimation from "./loadinganimation.json";

// const style = {
//     height: 100,
//     color: "blue"

//   };

//   const defaultOptions = {
//     loop: false,
//     autoplay: false, 
//     // animationData: animationData,
//   };
  
//   const interactivity = {
//     mode: "scroll",
//     actions: [
//       {
//         visibility: [0, 0.2],
//         type: "stop",
//         frames: [0],
//       },
//       {
//         visibility: [0.2, 0.45],
//         type: "seek",
//         frames: [0, 45],
//       },
//       {
//         visibility: [0.45, 1.0],
//         type: "loop",
//         frames: [45, 60],
//       },
//     ],
//   };



//  -------------------------Exported Lottie Example
  
  const Example = () => {
    const lottieRef = useRef(null);

    useEffect(() => { 
        console.log('lottieRef.current', lottieRef.current);
        var animationFramesNumber = lottieRef.current.getDuration(true)
        console.log('animationFramesNumber', animationFramesNumber)
        // lottieRef.current.setDirection(-1)
        lottieRef.current.goToAndStop(20, true)
        // lottieRef.current.pause();
        const timer = setTimeout(() => { 
            lottieRef.current.play();
         }, 2000)


        // console.log('lottieRef', lottieRef)

        //  lottieRef.onComplete = () => { 
        //     // lottieRef.current.destroy()
        //     console.log('oncomplete')
        //   }

         return () => clearTimeout(timer);
    
     }, [])


    return (
      <Lottie
        // options={defaultOptions}
        lottieRef={lottieRef}
        animationData={loadinganimation}
        // style={style}
        className='loader'
        // interactivity={interactivity}
      />
    );
  };

export default Example;