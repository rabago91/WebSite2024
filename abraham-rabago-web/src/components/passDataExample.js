// Dona <- Loader
// Loader <- UI Loader
import { useState } from "react";

export default function App() {
  const [loadPercentage, setLoadPercentage] = useState(0);

  return (
    <>
      <Dona setLoadPercentage={setLoadPercentage} />
      <Loader loadPercentage={loadPercentage} />
    </>
  );
}

function Dona({ setLoadPercentage }) {
  TREEE.onloadprogress = (progress) => {
    setLoadPercentage(progress);
  };
}

function Loader({ loadPercentage }) {
  return loadPercentage < 100 ? <p>Loading</p> : null;
}
