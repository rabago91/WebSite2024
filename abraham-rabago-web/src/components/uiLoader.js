import { useRef, useEffect } from "react";
// import {loadingContext} from '../App'
import Lottie from "lottie-react";
import loadinganimation from "./LottieAnimations/bulbanimation.json";

const LoaderUi = ({ setIsAnimationCompleted }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    // setIsAnimationCompleted(true)
    // console.log("lottieRef.current", lottieRef.current);
    // var animationFramesNumber = lottieRef.current.getDuration(true);
    // console.log("animationFramesNumber", animationFramesNumber);
    // lottieRef.current.setDirection(-1)

    // -----------circle indicator
    // lottieRef.current.goToAndStop(5, true);
    // // lottieRef.current.pause();
    // const timerPlay = setTimeout(() => {
    //   lottieRef.current.play();
    // }, 1000);
    // const timerDestroy = setTimeout(() => {
    //   lottieRef.current.destroy();
    //   setIsAnimationCompleted(true);
    // }, 2500);

    // -----------donut indicator
    // lottieRef.current.goToAndStop(5, true);
    // lottieRef.current.pause();
    // const timerPlay = setTimeout(() => {
    //   lottieRef.current.play();
    // }, 1000);
    const timerDestroy = setTimeout(() => {
      lottieRef.current.destroy();
      setIsAnimationCompleted(true);
    }, 2500);

    // -------------OnCompleteMethods
    //  lottieRef.onComplete = () => {
    //     // lottieRef.current.destroy()
    //     console.log('oncomplete')
    //   }

    return () => {
      // clearTimeout(timerPlay);
      // clearTimeout(timerDestroy);
    };
  }, [setIsAnimationCompleted]);

  return (
    <Lottie
      // options={defaultOptions}
      lottieRef={lottieRef}
      animationData={loadinganimation}
      // style={style}
      className="loader"
      // interactivity={interactivity}
      // ----------Gets and Sets
      // loadPercentage={loadPercentage}
      // isLoaded={isLoaded}
      // setIsAnimationCompleted={setIsAnimationCompletedTimeout(lottieRef.current)}
      // setIsAnimationCompleted={setIsAnimationCompletedTimeout()}
      // setIsAnimationCompleted={() => { return true }}
    />
  );
};

export default LoaderUi;