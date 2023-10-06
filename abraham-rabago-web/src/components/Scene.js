import { useRef, useEffect } from "react";
import { cleanUpScene, mountScene } from "./Model";

const Scene = ({ isAnimationCompleted, setLoadValue }) => {
  const mountRef = useRef(null);
  const loadingValue = useRef(null);

  useEffect(() => {
    // console.log("(2)~~~~~~Render:Scene<---");

    // Init Scene
    mountScene(mountRef, isAnimationCompleted, setLoadValue);

    // Clean up scene
    return () => {
      cleanUpScene();
      // destroyGui();
    };
  }, [isAnimationCompleted]);

  if (isAnimationCompleted) {
    return (
      <div
        className="Contenedor3D, show"
        ref={mountRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    );
  } else {
    return (
      <div
        className="Contenedor3D, hide"
        ref={mountRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    );
  }
};

export default Scene;
