import Scene from "./components/Scene";
import LoaderUi from "./components/uiLoader";
import { useState, createContext } from "react";

// export const loadingContext = createContext();

function App() {
  console.log("(1)~~~~~~Render:App<---");

  // const [loadPercentage, setLoadPercentage] = useState(0);
  const [loadValue, setLoadValue] = useState(null);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  console.log("loadState***********", loadValue);

  console.log("isAnimationCompleted", isAnimationCompleted);

  return (
    <>
      <Scene
        // className="hide"
        setLoadValue={setLoadValue}
        isAnimationCompleted={isAnimationCompleted}
      />

      <LoaderUi
        // loadPercentage={loadPercentage}
        // isLoaded={isLoaded}
        setIsAnimationCompleted={setIsAnimationCompleted}
      />
    </>
  );
  //       <loadingContext.Provider value={{ loadState, setLoadState }}>
  //       <Scene
  //         // className="hide"
  //         setLoadPercentage={setLoadPercentage}
  //         isAnimationCompleted={isAnimationCompleted}
  //       />

  //       <LoaderUi
  //         // loadPercentage={loadPercentage}
  //         // isLoaded={isLoaded}
  //         setIsAnimationCompleted={setIsAnimationCompleted}
  //       />
  //     </loadingContext.Provider>
  // );
}

export default App;
